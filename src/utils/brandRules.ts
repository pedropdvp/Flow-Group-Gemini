import type { BrandId, BrandSpec } from '../types/brand';
import { BRAND_MAP } from '../data/brandSpecs';

export interface ClearSpaceMetrics {
  unitXPx: number;
  marginPx: number;
  totalWidthPx: number;
  totalHeightPx: number;
}

export type SizeComplianceStatus = 'primary-ok' | 'compact-required' | 'below-min';

export interface SizeComplianceResult {
  status: SizeComplianceStatus;
  estimatedPrintMm: number;
  minDigitalPx: number;
  compactMinDigitalPx: number;
}

/**
 * Computes modular clear space dimensions around a rendered logo box.
 * X is derived from the Flow cap-height (approx. 38% of full lockup height).
 */
export function computeClearSpaceMetrics(
  logoWidthPx: number,
  logoHeightPx: number,
  clearSpaceRatioX: number
): ClearSpaceMetrics {
  const safeWidth = Math.max(1, logoWidthPx);
  const safeHeight = Math.max(1, logoHeightPx);
  const unitXPx = Math.round(safeHeight * 0.38);
  const marginPx = Math.round(unitXPx * clearSpaceRatioX);
  return {
    unitXPx,
    marginPx,
    totalWidthPx: safeWidth + marginPx * 2,
    totalHeightPx: safeHeight + marginPx * 2,
  };
}

/**
 * Evaluates digital pixel width and physical print width (at 96dpi -> 3.7795 px/mm)
 * against primary and compact minimum thresholds.
 */
export function validateMinimumSize(
  brand: BrandSpec,
  widthPx: number
): SizeComplianceResult {
  const estimatedPrintMm = Number((widthPx / 3.7795275591).toFixed(1));
  if (widthPx >= brand.minDigitalPx) {
    return {
      status: 'primary-ok',
      estimatedPrintMm,
      minDigitalPx: brand.minDigitalPx,
      compactMinDigitalPx: brand.compactMinDigitalPx,
    };
  }
  if (widthPx >= brand.compactMinDigitalPx) {
    return {
      status: 'compact-required',
      estimatedPrintMm,
      minDigitalPx: brand.minDigitalPx,
      compactMinDigitalPx: brand.compactMinDigitalPx,
    };
  }
  return {
    status: 'below-min',
    estimatedPrintMm,
    minDigitalPx: brand.minDigitalPx,
    compactMinDigitalPx: brand.compactMinDigitalPx,
  };
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace('#', '').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return null;
  }
  return {
    r: parseInt(cleaned.slice(0, 2), 16),
    g: parseInt(cleaned.slice(2, 4), 16),
    b: parseInt(cleaned.slice(4, 6), 16),
  };
}

export function computeRelativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
}

export function computeContrastRatio(hexA: string, hexB: string): number {
  const lumA = computeRelativeLuminance(hexA);
  const lumB = computeRelativeLuminance(hexB);
  const brightest = Math.max(lumA, lumB);
  const darkest = Math.min(lumA, lumB);
  return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}

/**
 * Recommends contrasting plate and border styling for colored/photographic backgrounds.
 */
