# Hoosier Boy Barbershop — Companion App & Admin Platform

A premium mobile-first companion application and admin command center for Hoosier Boy Barbershop in Noblesville, Indiana. Combines customer-facing booking and shop information with internal operations management to replace traditional booking platforms with a complete, brand-aligned solution.

**Experience Qualities**:
1. **Effortless** — Booking and shop info should feel instant and intuitive, with under-30-second flows for repeat customers and one-tap access to essential shop features
2. **Premium** — Every interaction should reflect the high-quality service and trusted reputation of the shop through refined visuals, smooth animations, and confident design
3. **Personal** — The experience should feel like your neighborhood barbershop in your pocket, not a faceless corporate booking system

**Complexity Level**: Complex Application (advanced functionality with multiple views)
This is now a complete platform with public-facing customer features (booking, shop info, barber profiles, user preferences) and internal admin features (schedule management, client CRM, business intelligence). Designed to complement the main website while serving as the primary booking and operations hub.

## Essential Features

### 1. Shop Profile Landing
- **Functionality**: Introduces Hoosier Boy Barbershop with trust signals, location, rating, amenities, and strong booking CTA
- **Purpose**: Establishes brand trust and premium positioning before the user commits to booking
- **Trigger**: User arrives at app URL
- **Progression**: View shop hero → scan trust badges/reviews → read amenities → tap "Book Your Appointment"
- **Success criteria**: User understands shop identity and feels confident enough to start booking within 5 seconds

### 2. Service Selection
- **Functionality**: Displays all available services grouped by category (Popular, Jimmy's Services, Nate's Services, Hair Replacement) with pricing, duration, and descriptions
- **Purpose**: Helps customers quickly find the right service whether they need a basic cut, beard work, combo service, or specialty hair replacement
- **Trigger**: User taps booking CTA or navigates from landing
- **Progression**: Scan service categories → tap service card → review service details → confirm selection → advance to barber selection
- **Success criteria**: User can identify and select their desired service within 10 seconds on mobile

### 3. Barber Selection
- **Functionality**: Allows customer to choose Jimmy, Nate, or "Any Available Barber" with personality positioning and pricing updates
- **Purpose**: Gives customers choice and control while educating them on barber specialties
- **Trigger**: Service is selected
- **Progression**: View barber cards → read specialties → compare availability hints → tap barber → advance to scheduling
- **Success criteria**: User understands barber differences and makes confident selection; "Any Available" users see earliest possible slot

### 4. Date & Time Selection
- **Functionality**: Premium mobile calendar with horizontal date scroller and tap-friendly time chips showing available slots
- **Purpose**: Makes scheduling feel fast and visual rather than clunky form-based selection
- **Trigger**: Barber is selected
- **Progression**: Scroll through next 14 days → tap date → scan available time slots → tap time chip → confirm selection → advance to customer details
- **Success criteria**: User can find and select desired appointment slot within 15 seconds; no available slots show helpful empty state

### 5. Customer Details Form
- **Functionality**: Collects name, phone, email, optional notes with sticky booking summary and returning-user prefill
- **Purpose**: Captures contact information for confirmation and reminders while maintaining booking momentum
- **Trigger**: Date and time selected
- **Progression**: Review booking summary → fill/confirm contact details → add optional notes → tap "Confirm Booking" → advance to confirmation
- **Success criteria**: Form validates properly, prefills for returning users, and feels fast on mobile keyboards

### 6. Booking Confirmation
- **Functionality**: Shows success state with appointment summary, add-to-calendar action, and quick rebooking option
- **Purpose**: Provides receipt-style confirmation and reinforces trust while offering helpful next actions
- **Trigger**: Booking submitted successfully
- **Progression**: See success animation → review appointment card → add to calendar → call shop if needed → book another appointment
- **Success criteria**: User feels confident booking is complete and knows exactly when/where to show up

### 7. Returning User Fast-Booking
- **Functionality**: Detects previous bookings in local storage and offers "Book the same as last time" shortcut
- **Purpose**: Reduces repeat booking friction from 30 seconds to under 10 seconds
- **Trigger**: User with previous booking data arrives at app
- **Progression**: See returning user prompt → tap "Book Again" → review pre-filled selections → adjust if needed → advance directly to scheduling
- **Success criteria**: Repeat customers can rebook in under 10 seconds

