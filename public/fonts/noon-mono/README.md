# Noon Mono

Brand name for **JetBrains Mono** (SIL Open Font License) in Noon Business products.

The design system site loads JetBrains Mono via `next/font/google` (self-hosted by Next.js)
until local files are pinned here. Install in Figma under the family name
**Noon Mono** so files match engineering.

## Local install (optional)

Drop these files here and switch `src/app/layout.tsx` from `next/font/google`
to `next/font/local`:

- `NoonMono-Regular.woff2` (400)
- `NoonMono-Medium.woff2` (500)

Source files can be exported from [JetBrains Mono on Google Fonts](https://fonts.google.com/specimen/JetBrains+Mono)
at weights 400 and 500. Rename on export so product code keeps the
`--font-noon-mono` variable and `font-mono` utility unchanged.

## Usage

```tsx
<span className="font-mono text-[13px] tabular-nums">NB-20581</span>
```

Use for code, tokens, tabular IDs, and numeric columns. Currency signs use
NoonTree glyphs (`dhm`, `sar`), not the mono stack.