export function getContrastingBorderSpec(
  brand: BrandSpec,
  backgroundHex: string
): {
  plateBackground: string;
  borderColor: string;
  textColor: string;
  contrastRatio: number;
} {
  const bgLum = computeRelativeLuminance(backgroundHex);
  const isLightBackground = bgLum > 0.4;
  const plateBackground = isLightBackground ? '#220046' : 'rgba(18, 0, 38, 0.92)';
  const borderColor = brand.borderContrastHex;
  const textColor = '#FFFFFF';
  const contrastRatio = computeContrastRatio('#220046', '#FFFFFF');
  return { plateBackground, borderColor, textColor, contrastRatio };
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function normalizeWhatsAppPhone(raw: string): string {
  return raw.replace(/[^\d]/g, '');
}

export function isValidWhatsAppPhone(raw: string): boolean {
  const digits = normalizeWhatsAppPhone(raw);
  return digits.length >= 8 && digits.length <= 15;
}

export function buildMailtoUrl(
  emails: string[],
  subject: string,
  body: string
): string {
  const to = emails.map((e) => e.trim()).filter(Boolean).join(',');
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildWhatsAppUrl(phone: string, text: string): string {
  const digits = normalizeWhatsAppPhone(phone);
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export type SvgVariantMode = 'original' | 'black-transparent' | 'black-whitebg' | 'white-transparent' | 'white-blackbg' | 'adaptive';

/**
 * Generates a crisp, scalable SVG representation of any Flow Group brand logo,
 * preserving the calligraphic handwritten signature for "Group" in Flow Group
 * and the open-top smiling circle mark for the four sub-brands.
 */
export function generateBrandLogoSvg(
  brandId: BrandId,
  mode: SvgVariantMode = 'original'
): string {
  const brand = BRAND_MAP[brandId];
  const isBlack = mode === 'black-transparent' || mode === 'black-whitebg';
  const isWhite = mode === 'white-transparent' || mode === 'white-blackbg';

  const bgRect =
    mode === 'original'
      ? '<rect width="960" height="360" fill="#220046"/>'
      : mode === 'black-whitebg'
      ? '<rect width="960" height="360" fill="#FFFFFF"/>'
      : mode === 'white-blackbg'
      ? '<rect width="960" height="360" fill="#0A0A0C"/>'
      : mode === 'adaptive'
      ? `<rect x="16" y="16" width="928" height="328" rx="28" fill="#180034" stroke="${brand.borderContrastHex}" stroke-width="8"/>`
      : '';

  const primaryWordFill = isBlack ? '#0A0A0C' : '#EAEAF4';
  const accentFill = isBlack ? '#0A0A0C' : isWhite ? '#FFFFFF' : brand.accentHex;
  const subCaptionFill = isBlack ? '#0A0A0C' : '#EAEAF4';

  if (brandId === 'flow-group') {
    const flowColor = isBlack ? '#0A0A0C' : isWhite ? '#FFFFFF' : '#EAEAF4';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 360" width="960" height="360">
  ${bgRect}
  <g transform="translate(88, 224)">
    <text x="0" y="0" font-family="Montserrat, Arial, sans-serif" font-weight="800" font-size="136" letter-spacing="-4" fill="${flowColor}">Flow</text>
  </g>
  <!-- Handwritten calligraphic Group signature with sweeping underline -->
  <g transform="translate(470, 108)" fill="none" stroke="${flowColor}" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 88 22 C 62 2, 18 28, 12 72 C 6 112, 36 128, 74 114 C 98 104, 110 82, 114 68 L 70 72 M 106 72 C 92 108, 78 144, 70 162" stroke-width="11"/>
    <path d="M 134 74 C 140 62, 154 58, 166 64 C 154 80, 146 98, 148 112" stroke-width="9.5"/>
    <path d="M 196 68 C 176 70, 168 98, 184 108 C 202 118, 220 96, 214 78 C 210 68, 202 66, 196 68 Z" stroke-width="9.5"/>
    <path d="M 236 68 C 230 92, 232 108, 246 110 C 260 112, 274 90, 280 68 C 276 92, 276 106, 286 110" stroke-width="9.5"/>
    <path d="M 306 66 C 296 104, 286 142, 278 164 M 304 78 C 322 58, 350 64, 346 88 C 342 108, 314 116, 298 106" stroke-width="9.5"/>
    <path d="M 8 158 C 110 118, 250 104, 396 116" stroke-width="8"/>
  </g>
</svg>`;
  }

  // Sub-brand open-top smiling circle emblem + Title + WITH U
  const prefixX = 320;
  const suffixOffset =
    brandId === 'ai-flow'
      ? 112
      : brandId === 'biz-flow'
      ? 148
      : brandId === 'law-flow'
      ? 182
      : 368;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 360" width="960" height="360">
  ${bgRect}
  <!-- Open-top smiling ring emblem -->
  <g transform="translate(172, 180)" fill="none" stroke="${accentFill}" stroke-linecap="round">
    <path d="M -32 -88 A 94 94 0 1 0 32 -88" stroke-width="14"/>
    <line x1="-32" y1="-22" x2="-32" y2="-4" stroke-width="14"/>
    <line x1="32" y1="-22" x2="32" y2="-4" stroke-width="14"/>
    <path d="M -16 8 A 16 18 0 0 0 16 8" stroke-width="14"/>
  </g>
  <!-- Brand Wordmark -->
  <text x="${prefixX}" y="192" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="84" letter-spacing="-1.5" fill="${accentFill}">${brand.prefix}</text>
  <text x="${prefixX + suffixOffset}" y="192" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="84" letter-spacing="-1.5" fill="${primaryWordFill}">Flow</text>
  <text x="${prefixX + 130}" y="256" font-family="Montserrat, Arial, sans-serif" font-weight="400" font-size="25" letter-spacing="14" fill="${subCaptionFill}">WITH U</text>
</svg>`;
}

/**
 * Generates the joint umbrella lockup SVG showing Flow Group above all 4 sub-brands.
 */
export function generateJointUmbrellaSvg(): string {
  const subs = ['ai-flow', 'biz-flow', 'law-flow', 'personal-flow'] as const;
  const subBlocks = subs
    .map((id, idx) => {
      const b = BRAND_MAP[id];
      const x = 60 + idx * 290;
      return `
  <g transform="translate(${x}, 270)">
    <rect x="0" y="0" width="265" height="110" rx="14" fill="#180036" stroke="${b.accentHex}" stroke-width="2.5"/>
    <g transform="translate(46, 55) scale(0.28)" fill="none" stroke="${b.accentHex}" stroke-linecap="round">
      <path d="M -32 -88 A 94 94 0 1 0 32 -88" stroke-width="16"/>
      <line x1="-32" y1="-22" x2="-32" y2="-4" stroke-width="16"/>
      <line x1="32" y1="-22" x2="32" y2="-4" stroke-width="16"/>
      <path d="M -16 8 A 16 18 0 0 0 16 8" stroke-width="16"/>
    </g>
    <text x="84" y="60" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="23" fill="${b.accentHex}">${b.prefix} <tspan fill="#EAEAF4">Flow</tspan></text>
    <text x="86" y="84" font-family="Montserrat, Arial, sans-serif" font-weight="400" font-size="10" letter-spacing="4.5" fill="#C6C2D6">WITH U</text>
  </g>`;
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1260 440" width="1260" height="440">
  <rect width="1260" height="440" fill="#220046"/>
  <line x1="60" y1="226" x2="1200" y2="226" stroke="rgba(234,234,244,0.18)" stroke-width="1.5"/>
  <g transform="translate(360, 150)">
    <text x="0" y="0" font-family="Montserrat, Arial, sans-serif" font-weight="800" font-size="96" letter-spacing="-3" fill="#EAEAF4">Flow</text>
    <g transform="translate(262, -78) scale(0.68)" fill="none" stroke="#EAEAF4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 88 22 C 62 2, 18 28, 12 72 C 6 112, 36 128, 74 114 C 98 104, 110 82, 114 68 L 70 72 M 106 72 C 92 108, 78 144, 70 162" stroke-width="11"/>
      <path d="M 134 74 C 140 62, 154 58, 166 64 C 154 80, 146 98, 148 112" stroke-width="9.5"/>
      <path d="M 196 68 C 176 70, 168 98, 184 108 C 202 118, 220 96, 214 78 C 210 68, 202 66, 196 68 Z" stroke-width="9.5"/>
      <path d="M 236 68 C 230 92, 232 108, 246 110 C 260 112, 274 90, 280 68 C 276 92, 276 106, 286 110" stroke-width="9.5"/>
      <path d="M 306 66 C 296 104, 286 142, 278 164 M 304 78 C 322 58, 350 64, 346 88 C 342 108, 314 116, 298 106" stroke-width="9.5"/>
      <path d="M 8 158 C 110 118, 250 104, 396 116" stroke-width="8"/>
    </g>
  </g>
  ${subBlocks}
</svg>`;
}
