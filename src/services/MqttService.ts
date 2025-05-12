import mqtt, { MqttClient, IClientOptions } from 'mqtt';
import { NotificationPayload } from '../types/notification';

type NotificationCallback = (payload: NotificationPayload) => void;

class MqttService {
    private client: MqttClient | null = null;
    private subscriptions: Map<string, Set<NotificationCallback>> = new Map();
    private reconnectTimeout: number = 1000;
    private maxReconnectTimeout: number = 30000;
    private connecting: boolean = false;
    private retryCount: number = 0;
    private maxRetries: number = 5;

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
        if (this.connecting || this.client?.connected) {
            console.log('[MQTT] Already connected or connecting');
            return;
        }

        this.connecting = true;
        const options = this.getOptions();
        const wsUrl = 'ws://localhost:9001';
        
        try {
            console.log('[MQTT] Attempting to connect to broker:', wsUrl);
            console.log('[MQTT] Connection options:', JSON.stringify(options, null, 2));
            
            this.client = mqtt.connect(wsUrl, options);

            this.client.on('connect', () => {
                console.log('[MQTT] Successfully connected to broker!');
                this.connecting = false;
                this.retryCount = 0;
                this.reconnectTimeout = 1000;
                this.resubscribeToTopics();
            });

            this.client.on('error', (error: Error) => {
                console.error('[MQTT] Error:', error.message);
                console.error('[MQTT] Stack:', error.stack);
                this.handleConnectionFailure();
            });

            this.client.on('close', () => {
                console.log('[MQTT] Connection closed');
                this.handleConnectionFailure();
            });

            this.client.on('offline', () => {
                console.log('[MQTT] Client went offline');
                this.handleConnectionFailure();
            });

            this.client.on('reconnect', () => {
                console.log('[MQTT] Attempting to reconnect...');
            });

            this.client.on('message', (topic: string, message: Buffer) => {
                console.log('[MQTT] Received message on topic:', topic);
                console.log('[MQTT] Message content:', message.toString());
                
                try {
                    const payload = JSON.parse(message.toString()) as NotificationPayload;
                    console.log('[MQTT] Parsed payload:', payload);
                    
                    Array.from(this.subscriptions.entries()).forEach(([subTopic, subscribers]) => {
                        console.log('[MQTT] Checking topic match:', { actualTopic: topic, subscribedTopic: subTopic });
                        if (this.topicMatches(topic, subTopic)) {
                            console.log('[MQTT] Topic matches! Notifying subscribers');
                            subscribers.forEach(callback => {
                                try {
                                    callback(payload);
                                } catch (error) {
                                    console.error('[MQTT] Error in notification callback:', error);
                                }
                            });
                        }
                    });
                } catch (error) {
                    console.error('[MQTT] Error processing message:', error);
                    console.error('[MQTT] Raw message content:', message.toString());
                }
            });
        } catch (error) {
            console.error('[MQTT] Error creating client:', error);
            this.handleConnectionFailure();
        }
    }

    private handleConnectionFailure(): void {
        this.connecting = false;
        
        if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            console.log(`[MQTT] Attempting reconnection ${this.retryCount}/${this.maxRetries} in ${this.reconnectTimeout}ms`);
            setTimeout(() => this.connect(), this.reconnectTimeout);
            this.reconnectTimeout = Math.min(this.reconnectTimeout * 2, this.maxReconnectTimeout);
        } else {
            console.error('[MQTT] Max retry attempts reached. Please check your connection and try again.');
        }
    }

    private resubscribeToTopics(): void {
        if (!this.client?.connected) {
            console.log('[MQTT] Cannot resubscribe - client not connected');
            return;
        }

        setTimeout(() => {
            Array.from(this.subscriptions.keys()).forEach(topic => {
                if (this.client?.connected) {
                    console.log('[MQTT] Resubscribing to topic:', topic);
                    this.client.subscribe(topic, (err) => {
                        if (err) {
                            console.error(`[MQTT] Failed to subscribe to ${topic}:`, err);
                        } else {
                            console.log(`[MQTT] Successfully resubscribed to ${topic}`);
                        }
                    });
                }
            });
        }, 100);
    }

    private topicMatches(actualTopic: string, subscribedTopic: string): boolean {
        const pattern = subscribedTopic
            .replace(/\+/g, '[^/]+')
            .replace(/#$/, '.*');
        
        const matches = new RegExp(`^${pattern}$`).test(actualTopic);
        console.log('[MQTT] Topic match result:', { actualTopic, subscribedTopic, pattern, matches });
        return matches;
    }

    subscribe(topic: string, callback: NotificationCallback): void {
        console.log('[MQTT] Subscribing to topic:', topic);
        if (!this.subscriptions.has(topic)) {
            this.subscriptions.set(topic, new Set());
        }
        this.subscriptions.get(topic)?.add(callback);
        console.log('[MQTT] Current subscribers for topic:', topic, this.subscriptions.get(topic)?.size);
        
        if (this.client?.connected) {
            console.log('[MQTT] Client connected, subscribing immediately');
            this.client.subscribe(topic, (err) => {
                if (err) {
                    console.error(`[MQTT] Failed to subscribe to ${topic}:`, err);
                } else {
                    console.log(`[MQTT] Successfully subscribed to ${topic}`);
                }
            });
        } else {
            console.log('[MQTT] Client not connected, initiating connection');
            this.connect();
        }
    }

    unsubscribe(topic: string, callback: NotificationCallback): void {
        console.log('[MQTT] Unsubscribing from topic:', topic);
        const subscribers = this.subscriptions.get(topic);
        if (subscribers) {
            subscribers.delete(callback);
            console.log('[MQTT] Remaining subscribers:', subscribers.size);
            if (subscribers.size === 0 && this.client?.connected) {
                this.client.unsubscribe(topic);
                console.log('[MQTT] No more subscribers, unsubscribed from broker');
            }
        }
    }

    disconnect(): void {
        if (this.client) {
            console.log('[MQTT] Disconnecting MQTT client');
            this.client.end(true, () => {
                this.client = null;
                this.connecting = false;
                this.retryCount = 0;
                console.log('[MQTT] MQTT client disconnected');
            });
        }
    }

    isConnected(): boolean {
        const connected = this.client?.connected ?? false;
        console.log('[MQTT] Connection status:', connected);
        return connected;
    }
}

export const mqttService = new MqttService();