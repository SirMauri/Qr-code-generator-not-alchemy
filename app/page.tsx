import { QRGenerator } from '@/components/QRGenerator';
import { OliveBranch } from '@/components/OliveBranch';

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] relative overflow-hidden">
      {/* Decorative Olive Branches */}
      <OliveBranch
        className="absolute top-12 left-8 hidden lg:block"
        style={{ transform: 'rotate(-15deg)' }}
      />
      <OliveBranch
        className="absolute top-32 right-12 hidden lg:block"
        style={{ transform: 'rotate(25deg) scaleX(-1)' }}
      />
      <OliveBranch
        className="absolute bottom-24 left-16 hidden lg:block"
        style={{ transform: 'rotate(45deg)' }}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[hsl(var(--foreground))] leading-tight">
            Free QR Code Generator
          </h1>

          <div className="w-24 h-1 bg-[hsl(var(--accent))] mx-auto rounded-full" />

          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-lg md:text-xl text-[hsl(var(--foreground))] leading-relaxed opacity-90">
              Generate beautiful, customizable QR codes without any paywalls or limitations.
            </p>

            <p className="text-base md:text-lg text-[hsl(var(--foreground))] leading-relaxed opacity-75">
              Most QR code generators charge for basic features or watermark your codes.
              This tool is completely free because access to simple utilities should be universal.
              Customize colors, choose your format, and download instantly.
            </p>
          </div>
        </div>

        {/* QR Generator Component */}
        <QRGenerator />

        {/* Footer Note */}
        <div className="max-w-2xl mx-auto text-center mt-16 md:mt-20">
          <p className="text-sm text-[hsl(var(--foreground))] opacity-60 leading-relaxed">
            Open source and ad-free. Built with care for everyone who needs a simple, reliable QR code generator.
          </p>
        </div>
      </main>
    </div>
  );
}
