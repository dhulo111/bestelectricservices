import { AboutHero } from '@/components/public/about/AboutHero';
import { CompanyIntro } from '@/components/public/about/CompanyIntro';
import { CorePhilosophy } from '@/components/public/about/CorePhilosophy';
import { QualityAndWorkmanship } from '@/components/public/about/QualityAndWorkmanship';
import { ResidentialFocus } from '@/components/public/about/ResidentialFocus';
import { WhyCustomersCall } from '@/components/public/about/WhyCustomersCall';
import { ServiceProcess } from '@/components/public/home/ServiceProcess';
import { ContactCta } from '@/components/public/home/ContactCta';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name}`,
  description: `Learn about ${siteConfig.name}, our commitment to electrical safety, quality workmanship, and our professional team.`,
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyIntro />
      <CorePhilosophy />
      <QualityAndWorkmanship />
      <ResidentialFocus />
      <WhyCustomersCall />
      <ServiceProcess />
      <ContactCta />
    </>
  );
}
