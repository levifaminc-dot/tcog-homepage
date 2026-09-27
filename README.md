# The Church of God Nigeria website

The public website for The Church of God Nigeria, built with Astro and Tailwind CSS and deployed through Vercel.

## Local development

    npm install
    npm run dev

Create a production build with:

    npm run build

## Content management

Sanity manages News posts and site-wide announcements. The content dashboard lives in the **studio** folder.

See [SANITY_SETUP.md](./SANITY_SETUP.md) for project connection, Vercel environment variables, CORS, and automatic rebuild instructions.

## Security checks

Run `npm run test:security` and `npm audit` in this folder, then run `npm audit` in `studio/`. The Studio uses targeted dependency overrides to keep its CLI's transitive ZIP, YAML, and UUID packages on patched versions.

Each Vercel project has its own security headers: `vercel.json` for the public site and `studio/vercel.json` when the Studio project's root directory is `studio/`. The public site's strict Content Security Policy depends on Astro emitting external scripts and stylesheets.

Prayer and event forms use FormSubmit's built-in CAPTCHA. Before promoting a preview deployment to production, submit one non-sensitive test message from each form and confirm both the on-page confirmation and delivery to the national office. If FormSubmit requires a separate challenge that its AJAX endpoint cannot complete, do not promote the revised forms until an on-page verified submission path is available; do not disable CAPTCHA to make the message appear successful.
