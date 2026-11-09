# Quick Fix Pro Firestore Security Specification

## 1. System Invariants & Access Control Matrix

- **Users Collection (`/users/{userId}`)**:
  - Only the authenticated user whose `request.auth.uid == userId` can read, create, or update their own profile document.
  - No user can read or modify another user's PII (phone number, home address, name).
  - Unauthenticated access is strictly forbidden (`request.auth != null`).
  - IDs must satisfy `isValidId(userId)`.

- **Bookings Collection (`/bookings/{bookingId}`)**:
  - `bookingId` must be a valid alphanumeric identifier conforming to `isValidId(bookingId)` (up to 64 chars).
  - On `create`: The user must be authenticated (`request.auth != null`), `incoming().userId == request.auth.uid`, and all mandatory fields (`bookingId`, `userId`, `appliance`, `brand`, `issue`, `customerName`, `customerPhone`, `customerAddress`, `locality`, `status`, `totalEstimated`) must be present with valid types and string length limits.
  - On `read (get)`: Accessible by the authenticated booking owner (`resource.data.userId == request.auth.uid`). Also, unauthenticated or cross-device guest tracking is secured: single-document lookup is permitted if the customer queries with their matching phone number or authenticated user ID.
  - On `read (list)`: Authenticated user can only query their own bookings (`resource.data.userId == request.auth.uid`). No global list dumps permitted.
  - On `update`: The booking owner can only modify non-immutable fields (e.g. `status` to 'cancelled' or updating contact instructions), and cannot tamper with `userId`, `bookingId`, or `createdAt`.

## 2. The "Dirty Dozen" Test Payloads

1. **Payload 1 (Ghost Field Injection)**: Creating user with unauthorized role elevation `{ userId, name, phoneNumber, isAdmin: true }` -> REJECTED.
2. **Payload 2 (User ID Impersonation)**: Signed-in user `user_123` attempting to write to `/users/user_999` -> REJECTED (403 PERMISSION_DENIED).
3. **Payload 3 (Booking Owner Tampering)**: User `user_123` attempting to insert booking with `userId: "user_999"` -> REJECTED.
4. **Payload 4 (Oversized Payload / Denial of Wallet)**: Booking payload containing 100KB string in `issue` field -> REJECTED (`.size() <= 1000`).
5. **Payload 5 (Unauthenticated List Query)**: Guest client attempting `db.collection('bookings').getDocs()` without auth filters -> REJECTED.
6. **Payload 6 (Cross-User List Query)**: User `user_123` requesting bookings for `userId == "user_999"` -> REJECTED.
7. **Payload 7 (Path Traversal / Malicious Doc ID)**: Malicious document ID `../../../etc/passwd` or non-regex characters -> REJECTED (`isValidId`).
8. **Payload 8 (Negative Price Exploit)**: Submitting `totalEstimated: -5000` -> REJECTED (`totalEstimated >= 0`).
9. **Payload 9 (Invalid Status Injection)**: Setting status to `'vip_free_service'` instead of allowed enum -> REJECTED.
10. **Payload 10 (Immutable Field Modification)**: Owner attempting to alter `bookingId` or `createdAt` on an existing booking -> REJECTED.
11. **Payload 11 (Blanket PII Extraction)**: Attempting to query all `/users` without document ID match -> REJECTED.
12. **Payload 12 (Empty Phone Number)**: Writing empty string or corrupted format for phone number -> REJECTED (`phoneNumber.size() >= 10`).
