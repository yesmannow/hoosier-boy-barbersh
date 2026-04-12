# Hoosier Boy Barbershop — Complete Business Platform

A comprehensive mobile-first companion application and intelligent admin command center for **Hoosier Boy Barbershop** in Noblesville, Indiana. This all-in-one platform replaces traditional booking systems, CRMs, and fragmented tools with a premium, brand-aligned solution that serves clients, barbers, and shop owners.

## 🎯 Platform Value

### For Clients
**Effortless booking, personalized service, always connected to your barber**
- Book appointments in under 30 seconds with intuitive mobile-first design
- See real-time availability for your preferred barber
- One-tap rebooking of favorite services
- Instant booking confirmations and reminders
- Personal appointment history and quick actions
- Direct access to shop info, hours, and contact options
- Premium experience that reflects the quality of service you'll receive

### For Barbers (Employees)
**Everything you need to deliver exceptional service**
- Real-time view of your daily schedule and upcoming appointments
- Quick access to client history and preferences before each appointment
- Easy status updates (checked-in, in-progress, completed, no-show)
- Week-at-a-glance calendar to plan your time
- Client notes and communication history for personalized service
- Performance metrics and earnings tracking
- Mobile-optimized for on-the-go schedule checks

### For Shop Owner
**Complete business intelligence and growth automation**
- Real-time dashboard with daily metrics and business health indicators
- Advanced Client CRM with lifecycle stages (Lead, New, Active, VIP, At-Risk, Lost)
- Automated client segmentation and retention insights
- Communication history tracking (emails, SMS, notes, calls)
- Quick actions for re-engagement campaigns
- Dual-view capability: Owner overview or individual barber perspective
- **Automation & AI Hub** — Connect marketing, CRM, and AI tools to run the business on autopilot
- Revenue tracking, appointment analytics, and trend identification
- Shop profile management for consistent brand presentation

## ✨ Key Features

### Public App (Customer-Facing)
- **🏠 Home Hub** — Beautiful shop showcase with barber previews, reviews, hours, and instant booking
- **📅 Smart Booking Flow** — 5-step guided experience: Service → Barber → Date/Time → Details → Confirmation
- **✂️ Barbers Directory** — Detailed profiles with specialties, featured services, and one-tap booking
- **📍 Shop Info** — Address, hours, phone, email, directions, and website access
- **👤 You Profile** — Personal appointment hub with history, favorites, and quick rebooking

### Admin Platform
- **📊 Dashboard** — Real-time metrics, upcoming appointments, and actionable insights
- **🗓️ Daily Schedule** — Chronological appointment view with status management and client details
- **📆 Week View** — 7-day calendar overview across all barbers for strategic planning
- **👥 Advanced Client CRM** — Complete customer relationship management with:
  - Lifecycle stage tracking (Lead → New → Active → VIP → At-Risk → Lost)
  - Client segmentation and filtering
  - Communication history (emails, SMS, notes, calls)
  - Appointment history and spending analytics
  - Quick actions: Book, Call, Email, Add Note, Send Win-Back Offer
  - Tags and custom fields for personalization
- **🤖 Automation & AI Hub** — Central integration platform for business automation:
  - AI Assistants: ChatGPT, Claude, Gemini for auto-replies, content, and intelligent scheduling
  - Marketing Tools: Mailchimp, Google Ads, Meta Ads, SMS marketing
  - CRM Connectors: HubSpot, Salesforce, Zoho for advanced pipeline management
  - Communication Platforms: Twilio SMS, SendGrid Email, Slack notifications
  - Calendar Integration: Google Calendar, Outlook syncing
  - Pre-built workflows: Welcome series, win-back campaigns, review requests, referral incentives
  - Workflow builder with triggers and actions
  - Performance analytics for all automations
- **🏪 Shop Profile** — Manage shop details, gallery, services, and brand presentation
- **🔄 Dual-View Mode** — Switch between Owner (full shop overview) and Barber (individual schedule) perspectives

## 🚀 Business Impact

