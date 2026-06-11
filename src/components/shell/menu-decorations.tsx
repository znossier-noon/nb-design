"use client";

import { motion } from "motion/react";
import { LogoMark } from "@/components/brand/logo";
import type { DecorationKey } from "@/lib/menu-decorations";
import { cn } from "@/lib/utils";

export function MenuDecoration({
  kind,
  active = false,
  className,
}: {
  kind: DecorationKey;
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/10 sm:size-16",
        className,
      )}
      aria-hidden
    >
      {kind === "principles" && <PrinciplesDeco active={active} />}
      {kind === "brand" && <BrandDeco active={active} />}
      {kind === "logo" && <LogoMark size={40} />}
      {kind === "color" && <ColorDeco active={active} />}
      {kind === "typography" && <TypographyDeco active={active} />}
      {kind === "iconography" && <IconographyDeco active={active} />}
      {kind === "motion" && <MotionDeco active={active} />}
      {kind === "content" && <ContentDeco active={active} />}
      {kind === "figma" && <FigmaDeco active={active} />}
      {kind === "assets" && <AssetsDeco active={active} />}
      {kind === "downloads" && <DownloadsDeco active={active} />}
      {kind === "documentation" && <DocumentationDeco active={active} />}
      {kind === "overview" && <OverviewDeco active={active} />}
    </div>
  );
}

function PrinciplesDeco({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col gap-1.5 p-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={active ? { width: ["60%", "90%", "70%"][i] } : { width: "60%" }}
          className="h-1 rounded-full bg-accent"
          style={{ width: `${60 + i * 12}%` }}
          transition={{ duration: 0.4 }}
        />
      ))}
    </div>
  );
}

function BrandDeco({ active }: { active: boolean }) {
  return (
    <motion.div
      animate={active ? { rotate: [0, -6, 0] } : { rotate: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="inline-block h-10 w-16 -skew-x-12 rounded-lg bg-accent" />
    </motion.div>
  );
}

function ColorDeco({ active }: { active: boolean }) {
  return (
    <div className="flex -space-x-2">
      {["bg-brand", "bg-accent", "bg-brand-strong"].map((c, i) => (
        <motion.span
          key={c}
          animate={active ? { y: [0, -4, 0] } : { y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className={cn("size-7 rounded-md ring-2 ring-white/20", c)}
        />
      ))}
    </div>
  );
}

function TypographyDeco({ active }: { active: boolean }) {
  return (
    <motion.span
      animate={active ? { scale: [1, 1.15, 1] } : { scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-2xl font-semibold text-white"
    >
      Aa
    </motion.span>
  );
}

function IconographyDeco({ active }: { active: boolean }) {
  return (
    <motion.svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      animate={active ? { rotate: [0, 90, 0] } : { rotate: 0 }}
      transition={{ duration: 0.5 }}
    >
      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
      <path d="M12 7v10M7 12h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </motion.svg>
  );
}

function MotionDeco({ active }: { active: boolean }) {
  return (
    <motion.span
      animate={active ? { x: [0, 12, 0] } : { x: 0 }}
      transition={{ duration: 0.5, repeat: active ? Infinity : 0, repeatDelay: 0.3 }}
      className="size-4 rounded-full bg-accent"
    />
  );
}

function ContentDeco({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col gap-1 p-2">
      <motion.span
        animate={active ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.7 }}
        className="h-1 w-10 rounded-full bg-white/80"
      />
      <span className="h-1 w-7 rounded-full bg-white/40" />
      <span className="h-1 w-9 rounded-full bg-white/30" />
    </div>
  );
}

function FigmaDeco({ active }: { active: boolean }) {
  return (
    <motion.div
      animate={active ? { scale: [1, 1.1, 1] } : { scale: 1 }}
      className="grid grid-cols-2 gap-0.5"
    >
      {["#F24E1E", "#FF7262", "#1ABCFE", "#0ACF83"].map((c) => (
        <span key={c} className="size-4 rounded-sm" style={{ background: c }} />
      ))}
    </motion.div>
  );
}

function AssetsDeco({ active }: { active: boolean }) {
  return <LogoMark size={36} className={cn(active && "scale-110 transition-transform")} />;
}

function DownloadsDeco({ active }: { active: boolean }) {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      animate={active ? { y: [0, 3, 0] } : { y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <path
        d="M12 4v10m0 0l4-4m-4 4l-4-4M5 18h14"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function DocumentationDeco({ active }: { active: boolean }) {
  return (
    <motion.div
      animate={active ? { rotate: [-2, 2, -2] } : { rotate: 0 }}
      transition={{ duration: 0.5 }}
      className="h-10 w-8 rounded-sm border border-white/40 bg-white/10"
    />
  );
}

function OverviewDeco({ active }: { active: boolean }) {
  return (
    <motion.div
      animate={active ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      className="grid grid-cols-2 gap-1 p-1"
    >
      <span className="size-4 rounded-full bg-accent" />
      <span className="size-4 rounded-full bg-white/30" />
      <span className="size-4 rounded-full bg-white/20" />
      <span className="size-4 rounded-full bg-brand/80" />
    </motion.div>
  );
}
