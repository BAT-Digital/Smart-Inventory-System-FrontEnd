import React, { useRef, useEffect } from 'react';
import NotificationItem from './NotificationItem';
import './Notifications.css';
import { useNotifications } from '../contexts/NotificationContext';

const Notifications: React.FC = () => {
    const { notifications, isOpen, toggleNotifications } = useNotifications();
    const notificationsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                toggleNotifications();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, toggleNotifications]);

    return (
        <>
            {isOpen && (
                <div className="notifications-backdrop" onClick={toggleNotifications}>
                    <div 
                        ref={notificationsRef}
                        className={`notifications-container ${isOpen ? 'open' : ''}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <button className="notifications-header w-full text-left">
                            <div className="flex justify-between items-center">
                                <h3>Notifications</h3>
                                <div className="flex items-center">
                                    <span className="notification-count">{notifications.length}</span>
                                </div>
                            </div>
                        </button>
                        <div className="notifications-list">
                            {notifications.length === 0 ? (
                                <div className="notifications-empty">
                                    No notifications yet
                                </div>
                            ) : (
                                notifications.map(notification => (
                                    <NotificationItem 
                                        key={notification.id} 
                                        notification={notification}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Notifications;