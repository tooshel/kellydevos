#!/usr/bin/env node
// kellydevos.com — monochrome editorial build.
// Renders the whole site into docs/ from tools/content.json + site.config.json.
// Direction contract lives in .impeccable/surfaces/index-html.md.
// Config slots (site.config.json): email, newsletterUrl, photoCredit, domain —
// each renders nothing until filled.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'docs');
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
const CONTENT = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'content.json'), 'utf8'));

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------- the five books ----------
const BOOKS = [
  { slug: 'fat-girl-on-a-plane', key: 'FAT GIRL ON A PLANE', title: 'Fat Girl on a Plane',
    pub: 'Harlequin Teen · 2018', cover: 'fgoap_circle.jpg', blurb: 0,
    tag: 'Smart fashion, dual Fat and Skinny timelines, and loving yourself.' },
  { slug: 'day-zero', key: 'DAY ZERO', title: 'Day Zero',
    pub: 'Inkyard Press / HarperCollins · 2019', cover: 'dz_circle.jpg', blurb: 1,
    tag: 'A doomsday-prepped coder when the doomsday actually comes.' },
  { slug: 'day-one', key: 'DAY ONE', title: 'Day One',
    pub: 'Inkyard Press / HarperCollins · 2020', cover: 'do_circle.jpg', blurb: 2,
    tag: 'The duology concludes: stepsisters against the end of the world.' },
  { slug: 'eat-your-heart-out', key: 'EAT YOUR HEART OUT', title: 'Eat Your Heart Out',
    pub: 'Penguin Teen / Razorbill · 2021', cover: 'eyho_circle.jpg', blurb: 3,
    tag: 'Shaun of the Dead meets Dumplin’ — zombies at fat camp.' },
  { slug: 'go-hunt-me', key: 'GO HUNT ME', title: 'Go Hunt Me',
    pub: 'Penguin Teen / Razorbill · 2022', cover: 'GHM_CIRCLE.jpg', blurb: 4,
    tag: 'Seven horror buffs, one remote Romanian castle, killed one by one.' },
];

const SOCIALS = [
  ['Instagram', 'https://www.instagram.com/kellydevos/'],
  ['Twitter / X', 'https://twitter.com/KdeVosAuthor'],
  ['Pinterest', 'https://www.pinterest.com/kellydevos/'],
  ['Tumblr', 'http://kellydevosauthor.tumblr.com'],
];

