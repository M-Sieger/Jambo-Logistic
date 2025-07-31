import Hero from './components/Hero';
import DefaultLayout from './layouts/DefaultLayout';

export default function App() {
  return (
    <DefaultLayout>
      <Hero
        headline="Von deiner Tür bis nach Nairobi."
        subline="Klar. Schnell. Für dich nach Kenia."
        ctaLabel="Jetzt anfragen"
        backgroundImage="/assets/hero-bg.jpg"
        onCTAClick={() => {
          const el = document.querySelector('#contact');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </DefaultLayout>
  );
}
