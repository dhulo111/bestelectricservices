import { HeroSection } from '@/components/public/home/HeroSection';
import { ServicesOverview } from '@/components/public/home/ServicesOverview';
import { WhyChooseUs } from '@/components/public/home/WhyChooseUs';
import { Testimonials } from '@/components/public/home/Testimonials';
import { ContactCta } from '@/components/public/home/ContactCta';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <WhyChooseUs />
      <Testimonials />
      <ContactCta />
    </>
  );
}
