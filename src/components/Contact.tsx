import React, { useState } from 'react';

import mapImage from '../assets/nairobi-map.png';
import globalStyles from '../styles/components.module.css';
import styles from './Contact.module.css';

/**
 * ContactFinal – a refined contact section for Jambo Logistics.
 *
 * This component focuses on a clear split between the enquiry form and
 * the company contact details. It introduces a micro‑CTA for callback
 * requests, a couple of mini facts to subtly reinforce trust, and
 * ensures all interactive states are accessible and keyboard friendly.
 */
const ContactFinal: React.FC = () => {
  // Main enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Callback request modal state
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [callbackNumber, setCallbackNumber] = useState('');
  const [callbackMessage, setCallbackMessage] = useState<'idle' | 'sent' | 'error'>('idle');

  const services = [
    'Paketversand',
    'Containertransport',
    'Fahrzeugversand',
    'Sonstiges'
  ];

  /**
   * Generic change handler for both text inputs and selects.
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Submit handler for the main enquiry form.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      // Simulate sending the enquiry to the backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Opens the callback request modal.
   */
  const openCallbackModal = () => {
    setIsCallbackOpen(true);
    setCallbackMessage('idle');
  };

  /**
   * Handles sending a callback request. In a real application this
   * would forward the provided number to customer support. Here we
   * simulate an asynchronous request.
   */
  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackNumber) return;
    setCallbackMessage('idle');
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log('Callback requested:', callbackNumber);
      setCallbackMessage('sent');
      setCallbackNumber('');
    } catch (error) {
      console.error('Callback error:', error);
      setCallbackMessage('error');
    }
  };

  return (
    <section id="contact" className={`${styles.contact} section`}>
      <div className={`${styles.container} container`}>
        {/* Header */}
        <div className={styles.header} data-aos="fade-up">
          <h2 className={globalStyles.sectionTitle}>Kontakt aufnehmen</h2>
          <p className={styles.subtitle}>
            Bereit für Ihren Transport nach Kenia? Kontaktieren Sie uns für ein
            unverbindliches Angebot.
          </p>
        </div>

        {/* Grid layout: form and contact info */}
        <div className={styles.content}>
          {/* Left: Enquiry form */}
          <div className={styles.formSection} data-aos="fade-right">
            <div className={styles.formContainer}>
              {/* Micro CTA */}
              <div className={styles.microCta}>
                <p className={styles.microCtaText}>Du hast Fragen zum Versand?</p>
                <button
                  type="button"
                  onClick={openCallbackModal}
                  className={`${globalStyles.buttonSecondary} ${styles.microCtaButton}`}
                  aria-label="Rückruf anfragen"
                >
                  Jetzt Rückruf anfragen
                </button>
              </div>
              <h3 className={styles.formTitle}>Anfrage senden</h3>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                      placeholder="Ihr vollständiger Name"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>E‑Mail *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                      placeholder="ihre@email.de"
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>Telefon</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="+49 123 456 789"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="service" className={styles.label}>Service</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className={styles.select}
                    >
                      <option value="">Service auswählen</option>
                      {services.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Nachricht *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className={styles.textarea}
                    placeholder="Beschreiben Sie Ihre Anfrage..."
                  />
                </div>
                {/* Submission feedback */}
                {submitStatus === 'success' && (
                  <div className={styles.successMessage}>
                    ✅ Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className={styles.errorMessage}>
                    ❌ Es gab einen Fehler beim Senden. Bitte versuchen Sie es erneut.
                  </div>
                )}
                <div className={styles.formActions}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${globalStyles.buttonPrimary} ${styles.submitButton}`}
                  >
                    {isSubmitting ? 'Wird gesendet...' : 'Anfrage senden'}
                  </button>
                </div>
              </form>
              {/* Mini Facts */}
              <div className={styles.miniFacts}>
                <div className={styles.fact}>
                  <span className={styles.factIcon}>📦</span>
                  <p className={styles.factText}>Mehr als 1000 Pakete sicher versendet</p>
                </div>
                <div className={styles.fact}>
                  <span className={styles.factIcon}>🇩🇪↔🇰🇪</span>
                  <p className={styles.factText}>Täglicher Support aus Essen & Nairobi</p>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Direct contact information */}
          <div className={styles.infoSection} data-aos="fade-left">
            <div className={styles.infoContainer}>
              <h3 className={styles.infoTitle}>Direkter Kontakt</h3>
              <div className={styles.contactMethods}>
                <button
                  onClick={() => {
                    const message = formData.name
                      ? `Hallo! Ich bin ${formData.name} und interessiere mich für ${formData.service || 'Ihre Services'}. ${formData.message || 'Können Sie mir mehr Informationen geben?'}`
                      : 'Hallo! Ich interessiere mich für Ihre Logistik-Services. Können Sie mir mehr Informationen geben?';
                    const encodedMessage = encodeURIComponent(message);
                    window.open(`https://wa.me/491234567890?text=${encodedMessage}`, '_blank', 'noopener noreferrer');
                  }}
                  className={`${styles.contactMethod} ${styles.whatsappMethod}`}
                >
                  <div className={styles.methodIcon}><span role="img" aria-hidden="true">📱</span></div>
                  <div className={styles.methodContent}>
                    <h4 className={styles.methodTitle}>WhatsApp</h4>
                    <p className={styles.methodDescription}>Schnelle Antwort garantiert</p>
                    <span className={styles.methodAction}>Jetzt chatten →</span>
                  </div>
                </button>
                <a
                  href="mailto:kontakt@jambologistics.com"
                  className={`${styles.contactMethod} ${styles.emailMethod}`}
                >
                  <div className={styles.methodIcon}><span role="img" aria-hidden="true">✉️</span></div>
                  <div className={styles.methodContent}>
                    <h4 className={styles.methodTitle}>E‑Mail</h4>
                    <p className={styles.methodDescription}>kontakt@jambologistics.com</p>
                    <span className={styles.methodAction}>E‑Mail senden →</span>
                  </div>
                </a>
                <div className={`${styles.contactMethod} ${styles.phoneMethod}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => window.open('tel:+49123456789', '_self')}
                  onKeyPress={e => {
                    if (e.key === 'Enter') window.open('tel:+49123456789', '_self');
                  }}
                >
                  <div className={styles.methodIcon}><span role="img" aria-hidden="true">📞</span></div>
                  <div className={styles.methodContent}>
                    <h4 className={styles.methodTitle}>Telefon</h4>
                    <p className={styles.methodDescription}>Mo–Fr: 9:00 – 18:00 Uhr</p>
                    <span className={styles.methodAction}>+49&nbsp;123&nbsp;456&nbsp;789</span>
                  </div>
                </div>
              </div>
              <div className={styles.responseTime}>
                <div className={styles.responseIcon}><span role="img" aria-hidden="true">⚡</span></div>
                <div className={styles.responseContent}>
                  <h4 className={styles.responseTitle}>Schnelle Antwort</h4>
                  <p className={styles.responseDescription}>Wir antworten innerhalb von 2 Stunden während der Geschäftszeiten.</p>
                </div>
              </div>
              {/* Tagline to reinforce trust */}
              <div className={styles.tagline}>
                <p>Jambo ist deine Brücke zwischen Deutschland &amp; Kenia – verlässlich, persönlich, schnell.</p>
              </div>
              {/* Map */}
              <div className={styles.mapContainer} data-aos="zoom-in" data-aos-delay="200">
                <div className={styles.mapHeader}>
                  <h4 className={styles.mapTitle}>Unsere Route</h4>
                  <p className={styles.mapDescription}>Direkte Verbindung Deutschland → Kenia</p>
                </div>
                <div className={styles.mapImageContainer}>
                  <img
                    src={mapImage}
                    alt="Logistik‑Route von Deutschland nach Nairobi, Kenia"
                    className={styles.mapImage}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Callback Modal */}
        {isCallbackOpen && (
          <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="callbackTitle">
            <div className={styles.modalContent} data-aos="zoom-in">
              <h4 id="callbackTitle" className={styles.modalTitle}>Rückruf anfragen</h4>
              <p className={styles.modalDescription}>Bitte geben Sie Ihre Telefonnummer an. Wir rufen Sie schnellstmöglich zurück.</p>
              <form onSubmit={handleCallbackSubmit} className={styles.callbackForm}>
                <input
                  type="tel"
                  value={callbackNumber}
                  onChange={e => setCallbackNumber(e.target.value)}
                  required
                  className={styles.input}
                  placeholder="Ihre Telefonnummer"
                />
                {callbackMessage === 'sent' && (
                  <div className={styles.successMessage}>Danke! Wir melden uns in Kürze.</div>
                )}
                {callbackMessage === 'error' && (
                  <div className={styles.errorMessage}>Leider ist ein Fehler aufgetreten. Bitte erneut versuchen.</div>
                )}
                <div className={styles.modalActions}>
                  <button type="submit" className={`${globalStyles.buttonPrimary} ${styles.modalButton}`}>Abschicken</button>
                  <button
                    type="button"
                    onClick={() => setIsCallbackOpen(false)}
                    className={`${globalStyles.buttonSecondary} ${styles.modalButton}`}
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