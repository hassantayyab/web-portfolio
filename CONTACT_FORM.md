# Contact Form Quick Guide

Your contact form is already built; you just need to configure email delivery.

## Setup
1. Copy the example env file: `cp .env.example .env.local`
2. Set required envs in `.env.local`:
   - `RESEND_API_KEY=re_xxx`
   - `CONTACT_EMAIL=you@example.com`
   - `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` (or `http://localhost:3000`)
3. Install deps if needed: `npm install`

## Test Locally
1. Start the dev server: `npm run dev`
2. Visit `http://localhost:3000/contact`, submit the form, and check your inbox (spam folder too).

## Customize
- Form UI/validation: `src/components/shared/contact-form.tsx`
- API handler & email sending: `src/app/api/contact/route.ts`
- Email template: `src/emails/contact.tsx`
- Rate limiting/settings: `src/lib/constants.ts`

## Quick Troubleshooting
- No email: confirm `RESEND_API_KEY` and `CONTACT_EMAIL`, then check spam.
- Rate limit hit: wait an hour or restart dev server.
- Form errors: check browser console and terminal output.

