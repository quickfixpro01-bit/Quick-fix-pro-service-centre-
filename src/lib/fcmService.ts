import { doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

export interface PushAlertPayload {
  id: string;
  bookingId: string;
  title: string;
  body: string;
  status: 'en_route' | 'arriving_soon' | 'completed';
  techName: string;
  timestamp: string;
  icon?: string;
}

// In-memory listener subscribers for foreground toast alerts
type NotificationListener = (payload: PushAlertPayload) => void;
const listeners: Set<NotificationListener> = new Set();

export function subscribeToPushAlerts(listener: NotificationListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners(payload: PushAlertPayload) {
  listeners.forEach(fn => {
    try {
      fn(payload);
    } catch (e) {
      console.warn('Error in push alert listener:', e);
    }
  });
}

/**
 * Checks if browser supports Web Notifications API
 */
export function isPushSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

/**
 * Requests browser notification permission and retrieves device registration token.
 */
export async function requestPushPermissionAndToken(userId?: string): Promise<{
  granted: boolean;
  token?: string;
  statusMessage: string;
}> {
  if (!isPushSupported()) {
    return {
      granted: false,
      statusMessage: 'Notifications not supported on this browser.'
    };
  }

  try {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      // Generate a unique device push token
      const deviceToken = `fcm_token_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`;

      // Save token to Firestore if userId provided
      if (userId && db) {
        try {
          const userRef = doc(db, 'userProfiles', userId);
          await setDoc(userRef, {
            fcmTokens: arrayUnion(deviceToken),
            notificationsEnabled: true,
            lastNotificationPermissionAt: new Date().toISOString()
          }, { merge: true });
        } catch (err) {
          console.warn('Could not save FCM token to Firestore:', err);
        }
      }

      return {
        granted: true,
        token: deviceToken,
        statusMessage: 'Push Notification permission granted! Live technician arrival alerts enabled.'
      };
    } else {
      return {
        granted: false,
        statusMessage: 'Push Notification permission was denied by browser.'
      };
    }
  } catch (err: any) {
    console.error('Error requesting notification permission:', err);
    return {
      granted: false,
      statusMessage: 'Failed to request notification permission.'
    };
  }
}

/**
 * Triggers a browser native Web Notification if permission granted.
 */
export function triggerNativeNotification(title: string, body: string, icon?: string) {
  if (isPushSupported() && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: icon || '/favicon.ico',
        tag: 'tech-arrival-alert',
        badge: '/favicon.ico'
      });
    } catch (err) {
      console.warn('Browser native notification error:', err);
    }
  }
}

/**
 * Schedules dynamic technician status push notifications:
 * 1. Technician En Route (Instant / 4s)
 * 2. Arrival in 10 Mins (16s)
 * 3. Service Completed (35s)
 */
export function scheduleTechnicianStatusAlerts(
  bookingId: string,
  techName: string = 'Babu',
  locality: string = 'Koramangala'
) {
  // Alert 1: En Route
  setTimeout(() => {
    const payload: PushAlertPayload = {
      id: `alert-enroute-${Date.now()}`,
      bookingId,
      title: `Technician En Route! 🚗`,
      body: `Senior Specialist ${techName} has departed the hub and is en route to ${locality}. Vehicle: KA 01 EK 4920. ETA ~25 mins.`,
      status: 'en_route',
      techName,
      timestamp: 'Just now'
    };

    triggerNativeNotification(payload.title, payload.body);
    notifyListeners(payload);
  }, 4000);

  // Alert 2: Arrival in 10 Mins
  setTimeout(() => {
    const payload: PushAlertPayload = {
      id: `alert-arriving-${Date.now()}`,
      bookingId,
      title: `Technician Arriving in 10 Mins ⏱️`,
      body: `Tech ${techName} is 1.2 km away from your ${locality} doorstep. Please keep the appliance accessible.`,
      status: 'arriving_soon',
      techName,
      timestamp: 'Just now'
    };

    triggerNativeNotification(payload.title, payload.body);
    notifyListeners(payload);
  }, 16000);

  // Alert 3: Service Completed & Warranty Active
  setTimeout(() => {
    const payload: PushAlertPayload = {
      id: `alert-completed-${Date.now()}`,
      bookingId,
      title: `Service Completed & 6-Month Warranty Active 🛡️`,
      body: `Your repair by Tech ${techName} is complete! 180-Day written warranty certificate has been generated.`,
      status: 'completed',
      techName,
      timestamp: 'Just now'
    };

    triggerNativeNotification(payload.title, payload.body);
    notifyListeners(payload);
  }, 35000);
}
