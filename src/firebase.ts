import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Replace these with your Firebase config values
const firebaseConfig = {
  apiKey: 'AIzaSyCHVE1xfH4xMXsc2rC1C3mezB79eBfOXdQ',
  authDomain: 'easycash-78386.firebaseapp.com',
  projectId: 'easycash-78386',
  storageBucket: 'easycash-78386.firebasestorage.app',
  messagingSenderId: '433081696386',
  appId: '1:433081696386:web:e44b61044dcb2a2c50f49b',
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
        vapidKey: 'BJh4-G0Jn7mftQz2GFsz5pC2Opp2YRAtjBJt6n9LOtC_FVJVnAHxUPJwd8rEQdtxfNnon8VLdnkuV1Jp6bjBFx0', // Replace with your VAPID key from Firebase Console
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
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Received foreground message:', payload);
      resolve(payload);
    });
    return unsubscribe;
  });

// Create a message handler that can be used multiple times
export const createMessageHandler = (callback: (payload: any) => void) => {
  return onMessage(messaging, (payload) => {
    console.log('Received message:', payload);
    callback(payload);
  });
};
