import { QRGenerator } from '@/components/QRGenerator';
import { OliveBranch } from '@/components/OliveBranch';
import { CollaborationCredit } from '@/components/CollaborationCredit';
import { AnimatedSection, AnimatedOliveBranch } from '@/components/AnimatedSection';
import { TrustSignals } from '@/components/TrustSignals';
import { HowItWorks } from '@/components/HowItWorks';
import { UseCases } from '@/components/UseCases';
import { FAQSection } from '@/components/FAQSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] relative overflow-hidden">
      {/* Decorative Olive Branches */}
      <AnimatedOliveBranch
        delay={0.2}
        className="absolute top-12 left-8 hidden lg:block"
        style={{ transform: 'rotate(-15deg)' }}
      >
        <OliveBranch />
      </AnimatedOliveBranch>
      <AnimatedOliveBranch
        delay={0.3}
        className="absolute top-32 right-12 hidden lg:block"
        style={{ transform: 'rotate(25deg) scaleX(-1)' }}
      >
        <OliveBranch />
      </AnimatedOliveBranch>
      <AnimatedOliveBranch
        delay={0.4}
        className="absolute bottom-24 left-16 hidden lg:block"
        style={{ transform: 'rotate(45deg)' }}
      >
        <OliveBranch />
      </AnimatedOliveBranch>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 relative z-10">
        {/* Header Section */}
        <AnimatedSection delay={0.1} className="max-w-3xl mx-auto text-center mb-6 sm:mb-8 md:mb-12 space-y-2.5 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[hsl(var(--foreground))] leading-tight px-2">
            Free QR Code Generator
          </h1>

          <p className="text-xs sm:text-sm text-[hsl(var(--foreground))] opacity-60 px-2">
            made with love by{' '}
            <a
              href="https://not-alchemy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors underline decoration-dotted underline-offset-2"
            >
              not-alchemy.com
            </a>
          </p>

          <div className="w-16 sm:w-20 h-0.5 bg-[hsl(var(--accent))] mx-auto rounded-full" />

          <div className="max-w-2xl mx-auto space-y-2 px-2">
            <p className="text-sm sm:text-base md:text-lg text-[hsl(var(--foreground))] leading-relaxed opacity-90">
              Generate beautiful, customizable QR codes without any paywalls or limitations.
            </p>

            <p className="text-xs sm:text-sm md:text-base text-[hsl(var(--foreground))] leading-relaxed opacity-75">
              Most QR code generators charge for basic features or watermark your codes.
              This tool is completely free because access to simple utilities should be universal.
              Customize colors, choose your format, and download instantly.
            </p>
          </div>
        </AnimatedSection>

        {/* QR Generator Component */}
        <AnimatedSection delay={0.3}>
          <QRGenerator />
        </AnimatedSection>

        {/* Trust Signals */}
        <AnimatedSection delay={0.4}>
          <TrustSignals />
        </AnimatedSection>

        {/* How It Works Section */}
        <AnimatedSection delay={0.5}>
          <HowItWorks />
        </AnimatedSection>

        {/* Use Cases Section */}
        <AnimatedSection delay={0.6}>
          <UseCases />
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection delay={0.7}>
          <FAQSection />
        </AnimatedSection>

        {/* Footer Note */}
        <AnimatedSection delay={0.8} className="max-w-2xl mx-auto text-center mt-6 sm:mt-8 md:mt-12 px-2 pb-20 sm:pb-4">
          <p className="text-xs sm:text-sm text-[hsl(var(--foreground))] opacity-60 leading-relaxed">
            Open source and ad-free. Built with care for everyone who needs a simple, reliable QR code generator.
          </p>
        </AnimatedSection>
      </main>

      {/* Collaboration Credit */}
      <CollaborationCredit />
    </div>
  );
}
