import { useEffect, useState } from 'react';
import { Archive, Check, Download, FileCode2, Image as ImageIcon, Share2 } from 'lucide-react';
import {
  ADAPTIVE_BACKGROUNDS,
  BRAND_MAP,
  BRAND_SPECS,
} from '../data/brandSpecs';
import type { TranslationDictionary } from '../data/translations';
import type { AdaptiveBackgroundId, BrandId, Language, LogoTabMode } from '../types/brand';
import { getContrastingBorderSpec } from '../utils/brandRules';
import {
  buildProcessedLogoCanvas,
  downloadBrandLogoAsset,
  downloadBrandSvg,
  downloadCompleteBrandKitZip,
} from '../utils/logoExporter';

interface LogoSystemDAMProps {
  lang: Language;
  t: TranslationDictionary;
  selectedBrand: BrandId;
  onSelectBrand: (brand: BrandId) => void;
  onShareAsset: (scopeLabel: string) => void;
}

export function LogoSystemDAM({
  lang,
  t,
  selectedBrand,
  onSelectBrand,
  onShareAsset,
}: LogoSystemDAMProps) {
  const [activeTab, setActiveTab] = useState<LogoTabMode>('original');
  const [adaptiveBgId, setAdaptiveBgId] = useState<AdaptiveBackgroundId>('architectural-glass');
  const [borderStyle, setBorderStyle] = useState<'translucent' | 'solid'>('translucent');
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [completedAction, setCompletedAction] = useState<string | null>(null);

  // Alpha-keyed live preview data URLs derived directly from official JPG masters
  const [keyedPreviews, setKeyedPreviews] = useState<{
    color?: string;
    black?: string;
    white?: string;
  }>({});

  const brand = BRAND_MAP[selectedBrand];
  const activeBg =
    ADAPTIVE_BACKGROUNDS.find((bg) => bg.id === adaptiveBgId) ?? ADAPTIVE_BACKGROUNDS[0];
  const borderSpec = getContrastingBorderSpec(
    brand,
    activeBg.isLightSurface ? '#E6DFD3' : '#181422'
  );

  useEffect(() => {
    let cancelled = false;
    setKeyedPreviews({});

    async function generatePreviews() {
      try {
        const [colorCanvas, blackCanvas, whiteCanvas] = await Promise.all([
          buildProcessedLogoCanvas(brand.masterJpgPath, 'keep', 960),
          buildProcessedLogoCanvas(brand.masterJpgPath, 'black', 960),
          buildProcessedLogoCanvas(brand.masterJpgPath, 'white', 960),
        ]);
        if (!cancelled) {
          setKeyedPreviews({
            color: colorCanvas.toDataURL('image/png'),
            black: blackCanvas.toDataURL('image/png'),
            white: whiteCanvas.toDataURL('image/png'),
          });
        }
      } catch {
        // Fallback gracefully to master JPG if canvas fails
      }
    }

    generatePreviews();
    return () => {
      cancelled = true;
    };
  }, [brand.masterJpgPath]);

  async function runDownload(key: string, fn: () => Promise<void> | void) {
    try {
      setBusyAction(key);
      await fn();
      setCompletedAction(key);
      setTimeout(() => setCompletedAction(null), 2000);
    } finally {
      setBusyAction(null);
    }
  }

  const tabs: { id: LogoTabMode; label: string }[] = [
    { id: 'original', label: t.dam.tabOriginal },
    { id: 'black', label: t.dam.tabBlack },
    { id: 'white', label: t.dam.tabWhite },
    { id: 'adaptive', label: t.dam.tabAdaptive },
  ];

  return (
    <section
      id="dam"
      className="scroll-mt-24 mx-auto max-w-[1360px] px-6 py-16 lg:py-20 border-b border-[#220046]/10"
    >
      {/* Header + Zip Kit Download */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#220046]/10">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#220046]">
            {t.dam.sectionTitle}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#4A415C]">
            {t.dam.sectionLead}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() =>
              onShareAsset(`${brand.name} — ${tabs.find((x) => x.id === activeTab)?.label ?? ''}`)
            }
            className="inline-flex items-center gap-2 rounded-lg border border-[#220046]/20 bg-white px-4 py-2.5 text-xs font-semibold text-[#220046] hover:bg-[#F3F0F9] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.nav.share}</span>
          </button>
          <button
            type="button"
            disabled={busyAction === 'full-zip'}
            onClick={() => runDownload('full-zip', () => downloadCompleteBrandKitZip(lang))}
            className="inline-flex items-center gap-2 rounded-lg bg-[#220046] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#350B66] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Archive className="h-3.5 w-3.5" aria-hidden="true" />
            <span>
              {busyAction === 'full-zip'
                ? t.dam.preparingDownload
                : completedAction === 'full-zip'
                ? 'ZIP OK'
                : t.dam.downloadFullZip}
            </span>
          </button>
        </div>
      </div>

      {/* Brand Selector Strip */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#5B526E]">
          {t.dam.selectBrand}
        </span>
        <div
          role="group"
          aria-label={t.dam.selectBrand}
          className="flex flex-wrap items-center gap-1.5 rounded-lg bg-[#EBE8F2] p-1"
        >
          {BRAND_SPECS.map((item) => {
            const active = item.id === selectedBrand;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectBrand(item.id)}
                className={`inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-white text-[#220046] shadow-sm'
                    : 'text-[#4A415C] hover:text-[#220046]'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-sm shrink-0"
                  style={{
                    backgroundColor:
                      item.id === 'flow-group' ? '#220046' : item.accentHex,
                  }}
                />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Requested 4 Mode Tabs: Original | Preto | Branco | Fundos Coloridos & Fotográficos */}
      <div className="mt-6 border-b border-[#220046]/12">
        <div role="tablist" aria-label="Logo color modes" className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selected
                    ? 'border-[#220046] text-[#220046]'
                    : 'border-transparent text-[#645A78] hover:text-[#220046]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="mt-8">
        {activeTab === 'original' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 rounded-xl bg-[#220046] p-8 sm:p-12 flex flex-col items-center justify-center border border-[#220046]/20">
              <img
                src={brand.masterJpgPath}
                alt={`${brand.name} official master logo on deep purple`}
                className="w-full max-w-[520px] h-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="lg:col-span-5 rounded-xl border border-[#220046]/12 bg-white p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-[#645A78] border-b border-[#220046]/10 pb-3">
                  <span className="font-semibold text-[#220046]">{brand.name}</span>
                  <span className="font-specs">{brand.masterDimensions}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#4A415C]">
                  {t.dam.originalDesc}
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-y-3 gap-x-4 text-xs border-t border-[#220046]/10 pt-4">
                  <div>
                    <dt className="text-[#6E6482]">Accent HEX</dt>
                    <dd className="mt-0.5 font-specs font-medium text-[#220046]">
                      {brand.accentHex}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#6E6482]">Pantone®</dt>
                    <dd className="mt-0.5 font-specs font-medium text-[#220046]">
                      {brand.pantone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#6E6482]">Backdrop</dt>
                    <dd className="mt-0.5 font-specs font-medium text-[#220046]">
                      #220046
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#6E6482]">CMYK</dt>
                    <dd className="mt-0.5 font-specs font-medium text-[#220046]">
                      {brand.cmyk}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() =>
                    runDownload('orig-jpg', () =>
                      downloadBrandLogoAsset(brand.id, 'original-jpg')
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#220046] px-4 py-3 text-xs font-semibold text-white hover:bg-[#350B66] transition-colors cursor-pointer"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {completedAction === 'orig-jpg'
                      ? 'Downloaded'
                      : t.dam.downloadJpgMaster}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    runDownload('orig-png', () =>
                      downloadBrandLogoAsset(brand.id, 'original-png-transparent')
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#220046]/20 bg-white px-4 py-2.5 text-xs font-semibold text-[#220046] hover:bg-[#F3F0F9] transition-colors cursor-pointer"
                >
                  <ImageIcon className="h-4 w-4" aria-hidden="true" />
                  <span>{t.dam.downloadPngTransparent}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    runDownload('orig-svg', () => downloadBrandSvg(brand.id, 'original'))
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#220046]/20 bg-white px-4 py-2.5 text-xs font-semibold text-[#220046] hover:bg-[#F3F0F9] transition-colors cursor-pointer"
                >
                  <FileCode2 className="h-4 w-4" aria-hidden="true" />
                  <span>{t.dam.downloadSvgVector}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'black' && (
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-[#4A415C] max-w-3xl">
              {t.dam.blackDesc}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Black Transparent PNG */}
              <div className="rounded-xl border border-[#220046]/12 bg-white p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[#645A78] pb-3 border-b border-[#220046]/10">
                  <span className="font-semibold text-[#220046]">
                    {brand.name} · PNG Sem Fundo
                  </span>
                  <span className="font-specs">#0A0A0C · Alpha</span>
                </div>
                <div className="my-5 rounded-lg bg-checkerboard p-8 flex items-center justify-center min-h-[190px] border border-[#220046]/10">
                  {keyedPreviews.black ? (
                    <img
                      src={keyedPreviews.black}
                      alt={`${brand.name} black transparent PNG preview`}
                      className="max-h-28 w-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-xs text-[#5B526E]">
                      {t.dam.preparingDownload}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      runDownload('black-png', () =>
                        downloadBrandLogoAsset(brand.id, 'black-transparent')
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A0A0C] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#242429] transition-colors cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.dam.downloadPngTransparent}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      runDownload('black-svg', () =>
                        downloadBrandSvg(brand.id, 'black-transparent')
                      )
                    }
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#220046]/20 px-3.5 py-2.5 text-xs font-semibold text-[#220046] hover:bg-[#F3F0F9] transition-colors cursor-pointer"
                  >
                    <FileCode2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>SVG</span>
                  </button>
                </div>
              </div>

              {/* Black on White JPG */}
              <div className="rounded-xl border border-[#220046]/12 bg-white p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[#645A78] pb-3 border-b border-[#220046]/10">
                  <span className="font-semibold text-[#220046]">
                    {brand.name} · JPG Fundo Branco
                  </span>
                  <span className="font-specs">#0A0A0C / #FFFFFF</span>
                </div>
                <div className="my-5 rounded-lg bg-white p-8 flex items-center justify-center min-h-[190px] border border-[#220046]/15">
                  {keyedPreviews.black ? (
                    <img
                      src={keyedPreviews.black}
                      alt={`${brand.name} black on white JPG preview`}
                      className="max-h-28 w-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-xs text-[#5B526E]">
                      {t.dam.preparingDownload}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      runDownload('black-jpg', () =>
                        downloadBrandLogoAsset(brand.id, 'black-whitebg')
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#220046] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#350B66] transition-colors cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.dam.downloadJpgWhite}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      runDownload('black-white-svg', () =>
                        downloadBrandSvg(brand.id, 'black-whitebg')
                      )
                    }
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#220046]/20 px-3.5 py-2.5 text-xs font-semibold text-[#220046] hover:bg-[#F3F0F9] transition-colors cursor-pointer"
                  >
                    <FileCode2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>SVG</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'white' && (
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-[#4A415C] max-w-3xl">
              {t.dam.whiteDesc}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* White Transparent PNG */}
              <div className="rounded-xl border border-[#220046]/12 bg-white p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[#645A78] pb-3 border-b border-[#220046]/10">
                  <span className="font-semibold text-[#220046]">
                    {brand.name} · PNG Sem Fundo
                  </span>
                  <span className="font-specs">#FFFFFF · Alpha</span>
                </div>
                <div className="my-5 rounded-lg bg-checkerboard-dark p-8 flex items-center justify-center min-h-[190px] border border-[#220046]/20">
                  {keyedPreviews.white ? (
                    <img
                      src={keyedPreviews.white}
                      alt={`${brand.name} white transparent PNG preview`}
                      className="max-h-28 w-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-xs text-white/70">
                      {t.dam.preparingDownload}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      runDownload('white-png', () =>
                        downloadBrandLogoAsset(brand.id, 'white-transparent')
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#220046] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#350B66] transition-colors cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.dam.downloadPngTransparent}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      runDownload('white-svg', () =>
                        downloadBrandSvg(brand.id, 'white-transparent')
                      )
                    }
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#220046]/20 px-3.5 py-2.5 text-xs font-semibold text-[#220046] hover:bg-[#F3F0F9] transition-colors cursor-pointer"
                  >
                    <FileCode2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>SVG</span>
                  </button>
                </div>
              </div>

              {/* White on Black JPG */}
              <div className="rounded-xl border border-[#220046]/12 bg-white p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[#645A78] pb-3 border-b border-[#220046]/10">
                  <span className="font-semibold text-[#220046]">
                    {brand.name} · JPG Fundo Preto
                  </span>
                  <span className="font-specs">#FFFFFF / #0A0A0C</span>
                </div>
                <div className="my-5 rounded-lg bg-[#0A0A0C] p-8 flex items-center justify-center min-h-[190px] border border-black">
                  {keyedPreviews.white ? (
                    <img
                      src={keyedPreviews.white}
                      alt={`${brand.name} white on black JPG preview`}
                      className="max-h-28 w-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-xs text-white/70">
                      {t.dam.preparingDownload}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      runDownload('white-jpg', () =>
                        downloadBrandLogoAsset(brand.id, 'white-blackbg')
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A0A0C] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#242429] transition-colors cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.dam.downloadJpgBlack}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      runDownload('white-black-svg', () =>
                        downloadBrandSvg(brand.id, 'white-blackbg')
                      )
                    }
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#220046]/20 px-3.5 py-2.5 text-xs font-semibold text-[#220046] hover:bg-[#F3F0F9] transition-colors cursor-pointer"
                  >
                    <FileCode2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>SVG</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'adaptive' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Interactive Photographic / Colored Canvas Simulator */}
            <div className="lg:col-span-7 relative overflow-hidden rounded-xl border border-[#220046]/15 min-h-[340px] flex items-center justify-center p-8"
              style={{ background: activeBg.cssBackground }}
            >
              {activeBg.backdropImage && (
                <img
                  src={activeBg.backdropImage}
                  alt={activeBg.label[lang]}
                  className="absolute inset-0 h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/25"
              />

              {/* Contrasting Border Plate */}
              <div
                className="relative z-10 rounded-2xl px-8 py-7 backdrop-blur-md transition-all duration-200 max-w-[440px] w-full flex items-center justify-center"
                style={{
                  backgroundColor:
                    borderStyle === 'solid' ? '#220046' : borderSpec.plateBackground,
                  border: `3px solid ${borderSpec.borderColor}`,
                  boxShadow: '0 18px 40px rgba(10, 0, 24, 0.45)',
                }}
              >
                {keyedPreviews.color ? (
                  <img
                    src={keyedPreviews.color}
                    alt={`${brand.name} with contrasting border ${borderSpec.borderColor}`}
                    className="w-full max-h-28 object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-xs text-white/80">
                    {t.dam.preparingDownload}
                  </span>
                )}
              </div>
            </div>

            {/* Adaptive Controls & Downloads */}
            <div className="lg:col-span-5 rounded-xl border border-[#220046]/12 bg-white p-6 flex flex-col justify-between gap-6">
              <div>
                <p className="text-sm leading-relaxed text-[#4A415C]">
                  {t.dam.adaptiveDesc}
                </p>

                <div className="mt-5">
                  <span className="block text-xs font-semibold text-[#220046]">
                    {t.dam.backgroundSelector}
                  </span>
                  <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ADAPTIVE_BACKGROUNDS.map((bg) => (
                      <button
                        key={bg.id}
                        type="button"
                        onClick={() => setAdaptiveBgId(bg.id)}
                        className={`rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors cursor-pointer ${
                          adaptiveBgId === bg.id
                            ? 'border-[#220046] bg-[#220046] text-white'
                            : 'border-[#220046]/15 bg-[#F8F7FA] text-[#3A314C] hover:border-[#220046]/40'
                        }`}
                      >
                        {bg.label[lang]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <span className="block text-xs font-semibold text-[#220046]">
                    {t.dam.borderStyleLabel}
                  </span>
                  <div className="mt-2 grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={() => setBorderStyle('translucent')}
                      className={`rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors cursor-pointer ${
                        borderStyle === 'translucent'
                          ? 'border-[#220046] bg-[#F3F0F9] text-[#220046]'
                          : 'border-[#220046]/15 text-[#4A415C]'
                      }`}
                    >
                      {t.dam.borderFrameOption}
                    </button>
                    <button
                      type="button"
                      onClick={() => setBorderStyle('solid')}
                      className={`rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors cursor-pointer ${
                        borderStyle === 'solid'
                          ? 'border-[#220046] bg-[#F3F0F9] text-[#220046]'
                          : 'border-[#220046]/15 text-[#4A415C]'
                      }`}
                    >
                      {t.dam.borderSolidPlateOption}
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-[#166534]">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>
                    {t.dam.contrastBadgeText} · Border{' '}
                    <span className="font-specs">{borderSpec.borderColor}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() =>
                    runDownload('adaptive-png', () =>
                      downloadBrandLogoAsset(brand.id, 'adaptive-framed')
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#220046] px-4 py-3 text-xs font-semibold text-white hover:bg-[#350B66] transition-colors cursor-pointer"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>{t.dam.downloadAdaptivePng}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    runDownload('adaptive-svg', () =>
                      downloadBrandSvg(brand.id, 'adaptive')
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#220046]/20 bg-white px-4 py-2.5 text-xs font-semibold text-[#220046] hover:bg-[#F3F0F9] transition-colors cursor-pointer"
                >
                  <FileCode2 className="h-4 w-4" aria-hidden="true" />
                  <span>{t.dam.downloadSvgVector}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
