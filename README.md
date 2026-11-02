# Python by Example — Website

Companion site for [python-by-example](https://github.com/blshaer/python-by-example).

Stack: **Next.js**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **MDX**, **Shiki**, **Pagefind**, **Vercel**.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Search needs a production build so Pagefind can index the static HTML:

```bash
npm run build
npx serve out
```

## Deploy on Vercel

Import this GitHub repository in Vercel. The build command runs `next build` then Pagefind against the exported `out/` directory.

## Content

Lesson and project pages are generated from the Python examples into `curriculum/`. Refresh them with:

```bash
python tools/generate-content.py
```
