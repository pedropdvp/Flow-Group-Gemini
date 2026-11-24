import { useState } from 'react';
import { ArrowDown, Download, Globe, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { BRAND_MAP, BRAND_SPECS, REFERENCE_SHEET_PATH } from '../data/brandSpecs';
import type { TranslationDictionary } from '../data/translations';
import type { BrandId, Language } from '../types/brand';
import { downloadJointUmbrellaPackage } from '../utils/logoExporter';

interface UmbrellaArchitectureProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  t: TranslationDictionary;
  onSelectBrandForDam: (brandId: BrandId) => void;
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' },
];

export function UmbrellaArchitecture({
  lang,
  onChangeLang,
  t,
  onSelectBrandForDam,
}: UmbrellaArchitectureProps) {
  const [ecosystemMode, setEcosystemMode] = useState<'together' | 'separate'>('together');
  const flowGroup = BRAND_MAP['flow-group'];
  const subBrands = BRAND_SPECS.filter((b) => b.id !== 'flow-group');

  return (
    <>
      {/* Hero Section on Official Deep Purple #220046 */}
      <section
        id="top"
        className="relative overflow-hidden bg-[#190036] text-white border-b border-white/10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(46,125,255,0.18),transparent_52%),radial-gradient(ellipse_at_bottom_left,rgba(0,200,150,0.10),transparent_48%)]"
        />

        <div className="relative mx-auto max-w-[1360px] px-6 py-12 lg:py-16">
          {/* Language & Kicker Utility Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-10 border-b border-white/12">
            <p className="text-xs font-medium tracking-wider text-[#D2CBE3]">
              {t.hero.kicker}
            </p>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#C6BEDA]">
                <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.hero.languageLabel}:</span>
              </span>
              <div
                role="group"
                aria-label={t.hero.languageLabel}
                className="flex items-center gap-1 rounded-lg bg-white/10 p-1"
              >
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => onChangeLang(item.code)}
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      lang === item.code
                        ? 'bg-white text-[#220046]'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Balanced 2-Column Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-10 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold tracking-tight leading-[1.12] text-white">
                  {t.hero.title}
                </h1>
                <p className="mt-5 text-base leading-relaxed text-[#DAD5E8] max-w-xl">
                  {t.hero.subtitle}
                </p>

                <p className="mt-4 text-xs text-[#B6AFCC] border-t border-white/10 pt-4 max-w-xl">
                  {t.hero.signatureNote}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#dam"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#220046] transition-colors hover:bg-[#EAEAF4] whitespace-nowrap shrink-0"
                >
                  <span>{t.hero.primaryCta}</span>
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#campaigns"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/12 whitespace-nowrap shrink-0"
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  <span>{t.hero.secondaryCta}</span>
                </a>
              </div>
            </div>

            {/* Official Flow Group Master Showcase Card */}
            <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-white/15 bg-[#220046] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 text-xs text-[#C6BEDA] border-b border-white/10 pb-3">
                <span>Flow Group · Platinum Master</span>
                <span className="font-specs">{flowGroup.masterDimensions}</span>
              </div>

              <div className="my-6 flex items-center justify-center rounded-lg bg-[#220046] py-6">
                <img
                  src={flowGroup.masterJpgPath}
                  alt="Flow Group official master logo with handwritten Group signature"
                  className="w-full max-w-[460px] h-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                {subBrands.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => {
                      onSelectBrandForDam(sub.id);
                      document.getElementById('dam')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group rounded-lg border border-white/12 bg-[#16002E] p-3 text-left transition-colors hover:border-white/35 cursor-pointer"
                  >
                    <img
                      src={sub.masterJpgPath}
                      alt={`${sub.name} logo`}
                      className="w-full h-11 object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <div className="mt-2.5 space-y-0.5 text-[11px] text-[#D8D2E8]">
                      <div className="font-semibold text-white whitespace-nowrap truncate">
                        {sub.name}
                      </div>
                      <div
                        className="font-specs"
                        style={{ color: sub.accentHex }}
                      >
                        {sub.accentHex}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 01: Umbrella Architecture (Together vs Separate + Law Flow Conservative Rule) */}
      <section
        id="architecture"
        className="scroll-mt-24 mx-auto max-w-[1360px] px-6 py-16 lg:py-20 border-b border-[#220046]/10"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#220046]/10">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#220046]">
              {t.architecture.sectionTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#4A415C]">
              {t.architecture.sectionLead}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Umbrella display mode"
            className="inline-flex items-center gap-1 rounded-lg bg-[#EBE8F2] p-1 self-start"
          >
            <button
              type="button"
              role="tab"
              aria-selected={ecosystemMode === 'together'}
              onClick={() => setEcosystemMode('together')}
              className={`rounded-md px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                ecosystemMode === 'together'
                  ? 'bg-white text-[#220046] shadow-sm'
                  : 'text-[#524866] hover:text-[#220046]'
              }`}
            >
              {t.architecture.viewTogether}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={ecosystemMode === 'separate'}
              onClick={() => setEcosystemMode('separate')}
              className={`rounded-md px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                ecosystemMode === 'separate'
                  ? 'bg-white text-[#220046] shadow-sm'
                  : 'text-[#524866] hover:text-[#220046]'
              }`}
            >
              {t.architecture.viewSeparate}
            </button>
          </div>
        </div>

        {/* Interactive Lockup Showcase */}
        <div className="mt-10 rounded-xl border border-[#220046]/12 bg-[#220046] text-white p-6 sm:p-10">
          {ecosystemMode === 'together' ? (
            <div>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/15">
                <div className="flex items-center gap-6">
                  <img
                    src={flowGroup.masterJpgPath}
                    alt="Flow Group Umbrella"
                    className="h-14 sm:h-16 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div className="hidden sm:block h-10 w-px bg-white/20" aria-hidden="true" />
                  <p className="text-sm sm:text-base font-medium text-[#EAEAF4] max-w-sm">
                    {flowGroup.tagline[lang]}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => downloadJointUmbrellaPackage()}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-[#220046] hover:bg-[#EAEAF4] transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.architecture.downloadUmbrellaBtn}</span>
                </button>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {subBrands.map((brand) => (
                  <div
                    key={brand.id}
                    className="rounded-lg bg-[#16002E] p-4 transition-transform hover:-translate-y-0.5"
                    style={{ border: `1.5px solid ${brand.accentHex}` }}
                  >
                    <img
                      src={brand.masterJpgPath}
                      alt={brand.name}
                      className="w-full h-16 object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{brand.name}</span>
                      <span className="text-[#C6BEDA]">
                        {brand.positioningMode === 'conservative'
                          ? lang === 'pt'
                            ? 'Conservador'
                            : lang === 'fr'
                            ? 'Conservateur'
                            : lang === 'es'
                            ? 'Conservador'
                            : 'Conservative'
                          : lang === 'pt'
                          ? 'Disruptivo'
                          : lang === 'fr'
                          ? 'Disruptif'
                          : lang === 'es'
                          ? 'Disruptivo'
                          : 'Disruptive'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-[#D2CBE3] max-w-3xl">
                {t.architecture.togetherDesc}
              </p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subBrands.map((brand) => (
                  <div
                    key={brand.id}
                    className="rounded-xl border border-white/15 bg-[#16002E] p-6 flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium text-[#C6BEDA]">
                          {brand.roleTitle[lang]}
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-white">
                          {brand.name}
                        </h3>
                      </div>
                      <span
                        className="font-specs text-xs font-medium"
                        style={{ color: brand.accentHex }}
                      >
                        {brand.accentHex}
                      </span>
                    </div>
                    <div className="rounded-lg bg-[#220046] p-4 flex items-center justify-center">
                      <img
                        src={brand.masterJpgPath}
                        alt={brand.name}
                        className="h-20 w-auto object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="text-sm leading-relaxed text-[#DAD5E8]">
                      {brand.description[lang]}
                    </p>
                    <div className="text-xs text-[#B6AFCC] pt-2 border-t border-white/10">
                      {brand.voiceTone[lang]}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-[#D2CBE3] max-w-3xl">
                {t.architecture.separateDesc}
              </p>
            </div>
          )}
        </div>

        {/* Key Governance Pillars + Reference v1.2 Sheet */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="rounded-xl border border-[#220046]/12 bg-white p-6">
              <div className="flex items-center gap-2.5 text-[#220046]">
                <Layers className="h-4 w-4" aria-hidden="true" />
                <h3 className="text-base font-bold">{t.architecture.signatureRuleTitle}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#4A415C]">
                {t.architecture.signatureRuleBody}
              </p>
            </div>

            <div className="rounded-xl border border-[#C99A2E]/40 bg-[#FAF7F0] p-6">
              <div className="flex items-center gap-2.5 text-[#7A590C]">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                <h3 className="text-base font-bold">{t.architecture.lawExceptionTitle}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#3D3522]">
                {t.architecture.lawExceptionBody}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-xl border border-[#220046]/12 bg-white p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#220046]/10 text-xs text-[#5B526E]">
              <span className="font-semibold text-[#220046]">
                FLOW_GROUP_Brand_Book_v1.2 · Reference Sheet
              </span>
              <span>Aplicação das Marcas</span>
            </div>
            <img
              src={REFERENCE_SHEET_PATH}
              alt="Flow Group Brand Book v1.2 official reference sheet showing brand applications"
              className="mt-4 w-full h-auto rounded-lg object-cover border border-[#220046]/10"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </>
  );
}
