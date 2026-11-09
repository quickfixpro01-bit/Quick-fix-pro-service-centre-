# Quick Fix Pro Service Centre - Full Integration Plan

Comprehensive architectural and feature integration plan for **Quick Fix Pro Service Centre**, adding Firebase Google Auth & Firestore persistence, Google Maps Platform live tracking, Gemini AI Appliance Assistant with Maps Grounding, and Cloud SQL PostgreSQL for technician operations.

> [!IMPORTANT] User Review & Critical Decisions
> - **Confirmed Choice**: Floating AI Assistant widget with dedicated tabs for **Smart Appliance Diagnosis** and **Nearby Service Center Maps Grounding**.
> - **Default Decision 1 (Google Maps)**: Interactive Live Technician Dispatch Tracking modal on booking confirmation + Bangalore Service Area Coverage interactive map.
> - **Default Decision 2 (Auth)**: Dual Auth modal supporting One-Tap Google Sign-In with Firebase Auth alongside the existing verified Phone OTP login for seamless customer repair history access.
> - **Default Decision 3 (Cloud SQL)**: PostgreSQL backend schema via Drizzle ORM for relational job dispatching, technician workload allocation, and parts inventory management.

---

## 1. Overview & Core Concept

**Quick Fix Pro Service Centre** is Bangalore's premier multi-brand doorstep appliance repair platform. This major update upgrades the web application into a fully integrated, cloud-powered doorstep service ecosystem:

1. **Smart AI Diagnostics & Maps Grounding**: An intelligent floating assistant powered by Gemini (`@google/genai`) to diagnose AC, Refrigerator, Washing Machine, Microwave, and Water Purifier issues, estimate repair costs, and query real-time Bangalore service hub locations using Google Maps grounding.
2. **Interactive Location & Tracking**: Powered by `@vis.gl/react-google-maps` to display real-time technician movement, route estimation, and interactive coverage maps for Bangalore zones (Koramangala, Indiranagar, Whitefield, HSR Layout, Yelahanka, Electronic City).
3. **Multi-Method Auth & Firestore History**: Seamless authentication via Google Sign-In and Phone OTP using Firebase Auth. Persistent repair bookings, digital invoice downloads, and written 6-month warranty passes stored securely in Firestore.
4. **Cloud SQL Relational Operations**: PostgreSQL backend managed via Drizzle ORM for enterprise job queue management, technician status tracking, and parts inventory control.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **AI Assistant Diagnosis & Nearby Hub Grounding**:
   - Customer clicks the floating **Quick Fix AI** widget at the bottom right.
   - Switches between **Smart Issue Diagnosis** (interactive symptom checker & cost estimation) and **Nearby Service Hubs** (live Google Maps grounding for local spare parts centers and repair hubs).
2. **Doorstep Service Booking & Live Map Tracking**:
   - Customer selects an appliance (e.g., Washing Machine Drum Noise), picks a convenient time slot, and confirms address.
   - Upon booking creation, an interactive Google Map opens in a **Live Dispatch Modal** showing assigned technician location, estimated time of arrival (ETA), and route line.
3. **Customer Portal & Warranty History**:
   - Users sign in via Google One-Tap or Phone OTP.
   - View past doorstep repairs, active 6-month warranty passes, and download official PDF invoices synced in real-time from Firestore.

### Visual Identity & Theme
- **Theme Support**: High-contrast dual theme (Modern Light Mode + Deep Slate Dark Mode with `@custom-variant dark`).
- **Color Palette**:
  - Dominant Canvas: Crisp White / Deep Slate (`#0F172A`).
  - Structural Cards: Subdued Slate (`#1E293B`) with hairline amber/blue borders (`border-amber-400/40`).
  - Accent Palette: Electric Blue (`#2563EB`) for primary CTAs, Vibrant Amber (`#F59E0B`) for brand accents, Emerald (`#10B981`) for live status indicators.
- **Typography**: Clean display headings (`Plus Jakarta Sans`) paired with high-legibility body text (`DM Sans`) and tabular numerals (`tabular-nums`) for pricing & SLAs.

---

## 3. Key Product Decisions & Trade-Offs

1. **Floating AI Assistant vs. Full-Page Chat**:
   - *Chosen Approach*: Floating bottom-right widget with Tabbed Navigation (Diagnosis vs. Local Maps Grounding).
   - *Why*: Keeps the assistant accessible from any page (Home, Services, Track Status) without taking users away from their current task.

2. **Server-Side Gemini SDK (`@google/genai`)**:
   - *Chosen Approach*: Express server proxy route `/api/gemini/chat` and `/api/gemini/grounding` with `gemini-3.8-flash` model and `httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }`.
   - *Why*: Protects API keys server-side, ensures compliance with AI Studio standards, and allows clean streaming responses to the frontend.

