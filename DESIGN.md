---
name: Kelly deVos — kellydevos.com
description: Monochrome editorial author site — black-and-white photography, big Caslon, tracked Archivo, zero chromatic accents.
colors:
  paper: "#ffffff"
  ink: "#191919"
  warm-band: "#e9e7e4"
  mid-gray: "#595959"
  silver-on-black: "#b5b5b5"
  hero-whisper: "#e6e3de"
typography:
  display:
    fontFamily: "Libre Caslon Display, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(3rem, 7.5vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Libre Caslon Display, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(2rem, 4.4vw, 3.2rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Libre Caslon Display, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(2.2rem, 4.6vw, 3.4rem)"
    fontWeight: 400
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Libre Caslon Text, Georgia, Times New Roman, serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Archivo, Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    letterSpacing: "0.24em"
  nav:
    fontFamily: "Archivo, Helvetica, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    letterSpacing: "0.22em"
rounded:
  none: "0"
  focus: "2px"
  circle: "50%"
spacing:
  band-y: "clamp(60px, 9vw, 120px)"
  band-x: "clamp(20px, 6vw, 72px)"
  measure: "1060px"
  prose: "62ch"
components:
  button-cta:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 34px"
  button-cta-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.nav}"
    padding: "0 0 3px 0"
  label:
    textColor: "{colors.mid-gray}"
    typography: "{typography.label}"
  book-cover:
    rounded: "{rounded.circle}"
---

# Design System: Kelly deVos — kellydevos.com

## Overview

**Creative North Star: "Monochrome Editorial"**

The photographs are the site; everything else is typography that stays out of
their way. The whole world is built from four materials: paper white, near-black
ink, one warm gray band tone, and five full-bleed black-and-white photographs.
Pages read as a vertical stack of tone bands — white, warm gray, black, photo
plate — separated by a thick ink seam, like signatures in a bound book. There is
no chrome: no cards, no shadows, no boxes, no rounded containers. Structure is
conveyed entirely by band color, hairline rules, and generous Caslon set big and
unafraid.

Color is deliberately absent. The only chromatic pixels on any page are the five
book covers themselves, and even those rest in grayscale until a hover or focus
lifts them to full color (120ms). The refused arrangement is the incumbent
author-site formula: headshot-left/intro-right card stacks, teal accents, and
any multi-color "fun YA" skin.

**Key Characteristics:**
- True monochrome: #ffffff / #191919 / #e9e7e4 / #595959 and nothing else
- Full-bleed grayscale photo plates as structural section breaks
- Enormous Libre Caslon Display against tracked-lowercase Archivo UI type
- 14px ink seam (3px paper border-block) between every top-level band
- Flat, square, shadowless; depth comes from tone inversion, not elevation
- Quiet motion: one fade-up per band on first reveal, 120ms hovers, nothing
  animates on navigation

## Colors

A four-value monochrome palette; recognizable with all content removed as
white/gray/black bands plus enormous Caslon.

