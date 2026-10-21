# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: plain static HTML/CSS, multi-page, with a small zero-dependency Node
build script for shared header/footer and a one-place config (site owner and
Sheldon both edit this repo; GitHub Pages serves it from main).

## Users

- Readers (teens + adult YA readers) who just finished or heard about a Kelly
  deVos book and want to know who she is and what else she wrote.
- Publishing professionals: editors, journalists, podcasters, librarians,
  educators checking credentials, press, and how to reach her or her agent.
- Event organizers and book clubs looking for bio/headshot material.

## Product Purpose

Author site for Kelly deVos, contemporary & horror writer (repositioned 2026-10 per
Kelly: her next book is adult) with five published YA books (
2018–2022, Harlequin Teen / Inkyard Press / Penguin Teen–Razorbill). The site
exists to present the books, the author, and the ways to reach her — and to
look like the work of a working novelist, not a 2018 theme.

## Positioning

Kelly writes YA with sharp wit across genres — body-positivity contemporary
(Fat Girl on a Plane), dystopian action (Day Zero duology), horror/thriller
(Eat Your Heart Out, Go Hunt Me) — "fat representation in all kinds of
stories" is a recurring press angle and genuine differentiator.

## Operating Context

- Site is static on GitHub Pages (repo tooshel/kellydevos, serve from main /).
  No server: forms cannot post anywhere; all actions are links.
- URLs to preserve (inbound links + old WP permalinks): /about/, /my-books/,
  /media/, /contact-me/, /subscribe/. Domain will be www.kellydevos.com after
  DNS cutover; currently previews at tooshel.github.io/kellydevos/.
- Sheldon maintains the repo; Kelly will get collaborator access and may edit.

## Capabilities and Constraints

- UNDECIDED (slots exist in site.config.json; render nothing until filled):
  - Kelly's public email (contact page direct-email block)
  - Newsletter signup URL (external service; subscribe CTA links out)
  - Photographer credit name (new 2026 photos, files say "EG")
- Book cover art on hand is the round promotional crops from the old site;
  layout must upgrade gracefully when real rectangular covers arrive.
- Buy links per book (Amazon, B&N, Book Depository, Changing Hands, Indigo,
  IndieBound) exist in the old my-books page and must carry over.
- Press/media list exists on old /media/ page; agency contact is factual:
  Kristina Pérez, PhD (Cantab), Managing Director, Pérez Literary & Entertainment Ltd.,
  49 Greek Street, London W1D 4EG — www.perezliterary.com (agency changed 2026-10;
  no agency email published yet).

## Brand Commitments

- Name/identity: "Kelly deVos" (lowercase d, capital V — never "Devos").
- Binding visual reference from Kelly: https://www.katiekhan.com/ — she sent
  exactly one site; direction, not template. Owner guidance: hybrid — keep
  real multi-page structure (not a one-pager), restrained animation
  ("too many animations as you navigate is distracting").
- Five new professional B&W photos (2026, Canon, photos/ dir):
  kelly-portrait-close (dramatic bar-light portrait), kelly-typewriter-smile,
  kelly-typewriter-pensive (vintage typewriter + martini, patio),
  kelly-reading-umbrella (light, palms), kelly-laughing-hammock (joyful).
  These are the backbone of the redesign.
- Old identity (typewriter serif logo + teal "Young Adult Writer") is
  evidence/anti-reference only; the typewriter MOTIF survives in the new
  photos themselves.

## Evidence on Hand

- Full book copy, praise quotes (incl. Laura Taylor Namey, NYT bestselling
  author), press hits (Reader's Digest, Bustle, Brit+Co, SheKnows, PBS,
  Phoenix Magazine "Artist of the Month") — all in the live pages in this
  repo (about/, my-books/, media/, index.html).
- Round cover graphics + Go Hunt Me splash art in files/.
- Do NOT fabricate: review quotes, sales claims, award claims, event dates.

## Product Principles

1. The books are the product; the photos make the author real. Both outrank
   decoration.
2. Nothing on the site may dead-end: no forms without backends, no links to
   nowhere, no placeholder text visible to the public.
3. Old URLs keep working; readers arriving from 2019 articles land somewhere
   better than they expected.
4. Kelly and Sheldon must both be able to edit content without redesigning:
   content lives in obvious places, config in one file.
5. Quiet motion only: nothing animates during navigation beyond what a page
   needs to feel alive.
