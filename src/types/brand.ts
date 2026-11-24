export type Language = 'pt' | 'en' | 'fr' | 'es';

export type BrandId =
  | 'flow-group'
  | 'ai-flow'
  | 'biz-flow'
  | 'law-flow'
  | 'personal-flow';

export type LogoTabMode = 'original' | 'black' | 'white' | 'adaptive';

export type VideoFormat = 'cinematic-16-9' | 'social-9-16';

export type SocialPlatform = 'instagram' | 'tiktok' | 'linkedin' | 'facebook';

export type AdaptiveBackgroundId =
  | 'deep-purple'
  | 'architectural-glass'
  | 'travertine-stone'
  | 'cobalt-gradient'
  | 'obsidian-slate';

export interface LocalizedText {
  pt: string;
  en: string;
  fr: string;
  es: string;
}

export interface BrandSpec {
  id: BrandId;
  name: string;
  prefix: string;
  suffix: string;
  hasSignatureSuffix?: boolean;
  subCaption?: string;
  accentHex: string;
  borderContrastHex: string;
  rgb: string;
  cmyk: string;
  pantone: string;
  positioningMode: 'disruptive' | 'conservative' | 'umbrella';
  masterJpgPath: string;
  masterDimensions: string;
  campaignImagePath: string;
  minDigitalPx: number;
  minPrintMm: number;
  compactMinDigitalPx: number;
  compactMinPrintMm: number;
  clearSpaceRatioX: number;
  tagline: LocalizedText;
  roleTitle: LocalizedText;
  description: LocalizedText;
  voiceTone: LocalizedText;
  campaignHeadline: LocalizedText;
  campaignSubcopy: LocalizedText;
  pomelliPrompt: string;
}

export interface ShareRecipient {
  id: string;
  channel: 'email' | 'whatsapp';
  name: string;
  contact: string;
}
