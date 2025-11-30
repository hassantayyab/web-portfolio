# Portfolio Website

A modern, dark-themed portfolio website built with Next.js 15, Tailwind CSS v4, and Shadcn UI.

## Features

- **Bento Grid Home Page**: A visually striking 100vh/100vw bento grid layout
- **Dark Mode**: Elegant dark theme with custom color palette
- **Responsive Design**: Fully responsive across all devices
- **Animations**: Smooth animations using Framer Motion
- **Command Palette**: Quick navigation with Cmd+K
- **Contact Form**: Integrated contact form with Resend email
- **SEO Optimized**: Full metadata, sitemap, and structured data
- **Cursor Effects**: Subtle cursor glow effect on desktop

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

3. Set up environment variables:
```bash
# Create a .env.local file with:
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=your@email.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
