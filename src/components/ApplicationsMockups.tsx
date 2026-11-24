import { useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import {
  BRAND_MAP,
  BRAND_SPECS,
  MOCKUP_VEHICLE_OOH_PATH,
} from '../data/brandSpecs';
import type { TranslationDictionary } from '../data/translations';
import type { BrandId, Language } from '../types/brand';
import { downloadApplicationMockupPng } from '../utils/logoExporter';

interface ApplicationsMockupsProps {
  lang: Language;
  t: TranslationDictionary;
  selectedBrand: BrandId;
  onSelectBrand: (brand: BrandId) => void;
}

export function ApplicationsMockups({
  lang,
  t,
  selectedBrand,
  onSelectBrand,
}: ApplicationsMockupsProps) {
  const [copiedSig, setCopiedSig] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const brand = BRAND_MAP[selectedBrand];
  const lawBrand = BRAND_MAP['law-flow'];

  async function handleDownload(kind: 'ooh' | 'fleet' | 'reception') {
    setDownloading(kind);
    try {
      await downloadApplicationMockupPng(
        kind,
        kind === 'reception' ? 'law-flow' : selectedBrand,
        lang
      );
    } finally {
      setDownloading(null);
    }
  }

  function handleCopySignature() {
    const html = `<table cellpadding="0" cellspacing="0" style="font-family:Montserrat,Arial,sans-serif;border-left:3px solid ${brand.accentHex};padding-left:14px;"><tr><td style="font-size:15px;font-weight:700;color:#220046;">${brand.name}</td></tr><tr><td style="font-size:12px;color:#4A415C;padding-top:2px;">${brand.roleTitle[lang]}</td></tr><tr><td style="font-size:11px;color:#220046;font-weight:600;padding-top:6px;">Flow Group · ${brand.tagline[lang]}</td></tr></table>`;
    navigator.clipboard?.writeText(html);
    setCopiedSig(true);
    setTimeout(() => setCopiedSig(false), 2000);
  }

  return (
    <section
      id="applications"
      className="scroll-mt-24 mx-auto max-w-[1360px] px-6 py-16 lg:py-20 border-b border-[#220046]/10"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#220046]/10">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#220046]">
            {t.applications.sectionTitle}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#4A415C]">
            {t.applications.sectionLead}
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

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. OOH Billboard */}
        <article className="rounded-xl border border-[#220046]/12 bg-white overflow-hidden flex flex-col justify-between">
          <div className="relative h-64 sm:h-72 overflow-hidden bg-[#14002B]">
            <img
              src={brand.campaignImagePath}
              alt={`${brand.name} Outdoor Billboard`}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14002B]/90 via-[#14002B]/35 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
              <div
                className="rounded-xl bg-[#180036]/92 px-4 py-3 backdrop-blur-sm max-w-[230px]"
                style={{ border: `2px solid ${brand.borderContrastHex}` }}
              >
                <img
                  src={brand.masterJpgPath}
                  alt={brand.name}
                  className="h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-right text-sm sm:text-base font-bold text-white max-w-[220px]">
                {brand.campaignHeadline[lang]}
              </p>
            </div>
          </div>
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[#220046]">
                {t.applications.oohTitle}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#4A415C]">
                {t.applications.oohDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleDownload('ooh')}
              disabled={downloading === 'ooh'}
              className="inline-flex items-center gap-2 rounded-lg bg-[#220046] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#350B66] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.applications.downloadTemplate}</span>
            </button>
          </div>
        </article>

        {/* 2. Executive Fleet Vehicle Wrap */}
        <article className="rounded-xl border border-[#220046]/12 bg-white overflow-hidden flex flex-col justify-between">
          <div className="relative h-64 sm:h-72 overflow-hidden bg-[#14002B]">
            <img
              src={MOCKUP_VEHICLE_OOH_PATH}
              alt={`${brand.name} Executive Fleet Vehicle`}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14002B]/85 via-transparent to-transparent" />
            <div
              className="absolute top-5 left-5 rounded-lg bg-[#14002B]/90 px-4 py-2.5 backdrop-blur-sm"
              style={{ border: `2px solid ${brand.borderContrastHex}` }}
            >
              <img
                src={brand.masterJpgPath}
                alt={`${brand.name} vehicle decal`}
                className="h-9 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[#220046]">
                {t.applications.fleetTitle}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#4A415C]">
                {t.applications.fleetDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleDownload('fleet')}
              disabled={downloading === 'fleet'}
              className="inline-flex items-center gap-2 rounded-lg bg-[#220046] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#350B66] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.applications.downloadTemplate}</span>
            </button>
          </div>
        </article>

        {/* 3. Law Flow Conservative Reception Signage */}
        <article className="rounded-xl border border-[#C99A2E]/35 bg-[#FAF7F0] overflow-hidden flex flex-col justify-between">
          <div className="relative h-64 sm:h-72 overflow-hidden bg-[#1D160C]">
            <img
              src={lawBrand.campaignImagePath}
              alt="Law Flow architectural stone and walnut signage"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181209]/90 via-[#181209]/35 to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-lg border border-[#C99A2E] bg-[#1D160C]/92 px-5 py-3">
              <img
                src={lawBrand.masterJpgPath}
                alt="Law Flow official brass signage"
                className="h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[#3D3010]">
                {t.applications.receptionTitle}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#4F4328]">
                {t.applications.receptionDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleDownload('reception')}
              disabled={downloading === 'reception'}
              className="inline-flex items-center gap-2 rounded-lg bg-[#7A590C] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#5E4306] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.applications.downloadTemplate}</span>
            </button>
          </div>
        </article>

        {/* 4. Email Signature & NFC Card Preview */}
        <article className="rounded-xl border border-[#220046]/12 bg-white p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#220046]">
              {t.applications.signatureTitle}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[#4A415C]">
              {t.applications.signatureDesc}
            </p>

            {/* Realistic Email Signature Card */}
            <div className="mt-6 rounded-xl border border-[#220046]/12 bg-[#F8F7FA] p-6">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#220046]/10">
                <div className="rounded-md bg-[#220046] px-3 py-2">
                  <img
                    src={brand.masterJpgPath}
                    alt={brand.name}
                    className="h-8 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span
                  className="font-specs text-xs font-semibold"
                  style={{ color: brand.id === 'flow-group' ? '#220046' : brand.accentHex }}
                >
                  NFC · VCard 4.0
                </span>
              </div>
              <div className="mt-4 space-y-1">
                <div className="text-sm font-bold text-[#220046]">
                  Dr. Mariana Vasconcelos
                </div>
                <div className="text-xs text-[#4A415C]">
                  Managing Partner · {brand.name}
                </div>
                <div className="pt-2 text-xs font-medium text-[#220046]">
                  Flow Group · {brand.tagline[lang]}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleCopySignature}
              className="inline-flex items-center gap-2 rounded-lg border border-[#220046]/20 bg-white px-4 py-2.5 text-xs font-semibold text-[#220046] hover:bg-[#F3F0F9] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedSig ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                  <span>{t.applications.copiedSignature}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.applications.copyHtmlSignature}</span>
                </>
              )}
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
