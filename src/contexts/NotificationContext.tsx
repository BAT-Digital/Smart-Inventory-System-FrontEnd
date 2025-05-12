import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { mqttService } from '../services/MqttService';
import { Notification, NotificationPayload } from '../types/notification';

interface NotificationContextType {
    notifications: Notification[];
    isConnected: boolean;
    isOpen: boolean;
    toggleNotifications: () => void;
    clearNotification: (id: number) => void;
    closeNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const closeNotifications = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleNotifications = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                closeNotifications();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, closeNotifications]);

    useEffect(() => {
        const handleNotification = (payload: NotificationPayload) => {
            setNotifications(prev => {
                const newNotification = {
                    id: Date.now(),
                    timestamp: new Date().toISOString(),
                    ...payload
                };
                return [newNotification, ...prev].slice(0, 10);
            });
        };

        const topics = [
            'inventory/alerts/#',
            'inventory/events/#',
            'sales/events/#'
        ];

        mqttService.connect();
        topics.forEach(topic => {
            mqttService.subscribe(topic, handleNotification);
        });

        const checkConnection = setInterval(() => {
            setIsConnected(mqttService.isConnected());
        }, 2000);

        return () => {
            clearInterval(checkConnection);
            topics.forEach(topic => {
                mqttService.unsubscribe(topic, handleNotification);
            });
            mqttService.disconnect();
        };
    }, []);

    const clearNotification = useCallback((id: number) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, []);

    return (
        <NotificationContext.Provider 
            value={{ 
                notifications, 
                isConnected, 
                isOpen, 
                toggleNotifications,
                clearNotification,
                closeNotifications
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
}; 