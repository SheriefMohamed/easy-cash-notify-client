import { useEffect, useState } from 'react';
import { requestNotificationPermission, createMessageHandler } from '../firebase';

export const NotificationHandler = () => {
    const [notifications, setNotifications] = useState<{title: string, body: string}[]>([]);

    const showNotification = (title: string, body: string) => {
        // Show browser notification
        if (Notification.permission === 'granted') {
            new Notification(title, {
                body: body,
                icon: '/vite.svg', // You can replace this with your own icon
            });
        }

        // Also keep track of notifications in state for UI display
        setNotifications(prev => [...prev, { title, body }]);
    };

    useEffect(() => {
        // Request notification permission when component mounts
        requestNotificationPermission();

        // Set up message handler that will persist
        const unsubscribe = createMessageHandler((payload) => {
            if (payload.notification) {
                showNotification(
                    payload.notification.title,
                    payload.notification.body
                );
            }
        });

        // Cleanup subscription when component unmounts
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <h2>Notifications ({notifications.length})</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                {notifications.map((notification, index) => (
                    <div 
                        key={index} 
                        className="notification" 
                        style={{
                            padding: '15px',
                            margin: '10px 0',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                        }}
                    >
                        <h3 style={{ margin: '0 0 10px 0' }}>{notification.title}</h3>
                        <p style={{ margin: 0 }}>{notification.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