### Revenue Growth
- **Reduced No-Shows**: Automated reminders and easy rescheduling reduce missed appointments
- **Increased Rebooking**: One-tap rebooking makes it effortless for clients to return
- **Upsell Opportunities**: Service recommendations and combo suggestions during booking
- **Win-Back Automation**: Identify at-risk clients and automatically send re-engagement offers
- **VIP Client Recognition**: Track high-value clients and provide personalized experiences

### Operational Efficiency
- **Zero Double-Bookings**: Real-time availability prevents scheduling conflicts
- **Centralized Client Data**: All client information, preferences, and history in one place
- **Time Savings**: Automated confirmations, reminders, and follow-ups save hours per week
- **Smart Scheduling**: View daily and weekly schedules across all barbers at a glance
- **Instant Updates**: Status changes sync across owner and barber views in real-time

### Customer Experience
- **Premium First Impression**: Polished, brand-aligned app reflects service quality
- **Booking Convenience**: Book 24/7 from anywhere in under 30 seconds
- **Transparency**: See real-time availability and instant confirmations
- **Personalization**: System remembers preferences and favorite barbers
- **Easy Communication**: One-tap to call, get directions, or view hours

### Marketing & Growth
- **Automated Campaigns**: Set up email and SMS campaigns that run on autopilot
- **Client Segmentation**: Target the right clients with the right message at the right time
- **AI-Powered Content**: Generate marketing copy, social posts, and email campaigns with AI
- **Retention Insights**: Identify at-risk clients before they're lost
- **Integration Ready**: Connect existing marketing tools (Mailchimp, Google Ads, Meta Ads, etc.)

## 💻 Tech Stack

- **React 19** with TypeScript — Modern, type-safe component architecture
- **Vite** for build tooling — Lightning-fast development and optimized production builds
- **Tailwind CSS v4** for styling — Utility-first CSS with custom design system
- **Framer Motion** for animations — Smooth, performant animations with reduced-motion support
- **Radix UI** primitives via shadcn/ui — Accessible, customizable UI components
- **GitHub Spark KV** for data persistence — Serverless key-value storage
- **date-fns** for date handling — Comprehensive date manipulation and formatting
- **Phosphor Icons** for iconography — Beautiful, consistent icon system

## Getting Started

```bash
npm install
npm run dev
```

The app runs on port 5000 by default. It defaults to the **Public App** view. Use the toggle in the top-right corner to switch between **Public** and **Admin** modes.

## 📁 Project Structure

```
src/
├── components/
│   ├── public/              # Public customer-facing views
│   │   ├── PublicApp.tsx    # Main public app container
│   │   ├── HomeView.tsx     # Shop showcase and quick actions
│   │   ├── BookView.tsx     # 5-step booking flow orchestrator
│   │   ├── BarbersView.tsx  # Barber directory and profiles
│   │   ├── ShopInfoView.tsx # Hours, location, contact info
│   │   └── YouView.tsx      # Personal appointment hub
│   ├── admin/               # Admin/operations views
│   │   ├── AdminApp.tsx     # Main admin container with role switching
│   │   ├── AdminLayout.tsx  # Sidebar navigation and layout
│   │   ├── Dashboard.tsx    # Business metrics and daily overview
│   │   ├── DailyScheduleView.tsx    # Chronological appointment timeline
│   │   ├── WeekView.tsx     # 7-day calendar grid
│   │   ├── ClientsView.tsx  # Advanced CRM with lifecycle stages
│   │   ├── AutomationView.tsx       # AI & automation hub with connectors
│   │   ├── ShopProfileView.tsx      # Shop info management
│   │   └── AppointmentDetailDrawer.tsx  # Appointment details and actions
│   ├── ui/                  # shadcn/ui component library
│   ├── BarberSelection.tsx
│   ├── Confirmation.tsx
│   ├── CustomerDetails.tsx
│   ├── DateTimeSelection.tsx
│   ├── NavigationHeader.tsx
│   ├── ServiceSelection.tsx
│   └── ServiceSelectionWithSidebar.tsx
├── lib/
│   ├── adminData.ts         # Shop, barber, client, and appointment data
│   ├── data.ts              # Core services, barbers, and shop data
│   ├── scheduling.ts        # Time slot generation and date utilities
│   ├── types.ts             # TypeScript interfaces and types
│   └── utils.ts             # Shared utilities
└── assets/
    └── images/              # Shop photos and logo
```

