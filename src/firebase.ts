import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Replace these with your Firebase config values
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission and get FCM token
export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            // Get FCM token
            const token = await getToken(messaging, {
                vapidKey: 'your-vapid-key' // Replace with your VAPID key from Firebase Console
            });
            console.log('FCM Token:', token);
            return token;
        }
        console.log('Notification permission denied');
        return null;
    } catch (error) {
        console.error('Error getting notification permission:', error);
        return null;
    }
};

// Handle foreground messages
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