### 8. Public Companion App (Phase 3)
- **Functionality**: Mobile-first companion app with bottom navigation providing fast access to booking, shop info, barbers, and personal profile
- **Purpose**: Creates an installable, keep-worthy app that complements the main website without duplicating it - optimized for repeat customers
- **Trigger**: User opens app (defaults to public home view)
- **Progression**: Browse home hub → access quick actions → explore barber profiles → check hours/contact → manage bookings in profile
- **Success criteria**: Users can find any key information or complete any primary action within 2 taps from home

### 9. Home Hub
- **Functionality**: Premium landing screen with logo, hero image, shop overview, featured barbers, reviews, hours snapshot, and quick actions
- **Purpose**: Single-screen access to all essential shop information and primary CTAs
- **Trigger**: Opening the public app
- **Progression**: View hero and branding → scan trust signals → tap primary "Book" CTA or explore quick actions
- **Success criteria**: Communicates brand identity and provides clear next actions within 3 seconds

### 10. Barbers Directory
- **Functionality**: Detailed barber profiles with specialties, availability, featured services, and booking CTAs
- **Purpose**: Helps customers get to know the barbers and choose who to book with
- **Trigger**: Tap "Barbers" in bottom nav or barber card from home
- **Progression**: Browse barber cards → tap for details → view specialties and services → book with selected barber
- **Success criteria**: Users understand each barber's expertise and can easily book their preferred barber

### 11. Shop Info Quick Reference
- **Functionality**: Clean, scannable page with address, hours, contact methods, map link, and website link
- **Purpose**: One-stop reference for all shop logistics
- **Trigger**: Tap "Shop" in bottom nav or hours/contact shortcuts
- **Progression**: View hours → check today's status → call/email/get directions → visit full website if needed
- **Success criteria**: Users can find and act on any contact/location info within 5 seconds

### 12. You Profile & Quick Actions
- **Functionality**: Personal hub with upcoming/past appointments, favorite barber, and one-tap actions (book again, call, directions, hours)
- **Purpose**: Personalized command center for repeat customers
- **Trigger**: Tap "You" in bottom nav
- **Progression**: View upcoming appointments → see booking history → use quick actions → manage preferences
- **Success criteria**: Repeat users can rebook or contact shop faster than any other method

## Edge Case Handling

- **No Available Slots**: Show polished empty state with suggestions for alternative dates or barbers
- **Service Duration Conflicts**: Only display time slots that can fully accommodate selected service duration
- **Invalid Form Data**: Real-time validation with clear inline error messages and guidance
- **Session Interruption**: Preserve booking progress in local state so users can resume if they navigate away
- **Long Service Duration**: Hair replacement services (1-3 hours) show fewer but appropriate time slots
- **Mobile Keyboard Issues**: Use proper input types (tel, email) for optimized mobile keyboards
- **Barber Unavailability**: "Any Available" option surfaces earliest slot across all barbers

## Design Direction

The design should evoke confidence, craft, and premium local service — like walking into a high-end neighborhood barbershop where everyone knows your name. Visually, it should feel dark and masculine but refined, with warm brass accents that suggest quality and care. The experience should feel fast, modern, and mobile-native, never clunky or generic. Every detail should communicate trust and competence.

## Color Selection

A sophisticated dark palette with warm metallic accents to convey premium barbering and masculine refinement.

- **Primary Color**: Deep Charcoal `oklch(0.20 0.01 240)` — Main brand foundation that suggests quality and seriousness without harshness
- **Secondary Colors**: 
  - Rich Black `oklch(0.12 0.01 240)` for cards and elevated surfaces
  - Soft Charcoal `oklch(0.25 0.01 240)` for subtle backgrounds
