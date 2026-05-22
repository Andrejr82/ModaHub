"use client";

import type { ReactNode } from "react";
import type { Product } from "@/types/product";

interface ProductArtworkProps {
  product: Product;
  className?: string;
}

const colorMap: Record<string, string> = {
  Preto: "#1c1816",
  "Off-white": "#ece7df",
  Grafite: "#595a5e",
  Areia: "#d7c2a8",
  "Verde mineral": "#72806a",
  Oliva: "#62674d",
  Mescla: "#a6a8ad",
  Branco: "#f6f3ee",
  "Denim médio": "#5f7794",
  "Black wash": "#3d434f",
  Cinza: "#777274",
  Marrom: "#6c5146",
  Prata: "#b9bcc4",
  Tartaruga: "#7b543c",
};

function getPrimaryColor(product: Product) {
  return colorMap[product.colors[0] ?? ""] ?? "#2f2a27";
}

function getAccentColor(product: Product) {
  return colorMap[product.colors[1] ?? ""] ?? "#d8cec1";
}

function ShirtArtwork({ primary, accent, relaxed = false, sleeveless = false }: { primary: string; accent: string; relaxed?: boolean; sleeveless?: boolean }) {
  return (
    <>
      <path
        d={
          sleeveless
            ? "M132 54h56l22 30v114c0 16-12 28-28 28h-22V128h-8v98h-20c-16 0-28-12-28-28V84l28-30z"
            : relaxed
              ? "M106 56h108l44 34-20 34-24-14v92c0 18-14 32-32 32h-44c-18 0-32-14-32-32v-92l-24 14-20-34 44-34z"
              : "M116 56h88l36 30-18 30-20-12v92c0 18-14 32-32 32h-20c-18 0-32-14-32-32v-92l-20 12-18-30 36-30z"
        }
        fill={primary}
      />
      <path d="M144 56c0 11 8 18 16 18s16-7 16-18" stroke={accent} strokeWidth="6" strokeLinecap="round" />
    </>
  );
}

function PantsArtwork({ primary, accent, short = false }: { primary: string; accent: string; short?: boolean }) {
  return (
    <>
      <path
        d={
          short
            ? "M116 58h88l12 56-16 92h-36l-8-50-8 50h-36l-16-92 24-56z"
            : "M118 54h84l18 72-18 108h-34l-10-76-10 76h-34l-18-108 22-72z"
        }
        fill={primary}
      />
      <rect x="128" y="92" width="18" height="38" rx="8" fill={accent} opacity="0.5" />
      <rect x="174" y="92" width="18" height="38" rx="8" fill={accent} opacity="0.5" />
    </>
  );
}

function HoodieSetArtwork({ primary, accent }: { primary: string; accent: string }) {
  return (
    <>
      <path d="M88 72h88l26 28-14 22-18-10v72c0 14-10 24-24 24h-30c-14 0-24-10-24-24v-72l-18 10-14-22 28-28z" fill={primary} />
      <path d="M118 72c0 18 14 34 32 34s32-16 32-34" stroke={accent} strokeWidth="6" strokeLinecap="round" />
      <path d="M188 106h48l12 48-12 82h-22l-8-58-8 58h-22l-12-82 24-48z" fill={accent} opacity="0.92" />
    </>
  );
}

function SneakerArtwork({ primary, accent }: { primary: string; accent: string }) {
  return (
    <>
      <path d="M82 170c18 0 34-18 48-18 18 0 22 28 48 28h38c18 0 34 14 34 30v10H82c-10 0-18-8-18-18v-14c0-10 8-18 18-18z" fill={primary} />
      <path d="M78 220h176" stroke={accent} strokeWidth="10" strokeLinecap="round" />
      <path d="M144 160l22 16M130 168l20 12M116 176l18 10" stroke={accent} strokeWidth="4" strokeLinecap="round" />
    </>
  );
}

function CapArtwork({ primary, accent, bucket = false }: { primary: string; accent: string; bucket?: boolean }) {
  return bucket ? (
    <>
      <path d="M118 88h84l18 70H100l18-70z" fill={primary} />
      <path d="M92 158h136c-10 20-34 34-68 34s-58-14-68-34z" fill={accent} opacity="0.9" />
    </>
  ) : (
    <>
      <path d="M92 138c0-38 30-68 68-68s68 30 68 68H92z" fill={primary} />
      <path d="M158 136h84c-12 24-40 40-84 40v-40z" fill={accent} opacity="0.9" />
    </>
  );
}

