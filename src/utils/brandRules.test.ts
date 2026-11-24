import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMailtoUrl,
  buildWhatsAppUrl,
  computeClearSpaceMetrics,
  computeContrastRatio,
  generateBrandLogoSvg,
  generateJointUmbrellaSvg,
  getContrastingBorderSpec,
  isValidWhatsAppPhone,
  validateEmail,
  validateMinimumSize,
} from './brandRules';
import { BRAND_MAP } from '../data/brandSpecs';

test('computeClearSpaceMetrics scales 1.25x for conservative Law Flow vs 1x for AI Flow', () => {
  const aiMetrics = computeClearSpaceMetrics(300, 100, BRAND_MAP['ai-flow'].clearSpaceRatioX);
  const lawMetrics = computeClearSpaceMetrics(300, 100, BRAND_MAP['law-flow'].clearSpaceRatioX);

  assert.equal(aiMetrics.unitXPx, 38);
  assert.equal(aiMetrics.marginPx, 38);
  assert.equal(lawMetrics.marginPx, 48);
  assert.ok(lawMetrics.totalWidthPx > aiMetrics.totalWidthPx);
});

test('validateMinimumSize distinguishes primary-ok, compact-required, and below-min', () => {
  const biz = BRAND_MAP['biz-flow'];
  assert.equal(validateMinimumSize(biz, 160).status, 'primary-ok');
  assert.equal(validateMinimumSize(biz, 80).status, 'compact-required');
  assert.equal(validateMinimumSize(biz, 24).status, 'below-min');
});

test('getContrastingBorderSpec ensures WCAG AAA contrast with brand-colored perimeter', () => {
  const law = BRAND_MAP['law-flow'];
  const spec = getContrastingBorderSpec(law, '#F5F2EB');
  assert.equal(spec.plateBackground, '#220046');
  assert.equal(spec.borderColor, '#C99A2E');
  assert.ok(spec.contrastRatio >= 12);
  assert.ok(computeContrastRatio('#220046', '#FFFFFF') >= 12);
});

test('validateEmail and WhatsApp phone validation reject invalid entries', () => {
  assert.equal(validateEmail('director@flowgroup.pt'), true);
  assert.equal(validateEmail('invalid-email'), false);
  assert.equal(isValidWhatsAppPhone('+351 912 345 678'), true);
  assert.equal(isValidWhatsAppPhone('1234'), false);
});

test('buildMailtoUrl and buildWhatsAppUrl produce valid dispatch links', () => {
  const mailto = buildMailtoUrl(['a@flow.pt', 'b@flow.pt'], 'Brand Book', 'Segue link');
  assert.ok(mailto.startsWith('mailto:'));
  assert.ok(mailto.includes('Brand%20Book'));

  const wa = buildWhatsAppUrl('+351 912 345 678', 'Olá Flow Group');
  assert.equal(wa, 'https://wa.me/351912345678?text=Ol%C3%A1%20Flow%20Group');
});

test('generateBrandLogoSvg preserves handwritten Group signature and transparent modes', () => {
  const flowGroupWhiteTransparent = generateBrandLogoSvg('flow-group', 'white-transparent');
  assert.ok(flowGroupWhiteTransparent.includes('Handwritten calligraphic Group signature'));
  assert.ok(!flowGroupWhiteTransparent.includes('fill="#220046"'));

  const lawBlackWhiteBg = generateBrandLogoSvg('law-flow', 'black-whitebg');
  assert.ok(lawBlackWhiteBg.includes('fill="#FFFFFF"'));
  assert.ok(lawBlackWhiteBg.includes('fill="#0A0A0C"'));

  const umbrella = generateJointUmbrellaSvg();
  assert.ok(umbrella.includes('AI'));
  assert.ok(umbrella.includes('Biz'));
  assert.ok(umbrella.includes('Law'));
  assert.ok(umbrella.includes('Personal'));
});
