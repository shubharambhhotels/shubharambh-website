# Shubharambh Hotel & Banquet Hall — Website

**Pithoragarh, Uttarakhand, India**
A full-stack Next.js website for Shubharambh Hotel & Banquet Hall — a luxury Himalayan hospitality and spiritual tourism website.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | NextAuth.js |
| Payments | Razorpay |
| Email | Nodemailer |
| Deployment (Frontend) | Vercel |
| Deployment (DB) | Railway or Render |

---

## Colour Palette

```
--saffron:   #A44A1E   (primary brand)
--forest:    #234232   (secondary)
--ivory:     #F7F3EA   (background)
--stone:     #C9B8A5   (borders/muted)
--gold:      #C9A227   (accents/dividers)
--charcoal:  #1F1F1F   (dark sections)
```

---

## Project Structure

```
shubharambh/
├── prisma/
│   └── schema.prisma          # Database models
├── src/
│   ├── app/
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Root layout (fonts, metadata)
│   │   ├── about/page.tsx
│   │   ├── rooms/page.tsx
│   │   ├── experiences/page.tsx
│   │   ├── events/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── book/
│   │   │   ├── page.tsx        # Multi-step booking form
│   │   │   └── confirmation/   # Booking confirmed page
│   │   ├── admin/page.tsx      # Admin dashboard
│   │   ├── api/
│   │   │   └── bookings/
│   │   │       ├── create/route.ts   # Create Razorpay order
│   │   │       └── verify/route.ts   # Verify payment
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── WhyStaySection.tsx
│   │   │   ├── DestinationsSection.tsx
│   │   │   ├── RoomsSection.tsx
│   │   │   ├── ExperiencesSection.tsx
│   │   │   ├── CulturalSection.tsx
│   │   │   ├── BanquetSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── BookingCTASection.tsx
│   │   └── ui/
│   │       ├── ImagePlaceholder.tsx  # Replace with <Image> when photos ready
│   │       ├── SectionWrapper.tsx
│   │       └── WhatsAppFloat.tsx
│   ├── lib/
│   │   ├── prisma.ts           # Prisma client singleton
│   │   └── email.ts            # Nodemailer helper
│   └── styles/
│       └── globals.css         # Design tokens + base styles
├── public/
│   └── images/                 # Put all photos here (see image guide below)
├── .env.local.example          # Copy to .env.local and fill values
├── package.json
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## Setup — Step by Step

### 1. Prerequisites

```bash
node --version   # Must be >= 18
npm --version    # Must be >= 9
```

### 2. Clone and install

```bash
# If starting fresh, create project folder
mkdir shubharambh && cd shubharambh

# Or if using the provided files, just install dependencies
npm install
```

### 3. Set up environment variables

```bash
cp .env.local.example .env.local
# Now open .env.local in your editor and fill in all values
```

Required values in `.env.local`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/shubharambh_db?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
RAZORPAY_KEY_ID="rzp_test_XXXXXXXXXXXX"
RAZORPAY_KEY_SECRET="XXXXXXXXXXXXXXXXXXXX"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_XXXXXXXXXXXX"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your@gmail.com"
SMTP_PASS="your-gmail-app-password"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 4. Set up the database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to your PostgreSQL database
npx prisma db push

# (Optional) Open Prisma Studio to view/edit data
npx prisma studio
```

### 5. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Image Guide — Where to Place Photos

All photos go in `public/images/`. Create subfolders as needed:

