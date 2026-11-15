import { BookingRecord, SAMPLE_TRACKING_BOOKINGS } from '../data/servicesData';

const LOCAL_BOOKINGS_KEY = 'quick_fix_pro_bookings_cache';
const DELETED_BOOKINGS_KEY = 'quick_fix_pro_deleted_bookings_cache';
const BOOKINGS_UPDATED_EVENT = 'quickfix_bookings_updated';

export type Unsubscribe = () => void;

function emitBookingsUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(BOOKINGS_UPDATED_EVENT));
  }
}

export function getDeletedBookingIds(): Set<string> {
  try {
    const raw = localStorage.getItem(DELETED_BOOKINGS_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function markBookingAsDeleted(bookingId: string) {
  try {
    const clean = bookingId.trim();
    const set = getDeletedBookingIds();
    set.add(clean);
    localStorage.setItem(DELETED_BOOKINGS_KEY, JSON.stringify(Array.from(set)));
  } catch (e) {
    console.warn('Could not mark booking as deleted:', e);
  }
}

export function unmarkBookingAsDeleted(bookingId: string) {
  try {
    const clean = bookingId.trim();
    const set = getDeletedBookingIds();
    if (set.has(clean)) {
      set.delete(clean);
      localStorage.setItem(DELETED_BOOKINGS_KEY, JSON.stringify(Array.from(set)));
    }
  } catch (e) {
    console.warn('Could not unmark booking deletion:', e);
  }
}

export function getLocalBookings(): BookingRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_BOOKINGS_KEY);
    const deleted = getDeletedBookingIds();
    const list: BookingRecord[] = raw ? JSON.parse(raw) : [];
    return list.filter(b => !deleted.has(b.bookingId));
  } catch {
    return [];
  }
}

export function saveLocalBooking(booking: BookingRecord) {
  try {
    const clean = booking.bookingId.trim();
    unmarkBookingAsDeleted(clean);
    const list = getLocalBookings().filter(b => b.bookingId !== clean);
    list.unshift(booking);
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(list));
    emitBookingsUpdated();
  } catch (e) {
    console.warn('Could not save booking to localStorage:', e);
  }
}

export function removeLocalBooking(bookingId: string) {
  try {
    const clean = bookingId.trim();
    markBookingAsDeleted(clean);
    const list = getLocalBookings().filter(b => b.bookingId !== clean);
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(list));
    emitBookingsUpdated();
  } catch (e) {
    console.warn('Could not remove booking from localStorage:', e);
  }
}

/**
 * Persists a new service booking locally
 */
export async function createBooking(
  booking: BookingRecord,
  userId: string = 'admin_portal'
): Promise<BookingRecord> {
  const cleanBookingId = booking.bookingId.replace(/[^a-zA-Z0-9_-]/g, '');

  const normalizedRecord: BookingRecord = {
    ...booking,
    bookingId: cleanBookingId,
    userId: userId || 'admin_portal',
    totalEstimated: Number(booking.totalEstimated) || 0,
    createdAt: booking.createdAt || new Date().toISOString()
  };

  saveLocalBooking(normalizedRecord);
  return normalizedRecord;
}

/**
 * Fetches all bookings belonging to a specific user
 */
export async function fetchUserBookings(userId: string): Promise<BookingRecord[]> {
  const deletedSet = getDeletedBookingIds();
  const localList = getLocalBookings().filter(b => b.userId === userId || !userId);
  return localList
    .filter(b => !deletedSet.has(b.bookingId))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Subscribes in real-time to user's bookings across tabs and components
 */
export function subscribeToUserBookings(
  userId: string,
  onUpdate: (bookings: BookingRecord[]) => void
): Unsubscribe {
  const getUserList = () => {
    const localList = getLocalBookings().filter(b => b.userId === userId || !b.userId);
    const deletedSet = getDeletedBookingIds();

    return localList
      .filter(b => !deletedSet.has(b.bookingId))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  onUpdate(getUserList());

  const handleStorage = (e: StorageEvent) => {
    if (e.key === LOCAL_BOOKINGS_KEY || e.key === DELETED_BOOKINGS_KEY) {
      onUpdate(getUserList());
    }
  };
  const handleCustomUpdate = () => {
    onUpdate(getUserList());
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage);
    window.addEventListener(BOOKINGS_UPDATED_EVENT, handleCustomUpdate);
  }

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(BOOKINGS_UPDATED_EVENT, handleCustomUpdate);
    }
  };
}

