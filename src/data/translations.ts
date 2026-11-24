import type { Language } from '../types/brand';

export interface TranslationDictionary {
  nav: {
    architecture: string;
    logos: string;
    guidelines: string;
    applications: string;
    campaigns: string;
    share: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    languageLabel: string;
    signatureNote: string;
  };
  architecture: {
    sectionTitle: string;
    sectionLead: string;
    viewTogether: string;
    viewSeparate: string;
    togetherDesc: string;
    separateDesc: string;
    signatureRuleTitle: string;
    signatureRuleBody: string;
    lawExceptionTitle: string;
    lawExceptionBody: string;
    downloadUmbrellaBtn: string;
  };
  dam: {
    sectionTitle: string;
    sectionLead: string;
    selectBrand: string;
    tabOriginal: string;
    tabBlack: string;
    tabWhite: string;
    tabAdaptive: string;
    originalDesc: string;
    blackDesc: string;
    whiteDesc: string;
    adaptiveDesc: string;
    downloadPngTransparent: string;
    downloadJpgWhite: string;
    downloadJpgBlack: string;
    downloadJpgMaster: string;
    downloadSvgVector: string;
    downloadAdaptivePng: string;
    downloadFullZip: string;
    backgroundSelector: string;
    borderStyleLabel: string;
    borderFrameOption: string;
    borderSolidPlateOption: string;
    contrastBadgeText: string;
    preparingDownload: string;
  };
  rules: {
    sectionTitle: string;
    sectionLead: string;
    clearSpaceTitle: string;
    clearSpaceBody: string;
    minSizeTitle: string;
    minSizeBody: string;
    testWidthLabel: string;
    statusPrimaryOk: string;
    statusCompactRequired: string;
    statusBelowMin: string;
    dontsTitle: string;
    dont1: string;
    dont2: string;
    dont3: string;
    dont4: string;
  };
  colorTypeVoice: {
    sectionTitle: string;
    sectionLead: string;
    paletteHeading: string;
    copiedLabel: string;
    typographyHeading: string;
    primaryFontRole: string;
    lawSerifRole: string;
    monoSpecsRole: string;
    governanceHeading: string;
    governanceSubtitle: string;
    pillarMotionTitle: string;
    pillarMotionBody: string;
    pillarSonicTitle: string;
    pillarSonicBody: string;
    pillarPrintTitle: string;
    pillarPrintBody: string;
    pillarAccessibilityTitle: string;
    pillarAccessibilityBody: string;
  };
  applications: {
    sectionTitle: string;
    sectionLead: string;
    oohTitle: string;
    oohDesc: string;
    fleetTitle: string;
    fleetDesc: string;
    receptionTitle: string;
    receptionDesc: string;
    signatureTitle: string;
    signatureDesc: string;
    downloadTemplate: string;
    copyHtmlSignature: string;
    copiedSignature: string;
  };
  campaigns: {
    sectionTitle: string;
    sectionLead: string;
    galleryHeading: string;
    downloadCampaignImage: string;
    videoStudioHeading: string;
    videoStudioLead: string;
    formatCinematic: string;
    formatReel: string;
    safeZoneLabel: string;
    playBtn: string;
    pauseBtn: string;
    restartBtn: string;
    recordWebmBtn: string;
    recordingLabel: string;
    exportFrameBtn: string;
    pomelliHeading: string;
    pomelliLead: string;
    copyPromptBtn: string;
  };
  share: {
    title: string;
    subtitle: string;
    assetScopeLabel: string;
    fullBrandBookScope: string;
    messageLabel: string;
    defaultMessage: string;
    emailTab: string;
    whatsappTab: string;
    recipientNamePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    addRecipientBtn: string;
    sendEmailBtn: string;
    openWhatsAppBtn: string;
    copySharePackBtn: string;
    copiedPackMsg: string;
    emptyRecipients: string;
    invalidEmailError: string;
    invalidPhoneError: string;
    closeBtn: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  pt: {
    nav: {
      architecture: 'Arquitetura',
      logos: 'Logótipos & DAM',
      guidelines: 'Normas & Cor',
      applications: 'Suportes',
      campaigns: 'Campanhas',
      share: 'Partilhar',
    },
    hero: {
      kicker: 'Livro de Normas de Identidade Visual · Edição Internacional',
      title: 'Flow Group: Arquitetura de Marca & Centro de Ativos',
      subtitle:
        'Sistema normativo unificado que rege a assinatura umbrella Flow Group e as suas quatro dimensões estratégicas: AI Flow, Biz Flow, Law Flow e Personal Flow.',
      primaryCta: 'Explorar Logótipos & Downloads',
      secondaryCta: 'Abrir Estúdio de Campanhas',
      languageLabel: 'Idioma',
      signatureNote: '"Group" é uma assinatura manuscrita protegida — nunca substituir por fonte padrão.',
    },
    architecture: {
      sectionTitle: '01. Arquitetura Umbrella & Posicionamento',
      sectionLead:
        'O Flow Group opera num modelo de endosso estruturado: inovação e disrupção nas verticais tecnológica, empresarial e humana, combinadas com rigor conservador no setor jurídico.',
      viewTogether: 'Em Conjunto (Ecossistema)',
      viewSeparate: 'Marcas Separadas',
      togetherDesc:
        'Aplicação institucional em feiras, relatórios anuais, banners de grupo e cabeçalhos conjuntos: Flow Group assume o protagonismo superior ou lateral, alinhando as 4 sub-marcas pela linha base.',
      separateDesc:
        'Cada sub-marca opera de forma autónoma com o seu anel aberto proprietário, cor de assinatura e a sub-assinatura espaçada WITH U, mantendo coerência geométrica.',
      signatureRuleTitle: 'Regra da Assinatura "Group"',
      signatureRuleBody:
        'No logótipo principal, a palavra "Flow" utiliza geometria pesada em platina, enquanto "Group" é obrigatoriamente aplicada como assinatura caligráfica com traço inferior contínuo em todos os suportes.',
      lawExceptionTitle: 'Exceção Normativa: Law Flow (Conservador)',
      lawExceptionBody:
        'Enquanto AI Flow, Biz Flow e Personal Flow comunicam disrupção e velocidade, o Law Flow adota estética sóbria, margens de proteção +25% superiores, ausência de efeitos neon e tipografia editorial clássica em documentos formais.',
      downloadUmbrellaBtn: 'Descarregar Lockup Conjunto (SVG + PNG)',
    },
    dam: {
      sectionTitle: '02. Sistema de Logótipos & Repositório DAM',
      sectionLead:
        'Selecione a marca e o modo cromático para pré-visualizar e descarregar imediatamente os ficheiros originais em alta resolução, PNG transparente, JPG com fundo e adaptações com borda contrastante.',
      selectBrand: 'Selecionar Identidade',
      tabOriginal: 'Original (Roxo Profundo)',
      tabBlack: 'Preto (PNG & JPG)',
      tabWhite: 'Branco (PNG & JPG)',
      tabAdaptive: 'Fundos Coloridos & Fotográficos',
      originalDesc:
        'Versão principal oficial sobre Roxo Profundo (#220046) em qualidade master 8K para apresentações digitais, vídeo e impressão de alto contraste.',
      blackDesc:
        'Versão monocromática em Preto Absoluto (#0A0A0C). Disponível em PNG sem fundo (canal alfa limpo) e JPG sobre fundo Branco Puro (#FFFFFF).',
      whiteDesc:
        'Versão monocromática em Branco Puro (#FFFFFF). Disponível em PNG sem fundo (canal alfa limpo) e JPG sobre fundo Preto Absoluto (#0A0A0C).',
      adaptiveDesc:
        'Em fundos coloridos ou fotografias complexas, cada logótipo é enquadrado numa placa de contraste com borda perimetral na cor proprietária da marca (ou contraste invertido), garantindo legibilidade WCAG AA.',
      downloadPngTransparent: 'Descarregar PNG (Sem Fundo)',
      downloadJpgWhite: 'Descarregar JPG (Fundo Branco)',
      downloadJpgBlack: 'Descarregar JPG (Fundo Preto)',
      downloadJpgMaster: 'Descarregar JPG Master Original',
      downloadSvgVector: 'Descarregar Vetor SVG',
      downloadAdaptivePng: 'Descarregar Versão Adaptada (PNG)',
      downloadFullZip: 'Descarregar Kit Completo (.ZIP)',
      backgroundSelector: 'Testar Fundo de Aplicação',
      borderStyleLabel: 'Adaptação de Borda Contrastante',
      borderFrameOption: 'Moldura de Contraste + Placa Translúcida',
      borderSolidPlateOption: 'Placa Sólida Roxo Profundo + Borda Marca',
      contrastBadgeText: 'Contraste verificado ≥ 7.2:1',
      preparingDownload: 'A processar ficheiro...',
    },
    rules: {
      sectionTitle: '03. Construção, Área de Respiração & Tamanhos Mínimos',
      sectionLead:
        'A integridade visual depende do respeito absoluto pela zona de proteção modular (X) e pelas dimensões mínimas de reprodução digital e impressa.',
      clearSpaceTitle: 'Área de Proteção (Zona de Respiração)',
      clearSpaceBody:
        'A unidade modular X corresponde à altura da letra maiúscula "F" em Flow. Nenhuma fotografia, texto ou margem pode invadir o perímetro mínimo de 1X (1.25X no Law Flow).',
      minSizeTitle: 'Simulador de Tamanhos Mínimos',
      minSizeBody:
        'Teste a largura em píxeis (digital) e milímetros (impresso) para verificar quando o logótipo completo deve comutar para o símbolo compacto.',
      testWidthLabel: 'Largura Simulada',
      statusPrimaryOk: 'Aprovado · Logótipo Principal Completo',
      statusCompactRequired: 'Atenção · Mudar para Símbolo / Versão Compacta',
      statusBelowMin: 'Crítico · Abaixo do limite mínimo legível',
      dontsTitle: 'Usos Interditos (O Que Nunca Fazer)',
      dont1: 'Substituir a assinatura manuscrita "Group" por letra tipográfica comum.',
      dont2: 'Distorcer proporções, inclinar ou aplicar sombras difusas sob o anel.',
      dont3: 'Aplicar o dourado do Law Flow diretamente sobre fundos claros sem placa de contraste.',
      dont4: 'Misturar a cor de destaque de uma sub-marca com o nome de outra.',
    },
    colorTypeVoice: {
      sectionTitle: '04. Sistema Cromático, Tipografia & Normas Complementares',
      sectionLead:
        'Especificações técnicas para ecrã (HEX/RGB) e produção gráfica (CMYK/Pantone), acompanhadas das diretrizes internacionais de voz, movimento e impressão.',
      paletteHeading: 'Paleta Cromática Oficial (Clique para copiar HEX)',
      copiedLabel: 'Copiado',
      typographyHeading: 'Arquitetura Tipográfica',
      primaryFontRole: 'Tipografia Corporativa Principal (Display & UI)',
      lawSerifRole: 'Tipografia Editorial Complementar (Exclusiva Law Flow)',
      monoSpecsRole: 'Tipografia Técnica (Tabelas, Cotas & Códigos)',
      governanceHeading: 'Capítulos de Referência Internacional (Extensão Brand Book)',
      governanceSubtitle:
        'Para posicionar este manual ao nível das maiores consultoras globais, integramos normas operacionais para além do logótipo:',
      pillarMotionTitle: '01. Identidade em Movimento (Motion Curves)',
      pillarMotionBody:
        'AI, Biz e Personal Flow usam curvas elásticas rápidas (cubic-bezier 0.16, 1, 0.3, 1, 180ms). O Law Flow usa transições lineares lentas e solenes (500ms ease-out).',
      pillarSonicTitle: '02. Identidade Sonora & Áudio de Marca',
      pillarSonicBody:
        'Assinatura sonora de 3 segundos: pulso sintético limpo a 120 BPM para verticais inovadoras; acorde acústico de piano e cordas graves para o Law Flow.',
      pillarPrintTitle: '03. Acabamentos Gráficos & Sustentabilidade ESG',
      pillarPrintBody:
        'Papel algodão certificado FSC 350g para cartões Law Flow com cunho seco dourado; papel reciclado mate anti-reflexo para relatórios Flow Group.',
      pillarAccessibilityTitle: '04. Acessibilidade Digital & Governo de Marca',
      pillarAccessibilityBody:
        'Contraste mínimo WCAG AA (4.5:1) obrigatório em todas as interfaces, legendagem automática em Reels e revisão semestral do repositório DAM.',
    },
    applications: {
      sectionTitle: '05. Suportes Reais & Templates Descarregáveis',
      sectionLead:
        'Pré-visualização e descarga imediata de artes-finais adaptadas a outdoors (OOH), decoração de viaturas, receção corporativa e assinatura digital.',
      oohTitle: 'Outdoors & MUPIS Urbanos',
      oohDesc:
        'Composição panorâmica 16:9 com margem de segurança rodoviária e assinatura Flow Group no rodapé.',
      fleetTitle: 'Decoração de Viaturas (Frota Executiva)',
      fleetDesc:
        'Aplicação lateral em vinil recortado de alta visibilidade com borda contrastante para carroçarias escuras.',
      receptionTitle: 'Sinalética & Receção (Padrão Law Flow)',
      receptionDesc:
        'Letreiros em latão escovado dourado sobre pedra escura ou mármore travertino com iluminação arquitetural rasante.',
      signatureTitle: 'Assinatura de Email Corporativa & NFC',
      signatureDesc:
        'Bloco HTML responsivo compatível com Gmail e Outlook respeitando o espaçamento umbrella.',
      downloadTemplate: 'Descarregar Mockup / Arte (PNG)',
      copyHtmlSignature: 'Copiar HTML da Assinatura',
      copiedSignature: 'HTML Copiado!',
    },
    campaigns: {
      sectionTitle: '06. Estúdio de Campanhas, Reels & Vídeo',
      sectionLead:
        'Visuais de campanha gerados para cada marca, estúdio interativo de vídeo cinematográfico (16:9) e Reels verticais (9:16) com exportação direta e guia Pomelli.',
      galleryHeading: 'Campanhas Oficiais por Marca (Descarregáveis)',
      downloadCampaignImage: 'Descarregar Campanha (PNG c/ Logo)',
      videoStudioHeading: 'Gerador & Reprodutor de Vídeo Cinematográfico e Reels',
      videoStudioLead:
        'Alterne entre o formato publicitário cinematográfico (16:9) e o formato vertical para redes sociais (9:16) com zonas seguras para Instagram, TikTok, LinkedIn e Facebook.',
      formatCinematic: 'Vídeo Cinematográfico (16:9)',
      formatReel: 'Social Reel / Short (9:16)',
      safeZoneLabel: 'Zonas Seguras Redes Sociais',
      playBtn: 'Reproduzir',
      pauseBtn: 'Pausar',
      restartBtn: 'Reiniciar',
      recordWebmBtn: 'Gravar & Descarregar Vídeo (5s .webm)',
      recordingLabel: 'A gravar clip de campanha...',
      exportFrameBtn: 'Descarregar Frame (PNG)',
      pomelliHeading: 'Playbook Pomelli & Ferramentas Gratuitas de Campanha',
      pomelliLead:
        'Fluxo pronto para equipas de marketing produzirem variações em massa no Pomelli, CapCut, Canva, Figma e DaVinci Resolve respeitando as normas Flow Group.',
      copyPromptBtn: 'Copiar Prompt Pomelli',
    },
    share: {
      title: 'Partilhar Livro de Normas & Ativos',
      subtitle:
        'Envie este portal ou pacotes específicos diretamente para os endereços de email e contactos WhatsApp que indicar.',
      assetScopeLabel: 'Conteúdo a Partilhar',
      fullBrandBookScope: 'Livro de Normas Completo + Todos os Logótipos e Campanhas',
      messageLabel: 'Mensagem de Acompanhamento',
      defaultMessage:
        'Partilho consigo o Livro de Normas oficial e o repositório de ativos digitais do Flow Group (AI Flow, Biz Flow, Law Flow e Personal Flow).',
      emailTab: 'Destinatários Email',
      whatsappTab: 'Destinatários WhatsApp',
      recipientNamePlaceholder: 'Nome (ex: Ana Silva)',
      emailPlaceholder: 'email@empresa.com',
      phonePlaceholder: '+351 912 345 678',
      addRecipientBtn: 'Adicionar',
      sendEmailBtn: 'Abrir Email para Todos',
      openWhatsAppBtn: 'Enviar via WhatsApp',
      copySharePackBtn: 'Copiar Resumo & Link',
      copiedPackMsg: 'Link e resumo copiados!',
      emptyRecipients: 'Adicione pelo menos um destinatário acima para gerar o envio.',
      invalidEmailError: 'Introduza um endereço de email válido.',
      invalidPhoneError: 'Introduza um número WhatsApp válido com indicativo (ex: +351...).',
      closeBtn: 'Fechar',
    },
  },
  en: {
    nav: {
      architecture: 'Architecture',
      logos: 'Logos & DAM',
      guidelines: 'Guidelines',
      applications: 'Applications',
      campaigns: 'Campaigns',
      share: 'Share',
    },
    hero: {
      kicker: 'Visual Identity Brand Book · International Edition',
      title: 'Flow Group: Brand Architecture & Digital Asset Hub',
      subtitle:
        'Unified normative system governing the Flow Group umbrella signature and its four strategic dimensions: AI Flow, Biz Flow, Law Flow, and Personal Flow.',
      primaryCta: 'Explore Logos & Downloads',
      secondaryCta: 'Open Campaign Studio',
      languageLabel: 'Language',
      signatureNote: '"Group" is a protected handwritten signature — never replace with standard type.',
    },
    architecture: {
      sectionTitle: '01. Umbrella Architecture & Positioning',
      sectionLead:
        'Flow Group operates a structured endorsement model: innovation and disruption across tech, business, and human verticals, paired with deliberate conservative gravitas in legal advisory.',
      viewTogether: 'Together (Ecosystem)',
      viewSeparate: 'Individual Brands',
      togetherDesc:
        'Institutional lockup for exhibitions, annual reports, group banners, and joint presentations: Flow Group anchors the hierarchy while aligning all four sub-brands on a shared baseline.',
      separateDesc:
        'Each sub-brand operates autonomously with its proprietary open-ring mark, signature hue, and tracked WITH U caption while maintaining geometric unity.',
      signatureRuleTitle: 'The "Group" Signature Rule',
      signatureRuleBody:
        'In the master logo, "Flow" is set in bold platinum geometry while "Group" must always appear as the bespoke calligraphic signature with its continuous underline flourish.',
      lawExceptionTitle: 'Normative Exception: Law Flow (Conservative)',
      lawExceptionBody:
        'While AI Flow, Biz Flow, and Personal Flow express velocity and disruption, Law Flow enforces classical sobriety, +25% wider clear space, zero neon effects, and editorial serif pairings on formal briefs.',
      downloadUmbrellaBtn: 'Download Joint Lockup (SVG + PNG)',
    },
    dam: {
      sectionTitle: '02. Logo System & DAM Repository',
      sectionLead:
        'Select any brand and color mode to preview and download hi-res masters, transparent PNGs, solid-background JPGs, and contrasting-border adaptations.',
      selectBrand: 'Select Brand',
      tabOriginal: 'Original (Deep Purple)',
      tabBlack: 'Black (PNG & JPG)',
      tabWhite: 'White (PNG & JPG)',
      tabAdaptive: 'Colored & Photo Backgrounds',
      originalDesc:
        'Official primary master on Deep Purple (#220046) in 8K print-ready resolution for digital decks, film, and high-contrast media.',
      blackDesc:
        'Monochrome Pitch Black (#0A0A0C) edition. Downloadable as transparent PNG (alpha-keyed) and JPG on Pure White (#FFFFFF).',
      whiteDesc:
        'Monochrome Pure White (#FFFFFF) edition. Downloadable as transparent PNG (alpha-keyed) and JPG on Pitch Black (#0A0A0C).',
      adaptiveDesc:
        'Over colorful gradients or busy photography, each logo sits inside a contrast plate framed by its signature perimeter border (or inverted contrast) to guarantee WCAG AA legibility.',
      downloadPngTransparent: 'Download PNG (Transparent)',
      downloadJpgWhite: 'Download JPG (White Bg)',
      downloadJpgBlack: 'Download JPG (Black Bg)',
      downloadJpgMaster: 'Download Original Master JPG',
      downloadSvgVector: 'Download Vector SVG',
      downloadAdaptivePng: 'Download Adaptive Plate (PNG)',
      downloadFullZip: 'Download Complete Kit (.ZIP)',
      backgroundSelector: 'Test Background Surface',
      borderStyleLabel: 'Contrasting Border Treatment',
      borderFrameOption: 'Contrast Frame + Translucent Plate',
      borderSolidPlateOption: 'Deep Purple Plate + Brand Border',
      contrastBadgeText: 'Verified contrast ≥ 7.2:1',
      preparingDownload: 'Preparing asset...',
    },
    rules: {
      sectionTitle: '03. Construction, Clear Space & Minimum Sizes',
      sectionLead:
        'Visual authority depends on strict adherence to the modular exclusion zone (X) and minimum digital/print reproduction thresholds.',
      clearSpaceTitle: 'Exclusion Zone (Clear Space)',
      clearSpaceBody:
        'Modular unit X equals the cap height of the letter "F" in Flow. No text, photography, or trim edge may enter the 1X perimeter (1.25X for Law Flow).',
      minSizeTitle: 'Minimum Size Simulator',
      minSizeBody:
        'Test width in pixels (digital) and millimeters (print) to see when the full lockup must switch to the compact symbol.',
      testWidthLabel: 'Simulated Width',
      statusPrimaryOk: 'Approved · Full Primary Lockup',
      statusCompactRequired: 'Notice · Switch to Compact Mark',
      statusBelowMin: 'Critical · Below minimum legible size',
      dontsTitle: 'Prohibited Usage (Do Not)',
      dont1: 'Replace the handwritten "Group" signature with a standard sans-serif font.',
      dont2: 'Stretch, skew, or add blurry drop shadows behind the open-ring mark.',
      dont3: 'Place Law Flow gold directly on pale cream backgrounds without a contrast plate.',
      dont4: 'Swap accent colors across different sub-brands.',
    },
    colorTypeVoice: {
      sectionTitle: '04. Color System, Typography & Extended Governance',
      sectionLead:
        'Production color tokens for screen (HEX/RGB) and print (CMYK/Pantone), paired with international voice, motion, and material standards.',
      paletteHeading: 'Official Color Palette (Click to copy HEX)',
      copiedLabel: 'Copied',
      typographyHeading: 'Typographic Architecture',
      primaryFontRole: 'Primary Corporate Typeface (Display & UI)',
      lawSerifRole: 'Editorial Contrast Serif (Exclusive to Law Flow)',
      monoSpecsRole: 'Technical Specification Face (Tables & Codes)',
      governanceHeading: 'International Reference Extensions',
      governanceSubtitle:
        'Built to match top global consulting brand manuals, including operational standards beyond the logo:',
      pillarMotionTitle: '01. Motion & Kinetic Curves',
      pillarMotionBody:
        'AI, Biz, and Personal Flow use crisp deceleration curves (180ms). Law Flow uses dignified linear-ease transitions (500ms) free of bounce.',
      pillarSonicTitle: '02. Sonic Identity & Brand Audio',
      pillarSonicBody:
        '3-second sonic mnemonic: clean 120 BPM harmonic pulse for disruptive verticals; warm acoustic piano and cello chord for Law Flow.',
      pillarPrintTitle: '03. Print Craft & ESG Sustainability',
      pillarPrintBody:
        '350gsm FSC cotton stock with gold foil embossing for Law Flow; uncoated recycled matte stock for Flow Group annual reports.',
      pillarAccessibilityTitle: '04. Digital Accessibility & Governance',
      pillarAccessibilityBody:
        'Mandatory WCAG AA (4.5:1) text contrast, burned-in captions on social Reels, and bi-annual DAM audit cycles.',
    },
    applications: {
      sectionTitle: '05. Real-World Applications & Downloadable Templates',
      sectionLead:
        'Interactive mockups and instant downloads for OOH billboards, executive vehicle wraps, corporate reception signage, and email signatures.',
      oohTitle: 'Outdoor Billboards & Urban MUPIS',
      oohDesc:
        '16:9 panoramic composition with roadside safe margins and Flow Group umbrella endorsement footer.',
      fleetTitle: 'Executive Fleet Branding (Vehicle Wrap)',
      fleetDesc:
        'High-visibility side decal system with contrasting brand border engineered for dark vehicle finishes.',
      receptionTitle: 'Architectural Signage (Law Flow Standard)',
      receptionDesc:
        'Brushed gold brass lettering mounted on dark stone or travertine walls with grazing architectural light.',
      signatureTitle: 'Corporate Email Signature & NFC Card',
      signatureDesc:
        'Responsive HTML email block compatible with Gmail and Outlook respecting umbrella hierarchy.',
      downloadTemplate: 'Download Mockup Asset (PNG)',
      copyHtmlSignature: 'Copy Signature HTML',
      copiedSignature: 'HTML Copied!',
    },
    campaigns: {
      sectionTitle: '06. Campaign Studio, Reels & Video Production',
      sectionLead:
        'Custom campaign visuals for every brand, live 16:9 cinematic commercial & 9:16 vertical social reel player with video export, plus Pomelli workflow prompts.',
      galleryHeading: 'Official Brand Campaigns (Downloadable)',
      downloadCampaignImage: 'Download Campaign (PNG w/ Logo)',
      videoStudioHeading: 'Cinematic Commercial & Social Reel Studio',
      videoStudioLead:
        'Switch between 16:9 cinematic spots and 9:16 vertical reels with safe-zone overlays for Instagram, TikTok, LinkedIn, and Facebook.',
      formatCinematic: 'Cinematic Commercial (16:9)',
      formatReel: 'Social Reel / Short (9:16)',
      safeZoneLabel: 'Social UI Safe Zones',
      playBtn: 'Play',
      pauseBtn: 'Pause',
      restartBtn: 'Restart',
      recordWebmBtn: 'Record & Download Video (5s .webm)',
      recordingLabel: 'Recording campaign clip...',
      exportFrameBtn: 'Export Frame (PNG)',
      pomelliHeading: 'Pomelli & Free Campaign Software Playbook',
      pomelliLead:
        'Copy-ready creative prompts and production checklists for Pomelli, CapCut, Canva, Figma, and DaVinci Resolve.',
      copyPromptBtn: 'Copy Pomelli Prompt',
    },
    share: {
      title: 'Share Brand Book & Assets',
      subtitle:
        'Send this portal or specific asset kits directly to the email addresses and WhatsApp contacts you specify.',
      assetScopeLabel: 'Content to Share',
      fullBrandBookScope: 'Complete Brand Book + All Logos & Campaigns',
      messageLabel: 'Personal Note',
      defaultMessage:
        'Sharing the official Flow Group Brand Book and Digital Asset Hub (AI Flow, Biz Flow, Law Flow, and Personal Flow).',
      emailTab: 'Email Recipients',
      whatsappTab: 'WhatsApp Recipients',
      recipientNamePlaceholder: 'Name (e.g. Jane Doe)',
      emailPlaceholder: 'name@company.com',
      phonePlaceholder: '+44 7700 900077',
      addRecipientBtn: 'Add',
      sendEmailBtn: 'Open Email for All',
      openWhatsAppBtn: 'Send via WhatsApp',
      copySharePackBtn: 'Copy Link & Summary',
      copiedPackMsg: 'Link & summary copied!',
      emptyRecipients: 'Add at least one recipient above to prepare dispatch.',
      invalidEmailError: 'Please enter a valid email address.',
      invalidPhoneError: 'Please enter a valid WhatsApp number with country code.',
      closeBtn: 'Close',
    },
  },
  fr: {
    nav: {
      architecture: 'Architecture',
      logos: 'Logos & DAM',
      guidelines: 'Normes',
      applications: 'Supports',
      campaigns: 'Campagnes',
      share: 'Partager',
    },
    hero: {
      kicker: 'Charte Graphique & Identité Visuelle · Édition Internationale',
      title: 'Flow Group : Architecture de Marque & Portail DAM',
      subtitle:
        'Système normatif unifié régissant la signature ombrelle Flow Group et ses quatre dimensions stratégiques : AI Flow, Biz Flow, Law Flow et Personal Flow.',
      primaryCta: 'Explorer les Logos & Téléchargements',
      secondaryCta: 'Ouvrir le Studio Campagnes',
      languageLabel: 'Langue',
      signatureNote: '« Group » est une signature manuscrite protégée — ne jamais remplacer par une police standard.',
    },
    architecture: {
      sectionTitle: '01. Architecture Ombrelle & Positionnement',
      sectionLead:
        'Flow Group adopte un modèle d’endossement structuré : rupture et agilité sur les pôles tech, business et humain, alliées à une sobriété conservatrice pour le pôle juridique.',
      viewTogether: 'Ensemble (Écosystème)',
      viewSeparate: 'Marques Séparées',
      togetherDesc:
        'Application institutionnelle pour salons, rapports annuels et bannières de groupe : Flow Group ancre la hiérarchie tout en alignant les quatre sous-marques.',
      separateDesc:
        'Chaque sous-marque s’exprime de manière autonome avec son anneau ouvert, sa couleur propriétaire et la mention espacée WITH U.',
      signatureRuleTitle: 'Règle de la Signature « Group »',
      signatureRuleBody:
        'Dans le logotype principal, « Flow » utilise une géométrie platine affirmée tandis que « Group » reste impérativement une signature calligraphique soulignée.',
      lawExceptionTitle: 'Exception Normative : Law Flow (Conservateur)',
      lawExceptionBody:
        'À la différence d’AI, Biz et Personal Flow, Law Flow impose un classicisme rigoureux, des marges de respiration accrues (+25 %), aucun effet néon et une typographie sérif éditoriale.',
      downloadUmbrellaBtn: 'Télécharger le Lockup Commun (SVG + PNG)',
    },
    dam: {
      sectionTitle: '02. Système de Logotypes & Référentiel DAM',
      sectionLead:
        'Sélectionnez une marque et un mode chromatique pour prévisualiser et télécharger les masters HD, PNG transparents, JPG sur fond uni et adaptations à bordure contrastée.',
      selectBrand: 'Sélectionner l’Identité',
      tabOriginal: 'Original (Violet Profond)',
      tabBlack: 'Noir (PNG & JPG)',
      tabWhite: 'Blanc (PNG & JPG)',
      tabAdaptive: 'Fonds Colorés & Photos',
      originalDesc:
        'Version officielle sur Violet Profond (#220046) en résolution 8K pour présentations, vidéo et impression haute fidélité.',
      blackDesc:
        'Version monochrome Noir Absolu (#0A0A0C). Téléchargeable en PNG transparent et JPG sur fond Blanc Pur (#FFFFFF).',
      whiteDesc:
        'Version monochrome Blanc Pur (#FFFFFF). Téléchargeable en PNG transparent et JPG sur fond Noir Absolu (#0A0A0C).',
      adaptiveDesc:
        'Sur fonds colorés ou photographies complexes, chaque logo intègre un cartouche de contraste bordé de sa couleur signature afin d’assurer une lisibilité WCAG AA.',
      downloadPngTransparent: 'Télécharger PNG (Sans Fond)',
      downloadJpgWhite: 'Télécharger JPG (Fond Blanc)',
      downloadJpgBlack: 'Télécharger JPG (Fond Noir)',
      downloadJpgMaster: 'Télécharger JPG Master Original',
      downloadSvgVector: 'Télécharger Vecteur SVG',
      downloadAdaptivePng: 'Télécharger Version Adaptée (PNG)',
      downloadFullZip: 'Télécharger Kit Complet (.ZIP)',
      backgroundSelector: 'Tester le Fond d’Application',
      borderStyleLabel: 'Style de Bordure Contrastante',
      borderFrameOption: 'Cadre Contrasté + Plaque Translucide',
      borderSolidPlateOption: 'Plaque Violet Profond + Bordure Marque',
      contrastBadgeText: 'Contraste vérifié ≥ 7.2:1',
      preparingDownload: 'Préparation du fichier...',
    },
    rules: {
      sectionTitle: '03. Construction, Zone de Protection & Tailles Minimales',
      sectionLead:
        'La cohérence visuelle repose sur le respect strict de l’unité modulaire X et des seuils minimaux de reproduction.',
      clearSpaceTitle: 'Zone de Protection (Respiration)',
      clearSpaceBody:
        'L’unité modulaire X correspond à la hauteur de la capitale « F » de Flow. Aucun élément ne peut pénétrer le périmètre de 1X (1.25X pour Law Flow).',
      minSizeTitle: 'Simulateur de Tailles Minimales',
      minSizeBody:
        'Testez la largeur en pixels et en millimètres pour déterminer le basculement vers le symbole compact.',
      testWidthLabel: 'Largeur Simulée',
      statusPrimaryOk: 'Approuvé · Logotype Complet',
      statusCompactRequired: 'Attention · Utiliser le Symbole Compact',
      statusBelowMin: 'Critique · Sous le seuil lisible',
      dontsTitle: 'Usages Interdits',
      dont1: 'Remplacer la signature manuscrite « Group » par une police classique.',
      dont2: 'Déformer les proportions ou ajouter des ombres portées floues.',
      dont3: 'Appliquer l’or de Law Flow sur fond clair sans plaque de contraste.',
      dont4: 'Mélanger les couleurs signatures entre les sous-marques.',
    },
    colorTypeVoice: {
      sectionTitle: '04. Système Chromatique, Typographie & Gouvernance',
      sectionLead:
        'Spécifications écran (HEX/RGB) et impression (CMYK/Pantone) complétées par nos standards internationaux de voix et de mouvement.',
      paletteHeading: 'Palette Officielle (Cliquer pour copier HEX)',
      copiedLabel: 'Copié',
      typographyHeading: 'Architecture Typographique',
      primaryFontRole: 'Police Principale (Display & Interface)',
      lawSerifRole: 'Sérif Éditorial (Exclusif Law Flow)',
      monoSpecsRole: 'Police Technique (Tableaux & Spécifications)',
      governanceHeading: 'Extensions de Référence Internationale',
      governanceSubtitle:
        'Des normes opérationnelles dignes des plus grands cabinets de conseil internationaux :',
      pillarMotionTitle: '01. Identité Cinétique (Motion)',
      pillarMotionBody:
        'Courbes rapides (180ms) pour AI, Biz et Personal Flow ; transitions sobres et posées (500ms) pour Law Flow.',
      pillarSonicTitle: '02. Identité Sonore',
      pillarSonicBody:
        'Signature audio de 3s : pulsation harmonique 120 BPM pour l’innovation ; accord acoustique piano/violoncelle pour Law Flow.',
      pillarPrintTitle: '03. Impression & Durabilité ESG',
      pillarPrintBody:
        'Papier coton FSC 350g doré à chaud pour Law Flow ; papier recyclé mat pour les rapports Flow Group.',
      pillarAccessibilityTitle: '04. Accessibilité & Gouvernance',
      pillarAccessibilityBody:
        'Contraste WCAG AA obligatoire (4.5:1), sous-titrage systématique des Reels et audit semestriel du DAM.',
    },
    applications: {
      sectionTitle: '05. Supports Réels & Gabarits Téléchargeables',
      sectionLead:
        'Maquettes et téléchargements directs pour affichage extérieur (OOH), flocage automobile, signalétique et signature e-mail.',
      oohTitle: 'Affichage Extérieur & MUPIS',
      oohDesc:
        'Composition panoramique 16:9 avec zones de sécurité et signature Flow Group.',
      fleetTitle: 'Flotte Automobile (Covering)',
      fleetDesc:
        'Stickers latéraux haute visibilité avec bordure contrastante sur carrosserie sombre.',
      receptionTitle: 'Signalétique & Accueil (Standard Law Flow)',
      receptionDesc:
        'Lettrage laiton brossé doré sur pierre sombre ou travertin avec éclairage architectural.',
      signatureTitle: 'Signature E-mail & Carte NFC',
      signatureDesc:
        'Bloc HTML compatible Gmail et Outlook respectant la hiérarchie ombrelle.',
      downloadTemplate: 'Télécharger le Gabarit (PNG)',
      copyHtmlSignature: 'Copier HTML de la Signature',
      copiedSignature: 'HTML Copié !',
    },
    campaigns: {
      sectionTitle: '06. Studio Campagnes, Reels & Vidéo',
      sectionLead:
        'Visuels de campagne par marque, lecteur-enregistreur vidéo 16:9 & Reels 9:16 et prompts prêts pour Pomelli et outils gratuits.',
      galleryHeading: 'Campagnes Officielles par Marque',
      downloadCampaignImage: 'Télécharger Visuel (PNG c/ Logo)',
      videoStudioHeading: 'Studio Vidéo Cinématique & Social Reels',
      videoStudioLead:
        'Basculez entre spot cinématique 16:9 et format vertical 9:16 avec zones sûres Instagram, TikTok, LinkedIn et Facebook.',
      formatCinematic: 'Vidéo Cinématique (16:9)',
      formatReel: 'Social Reel / Short (9:16)',
      safeZoneLabel: 'Zones Sûres Réseaux Sociaux',
      playBtn: 'Lire',
      pauseBtn: 'Pause',
      restartBtn: 'Redémarrer',
      recordWebmBtn: 'Enregistrer & Télécharger Vidéo (5s .webm)',
      recordingLabel: 'Enregistrement en cours...',
      exportFrameBtn: 'Exporter Image (PNG)',
      pomelliHeading: 'Guide Pomelli & Outils Gratuits',
      pomelliLead:
        'Prompts créatifs et flux de travail pour Pomelli, CapCut, Canva, Figma et DaVinci Resolve.',
      copyPromptBtn: 'Copier le Prompt Pomelli',
    },
    share: {
      title: 'Partager la Charte & les Actifs',
      subtitle:
        'Envoyez ce portail ou des sélections d’actifs directement par e-mail ou WhatsApp aux destinataires de votre choix.',
      assetScopeLabel: 'Contenu à Partager',
      fullBrandBookScope: 'Charte Complète + Tous les Logos et Campagnes',
      messageLabel: 'Message',
      defaultMessage:
        'Je partage avec vous la charte graphique officielle et le portail d’actifs Flow Group (AI Flow, Biz Flow, Law Flow, Personal Flow).',
      emailTab: 'Destinataires E-mail',
      whatsappTab: 'Destinataires WhatsApp',
      recipientNamePlaceholder: 'Nom (ex: Claire Martin)',
      emailPlaceholder: 'nom@entreprise.fr',
      phonePlaceholder: '+33 6 12 34 56 78',
      addRecipientBtn: 'Ajouter',
      sendEmailBtn: 'Ouvrir E-mail pour Tous',
      openWhatsAppBtn: 'Envoyer via WhatsApp',
      copySharePackBtn: 'Copier Lien & Résumé',
      copiedPackMsg: 'Lien et résumé copiés !',
      emptyRecipients: 'Ajoutez au moins un destinataire ci-dessus.',
      invalidEmailError: 'Veuillez saisir une adresse e-mail valide.',
      invalidPhoneError: 'Veuillez saisir un numéro WhatsApp valide avec indicatif.',
      closeBtn: 'Fermer',
    },
  },
  es: {
    nav: {
      architecture: 'Arquitectura',
      logos: 'Logotipos',
      guidelines: 'Normas',
      applications: 'Soportes',
      campaigns: 'Campañas',
      share: 'Compartir',
    },
    hero: {
      kicker: 'Manual de Identidad Visual · Edición Internacional',
      title: 'Flow Group: Arquitectura de Marca y Portal DAM',
      subtitle:
        'Sistema normativo unificado que rige la firma paraguas Flow Group y sus cuatro dimensiones estratégicas: AI Flow, Biz Flow, Law Flow y Personal Flow.',
      primaryCta: 'Explorar Logotipos y Descargas',
      secondaryCta: 'Abrir Estudio de Campañas',
      languageLabel: 'Idioma',
      signatureNote: '"Group" es una firma manuscrita protegida — nunca sustituir por tipografía estándar.',
    },
    architecture: {
      sectionTitle: '01. Arquitectura Paraguas y Posicionamiento',
      sectionLead:
        'Flow Group opera un modelo de respaldo estructurado: innovación y disrupción en las verticales tecnológica, empresarial y humana, combinadas con sobriedad conservadora en el ámbito jurídico.',
      viewTogether: 'En Conjunto (Ecosistema)',
      viewSeparate: 'Marcas Separadas',
      togetherDesc:
        'Aplicación institucional en ferias, memorias anuales y cabeceras conjuntas: Flow Group lidera la jerarquía alineando las cuatro submarcas.',
      separateDesc:
        'Cada submarca actúa de forma autónoma con su anillo abierto propietario, color de acento y la firma espaciada WITH U.',
      signatureRuleTitle: 'Regla de la Firma "Group"',
      signatureRuleBody:
        'En el logotipo principal, "Flow" emplea geometría pesada en platino mientras que "Group" se aplica siempre como firma caligráfica con trazo inferior continuo.',
      lawExceptionTitle: 'Excepción Normativa: Law Flow (Conservador)',
      lawExceptionBody:
        'A diferencia de AI, Biz y Personal Flow, Law Flow exige sobriedad clásica, +25% de área de respeto, ausencia de neones y tipografía serif editorial.',
      downloadUmbrellaBtn: 'Descargar Lockup Conjunto (SVG + PNG)',
    },
    dam: {
      sectionTitle: '02. Sistema de Logotipos y Repositorio DAM',
      sectionLead:
        'Seleccione marca y modo cromático para previsualizar y descargar masters en alta resolución, PNG transparente, JPG con fondo y adaptaciones con borde contrastante.',
      selectBrand: 'Seleccionar Identidad',
      tabOriginal: 'Original (Púrpura Profundo)',
      tabBlack: 'Negro (PNG y JPG)',
      tabWhite: 'Blanco (PNG y JPG)',
      tabAdaptive: 'Fondos Coloridos y Fotográficos',
      originalDesc:
        'Versión oficial sobre Púrpura Profundo (#220046) en resolución 8K para presentaciones, vídeo e impresión.',
      blackDesc:
        'Versión monocromática en Negro Absoluto (#0A0A0C). Descargable en PNG sin fondo y JPG sobre Blanco Puro (#FFFFFF).',
      whiteDesc:
        'Versión monocromática en Blanco Puro (#FFFFFF). Descargable en PNG sin fondo y JPG sobre Negro Absoluto (#0A0A0C).',
      adaptiveDesc:
        'Sobre fondos vibrantes o fotografías complejas, cada logotipo se enmarca en una placa de contraste con borde en su color de marca para garantizar legibilidad WCAG AA.',
      downloadPngTransparent: 'Descargar PNG (Sin Fondo)',
      downloadJpgWhite: 'Descargar JPG (Fondo Blanco)',
      downloadJpgBlack: 'Descargar JPG (Fondo Negro)',
      downloadJpgMaster: 'Descargar JPG Master Original',
      downloadSvgVector: 'Descargar Vector SVG',
      downloadAdaptivePng: 'Descargar Versión Adaptada (PNG)',
      downloadFullZip: 'Descargar Kit Completo (.ZIP)',
      backgroundSelector: 'Probar Fondo de Aplicación',
      borderStyleLabel: 'Tratamiento de Borde Contrastante',
      borderFrameOption: 'Marco de Contraste + Placa Translúcida',
      borderSolidPlateOption: 'Placa Púrpura Profundo + Borde Marca',
      contrastBadgeText: 'Contraste verificado ≥ 7.2:1',
      preparingDownload: 'Procesando archivo...',
    },
    rules: {
      sectionTitle: '03. Construcción, Área de Respeto y Tamaños Mínimos',
      sectionLead:
        'La integridad visual depende del respeto absoluto de la zona modular (X) y los umbrales mínimos de reproducción.',
      clearSpaceTitle: 'Área de Protección (Respiración)',
      clearSpaceBody:
        'La unidad modular X equivale a la altura de la "F" de Flow. Ningún elemento puede invadir el perímetro de 1X (1.25X en Law Flow).',
      minSizeTitle: 'Simulador de Tamaños Mínimos',
      minSizeBody:
        'Pruebe el ancho en píxeles y milímetros para saber cuándo cambiar al símbolo compacto.',
      testWidthLabel: 'Ancho Simulado',
      statusPrimaryOk: 'Aprobado · Logotipo Principal',
      statusCompactRequired: 'Atención · Usar Símbolo Compacto',
      statusBelowMin: 'Crítico · Por debajo del mínimo legible',
      dontsTitle: 'Usos Prohibidos',
      dont1: 'Sustituir la firma manuscrita "Group" por una fuente tipográfica estándar.',
      dont2: 'Estirar, inclinar o añadir sombras difusas al anillo abierto.',
      dont3: 'Aplicar el dorado de Law Flow sobre fondos claros sin placa de contraste.',
      dont4: 'Intercambiar colores de acento entre distintas submarcas.',
    },
    colorTypeVoice: {
      sectionTitle: '04. Sistema Cromático, Tipografía y Gobernanza',
      sectionLead:
        'Especificaciones digitales (HEX/RGB) e impresas (CMYK/Pantone) junto a estándares internacionales de voz, movimiento y materiales.',
      paletteHeading: 'Paleta Cromática Oficial (Clic para copiar HEX)',
      copiedLabel: 'Copiado',
      typographyHeading: 'Arquitectura Tipográfica',
      primaryFontRole: 'Tipografía Corporativa Principal (Display y UI)',
      lawSerifRole: 'Tipografía Editorial (Exclusiva Law Flow)',
      monoSpecsRole: 'Tipografía Técnica (Tablas y Códigos)',
      governanceHeading: 'Capítulos de Referencia Internacional',
      governanceSubtitle:
        'Normativa operativa al nivel de las principales consultoras globales:',
      pillarMotionTitle: '01. Identidad en Movimiento',
      pillarMotionBody:
        'Curvas ágiles (180ms) para AI, Biz y Personal Flow; transiciones pausadas y solemnes (500ms) para Law Flow.',
      pillarSonicTitle: '02. Identidad Sonora',
      pillarSonicBody:
        'Sello sonoro de 3s: pulso armónico de 120 BPM para verticales disruptivas; acorde acústico de piano y chelo para Law Flow.',
      pillarPrintTitle: '03. Impresión y Sostenibilidad ESG',
      pillarPrintBody:
        'Papel algodón FSC 350g con estampación dorada para Law Flow; papel reciclado mate para informes Flow Group.',
      pillarAccessibilityTitle: '04. Accesibilidad y Gobierno de Marca',
      pillarAccessibilityBody:
        'Contraste WCAG AA obligatorio (4.5:1), subtítulos en Reels y auditoría semestral del repositorio DAM.',
    },
    applications: {
      sectionTitle: '05. Soportes Reales y Plantillas Descargables',
      sectionLead:
        'Maquetas y descarga directa de artes para vallas exteriores (OOH), rotulación de vehículos, señalética y firma de correo.',
      oohTitle: 'Vallas Exteriores y MUPIS',
      oohDesc:
        'Composición panorámica 16:9 con márgenes viales de seguridad y firma Flow Group.',
      fleetTitle: 'Rotulación de Flota Ejecutiva',
      fleetDesc:
        'Vinilo lateral de alta visibilidad con borde contrastante diseñado para carrocerías oscuras.',
      receptionTitle: 'Señalética y Recepción (Estándar Law Flow)',
      receptionDesc:
        'Letras en latón dorado cepillado sobre piedra oscura o travertino con luz arquitectónica.',
      signatureTitle: 'Firma de Correo y Tarjeta NFC',
      signatureDesc:
        'Bloque HTML compatible con Gmail y Outlook respetando la arquitectura paraguas.',
      downloadTemplate: 'Descargar Maqueta (PNG)',
      copyHtmlSignature: 'Copiar HTML de Firma',
      copiedSignature: '¡HTML Copiado!',
    },
    campaigns: {
      sectionTitle: '06. Estudio de Campañas, Reels y Vídeo',
      sectionLead:
        'Visuales de campaña por marca, reproductor/exportador de vídeo 16:9 y Reels 9:16, más guía práctica para Pomelli y software gratuito.',
      galleryHeading: 'Campañas Oficiales por Marca',
      downloadCampaignImage: 'Descargar Campaña (PNG c/ Logo)',
      videoStudioHeading: 'Estudio de Vídeo Cinematográfico y Reels',
      videoStudioLead:
        'Alterne entre formato cinematográfico 16:9 y Reels verticales 9:16 con guías seguras para Instagram, TikTok, LinkedIn y Facebook.',
      formatCinematic: 'Vídeo Cinematográfico (16:9)',
      formatReel: 'Social Reel / Short (9:16)',
      safeZoneLabel: 'Zonas Seguras Redes Sociales',
      playBtn: 'Reproducir',
      pauseBtn: 'Pausar',
      restartBtn: 'Reiniciar',
      recordWebmBtn: 'Grabar y Descargar Vídeo (5s .webm)',
      recordingLabel: 'Grabando clip de campaña...',
      exportFrameBtn: 'Exportar Fotograma (PNG)',
      pomelliHeading: 'Guía Pomelli y Herramientas Gratuitas',
      pomelliLead:
        'Prompts creativos listos para producir campañas en Pomelli, CapCut, Canva, Figma y DaVinci Resolve.',
      copyPromptBtn: 'Copiar Prompt Pomelli',
    },
    share: {
      title: 'Compartir Manual y Activos',
      subtitle:
        'Envíe este portal o paquetes de activos directamente a los correos y contactos de WhatsApp que indique.',
      assetScopeLabel: 'Contenido a Compartir',
      fullBrandBookScope: 'Manual Completo + Todos los Logotipos y Campañas',
      messageLabel: 'Mensaje Personalizado',
      defaultMessage:
        'Comparto contigo el Manual de Identidad oficial y repositorio DAM de Flow Group (AI Flow, Biz Flow, Law Flow y Personal Flow).',
      emailTab: 'Destinatarios Email',
      whatsappTab: 'Destinatarios WhatsApp',
      recipientNamePlaceholder: 'Nombre (ej: Carlos Ruiz)',
      emailPlaceholder: 'nombre@empresa.es',
      phonePlaceholder: '+34 612 345 678',
      addRecipientBtn: 'Añadir',
      sendEmailBtn: 'Abrir Email para Todos',
      openWhatsAppBtn: 'Enviar por WhatsApp',
      copySharePackBtn: 'Copiar Enlace y Resumen',
      copiedPackMsg: '¡Enlace y resumen copiados!',
      emptyRecipients: 'Añada al menos un destinatario arriba para preparar el envío.',
      invalidEmailError: 'Introduzca una dirección de correo válida.',
      invalidPhoneError: 'Introduzca un número de WhatsApp válido con prefijo.',
      closeBtn: 'Cerrar',
    },
  },
};
