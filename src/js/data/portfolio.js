/**
 * Single Source of Truth for portfolio metadata, case studies,
 * architecture diagrams, and command palette items.
 * Privacy rule: Only personal project LexiNote exposes a public live URL.
 */

export const PROFILE = Object.freeze({
  name: 'Le Minh Tuong',
  email: 'leminhtuong09122002@gmail.com',
  githubUrl: 'https://github.com/MinhTuongLe',
  cvPath: './assets/docs/Le-Minh-Tuong-Frontend-CV.pdf',
  lexinoteUrl: 'https://lexi-note.vercel.app',
});

export function buildArchitectureDiagram(type, suffix = '') {
  if (type === 'coco-yersin') {
    const bId = `arrow-blue${suffix}`;
    const sId = `arrow-slate${suffix}`;
    return `
      <div class="arch-diagram-label">
        <span>DATA-FLOW // REAL-TIME QMS &amp; PORTAL</span>
        <span class="arch-status-live">● SOCKET.IO + RBAC</span>
      </div>
      <svg class="arch-diagram-svg" viewBox="0 0 520 96" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Reception Counter emits to Socket.IO Hub which broadcasts to Lobby Display and Audio Calling, alongside Yersin Portal RBAC">
        <defs>
          <marker id="${bId}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563EB" />
          </marker>
          <marker id="${sId}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748B" />
          </marker>
        </defs>
        <rect x="2" y="6" width="136" height="36" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
        <text x="70" y="21" text-anchor="middle" fill="#0F172A" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600">CLINIC COUNTER</text>
        <text x="70" y="34" text-anchor="middle" fill="#64748B" font-family="Inter, sans-serif" font-size="9">Call / Skip / Config</text>

        <line x1="138" y1="24" x2="188" y2="24" stroke="#2563EB" stroke-width="1.5" marker-end="url(#${bId})" />
        <text x="163" y="18" text-anchor="middle" fill="#2563EB" font-family="JetBrains Mono, monospace" font-size="8.5">emit</text>

        <rect x="192" y="6" width="136" height="36" rx="6" fill="#EFF6FF" stroke="#BFDBFE" />
        <text x="260" y="21" text-anchor="middle" fill="#1D4ED8" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600">SOCKET.IO HUB</text>
        <text x="260" y="34" text-anchor="middle" fill="#475569" font-family="Inter, sans-serif" font-size="9">Queue State Sync</text>

        <line x1="328" y1="24" x2="378" y2="24" stroke="#2563EB" stroke-width="1.5" marker-end="url(#${bId})" />
        <text x="353" y="18" text-anchor="middle" fill="#2563EB" font-family="JetBrains Mono, monospace" font-size="8.5">push</text>

        <rect x="382" y="6" width="136" height="36" rx="6" fill="#0F172A" stroke="#0F172A" />
        <text x="450" y="21" text-anchor="middle" fill="#F8FAFC" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600">LOBBY + AUDIO</text>
        <text x="450" y="34" text-anchor="middle" fill="#34D399" font-family="JetBrains Mono, monospace" font-size="9">Ticket A-042</text>

        <rect x="2" y="56" width="176" height="34" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
        <text x="90" y="71" text-anchor="middle" fill="#0F172A" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600">YERSIN PORTAL (TS)</text>
        <text x="90" y="83" text-anchor="middle" fill="#64748B" font-family="Inter, sans-serif" font-size="9">Role-Based Views</text>

        <line x1="178" y1="73" x2="226" y2="73" stroke="#64748B" stroke-width="1.3" stroke-dasharray="3 3" marker-end="url(#${sId})" />

        <rect x="230" y="56" width="136" height="34" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
        <text x="298" y="77" text-anchor="middle" fill="#475569" font-family="JetBrains Mono, monospace" font-size="9.5">Admin Records</text>

        <rect x="382" y="56" width="136" height="34" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
        <text x="450" y="77" text-anchor="middle" fill="#475569" font-family="JetBrains Mono, monospace" font-size="9.5">Patient Profile</text>

        <line x1="366" y1="73" x2="378" y2="73" stroke="#CBD5E1" stroke-width="1.3" />
      </svg>
    `;
  }

  if (type === 'paradise') {
    const bId = `arrow-blue-2${suffix}`;
    return `
      <div class="arch-diagram-label">
        <span>DATA-FLOW // FRONTEND ARCHITECTURE</span>
        <span class="arch-status-accent">NEXT.JS + REDUX TOOLKIT</span>
      </div>
      <svg class="arch-diagram-svg" viewBox="0 0 520 96" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Next.js Search UI dispatches to Redux Toolkit State which syncs with Partner REST API">
        <defs>
          <marker id="${bId}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563EB" />
          </marker>
        </defs>
        <rect x="2" y="6" width="140" height="36" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
        <text x="72" y="21" text-anchor="middle" fill="#0F172A" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600">NEXT.JS CLIENT</text>
        <text x="72" y="34" text-anchor="middle" fill="#64748B" font-family="Inter, sans-serif" font-size="9">Filters &amp; Booking UI</text>

        <line x1="142" y1="24" x2="188" y2="24" stroke="#2563EB" stroke-width="1.5" marker-end="url(#${bId})" />
        <text x="165" y="18" text-anchor="middle" fill="#2563EB" font-family="JetBrains Mono, monospace" font-size="8.5">state</text>

        <rect x="192" y="6" width="136" height="36" rx="6" fill="#EFF6FF" stroke="#BFDBFE" />
        <text x="260" y="21" text-anchor="middle" fill="#1D4ED8" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600">REDUX TOOLKIT</text>
        <text x="260" y="34" text-anchor="middle" fill="#475569" font-family="Inter, sans-serif" font-size="9">Search / Auth Slices</text>

        <line x1="328" y1="24" x2="374" y2="24" stroke="#2563EB" stroke-width="1.5" marker-end="url(#${bId})" />
        <text x="351" y="18" text-anchor="middle" fill="#2563EB" font-family="JetBrains Mono, monospace" font-size="8.5">REST</text>

        <rect x="378" y="6" width="140" height="36" rx="6" fill="#0F172A" stroke="#0F172A" />
        <text x="448" y="21" text-anchor="middle" fill="#F8FAFC" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600">PARTNER API</text>
        <text x="448" y="34" text-anchor="middle" fill="#94A3B8" font-family="Inter, sans-serif" font-size="9">Listings &amp; Reservations</text>

        <rect x="2" y="56" width="164" height="34" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
        <text x="84" y="77" text-anchor="middle" fill="#475569" font-family="JetBrains Mono, monospace" font-size="9.5">Multi-Criteria Search</text>

        <rect x="178" y="56" width="164" height="34" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
        <text x="260" y="77" text-anchor="middle" fill="#475569" font-family="JetBrains Mono, monospace" font-size="9.5">Booking Management</text>

        <rect x="354" y="56" width="164" height="34" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
        <text x="436" y="77" text-anchor="middle" fill="#475569" font-family="JetBrains Mono, monospace" font-size="9.5">Auth &amp; Protected Routes</text>
      </svg>
    `;
  }

  return '';
}

