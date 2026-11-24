import { useEffect, useRef, useState } from 'react';
import {
  Check,
  Copy,
  Download,
  Film,
  Pause,
  Play,
  RotateCcw,
  Share2,
  Smartphone,
  Video,
} from 'lucide-react';
import { BRAND_MAP, BRAND_SPECS } from '../data/brandSpecs';
import type { TranslationDictionary } from '../data/translations';
import type {
  BrandId,
  Language,
  SocialPlatform,
  VideoFormat,
} from '../types/brand';
import {
  buildProcessedLogoCanvas,
  downloadCampaignPosterPng,
} from '../utils/logoExporter';

interface CampaignStudioProps {
  lang: Language;
  t: TranslationDictionary;
  selectedBrand: BrandId;
  onSelectBrand: (brand: BrandId) => void;
  onShareAsset: (scopeLabel: string) => void;
}

const SOCIAL_PLATFORMS: { id: SocialPlatform; label: string }[] = [
  { id: 'instagram', label: 'Instagram Reels' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'linkedin', label: 'LinkedIn Video' },
  { id: 'facebook', label: 'Facebook Reels' },
];

export function CampaignStudio({
  lang,
  t,
  selectedBrand,
  onSelectBrand,
  onShareAsset,
}: CampaignStudioProps) {
  const [videoFormat, setVideoFormat] = useState<VideoFormat>('cinematic-16-9');
  const [socialPlatform, setSocialPlatform] = useState<SocialPlatform>('instagram');
  const [showSafeZones, setShowSafeZones] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [copiedPromptId, setCopiedPromptId] = useState<BrandId | null>(null);
  const [downloadingPosterId, setDownloadingPosterId] = useState<BrandId | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animTimeRef = useRef<number>(0);
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const logoCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const brand = BRAND_MAP[selectedBrand];

  // Load brand campaign photo + alpha-keyed logo canvas whenever selectedBrand changes
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (!cancelled) bgImageRef.current = img;
    };
    img.src = brand.campaignImagePath;

    buildProcessedLogoCanvas(brand.masterJpgPath, 'keep', 800)
      .then((c) => {
        if (!cancelled) logoCanvasRef.current = c;
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [brand.campaignImagePath, brand.masterJpgPath]);

  // 60fps Canvas Motion Renderer (Cinematic 16:9 & Social Reel 9:16)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let lastTs = performance.now();

    const drawFrame = (now: number) => {
      const dt = Math.min(0.05, (now - lastTs) / 1000);
      lastTs = now;
      if (isPlaying) {
        const pace = brand.positioningMode === 'conservative' ? 0.55 : 1.0;
        animTimeRef.current = (animTimeRef.current + dt * pace) % 6;
      }

      const tSec = animTimeRef.current;
      const progress = tSec / 6;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#16002E';
      ctx.fillRect(0, 0, w, h);

      // Slow ken-burns pan on campaign photograph
      const bg = bgImageRef.current;
      if (bg && bg.complete && bg.naturalWidth > 0) {
        const zoom = 1.04 + Math.sin(progress * Math.PI) * 0.06;
        const baseScale = Math.max(w / bg.naturalWidth, h / bg.naturalHeight) * zoom;
        const dw = bg.naturalWidth * baseScale;
        const dh = bg.naturalHeight * baseScale;
        const offsetX = (w - dw) * 0.5 + Math.sin(progress * Math.PI * 2) * 14;
        const offsetY = (h - dh) * 0.5;
        ctx.drawImage(bg, offsetX, offsetY, dw, dh);
      }

      // Contrast scrim
      const scrim = ctx.createLinearGradient(0, 0, 0, h);
      scrim.addColorStop(0, 'rgba(18, 0, 38, 0.58)');
      scrim.addColorStop(0.5, 'rgba(18, 0, 38, 0.28)');
      scrim.addColorStop(1, 'rgba(14, 0, 30, 0.90)');
      ctx.fillStyle = scrim;
      ctx.fillRect(0, 0, w, h);

      // Animated brand accent light sweep (omitted/subdued for conservative Law Flow)
      if (brand.positioningMode !== 'conservative') {
        ctx.save();
        ctx.strokeStyle = brand.accentHex;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 3;
        ctx.beginPath();
        const sweepY = h * (0.28 + Math.sin(progress * Math.PI * 2) * 0.05);
        ctx.moveTo(0, sweepY);
        ctx.bezierCurveTo(w * 0.33, sweepY - 50, w * 0.66, sweepY + 50, w, sweepY - 12);
        ctx.stroke();
        ctx.restore();
      } else {
        // Subtle architectural hairline frame for Law Flow
        ctx.strokeStyle = 'rgba(201, 154, 46, 0.55)';
        ctx.lineWidth = 2;
        ctx.strokeRect(28, 28, w - 56, h - 56);
      }

      // Logo Plate with Contrasting Border (aligned inside safe-zone bounds)
      const logoC = logoCanvasRef.current;
      const isVertical = videoFormat === 'social-9-16';
      const padLeft = isVertical ? 36 : 64;
      const safeRight = isVertical ? 84 : 64;
      const usableW = w - padLeft - safeRight;
      const topY = isVertical ? 108 : 52;
      const plateW = isVertical ? usableW : 340;
      const plateH = isVertical ? 96 : 108;

      ctx.fillStyle = 'rgba(20, 0, 43, 0.88)';
      ctx.beginPath();
      ctx.roundRect(padLeft, topY, plateW, plateH, 14);
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = brand.borderContrastHex;
      ctx.stroke();

      if (logoC) {
        const targetW = plateW - 44;
        const targetH = Math.min(plateH - 26, (logoC.height / logoC.width) * targetW);
        const drawW = (logoC.width / logoC.height) * targetH;
        ctx.drawImage(
          logoC,
          padLeft + (plateW - drawW) / 2,
          topY + (plateH - targetH) / 2,
          drawW,
          targetH
        );
      }

      // Word-wrap helper so text never squishes horizontally
      const drawWrappedText = (
        text: string,
        x: number,
        startY: number,
        maxW: number,
        lineHeight: number,
        maxLines: number
      ): number => {
        const words = text.split(' ');
        const lines: string[] = [];
        let current = '';
        for (const word of words) {
          const candidate = current ? `${current} ${word}` : word;
          if (ctx.measureText(candidate).width <= maxW) {
            current = candidate;
          } else {
            if (current) lines.push(current);
            current = word;
            if (lines.length === maxLines - 1) break;
          }
        }
        if (current && lines.length < maxLines) lines.push(current);
        lines.forEach((line, idx) => {
          ctx.fillText(line, x, startY + idx * lineHeight);
        });
        return startY + lines.length * lineHeight;
      };

      // Animated Headline & Subcopy
      const fadeAlpha = Math.min(1, tSec / 0.8);
      ctx.save();
      ctx.globalAlpha = fadeAlpha;
      ctx.fillStyle = '#FFFFFF';
      ctx.font = isVertical
        ? '700 30px Montserrat, sans-serif'
        : '700 44px Montserrat, sans-serif';

      const headlineStartY = isVertical ? h - 332 : h - 166;
      const afterHeadlineY = drawWrappedText(
        brand.campaignHeadline[lang],
        padLeft,
        headlineStartY,
        usableW,
        isVertical ? 38 : 52,
        2
      );

      ctx.fillStyle = '#E4DFF0';
      ctx.font = isVertical
        ? '400 15px Montserrat, sans-serif'
        : '400 19px Montserrat, sans-serif';
      const afterSubY = drawWrappedText(
        brand.campaignSubcopy[lang],
        padLeft,
        afterHeadlineY + 6,
        usableW,
        isVertical ? 22 : 27,
        3
      );

      // Progress / Accent indicator
      const barY = Math.min(h - 74, afterSubY + 14);
      ctx.fillStyle = brand.accentHex;
      ctx.fillRect(padLeft, barY, usableW * progress, 4);

      ctx.fillStyle = 'rgba(234, 234, 244, 0.88)';
      ctx.font = '600 13px Montserrat, sans-serif';
      ctx.fillText(
        `FLOW GROUP  ·  ${brand.name.toUpperCase()}`,
        padLeft,
        barY + 26
      );
      ctx.restore();

      // Safe-zone guides for Social Reels (Instagram / TikTok / LinkedIn / Facebook)
      if (isVertical && showSafeZones) {
        ctx.save();
        ctx.setLineDash([6, 6]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.42)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(24, 92, w - 96, h - 180);
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
        ctx.font = '500 11px JetBrains Mono, monospace';
        ctx.fillText(`${socialPlatform.toUpperCase()} SAFE ZONE`, 28, 80);
        ctx.restore();
      }

      rafId = requestAnimationFrame(drawFrame);
    };

    rafId = requestAnimationFrame(drawFrame);
    return () => cancelAnimationFrame(rafId);
  }, [brand, isPlaying, lang, showSafeZones, socialPlatform, videoFormat]);

  async function handleExportFrame() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${brand.id}-${videoFormat}-frame.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  }

  async function handleRecordWebm() {
    const canvas = canvasRef.current;
    if (!canvas || typeof MediaRecorder === 'undefined' || !canvas.captureStream) {
      await handleExportFrame();
      return;
    }

    try {
      setIsRecording(true);
      animTimeRef.current = 0;
      setIsPlaying(true);

      const stream = canvas.captureStream(30);
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';
      const recorder = new MediaRecorder(stream, { mimeType });
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (ev) => {
        if (ev.data.size > 0) chunks.push(ev.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${brand.id}-${videoFormat}-campaign.webm`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1500);
        setIsRecording(false);
      };

      recorder.start();
      setTimeout(() => {
        if (recorder.state === 'recording') {
          recorder.stop();
        }
      }, 5000);
    } catch {
      setIsRecording(false);
      await handleExportFrame();
    }
  }

  function handleCopyPrompt(id: BrandId, promptText: string) {
    navigator.clipboard?.writeText(promptText);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 1800);
  }

  async function handleDownloadPoster(id: BrandId) {
    setDownloadingPosterId(id);
    try {
      await downloadCampaignPosterPng(id, lang);
    } finally {
      setDownloadingPosterId(null);
    }
  }

  return (
    <section
      id="campaigns"
      className="scroll-mt-24 mx-auto max-w-[1360px] px-6 py-16 lg:py-20"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#220046]/10">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#220046]">
            {t.campaigns.sectionTitle}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#4A415C]">
            {t.campaigns.sectionLead}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onShareAsset(`${brand.name} — Campanhas & Reels`)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#220046] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#350B66] transition-colors whitespace-nowrap shrink-0 self-start cursor-pointer"
        >
          <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t.nav.share}</span>
        </button>
      </div>

      {/* 1. Generated Campaign Photography Gallery */}
      <div className="mt-10">
        <h3 className="text-lg font-bold text-[#220046] mb-5">
          {t.campaigns.galleryHeading}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRAND_SPECS.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-[#220046]/12 bg-white overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-52 bg-[#16002E] overflow-hidden">
                <img
                  src={item.campaignImagePath}
                  alt={`${item.name} campaign artwork`}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16002E]/90 via-[#16002E]/30 to-transparent" />

                <div
                  className="absolute top-4 left-4 rounded-lg bg-[#16002E]/90 px-3 py-1.5 backdrop-blur-sm"
                  style={{ border: `1.5px solid ${item.borderContrastHex}` }}
                >
                  <img
                    src={item.masterJpgPath}
                    alt={item.name}
                    className="h-6 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="absolute inset-x-4 bottom-4 text-white">
                  <h4 className="text-base font-bold leading-snug">
                    {item.campaignHeadline[lang]}
                  </h4>
                  <p className="mt-1 text-xs text-[#DAD5E8] line-clamp-2">
                    {item.campaignSubcopy[lang]}
                  </p>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-[#5B526E]">
                  {item.name} · 1920×1080
                </span>
                <button
                  type="button"
                  disabled={downloadingPosterId === item.id}
                  onClick={() => handleDownloadPoster(item.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#220046]/20 bg-white px-3 py-2 text-xs font-semibold text-[#220046] hover:bg-[#F3F0F9] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.campaigns.downloadCampaignImage}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 2. Interactive Cinematic Video (16:9) & Social Reel (9:16) Studio */}
      <div className="mt-14 rounded-xl border border-[#220046]/15 bg-[#190036] text-white p-6 sm:p-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/12">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold">{t.campaigns.videoStudioHeading}</h3>
            <p className="mt-2 text-sm text-[#D2CBE3]">
              {t.campaigns.videoStudioLead}
            </p>
          </div>

          {/* Format Toggle */}
          <div className="flex flex-wrap max-w-full items-center gap-1 rounded-lg bg-white/10 p-1 self-start">
            <button
              type="button"
              onClick={() => setVideoFormat('cinematic-16-9')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                videoFormat === 'cinematic-16-9'
                  ? 'bg-white text-[#220046]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Film className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.campaigns.formatCinematic}</span>
            </button>
            <button
              type="button"
              onClick={() => setVideoFormat('social-9-16')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                videoFormat === 'social-9-16'
                  ? 'bg-white text-[#220046]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.campaigns.formatReel}</span>
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Live Video Canvas Stage */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center rounded-xl bg-[#0E001F] p-5 border border-white/10">
            <canvas
              ref={canvasRef}
              data-testid="campaign-video-canvas"
              width={videoFormat === 'cinematic-16-9' ? 960 : 450}
              height={videoFormat === 'cinematic-16-9' ? 540 : 800}
              className={`rounded-lg border border-white/15 bg-black ${
                videoFormat === 'cinematic-16-9'
                  ? 'w-full h-auto aspect-video'
                  : 'h-[500px] w-auto aspect-[9/16]'
              }`}
            />

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 w-full">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-[#220046] hover:bg-[#EAEAF4] transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.campaigns.pauseBtn}</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.campaigns.playBtn}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  animTimeRef.current = 0;
                  setIsPlaying(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/15 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.campaigns.restartBtn}</span>
              </button>

              <button
                type="button"
                disabled={isRecording}
                onClick={handleRecordWebm}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#2E7DFF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E66DE] disabled:opacity-60 transition-colors cursor-pointer"
              >
                <Video className="h-3.5 w-3.5" aria-hidden="true" />
                <span>
                  {isRecording
                    ? t.campaigns.recordingLabel
                    : t.campaigns.recordWebmBtn}
                </span>
              </button>

              <button
                type="button"
                onClick={handleExportFrame}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/15 transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.campaigns.exportFrameBtn}</span>
              </button>
            </div>
          </div>

          {/* Brand & Social Platform Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="block text-xs font-semibold text-[#C6BEDA] mb-2.5">
                {t.dam.selectBrand}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {BRAND_SPECS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectBrand(item.id)}
                    className={`rounded-lg border px-3.5 py-2.5 text-left text-xs font-semibold transition-colors cursor-pointer ${
                      selectedBrand === item.id
                        ? 'border-white bg-white text-[#220046]'
                        : 'border-white/15 bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {videoFormat === 'social-9-16' && (
              <div className="rounded-lg border border-white/15 bg-white/5 p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-white">
                    {t.campaigns.safeZoneLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSafeZones((s) => !s)}
                    className="text-xs font-semibold text-[#8CB8FF] underline cursor-pointer"
                  >
                    {showSafeZones ? 'On' : 'Off'}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {SOCIAL_PLATFORMS.map((sp) => (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => setSocialPlatform(sp.id)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                        socialPlatform === sp.id
                          ? 'bg-[#2E7DFF] text-white'
                          : 'bg-white/10 text-[#DAD5E8] hover:bg-white/20'
                      }`}
                    >
                      {sp.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-lg border border-white/12 bg-white/5 p-5 space-y-2">
              <div className="text-xs font-semibold text-[#C6BEDA]">
                {brand.roleTitle[lang]}
              </div>
              <div className="text-base font-bold text-white">
                {brand.campaignHeadline[lang]}
              </div>
              <p className="text-xs leading-relaxed text-[#DAD5E8]">
                {brand.voiceTone[lang]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Pomelli & Free Campaign Tools Playbook */}
      <div className="mt-14">
        <div className="max-w-2xl mb-6">
          <h3 className="text-xl font-bold text-[#220046]">
            {t.campaigns.pomelliHeading}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#4A415C]">
            {t.campaigns.pomelliLead}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BRAND_SPECS.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-[#220046]/12 bg-white p-5 flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-[#645A78] pb-2 border-b border-[#220046]/10">
                  <span className="font-bold text-[#220046]">{item.name}</span>
                  <span>Pomelli · CapCut · Canva</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed font-specs text-[#3A314C]">
                  “{item.pomelliPrompt}”
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopyPrompt(item.id, item.pomelliPrompt)}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#220046]/20 bg-[#F8F7FA] px-3 py-2 text-xs font-semibold text-[#220046] hover:bg-[#EBE8F2] transition-colors cursor-pointer"
              >
                {copiedPromptId === item.id ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                    <span>{t.colorTypeVoice.copiedLabel}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.campaigns.copyPromptBtn}</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
