// ---------------------------------------------------------
// Datei: Contact.tsx
// Zweck: Kontakt-Section mit Formular, Contact-Cards und Map
// Besonderheiten:
// - Kontaktformular mit Live-Validation und aria-invalid für A11y
// - 3 Contact-Cards (WhatsApp, E-Mail, Telefon) mit Icons
// - Callback-Request-Section für Rückruf-Anfragen
// - Nairobi-Map-Image für geografische Verortung
// - Responsive: Mobile 1-spaltig, Desktop 2-spaltig
// - Multi-Language Support via useLanguage() Hook
// Stand: 05.11.2025
// ---------------------------------------------------------

import React, {
  useId,
  useMemo,
  useState,
} from 'react';

import mapImage from '../assets/nairobi-map.png';
import { useLanguage } from '../contexts/language-context';
import globalStyles from '../styles/GlobalPolish.module.css';
import styles from './Contact.module.css';

type SubmitState = 'idle' | 'success' | 'error';
type CallbackState = 'idle' | 'sent' | 'error';

export interface ContactFinalProps {
  whatsappNumber?: string;
  email?: string;
  phone?: string;
  enableStickySidebar?: boolean;
  services?: string[];
}

const DEFAULT_SERVICES_DE = ['Paketversand', 'Containertransport', 'Fahrzeugversand', 'Sonstiges'];