export const CASE_STUDIES_LIST = Object.freeze([
  {
    id: 'kindie',
    tier: 'featured',
    categories: ['mobile', 'web'],
    eyebrow: 'EDTECH ECOSYSTEM • ZINISOFT',
    platformBadge: 'WEB + iOS + ANDROID',
    title: 'Kindie — Kindergarten Management Platform',
    cmdTitle: 'Architecture: Kindie — Kindergarten Platform',
    cmdKeywords: 'edtech pwa expo school react native',
    subtitle: 'End-to-end frontend architecture across multi-branch School Admin Web and Teacher/Parent Mobile App.',
    summary:
      'Owned end-to-end frontend architecture across both the multi-branch School Admin Web portal and cross-platform Teacher/Parent mobile app, shaped by researching real school workflows.',
    highlight:
      'Delivered consistent web + mobile flows for In/Out attendance gates, daily routines, meal/medical reports, bus tracking, and tuition overview; managed App Store & Google Play releases.',
    statusText: 'Shipped on Web, iOS & Android',
    role: 'Sole Frontend Owner (Web + Mobile)',
    platforms: 'Web Admin, PWA, iOS & Android',
    ownership: 'Company Product • Production Store Release',
    thumbnail: './assets/thumbnails/kindie.webp',
    thumbnailAlt: 'Kindie Admin Web dashboard and Teacher mobile app screens',
    lightboxTitle: 'Kindie — Multi-Branch Admin Web & Teacher Mobile App',
    problem:
      'Preschools needed one cohesive workflow connecting administrators, teachers, and parents across daily attendance gates, meal/nap/medical logs, bus tracking, and tuition overview without fragmented UX between web and mobile.',
    decisions: [
      'Researched real kindergarten operations and comparable platforms to establish shared UI patterns across the School Admin portal and Teacher/Parent mobile flows.',
      'Structured shared domain models and API contracts in TypeScript so check-in/out updates synchronize consistently between mobile clients and branch dashboards.',
      'Delivered daily operation modules (attendance In/Out, medical reminders, nutrition/activity cards, finance/tuition) with predictable state transitions.',
      'Managed App Store and Google Play release pipelines, resolving store review requirements and build configurations.',
    ],
    tradeoff:
      'Kept Web Admin and Expo Mobile decoupled at the UI layer while aligning TypeScript domain contracts and workflow states — avoiding heavy cross-platform UI abstractions while keeping teacher gate operations fast during peak pickup hours.',
    tags: ['React.js', 'TypeScript', 'React Native', 'Expo', 'PWA'],
    liveUrl: null,
  },
  {
    id: 'bami',
    tier: 'featured',
    categories: ['mobile'],
    eyebrow: 'F&B COMMERCE • ZINISOFT',
    platformBadge: '10K+ DOWNLOADS • MOBILE',
    title: 'BAMI — Food Ordering & Multi-Gateway Payments',
    cmdTitle: 'Architecture: BAMI — Multi-Gateway Payments',
    cmdKeywords: 'stripe apple pay google pay anz food ordering',
    subtitle: 'Production Australian mobile commerce app with 10K+ downloads supporting Click & Collect, Delivery, and Catering.',
    summary:
      'Maintained and extended a production Australian food-ordering mobile app supporting Click & Collect, Delivery, Catering orders, dish customization, and real-time order status tracking.',
    highlight:
      'Integrated Stripe, Apple Pay, Google Pay, and ANZ Payment Gateway with centralized error recovery, delivery-radius validation, and App Store / Google Play release management.',
    statusText: 'Shipped on iOS & Android',
    role: 'Frontend & Mobile Engineer',
    platforms: 'iOS & Android (10K+ Downloads)',
    ownership: 'Company Product • Production Store Release',
    thumbnail: './assets/thumbnails/bami.webp',
    thumbnailAlt: 'Bami Vietnamese mobile food ordering and pickup tracking screens',
    lightboxTitle: 'Bami Vietnamese — Food Ordering & Multi-Gateway Payments',
    problem:
      'Customers ordering food across multiple Australian store locations needed fast native wallet checkout, accurate delivery-radius enforcement, customizable dishes, and live pickup status updates with zero payment drop-offs.',
    decisions: [
      'Integrated Stripe SDK, Apple Pay (Wallet), Google Pay, and ANZ Payment Gateway behind a unified checkout flow with centralized error recovery.',
      'Maintained and extended complex menu customization, Click & Collect / Delivery / Catering flows, loyalty promotions, and real-time pickup order tracking.',
      'Implemented delivery-radius validation and handled edge cases around store operating hours and cart recalculation.',
      'Managed recurring App Store and Google Play production builds, SDK upgrades, and compliance review fixes.',
    ],
    tradeoff:
      'Normalized Stripe, Apple Pay, Google Pay, and ANZ error codes behind a single checkout adapter so cart state never resets on gateway timeout, letting customers retry or switch wallets cleanly without losing customized items.',
    tags: ['React Native', 'Stripe SDK', 'Apple Pay', 'Google Pay', 'ANZ Gateway'],
    liveUrl: null,
  },
  {
    id: 'kodo',
    tier: 'featured',
    categories: ['mobile', 'realtime'],
    eyebrow: 'HARDWARE / IOT • ZINISOFT',
    platformBadge: 'BLE • iOS & ANDROID',
    title: 'Kodo Fragrances — Smart Diffuser BLE Control',
    cmdTitle: 'Architecture: Kodo Fragrances — BLE Control',
    cmdKeywords: 'ble iot bluetooth diffuser expo hardware',
    subtitle: 'Bluetooth Low Energy mobile control layer for residential and commercial smart scent diffusers.',
    summary:
      'Built the Bluetooth Low Energy communication layer enabling mobile devices to discover, authenticate, and control smart fragrance diffusers for home and commercial spaces in real time.',
    highlight:
      'Implemented live BLE scanning, 4-digit PIN handshake auth, work/pause spray cycle configuration, oil capacity telemetry (ml), and production store releases on iOS & Android.',
    statusText: 'Shipped on iOS & Android',
    role: 'Mobile & BLE Integration Engineer',
    platforms: 'iOS & Android (BLE Hardware)',
    ownership: 'Company Product • Production Store Release',
    thumbnail: './assets/thumbnails/kodo.webp',
    thumbnailAlt: 'Kodo Fragrances Bluetooth Low Energy scanner, device configuration, and PIN pairing screens',
    lightboxTitle: 'Kodo Fragrances — Smart Diffuser BLE IoT Control',
    problem:
      'Controlling physical scent diffusers over Bluetooth Low Energy requires reliable peripheral discovery, PIN handshake authentication, and real-time spray cycle updates despite intermittent wireless connections.',
    decisions: [
      'Built the BLE scanning, GATT service resolution, and 4-digit PIN authentication flow connecting mobile clients to smart diffuser hardware.',
      'Engineered real-time device configuration for scent intensity levels, work/pause spray cycles, room occupancy presets, and oil capacity telemetry (ml).',
      'Handled hardware disconnect recovery, permission flows across iOS/Android OS versions, and App Mode state toggles.',
      'Delivered end-to-end production releases on both Apple App Store and Google Play Store.',
    ],
    tradeoff:
      'Isolated BLE connection lifecycle and OS-specific permission checks (Android GATT 133 vs iOS CoreBluetooth states) from presentation screens, enabling automatic session re-bond instead of forcing manual re-pairing on transient signal drops.',
    tags: ['React Native', 'Expo', 'Bluetooth Low Energy', 'App Store / Play Store'],
    liveUrl: null,
  },
  {
    id: 'lexinote',
    tier: 'featured',
    categories: ['web'],
    eyebrow: 'PERSONAL PROJECT • 03/2026 – PRESENT',
    platformBadge: 'FULL-STACK OWNERSHIP',
    title: 'LexiNote — English Vocabulary Platform',
    cmdTitle: 'Architecture: LexiNote — Vocabulary Platform',
    cmdKeywords: 'nestjs postgresql vocabulary flashcard vite tailwind',
    subtitle: 'Full-stack vocabulary learning platform with AI extraction, flashcards, word matching, and bulk CSV/Excel workflows.',
    summary:
      'Independently built and deployed an English vocabulary app featuring flashcard review, manual word-matching games, AI vocabulary extraction, curated decks (IELTS, TOEIC, IT Tech), and CSV/Excel bulk import & export.',
    highlight:
      'Owned both the Vite + React + TypeScript frontend and Nest.js + PostgreSQL backend from scratch, adding auth, audio pronunciation, daily streak tracking, and accuracy analytics on free-tier hosting.',
    statusText: 'Personal Production App',
    role: 'Creator & Full-Stack Engineer',
    platforms: 'Web App (Vercel + Nest.js + PostgreSQL)',
    ownership: 'Personal Production App',
    thumbnail: './assets/thumbnails/lexinote.webp',
    thumbnailAlt: 'LexiNote vocabulary learning dashboard with study streak, flashcards, AI Extract, and word matching',
    lightboxTitle: 'LexiNote — Full-Stack English Vocabulary Platform',
    problem:
      'Wanted a fast, distraction-free personal vocabulary workspace combining active recall flashcards, word-matching practice, AI extraction from raw text, and spreadsheet import/export without paid lock-in.',
    decisions: [
      'Architected a Vite + React + TypeScript frontend with Redux Toolkit and Tailwind CSS paired with a Nest.js + PostgreSQL REST backend.',
      'Built flashcard review sessions, manual word-matching games, AI vocabulary extraction, and curated IELTS / TOEIC / IT Tech decks.',
      'Implemented CSV/Excel bulk import & export, audio pronunciation playback, daily study streak tracking, and accuracy analytics.',
      'Engineered and deployed the full stack reliably on free-tier cloud infrastructure.',
    ],
    tradeoff:
      'Balanced full-stack features on free-tier hosting by validating CSV/Excel payloads client-side before batch upload and designing resilient loading states for API cold starts without complicating infrastructure.',
    tags: ['Vite + React', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'Nest.js', 'PostgreSQL'],
    liveUrl: PROFILE.lexinoteUrl,
  },
  {
    id: 'coco-yersin',
    tier: 'architecture',
    categories: ['web', 'realtime'],
    eyebrow: 'HEALTHCARE & QMS • ZINISOFT',
    platformBadge: 'REAL-TIME WEB',
    title: 'Coco QMS & Yersin Patient Portal',
    cmdTitle: 'Architecture: Coco QMS & Yersin Portal',
    cmdKeywords: 'qms socket healthcare medical rbac',
    subtitle: 'Real-time Socket.IO clinic queue management with audio patient-calling alongside a dual-role medical records portal.',
    summary:
      'Built Coco QMS, a product-oriented queue management system with Socket.IO real-time updates, audio patient-calling, and configurable clinic settings, alongside Yersin Portal for dual-role medical records.',
    highlight:
      'Architected low-latency WebSocket event synchronization for clinic displays, automated audio callouts, and structured admin/patient record views backed by strict TypeScript models.',
    statusText: 'Private Enterprise Deployments',
    role: 'Frontend Architect',
    platforms: 'Internal Web Systems (Private Deployments)',
    ownership: 'Company Products • Enterprise Internal',
    diagramType: 'coco-yersin',
    diagramAriaLabel: 'System data-flow diagram for Coco QMS and Yersin Portal',
    problem:
      'Healthcare clinics needed deterministic, low-latency queue calling across reception counters and lobby TV screens with audio callouts, plus role-separated medical record portals for admins and patients.',
    decisions: [
      'Architected Socket.IO event streams syncing reception counter actions (call, skip, transfer, config) instantaneously to lobby display boards.',
      'Built automated audio patient-calling workflows and configurable clinic rules for productized multi-clinic deployment.',
      'Structured strict TypeScript domain models and role-based views for Yersin Portal separating admin record management from patient profile access.',
      'Applied modular component boundaries and predictable error handling for continuous clinic-floor uptime.',
    ],
    tradeoff:
      'Serialized incoming Socket.IO ticket announcements through a deterministic client-side audio playback queue and resynced full board state on reconnect, preventing overlapping clinic voice announcements during rapid counter calls.',
    tags: ['React.js', 'TypeScript', 'Socket.IO', 'Audio Queue Calling'],
    liveUrl: null,
  },
  {
    id: 'paradise',
    tier: 'architecture',
    categories: ['web'],
    eyebrow: 'CAPSTONE PROJECT • HCMUTE (10/2023 – 07/2024)',
    platformBadge: 'FRONTEND ARCHITECTURE',
    title: 'Paradise Booking — Accommodation Platform',
    cmdTitle: 'Architecture: Paradise Booking Platform',
    cmdKeywords: 'nextjs redux booking capstone accommodation',
    subtitle: 'Sole frontend engineering ownership for a full accommodation search, filtering, and reservation web platform.',
    summary:
      'Solely engineered the entire frontend for an accommodation booking platform with multi-criteria search filters, reservation management, and authentication integrated with a partner-owned backend.',
    highlight:
      'Designed modular filter state synchronization, clean REST API integration, and responsive booking workflows using Next.js, TypeScript, Tailwind CSS, and Redux Toolkit.',
    statusText: 'Graduation Capstone',
    role: 'Sole Frontend Engineer',
    platforms: 'Next.js Web Platform',
    ownership: 'University Graduation Capstone',
    diagramType: 'paradise',
    diagramAriaLabel: 'Frontend architecture diagram for Paradise Booking Platform',
    problem:
      'Deliver a complete, responsive accommodation booking experience integrating multi-criteria filtering, reservation lifecycle management, and protected user authentication against a partner-owned backend.',
    decisions: [
      'Designed modular Redux Toolkit slices synchronizing search criteria, pagination, availability filters, and authenticated booking sessions.',
      'Implemented clean REST API integration layers with consistent loading, empty, and validation feedback states.',
      'Structured Next.js routing, protected route guards, and responsive reservation views in TypeScript and Tailwind CSS.',
      'Delivered end-to-end frontend features independently on schedule for graduation defense.',
    ],
    tradeoff:
      'Centralized multi-criteria search parameters and pagination into normalized Redux Toolkit slices rather than scattered component state, keeping URL/UI filter changes predictable against a partner-owned REST API.',
    tags: ['Next.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS'],
    liveUrl: null,
  },
]);

export const CASE_STUDIES_MAP = Object.freeze(
  Object.fromEntries(CASE_STUDIES_LIST.map((item) => [item.id, item]))
);