## 🎯 Shop Details

**Location:** 13901 Town Center Blvd, Suite 500, Noblesville, IN 46060

**Operating Hours:**
- Wednesday - Saturday: 9:00 AM - 6:00 PM
- Sunday - Tuesday: Closed

**Barbers:**
- **Jimmy Bissonette** — Classic Cuts & Beard Work specialist (Wed–Sat)
  - Specialties: Precision fades, traditional cuts, beard sculpting
  - 8+ years experience
- **Nate Gouty** — Premium Cuts & Non-Surgical Hair Replacement expert (Wed–Sat)
  - Specialties: Modern styles, hair systems, transformations
  - Certified in hair replacement systems

**Services:**
- **Haircuts** — Classic cuts, fades, modern styles ($35-45)
- **Beard Trims** — Sculpting, shaping, hot towel treatment ($25)
- **Hair + Beard Combo** — Complete grooming package ($55-65)
- **The Hour** — Premium extended service with styling ($75)
- **Hair Replacement** — Consultation, installation, maintenance (varies)

## 🔐 View Modes & Access

The platform includes intelligent view switching for different user roles:

### Public Mode
Default view for customers — full booking capabilities, shop information, and personal appointment management

### Admin Mode
Owner/Staff view with two perspectives:
- **Owner View** — Full shop oversight, all appointments, all clients, complete analytics
- **Barber View** — Individual barber's schedule, their clients, their metrics

**Toggle Views:** Use the buttons in the top-right corner to switch between Public/Admin modes and Owner/Barber perspectives

## 📱 Getting Started

### Installation & Development
```bash
# Install dependencies
npm install

# Start development server (runs on port 5000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### First-Time Setup
1. Clone the repository
2. Install dependencies with `npm install`
3. Start dev server with `npm run dev`
4. Open browser to `http://localhost:5000`
5. App defaults to **Public Mode** — use toggle to explore Admin features

### Testing Different Views
- **Customer Experience**: Stay in Public mode, try booking a service
- **Barber Dashboard**: Switch to Admin → Select Barber View
- **Owner Analytics**: Switch to Admin → Select Owner View
- **Automation Setup**: Admin → Automation & AI Hub tab

## 🎨 Design System

### Visual Identity
Dark masculine theme with warm brass accents that conveys premium barbering and masculine refinement:
- **Background:** Deep Charcoal `oklch(0.20 0.01 240)` — Professional foundation suggesting quality and seriousness
- **Card Surfaces:** Rich Black `oklch(0.12 0.01 240)` — Elevated surfaces with depth
- **Accent:** Warm Brass `oklch(0.72 0.14 75)` — Premium metallic highlight for CTAs and focal points
- **Typography:** DM Sans (body) + Space Grotesk (headers) — Confident, modern, refined
- **Motion:** Purposeful micro-interactions with Framer Motion, respecting reduced-motion preferences

### Mobile-First Approach
- Single-column layouts optimized for thumb-friendly interaction
- Minimum 48px tap targets for easy mobile use
- Sticky CTAs and summaries that follow scroll
- Horizontal scrollers for dates and categories
- Touch-optimized spacing (minimum 8px between interactive elements)
- Bottom sheet style progression for seamless flow

## 🤖 Automation & AI Hub

The platform includes a comprehensive automation center ready for integration with leading tools:

### AI Assistants
- **ChatGPT / OpenAI** — Auto-reply to inquiries, write marketing copy, summarize client notes
- **Claude (Anthropic)** — Client chat assistant, content generation, lead qualification
- **Gemini AI (Google)** — Google Ads optimization, calendar-aware scheduling, search insights

