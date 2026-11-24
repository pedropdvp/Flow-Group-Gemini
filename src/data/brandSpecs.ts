import type { AdaptiveBackgroundId, BrandId, BrandSpec } from '../types/brand';

export const CORE_BRAND_COLORS = {
  deepPurple: '#220046',
  deepPurpleDark: '#14002B',
  platinum: '#EAEAF4',
  inkBlack: '#0A0A0C',
  pureWhite: '#FFFFFF',
  obsidianSlate: '#181422',
} as const;

export const REFERENCE_SHEET_PATH =
  '/assets/aistudio/Aplica__o_das_Marcas_back_roxo_profundo_6a173634.png';

export const MOCKUP_VEHICLE_OOH_PATH =
  '/src/assets/images/mockup_vehicle_ooh_1795526924943.jpg';

export const BRAND_SPECS: BrandSpec[] = [
  {
    id: 'flow-group',
    name: 'Flow Group',
    prefix: 'Flow',
    suffix: 'Group',
    hasSignatureSuffix: true,
    accentHex: '#EAEAF4',
    borderContrastHex: '#2E7DFF',
    rgb: '234, 234, 244',
    cmyk: '6, 5, 0, 4',
    pantone: 'Cool Gray 1 C',
    positioningMode: 'umbrella',
    masterJpgPath:
      '/assets/aistudio/FLOW_GROUP_HI_RES_PLATINUM_8192x2728_back_roxo_profundo_d54e6661.jpg',
    masterDimensions: '8192 × 2728 px',
    campaignImagePath: '/src/assets/images/campaign_flow_group_1795526923121.jpg',
    minDigitalPx: 140,
    minPrintMm: 35,
    compactMinDigitalPx: 72,
    compactMinPrintMm: 18,
    clearSpaceRatioX: 1,
    tagline: {
      pt: 'Um Grupo. Quatro Dimensões. Possibilidades Infinitas.',
      en: 'One Group. Four Dimensions. Infinite Possibilities.',
      fr: 'Un Groupe. Quatre Dimensions. Possibilités Infinites.',
      es: 'Un Grupo. Cuatro Dimensiones. Posibilidades Infinitas.',
    },
    roleTitle: {
      pt: 'Marca-Chuva Institucional (Umbrella)',
      en: 'Institutional Umbrella Brand',
      fr: 'Marque Ombrelle Institutionnelle',
      es: 'Marca Paraguas Institucional',
    },
    description: {
      pt: 'A marca-mãe que consolida o ecossistema Flow. "Flow" em geométrica de alto impacto acompanhada pela assinatura manuscrita "Group", símbolo de autoria executiva e visão integrada.',
      en: 'The parent mark unifying the Flow ecosystem. Geometric "Flow" paired with the bespoke handwritten "Group" signature, expressing executive authorship and integrated vision.',
      fr: 'La marque mère qui unifie l’écosystème Flow. « Flow » en géométrique affirmé associé à la signature manuscrite « Group », gage d’autorité exécutive.',
      es: 'La marca matriz que unifica el ecosistema Flow. "Flow" en geométrica sólida junto a la firma manuscrita "Group", símbolo de autoría ejecutiva.',
    },
    voiceTone: {
      pt: 'Visionário, agregador e arquitetural. Lidera pelo rigor estratégico e une inovação disruptiva com solidez jurídica.',
      en: 'Visionary, unifying, and architectural. Leads with strategic rigor, bridging disruptive innovation and legal solidity.',
      fr: 'Visionnaire, fédérateur et architectural. Dirige par la rigueur stratégique entre rupture technologique et solidité juridique.',
      es: 'Visionario, integrador y arquitectónico. Lidera con rigor estratégico uniendo disrupción tecnológica y solidez jurídica.',
    },
    campaignHeadline: {
      pt: 'Um Grupo. Quatro Dimensões.',
      en: 'One Group. Four Dimensions.',
      fr: 'Un Groupe. Quatre Dimensions.',
      es: 'Un Grupo. Cuatro Dimensiones.',
    },
    campaignSubcopy: {
      pt: 'Inteligência, estratégia, direito e desenvolvimento humano alinhados numa arquitetura única.',
      en: 'Intelligence, strategy, law, and human potential aligned under one unified architecture.',
      fr: 'Intelligence, stratégie, droit et potentiel humain alignés sous une architecture unique.',
      es: 'Inteligencia, estrategia, derecho y potencial humano alineados bajo una arquitectura única.',
    },
    pomelliPrompt:
      'Ultra-clean European architectural glass atrium at twilight, deep violet #220046 ambient light, platinum linear reflections, minimalist luxury consulting brand campaign for Flow Group, subtle motion, headline "One Group. Four Dimensions."',
  },
  {
    id: 'ai-flow',
    name: 'AI Flow',
    prefix: 'AI',
    suffix: 'Flow',
    subCaption: 'WITH U',
    accentHex: '#2E7DFF',
    borderContrastHex: '#2E7DFF',
    rgb: '46, 125, 255',
    cmyk: '78, 48, 0, 0',
    pantone: '2727 C',
    positioningMode: 'disruptive',
    masterJpgPath:
      '/assets/aistudio/AI_Flow_HI_RES_ALIGNED_8192x3276_back_roxo_profundo_85960b33.jpg',
    masterDimensions: '8192 × 3276 px',
    campaignImagePath: '/src/assets/images/campaign_ai_flow_1795526923086.jpg',
    minDigitalPx: 120,
    minPrintMm: 30,
    compactMinDigitalPx: 36,
    compactMinPrintMm: 10,
    clearSpaceRatioX: 1,
    tagline: {
      pt: 'Inteligência sem Limites.',
      en: 'Intelligence without Limits.',
      fr: 'L’Intelligence sans Limites.',
      es: 'Inteligencia sin Límites.',
    },
    roleTitle: {
      pt: 'Inteligência Artificial & Automação Disruptiva',
      en: 'Artificial Intelligence & Disruptive Automation',
      fr: 'Intelligence Artificielle & Automatisation',
      es: 'Inteligencia Artificial y Automatización Disruptiva',
    },
    description: {
      pt: 'Unidade tecnológica de vanguarda dedicada a sistemas autónomos, modelos generativos e engenharia cognitiva. Linguagem visual cinética, veloz e elétrica.',
      en: 'Vanguard technology division focused on autonomous systems, generative models, and cognitive engineering. Kinetic, high-velocity electric visual language.',
      fr: 'Pôle technologique d’avant-garde dédié aux systèmes autonomes et à l’ingénierie cognitive. Langage visuel cinétique et électrique.',
      es: 'División tecnológica de vanguardia dedicada a sistemas autónomos e ingeniería cognitiva. Lenguaje visual cinético y eléctrico.',
    },
    voiceTone: {
      pt: 'Disruptivo, direto e prospectivo. Frases curtas orientadas para futuro imediato e capacidade exponencial.',
      en: 'Disruptive, crisp, and forward-looking. Short sentences centered on immediate future impact and exponential capability.',
      fr: 'Disruptif, direct et prospectif. Phrases courtes orientées vers l’impact immédiat et l’accélération.',
      es: 'Disruptivo, directo y prospectivo. Frases cortas centradas en el impacto futuro inmediato.',
    },
    campaignHeadline: {
      pt: 'Inteligência em Movimento.',
      en: 'Intelligence in Motion.',
      fr: 'L’Intelligence en Mouvement.',
      es: 'Inteligencia en Movimiento.',
    },
    campaignSubcopy: {
      pt: 'Pense além. Flua além com arquiteturas de IA concebidas para escalar decisões.',
      en: 'Think beyond. Flow beyond with AI architectures engineered to scale decisions.',
      fr: 'Pensez au-delà. Passez à l’échelle avec des architectures IA pensées pour décider.',
      es: 'Piensa más allá. Fluye más allá con arquitecturas de IA diseñadas para escalar decisiones.',
    },
    pomelliPrompt:
      'Disruptive B2B tech reel for AI Flow, deep purple #220046 background with cobalt #2E7DFF light beams refracting through prism glass, fast 120bpm kinetic typography, CTA "Intelligence in Motion."',
  },
  {
    id: 'biz-flow',
    name: 'Biz Flow',
    prefix: 'Biz',
    suffix: 'Flow',
    subCaption: 'WITH U',
    accentHex: '#00C896',
    borderContrastHex: '#00C896',
    rgb: '0, 200, 150',
    cmyk: '76, 0, 52, 0',
    pantone: '3395 C',
    positioningMode: 'disruptive',
    masterJpgPath:
      '/assets/aistudio/BIZ_Flow_HI_RES_ALIGNED_8192x3276_back_roxo_profundo_15ac2c5c.jpg',
    masterDimensions: '8192 × 3276 px',
    campaignImagePath: '/src/assets/images/campaign_biz_flow_1795526924630.jpg',
    minDigitalPx: 120,
    minPrintMm: 30,
    compactMinDigitalPx: 36,
    compactMinPrintMm: 10,
    clearSpaceRatioX: 1,
    tagline: {
      pt: 'Negócios em Movimento.',
      en: 'Business in Motion.',
      fr: 'L’Entreprise en Mouvement.',
      es: 'Negocios en Movimiento.',
    },
    roleTitle: {
      pt: 'Estratégia Corporativa & Transformação Empresarial',
      en: 'Corporate Strategy & Business Transformation',
      fr: 'Stratégie d’Entreprise & Transformation',
      es: 'Estrategia Corporativa y Transformación',
    },
    description: {
      pt: 'Consultoria de gestão, aceleração operacional e redesenho de modelos de receita. O verde esmeralda ciano sinaliza tração, liquidez e crescimento mensurável.',
      en: 'Management consulting, operational acceleration, and revenue redesign. Emerald-teal signals traction, liquidity, and measurable enterprise growth.',
      fr: 'Conseil en management, accélération opérationnelle et refonte de croissance. Le turquoise émeraude exprime traction et agilité.',
      es: 'Consultoría de gestión, aceleración operativa y rediseño de ingresos. El verde esmeralda simboliza tracción y crecimiento.',
    },
    voiceTone: {
      pt: 'Ágil, pragmático e transformador. Foco em resultados tangíveis, velocidade de execução e vantagem competitiva.',
      en: 'Agile, pragmatic, and transformative. Focused on tangible outcomes, execution speed, and competitive edge.',
      fr: 'Agile, pragmatique et transformateur. Orienté résultats tangibles et exécution rapide.',
      es: 'Ágil, pragmático y transformador. Enfocado en resultados tangibles y velocidad de ejecución.',
    },
    campaignHeadline: {
      pt: 'Transforme Estratégia em Tração.',
      en: 'Business in Motion.',
      fr: 'Transformez la Stratégie en Croissance.',
      es: 'Negocios en Movimiento.',
    },
    campaignSubcopy: {
      pt: 'Convertemos complexidade operacional em oportunidades concretas de crescimento.',
      en: 'Transforming operational complexity into measurable business opportunity.',
      fr: 'Transformer la complexité opérationnelle en opportunités concrètes.',
      es: 'Transformamos la complejidad operativa en oportunidades concretas de negocio.',
    },
    pomelliPrompt:
      'High-impact corporate consulting social campaign for Biz Flow, sleek financial towers at dusk with emerald teal #00C896 reflections, electric fleet vehicle wrap showcase, dynamic motion lines.',
  },
  {
    id: 'law-flow',
    name: 'Law Flow',
    prefix: 'Law',
    suffix: 'Flow',
    subCaption: 'WITH U',
    accentHex: '#C99A2E',
    borderContrastHex: '#C99A2E',
    rgb: '201, 154, 46',
    cmyk: '20, 38, 88, 6',
    pantone: '7556 C',
    positioningMode: 'conservative',
    masterJpgPath:
      '/assets/aistudio/Law_FLOW_HI_RES_ALIGNED_8192x3276_back_roxo_profundo_44f2ee11.jpg',
    masterDimensions: '8192 × 3276 px',
    campaignImagePath: '/src/assets/images/campaign_law_flow_1795526924226.jpg',
    minDigitalPx: 130,
    minPrintMm: 32,
    compactMinDigitalPx: 40,
    compactMinPrintMm: 11,
    clearSpaceRatioX: 1.25,
    tagline: {
      pt: 'Confiança. Clareza. Rigor.',
      en: 'Confidence. Clarity.',
      fr: 'Confiance. Clarté.',
      es: 'Confianza. Claridad.',
    },
    roleTitle: {
      pt: 'Assessoria Jurídica & Conformidade Institucional (Regime Conservador)',
      en: 'Legal Advisory & Institutional Compliance (Conservative Standard)',
      fr: 'Conseil Juridique & Conformité (Standard Conservateur)',
      es: 'Asesoría Jurídica y Cumplimiento (Estándar Conservador)',
    },
    description: {
      pt: 'Exceção deliberada ao código disruptivo do grupo: o Law Flow exige sobriedade clássica, ritmo pausado, margens amplas (+25% de respiração) e autoridade intemporal em ouro soberano.',
      en: 'Deliberate exception to the group’s disruptive tone: Law Flow mandates classical sobriety, measured pacing, generous margins (+25% clear space), and timeless sovereign gold authority.',
      fr: 'Exception assumée au code disruptif du groupe : Law Flow impose sobriété classique, rythme posé, marges accrues (+25 %) et or souverain.',
      es: 'Excepción deliberada al tono disruptivo del grupo: Law Flow exige sobriedad clásica, ritmo pausado, márgenes amplios (+25 %) y oro soberano.',
    },
    voiceTone: {
      pt: 'Conservador, preciso e sereno. Sem gíria tecnológica nem hipérboles; prioriza segurança jurídica, clareza contratual e prestígio.',
      en: 'Conservative, precise, and composed. Free of tech hype; prioritizes legal certainty, contractual clarity, and enduring prestige.',
      fr: 'Conservateur, précis et serein. Sans jargon technologique ; privilégie la sécurité juridique et la clarté.',
      es: 'Conservador, preciso y sereno. Sin hipérboles tecnológicas; prioriza seguridad jurídica y prestigio.',
    },
    campaignHeadline: {
      pt: 'Confiança. Clareza.',
      en: 'Confidence. Clarity.',
      fr: 'Confiance. Clarté.',
      es: 'Confianza. Claridad.',
    },
    campaignSubcopy: {
      pt: 'Rigor jurídico que protege decisões estratégicas e gera confiança duradoura.',
      en: 'Legal expertise that safeguards strategic decisions and builds lasting confidence.',
      fr: 'L’expertise juridique qui sécurise vos décisions et bâtit une confiance durable.',
      es: 'Rigor jurídico que protege decisiones estratégicas y construye confianza duradera.',
    },
    pomelliPrompt:
      'Conservative luxury legal firm campaign for Law Flow, warm travertine marble colonnade and dark walnut executive library, sovereign gold #C99A2E architectural light, slow dignified camera pan, zero neon effects.',
  },
  {
    id: 'personal-flow',
    name: 'Personal Flow',
    prefix: 'Personal',
    suffix: 'Flow',
    subCaption: 'WITH U',
    accentHex: '#84A97E',
    borderContrastHex: '#84A97E',
    rgb: '132, 169, 126',
    cmyk: '50, 18, 56, 2',
    pantone: '556 C',
    positioningMode: 'disruptive',
    masterJpgPath:
      '/assets/aistudio/PERSONAL_FLOW_HI_RES_ALIGNED_8192x3276_back_roxo_profundo_6735881a.jpg',
    masterDimensions: '8192 × 3276 px',
    campaignImagePath: '/src/assets/images/campaign_personal_flow_1795526924966.jpg',
    minDigitalPx: 120,
    minPrintMm: 30,
    compactMinDigitalPx: 36,
    compactMinPrintMm: 10,
    clearSpaceRatioX: 1,
    tagline: {
      pt: 'A Sua Vida, o Seu Ritmo.',
      en: 'Your Life, Your Flow.',
      fr: 'Votre Vie, Votre Rythme.',
      es: 'Tu Vida, Tu Ritmo.',
    },
    roleTitle: {
      pt: 'Desenvolvimento Humano, Liderança & Bem-Estar Executivo',
      en: 'Human Development, Leadership & Executive Wellbeing',
      fr: 'Développement Humain & Leadership',
      es: 'Desarrollo Humano y Liderazgo Ejecutivo',
    },
    description: {
      pt: 'Dimensão centrada nas pessoas: mentoria executiva, clareza de propósito e equilíbrio sustentável. O verde sálvia botânico traduz serenidade ativa e renovação.',
      en: 'People-centered dimension dedicated to executive mentorship, clarity of purpose, and sustainable performance. Botanical sage green conveys active serenity and renewal.',
      fr: 'Dimension humaine dédiée au mentorat exécutif et à l’équilibre durable. Le vert sauge botanique exprime sérénité et renouveau.',
      es: 'Dimensión centrada en las personas: mentoría ejecutiva y equilibrio sostenible. El verde salvia transmite serenidad activa.',
    },
    voiceTone: {
      pt: 'Empático, inspirador e luminoso. Convida à ação consciente, autonomia pessoal e evolução contínua.',
      en: 'Empathetic, inspiring, and luminous. Invites conscious action, personal autonomy, and continuous growth.',
      fr: 'Empathique, inspirant et lumineux. Invite à l’action consciente et à l’évolution personnelle.',
      es: 'Empático, inspirador y luminoso. Invita a la acción consciente y evolución continua.',
    },
    campaignHeadline: {
      pt: 'Encontre o Seu Ritmo.',
      en: 'Your Life, Your Flow.',
      fr: 'Trouvez Votre Rythme.',
      es: 'Encuentra Tu Ritmo.',
    },
    campaignSubcopy: {
      pt: 'Clareza pessoal e liderança consciente para desenhar o próximo capítulo.',
      en: 'Find your rhythm. Create your future with mindful executive clarity.',
      fr: 'Trouvez votre rythme pour dessiner votre avenir avec clarté.',
      es: 'Encuentra tu ritmo y diseña tu futuro con claridad ejecutiva.',
    },
    pomelliPrompt:
      'Minimalist sunrise coastal architectural terrace editorial campaign for Personal Flow, botanical sage green #84A97E and warm violet atmosphere, serene human-centered lifestyle commercial.',
  },
];

