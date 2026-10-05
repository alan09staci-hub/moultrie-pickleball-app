# Moultrie Pickleball Association Player App

This is a phone-ready Progressive Web App (PWA).

## Included
- Home dashboard
- Round-robin schedule
- Score entry
- Automatic standings
- Player management
- Add-to-home-screen / install support
- Offline caching after the first load

## Important
The current rebuild stores player and score data in the browser on each device. It is ideal for testing and deployment of the phone interface.

For a club-wide shared system where every player's scores and schedule stay synchronized, connect the app to a hosted database in the next step.

## Deploy
Upload this folder to an HTTPS static host such as Vercel. The site should use the root `index.html` as its entry point. Once deployed, open the HTTPS address on an iPhone or Android phone and choose the browser's Add to Home Screen / Install option.
