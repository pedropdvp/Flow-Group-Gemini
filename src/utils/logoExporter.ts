import JSZip from 'jszip';
import { BRAND_MAP, BRAND_SPECS } from '../data/brandSpecs';
import type { BrandId, Language } from '../types/brand';
import {
  generateBrandLogoSvg,
  generateJointUmbrellaSvg,
  type SvgVariantMode,
} from './brandRules';

export type RasterExportMode =
  | 'original-jpg'
  | 'original-png-transparent'
  | 'black-transparent'
  | 'black-whitebg'
  | 'white-transparent'
  | 'white-blackbg'
  | 'adaptive-framed';

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

/**
 * Keys out the Deep Purple (#220046) background from an official master JPG
 * and optionally recolors all foreground pixels to pure black or pure white.
 */
export async function buildProcessedLogoCanvas(
  masterSrc: string,
  colorTransform: 'keep' | 'black' | 'white',
  targetWidth = 2400
): Promise<HTMLCanvasElement> {
  const img = await loadImage(masterSrc);
  const ratio = img.naturalHeight / Math.max(1, img.naturalWidth);
  const width = targetWidth;
  const height = Math.round(width * ratio);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.drawImage(img, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Sample top-left corner pixel as background reference (#220046)
  const bgR = data[0];
  const bgG = data[1];
  const bgB = data[2];

  const hardThreshold = 20;
  const featherRange = 36;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const dist = Math.hypot(r - bgR, g - bgG, b - bgB);

    let alpha = 255;
    if (dist <= hardThreshold) {
      alpha = 0;
    } else if (dist < hardThreshold + featherRange) {
      alpha = Math.round(((dist - hardThreshold) / featherRange) * 255);
    }

    if (alpha === 0) {
      data[i + 3] = 0;
      continue;
    }

    if (colorTransform === 'black') {
      data[i] = 10;
      data[i + 1] = 10;
      data[i + 2] = 12;
      data[i + 3] = alpha;
    } else if (colorTransform === 'white') {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      data[i + 3] = alpha;
    } else {
      data[i + 3] = alpha;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: 'image/png' | 'image/jpeg',
  quality = 0.95
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas export failed'));
      },
      mimeType,
      quality
    );
  });
}

export async function downloadBrandLogoAsset(
  brandId: BrandId,
  mode: RasterExportMode
): Promise<void> {
  const brand = BRAND_MAP[brandId];

  if (mode === 'original-jpg') {
    const response = await fetch(brand.masterJpgPath);
    const blob = await response.blob();
    triggerDownload(blob, `${brandId}-master-roxo-profundo.jpg`);
    return;
  }

  if (mode === 'original-png-transparent') {
    const fgCanvas = await buildProcessedLogoCanvas(brand.masterJpgPath, 'keep', 2400);
    const blob = await canvasToBlob(fgCanvas, 'image/png');
    triggerDownload(blob, `${brandId}-color-transparent.png`);
    return;
  }

  if (mode === 'black-transparent') {
    const fgCanvas = await buildProcessedLogoCanvas(brand.masterJpgPath, 'black', 2400);
    const blob = await canvasToBlob(fgCanvas, 'image/png');
    triggerDownload(blob, `${brandId}-black-transparent.png`);
    return;
  }

  if (mode === 'black-whitebg') {
    const fgCanvas = await buildProcessedLogoCanvas(brand.masterJpgPath, 'black', 2400);
    const out = document.createElement('canvas');
    out.width = fgCanvas.width;
    out.height = fgCanvas.height;
    const ctx = out.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, out.width, out.height);
      ctx.drawImage(fgCanvas, 0, 0);
    }
    const blob = await canvasToBlob(out, 'image/jpeg', 0.96);
    triggerDownload(blob, `${brandId}-black-on-white.jpg`);
    return;
  }

  if (mode === 'white-transparent') {
    const fgCanvas = await buildProcessedLogoCanvas(brand.masterJpgPath, 'white', 2400);
    const blob = await canvasToBlob(fgCanvas, 'image/png');
    triggerDownload(blob, `${brandId}-white-transparent.png`);
    return;
  }

  if (mode === 'white-blackbg') {
    const fgCanvas = await buildProcessedLogoCanvas(brand.masterJpgPath, 'white', 2400);
    const out = document.createElement('canvas');
    out.width = fgCanvas.width;
    out.height = fgCanvas.height;
    const ctx = out.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0A0A0C';
      ctx.fillRect(0, 0, out.width, out.height);
      ctx.drawImage(fgCanvas, 0, 0);
    }
    const blob = await canvasToBlob(out, 'image/jpeg', 0.96);
    triggerDownload(blob, `${brandId}-white-on-black.jpg`);
    return;
  }

  if (mode === 'adaptive-framed') {
    const fgCanvas = await buildProcessedLogoCanvas(brand.masterJpgPath, 'keep', 2000);
    const padX = 220;
    const padY = 160;
    const out = document.createElement('canvas');
    out.width = fgCanvas.width + padX * 2;
    out.height = fgCanvas.height + padY * 2;
    const ctx = out.getContext('2d');
    if (ctx) {
      const r = 48;
      ctx.fillStyle = '#14002B';
      ctx.beginPath();
      ctx.roundRect(12, 12, out.width - 24, out.height - 24, r);
      ctx.fill();
      ctx.lineWidth = 12;
      ctx.strokeStyle = brand.borderContrastHex;
      ctx.stroke();
      ctx.drawImage(fgCanvas, padX, padY);
    }
    const blob = await canvasToBlob(out, 'image/png');
    triggerDownload(blob, `${brandId}-adaptive-contrast-border.png`);
  }
}