/**
 * Real-time subscription to ALL bookings across the system for Admin Portal
 */
export function subscribeToAllBookings(
  onUpdate: (bookings: BookingRecord[]) => void
): Unsubscribe {
  const getAllBookings = () => {
    const localList = getLocalBookings();
    const deletedSet = getDeletedBookingIds();

    const map = new Map<string, BookingRecord>();

    SAMPLE_TRACKING_BOOKINGS.forEach(b => {
      if (!deletedSet.has(b.bookingId)) {
        map.set(b.bookingId, b);
      }
    });

    localList.forEach(b => {
      if (!deletedSet.has(b.bookingId)) {
        map.set(b.bookingId, b);
      }
    });

    return Array.from(map.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  onUpdate(getAllBookings());

  const handleStorage = (e: StorageEvent) => {
    if (e.key === LOCAL_BOOKINGS_KEY || e.key === DELETED_BOOKINGS_KEY) {
      onUpdate(getAllBookings());
    }
  };
  const handleCustomUpdate = () => {
    onUpdate(getAllBookings());
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage);
    window.addEventListener(BOOKINGS_UPDATED_EVENT, handleCustomUpdate);
  }

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(BOOKINGS_UPDATED_EVENT, handleCustomUpdate);
    }
  };
}

/**
 * Updates a booking's status, assigned technician, or notes locally
 */
export async function updateBooking(
  bookingId: string,
  updates: Partial<BookingRecord>
): Promise<void> {
  const cleanId = bookingId.trim();
  const localList = getLocalBookings();
  const index = localList.findIndex(b => b.bookingId === cleanId);

  if (index !== -1) {
    localList[index] = {
      ...localList[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(localList));
    emitBookingsUpdated();
    return;
  }

  const sampleMatch = SAMPLE_TRACKING_BOOKINGS.find(b => b.bookingId === cleanId);
  if (sampleMatch) {
    saveLocalBooking({
      ...sampleMatch,
      ...updates,
      updatedAt: new Date().toISOString()
    });
  }
}

/**
 * Deletes a booking from local storage
 */
export async function deleteBooking(bookingId: string): Promise<void> {
  removeLocalBooking(bookingId.trim());
}

/**
 * Looks up a single booking by booking ID (e.g. for TrackerModal)
 */
export async function getBookingById(bookingId: string): Promise<BookingRecord | null> {
  const cleanId = bookingId.trim();
  const deletedSet = getDeletedBookingIds();
  if (deletedSet.has(cleanId)) return null;

  const localMatch =
    getLocalBookings().find(b => b.bookingId.toLowerCase() === cleanId.toLowerCase()) ||
    SAMPLE_TRACKING_BOOKINGS.find(b => b.bookingId.toLowerCase() === cleanId.toLowerCase());

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

  const getRecord = (): BookingRecord | null => {
    const deletedSet = getDeletedBookingIds();
    if (deletedSet.has(cleanId)) return null;

    const localMatch =
      getLocalBookings().find(b => b.bookingId.toLowerCase() === cleanId.toLowerCase()) ||
      SAMPLE_TRACKING_BOOKINGS.find(b => b.bookingId.toLowerCase() === cleanId.toLowerCase());
    return localMatch || null;
  };

  onUpdate(getRecord());

  const handleStorage = (e: StorageEvent) => {
    if (e.key === LOCAL_BOOKINGS_KEY || e.key === DELETED_BOOKINGS_KEY) {
      onUpdate(getRecord());
    }
  };
  const handleCustomUpdate = () => {
    onUpdate(getRecord());
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage);
    window.addEventListener(BOOKINGS_UPDATED_EVENT, handleCustomUpdate);
  }

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(BOOKINGS_UPDATED_EVENT, handleCustomUpdate);
    }
  };
}