3. **Hybrid Persistence Strategy (Firestore + Cloud SQL)**:
   - *Chosen Approach*: Firestore for customer-facing real-time document sync (Bookings, Customer Profiles, Repair History) and Cloud SQL for structured operational query processing (Technician Dispatch Queue, Parts Catalog).
   - *Why*: Combines Firestore's fast real-time client listeners with PostgreSQL's relational schema consistency.

---

## 4. Technical Architecture & Data Strategy

### System Architecture & Component Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            REACT FRONTEND (Vite)                            │
├───────────────────┬─────────────────────────┬───────────────────────────────┤
│ Header & Top Bar  │ Floating AI Assistant   │ Live Tracking & Maps          │
│ - Brand Header    │ - Smart Diagnosis Tab   │ - @vis.gl/react-google-maps   │
│ - Language Toggle │ - Local Maps Grounding  │ - Coverage Map & ETA Modal    │
│ - Theme Toggle    │   (Gemini + Maps Tool)  │ - AdvancedMarkerElement       │
└─────────┬─────────┴────────────┬────────────┴───────────────┬───────────────┘
          │                      │                            │
          │ HTTP / REST          │ Server-Side Proxy          │ Direct Google Maps JS
          ▼                      ▼                            ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          EXPRESS SERVER (server.ts)                         │
├──────────────────────────┬──────────────────────────┬───────────────────────┤
│ Auth & Users Middleware  │ Gemini AI Service        │ Cloud SQL / Drizzle   │
│ - Firebase Admin SDK     │ - @google/genai SDK      │ - PostgreSQL Pool     │
│ - ID Token Verification  │ - gemini-3.8-flash       │ - Drizzle ORM Schema  │
│ - User Sync              │ - googleMaps Tool        │ - Job Dispatch Queue  │
└─────────┬────────────────┴────────────┬─────────────┴───────────┬───────────┘
          │                             │                         │
          ▼                             ▼                         ▼
┌──────────────────┐           ┌──────────────────┐      ┌────────────────────┐
│  FIRESTORE DB    │           │  GEMINI API      │      │ CLOUD SQL (Postgres│
│ - bookings/      │           │ - Text Chat      │      │ - users            │
│ - users/         │           │ - Maps Grounding │      │ - jobs / dispatches│
│ - warranty_passes│           └──────────────────┘      │ - inventory_parts  │
└──────────────────┘                                     └────────────────────┘
```

### Data Model & State Mapping

#### 1. Firestore Schema (`firebase-blueprint.json`)
- `bookings`: `{ id, customerName, phone, serviceType, date, slot, status, technicianId, address, lat, lng, createdAt }`
- `users`: `{ uid, email, name, phone, createdAt, role }`
- `warranty_passes`: `{ id, bookingId, serviceName, issueDate, expiryDate, status }`

#### 2. PostgreSQL Schema (`src/db/schema.ts`)
- `users`: `id (serial)`, `uid (text, unique)`, `email (text)`, `phone (text)`, `createdAt (timestamp)`
- `technicians`: `id (serial)`, `name (text)`, `phone (text)`, `zone (text)`, `status (text)`, `lat (doublePrecision)`, `lng (doublePrecision)`
- `jobs`: `id (serial)`, `bookingId (text)`, `technicianId (integer)`, `status (text)`, `scheduledAt (timestamp)`
- `inventory_parts`: `id (serial)`, `partName (text)`, `applianceType (text)`, `stockQuantity (integer)`, `unitPrice (numeric)`

---

## 5. Sequential Implementation Roadmap

1. **Step 1: Firebase Auth & Google Sign-In Setup**:
   - Configure Firebase Auth with Google Provider + Phone Auth in `src/lib/firebase.ts`.
   - Update `PhoneAuthModal.tsx` and `Header.tsx` to offer One-Tap Google Sign-In alongside Phone verification.
   - Sync user profiles to Firestore `users` collection.

2. **Step 2: Server-Side Gemini API (`/api/gemini/chat` & `/api/gemini/grounding`)**:
   - Initialize `@google/genai` in `server.ts` with `gemini-3.8-flash` and `User-Agent: 'aistudio-build'`.
   - Build server endpoints for multi-turn appliance diagnosis and Google Maps grounded location search.
   - Build the `FloatingAiAssistant.tsx` frontend component with tabs for **Smart Diagnosis** and **Nearby Hubs**.

3. **Step 3: Google Maps Integration (`@vis.gl/react-google-maps`)**:
   - Mount `<APIProvider>` with key handling in `src/components/ServiceCoverageMap.tsx` and `src/components/TechnicianTrackerModal.tsx`.
   - Implement `AdvancedMarkerElement` for live technician movement and Bangalore service hub pins.

4. **Step 4: Cloud SQL PostgreSQL & Drizzle Setup**:
   - Define `src/db/schema.ts` and `src/db/index.ts` with lazy PostgreSQL connection pool.
   - Add Express API routes for technician job queue management.

5. **Step 5: Verification & Quality Assurance**:
   - Verify zero compile/lint errors using `compile_applet` and `lint_applet`.
   - Restart dev server and verify dual theme contrast, responsive mobile layout, and interactive features.
