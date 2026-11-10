import React from 'react';
import { Hero } from '../components/Hero';
import { WarrantyRateBanner } from '../components/WarrantyRateBanner';
import { PackagesSection } from '../components/PackagesSection';
import { ServicesSection } from '../components/ServicesSection';
import { PriceCalculator } from '../components/PriceCalculator';
import { BeforeAfterShowcase } from '../components/BeforeAfterShowcase';
import { ServiceCoverageMap } from '../components/ServiceCoverageMap';
import { SuccessStoriesSection } from '../components/SuccessStoriesSection';
import { FaqSection } from '../components/FaqSection';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { ReferNeighborSection } from '../components/ReferNeighborSection';
import { SocialSection } from '../components/SocialSection';
import { TrustCertificationsRibbon } from '../components/TrustCertificationsRibbon';
import { ServicePackage } from '../data/packagesData';
import { ScrollReveal } from '../components/ScrollAnimation';

interface HomePageProps {
  onOpenBooking: (initialService?: string, initialPackage?: string) => void;
  onSelectPackage: (pkg: ServicePackage) => void;
  onBookWithEstimate: (applianceId: string, issue: string, brand: string, price: number) => void;
  onSelectLocality: (localityName: string) => void;
  onOpenBookingWithReferral?: (referralCode: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenBooking,
  onSelectPackage,
  onBookWithEstimate,
  onSelectLocality,
  onOpenBookingWithReferral
}) => {
  const handleScrollToPackages = () => {
    const el = document.getElementById('packages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <Hero
        onOpenBooking={onOpenBooking}
        onExplorePackages={handleScrollToPackages}
      />

      {/* Trust & Certifications Ribbon */}
      <ScrollReveal direction="up" duration={0.55}>
        <TrustCertificationsRibbon
          onOpenBooking={() => onOpenBooking()}
        />
      </ScrollReveal>

      {/* 5,000+ Happy Customers & 6-Month Warranty with Proper Rate Banner */}
      <ScrollReveal direction="up" duration={0.6}>
        <WarrantyRateBanner
          onOpenBooking={() => onOpenBooking()}
        />
      </ScrollReveal>

      {/* Tiered Service Packages (Deep Cleaning, Health Check-up, Combos) */}
      <ScrollReveal direction="up" duration={0.65}>
        <PackagesSection
          onSelectPackage={onSelectPackage}
        />
      </ScrollReveal>

      {/* Core Services Section (Washing Machine ₹299, Fridge ₹399, AC ₹499, Microwave ₹249) */}
      <ScrollReveal direction="up" duration={0.65}>
        <ServicesSection
          onSelectService={(serviceId) => onOpenBooking(serviceId)}
        />
      </ScrollReveal>

      {/* Interactive Upfront Cost Calculator */}
      <ScrollReveal direction="up" duration={0.6}>
        <PriceCalculator
          onBookWithEstimate={onBookWithEstimate}
        />
      </ScrollReveal>

      {/* Real Before & After Service Results (11 Cases) */}
      <ScrollReveal direction="up" duration={0.65}>
        <BeforeAfterShowcase
          onBookService={(serviceName) => onOpenBooking('washing-machine')}
        />
      </ScrollReveal>

      {/* Bangalore Visual Service Coverage Map with Pulsing Pins */}
      <ScrollReveal direction="scale" duration={0.65}>
        <ServiceCoverageMap
          onSelectLocality={onSelectLocality}
        />
      </ScrollReveal>

      {/* Appliance Success Stories Section */}
      <ScrollReveal direction="up" duration={0.65}>
        <SuccessStoriesSection />
      </ScrollReveal>

      {/* Dedicated FAQ Section: 6-Month Warranty, Same-Day Scheduling, Genuine Parts */}
      <ScrollReveal direction="up" duration={0.6}>
        <FaqSection />
      </ScrollReveal>

      {/* Customer Testimonial Carousel from Bangalore Residents */}
      <ScrollReveal direction="up" duration={0.6}>
        <TestimonialCarousel onOpenBooking={onOpenBooking} />
      </ScrollReveal>

      {/* Refer an Apartment Neighbor Program (Give ₹150, Get ₹150) */}
      <ScrollReveal direction="up" duration={0.6}>
        <ReferNeighborSection onOpenBookingWithReferral={onOpenBookingWithReferral} />
      </ScrollReveal>

      {/* Official Social Media & Online Channels */}
      <ScrollReveal direction="up" duration={0.55}>
        <section className="py-14 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SocialSection />
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};
