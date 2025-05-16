import mqtt, { MqttClient, IClientOptions } from 'mqtt';
import { NotificationPayload } from '../types/notification';

type NotificationCallback = (payload: NotificationPayload) => void;

class MqttService {
    private client: MqttClient | null = null;
    private subscriptions: Map<string, Set<NotificationCallback>> = new Map();
    private reconnectTimeout = 1000;
    private maxReconnectTimeout = 30000;
    private connecting = false;
    private retryCount = 0;
    private maxRetries = 5;

    private getOptions(): IClientOptions {
        return {
            clientId: `mqtt_${Math.random().toString(16).slice(2, 10)}`,
            clean: true,
            keepalive: 30,
            reconnectPeriod: 5000,
            connectTimeout: 30000,
            protocolVersion: 4,
            resubscribe: true,
            protocol: 'ws',
            wsOptions: {
                rejectUnauthorized: false,
                protocolVersion: 13,
                headers: {
                    'Sec-WebSocket-Protocol': 'mqtt'
                }
            }
        };
    }

    connect(): void {
        if (this.connecting || this.client?.connected) return;

        this.connecting = true;
        const wsUrl = 'ws://localhost:9001';
        const options = this.getOptions();

        try {
            this.client = mqtt.connect(wsUrl, options);

            this.client.on('connect', () => {
                this.connecting = false;
                this.retryCount = 0;
                this.reconnectTimeout = 1000;
                this.resubscribeToTopics();
            });

            this.client.on('error', () => this.handleConnectionFailure());
            this.client.on('close', () => this.handleConnectionFailure());
            this.client.on('offline', () => this.handleConnectionFailure());

            this.client.on('message', (topic: string, message: Buffer) => {
                try {
                    const payload = JSON.parse(message.toString()) as NotificationPayload;
                    for (const [subTopic, subscribers] of this.subscriptions.entries()) {
                        if (this.topicMatches(topic, subTopic)) {
                            subscribers.forEach(callback => {
                                try {
                                    callback(payload);
                                } catch {}
                            });
                        }
                    }
                } catch {}
            });
        } catch {
            this.handleConnectionFailure();
        }
    }

    private handleConnectionFailure(): void {
        this.connecting = false;

        if (this.retryCount < this.maxRetries) {
            setTimeout(() => this.connect(), this.reconnectTimeout);
            this.retryCount++;
            this.reconnectTimeout = Math.min(this.reconnectTimeout * 2, this.maxReconnectTimeout);
        }
    }

    private resubscribeToTopics(): void {
        if (!this.client?.connected) return;

        setTimeout(() => {
            for (const topic of this.subscriptions.keys()) {
                this.client?.subscribe(topic, () => {});
            }
        }, 100);
    }

    private topicMatches(actualTopic: string, subscribedTopic: string): boolean {
        const pattern = subscribedTopic
            .replace(/[-[\]{}()+?.\\^$|]/g, '\\$&')
            .replace(/\+/g, '[^/]+')
            .replace(/\/#$/, '(/.*)?')
            .replace(/#$/, '.*');

        return new RegExp(`^${pattern}$`).test(actualTopic);
    }

    subscribe(topic: string, callback: NotificationCallback): void {
        if (!this.subscriptions.has(topic)) {
            this.subscriptions.set(topic, new Set());
        }

        this.subscriptions.get(topic)?.add(callback);

        if (this.client?.connected) {
            this.client.subscribe(topic, () => {});
        } else {
            this.connect();
        }
    }

    unsubscribe(topic: string, callback: NotificationCallback): void {
        const subscribers = this.subscriptions.get(topic);
        if (!subscribers) return;

        subscribers.delete(callback);
        if (subscribers.size === 0) {
            if (this.client?.connected) {
                this.client.unsubscribe(topic);
            }
            this.subscriptions.delete(topic);
        }
    }

    disconnect(): void {
        if (this.client) {
            this.client.end(true, () => {
                this.client = null;
                this.connecting = false;
                this.retryCount = 0;
            });
        }
    }

    isConnected(): boolean {
        return this.client?.connected ?? false;
    }
}

export const mqttService = new MqttService();
