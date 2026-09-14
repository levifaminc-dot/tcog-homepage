# Sanity CMS setup

The project contains a separate content dashboard in the **studio** folder and a read-only Sanity connection in the Astro website.

## 1. Create or select the project

Create a Sanity project at https://www.sanity.io/manage. Use a public dataset named **production** so the website can read published content without exposing a secret token.

## 2. Configure the local dashboard

Copy **studio/.env.example** to **studio/.env**, then enter the project ID and dataset:

    SANITY_STUDIO_PROJECT_ID=your-project-id
    SANITY_STUDIO_DATASET=production

Start the editor from the repository root with:

    npm run studio:dev

The editor provides:

- **News posts** with headline, page address, summary, category, publish date, author, featured image, and rich article content.
- **Site announcements** with headline, message, notice type, active/archive state, optional schedule, priority, and optional button.

Only published Sanity documents are shown on the public site. Announcements must also have **Status: Active** and fall within their optional start/end dates.

## 3. Connect the Astro website

Add these variables to **.env** locally and to all Vercel environments:

    PUBLIC_SANITY_PROJECT_ID=your-project-id
    PUBLIC_SANITY_DATASET=production

No read token belongs in the browser or repository.

## 4. Allow the website origins

In Sanity project settings, add these CORS origins:

- http://localhost:4321
- https://tcog-homepage.vercel.app
- the final https://tcog.org.ng domain when connected

Credentials are not required for these origins when using the public dataset.

## 5. Rebuild after publishing

The Astro site is pre-rendered for speed, so published changes become visible after Vercel rebuilds it.

1. Create a Deploy Hook for the **main** branch in the Vercel project settings.
2. Add a Sanity webhook for create, update, and delete events.
3. Use the Vercel Deploy Hook URL as the webhook target.

This makes a published news post or active announcement trigger a fresh production deployment automatically.
