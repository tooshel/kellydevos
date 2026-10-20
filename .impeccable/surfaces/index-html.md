---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["about/index.html","my-books/index.html","media/index.html","contact-me/index.html","subscribe/index.html"]
---

# Surface brief — kellydevos.com (whole-site redesign)

Scope: all public pages (/, /about/, /my-books/, /media/, /contact-me/, /subscribe/, 404).
Visitor mode: Persuade (home, books) / Read (about, media).
Audience: YA readers post-book; publishing professionals; librarians/event folks.
Job: meet the author, find the five books, reach her or her agency.
Proof/content: five real books with real copy + buy links; real praise quotes; real press list; five 2026 B&W photographs; Zeno agency contact.
Constraints: static GitHub Pages (no forms); old URLs preserved; config slots (email, newsletter URL, photo credit) render nothing until filled; restrained navigation motion per owner; monochrome photography-led per Kelly's pinned reference (katiekhan.com).

## Direction contract

THESIS: The photographs are the site; everything else is typography that stays
out of their way. One author, five books, no decoration that isn't type, tone
band, or picture. Refused arrangement: the headshot-left/intro-right author-site
card stack with teal accents (the incumbent), and any multi-color "fun YA" skin.

OWN-WORLD: True monochrome. Paper white (#ffffff), near-black ink (#191919),
one warm mid-gray band tone (#e9e7e4); zero chromatic accents anywhere — the
only color on any page comes from the five book covers themselves. Display and
body: Libre Caslon (Display for the name and headings, Text for prose) — a
book face, set big and unafraid; UI labels/nav: Archivo in tracked lowercase.
Full-bleed B&W photographs as section plates; alternating white/gray/black
tone bands; hairline rules only inside bands, thick band seams between them.
Recognizable with content removed: white/gray/black bands + enormous Caslon.

STORY: A reader lands on Kelly's face at full bleed, understands "working
novelist, serious but warm" in one second, scrolls into a first-person hello,
meets the five books as objects on black, reads real praise, and leaves by one
of three doors: a book's buy links, the agency, or her socials.

FIRST VIEWPORT (home, desktop): full-viewport B&W close portrait, art-directed
right-of-center; "Kelly deVos" in Libre Caslon Display, white, lower-left at
clamp(3.5-6rem); under it one Archivo tracked line "young adult novelist";
lowercase tracked nav floats top-center on the photo (about / books / media /
contact); scroll cue bottom-center. No band, no card, no box on the photo.

FORM: Monochrome Editorial — IMPECCABLE'S PICK card (user-locked), candidate 1
of 7 on my ordered list; seed key 2fc823ef (assigned 7 was Night-Stand
Paperback; user chose the pick). Signature interaction: tone-band inversion —
::selection, scroll-position nav color flip (nav text swaps white/ink as bands
pass under it), and book-cover hover lifting covers from grayscale to full
color. Motion grammar: one slow fade-up per band on first reveal only,
120ms ease-out hovers, nothing animates on navigation.

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, DESIGN.md, and every shipping raster carrying its
provenance.
