# Noon Arabic

Brand name for **Cairo** (SIL Open Font License) in Noon Business products.

The design system site loads Cairo via `next/font/google` (self-hosted by Next.js)
until local files are pinned here. Install in Figma under the family name
**Noon Arabic** so files match engineering.

## Local install (optional)

Drop these files here and switch `src/app/layout.tsx` from `next/font/google`
to `next/font/local`:

- `NoonArabic-Regular.woff2` (400)
- `NoonArabic-Medium.woff2` (500)
- `NoonArabic-SemiBold.woff2` (600)

Source files can be exported from [Cairo on Google Fonts](https://fonts.google.com/specimen/Cairo)
at weights 400, 500, and 600. Rename on export so product code keeps the
`--font-noon-arabic` variable and `font-arabic` utility unchanged.

## Usage

```tsx
<html lang="ar" dir="rtl" className="type-arabic">
  <p className="font-arabic text-body-lg">نص عربي</p>
</html>
```

Arabic type uses zero letter-spacing. Never set NoonTree on Arabic copy.

## Brand glyphs

Includes `dhm` (U+20C3, AED) and `sar` (U+20C1, SAR), same as NoonTree and
Noon Mono.
