# Search Central Hub

A universal search aggregator that launches a single query across multiple configured search providers in one click.

## Features
- **Tab Burst Mode**: Opens each provider result in a new browser tab.
- **Grid Iframe Mode**: Opens results side by side in a responsive iframe grid within the app.
- **Provider System**: Add, edit, delete, and reorder search providers.
- **Auth System**: Securely store cookies and API keys using AES-256-GCM encryption with a Master PIN.
- **CherryStudio Integration**: Deployable as a static site that can be loaded inside CherryStudio's Mini Program panel.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## CherryStudio Integration

To add this app as a Mini Program in CherryStudio:

1. **Local Development**:
   - Run `npm run dev` to start the local server (usually `http://localhost:5173`).
   - Open CherryStudio.
   - Go to **Settings** > **Mini Programs** > **Add Custom Program**.
   - Set the URL to `http://localhost:5173`.
   - Name it "Search Hub".

2. **Production Deployment**:
   - Build the app using `npm run build`.
   - Deploy the `dist` folder to a static hosting service like Vercel, Netlify, or GitHub Pages.
   - Open CherryStudio.
   - Go to **Settings** > **Mini Programs** > **Add Custom Program**.
   - Set the URL to your deployed URL (e.g., `https://my-search-hub.vercel.app`).
   - Name it "Search Hub".

## OAuth App Registration

For providers that support OAuth 2.0 (e.g., GitHub, Reddit):

1. Go to the provider's developer settings and create a new OAuth application.
2. Set the **Callback URL** to your app's URL (e.g., `http://localhost:5173/callback` or your deployed URL).
3. Copy the **Client ID** and **Client Secret**.
4. In Search Hub, go to **Settings** > **Auth** and configure the provider with the Client ID and Auth/Token URLs.

## Assumptions Made
- **Iframe Blocking**: Many modern sites (like GitHub, Google) use `X-Frame-Options: DENY` or `SAMEORIGIN`, preventing them from being embedded in iframes. The app detects this (via a basic fallback or user interaction) and provides an "Open in New Tab" button.
- **OAuth Flow**: The spec mentions OAuth 2.0 PKCE, but also says "client-side, no backend required". For a fully client-side OAuth flow without a backend, the provider must support implicit grant or PKCE with CORS-enabled token endpoints. The UI provides fields for API keys and cookies as a reliable fallback for private trackers.
- **Cookie Injection**: Browsers do not allow client-side JavaScript to set cookies for other domains (e.g., setting a cookie for `1337x.to` from `localhost`). The "Cookie injection helper" stores the cookie string securely. To actually use it, a browser extension or a proxy backend would be required. Since this is a pure client-side app, the stored cookie/API key is intended to be used by appending it to the URL or headers if the provider's API supports it (e.g., via `fetch` with `Authorization` header for API keys). For standard web searches in iframes/new tabs, the browser's existing cookies for those domains are used automatically.
