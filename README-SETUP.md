# Travel OS landing page

A responsive static landing page for Travel OS, based on the supplied README. It includes:
- Product introduction and feature sections (discover, trip planning, AI assistant, community reports).
- A download gate asking for name and email before showing configured platform links.
- Optional marketing-update consent checkbox.
- Formspree integration for receiving entries by email/dashboard.
- Responsive desktop and mobile layout.

## Important product accuracy notes
The supplied product README says the source code was not reviewed and that no features are source-confirmed. It also says displayed scores, reports, ratings and alerts are illustrative; SOS behaviour, live data, scanner results and technology stack are unconfirmed. This page therefore avoids claiming that safety scores are verified/live or that SOS is an emergency service.

## 1. Add real app downloads
The README did not include an APK, iOS build, desktop build, or source repository. A landing page cannot create those binaries. First build and test the app for each platform, then upload the files to a release host (for example GitHub Releases, your own hosting, or the relevant app store).

Edit `config.js` and paste the HTTPS URLs:
```js
downloads: {
  android: "https://your-domain.com/releases/travelos.apk",
  ios: "https://apps.apple.com/app/your-app/id...",
  windows: "",
  mac: ""
}
```
Only platforms with valid HTTPS links will appear after the form is submitted. Do not publish a link until the build is tested.

## 2. Set up email capture
This project uses Formspree as a simple form endpoint. Create a form at https://formspree.io/, verify your receiving email, and paste its endpoint into `config.js`:
```js
formspreeEndpoint: "https://formspree.io/f/xxxxxxxx"
```
Without this endpoint, the form is preview-only and does not send or save any personal data. Formspree's free tier and limits may change; check its current terms.

The form asks for name and email. The optional checkbox is a separate opt-in for product-update emails. Do not send marketing messages to people who have not opted in. Add a proper Privacy Policy with your organisation's identity, purpose, retention period, contact details and deletion/unsubscribe process before public launch.

## 3. Host the website for free
This is a static site and can be deployed on:
- **Netlify:** create an account, choose “Add new site” → “Deploy manually”, then drag the extracted folder (the files in this folder) into the deploy area.
- **Vercel:** import the folder/repository as a static project; no build command is needed and the output directory is the project root.
- **GitHub Pages:** push these files to a repository and enable Pages for the chosen branch/root.

After deployment, test the page on a phone and desktop, submit a test lead, and test every download link.

## Files
- `index.html` — page content
- `styles.css` — visual design and responsive layout
- `script.js` — modal, form submission and platform download links
- `config.js` — your download URLs and form endpoint

## Before launch checklist
- [ ] Add actual, tested app download links.
- [ ] Configure and test Formspree.
- [ ] Add a Privacy Policy and contact email.
- [ ] Confirm permission to use all logos, images and product claims.
- [ ] Test on Android, iPhone, tablet and desktop.
- [ ] Confirm the app's permissions, data sources, safety-score methodology and SOS behaviour.
