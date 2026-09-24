# Day 16 — Polbudandsonltd

Independent, unofficial frontend concept for the 100 Days Local Business Website Challenge. The business has not commissioned or approved it.

## Project structure
- `index.html` — page content and illustrative-photography disclosure
- `style.css` — brand design system, image placement and responsive styling
- `script.js` — mobile navigation, scroll reveal and email-draft enquiry
- `assets/kitchen-main.webp`, `assets/kitchen-detail.webp`, `assets/bathroom-main.webp` — locally hosted illustrative reference photos

## Photography and usage
These images are **reference interior photographs**, not Polbudandsonltd's completed installations. Do not use them as customer testimonials, case studies, or before-and-after proof. Replace with business-owned photographs after the owner grants permission.

Images were downloaded from Unsplash's image CDN and converted to optimized WebP for this non-official demo:
- `kitchen-main.webp`: https://images.unsplash.com/photo-1600607687939-ce8a6c25118c
- `kitchen-detail.webp`: https://images.unsplash.com/photo-1600607687920-4e2a09cf159d
- `bathroom-main.webp`: https://images.unsplash.com/photo-1620626011761-996317b8d101

Unsplash license: https://unsplash.com/license . Do not redistribute the images as an independent stock-photo pack or imply endorsement by the photographers. The source image URLs are documented here for provenance; the website itself uses only local `assets/` paths.

## Operation
GitHub Pages serves `index.html` from the repository root. Google Fonts uses an external stylesheet; photos themselves are bundled locally. The contact form opens an email draft in the visitor's email app, where the visitor must review and send the message; no backend receives or stores submissions.
