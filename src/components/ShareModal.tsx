import { useState } from 'react';
import {
  Check,
  Copy,
  Mail,
  MessageCircle,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import type { TranslationDictionary } from '../data/translations';
import type { ShareRecipient } from '../types/brand';
import {
  buildMailtoUrl,
  buildWhatsAppUrl,
  isValidWhatsAppPhone,
  validateEmail,
} from '../utils/brandRules';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationDictionary;
  initialScope: string;
}

export function ShareModal({
  isOpen,
  onClose,
  t,
  initialScope,
}: ShareModalProps) {
  const [channelTab, setChannelTab] = useState<'email' | 'whatsapp'>('email');
  const [scope, setScope] = useState<string>(initialScope || t.share.fullBrandBookScope);
  const [message, setMessage] = useState<string>(t.share.defaultMessage);

  const [nameInput, setNameInput] = useState('');
  const [contactInput, setContactInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const [recipients, setRecipients] = useState<ShareRecipient[]>([
    {
      id: 'seed-email-1',
      channel: 'email',
      name: 'Direção de Marca',
      contact: 'brand@flowgroup.pt',
    },
  ]);

  if (!isOpen) return null;

  const portalUrl =
    typeof window !== 'undefined' ? window.location.href : 'https://flowgroup.brand';

  const fullDispatchText = `${message}\n\n${t.share.assetScopeLabel}: ${scope}\nPortal: ${portalUrl}`;

  const emailRecipients = recipients.filter((r) => r.channel === 'email');
  const whatsappRecipients = recipients.filter((r) => r.channel === 'whatsapp');

  function handleAddRecipient(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    const trimmedContact = contactInput.trim();
    const trimmedName = nameInput.trim() || trimmedContact;

    if (channelTab === 'email') {
      if (!validateEmail(trimmedContact)) {
        setErrorMsg(t.share.invalidEmailError);
        return;
      }
    } else {
      if (!isValidWhatsAppPhone(trimmedContact)) {
        setErrorMsg(t.share.invalidPhoneError);
        return;
      }
    }

    setRecipients((prev) => [
      ...prev,
      {
        id: `${channelTab}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        channel: channelTab,
        name: trimmedName,
        contact: trimmedContact,
      },
    ]);
    setNameInput('');
    setContactInput('');
  }

  function removeRecipient(id: string) {
    setRecipients((prev) => prev.filter((r) => r.id !== id));
  }

  function handleCopySummary() {
    navigator.clipboard?.writeText(fullDispatchText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  }

  const mailtoHref = buildMailtoUrl(
    emailRecipients.map((r) => r.contact),
    `Flow Group Brand Book · ${scope}`,
    fullDispatchText
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-[#220046]/15 bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#220046]/10 px-6 py-5 bg-[#190036] text-white">
          <div>
            <h2 id="share-dialog-title" className="text-lg font-bold">
              {t.share.title}
            </h2>
            <p className="mt-1 text-xs text-[#D2CBE3]">{t.share.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.share.closeBtn}
            className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Scope & Message */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="share-scope-input"
                className="block text-xs font-semibold text-[#220046] mb-1.5"
              >
                {t.share.assetScopeLabel}
              </label>
              <input
                id="share-scope-input"
                type="text"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="w-full rounded-lg border border-[#220046]/20 bg-[#F8F7FA] px-3.5 py-2 text-xs font-medium text-[#220046] focus:border-[#220046] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="share-message-input"
                className="block text-xs font-semibold text-[#220046] mb-1.5"
              >
                {t.share.messageLabel}
              </label>
              <textarea
                id="share-message-input"
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-[#220046]/20 bg-white px-3.5 py-2 text-xs text-[#3A314C] focus:border-[#220046] focus:outline-none"
              />
            </div>
          </div>

          {/* Channel Tabs: Email vs WhatsApp */}
          <div className="flex items-center gap-1 rounded-lg bg-[#EBE8F2] p-1">
            <button
              type="button"
              onClick={() => {
                setChannelTab('email');
                setErrorMsg(null);
              }}
              className={`flex-1 inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                channelTab === 'email'
                  ? 'bg-white text-[#220046] shadow-sm'
                  : 'text-[#524866] hover:text-[#220046]'
              }`}
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              <span>
                {t.share.emailTab} ({emailRecipients.length})
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setChannelTab('whatsapp');
                setErrorMsg(null);
              }}
              className={`flex-1 inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                channelTab === 'whatsapp'
                  ? 'bg-white text-[#220046] shadow-sm'
                  : 'text-[#524866] hover:text-[#220046]'
              }`}
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>
                {t.share.whatsappTab} ({whatsappRecipients.length})
              </span>
            </button>
          </div>

          {/* Add Recipient Form */}
          <form onSubmit={handleAddRecipient} className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <input
                type="text"
                aria-label={t.share.recipientNamePlaceholder}
                placeholder={t.share.recipientNamePlaceholder}
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="sm:col-span-4 rounded-lg border border-[#220046]/20 px-3 py-2 text-xs text-[#220046] focus:border-[#220046] focus:outline-none"
              />
              <input
                type={channelTab === 'email' ? 'email' : 'tel'}
                aria-label={
                  channelTab === 'email'
                    ? t.share.emailPlaceholder
                    : t.share.phonePlaceholder
                }
                placeholder={
                  channelTab === 'email'
                    ? t.share.emailPlaceholder
                    : t.share.phonePlaceholder
                }
                value={contactInput}
                onChange={(e) => {
                  setContactInput(e.target.value);
                  setErrorMsg(null);
                }}
                className="sm:col-span-5 rounded-lg border border-[#220046]/20 px-3 py-2 text-xs text-[#220046] focus:border-[#220046] focus:outline-none"
              />
              <button
                type="submit"
                className="sm:col-span-3 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#220046] px-3 py-2 text-xs font-semibold text-white hover:bg-[#350B66] transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.share.addRecipientBtn}</span>
              </button>
            </div>
            {errorMsg && (
              <p role="alert" className="text-xs font-medium text-rose-700">
                {errorMsg}
              </p>
            )}
          </form>

          {/* Recipients List */}
          <div className="rounded-xl border border-[#220046]/12 bg-[#F8F7FA] p-4 space-y-2.5">
            {channelTab === 'email' ? (
              emailRecipients.length === 0 ? (
                <p className="text-xs text-[#5B526E]">{t.share.emptyRecipients}</p>
              ) : (
                emailRecipients.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-[#220046]/10"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#220046] truncate">
                        {r.name}
                      </div>
                      <div className="text-xs font-specs text-[#5B526E] truncate">
                        {r.contact}
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${r.name}`}
                      onClick={() => removeRecipient(r.id)}
                      className="text-[#6E6482] hover:text-rose-700 p-1 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                ))
              )
            ) : whatsappRecipients.length === 0 ? (
              <p className="text-xs text-[#5B526E]">{t.share.emptyRecipients}</p>
            ) : (
              whatsappRecipients.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-[#220046]/10"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#220046] truncate">
                      {r.name}
                    </div>
                    <div className="text-xs font-specs text-[#5B526E] truncate">
                      {r.contact}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={buildWhatsAppUrl(r.contact, fullDispatchText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors"
                    >
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{t.share.openWhatsAppBtn}</span>
                    </a>
                    <button
                      type="button"
                      aria-label={`Remove ${r.name}`}
                      onClick={() => removeRecipient(r.id)}
                      className="text-[#6E6482] hover:text-rose-700 p-1 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Dispatch Actions */}
        <div className="border-t border-[#220046]/10 px-6 py-4 bg-white flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#220046]/20 px-3.5 py-2 text-xs font-semibold text-[#220046] hover:bg-[#F3F0F9] transition-colors cursor-pointer"
          >
            {copiedSummary ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                <span>{t.share.copiedPackMsg}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.share.copySharePackBtn}</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2.5">
            {channelTab === 'email' && emailRecipients.length > 0 && (
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 rounded-lg bg-[#220046] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#350B66] transition-colors"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.share.sendEmailBtn}</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#220046]/15 px-4 py-2.5 text-xs font-semibold text-[#4A415C] hover:text-[#220046] cursor-pointer"
            >
              {t.share.closeBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
