# Nexveins website

A light-first, motion-aware company website built with Next.js 16, TypeScript, Tailwind CSS, shadcn/ui, GSAP, Motion, React Three Fiber, Sanity, Resend, and Cal.com.

## Local development

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The Sanity Studio is mounted at `/studio` after valid Sanity project credentials are added.

## Required production configuration

Copy `.env.example` to `.env.local` and provide:

- A public production URL and contact email.
- A Sanity project ID and dataset.
- A verified Resend sender and recipient.
- A Cal.com booking URL.
- Cloudflare Turnstile keys.
- Upstash Redis credentials for distributed rate limiting.
- A Plausible domain if analytics should be enabled.

The contact endpoint returns an honest configuration error when email delivery is not configured. It does not store leads in a separate database.

## Commands

```bash
npm run dev
npm run lint
npm run build
```

To inspect the production bundles in PowerShell:

```powershell
$env:ANALYZE="true"
npm run build
Remove-Item Env:ANALYZE
```

## Content policy

The launch source intentionally contains no invented client work, metrics, testimonials, team biographies, or open roles. Replace the designed empty states only after approved content and imagery are available. The supplied `public/nexveins-mark.png` is used unchanged.
