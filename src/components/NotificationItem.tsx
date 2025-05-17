import React from 'react';
import { Notification } from '../types/notification';

interface NotificationItemProps {
    notification: Notification;
    className?: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, className = '' }) => {
    const formattedTime = notification.timestamp 
        ? new Date(notification.timestamp).toLocaleTimeString()
        : new Date().toLocaleTimeString();

    const getPriorityColor = (priority: string) => {
        switch (priority.toUpperCase()) {
            case 'HIGH':
                return 'text-red-600';
            case 'MEDIUM':
                return 'text-orange-500';
            case 'LOW':
                return 'text-blue-500';
            default:
                return 'text-gray-500';
        }
    };

    const getMetadataDisplay = () => {
        if (!notification.metadata) return null;
        
        const relevantKeys = Object.keys(notification.metadata).filter(key => 
            !['timestamp'].includes(key) && notification.metadata?.[key]
        );

        if (relevantKeys.length === 0) return null;

        return (
            <div className="notification-metadata text-sm text-gray-500 mt-1">
                {relevantKeys.map(key => (
                    <span key={key} className="mr-3">
                        {key.charAt(0).toUpperCase() + key.slice(1)}: {notification.metadata?.[key]}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <button 
            className={`notification-item ${notification.type} ${className} w-full text-left ${!notification.read ? 'bg-blue-50' : ''}`}
        >
            <div className="notification-header">
                <div className="flex items-center gap-2">
                    <span className="notification-type">{notification.type.replace('_', ' ')}</span>
                    <span className={`text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                        {notification.priority}
                    </span>
                </div>
                <span className="notification-time">{formattedTime}</span>
            </div>
            <div className="notification-message">{notification.message}</div>
            {getMetadataDisplay()}
            <div className="notification-category text-xs mt-2">{notification.category}</div>
        </button>
    );
};

export default NotificationItem; 