export type NotificationType =
    // Inventory notifications
    | 'LOW_STOCK'
    | 'EXPIRATION_ALERT'
    | 'NEW_BATCH'
    | 'STOCK_ADJUSTMENT'
    | 'INVENTORY_COUNT'
    
    // Sales notifications
    | 'SALE_COMPLETED'
    | 'HIGH_VALUE_SALE'
    | 'REFUND_PROCESSED'
    | 'DAILY_SALES_SUMMARY'
    
    // Supplier notifications
    | 'ORDER_PLACED'
    | 'ORDER_RECEIVED'
    | 'ORDER_DELAYED'
    | 'SUPPLIER_ISSUE'
    
    // System notifications
    | 'SYSTEM_ERROR'
    | 'SYSTEM_WARNING'
    | 'SYSTEM_INFO'
    | 'BACKUP_COMPLETED';

export type NotificationCategory =
    | 'INVENTORY'
    | 'SALES'
    | 'SUPPLIER'
    | 'SYSTEM';

export type NotificationPriority =
    | 'LOW'
    | 'NORMAL'
    | 'HIGH'
    | 'URGENT';

export interface NotificationPayload {
    type: NotificationType;
    message: string;
    category: NotificationCategory;
    priority: NotificationPriority;
    timestamp: string;
    metadata: Record<string, string>;
}

export interface Notification extends NotificationPayload {
    id: number;
}