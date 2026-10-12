(Deployment itself is out of scope for this delivery; this is the reference for when you deploy.)
1. Push to GitHub. 2. Netlify: New site from Git → build `npm run build`, publish `dist`, env `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. `public/_redirects` + `netlify.toml` cover SPA routing.
3. Supabase: apply migrations 0001, 0002, seed; deploy the function; disable signups; add the Netlify URL to Auth → URL Configuration (Site URL + Redirect URLs).
4. Backups: free Supabase has limited/no automatic backups — export with `supabase db dump` regularly. Recovery = recreate project, apply migrations, restore dump.
5. Free-tier limits (approximate, **verify current pricing pages**): Supabase Free — ~500 MB database, limited egress and monthly active users, projects pause after about a week of inactivity, no guaranteed backups. Netlify Free — monthly build/bandwidth credits. Upgrade when you approach these or need backups/no pausing.
