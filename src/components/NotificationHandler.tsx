import { useEffect, useState } from 'react';
import { requestNotificationPermission, onMessageListener } from '../firebase';

export const NotificationHandler = () => {
    const [notification, setNotification] = useState({ title: '', body: '' });

    useEffect(() => {
        // Request notification permission when component mounts
        requestNotificationPermission();

        // Listen for foreground messages
        onMessageListener()
            .then((payload: any) => {
                setNotification({
                    title: payload?.notification?.title || '',
                    body: payload?.notification?.body || ''
                });
            })
            .catch((err) => console.log('Failed to receive foreground message:', err));
    }, []);

    return (
        <div>
            {notification?.title && (
                <div className="notification">
                    <h3>{notification.title}</h3>
                    <p>{notification.body}</p>
                </div>
            )}
        </div>
    );
};