function BagArtwork({ primary, accent }: { primary: string; accent: string }) {
  return (
    <>
      <rect x="102" y="88" width="116" height="86" rx="18" fill={primary} />
      <rect x="118" y="106" width="34" height="18" rx="6" fill={accent} opacity="0.55" />
      <path d="M112 92c22-16 44-24 66-24 16 0 34 6 54 18" stroke={accent} strokeWidth="7" strokeLinecap="round" />
    </>
  );
}

function SocksArtwork({ primary, accent }: { primary: string; accent: string }) {
  return (
    <>
      <path d="M118 64h34v86c0 20-16 36-36 36h-16v-28h10c8 0 14-6 14-14V64z" fill={primary} />
      <path d="M176 64h34v86c0 20-16 36-36 36h-16v-28h10c8 0 14-6 14-14V64z" fill={accent} />
    </>
  );
}

function NecklaceArtwork({ primary, accent }: { primary: string; accent: string }) {
  return (
    <>
      <path d="M106 84c10 48 38 76 54 92 16-16 44-44 54-92" stroke={primary} strokeWidth="8" strokeLinecap="round" fill="none" />
      <rect x="146" y="170" width="28" height="34" rx="10" fill={accent} />
    </>
  );
}

function SunglassesArtwork({ primary, accent }: { primary: string; accent: string }) {
  return (
    <>
      <rect x="94" y="116" width="56" height="34" rx="14" fill={primary} />
      <rect x="170" y="116" width="56" height="34" rx="14" fill={primary} />
      <rect x="148" y="126" width="24" height="6" rx="3" fill={accent} />
      <path d="M92 120l-20-8M228 120l20-8" stroke={accent} strokeWidth="6" strokeLinecap="round" />
    </>
  );
}

function BomberArtwork({ primary, accent }: { primary: string; accent: string }) {
  return (
    <>
      <path d="M114 58h92l24 36-20 30-20-16v92c0 18-14 32-32 32h-8c-18 0-32-14-32-32v-92l-20 16-20-30 24-36z" fill={primary} />
      <rect x="148" y="82" width="24" height="126" rx="10" fill={accent} opacity="0.6" />
      <path d="M130 58c0 18 14 30 30 30s30-12 30-30" stroke={accent} strokeWidth="6" strokeLinecap="round" />
    </>
  );
}

export function ProductArtwork({ product, className = "" }: ProductArtworkProps) {
  const primary = getPrimaryColor(product);
  const accent = getAccentColor(product);

  let artwork: ReactNode;

  switch (product.id) {
    case "p1":
      artwork = <ShirtArtwork primary={primary} accent={accent} relaxed />;
      break;
    case "p2":
      artwork = <ShirtArtwork primary={primary} accent={accent} />;
      break;
    case "p3":
      artwork = <PantsArtwork primary={primary} accent={accent} short />;
      break;
    case "p4":
      artwork = <PantsArtwork primary={primary} accent={accent} short />;
      break;
    case "p5":
    case "p6":
      artwork = <PantsArtwork primary={primary} accent={accent} />;
      break;
    case "p7":
      artwork = <HoodieSetArtwork primary={primary} accent={accent} />;
      break;
    case "p8":
      artwork = <ShirtArtwork primary={primary} accent={accent} sleeveless />;
      break;
    case "p9":
      artwork = <CapArtwork primary={primary} accent={accent} />;
      break;
    case "p10":
      artwork = <CapArtwork primary={primary} accent={accent} bucket />;
      break;
    case "p11":
      artwork = <BagArtwork primary={primary} accent={accent} />;
      break;
    case "p12":
      artwork = <SneakerArtwork primary={primary} accent={accent} />;
      break;
    case "p13":
      artwork = <SocksArtwork primary={primary} accent={accent} />;
      break;
    case "p14":
      artwork = <NecklaceArtwork primary={primary} accent={accent} />;
      break;
    case "p15":
      artwork = <SunglassesArtwork primary={primary} accent={accent} />;
      break;
    case "p16":
      artwork = <BomberArtwork primary={primary} accent={accent} />;
      break;
    default:
      artwork = <ShirtArtwork primary={primary} accent={accent} relaxed />;
  }

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#faf7f2_0%,#efe7dc_100%)] ${className}`.trim()}>
      <div className="absolute inset-x-10 bottom-6 h-6 rounded-full bg-black/8 blur-md" aria-hidden />
      <svg viewBox="0 0 320 280" className="relative h-full w-full p-6" aria-hidden>
        {artwork}
      </svg>
    </div>
  );
}
