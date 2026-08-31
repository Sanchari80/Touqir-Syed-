# Tauqeer Syed — Portfolio

Next.js portfolio site with a built-in admin panel (Sanity Studio) for uploading new case
studies, pages, and stats — **no database to host or manage**. Sanity's free tier stores
your content in the cloud; you just log in at `/studio` and edit.

## Quick start (Bangla)

1. https://www.sanity.io -এ ফ্রি অ্যাকাউন্ট বানান, একটা নতুন প্রজেক্ট create করুন।
2. Project Settings থেকে **Project ID** কপি করুন।
3. এই ফোল্ডারে `.env.example` কে `.env.local` নামে কপি করে ওই Project ID বসান।
4. `npm install` তারপর `npm run dev` চালিয়ে http://localhost:3000 দেখুন।
5. Admin panel: http://localhost:3000/studio — এখান থেকে নতুন Case Study, Page, Stat upload করবেন।
6. GitHub-এ push করে Vercel-এ import করুন, একই environment variables Vercel-এর Settings → Environment Variables-এ বসিয়ে দিন। Deploy হয়ে গেলে `your-site.vercel.app/studio` থেকেই সব আপডেট করতে পারবেন — কোনো database লাগবে না।

## Setup

1. **Create a free Sanity project**: go to https://www.sanity.io/manage → "Create project".
   Note the **Project ID** it gives you.
2. Copy `.env.example` to `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. Install and run locally:
   ```
   npm install
   npm run dev
   ```
4. Visit `http://localhost:3000` for the public site, and `http://localhost:3000/studio`
   for the admin panel. The first time you open `/studio` it'll ask you to log in with the
   same account you used to create the Sanity project — that login **is** your admin
   access, no separate username/password system to build or maintain.
5. In the Studio, fill in:
   - **Site Settings** (your name, title, bio, profile photo, contact link) — one document.
   - **Stats** — the 4 numbers at the top (Pages Managed, Ad Reach, etc).
   - **Case Studies** — one entry per campaign, with metrics.
   - **Pages I Manage** — the Facebook pages list.
   - **Capabilities** — the two-column skills grid.
   The homepage reads directly from these, so anything you publish in Studio shows up on
   the live site within ~30 seconds (no redeploy needed).

## Deploy to Vercel

1. Push this project to a GitHub repo.
2. Go to https://vercel.com/new and import the repo.
3. Add the same two environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`,
   `NEXT_PUBLIC_SANITY_DATASET`) in Vercel's Project Settings → Environment Variables.
4. Deploy. Your site and admin panel will both be live at your Vercel URL — e.g.
   `your-site.vercel.app` and `your-site.vercel.app/studio`.
5. In Sanity's manage dashboard (Settings → API → CORS Origins), add your Vercel URL so
   the Studio is allowed to save content from that domain.

## Notes

- No database, no server to run — Sanity hosts your content, Vercel hosts the site.
- The site is fully responsive (mobile, tablet, desktop) — check `app/globals.css`.
- Before you connect Sanity, the site still renders using placeholder demo content in
  `app/page.tsx`, so you can preview the design immediately.
- Your uploaded profile photo is at `public/profile.jpg` and is used as the default
  avatar until you upload one through Site Settings in the Studio.
