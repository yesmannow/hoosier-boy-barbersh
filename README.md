# Hoosier Boy Barbershop — Companion App & Admin Platform

A premium mobile-first companion application and admin command center for **Hoosier Boy Barbershop** in Noblesville, Indiana. Combines customer-facing booking and shop information with internal operations management.

## Features

### Public App (Customer-Facing)
- **Home Hub** — Shop hero, barber previews, reviews, hours snapshot, and quick actions
- **Booking Flow** — 5-step guided flow: Service → Barber → Date/Time → Details → Confirmation
- **Barbers Directory** — Detailed profiles with specialties, services, and booking CTAs
- **Shop Info** — Address, hours, contact methods, map link, and website link
- **You Profile** — Upcoming/past appointments, favorite barber, and one-tap quick actions

### Admin Platform
- **Dashboard** — Daily metrics, upcoming appointments, quick actions
- **Daily Schedule** — Chronological appointment view with status management
- **Week View** — 7-day overview across barbers
- **Client CRM** — Client records, history, notes, and contact info
- **Shop Profile** — Manage shop content, gallery, and trust signals

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **Radix UI** primitives via shadcn/ui
- **GitHub Spark KV** for data persistence
- **date-fns** for date handling
- **Phosphor Icons** for iconography

## Getting Started

```bash
npm install
npm run dev
```

The app runs on port 5000 by default. It defaults to the **Public App** view. Use the toggle in the top-right corner to switch between **Public** and **Admin** modes.

## Project Structure

```
src/
├── components/
│   ├── public/          # Public customer-facing views
│   │   ├── PublicApp.tsx
│   │   ├── HomeView.tsx
│   │   ├── BookView.tsx
│   │   ├── BarbersView.tsx
│   │   ├── ShopInfoView.tsx
│   │   └── YouView.tsx
│   ├── admin/           # Admin/operations views
│   │   ├── AdminApp.tsx
│   │   ├── AdminLayout.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DailyScheduleView.tsx
│   │   ├── WeekView.tsx
│   │   ├── ClientsView.tsx
│   │   └── ShopProfileView.tsx
│   ├── ui/              # shadcn/ui component library
│   ├── BarberSelection.tsx
│   ├── Confirmation.tsx
│   ├── CustomerDetails.tsx
│   ├── DateTimeSelection.tsx
│   ├── NavigationHeader.tsx
│   ├── ServiceSelection.tsx
│   └── ServiceSelectionWithSidebar.tsx
├── lib/
│   ├── adminData.ts     # Shop, barber, client, and appointment data
│   ├── data.ts          # Core services, barbers, and shop data
│   ├── scheduling.ts    # Time slot generation and date utilities
│   ├── types.ts         # TypeScript interfaces and types
│   └── utils.ts         # Shared utilities
└── assets/
    └── images/          # Shop photos and logo
```

## Shop Details

**Location:** 13901 Town Center Blvd, Suite 500, Noblesville, IN 46060

**Barbers:**
- **Jimmy Bissonette** — Classic Cuts & Beard Work (Wed–Sat)
- **Nate Gouty** — Premium Cuts & Hair Systems (Wed–Sat)

**Services:** Haircuts, Beard Trims, Hair + Beard Combos, The Hour, and Non-Surgical Hair Replacement (consult, installation, maintenance)

## Design System

Dark masculine theme with warm brass accents:
- **Background:** Deep Charcoal
- **Accent:** Warm Brass
- **Typography:** DM Sans (body) + Space Grotesk (headers)
- **Motion:** Framer Motion with reduced-motion support

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```
