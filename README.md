# RAWNAK Academy — Independent Website Preview

Standalone repository for the approved original Academy design (V7.6, real photography).

## Run locally

Open `index.html`, or run `python -m http.server 8000` then visit `http://localhost:8000`.

## Project files

- `index.html`: approved website prototype (public site and demo workspaces)
- `assets/rawnak-academy-logo.webp`: Academy logo asset
- `PHOTO_SOURCES.json`: photography source references

## Important security notice

**Preview only.** Forms, demo roles, locally stored data, rewards, courses, books, QR code data, and financial screens are demonstrations, **not production authentication or payments**. Do not enter real passwords, financial details, or sensitive student information.

Real authentication/authorization and database operations require review and integration into RAWNAK Group's existing central identity system. No existing Group database or production site has been modified by this repository.

Images are currently loaded from Pexels, and fonts from Google Fonts. For a production release, validate image permissions and store optimized copies with the application.

## Architecture direction

Independent GitHub codebase, shared RAWNAK Group identity when safely connected, optional Rawnak Events product catalog integration. Never commit API tokens, server credentials, or production user records.