export function downloadBrandSvg(brandId: BrandId, mode: SvgVariantMode): void {
  const svgString = generateBrandLogoSvg(brandId, mode);
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  triggerDownload(blob, `${brandId}-${mode}.svg`);
}

export async function downloadJointUmbrellaPackage(): Promise<void> {
  const svg = generateJointUmbrellaSvg();
  const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  triggerDownload(svgBlob, 'flow-group-umbrella-ecosystem.svg');
}

export async function downloadCampaignPosterPng(
  brandId: BrandId,
  lang: Language
): Promise<void> {
  const brand = BRAND_MAP[brandId];
  const [photo, logoCanvas] = await Promise.all([
    loadImage(brand.campaignImagePath),
    buildProcessedLogoCanvas(brand.masterJpgPath, 'keep', 900),
  ]);

  const width = 1920;
  const height = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Draw cover photo
  const scale = Math.max(width / photo.naturalWidth, height / photo.naturalHeight);
  const drawW = photo.naturalWidth * scale;
  const drawH = photo.naturalHeight * scale;
  ctx.drawImage(photo, (width - drawW) / 2, (height - drawH) / 2, drawW, drawH);

  // Architectural contrast scrim
  const grad = ctx.createLinearGradient(0, 0, width * 0.72, height);
  grad.addColorStop(0, 'rgba(18, 0, 38, 0.86)');
  grad.addColorStop(0.55, 'rgba(18, 0, 38, 0.45)');
  grad.addColorStop(1, 'rgba(18, 0, 38, 0.20)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Top-left adaptive bordered badge with brand logo
  const badgeW = 540;
  const badgeH = Math.round((logoCanvas.height / logoCanvas.width) * badgeW) + 56;
  ctx.fillStyle = 'rgba(20, 0, 43, 0.88)';
  ctx.beginPath();
  ctx.roundRect(84, 84, badgeW + 64, badgeH, 20);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = brand.borderContrastHex;
  ctx.stroke();
  ctx.drawImage(logoCanvas, 116, 112, badgeW, badgeH - 56);

  // Campaign headline & subcopy
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 72px Montserrat, sans-serif';
  ctx.fillText(brand.campaignHeadline[lang], 84, height - 210);

  ctx.fillStyle = '#EAEAF4';
  ctx.font = '400 28px Montserrat, sans-serif';
  ctx.fillText(brand.campaignSubcopy[lang].slice(0, 82), 84, height - 148);

  // Accent bar
  ctx.fillStyle = brand.accentHex;
  ctx.fillRect(84, height - 102, 140, 5);

  ctx.fillStyle = 'rgba(234,234,244,0.85)';
  ctx.font = '600 22px Montserrat, sans-serif';
  ctx.fillText(`FLOW GROUP  ·  ${brand.name.toUpperCase()}`, 246, height - 92);

  const blob = await canvasToBlob(canvas, 'image/png');
  triggerDownload(blob, `${brandId}-campaign-${lang}.png`);
}

export async function downloadApplicationMockupPng(
  kind: 'ooh' | 'fleet' | 'reception',
  brandId: BrandId,
  lang: Language
): Promise<void> {
  const brand = BRAND_MAP[brandId];
  const bgSrc =
    kind === 'reception'
      ? BRAND_MAP['law-flow'].campaignImagePath
      : kind === 'fleet'
      ? '/src/assets/images/mockup_vehicle_ooh_1795526924943.jpg'
      : brand.campaignImagePath;

  const [bgImg, logoCanvas] = await Promise.all([
    loadImage(bgSrc),
    buildProcessedLogoCanvas(brand.masterJpgPath, 'keep', 1100),
  ]);

  const width = 1920;
  const height = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.drawImage(bgImg, 0, 0, width, height);

  const scrim = ctx.createLinearGradient(0, height * 0.4, 0, height);
  scrim.addColorStop(0, 'rgba(12, 0, 26, 0.15)');
  scrim.addColorStop(1, 'rgba(12, 0, 26, 0.85)');
  ctx.fillStyle = scrim;
  ctx.fillRect(0, 0, width, height);

  // Plate with contrasting border
  const plateW = 680;
  const plateH = 260;
  const x = 96;
  const y = height - plateH - 96;
  ctx.fillStyle = 'rgba(20, 0, 43, 0.90)';
  ctx.beginPath();
  ctx.roundRect(x, y, plateW, plateH, 22);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = brand.borderContrastHex;
  ctx.stroke();

  const logoH = Math.round((logoCanvas.height / logoCanvas.width) * 460);
  ctx.drawImage(logoCanvas, x + 48, y + 32, 460, logoH);

  ctx.fillStyle = '#EAEAF4';
  ctx.font = '500 22px Montserrat, sans-serif';
  ctx.fillText(
    `${kind.toUpperCase()} APPLICATION SPEC  ·  ${brand.tagline[lang]}`,
    x + 48,
    y + plateH - 34
  );

  const blob = await canvasToBlob(canvas, 'image/png');
  triggerDownload(blob, `${brandId}-${kind}-application.png`);
}

export async function downloadCompleteBrandKitZip(lang: Language): Promise<void> {
  const zip = new JSZip();
  const svgFolder = zip.folder('01_Vectors_SVG');
  const pngFolder = zip.folder('02_Transparent_PNG');
  const jpgFolder = zip.folder('03_Solid_Background_JPG');

  svgFolder?.file('flow-group-umbrella-ecosystem.svg', generateJointUmbrellaSvg());

  for (const brand of BRAND_SPECS) {
    svgFolder?.file(`${brand.id}-original.svg`, generateBrandLogoSvg(brand.id, 'original'));
    svgFolder?.file(`${brand.id}-black-transparent.svg`, generateBrandLogoSvg(brand.id, 'black-transparent'));
    svgFolder?.file(`${brand.id}-white-transparent.svg`, generateBrandLogoSvg(brand.id, 'white-transparent'));
    svgFolder?.file(`${brand.id}-adaptive-border.svg`, generateBrandLogoSvg(brand.id, 'adaptive'));

    // Generate clean raster PNG & JPG for each brand
    const [blackCanvas, whiteCanvas] = await Promise.all([
      buildProcessedLogoCanvas(brand.masterJpgPath, 'black', 1600),
      buildProcessedLogoCanvas(brand.masterJpgPath, 'white', 1600),
    ]);

    const blackPng = await canvasToBlob(blackCanvas, 'image/png');
    const whitePng = await canvasToBlob(whiteCanvas, 'image/png');
    pngFolder?.file(`${brand.id}-black-transparent.png`, blackPng);
    pngFolder?.file(`${brand.id}-white-transparent.png`, whitePng);

    // JPG black on white
    const bwCanvas = document.createElement('canvas');
    bwCanvas.width = blackCanvas.width;
    bwCanvas.height = blackCanvas.height;
    const bwCtx = bwCanvas.getContext('2d');
    if (bwCtx) {
      bwCtx.fillStyle = '#FFFFFF';
      bwCtx.fillRect(0, 0, bwCanvas.width, bwCanvas.height);
      bwCtx.drawImage(blackCanvas, 0, 0);
    }
    jpgFolder?.file(`${brand.id}-black-on-white.jpg`, await canvasToBlob(bwCanvas, 'image/jpeg', 0.94));

    // JPG white on black
    const wbCanvas = document.createElement('canvas');
    wbCanvas.width = whiteCanvas.width;
    wbCanvas.height = whiteCanvas.height;
    const wbCtx = wbCanvas.getContext('2d');
    if (wbCtx) {
      wbCtx.fillStyle = '#0A0A0C';
      wbCtx.fillRect(0, 0, wbCanvas.width, wbCanvas.height);
      wbCtx.drawImage(whiteCanvas, 0, 0);
    }
    jpgFolder?.file(`${brand.id}-white-on-black.jpg`, await canvasToBlob(wbCanvas, 'image/jpeg', 0.94));
  }

  const readme = [
    'FLOW GROUP — OFFICIAL BRAND BOOK & DAM PACKAGE',
    `Language Edition: ${lang.toUpperCase()}`,
    '---------------------------------------------------',
    'Umbrella Mark: Flow Group ("Group" is a protected handwritten signature)',
    'Sub-brands:',
    ...BRAND_SPECS.map(
      (b) =>
        `- ${b.name}: Accent ${b.accentHex} | CMYK ${b.cmyk} | Pantone ${b.pantone} | Clear Space ${b.clearSpaceRatioX}X | Min ${b.minDigitalPx}px / ${b.minPrintMm}mm`
    ),
    '',
    'Note on Law Flow: Conservative governance exception (+25% clear space, no neon effects).',
  ].join('\n');

  zip.file('BRAND_GUIDELINES_SPEC.txt', readme);
  const content = await zip.generateAsync({ type: 'blob' });
  triggerDownload(content, `Flow_Group_Brand_Kit_${lang.toUpperCase()}.zip`);
}