### Marketing Automation
- **Mailchimp** — Email campaigns, drip sequences, audience segmentation
- **Google Ads** — Local search ads with auto-pause on fully-booked days
- **Meta Ads** — Facebook/Instagram advertising with audience sync
- **SMS Marketing** — Automated text campaigns and reminders

### CRM Integration
- **HubSpot** — Full CRM, deal pipeline, contact sync
- **Salesforce** — Enterprise CRM, advanced automation
- **Zoho CRM** — Customer relationship management for small businesses

### Communication Tools
- **Twilio** — SMS notifications and two-way texting
- **SendGrid** — Transactional emails and newsletters
- **Slack** — Team notifications for bookings and updates

### Calendar Integration
- **Google Calendar** — Sync appointments to Google Calendar
- **Microsoft Outlook** — Sync with Outlook/Office 365

### Pre-Built Workflows
- **Welcome Series** — Automated onboarding for new clients
- **Win-Back Campaigns** — Re-engage at-risk clients automatically
- **Review Requests** — Ask for reviews after successful appointments
- **Referral Incentives** — Reward clients for bringing friends
- **Birthday Offers** — Automated birthday discounts and greetings
- **Appointment Reminders** — Multi-channel reminder sequences
- **Follow-Up Sequences** — Post-visit check-ins and rebooking prompts

## 📊 Client Lifecycle Management

The advanced CRM automatically categorizes clients based on behavior:

| Stage | Definition | Automatic Actions |
|-------|-----------|------------------|
| **Lead** | No appointments yet | Welcome series, intro offer |
| **New** | First appointment completed | Post-visit follow-up, encourage second booking |
| **Active** | Regular client (visited within 60 days) | Monthly newsletter, service suggestions |
| **VIP** | High-value client ($500+ spend, frequent visits) | Exclusive offers, priority booking, personal touches |
| **At-Risk** | 60+ days since last visit | Win-back campaign, special incentive |
| **Lost** | 120+ days since last visit | Final re-engagement attempt, feedback request |

## 🎯 Quick Actions (CRM)

Every client profile includes instant actions:
- 📅 **Book Appointment** — Quick booking from client profile
- 📞 **Call Client** — One-tap phone call
- ✉️ **Send Email** — Pre-filled email templates
- 📝 **Add Note** — Record preferences or important details
- 🎁 **Send Offer** — Win-back or appreciation discount
- 🔄 **Update Status** — Manually adjust lifecycle stage
- 🏷️ **Add Tags** — Custom categorization

## 📈 Analytics & Insights

### Owner Dashboard Metrics
- **Today's Revenue** — Real-time earnings tracking
- **Appointments Today** — Completed, upcoming, no-shows
- **Week Overview** — Trend comparison vs. previous week
- **Top Services** — Most booked services
- **Client Retention** — Active vs. at-risk ratio
- **Average Ticket** — Revenue per appointment
- **Barber Performance** — Individual metrics and comparisons

### Barber Dashboard Metrics
- **My Schedule** — Today's appointments and availability
- **My Earnings** — Daily and weekly revenue
- **My Clients** — Regular clients and VIPs
- **Service Mix** — Popular services I perform
- **Upcoming Appointments** — Next 7 days preview

## 🆕 Recent Updates

### Latest Release (April 2026)
**Enhanced Admin Platform with Automation & AI Hub**

**New Features:**
- ✨ **Automation & AI Hub** — Complete integration center for marketing, CRM, and AI tools
  - Connect 15+ popular platforms (Mailchimp, HubSpot, ChatGPT, Google Ads, etc.)
  - Pre-built workflow templates for common tasks
  - Workflow builder with visual triggers and actions
  - Performance analytics for all automations

- 🎯 **Advanced Client CRM** — Professional-grade customer relationship management
  - Automatic lifecycle stage categorization (Lead → New → Active → VIP → At-Risk → Lost)
  - Client segmentation and smart filtering
  - Communication history tracking (emails, SMS, notes, calls)
  - Quick action buttons for instant engagement
  - Custom tags and fields for personalization
  - Win-back campaign triggers for at-risk clients