### Primary
- **Ink** (`--ink`, #191919): the voice of the system. Body text on paper,
  background of black bands and photo plates, the seam fill, selection
  background, and the focus ring on light surfaces.

### Neutral
- **Paper** (`--paper`, #ffffff): page background, text on black bands, the
  3px seam borders, CTA button border/fill-on-hover, selection text color.
- **Warm Band** (`--band`, #e9e7e4): the one warm mid-gray; background of the
  praise band and alternating (even) book sections. Never used for text.
- **Mid Gray** (`--mid`, #595959): secondary type — labels, publisher lines,
  attributions, footer text — on light surfaces only.
- **Silver on Black** (#b5b5b5): the mid-gray role when it sits on a black
  band (labels, publisher years on the home shelf).
- **Hero Whisper** (#e6e3de): the tracked "contemporary & horror writer" line on the
  hero photo; slightly warm so it doesn't glare against the grayscale plate.

Hairline rules are translucent ink, not a token: `#00000014`–`#00000033`
depending on weight (list dividers, footer top rule, link underlines).

### Named Rules
**The Covers-Only Color Rule.** Zero chromatic accents anywhere. The only color
on any page comes from the five book covers, and only on hover/focus — covers
rest at `filter: grayscale(1)` and lift to full color in 120ms. No new surface
may introduce an accent color.

**The Grayscale Plate Rule.** Every photograph ships through
`filter: grayscale(1)` in CSS, full-bleed, with no border, caption box, or
overlay other than the hero's bottom scrim
(`linear-gradient(to top, rgba(10,10,10,.55), transparent 45%)`).

## Typography

**Display Font:** Libre Caslon Display (fallback Libre Caslon Text, Georgia)
**Body Font:** Libre Caslon Text (Georgia, Times New Roman) — italic carries
quotes and book titles
**Label/UI Font:** Archivo (Helvetica, Arial)

**Character:** A book face set big and unafraid against a cool, tightly tracked
grotesque. Caslon does all the talking; Archivo whispers in lowercase or small
caps and never exceeds 13px.

### Hierarchy
- **Display** (400, clamp(3rem, 7.5vw, 6rem), 1.02): the hero name only —
  "Kelly deVos" in white, lower-left on the portrait.
- **Title** (400, clamp(2.2rem, 4.6vw, 3.4rem)): interior page h1s ("Five
  novels. Zero apologies.").
- **Headline** (400, clamp(2rem, 4.4vw, 3.2rem)): band h2s (`h2.display`); all
  headings weight 400 with -0.01em tracking.
- **Body** (400, 18px, 1.65): Libre Caslon Text prose, max 62ch. Praise quotes
  run larger — clamp(1.3rem, 2.4vw, 1.75rem), italic, max 28em.
- **Label** (400, 12px, .24em, UPPERCASE): Archivo tracked caps in `--mid`
  (#b5b5b5 on black) for section labels ("Find it", "In the press").
- **Nav** (400, 13px, .22em, lowercase): Archivo tracked lowercase; also the
  hero subtitle at .3em tracking.

### Named Rules
**The Italic Title Rule.** Book and article titles are set in Caslon italic,
never bold, never quoted with color. Praise quotes are italic Caslon at reading
scale.

**The Lowercase Nav Rule.** Navigation and the hero subtitle are
`text-transform: lowercase` tracked Archivo; only `.label` uses uppercase.
Headings are never uppercased and never exceed weight 400.

## Layout

Single-column stack of full-width tone bands. Each band pads
clamp(60px, 9vw, 120px) vertically and clamp(20px, 6vw, 72px) horizontally,
with content centered in a 1060px `.measure`; running prose caps at 62ch.
Interior pages open with extra top padding (clamp(110px, 14vh, 150px)) to clear
the fixed nav. Photo plates are zero-padding bands at min(72vh, 680px); the
home hero is 100svh (min 560px).

Grids are sparse and content-shaped: the home shelf is
`repeat(auto-fit, minmax(150px, 1fr))`; book and about pages use a two-column
image/prose grid (minmax(180–220px, 260–420px) + 1fr) that collapses to one
column at 760px, where the shelf becomes 2-up with the fifth cover centered
full-row. One breakpoint (760px) governs all responsive change.

**The Seam Rule.** Every junction between top-level bands carries the two-tone
seam: a 14px `--ink` bar with `border-block: 3px solid var(--paper)`,
`aria-hidden`. Hairline rules (translucent ink) live only *inside* bands; the
thick seam lives only *between* them.

## Elevation & Depth

No shadows anywhere — `box-shadow` does not appear in the system. Depth is
conveyed by tone inversion: white, warm-gray, and black bands stacking against
grayscale photo plates, plus the nav's `mix-blend-mode: difference` once it
leaves the hero. The only lift gesture is the book cover's -4px translateY on
hover, with no shadow under it.

**The Flat Ink Rule.** Surfaces never float. If a new element needs emphasis,
invert its band tone or enlarge its type; do not add a shadow, gradient (beyond
the hero scrim), or border box.

## Shapes

Square to the edge. No border-radius on any container, image plate, button, or
input — the sole exceptions are the circular book-cover crops
(`border-radius: 50%`, an artifact of the promotional art that reads as a
deliberate medallion motif) and the 2px radius on the focus outline. Borders
are 1px hairlines in translucent ink or 1px solid `--paper`/`--ink` (CTA
button, link underlines). Outside running prose, link affordance is a 1px
bottom border rather than text-decoration; links inside `.prose` keep the
native underline.

## Components

### Navigation
- Fixed top-center row of tracked-lowercase Archivo links (13px, .22em), solid
  white over the home hero.
- **The Difference Nav Rule.** Once the hero scrolls past (IntersectionObserver
  toggles `.blend`, rootMargin -40px), the nav switches to
  `mix-blend-mode: difference`, flipping white/ink as bands pass beneath it.
  Pages without a hero (`body.no-hero`) and no-JS (`html:not(.js)`) run in
  difference mode from load.
- Hover and `aria-current` state: 1px currentColor bottom border, 3px below the
  baseline. No background, no pill, no color change.

### Buttons
- **Shape:** square (0 radius), tracked-caps Archivo 13px/.24em.
- **CTA on black** (`.cta .btn`): transparent fill, 1px `--paper` border,
  padding 16px 34px; hover fills paper with ink text (200ms ease-out). The
  ink-bordered variant on light bands (subscribe sign-up) mirrors it with
  `--ink` border, padding 15px 32px.
- This is the only button in the system; everything else is a bordered text
  link.

### Links (text)
- All links inherit color. In lists, nav, footer, and doors:
  `text-decoration: none` with a 1px bottom border in translucent ink
  (`#00000033`) that darkens to `--ink` on hover; press and news titles are
  Caslon italic that gain the border on hover. Links inside running `.prose`
  keep the native underline.

### Book Covers (signature)
- Circular crops (50% radius), resting at `grayscale(1)`.
- Hover/focus-visible: `filter: none` plus (shelf only) translateY(-4px), both
  at 120ms ease-out. On the books page the whole `.book` section's
  hover/focus-within colorizes its cover.

### Photo Plates (signature)
- Full-bleed `object-fit: cover` grayscale photographs as standalone bands,
  min(72vh, 680px), ink background behind, zero padding, no text overlay.

### Praise Quotes
- Bare blockquotes: italic Caslon at clamp(1.3rem, 2.4vw, 1.75rem), max 28em,
  followed by an Archivo 13px `--mid` attribution. No quote glyph decoration
  beyond typographic curly quotes; no card, no rule.

### Focus & Selection
- `:focus-visible`: 2px solid `--ink` outline, 3px offset, 2px radius; flips to
  white on black bands, the hero, and the nav.
- `::selection`: ink background, paper text — the tone-band inversion carried
  into the smallest interaction.

### Motion
- **The One Reveal Rule.** Exactly one fade-up (`opacity` + 18px translateY,
  700ms ease-out) per band, on first intersection only (threshold .12,
  unobserved after firing), gated on `html.js`. No-JS and
  `prefers-reduced-motion` render everything in place; reduced motion also
  disables smooth scroll and cover transitions.
- Hovers run at 120ms ease-out (covers) or 200ms (CTA fill); nothing animates
  on navigation.

## Do's and Don'ts

### Do:
- **Do** separate every pair of top-level bands with the seam (14px `--ink`,
  `border-block: 3px solid var(--paper)`, `aria-hidden="true"`).
- **Do** ship every photograph full-bleed and grayscale via CSS
  (`filter: grayscale(1)`), letting hover/focus restore color only on book
  covers.
- **Do** set all headings in Libre Caslon Display at weight 400 with -0.01em
  tracking, and all UI micro-type in Archivo at 11–13px with .14–.3em tracking.
- **Do** gate reveals on `html.js` and honor `prefers-reduced-motion`; the
  no-JS page must be complete and legible with the nav in difference mode.
- **Do** keep config-gated slots (email, newsletterUrl, photoCredit, domain in
  `site.config.json`) rendering nothing until filled — no placeholders.

### Don't:
- **Don't** introduce any chromatic color: no accents, no tinted links, no
  colored states. Ink/paper/warm-band/mid is the entire palette.
- **Don't** add shadows, cards, rounded containers, or gradients beyond the
  hero scrim; emphasis comes from band inversion and type scale.
- **Don't** animate on navigation or add per-element stagger; one fade-up per
  band, first reveal only.
- **Don't** use bold weights or uppercase headings; italics carry titles.
  Outside `.prose`, use border-bottom link affordance, not text-decoration.
