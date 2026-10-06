# Moultrie Pickleball Association — Admin/Shared Player App

This package replaces the earlier local-only player app.

## What is different

- Supabase Auth login/signup
- Shared roster, games, scores, and standings across phones
- Normal users are Players
- Only Admin users can add/remove players
- Only Admin users can create, edit, score, or delete games
- Database Row Level Security enforces the admin boundary
- PWA files are included for phone home-screen installation

## Files

- `index.html` — app
- `supabase_schema.sql` — database tables, Auth profile trigger, RLS policies, and realtime setup
- `manifest.webmanifest` — phone install information
- `sw.js` — app-shell caching
- `icon.svg` — app icon

## Setup order

1. Create/open your Supabase project.
2. In Supabase SQL Editor, run the entire `supabase_schema.sql`.
3. Open the app and enter your Supabase Project URL and publishable key.
4. Create your own account.
5. In Supabase SQL Editor, promote your account to admin:

   update public.profiles
   set role = 'admin'
   where id = (select id from auth.users where email = 'YOUR_EMAIL');

6. Sign out and sign back in. The Admin tab should now appear.
7. Add your club players from Admin.
8. Create games and enter scores from Admin.
9. Give the Vercel app address to your players. They create their own accounts; new accounts are players by default.

## Security

Do NOT put a Supabase service-role or secret key into this app. The browser should use the project's publishable key (older projects may label this as the anon key) together with RLS.

The database is the security boundary: hiding an Admin button in the interface is not enough. The SQL policies prevent non-admin authenticated users from inserting, updating, or deleting roster/game data.

The app shell can be cached, but shared club data requires an internet connection to sync.

## Updating the existing Vercel app

Replace the files in your existing GitHub repository `moultrie-pickleball-app` with the files in this package. Vercel should automatically redeploy the existing project and URL.
