import { useState } from 'react';
import { ApplicationsMockups } from './components/ApplicationsMockups';
import { CampaignStudio } from './components/CampaignStudio';
import { ColorTypographyVoice } from './components/ColorTypographyVoice';
import { ConstructionClearSpace } from './components/ConstructionClearSpace';
import { HeaderNav } from './components/HeaderNav';
import { LogoSystemDAM } from './components/LogoSystemDAM';
import { ShareModal } from './components/ShareModal';
import { UmbrellaArchitecture } from './components/UmbrellaArchitecture';
import { TRANSLATIONS } from './data/translations';
import type { BrandId, Language } from './types/brand';

export default function App() {
  const [lang, setLang] = useState<Language>('pt');
  const [selectedBrand, setSelectedBrand] = useState<BrandId>('flow-group');
  const [shareOpen, setShareOpen] = useState(false);
  const [shareScope, setShareScope] = useState('');

  const t = TRANSLATIONS[lang];

  function openShareWithScope(scopeLabel: string) {
    setShareScope(scopeLabel);
    setShareOpen(true);
  }

  return (
    <div className="min-h-screen bg-[#F8F7FA] text-[#140F1D]">
      <HeaderNav
        t={t}
        onOpenShare={() => openShareWithScope(t.share.fullBrandBookScope)}
      />

      <main>
        <UmbrellaArchitecture
          lang={lang}
          onChangeLang={setLang}
          t={t}
          onSelectBrandForDam={setSelectedBrand}
        />

        <LogoSystemDAM
          lang={lang}
          t={t}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
          onShareAsset={openShareWithScope}
        />

        <ConstructionClearSpace
          t={t}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
        />

        <ColorTypographyVoice lang={lang} t={t} />

        <ApplicationsMockups
          lang={lang}
          t={t}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
        />

        <CampaignStudio
          lang={lang}
          t={t}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
          onShareAsset={openShareWithScope}
        />
      </main>

      <footer className="border-t border-[#220046]/10 bg-white">
        <div className="mx-auto max-w-[1360px] px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#5B526E]">
          <div>
            <span className="font-bold text-[#220046]">Flow Group</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>AI Flow · Biz Flow · Law Flow · Personal Flow</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => window.print()}
              className="font-semibold text-[#220046] hover:underline cursor-pointer"
            >
              Print / Save PDF
            </button>
            <button
              type="button"
              onClick={() => openShareWithScope(t.share.fullBrandBookScope)}
              className="font-semibold text-[#220046] hover:underline cursor-pointer"
            >
              {t.nav.share}
            </button>
          </div>
        </div>
      </footer>

      <ShareModal
        key={`${lang}-${shareScope}`}
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        t={t}
        initialScope={shareScope}
      />
    </div>
  );
}
