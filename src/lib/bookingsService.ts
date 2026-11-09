import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  onSnapshot, 
  updateDoc,
  deleteDoc,
  Unsubscribe 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { BookingRecord, SAMPLE_TRACKING_BOOKINGS } from '../data/servicesData';

const BOOKINGS_COLLECTION = 'bookings';
const LOCAL_BOOKINGS_KEY = 'quick_fix_pro_bookings_cache';

export function getLocalBookings(): BookingRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_BOOKINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalBooking(booking: BookingRecord) {
  try {
    const list = getLocalBookings().filter(b => b.bookingId !== booking.bookingId);
    list.unshift(booking);
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn('Could not save booking to localStorage:', e);
  }
}

export function removeLocalBooking(bookingId: string) {
  try {
    const list = getLocalBookings().filter(b => b.bookingId !== bookingId);
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn('Could not remove booking from localStorage:', e);
  }
}

/**
 * Persists a new service booking to Firestore with local storage backup
 */
export async function createBookingInFirestore(
  booking: BookingRecord,
  userId: string = 'admin_portal'
): Promise<BookingRecord> {
  const cleanBookingId = booking.bookingId.replace(/[^a-zA-Z0-9_-]/g, '');

  const payload: Record<string, any> = {
    bookingId: cleanBookingId,
    userId: userId || 'admin_portal',
    appliance: booking.appliance,
    brand: booking.brand,
    issue: booking.issue,
    date: booking.date,
    timeSlot: booking.timeSlot,
    locality: booking.locality,
    customerName: booking.customerName,
    customerPhone: booking.customerPhone,
    customerAddress: booking.customerAddress,
    status: booking.status,
    totalEstimated: Number(booking.totalEstimated) || 0,
    createdAt: booking.createdAt || new Date().toISOString()
  };

  if (booking.landmark) {
    payload.landmark = booking.landmark;
  }
  if (booking.assignedTech) {
    payload.assignedTech = booking.assignedTech;
  }
  if (booking.adminNotes) {
    payload.adminNotes = booking.adminNotes;
  }

  const normalizedRecord: BookingRecord = {
    ...booking,
    bookingId: cleanBookingId,
    userId: userId || 'admin_portal'
  };

  // 1. Immediately cache in local storage for instant responsiveness
  saveLocalBooking(normalizedRecord);

  // 2. Persist to Firestore
  try {
    const docRef = doc(db, BOOKINGS_COLLECTION, cleanBookingId);
    await setDoc(docRef, payload, { merge: true });
  } catch (error) {
    console.warn('Could not persist booking to Firestore, using cached backup:', error);
  }

  return normalizedRecord;
}

/**
 * Fetches all bookings belonging to a specific user (Firestore + local merge)
 */
export async function fetchUserBookingsFromFirestore(userId: string): Promise<BookingRecord[]> {
  const localList = getLocalBookings().filter(b => (b as any).userId === userId || !userId);
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const results: BookingRecord[] = [];
    querySnapshot.forEach((docSnap) => {
      results.push(docSnap.data() as BookingRecord);
    });

    const map = new Map<string, BookingRecord>();
    localList.forEach(b => map.set(b.bookingId, b));
    results.forEach(b => map.set(b.bookingId, b));
    return Array.from(map.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.warn('Could not fetch user bookings from Firestore, returning local cached bookings:', error);
    return localList;
  }
}

/**
 * Subscribes in real-time to user's bookings with immediate local cache playback
 */
