# AmzWP-Automator

## Overview
AmzPilot is an Autonomous WordPress Monetization Engine that helps automate affiliate marketing tasks. It scans content, identifies opportunities, and deploys high-conversion assets.

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS (CDN)
- **API**: Google Generative AI (@google/genai)

## Project Structure
```
/
├── App.tsx           # Main application component
├── index.tsx         # React entry point
├── index.html        # HTML template
├── types.ts          # TypeScript type definitions
├── utils.ts          # Utility functions
├── constants.ts      # Application constants
├── components/       # React components
├── vite.config.ts    # Vite configuration
└── tsconfig.json     # TypeScript configuration
```

## Development
- **Dev Server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build` (outputs to `dist/`)

## Deployment
Configured for static deployment via Vite build.

## Environment Variables
- `API_KEY`: Google Generative AI API key (optional)