- **Accent Color**: Warm Brass `oklch(0.72 0.14 75)` — Premium metallic highlight for CTAs, selected states, and focal points that feels upscale and inviting
- **Foreground/Background Pairings**:
  - Background (Deep Charcoal #2e2f33): White text (#FAFAFA) - Ratio 11.2:1 ✓
  - Card (Rich Black #1a1b1e): White text (#FAFAFA) - Ratio 13.8:1 ✓
  - Accent (Warm Brass #d4a574): Deep Charcoal text (#2e2f33) - Ratio 5.8:1 ✓
  - Muted text on backgrounds: Light Gray (#a8a9ad) - Ratio 5.2:1 ✓

## Font Selection

Typography should feel confident, modern, and refined with excellent readability on mobile devices while projecting premium service quality.

- **Primary Font**: DM Sans — Clean geometric sans-serif with professional warmth, excellent at small sizes on mobile
- **Accent Font**: Space Grotesk — Bold, distinctive headers that project confidence without feeling corporate

**Typographic Hierarchy**:
- Hero Title: Space Grotesk Bold / 32px / tight (-0.02em)
- Section Headers: Space Grotesk SemiBold / 24px / tight (-0.01em)
- Card Titles: DM Sans Bold / 18px / normal
- Body Text: DM Sans Regular / 16px / relaxed (0.01em)
- Supporting Text: DM Sans Medium / 14px / normal
- Small Labels: DM Sans Medium / 12px / wide (0.02em) / uppercase

## Animations

Animations should feel purposeful and premium — smooth transitions that guide attention and confirm actions without slowing down the booking flow. Use subtle scale, fade, and slide effects during navigation. Time chips and cards should have satisfying micro-interactions on tap. The confirmation screen should include a brief success animation that feels rewarding. All motion should respect reduced-motion preferences and feel fast (200-300ms for most transitions).

## Component Selection

- **Components**:
  - **Card**: Primary container for services, barbers, booking summary, and confirmation details with subtle elevation
  - **Button**: Strong CTAs with accent color for primary actions, outline style for secondary
  - **Badge**: Small chips for amenities, specialties, availability hints, "Most Booked" labels
  - **ScrollArea**: Horizontal date scroller and service category navigation
  - **Avatar**: Barber profile images with fallback initials
  - **Input / Textarea**: Contact form fields with clean focus states
  - **Checkbox**: Opt-in for reminders and save-my-details
  - **Separator**: Subtle dividers between sections
  - **Dialog**: Optional service detail expansion or booking review
  
- **Customizations**:
  - Custom time slot chip component (not in shadcn) with selected/disabled states
  - Custom date scroller with active date highlighting
  - Custom booking progress indicator
  - Custom success animation using framer-motion
  - Sticky booking summary bar for mobile
  
- **States**:
  - Buttons: default, hover (subtle brightness increase), active (scale 0.98), disabled (reduced opacity)
  - Time chips: default (muted), hover (border glow), selected (accent fill), disabled (very muted, no interaction)
  - Cards: default (subtle border), hover (border highlight), selected (accent border)
  - Inputs: default (subtle border), focus (accent ring), error (destructive ring), success (subtle green tint)
  
- **Icon Selection**:
  - **MapPin**: Location indicator
  - **Star**: Rating display
  - **Calendar**: Date picker and add-to-calendar
  - **Clock**: Duration and time indicators
  - **Check**: Confirmation and success states
  - **Phone**: Contact shop action
  - **User**: Customer profile
  - **Scissors**: Service category (used sparingly)
  - **ChevronRight**: Navigation and progression
  - **Plus**: Add to calendar or book another
  
- **Spacing**:
  - Container padding: px-4 md:px-6 (mobile-first)
  - Section gaps: gap-6 md:gap-8
  - Card padding: p-4 md:p-6
  - Tight groupings: gap-2
  - Form field spacing: space-y-4
  - Sticky footer: pb-6 with safe-area-inset
  
- **Mobile**:
  - Single column layout throughout booking flow
  - Horizontal scrollers for dates and categories
  - Sticky booking summary and CTA buttons on longer screens
  - Full-width tap targets (minimum 48px height)
  - Bottom sheet style progression for each booking step
  - Reduced motion on smaller viewports
  - Touch-friendly spacing (minimum 8px between interactive elements)