const ContactFinal: React.FC<ContactFinalProps> = ({
  whatsappNumber = '491234567890',
  email = 'kontakt@jambologistics.com',
  phone = '+49 123 456 789',
  enableStickySidebar = true,
  services = DEFAULT_SERVICES_DE,
}) => {
  const { translations: t } = useLanguage();

  // ---------------------------
  // Form- und UI-State
  // ---------------------------
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitState>('idle');

  // Rückruf-Modal
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [callbackNumber, setCallbackNumber] = useState('');
  const [callbackMessage, setCallbackMessage] = useState<CallbackState>('idle');

  // Eindeutige IDs für Labels/Fehlermeldungen (mehrfacher Einsatz sicher)
  const baseId = useId();
  const ids = useMemo(
    () => ({
      name: `${baseId}-name`,
      email: `${baseId}-email`,
      phone: `${baseId}-phone`,
      service: `${baseId}-service`,
      message: `${baseId}-message`,
      formStatus: `${baseId}-formStatus`,
      cbTitle: `${baseId}-callbackTitle`,
      cbStatus: `${baseId}-callbackStatus`,
    }),
    [baseId]
  );

  // ---------------------------
  // Simple Validation (jetzt mit translations)
  // ---------------------------
  const errors = useMemo(() => {
    const e: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.name.trim()) e.name = t.contact.form.name.error;
    if (!formData.email.trim()) e.email = t.contact.form.email.error;
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) e.email = t.contact.form.email.errorInvalid;
    if (!formData.message.trim()) e.message = t.contact.form.message.error;
    return e;
  }, [formData, t]);

  const isValid = Object.keys(errors).length === 0;

  // ---------------------------
  // Handler
  // ---------------------------
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const markTouched = (name: string) => setTouched((p) => ({ ...p, [name]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Pflichtfelder markieren, damit Fehlermeldungen erscheinen
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      // TODO: später echte API (Formspree / Custom) anbinden
      await new Promise((r) => setTimeout(r, 900));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTouched({});
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openCallbackModal = () => {
    setIsCallbackOpen(true);
    setCallbackMessage('idle');
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackNumber.trim()) {
      setCallbackMessage('error');
      return;
    }
    setCallbackMessage('idle');
    try {
      await new Promise((r) => setTimeout(r, 800));
      setCallbackMessage('sent');
      setCallbackNumber('');
    } catch {
      setCallbackMessage('error');
    }
  };

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <section id="contact" className="section section--alt">
      <div className="container">
        {/* Kopfbereich */}
        <header className={styles.header} data-aos="fade-up">
          <h2 className={globalStyles.sectionTitle}>{t.contact.title}</h2>
          <p className={styles.subtitle}>{t.contact.subtitle}</p>
        </header>

        {/* Grid: Formular | Divider | Info */}
        <div className={styles.content}>
          {/* FORMULAR */}
          <section className={styles.formSection} aria-label="Kontaktformular" data-aos="fade-right">
            <div className={styles.formContainer}>
              {/* Micro-CTA */}
              <div className={styles.microCta}>
                <p className={styles.microCtaText}>{t.services.cta.title}</p>
                <button
                  type="button"
                  onClick={openCallbackModal}
                  className={`${globalStyles.button} ${globalStyles['button--secondary']} ${globalStyles['is-md']} ${styles.microCtaButton}`}
                  aria-label={t.contact.callback.button}
                >
                  {t.contact.callback.button}
                </button>
              </div>

              <h3 className={styles.formTitle}>{t.contact.form.submit}</h3>

              <form
                onSubmit={handleSubmit}
                className={styles.form}
                noValidate
                aria-describedby={ids.formStatus}
              >
                {/* Row 1 */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor={ids.name} className={styles.label}>{t.contact.form.name.label} *</label>
                    <input
                      type="text"
                      id={ids.name}
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={() => markTouched('name')}
                      required
                      className={styles.input}
                      placeholder={t.contact.form.name.placeholder}
                      autoComplete="name"
                      aria-invalid={touched.name && !!errors.name}
                      aria-describedby={touched.name && errors.name ? `${ids.name}-err` : undefined}
                    />
                    {touched.name && errors.name && (
                      <span id={`${ids.name}-err`} className={styles.errorInline} role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor={ids.email} className={styles.label}>{t.contact.form.email.label} *</label>
                    <input
                      type="email"
                      id={ids.email}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={() => markTouched('email')}
                      required
                      className={styles.input}
                      placeholder={t.contact.form.email.placeholder}
                      autoComplete="email"
                      inputMode="email"
                      aria-invalid={touched.email && !!errors.email}
                      aria-describedby={touched.email && errors.email ? `${ids.email}-err` : undefined}
                    />
                    {touched.email && errors.email && (
                      <span id={`${ids.email}-err`} className={styles.errorInline} role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2 */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor={ids.phone} className={styles.label}>{t.contact.form.phone.label}</label>
                    <input
                      type="tel"
                      id={ids.phone}
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder={t.contact.form.phone.placeholder}
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor={ids.service} className={styles.label}>{t.contact.form.service.label}</label>
                    <select
                      id={ids.service}
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className={styles.select}
                    >
                      <option value="">{t.contact.form.service.placeholder}</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Nachricht */}
                <div className={styles.formGroup}>
                  <label htmlFor={ids.message} className={styles.label}>{t.contact.form.message.label} *</label>
                  <textarea
                    id={ids.message}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={() => markTouched('message')}
                    required
                    className={styles.textarea}
                    placeholder={t.contact.form.message.placeholder}
                    aria-invalid={touched.message && !!errors.message}
                    aria-describedby={touched.message && errors.message ? `${ids.message}-err` : undefined}
                  />
                  {touched.message && errors.message && (
                    <span id={`${ids.message}-err`} className={styles.errorInline} role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Status */}
                <div id={ids.formStatus} className={styles.statusRegion} aria-live="polite">
                  {submitStatus === 'success' && (
                    <div className={styles.successMessage}>✅ {t.contact.success}</div>
                  )}
                  {submitStatus === 'error' && (
                    <div className={styles.errorMessage}>❌ {t.contact.error}</div>
                  )}
                </div>

                {/* CTA */}
                <div className={styles.formActions}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${globalStyles.button} ${globalStyles['button--primary']} ${globalStyles['is-md']} ${styles.submitButton}`}
                  >
                    {isSubmitting ? t.contact.form.submitting : t.contact.form.submit}
                  </button>
                </div>
              </form>

              {/* Social Proof */}
              <figure className={styles.quoteCard}>
                <p>„Ich habe mein Paket sicher nach Nairobi geschickt – und wurde persönlich betreut. Danke Jambo!“</p>
                <figcaption>– Amina M., Berlin → Nairobi</figcaption>
              </figure>
            </div>
          </section>

          {/* Divider */}
          <div className={styles.verticalDivider} aria-hidden="true" />

          {/* SIDEBAR */}
          <aside
            className={styles.infoSection}
            aria-label="Direkter Kontakt & Route"
            data-aos="fade-left"
            data-sticky={enableStickySidebar ? 'true' : 'false'}
          >
            <div className={styles.infoContainer}>
              <h3 className={styles.infoTitle}>Direkter Kontakt</h3>

              <div className={styles.contactMethods}>
                {/* WhatsApp */}
                <button
                  type="button"
                  onClick={() => {
                    const message = formData.name
                      ? `Hallo! Ich bin ${formData.name} und interessiere mich für ${formData.service || 'Ihre Services'}. ${
                          formData.message || 'Können Sie mir mehr Informationen geben?'
                        }`
                      : 'Hallo! Ich interessiere mich für Ihre Logistik-Services. Können Sie mir mehr Informationen geben?';
                    const encodedMessage = encodeURIComponent(message);
                    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
                  }}
                  className={`${styles.contactMethod} ${styles.whatsappMethod}`}
                  aria-label="WhatsApp-Chat öffnen"
                >
                  <div className={styles.methodIcon}><span aria-hidden="true">📱</span></div>
                  <div className={styles.methodContent}>
                    <h4 className={styles.methodTitle}>WhatsApp</h4>
                    <p className={styles.methodDescription}>Schnelle Antwort garantiert</p>
                    <span className={styles.methodAction}>Jetzt chatten →</span>
                  </div>
                </button>

                {/* E-Mail */}
                <a
                  href={`mailto:${email}`}
                  className={`${styles.contactMethod} ${styles.emailMethod}`}
                  aria-label={`E‑Mail senden an ${email}`}
                  rel="noopener noreferrer"
                >
                  <div className={styles.methodIcon}><span aria-hidden="true">✉️</span></div>
                  <div className={styles.methodContent}>
                    <h4 className={styles.methodTitle}>E‑Mail</h4>
                    <p className={styles.methodDescription}>{email}</p>
                    <span className={styles.methodAction}>E‑Mail senden →</span>
                  </div>
                </a>

                {/* Telefon */}
                <div
                  className={`${styles.contactMethod} ${styles.phoneMethod}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => window.open(`tel:${phone.replace(/\s/g, '')}`, '_self')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      window.open(`tel:${phone.replace(/\s/g, '')}`, '_self');
                    }
                  }}
                  aria-label="Telefonnummer anrufen"
                >
                  <div className={styles.methodIcon}><span aria-hidden="true">📞</span></div>
                  <div className={styles.methodContent}>
                    <h4 className={styles.methodTitle}>Telefon</h4>
                    <p className={styles.methodDescription}>Mo–Fr: 9:00 – 18:00 Uhr</p>
                    <span className={styles.methodAction}>{phone}</span>
                  </div>
                </div>
              </div>

              {/* Antwortzeit */}
              <div className={styles.responseTime}>
                <div className={styles.responseIcon}><span aria-hidden="true">⚡</span></div>
                <div className={styles.responseContent}>
                  <h4 className={styles.responseTitle}>Schnelle Antwort</h4>
                  <p className={styles.responseDescription}>Wir antworten innerhalb von 2 Stunden während der Geschäftszeiten.</p>
                </div>
              </div>

              {/* Tagline */}
              <div className={styles.tagline}>
                <p>Jambo ist deine Brücke zwischen Deutschland &amp; Kenia – verlässlich, persönlich, schnell.</p>
              </div>

              {/* Karte */}
              <div className={styles.mapContainer} data-aos="zoom-in" data-aos-delay={200}>
                <div className={styles.mapHeader}>
                  <h4 className={styles.mapTitle}>Unsere Route</h4>
                  <p className={styles.mapDescription}>Direkte Verbindung Deutschland → Kenia</p>
                </div>
                <div className={styles.mapImageContainer}>
                  <img
                    src={mapImage}
                    alt="Logistik-Route von Deutschland nach Nairobi, Kenia"
                    className={styles.mapImage}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Rückruf-Modal */}
        {isCallbackOpen && (
          <div
            className={styles.modalOverlay}
            role="dialog"
            aria-modal="true"
            aria-labelledby={ids.cbTitle}
            onClick={() => setIsCallbackOpen(false)}
          >
            <div
              className={styles.modalContent}
              data-aos="zoom-in"
              onClick={(e) => e.stopPropagation()}
              role="document"
            >
              <h4 id={ids.cbTitle} className={styles.modalTitle}>Rückruf anfragen</h4>
              <p className={styles.modalDescription}>
                Bitte geben Sie Ihre Telefonnummer an. Wir rufen Sie schnellstmöglich zurück.
              </p>

              <form onSubmit={handleCallbackSubmit} className={styles.callbackForm} noValidate aria-describedby={ids.cbStatus}>
                <input
                  type="tel"
                  value={callbackNumber}
                  onChange={(e) => setCallbackNumber(e.target.value)}
                  required
                  className={styles.input}
                  placeholder="Ihre Telefonnummer"
                  autoComplete="tel"
                  inputMode="tel"
                  aria-label="Ihre Telefonnummer"
                />

                <div id={ids.cbStatus} className={styles.statusRegion} aria-live="polite">
                  {callbackMessage === 'sent' && <div className={styles.successMessage}>Danke! Wir melden uns in Kürze.</div>}
                  {callbackMessage === 'error' && <div className={styles.errorMessage}>Leider ist ein Fehler aufgetreten. Bitte erneut versuchen.</div>}
                </div>

                <div className={styles.modalActions}>
                  <button
                    type="submit"
                    className={`${globalStyles.button} ${globalStyles['button--primary']} ${globalStyles['is-md']} ${styles.modalButton}`}
                  >
                    Abschicken
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCallbackOpen(false)}
                    className={`${globalStyles.button} ${globalStyles['button--secondary']} ${globalStyles['is-md']} ${styles.modalButton}`}
                  >
                    Schließen
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactFinal;
