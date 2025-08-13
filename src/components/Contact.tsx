import React, { useState } from 'react';

import mapImage from '../assets/nairobi-map.png';
import globalStyles from '../styles/GlobalPolish.module.css';
import styles from './Contact.module.css';

/**
 * ContactFinal – Kontakt-Sektion (Modern Warm Africa, IVY-Polish)
 * B1-Regel: Section-Rahmen kommt global (.section + .container),
 * dieses Modul stylt nur das Innenleben (Grids, Cards, Micro-CTAs etc.).
 */
const ContactFinal: React.FC = () => {
  /* ------------------------------
   * Form- und UI-States
   * ------------------------------ */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Rückruf-Modal
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [callbackNumber, setCallbackNumber] = useState("");
  const [callbackMessage, setCallbackMessage] = useState<"idle" | "sent" | "error">("idle");

  // Services (Drop-down)
  const services = ["Paketversand", "Containertransport", "Fahrzeugversand", "Sonstiges"];

  /* ------------------------------
   * Handler
   * ------------------------------ */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Anfrage absenden (simuliert) – hier später API anbinden (Formspree/Custom)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openCallbackModal = () => {
    setIsCallbackOpen(true);
    setCallbackMessage("idle");
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackNumber) return;
    setCallbackMessage("idle");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setCallbackMessage("sent");
      setCallbackNumber("");
    } catch {
      setCallbackMessage("error");
    }
  };

  /* ------------------------------
   * Render
   * ------------------------------ */
  return (
    // 🌍 Globaler Section-Rahmen – sorgt für konsistenten vertikalen Rhythmus
    <section id="contact" className="section section--alt">
      <div className="container">
        {/* Kopfbereich */}
        <header className={styles.header} data-aos="fade-up">
          <h2 className={globalStyles.sectionTitle}>Kontakt aufnehmen</h2>
          <p className={styles.subtitle}>
            Bereit für Ihren Transport nach Kenia? Kontaktieren Sie uns für ein unverbindliches Angebot.
          </p>
        </header>

        {/* 3-Spalten-Layout: Formular | Divider | Kontaktinfos */}
        <div className={styles.content}>
          {/* Formularspalte */}
          <section className={styles.formSection} aria-label="Kontaktformular" data-aos="fade-right">
            <div className={styles.formContainer}>
              {/* Micro-CTA: Rückruf anfragen */}
              <div className={styles.microCta}>
                <p className={styles.microCtaText}>Du hast Fragen zum Versand?</p>
                <button
                  type="button"
                  onClick={openCallbackModal}
                 className={`${globalStyles.button} ${globalStyles["button--secondary"]} ${globalStyles["is-md"]} ${styles.microCtaButton}`}

                  aria-label="Rückruf anfragen"
                >
                  Jetzt Rückruf anfragen
                </button>
              </div>

              <h3 className={styles.formTitle}>Anfrage senden</h3>

              <form
                onSubmit={handleSubmit}
                className={styles.form}
                noValidate
                aria-describedby="contactFormStatus"
              >
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                      placeholder="Ihr vollständiger Name"
                      autoComplete="name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      E‑Mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                      placeholder="ihre@email.de"
                      autoComplete="email"
                      inputMode="email"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="+49 123 456 789"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="service" className={styles.label}>
                      Service
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className={styles.select}
                    >
                      <option value="">Service auswählen</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    Nachricht *
                  </label>
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

                {/* Live-Region für Sende-Status */}
                <div id="contactFormStatus" className={styles.statusRegion} aria-live="polite">
                  {submitStatus === "success" && (
                    <div className={styles.successMessage}>
                      ✅ Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className={styles.errorMessage}>
                      ❌ Es gab einen Fehler beim Senden. Bitte versuchen Sie es erneut.
                    </div>
                  )}
                </div>

                <div className={styles.formActions}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                  className={`${globalStyles.button} ${globalStyles["button--primary"]} ${globalStyles["is-md"]} ${styles.submitButton}`}

                  >
                    {isSubmitting ? "Wird gesendet..." : "Anfrage senden"}
                  </button>
                </div>
              </form>

              {/* Zitatkarte als vertrauensbildender Abschluss */}
              <figure className={styles.quoteCard}>
                <p>
                  „Ich habe mein Paket sicher nach Nairobi geschickt – und wurde persönlich betreut. Danke
                  Jambo!“
                </p>
                <figcaption>– Amina M., Berlin → Nairobi</figcaption>
              </figure>
            </div>
          </section>

          {/* Dotted-Gradient Divider */}
          <div className={styles.verticalDivider} aria-hidden="true"></div>

          {/* Kontaktinformationen */}
          <aside className={styles.infoSection} aria-label="Direkter Kontakt & Route" data-aos="fade-left">
            <div className={styles.infoContainer}>
              <h3 className={styles.infoTitle}>Direkter Kontakt</h3>

              <div className={styles.contactMethods}>
                {/* WhatsApp */}
                <button
                  type="button"
                  onClick={() => {
                    const message = formData.name
                      ? `Hallo! Ich bin ${formData.name} und interessiere mich für ${formData.service || "Ihre Services"}. ${
                          formData.message || "Können Sie mir mehr Informationen geben?"
                        }`
                      : "Hallo! Ich interessiere mich für Ihre Logistik-Services. Können Sie mir mehr Informationen geben?";
                    const encodedMessage = encodeURIComponent(message);
                    window.open(
                      `https://wa.me/491234567890?text=${encodedMessage}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                  className={`${styles.contactMethod} ${styles.whatsappMethod}`}
                  aria-label="WhatsApp-Chat öffnen"
                >
                  <div className={styles.methodIcon}>
                    <span aria-hidden="true">📱</span>
                  </div>
                  <div className={styles.methodContent}>
                    <h4 className={styles.methodTitle}>WhatsApp</h4>
                    <p className={styles.methodDescription}>Schnelle Antwort garantiert</p>
                    <span className={styles.methodAction}>Jetzt chatten →</span>
                  </div>
                </button>

                {/* E-Mail */}
                <a
                  href="mailto:kontakt@jambologistics.com"
                  className={`${styles.contactMethod} ${styles.emailMethod}`}
                  aria-label="E‑Mail senden an kontakt@jambologistics.com"
                >
                  <div className={styles.methodIcon}>
                    <span aria-hidden="true">✉️</span>
                  </div>
                  <div className={styles.methodContent}>
                    <h4 className={styles.methodTitle}>E‑Mail</h4>
                    <p className={styles.methodDescription}>kontakt@jambologistics.com</p>
                    <span className={styles.methodAction}>E‑Mail senden →</span>
                  </div>
                </a>

                {/* Telefon */}
                <div
                  className={`${styles.contactMethod} ${styles.phoneMethod}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => window.open("tel:+49123456789", "_self")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      window.open("tel:+49123456789", "_self");
                    }
                  }}
                  aria-label="Telefonnummer anrufen"
                >
                  <div className={styles.methodIcon}>
                    <span aria-hidden="true">📞</span>
                  </div>
                  <div className={styles.methodContent}>
                    <h4 className={styles.methodTitle}>Telefon</h4>
                    <p className={styles.methodDescription}>Mo–Fr: 9:00 – 18:00 Uhr</p>
                    <span className={styles.methodAction}>+49&nbsp;123&nbsp;456&nbsp;789</span>
                  </div>
                </div>
              </div>

              {/* Antwortzeit */}
              <div className={styles.responseTime}>
                <div className={styles.responseIcon}>
                  <span aria-hidden="true">⚡</span>
                </div>
                <div className={styles.responseContent}>
                  <h4 className={styles.responseTitle}>Schnelle Antwort</h4>
                  <p className={styles.responseDescription}>
                    Wir antworten innerhalb von 2 Stunden während der Geschäftszeiten.
                  </p>
                </div>
              </div>

              {/* Tagline */}
              <div className={styles.tagline}>
                <p>Jambo ist deine Brücke zwischen Deutschland &amp; Kenia – verlässlich, persönlich, schnell.</p>
              </div>

              {/* Route-Karte */}
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
            aria-labelledby="callbackTitle"
            onClick={() => setIsCallbackOpen(false)}
          >
            <div
              className={styles.modalContent}
              data-aos="zoom-in"
              onClick={(e) => e.stopPropagation()}
              role="document"
            >
              <h4 id="callbackTitle" className={styles.modalTitle}>
                Rückruf anfragen
              </h4>
              <p className={styles.modalDescription}>
                Bitte geben Sie Ihre Telefonnummer an. Wir rufen Sie schnellstmöglich zurück.
              </p>

              <form onSubmit={handleCallbackSubmit} className={styles.callbackForm} noValidate>
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

                <div className={styles.statusRegion} aria-live="polite">
                  {callbackMessage === "sent" && (
                    <div className={styles.successMessage}>Danke! Wir melden uns in Kürze.</div>
                  )}
                  {callbackMessage === "error" && (
                    <div className={styles.errorMessage}>
                      Leider ist ein Fehler aufgetreten. Bitte erneut versuchen.
                    </div>
                  )}
                </div>

                <div className={styles.modalActions}>
                 <button
  type="submit"
  className={`${globalStyles.button} ${globalStyles["button--primary"]} ${globalStyles["is-md"]} ${styles.modalButton}`}
>

                    Abschicken
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCallbackOpen(false)}
                    className={`${globalStyles.button} ${globalStyles["button--secondary"]} ${globalStyles["is-md"]} ${styles.modalButton}`}

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