// praise quotes, curated from the old homepage carousel (full text in content.json)
const PRAISE = [
  { q: CONTENT.quotes[0].split('~')[0].replace(/["“”]/g, '').trim(),
    by: 'ALA Booklist, starred review', book: 'Eat Your Heart Out' },
  { q: 'In this gripping tale of heart and adventure, deVos propels her characters into a breathless quest edged by thoughtful commentary on the nature of humanity.',
    by: 'Laura Taylor Namey, New York Times bestselling author', book: 'Day Zero' },
  { q: 'Readers will appreciate deVos’s characterization of Cookie, who realistically struggles to stay true to herself, regardless of the numbers on the scale.',
    by: 'Publishers Weekly', book: 'Fat Girl on a Plane' },
];

// ---------- shared chrome ----------
const STYLE = `
:root { --paper:#ffffff; --ink:#191919; --band:#e9e7e4; --mid:#595959; color-scheme: light; }
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin:0; background:var(--paper); color:var(--ink);
  font: 18px/1.65 'Libre Caslon Text', Georgia, 'Times New Roman', serif; }
h1,h2,h3 { font-family:'Libre Caslon Display','Libre Caslon Text',Georgia,serif; font-weight:400; letter-spacing:-0.01em; }
a { color: inherit; }
img { max-width:100%; }

/* nav: floats on the hero, inverts over light bands */
nav.site { position:fixed; inset:0 0 auto 0; z-index:20; display:flex; justify-content:center; gap:clamp(14px,3vw,34px);
  padding:22px 16px; font-family:Archivo,Helvetica,Arial,sans-serif; font-size:13px; letter-spacing:.22em; text-transform:lowercase;
  color:#fff; }
nav.site.blend { mix-blend-mode:difference; }
html:not(.js) nav.site { mix-blend-mode:difference; }
body.no-hero nav.site { mix-blend-mode:difference; }
nav.site a { color:inherit; text-decoration:none; padding-bottom:3px; border-bottom:1px solid transparent; }
nav.site a:hover, nav.site a[aria-current] { border-bottom-color:currentColor; }
body.no-hero nav.site { position:fixed; }

main { display:block; }
.band { padding: clamp(60px,9vw,120px) clamp(20px,6vw,72px); }
.seam { height:14px; background:var(--ink); border-block:3px solid var(--paper); }
.band.gray { background: var(--band); }
.band.black { background: var(--ink); color: var(--paper); }
.measure { max-width: 1060px; margin: 0 auto; }
.prose { max-width: 62ch; }
.prose p { margin: 0 0 1.2em; }
.label { font-family:Archivo,Helvetica,Arial,sans-serif; font-size:12px; letter-spacing:.24em; text-transform:uppercase; color:var(--mid); }
.pub, .by { font-family:Archivo,Helvetica,Arial,sans-serif; font-size:13px; letter-spacing:.02em; color:var(--mid); }
.band.black .pub { color:#b5b5b5; }
.band.black .label { color:#b5b5b5; }
h2.display { font-size: clamp(2rem,4.4vw,3.2rem); margin:.2em 0 .6em; }

/* hero */
.hero { position:relative; height:100svh; min-height:560px; overflow:hidden; background:var(--ink); }
.hero img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:62% 30%; filter:grayscale(1); }
.hero .scrim { position:absolute; inset:0; background:linear-gradient(to top, rgba(10,10,10,.55) 0%, rgba(10,10,10,0) 45%); }
.hero .title { position:absolute; left:clamp(20px,6vw,72px); bottom:clamp(28px,6vh,64px); color:#fff; }
.hero .title h1 { font-size:clamp(3rem,7.5vw,6rem); margin:0; line-height:1.02; }
.hero .title p { font-family:Archivo,Helvetica,Arial,sans-serif; font-size:13px; letter-spacing:.3em; text-transform:lowercase; margin:.9em 0 0; color:#e6e3de; }
.hero .cue { position:absolute; left:50%; bottom:18px; transform:translateX(-50%); color:#fff; text-decoration:none; font-size:22px; line-height:1; padding:8px 14px; }
.hero .cue:hover { transform:translateX(-50%) translateY(3px); }
@media (prefers-reduced-motion: reduce) { .hero .cue:hover { transform:translateX(-50%); } }

/* photo plate bands */
.plate { padding:0; height:min(72vh,680px); overflow:hidden; position:relative; background:var(--ink); }
.plate img { width:100%; height:100%; object-fit:cover; filter:grayscale(1); display:block; }

/* books shelf (home) */
.shelf { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:clamp(18px,3vw,40px); margin-top:2.4rem; }
.shelf a { text-decoration:none; text-align:center; display:block; }
.shelf img { width:100%; max-width:210px; border-radius:50%; filter:grayscale(1); transition:filter .12s ease-out, transform .12s ease-out; }
.shelf a:hover img, .shelf a:focus-visible img { filter:none; transform:translateY(-4px); }
.shelf .t { display:block; margin-top:1rem; font-size:1.02rem; font-style:italic; }
.shelf .y { display:block; margin-top:.2rem; font-family:Archivo,sans-serif; font-size:11px; letter-spacing:.2em; color:#b5b5b5; }

/* praise */
.praise blockquote { margin:0 0 2.6rem; padding:0; }
.praise .q { font-size:clamp(1.3rem,2.4vw,1.75rem); line-height:1.5; font-style:italic; max-width:28em; }
.praise .by { margin-top:.9rem; }
.praise .by { font-size:13px; }

/* books page */
.book { padding: clamp(60px,8vw,110px) clamp(20px,6vw,72px); }
.book:nth-of-type(even) { background:var(--band); }
.book .inner { max-width:1060px; margin:0 auto; display:grid; grid-template-columns:minmax(180px,260px) 1fr; gap:clamp(28px,5vw,64px); align-items:start; }
.book img.cover { width:100%; border-radius:50%; filter:grayscale(1); transition:filter .12s ease-out; }
.book:hover img.cover, .book:focus-within img.cover { filter:none; }
.book h2 { font-size:clamp(1.9rem,3.6vw,2.8rem); margin:0 0 .25em; }
.book .pub { margin:0 0 1.4rem; }
.book details { margin:.4rem 0 1.6rem; }
.book summary { cursor:pointer; font-family:Archivo,sans-serif; font-size:13px; letter-spacing:.04em; color:var(--mid); }
.book summary:hover { color:var(--ink); }
.linkrow { display:flex; flex-wrap:wrap; gap:.4rem 1.6rem; padding:0; margin:0 0 1rem; list-style:none;
  font-family:Archivo,sans-serif; font-size:13px; letter-spacing:.03em; }
.linkrow a { text-decoration:none; border-bottom:1px solid #00000033; padding-bottom:2px; }
.linkrow a:hover { border-bottom-color:var(--ink); }
.news { margin:.4rem 0 0; padding:0; list-style:none; }
.news li { padding:.45rem 0; border-top:1px solid #00000014; }
.news a { text-decoration:none; }
.news a:hover em { border-bottom:1px solid var(--ink); }
.news em { font-style:italic; }
.news .src { font-family:Archivo,sans-serif; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--mid); margin-left:.6em; }

/* media page */
.presslist { margin:2rem 0 0; padding:0; list-style:none; max-width:46em; }
.presslist li { padding:1.1rem 0; border-top:1px solid #00000018; }
.presslist a { text-decoration:none; font-size:clamp(1.15rem,2vw,1.45rem); font-style:italic; line-height:1.5; }
.presslist a:hover { border-bottom:1px solid var(--ink); }
.presslist .src { display:block; margin-top:.3rem; text-transform:none; letter-spacing:.04em; }

/* about */
.about-grid { max-width:1060px; margin:0 auto; display:grid; grid-template-columns:minmax(220px,420px) 1fr; gap:clamp(28px,5vw,72px); align-items:start; }
.about-grid img { width:100%; filter:grayscale(1); }

/* contact */
.doors { display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:clamp(24px,4vw,56px); margin-top:2.2rem; }
.doors h2 { font-size:1.3rem; margin:0 0 .6rem; font-family:'Libre Caslon Display',Georgia,serif; font-weight:400; }
.doors ul { margin:0; padding:0; list-style:none; }
.doors li { padding:.3rem 0; }
.doors a { text-decoration:none; border-bottom:1px solid #00000033; }
.doors a:hover { border-bottom-color:var(--ink); }

/* cta band */
.cta { text-align:center; }
.cta .btn { display:inline-block; margin-top:1.8rem; font-family:Archivo,sans-serif; font-size:13px; letter-spacing:.24em; text-transform:uppercase;
  color:var(--paper); border:1px solid var(--paper); padding:16px 34px; text-decoration:none; transition:background .2s ease-out,color .2s ease-out; }
.cta .btn:hover { background:var(--paper); color:var(--ink); }

footer.site { padding:46px clamp(20px,6vw,72px) 60px; border-top:1px solid #00000018; }
footer.site .measure { display:flex; flex-wrap:wrap; gap:14px 36px; justify-content:space-between; align-items:baseline; }
footer.site, footer.site a { font-family:Archivo,sans-serif; font-size:12.5px; letter-spacing:.02em; color:var(--mid); }
footer.site a { text-decoration:none; border-bottom:1px solid #00000022; }
footer.site a:hover { color:var(--ink); }

/* reveal: one slow fade-up per band, first reveal only */
html.js .reveal { opacity:0; transform:translateY(18px); transition:opacity .7s ease-out, transform .7s ease-out; }
html.js .reveal.in { opacity:1; transform:none; }
@media (prefers-reduced-motion: reduce) {
  html.js .reveal { opacity:1; transform:none; transition:none; }
  html { scroll-behavior:auto; }
  .shelf img, .book img.cover { transition:none; }
}
:focus-visible { outline:2px solid var(--ink); outline-offset:3px; border-radius:2px; }
.band.black :focus-visible, .hero :focus-visible, nav.site :focus-visible { outline-color:#fff; }
::selection { background:var(--ink); color:var(--paper); }

@media (max-width: 760px) {
  .book .inner, .about-grid { grid-template-columns:1fr; }
  .book img.cover { max-width:240px; }
  .hero img { object-position:60% 22%; }
  nav.site { gap:14px; font-size:12px; letter-spacing:.16em; }
  .shelf { grid-template-columns:repeat(2,1fr); }
  .shelf a:nth-child(5) { grid-column:1 / -1; max-width:230px; margin:0 auto; }
}
`;

const SCRIPT = `
(function(){
  document.documentElement.classList.add('js');
  var nav=document.querySelector('nav.site');
  var hero=document.querySelector('.hero');
  if(nav&&hero&&'IntersectionObserver' in window){
    new IntersectionObserver(function(e){
      nav.classList.toggle('blend', !e[0].isIntersecting);
    },{rootMargin:'-40px 0px 0px 0px'}).observe(hero);
  } else if(nav){ nav.classList.add('blend'); }
  var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els=document.querySelectorAll('.reveal');
  if(rm||!('IntersectionObserver' in window)){ els.forEach(function(el){el.classList.add('in');}); return; }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  },{threshold:.12});
  els.forEach(function(el){ io.observe(el); });
})();
`;

const NAV = (cur) => `<nav class="site" aria-label="Site">
  <a href="/" ${cur === 'home' ? 'aria-current="page"' : ''}>kelly deVos</a>
  <a href="/about/" ${cur === 'about' ? 'aria-current="page"' : ''}>about</a>
  <a href="/my-books/" ${cur === 'books' ? 'aria-current="page"' : ''}>books</a>
  <a href="/media/" ${cur === 'media' ? 'aria-current="page"' : ''}>media</a>
  <a href="/contact-me/" ${cur === 'contact' ? 'aria-current="page"' : ''}>contact</a>
</nav>`;

const FOOTER = () => `<footer class="site">
  <div class="measure reveal">
    <span>&copy; ${new Date().getFullYear()} Kelly deVos</span>
    <span>Represented by <a href="https://zenoagency.com/">Zeno Literary Agency</a>, London</span>
    <span>${SOCIALS.map(([n, u]) => `<a href="${u}">${n}</a>`).join(' &nbsp; ')}</span>
    ${CFG.photoCredit ? `<span>Author photography by ${esc(CFG.photoCredit)}</span>` : ''}
  </div>
</footer>`;

const SEAM = '<div class="seam" aria-hidden="true"></div>';
const seamJoin = (html) => html
  .replace(/<\/section>(\s*)<section/g, '</section>$1' + SEAM + '<section')
  .replace(/<\/header>(\s*)<section/g, '</header>$1' + SEAM + '<section');

const page = ({ title, desc, pathname, body, cur, hero = false }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="https://www.kellydevos.com${pathname}">
<meta property="og:image" content="https://www.kellydevos.com/images/hero-portrait-900.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500&family=Libre+Caslon+Display&family=Libre+Caslon+Text:ital@0;1&display=swap" rel="stylesheet">
<style>${STYLE}</style>
</head>
<body${hero ? '' : ' class="no-hero"'}>
${NAV(cur)}
<main>
${seamJoin(body)}
</main>
${FOOTER()}
<script>${SCRIPT}</script>
</body>
</html>
`;

// ---------- pages ----------
fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) fs.rmSync(path.join(OUT, f), { recursive: true, force: true });

// home
const newsletterBand = CFG.newsletterUrl ? `
<section class="band black cta">
  <div class="measure reveal">
    <h2 class="display" style="margin-top:0">Occasional bookish news.<br>Not the least bit annoying.</h2>
    <a class="btn" href="${CFG.newsletterUrl}">Sign up</a>
  </div>
</section>` : '';

const home = `
<header class="hero">
  <img src="/images/hero-portrait-2000.jpg" srcset="/images/hero-portrait-900.jpg 900w, /images/hero-portrait-2000.jpg 2000w" sizes="100vw" alt="Kelly deVos, photographed in black and white" fetchpriority="high">
  <div class="scrim"></div>
  <div class="title">
    <h1>Kelly deVos</h1>
    <p>young adult novelist</p>
  </div>
  <a class="cue" href="#hello" aria-label="Scroll to introduction">&darr;</a>
</header>

<section class="band" id="hello">
  <div class="measure reveal">
    <div class="prose">
      <h2 class="display">I write sharp, funny books about girls who refuse to shrink.</h2>
      <p>Five novels so far &mdash; a fashion-world debut, a doomsday duology, zombies at
      fat camp, and a Dracula-inspired castle slasher. My work on body positivity has
      appeared in the New York Times, Vulture, Salon, Bustle and SheKnows. I live in
      Gilbert, Arizona with my high school sweetheart, our daughter, and a superhero
      dog named Cocoa.</p>
      <p><a href="/about/">More about me &rarr;</a></p>
    </div>
  </div>
</section>

<section class="band black">
  <div class="measure reveal">
    <h2 class="display" style="margin-top:0">The books</h2>
    <div class="shelf">
      ${BOOKS.map((b) => `<a href="/my-books/#${b.slug}">
        <img src="/files/${b.cover}" alt="${esc(b.title)} cover art" loading="lazy" width="300" height="300">
        <span class="t">${esc(b.title)}</span><span class="y">${esc(b.pub.split('·')[1].trim())}</span>
      </a>`).join('\n')}
    </div>
  </div>
</section>

<section class="band gray praise">
  <div class="measure reveal">
    ${PRAISE.map((p) => `<blockquote>
      <p class="q">&ldquo;${esc(p.q)}&rdquo;</p>
      <p class="by">${esc(p.by)} &middot; on <em>${esc(p.book)}</em></p>
    </blockquote>`).join('\n')}
  </div>
</section>

<section class="plate">
  <img src="/images/band-typewriter-2400.jpg" alt="Kelly at a patio table with a vintage typewriter" loading="lazy">
</section>
${newsletterBand}
`;

fs.writeFileSync(path.join(OUT, 'index.html'), page({
  title: 'Kelly deVos — young adult novelist', pathname: '/',
  desc: 'Kelly deVos writes sharp, funny young adult novels: Fat Girl on a Plane, the Day Zero duology, Eat Your Heart Out, and Go Hunt Me.',
  body: home, cur: 'home', hero: true,
}));

// about
const about = `
<section class="band" style="padding-top:clamp(110px,14vh,150px)">
  <div class="about-grid reveal">
    <img src="/images/about-laughing-1400.jpg" alt="Kelly deVos laughing, black and white" width="700" height="1050">
    <div class="prose">
      <h1 class="display" style="font-size:clamp(2.2rem,4.6vw,3.4rem);margin:.2em 0 .6em">Kelly deVos</h1>
      <p>Kelly deVos is from Gilbert, Arizona, where she lives with her high school
      sweetheart husband, amazing teen daughter and superhero dog, Cocoa. She holds a
      B.A. in Creative Writing from Arizona State University. When not reading or
      writing, Kelly can typically be found with a mocha in hand, bingeing the latest
      TV shows and adding to her ever-growing sticker collection.</p>
      <p>Her work on body positivity has been featured in the New York Times as well as
      on Vulture, Salon, Bustle and SheKnows. Her debut novel, <em>Fat Girl on a
      Plane</em>, was named one of the &ldquo;50 Best Summer Reads of All Time&rdquo; by
      Reader&rsquo;s Digest. <em>Day Zero</em> was a 2020 TASHYA State Board Reading
      List book. Zombie horror/thriller <em>Eat Your Heart Out</em> received a starred
      review from ALA Booklist, was named an Amazon Best of YA Editor&rsquo;s Pick, and
      is a Georgia Peach Book Award nominee. Her most recent novel is the
      Dracula-inspired <em>Go Hunt Me</em>, out now from Penguin Teen / Razorbill.</p>
      <p>Kelly is represented by Kristina P&eacute;rez of the
      <a href="https://zenoagency.com/">Zeno Literary Agency</a> in London.</p>
      ${CFG.photoCredit ? `<p class="label" style="margin-top:2rem">Author photography by ${esc(CFG.photoCredit)}</p>` : ''}
    </div>
  </div>
</section>
<section class="plate">
  <img src="/images/band-reading-2400.jpg" alt="Kelly reading under a patio umbrella" loading="lazy">
</section>
`;
fs.mkdirSync(path.join(OUT, 'about'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'about/index.html'), page({
  title: 'About — Kelly deVos', pathname: '/about/',
  desc: 'Kelly deVos: Arizona novelist, body-positivity essayist, author of five young adult novels.',
  body: about, cur: 'about',
}));

// books
const bookSections = BOOKS.map((b) => {
  const data = CONTENT.books[b.key];
  const seen = new Set();
  const RETAILER = /^(amazon|barnes|book depository|changing hands|indiebound|indigo)/i;
  const all = data.buy.map(([t, u]) => [t.replace(/&amp;/g, '&').replace(/^!ndigo$/i, 'Indigo'), u]);
  const buy = all.filter(([t]) => RETAILER.test(t))
    .filter(([t]) => { const k = t.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
  // anything the old page filed under buy that isn't a retailer is really press
  for (const [t, u] of all) if (!RETAILER.test(t)) data.news.unshift([t, u]);
  const paras = CONTENT.blurbs[b.blurb].split(/\n\n+/);
  const lead = paras.slice(0, 2).map((p) => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`).join('');
  const rest = paras.slice(2).map((p) => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`).join('');
  return `<section class="book" id="${b.slug}">
  <div class="inner reveal">
    <img class="cover" src="/files/${b.cover}" alt="${esc(b.title)} cover art" loading="lazy" width="490" height="490">
    <div>
      <h2>${esc(b.title)}</h2>
      <p class="pub">${esc(b.pub)}</p>
      <div class="prose">${lead}</div>
      ${rest ? `<details><summary>Keep reading &darr;</summary><div class="prose" style="margin-top:1rem">${rest}</div></details>` : ''}
      <p class="label" style="margin:1.6rem 0 .5rem">Find it</p>
      <ul class="linkrow">${buy.map(([t, u]) => `<li><a href="${u}">${esc(t)}</a></li>`).join('')}</ul>
      ${data.news.length ? `<p class="label" style="margin:1.6rem 0 .2rem">In the press</p>
      <ul class="news">${data.news.map(([t, u]) => {
        const host = u.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
        return `<li><a href="${u}"><em>${esc(t)}</em><span class="src">${esc(host)}</span></a></li>`;
      }).join('')}</ul>` : ''}
    </div>
  </div>
</section>`;
}).join('\n');

const booksPage = `
<section class="band" style="padding-bottom:clamp(20px,3vw,40px);padding-top:clamp(110px,14vh,150px)">
  <div class="measure reveal">
    <h1 class="display" style="font-size:clamp(2.2rem,4.6vw,3.4rem)">Five novels. Zero apologies.</h1>
  </div>
</section>
${bookSections}
`;
fs.mkdirSync(path.join(OUT, 'my-books'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'my-books/index.html'), page({
  title: 'Books — Kelly deVos', pathname: '/my-books/',
  desc: 'The five novels of Kelly deVos: Fat Girl on a Plane, Day Zero, Day One, Eat Your Heart Out, and Go Hunt Me — with where to buy each.',
  body: booksPage, cur: 'books',
}));

// media
const media = `
<section class="band" style="padding-top:clamp(110px,14vh,150px)">
  <div class="measure reveal">
    <h1 class="display" style="font-size:clamp(2.2rem,4.6vw,3.4rem)">Essays, interviews &amp; appearances</h1>
    <ul class="presslist">
      ${CONTENT.media.map(({ t, u }) => {
        const host = u.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
        return `<li><a href="${u}">${esc(t)}</a><span class="src label">${esc(host)}</span></li>`;
      }).join('\n')}
    </ul>
  </div>
</section>
<section class="plate">
  <img src="/images/band-pensive-2400.jpg" alt="Kelly at a patio table, vintage typewriter and martini glass beside her" loading="lazy">
</section>
`;
fs.mkdirSync(path.join(OUT, 'media'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'media/index.html'), page({
  title: 'Media — Kelly deVos', pathname: '/media/',
  desc: 'Kelly deVos in the press: New York Times, Salon, Bustle, PBS Books & Co., podcasts and more.',
  body: media, cur: 'media',
}));

// contact
const contact = `
<section class="band" style="padding-top:clamp(110px,14vh,150px)">
  <div class="measure reveal">
    <h1 class="display" style="font-size:clamp(2.2rem,4.6vw,3.4rem)">Let&rsquo;s keep in touch.</h1>
    <div class="doors">
      ${CFG.email ? `<div>
        <h2>By email</h2>
        <ul><li><a href="mailto:${esc(CFG.email)}">${esc(CFG.email)}</a></li></ul>
      </div>` : ''}
      <div>
        <h2>On social media</h2>
        <ul>${SOCIALS.map(([n, u]) => `<li><a href="${u}">${n}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h2>Rights &amp; professional inquiries</h2>
        <ul>
          <li>Kristina P&eacute;rez, <a href="https://zenoagency.com/">Zeno Literary Agency</a>, London</li>
          <li><a href="mailto:perez@zenoagency.com">perez@zenoagency.com</a></li>
        </ul>
      </div>
    </div>
  </div>
</section>
`;
fs.mkdirSync(path.join(OUT, 'contact-me'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'contact-me/index.html'), page({
  title: 'Contact — Kelly deVos', pathname: '/contact-me/',
  desc: 'Reach Kelly deVos on social media, or contact Zeno Literary Agency for rights and professional inquiries.',
  body: contact, cur: 'contact',
}));

// subscribe
const subscribe = `
<section class="band" style="padding-top:clamp(110px,14vh,150px);min-height:52vh">
  <div class="measure reveal">
    <h1 class="display" style="font-size:clamp(2.2rem,4.6vw,3.4rem)">Occasional bookish news &amp;<br>body-positivity updates.</h1>
    <div class="prose">
      <p>Don&rsquo;t worry &mdash; it&rsquo;s not the least bit annoying.</p>
      ${CFG.newsletterUrl
        ? `<p><a href="${CFG.newsletterUrl}" style="font-family:Archivo,sans-serif;font-size:13px;letter-spacing:.24em;text-transform:uppercase;text-decoration:none;border:1px solid var(--ink);padding:15px 32px;display:inline-block;margin-top:1rem">Sign up</a></p>`
        : `<p>The signup is getting a new home along with the rest of the site. Until it
           lands, <a href="/contact-me/">say hello directly</a> or find Kelly on
           <a href="https://www.instagram.com/kellydevos/">Instagram</a>.</p>`}
    </div>
  </div>
</section>
`;
fs.mkdirSync(path.join(OUT, 'subscribe'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'subscribe/index.html'), page({
  title: 'Subscribe — Kelly deVos', pathname: '/subscribe/',
  desc: 'Sign up for Kelly deVos’s occasional author newsletter.',
  body: subscribe, cur: 'subscribe',
}));

// 404
fs.writeFileSync(path.join(OUT, '404.html'), page({
  title: 'Page not found — Kelly deVos', pathname: '/404',
  desc: 'That page is not here.',
  body: `<section class="band" style="padding-top:clamp(110px,14vh,150px);min-height:60vh">
  <div class="measure reveal">
  <h1 class="display" style="font-size:clamp(2.2rem,4.6vw,3.4rem)">This page pulled a plot twist.</h1>
  <div class="prose"><p>It isn&rsquo;t here. <a href="/">Start at the beginning</a> or
  <a href="/my-books/">go straight to the books</a>.</p></div></div>
</section>`, cur: 'none',
}));

// favicon: serif K with a period, ink on paper
fs.writeFileSync(path.join(OUT, 'favicon.svg'),
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#191919"/><text x="7" y="24" font-family="Georgia,serif" font-size="21" fill="#ffffff">K</text><circle cx="24.5" cy="22" r="2.4" fill="#ffffff"/></svg>');

// assets
const copyDir = (src, dst, filter) => {
  if (!fs.existsSync(src)) return 0;
  fs.mkdirSync(dst, { recursive: true });
  let n = 0;
  for (const f of fs.readdirSync(src)) {
    if (filter && !filter(f)) continue;
    const s = path.join(src, f);
    if (fs.statSync(s).isFile()) { fs.copyFileSync(s, path.join(dst, f)); n++; }
  }
  return n;
};
const covers = new Set(BOOKS.map((b) => b.cover));
const nCovers = copyDir(path.join(ROOT, 'files'), path.join(OUT, 'files'), (f) => covers.has(f));
const nImages = copyDir(path.join(ROOT, 'images'), path.join(OUT, 'images'));
if (CFG.domain) fs.writeFileSync(path.join(OUT, 'CNAME'), CFG.domain + '\n');
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
console.log(`built 7 pages; covers: ${nCovers}, images: ${nImages}, CNAME: ${CFG.domain || '(unset)'}`);
