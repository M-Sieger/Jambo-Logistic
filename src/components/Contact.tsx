import React, { useState } from 'react';
import styles from './Contact.module.css';
import globalStyles from '../styles/components.module.css';
import mapImage from '../assets/nairobi-map.png';

interface ContactProps {
  whatsappUrl?: string;
  email?: string;
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const Contact: React.FC<ContactProps> = ({
  whatsappUrl = 'https://wa.me/491234567890',
  email = 'kontakt@jambologistics.com',
  className = ''
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = [
    'Paketversand',
    'Containertransport',
    'Fahrzeugversand',
    'Sonstiges'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real application, you would send the data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = formData.name 
      ? `Hallo! Ich bin ${formData.name} und interessiere mich für ${formData.service || 'Ihre Services'}. ${formData.message || 'Können Sie mir mehr Informationen geben?'}`
      : 'Hallo! Ich interessiere mich für Ihre Logistik-Services. Können Sie mir mehr Informationen geben?';
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`${whatsappUrl}?text=${encodedMessage}`, '_blank', 'noopener noreferrer');
  };

  return (
    <section id="contact" className={`${styles.contact} ${className} section`}>
      <div className={`${styles.container} container`}>
        <div className={styles.header} data-aos="fade-up">
          <h2 className={globalStyles.sectionTitle}>
            Kontakt aufnehmen
          </h2>
          <p className={styles.subtitle}>
            Bereit für Ihren Transport nach Kenia? Kontaktieren Sie uns für ein unverbindliches Angebot.
          </p>
        </div>

        <div className={styles.content}>
          {/* Contact Form */}
          <div className={styles.formSection} data-aos="fade-right">
            <div className={styles.formContainer}>
              <h3 className={styles.formTitle}>Anfrage senden</h3>
              
              <form onSubmit={handleSubmit} className={styles.form}>
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
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      E-Mail *
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
            </div>
          </div>

          {/* Contact Info */}
          <div className={styles.infoSection} data-aos="fade-left">
            <div className={styles.infoContainer}>
              <h3 className={styles.infoTitle}>Direkter Kontakt</h3>
              
              <div className={styles.contactMethods}>
                <button
                  onClick={handleWhatsAppClick}
                  className={`${styles.contactMethod} ${styles.whatsappMethod}`}
                >
                  <div className={styles.methodIcon}>
                    <span>📱</span>
                  </div>
                  <div className={styles.methodContent}>
                    <h4 className={styles.methodTitle}>WhatsApp</h4>
                    <p className={styles.methodDescription}>
                      Schnelle Antwort garantiert
                    </p>
                    <span className={styles.methodAction}>Jetzt chatten →</span>
                  </div>
                </button>

                <a
                  href={`mailto:${email}`}
                  className={`${styles.contactMethod} ${styles.emailMethod}`}
                >
                  <div className={styles.methodIcon}>
                    <span>✉️</span>
                  </div>
                  <div className={styles.methodContent}>
                    <h4 className={styles.methodTitle}>E-Mail</h4>
                    <p className={styles.methodDescription}>
                      {email}
                    </p>
                    <span className={styles.methodAction}>E-Mail senden →</span>
                  </div>
                </a>

                <div className={`${styles.contactMethod} ${styles.phoneMethod}`}>
                  <div className={styles.methodIcon}>
                    <span>📞</span>
                  </div>
                  <div className={styles.methodContent}>
                    <h4 className={styles.methodTitle}>Telefon</h4>
                    <p className={styles.methodDescription}>
                      Mo-Fr: 9:00 - 18:00 Uhr
                    </p>
                    <span className={styles.methodAction}>+49 123 456 789</span>
                  </div>
                </div>
              </div>

              <div className={styles.responseTime}>
                <div className={styles.responseIcon}>⚡</div>
                <div className={styles.responseContent}>
                  <h4 className={styles.responseTitle}>Schnelle Antwort</h4>
                  <p className={styles.responseDescription}>
                    Wir antworten innerhalb von 2 Stunden während der Geschäftszeiten.
                  </p>
                </div>
              </div>

              {/* Route Map */}
              <div className={styles.mapContainer} data-aos="zoom-in" data-aos-delay="200">
                <div className={styles.mapHeader}>
                  <h4 className={styles.mapTitle}>Unsere Route</h4>
                  <p className={styles.mapDescription}>
                    Direkte Verbindung Deutschland → Kenia
                  </p>
                </div>
                <div className={styles.mapImageContainer}>
                  <img 
                    src={mapImage} 
                    alt="Logistik-Route von Deutschland nach Nairobi, Kenia"
                    className={styles.mapImage}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

