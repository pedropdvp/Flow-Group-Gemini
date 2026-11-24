import { useState } from 'react';
import { AlertTriangle, Ban, CheckCircle2, Ruler } from 'lucide-react';
import { BRAND_MAP, BRAND_SPECS } from '../data/brandSpecs';
import type { TranslationDictionary } from '../data/translations';
import type { BrandId } from '../types/brand';
import { computeClearSpaceMetrics, validateMinimumSize } from '../utils/brandRules';

interface ConstructionClearSpaceProps {
  t: TranslationDictionary;
  selectedBrand: BrandId;
  onSelectBrand: (brand: BrandId) => void;
}

export function ConstructionClearSpace({
  t,
  selectedBrand,
  onSelectBrand,
}: ConstructionClearSpaceProps) {
  const [simulatedWidth, setSimulatedWidth] = useState<number>(180);
  const brand = BRAND_MAP[selectedBrand];

  const metrics = computeClearSpaceMetrics(260, 92, brand.clearSpaceRatioX);
  const compliance = validateMinimumSize(brand, simulatedWidth);

  return (
    <section
      id="rules"
      className="scroll-mt-24 mx-auto max-w-[1360px] px-6 py-16 lg:py-20 border-b border-[#220046]/10"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#220046]/10">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#220046]">
            {t.rules.sectionTitle}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#4A415C]">
            {t.rules.sectionLead}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1 rounded-lg bg-[#EBE8F2] p-1 self-start">
          {BRAND_SPECS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectBrand(item.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedBrand === item.id
                  ? 'bg-white text-[#220046] shadow-sm'
                  : 'text-[#524866] hover:text-[#220046]'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Clear Space Blueprint */}
        <div className="lg:col-span-6 rounded-xl border border-[#220046]/12 bg-white p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-[#220046]">
                {t.rules.clearSpaceTitle}
              </h3>
              <span className="font-specs text-xs font-medium text-[#220046]">
                {brand.clearSpaceRatioX}X Perimeter
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#4A415C]">
              {t.rules.clearSpaceBody}
            </p>
          </div>

          <div className="my-8 flex items-center justify-center">
            <div
              className="relative rounded-lg border border-dashed border-[#2E7DFF] bg-[#220046] transition-all"
              style={{
                padding: `${Math.round(metrics.marginPx * 0.72)}px`,
              }}
            >
              {/* X-height markers */}
              <span className="absolute top-1.5 left-1/2 -translate-x-1/2 font-specs text-[10px] text-[#8CB8FF]">
                {brand.clearSpaceRatioX}X
              </span>
              <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 font-specs text-[10px] text-[#8CB8FF]">
                {brand.clearSpaceRatioX}X
              </span>
              <span className="absolute left-1.5 top-1/2 -translate-y-1/2 font-specs text-[10px] text-[#8CB8FF]">
                {brand.clearSpaceRatioX}X
              </span>
              <span className="absolute right-1.5 top-1/2 -translate-y-1/2 font-specs text-[10px] text-[#8CB8FF]">
                {brand.clearSpaceRatioX}X
              </span>

              <div className="border border-white/25 p-2">
                <img
                  src={brand.masterJpgPath}
                  alt={`${brand.name} clear space diagram`}
                  className="h-20 sm:h-24 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-[#220046]/10 pt-4 text-xs">
            <div>
              <span className="block text-[#6E6482]">Unit X (Cap F)</span>
              <span className="font-specs font-semibold text-[#220046]">
                {metrics.unitXPx} px eq.
              </span>
            </div>
            <div>
              <span className="block text-[#6E6482]">Min Digital</span>
              <span className="font-specs font-semibold text-[#220046]">
                {brand.minDigitalPx} px
              </span>
            </div>
            <div>
              <span className="block text-[#6E6482]">Min Print</span>
              <span className="font-specs font-semibold text-[#220046]">
                {brand.minPrintMm} mm
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Minimum Size Simulator */}
        <div className="lg:col-span-6 rounded-xl border border-[#220046]/12 bg-white p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-[#220046]">
                {t.rules.minSizeTitle}
              </h3>
              <Ruler className="h-4 w-4 text-[#220046]" aria-hidden="true" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#4A415C]">
              {t.rules.minSizeBody}
            </p>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <label htmlFor="min-size-slider" className="font-semibold text-[#220046]">
                  {t.rules.testWidthLabel}
                </label>
                <span className="font-specs font-semibold text-[#220046]">
                  {simulatedWidth} px · {compliance.estimatedPrintMm} mm
                </span>
              </div>
              <input
                id="min-size-slider"
                type="range"
                min={28}
                max={320}
                step={2}
                value={simulatedWidth}
                onChange={(e) => setSimulatedWidth(Number(e.target.value))}
                className="w-full accent-[#220046] cursor-pointer"
              />
            </div>
          </div>

          <div className="my-6 rounded-lg bg-[#220046] p-6 flex items-center justify-center min-h-[140px]">
            <img
              src={brand.masterJpgPath}
              alt={`${brand.name} scaled preview`}
              style={{ width: `${simulatedWidth}px` }}
              className="h-auto object-contain transition-all duration-150"
              referrerPolicy="no-referrer"
            />
          </div>

          <div
            className={`rounded-lg border px-4 py-3 flex items-center gap-3 text-xs font-semibold ${
              compliance.status === 'primary-ok'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                : compliance.status === 'compact-required'
                ? 'border-amber-200 bg-amber-50 text-amber-900'
                : 'border-rose-200 bg-rose-50 text-rose-900'
            }`}
          >
            {compliance.status === 'primary-ok' ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            ) : compliance.status === 'compact-required' ? (
              <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
            ) : (
              <Ban className="h-4 w-4 shrink-0" aria-hidden="true" />
            )}
            <span>
              {compliance.status === 'primary-ok'
                ? t.rules.statusPrimaryOk
                : compliance.status === 'compact-required'
                ? `${t.rules.statusCompactRequired} (≥ ${brand.compactMinDigitalPx}px / ${brand.compactMinPrintMm}mm)`
                : `${t.rules.statusBelowMin} (< ${brand.compactMinDigitalPx}px)`}
            </span>
          </div>
        </div>
      </div>

      {/* Prohibited Usage Grid */}
      <div className="mt-10">
        <h3 className="text-lg font-bold text-[#220046] mb-5">{t.rules.dontsTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="rounded-xl border border-rose-200 bg-white p-5">
            <div className="rounded-lg bg-[#220046] h-24 flex items-center justify-center px-4">
              <span className="text-lg font-bold text-white tracking-normal">
                Flow <span className="font-normal">GROUP</span>
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#4A415C]">
              {t.rules.dont1}
            </p>
          </div>

          <div className="rounded-xl border border-rose-200 bg-white p-5">
            <div className="rounded-lg bg-[#220046] h-24 flex items-center justify-center px-4 overflow-hidden">
              <img
                src={BRAND_MAP['ai-flow'].masterJpgPath}
                alt="Distorted example"
                className="h-14 w-auto scale-x-150 -skew-x-12 opacity-90"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#4A415C]">
              {t.rules.dont2}
            </p>
          </div>

          <div className="rounded-xl border border-rose-200 bg-white p-5">
            <div className="rounded-lg bg-[#F5F1E6] h-24 flex items-center justify-center px-4">
              <span className="text-lg font-bold text-[#D9BE7B]">Law Flow</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#4A415C]">
              {t.rules.dont3}
            </p>
          </div>

          <div className="rounded-xl border border-rose-200 bg-white p-5">
            <div className="rounded-lg bg-[#220046] h-24 flex items-center justify-center px-4">
              <span className="text-lg font-bold text-[#00C896]">
                Law <span className="text-white">Flow</span>
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#4A415C]">
              {t.rules.dont4}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