- 🔄 **Consolidated View Switching** — Improved UI for mode switching
  - Fixed button overlap issue between Public/Admin toggles
  - Seamless Owner ↔ Barber view switching
  - Single fixed container for all view controls
  - Cleaner, more intuitive interface

**Improvements:**
- Enhanced mobile responsiveness across all admin views
- Better performance with large client lists
- Improved date/time handling in scheduling views
- Smoother animations and transitions
- Accessibility improvements throughout

**Bug Fixes:**
- Fixed overlapping buttons in admin navigation
- Resolved lifecycle stage calculation edge cases
- Improved state management in role switching

## 🗺️ Roadmap & Future Enhancements

### Phase 1: Foundation ✅ Complete
- [x] Public booking flow (5 steps)
- [x] Barber directory and profiles
- [x] Shop information and contact
- [x] Personal appointment hub
- [x] Admin dashboard and daily schedule
- [x] Week view calendar
- [x] Basic client CRM

### Phase 2: Intelligence & Automation ✅ Complete
- [x] Advanced CRM with lifecycle stages
- [x] Communication history tracking
- [x] Client segmentation
- [x] Automation & AI Hub
- [x] Integration connectors
- [x] Pre-built workflow templates
- [x] Owner/Barber dual views

### Phase 3: Live Integrations 🚧 In Progress
- [ ] Active AI assistant integration (ChatGPT/Claude)
- [ ] Live email marketing (Mailchimp/SendGrid)
- [ ] SMS automation (Twilio)
- [ ] Calendar sync (Google/Outlook)
- [ ] Payment processing integration
- [ ] Online payment collection

### Phase 4: Advanced Features 📋 Planned
- [ ] Mobile app wrapper (iOS/Android)
- [ ] Push notifications
- [ ] Waitlist management
- [ ] Gift card sales and tracking
- [ ] Membership/subscription packages
- [ ] Inventory management for products
- [ ] Point-of-sale integration
- [ ] Advanced reporting and analytics
- [ ] Multi-location support

### Phase 5: Growth & Scale 💡 Future
- [ ] Referral program automation
- [ ] Loyalty points system
- [ ] Social media integration
- [ ] Review generation automation
- [ ] AI-powered appointment optimization
- [ ] Predictive booking suggestions
- [ ] Video consultations
- [ ] Marketplace for barber services

## 💡 Why This Platform?

### Replaces Multiple Tools
This single platform replaces the need for:
- ❌ Square Appointments / Booksy / Schedulicity ($50-200/month)
- ❌ Mailchimp / Constant Contact ($20-100/month)
- ❌ HubSpot CRM / Salesforce ($50-300/month)
- ❌ Reminders App / SMS service ($20-50/month)
- ❌ Custom website booking plugin ($500-2000 one-time)
- ✅ **Total Savings: $140-650/month + setup costs**

### Built Specifically for Hoosier Boy
- Custom branding that matches shop identity
- Designed for your exact services and workflow
- No generic templates or unnecessary features
- Complete control and ownership
- No per-booking fees or transaction charges

### Technical Advantages
- **Fast**: Modern React architecture loads instantly
- **Reliable**: Built on proven, enterprise-grade technologies
- **Secure**: Type-safe code reduces bugs and vulnerabilities
- **Scalable**: Can grow from 2 barbers to 20+ without redesign
- **Maintainable**: Clean code structure for easy updates
- **Accessible**: WCAG compliant for all users

## 🤝 Support & Contribution

### Getting Help
- **Documentation**: See PRD.md for detailed product requirements
- **Issues**: Open GitHub issues for bugs or feature requests
- **Questions**: Contact the development team

### Development Guidelines
- Follow existing code style and patterns
- Write TypeScript with proper types
- Test on mobile devices before committing
- Ensure accessibility standards
- Document complex logic and components

## 📄 License

This project is proprietary software developed for Hoosier Boy Barbershop.

---

**Built with care for Hoosier Boy Barbershop** ✂️  
*Noblesville, Indiana's premier barbershop experience, now in your pocket*
