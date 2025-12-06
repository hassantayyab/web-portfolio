# Portfolio Website

A modern, dark-themed portfolio website built with Next.js 15, Tailwind CSS v4, and Shadcn UI.

## Features

- **Bento Grid Home Page**: A visually striking 100vh/100vw bento grid layout
- **Dark Mode**: Elegant dark theme with custom color palette
- **Responsive Design**: Fully responsive across all devices
- **Animations**: Smooth animations using Framer Motion
- **Command Palette**: Quick navigation with Cmd+K
- **Contact Form**: Production-ready contact form with validation, rate limiting, and email delivery
- **SEO Optimized**: Full metadata, sitemap, and structured data
- **Cursor Effects**: Subtle cursor glow effect on desktop

### 📧 Contact Form Features

The contact form is fully implemented with enterprise-level features:

- ✅ Real-time validation & error messages
- ✅ Rate limiting (5 requests/hour per IP)
- ✅ Spam protection (honeypot + validation)
- ✅ XSS protection & input sanitization
- ✅ Beautiful email templates (React Email)
- ✅ Email delivery via Resend
- ✅ Loading states & success feedback
- ✅ Mobile responsive & accessible
- ✅ Redis/KV support for scaling

**Setup in 5 minutes:** See [CONTACT_FORM_README.md](./CONTACT_FORM_README.md)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Email**: Resend
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd web-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up the contact form (interactive):
```bash
npm run setup:contact
```

Or manually copy `.env.example` to `.env.local` and add your API keys.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### 📧 Contact Form Setup

Quick setup:
```bash
npm run setup:contact  # Interactive setup wizard
```

For detailed instructions, see:
- [QUICK_START.md](./QUICK_START.md) - Get running in 5 minutes
- [CONTACT_FORM_README.md](./CONTACT_FORM_README.md) - Complete guide
- [CONTACT_FORM_SETUP.md](./CONTACT_FORM_SETUP.md) - Detailed setup
- [TESTING_CONTACT_FORM.md](./TESTING_CONTACT_FORM.md) - Testing guide

## Customization

### Personal Information

Edit `src/lib/data.ts` to update:
- Personal info (name, bio, email, location)
- Social links
- Skills
- Projects
- Experience
- Education

### Styling

- Colors and theme: `src/app/globals.css`
- Tailwind config is inline with Tailwind v4

### Images

Add your images to the `public` directory:
- `/avatar.jpg` - Profile photo
- `/resume.pdf` - Downloadable resume
- `/projects/*.jpg` - Project screenshots

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home - Bento Grid
│   ├── loading.tsx         # Loading skeleton
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # Sitemap generation
│   ├── robots.ts           # Robots.txt
│   ├── about/              # About page
│   ├── projects/           # Projects page
│   └── api/contact/        # Contact form API
├── components/
│   ├── ui/                 # Shadcn components
│   ├── bento/              # Bento grid cells
│   ├── navigation/         # Navbar, command palette
│   ├── projects/           # Project cards, modal
│   └── shared/             # Shared components
├── lib/
│   ├── data.ts             # Site data
│   ├── types.ts            # TypeScript types
│   ├── metadata.ts         # SEO metadata
│   └── utils.ts            # Utilities
└── emails/
    └── contact.tsx         # Email template
```

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy

## License

MIT
