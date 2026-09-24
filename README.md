# Day 16 — Polbudandsonltd

Independent, unofficial website concept for Prathamesh's 100 Days Local Business Website Challenge. **Not commissioned or approved by the business.**

## Site direction
Architectural editorial styling for a Middleton-based kitchen and bathroom installer: large typographic hero, local reference photography, an offset image-and-text story, numbered services, an interactive kitchen/bathroom inspiration switcher, an illustrated three-step contact journey and a direct email-draft enquiry. Page motion includes a hero reveal, a moving service ribbon, a scroll progress indicator, section entrance reveals and refined link/button states. Reduced-motion support is provided.

## File layout
- `index.html` — semantic single-page frontend and photo disclosures
- `style.css` — design system, animation, desktop/tablet/mobile breakpoints and reduced-motion rules
- `script.js` — keyboard-accessible mobile menu, inspiration switcher, scroll effects and mailto enquiry
- `assets/` — three locally hosted illustrative WebP interiors

## Image provenance and limitations
**All photos are illustrative references, NOT completed projects of Polbudandsonltd.** Replace with owner-provided project photographs with permission if the business is interested.

- `assets/kitchen-main.webp`: https://images.unsplash.com/photo-1600607687939-ce8a6c25118c
- `assets/kitchen-detail.webp`: https://images.unsplash.com/photo-1600607687920-4e2a09cf159d
- `assets/bathroom-main.webp`: https://images.unsplash.com/photo-1620626011761-996317b8d101

Image usage: https://unsplash.com/license . Source links are for provenance only; the website uses local files. Do not imply endorsement or resell a standalone image collection.

## Business data
Public directory details were used as reference for its name, family ownership, experience, service category, contact information and Middleton address. Verify with the owner before commercial hand-off; the directory is not definitive.

## Contact handling
The form only prepares a `mailto:` draft, which the visitor must send in their own email app. This site has no backend and does not store enquiries. Phone and direct email links are alternatives. Google Fonts requires a network connection; fallback fonts are declared in CSS.

## Quality assurance
The new design was verified in headless Chromium against 320, 360, 390, 430, 620, 768, 900, 1024, 1170, 1280, and 1440px browser widths. The latest repository files showed no horizontal overflow or page-script errors at those widths. Tested opening and closing the mobile menu and switching the inspiration image. Keep testing on actual mobile hardware before handing it to a client.
