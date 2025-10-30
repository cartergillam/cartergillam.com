# cartergillam.com

Personal portfolio hub for Carter Gillam.

## Local Development

The site relies on embedded YouTube iframes (film page) which require an HTTP context. When previewing locally, start a simple server instead of double-clicking `index.html`:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) in your browser.

## Structure

- `index.html` – hero hub with rotating category orbit
- `code.html` – work experience, skills, and projects
- `film.html` – videography/photography toggles with galleries
- `acting.html` – embedded résumé viewer
- `vibes.html` – blog-style “field notes”

Shared styling lives in `style.css` with responsive tweaks in `mediaqueries.css`, and interactions in `script.js`.
