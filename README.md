# TAMA ORDER — modern static website

## Deploy to Netlify
- Repository root: leave blank
- Build command: leave blank
- Publish directory: `public`
- `netlify.toml` is included.

## Before publishing
Edit `public/app.js` and update `CONFIG`:
- `whatsappNumber`: WhatsApp number in international format without `+`
- `telegramUrl`: real admin Telegram link
- `testimonialUrl`: real testimonial channel link
- `qrisImage`: direct URL to your QRIS image, or keep empty to show the setup notice

The site is a static frontend. Payment verification is manual; it does not save orders to a database or verify payment automatically. Product names and prices are demo values—edit the `products` array in `public/app.js`.
