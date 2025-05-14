export enum NotificationType {
    LOW_STOCK = 'LOW_STOCK',
    EXPIRATION_ALERT = 'EXPIRATION_ALERT',
    AI_ANALYSIS_COMPLETED = 'AI_ANALYSIS_COMPLETED',
    SYSTEM_ERROR = 'SYSTEM_ERROR',
    SYSTEM_WARNING = 'SYSTEM_WARNING',
    SYSTEM_INFO = 'SYSTEM_INFO'
}

export enum NotificationCategory {
    INVENTORY = 'INVENTORY',
    SYSTEM = 'SYSTEM'
}

export enum NotificationPriority {
    LOW = 'LOW',
    NORMAL = 'NORMAL',
    HIGH = 'HIGH',
    URGENT = 'URGENT'
}

export interface NotificationPayload {
    type: NotificationType;
    message: string;
    category: NotificationCategory;
    priority: NotificationPriority;
    metadata?: Record<string, string>;
    timestamp?: string;
}

export interface Notification extends NotificationPayload {
    id: number;
    read?: boolean;
}