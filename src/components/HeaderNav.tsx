import { Share2 } from 'lucide-react';
import type { TranslationDictionary } from '../data/translations';

interface HeaderNavProps {
  t: TranslationDictionary;
  onOpenShare: () => void;
}

export function HeaderNav({ t, onOpenShare }: HeaderNavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#220046]/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single-line Brand Title */}
        <a
          href="#top"
          className="text-lg font-extrabold tracking-tight text-[#220046] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2E7DFF]"
        >
          Flow Group
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#3A314C]"
        >
          <a
            href="#architecture"
            className="hover:text-[#220046] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.architecture}
          </a>
          <a
            href="#dam"
            className="hover:text-[#220046] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.logos}
          </a>
          <a
            href="#rules"
            className="hover:text-[#220046] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.guidelines}
          </a>
          <a
            href="#applications"
            className="hover:text-[#220046] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.applications}
          </a>
          <a
            href="#campaigns"
            className="hover:text-[#220046] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.campaigns}
          </a>
        </nav>

        {/* Zone 3: Single primary CTA */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onOpenShare}
            className="inline-flex items-center gap-2 rounded-lg bg-[#220046] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#350B66] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7DFF] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.nav.share}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