export const BRAND_MAP: Record<BrandId, BrandSpec> = BRAND_SPECS.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<BrandId, BrandSpec>
);

export interface AdaptiveBackgroundPreset {
  id: AdaptiveBackgroundId;
  label: { pt: string; en: string; fr: string; es: string };
  cssBackground: string;
  backdropImage?: string;
  plateFillHex: string;
  isLightSurface: boolean;
  recommendedTextHex: string;
}

export const ADAPTIVE_BACKGROUNDS: AdaptiveBackgroundPreset[] = [
  {
    id: 'deep-purple',
    label: {
      pt: 'Roxo Profundo Oficial',
      en: 'Official Deep Purple',
      fr: 'Violet Profond Officiel',
      es: 'Púrpura Profundo Oficial',
    },
    cssBackground: '#220046',
    plateFillHex: 'rgba(20, 0, 43, 0.88)',
    isLightSurface: false,
    recommendedTextHex: '#FFFFFF',
  },
  {
    id: 'architectural-glass',
    label: {
      pt: 'Fotografia Arquitetura',
      en: 'Architectural Photo',
      fr: 'Photo Architecture',
      es: 'Fotografía Arquitectura',
    },
    cssBackground: '#101829',
    backdropImage: '/src/assets/images/campaign_biz_flow_1795526924630.jpg',
    plateFillHex: 'rgba(14, 10, 28, 0.84)',
    isLightSurface: false,
    recommendedTextHex: '#FFFFFF',
  },
  {
    id: 'travertine-stone',
    label: {
      pt: 'Mármore Travertino (Claro)',
      en: 'Travertine Stone (Light)',
      fr: 'Travertin Clair',
      es: 'Mármol Travertino (Claro)',
    },
    cssBackground: '#E6DFD3',
    backdropImage: '/src/assets/images/campaign_law_flow_1795526924226.jpg',
    plateFillHex: 'rgba(22, 12, 36, 0.90)',
    isLightSurface: true,
    recommendedTextHex: '#FFFFFF',
  },
  {
    id: 'cobalt-gradient',
    label: {
      pt: 'Gradiente Cobalto Vibrante',
      en: 'Vibrant Cobalt Gradient',
      fr: 'Dégradé Cobalt Vibrant',
      es: 'Degradado Cobalto Vibrante',
    },
    cssBackground: 'linear-gradient(135deg, #0D2B7A 0%, #2E7DFF 100%)',
    plateFillHex: 'rgba(13, 18, 42, 0.86)',
    isLightSurface: false,
    recommendedTextHex: '#FFFFFF',
  },
  {
    id: 'obsidian-slate',
    label: {
      pt: 'Obsidiana & Luz Costeira',
      en: 'Obsidian & Coastal Light',
      fr: 'Obsidienne & Lumière',
      es: 'Obsidiana y Luz Costera',
    },
    cssBackground: '#141418',
    backdropImage: '/src/assets/images/campaign_personal_flow_1795526924966.jpg',
    plateFillHex: 'rgba(18, 14, 28, 0.84)',
    isLightSurface: false,
    recommendedTextHex: '#FFFFFF',
  },
];
