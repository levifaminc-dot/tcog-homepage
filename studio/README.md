# The Church of God Nigeria — Content Studio

This Sanity Studio manages two content types:

- **News posts** for the website News page and individual story pages.
- **Site announcements** shown as a dismissible pop-up across the website.

## Connect a Sanity project

1. Create or select a Sanity project at [sanity.io/manage](https://www.sanity.io/manage).
2. Copy `.env.example` to `.env` and replace `your-project-id`.
3. Run `npm install`, then `npm run dev` in this folder.
4. Add `http://localhost:4321` and the production website domain to the project's CORS origins. Read access does not need credentials when the dataset is public.

Only announcements with **Status: Active** and a valid date window are shown. If several are active, the highest-priority item wins.