export function subscribeToUserBookings(
  userId: string,
  onUpdate: (bookings: BookingRecord[]) => void
): Unsubscribe {
  const localList = getLocalBookings().filter(b => b.userId === userId || !b.userId);
  if (localList.length > 0) {
    onUpdate(localList);
  }

  const q = query(
    collection(db, BOOKINGS_COLLECTION),
    where('userId', '==', userId)
  );

  return onSnapshot(
    q,
    (querySnapshot) => {
      const firestoreRecords: BookingRecord[] = [];
      querySnapshot.forEach((docSnap) => {
        firestoreRecords.push(docSnap.data() as BookingRecord);
      });

      const map = new Map<string, BookingRecord>();
      localList.forEach(b => map.set(b.bookingId, b));
      firestoreRecords.forEach(b => map.set(b.bookingId, b));

      const merged = Array.from(map.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      onUpdate(merged);
    },
    (error) => {
      console.warn('Firestore subscription notice, falling back to local bookings:', error?.message);
      onUpdate(localList);
    }
  );
}

/**
 * Real-time subscription to ALL bookings across the entire system for Admin Portal
 */
export function subscribeToAllBookings(
  onUpdate: (bookings: BookingRecord[]) => void
): Unsubscribe {
  // Start with local bookings + sample bookings so admin sees data immediately
  const localList = getLocalBookings();
  const initialCombined = [...localList];
  SAMPLE_TRACKING_BOOKINGS.forEach(sample => {
    if (!initialCombined.some(b => b.bookingId === sample.bookingId)) {
      initialCombined.push(sample);
    }
  });
  onUpdate(initialCombined);

  const colRef = collection(db, BOOKINGS_COLLECTION);

  return onSnapshot(
    colRef,
    (querySnapshot) => {
      const firestoreRecords: BookingRecord[] = [];
      querySnapshot.forEach((docSnap) => {
        firestoreRecords.push(docSnap.data() as BookingRecord);
      });

      const map = new Map<string, BookingRecord>();
      // Include sample and local bookings
      SAMPLE_TRACKING_BOOKINGS.forEach(b => map.set(b.bookingId, b));
      localList.forEach(b => map.set(b.bookingId, b));
      // Overwrite with live Firestore docs
      firestoreRecords.forEach(b => map.set(b.bookingId, b));

      const all = Array.from(map.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      onUpdate(all);
    },
    (error) => {
      console.warn('All bookings subscription fallback:', error?.message);
      onUpdate(initialCombined);
    }
  );
}

/**
 * Updates a booking's status, assigned technician, or notes in Firestore & local cache
 */
export async function updateBookingInFirestore(
  bookingId: string,
  updates: Partial<BookingRecord>
): Promise<void> {
  const cleanId = bookingId.trim();

  // Update local storage
  const localList = getLocalBookings();
  const index = localList.findIndex(b => b.bookingId === cleanId);
  if (index !== -1) {
    localList[index] = {
      ...localList[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(localList));
  }

  // Update Firestore
  try {
    const docRef = doc(db, BOOKINGS_COLLECTION, cleanId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.warn('Could not update booking in Firestore, saved locally:', error);
  }
}

/**
 * Deletes a booking from Firestore & local storage
 */
export async function deleteBookingFromFirestore(bookingId: string): Promise<void> {
  const cleanId = bookingId.trim();
  removeLocalBooking(cleanId);
  try {
    const docRef = doc(db, BOOKINGS_COLLECTION, cleanId);
    await deleteDoc(docRef);
  } catch (error) {
    console.warn('Could not delete booking from Firestore:', error);
  }
}

/**
 * Looks up a single booking by booking ID (e.g. for TrackerModal)
 */
export async function getBookingByIdFromFirestore(bookingId: string): Promise<BookingRecord | null> {
  const cleanId = bookingId.trim();
  const localMatch = getLocalBookings().find(b => b.bookingId.toLowerCase() === cleanId.toLowerCase())
    || SAMPLE_TRACKING_BOOKINGS.find(b => b.bookingId.toLowerCase() === cleanId.toLowerCase());
  
  try {
    const docRef = doc(db, BOOKINGS_COLLECTION, cleanId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as BookingRecord;
    }
  } catch (error) {
    console.warn('Firestore lookup error, checking local store:', error);
  }

  return localMatch || null;
}

/**
 * Real-time subscription for a single booking ID (e.g. for customer TrackerModal)
 */
export function subscribeToBookingById(
  bookingId: string,
  onUpdate: (booking: BookingRecord | null) => void
): Unsubscribe {
  const cleanId = bookingId.trim();

  const getInitial = (): BookingRecord | null => {
    const localMatch = getLocalBookings().find(b => b.bookingId.toLowerCase() === cleanId.toLowerCase())
      || SAMPLE_TRACKING_BOOKINGS.find(b => b.bookingId.toLowerCase() === cleanId.toLowerCase());
    return localMatch || null;
  };

  const initial = getInitial();
  if (initial) {
    onUpdate(initial);
  }

  const handleStorage = (e: StorageEvent) => {
    if (e.key === LOCAL_BOOKINGS_KEY) {
      const updated = getInitial();
      if (updated) onUpdate(updated);
    }
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage);
  }

  const docRef = doc(db, BOOKINGS_COLLECTION, cleanId);
  const unsubscribeFirestore = onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        const record = docSnap.data() as BookingRecord;
        saveLocalBooking(record);
        onUpdate(record);
      } else {
        const fallback = getInitial();
        if (fallback) onUpdate(fallback);
      }
    },
    (_error) => {
      const fallback = getInitial();
      onUpdate(fallback);
    }
  );

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorage);
    }
    unsubscribeFirestore();
  };
}