```
public/images/
├── hero/
│   └── pithoragarh-hero.jpg        # Hero full-screen background
├── rooms/
│   ├── deluxe.jpg
│   ├── suite.jpg
│   ├── family.jpg
│   └── super-deluxe.jpg
├── destinations/
│   ├── adi-kailash.jpg
│   ├── kailash-mansarovar.jpg
│   ├── patal-bhuvaneshwar.jpg
│   ├── munsyari.jpg
│   ├── dhwaj-temple.jpg
│   ├── kapileshwar.jpg
│   ├── panchachuli.jpg
│   └── chandak.jpg
├── experiences/
│   ├── milam.jpg
│   ├── rafting.jpg
│   ├── chholiya.jpg
│   ├── cuisine.jpg
│   └── hiljatra.jpg
├── culture/
│   ├── chholiya.jpg
│   ├── holi.jpg
│   ├── hiljatra.jpg
│   ├── jhora.jpg
│   └── phooldei.jpg
├── banquet/
│   ├── hall-main.jpg
│   └── wedding-setup.jpg
├── gallery/
│   └── (12-15 photos for gallery page)
├── about/
│   └── pithoragarh-fort.jpg
└── og-image.jpg                    # 1200x630px for Open Graph / social sharing
```

**After adding photos**, replace every `<ImagePlaceholder>` component with `<Image>` from `next/image`. Each file has a comment showing the exact replacement code.

---

## Replacing Image Placeholders

Each component has a commented-out `<Image>` block ready to use. Example in `RoomsSection.tsx`:

```tsx
// Replace:
<ImagePlaceholder label={room.name} aspectRatio="aspect-video" />

// With:
<Image
  src={room.image}
  alt={room.name}
  width={640}
  height={360}
  className="object-cover w-full"
/>
```

---

## Razorpay Integration

1. Create account at `razorpay.com`
2. Get Test API keys from Dashboard → Settings → API Keys
3. Add to `.env.local`
4. In `src/app/book/page.tsx`, uncomment the full Razorpay block in `handleRazorpay()`
5. Add Razorpay script to `src/app/layout.tsx`:

```tsx
<Script src="https://checkout.razorpay.com/v1/checkout.js" />
```

6. In `src/app/api/bookings/create/route.ts`, uncomment the Prisma + Razorpay logic
7. In `src/app/api/bookings/verify/route.ts`, uncomment the verification + email logic
8. Switch to live keys when going to production (prefix `rzp_live_`)

---

## Email Setup (Gmail)

1. Enable 2-Step Verification on your Gmail account
2. Go to Google Account → Security → App Passwords
3. Generate an App Password for "Mail"
4. Use that as `SMTP_PASS` in `.env.local`

---

## Admin Dashboard

Visit `/admin` in your browser.

To add NextAuth authentication to protect it:
1. Add `NEXTAUTH_SECRET` to `.env.local`
2. Create `src/app/api/auth/[...nextauth]/route.ts`
3. Wrap the admin layout with a session check

---

## Build & Deploy

### Build for production

```bash
npm run build
npm run start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables on Vercel dashboard
# Settings → Environment Variables → paste all from .env.local
```

### Deploy database to Railway

```bash
# Create a PostgreSQL database on Railway (railway.app)
# Copy the DATABASE_URL from Railway
# Paste into .env.local and Vercel env vars
# Then run:
npx prisma db push
```

---

## SEO Target Keywords

- Hotels in Pithoragarh
- Best hotel in Pithoragarh
- Adi Kailash stay
- Kailash Mansarovar route hotel
- Banquet hall in Pithoragarh
- Wedding venue Pithoragarh
- Luxury stay in Kumaon
- Hotel near Naini Saini Airport

Dynamic metadata is already configured on every page.

---

## Google Maps Embed

In `src/app/contact/page.tsx`, find the Maps placeholder and replace with:

```tsx
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL_HERE"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
```

Get your embed URL from Google Maps → Share → Embed a map.

---

## Useful Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

npx prisma generate  # Regenerate Prisma client after schema changes
npx prisma db push   # Push schema changes to database
npx prisma studio    # Open Prisma Studio GUI (localhost:5555)
npx prisma migrate dev --name init   # Create a migration file
```

---

## Contact & Support

**Hotel:** Shubharambh Hotel & Banquet Hall, Pithoragarh, Uttarakhand
**WhatsApp:** +91 98765 43210
**Email:** stay@shubharambhpithoragarh.com
