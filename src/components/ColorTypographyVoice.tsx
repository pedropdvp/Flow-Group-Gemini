import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { BRAND_SPECS, CORE_BRAND_COLORS } from '../data/brandSpecs';
import type { TranslationDictionary } from '../data/translations';
import type { Language } from '../types/brand';

interface ColorTypographyVoiceProps {
  lang: Language;
  t: TranslationDictionary;
}

export function ColorTypographyVoice({ lang, t }: ColorTypographyVoiceProps) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  function copyColor(hex: string) {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1600);
  }

  const swatches = [
    {
      name: 'Roxo Profundo (Primary Canvas)',
      hex: CORE_BRAND_COLORS.deepPurple,
      rgb: '34, 0, 70',
      cmyk: '92, 100, 32, 48',
      pantone: '2695 C',
      textLight: true,
    },
    {
      name: 'Platina Flow (Neutral Light)',
      hex: CORE_BRAND_COLORS.platinum,
      rgb: '234, 234, 244',
      cmyk: '6, 5, 0, 4',
      pantone: 'Cool Gray 1 C',
      textLight: false,
    },
    ...BRAND_SPECS.filter((b) => b.id !== 'flow-group').map((b) => ({
      name: b.name,
      hex: b.accentHex,
      rgb: b.rgb,
      cmyk: b.cmyk,
      pantone: b.pantone,
      textLight: b.id === 'ai-flow',
    })),
  ];

  return (
    <section className="mx-auto max-w-[1360px] px-6 py-16 lg:py-20 border-b border-[#220046]/10">
      <div className="max-w-2xl pb-8 border-b border-[#220046]/10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#220046]">
          {t.colorTypeVoice.sectionTitle}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[#4A415C]">
          {t.colorTypeVoice.sectionLead}
        </p>
      </div>

      {/* Color Swatches */}
      <div className="mt-10">
        <h3 className="text-lg font-bold text-[#220046] mb-5">
          {t.colorTypeVoice.paletteHeading}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {swatches.map((swatch) => (
            <button
              key={swatch.hex}
              type="button"
              onClick={() => copyColor(swatch.hex)}
              className="group text-left rounded-xl border border-[#220046]/12 bg-white overflow-hidden transition-colors hover:border-[#220046]/35 cursor-pointer"
            >
              <div
                className="h-24 p-4 flex items-end justify-between"
                style={{ backgroundColor: swatch.hex }}
              >
                <span
                  className={`font-specs text-sm font-semibold ${
                    swatch.textLight ? 'text-white' : 'text-[#140F1D]'
                  }`}
                >
                  {swatch.hex}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium ${
                    swatch.textLight ? 'text-white/90' : 'text-[#140F1D]/80'
                  }`}
                >
                  {copiedHex === swatch.hex ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{t.colorTypeVoice.copiedLabel}</span>
                    </>
                  ) : (
                    <Copy className="h-3.5 w-3.5 opacity-75 group-hover:opacity-100" aria-hidden="true" />
                  )}
                </span>
              </div>
              <div className="p-4 text-xs space-y-1">
                <div className="font-bold text-[#220046] text-sm">{swatch.name}</div>
                <div className="font-specs text-[#5B526E]">
                  RGB {swatch.rgb} · Pantone {swatch.pantone}
                </div>
                <div className="font-specs text-[#6E6482]">CMYK {swatch.cmyk}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Typography Scale */}
      <div className="mt-14">
        <h3 className="text-lg font-bold text-[#220046] mb-5">
          {t.colorTypeVoice.typographyHeading}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-xl border border-[#220046]/12 bg-white p-6">
            <span className="text-xs font-medium text-[#645A78]">
              {t.colorTypeVoice.primaryFontRole}
            </span>
            <div className="mt-4 text-5xl font-extrabold tracking-tight text-[#220046]">
              Aa Bb
            </div>
            <div className="mt-2 text-base font-bold text-[#220046]">Montserrat</div>
            <p className="mt-3 text-xs leading-relaxed text-[#4A415C]">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz · 0123456789
            </p>
          </div>

          <div className="rounded-xl border border-[#C99A2E]/40 bg-[#FAF7F0] p-6">
            <span className="text-xs font-medium text-[#7A590C]">
              {t.colorTypeVoice.lawSerifRole}
            </span>
            <div className="mt-4 text-5xl font-semibold font-editorial text-[#1C160C]">
              Aa Bb
            </div>
            <div className="mt-2 text-base font-semibold font-editorial text-[#1C160C]">
              Cormorant Garamond
            </div>
            <p className="mt-3 text-sm leading-relaxed font-editorial italic text-[#3D3522]">
              “{BRAND_SPECS[3].campaignSubcopy[lang]}”
            </p>
          </div>

          <div className="rounded-xl border border-[#220046]/12 bg-white p-6">
            <span className="text-xs font-medium text-[#645A78]">
              {t.colorTypeVoice.monoSpecsRole}
            </span>
            <div className="mt-4 text-4xl font-medium font-specs text-[#220046]">
              012345
            </div>
            <div className="mt-2 text-base font-medium font-specs text-[#220046]">
              JetBrains Mono
            </div>
            <p className="mt-3 text-xs leading-relaxed font-specs text-[#4A415C]">
              #220046 · 8192×3276 · 1.25X · WCAG 7.2:1
            </p>
          </div>
        </div>
      </div>

      {/* International Consulting Reference Extensions */}
      <div className="mt-14 rounded-xl bg-[#190036] text-white p-6 sm:p-10">
        <div className="max-w-2xl pb-6 border-b border-white/12">
          <h3 className="text-xl font-bold">{t.colorTypeVoice.governanceHeading}</h3>
          <p className="mt-2 text-sm text-[#D2CBE3]">
            {t.colorTypeVoice.governanceSubtitle}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-white/12 bg-white/5 p-5">
            <h4 className="text-sm font-bold text-white">
              {t.colorTypeVoice.pillarMotionTitle}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-[#DAD5E8]">
              {t.colorTypeVoice.pillarMotionBody}
            </p>
          </div>

          <div className="rounded-lg border border-white/12 bg-white/5 p-5">
            <h4 className="text-sm font-bold text-white">
              {t.colorTypeVoice.pillarSonicTitle}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-[#DAD5E8]">
              {t.colorTypeVoice.pillarSonicBody}
            </p>
          </div>

          <div className="rounded-lg border border-white/12 bg-white/5 p-5">
            <h4 className="text-sm font-bold text-white">
              {t.colorTypeVoice.pillarPrintTitle}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-[#DAD5E8]">
              {t.colorTypeVoice.pillarPrintBody}
            </p>
          </div>

          <div className="rounded-lg border border-white/12 bg-white/5 p-5">
            <h4 className="text-sm font-bold text-white">
              {t.colorTypeVoice.pillarAccessibilityTitle}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-[#DAD5E8]">
              {t.colorTypeVoice.pillarAccessibilityBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
