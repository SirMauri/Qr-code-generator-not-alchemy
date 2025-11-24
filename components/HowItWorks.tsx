import { Type, Palette, Download } from 'lucide-react'

interface Step {
  number: number
  icon: React.ReactNode
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: 1,
    icon: <Type className="w-8 h-8" />,
    title: 'Enter your URL or text',
    description: 'Type or paste the URL or text you want to encode into your QR code. It can be a website, contact info, or any text.',
  },
  {
    number: 2,
    icon: <Palette className="w-8 h-8" />,
    title: 'Customize colors and format',
    description: 'Choose your preferred colors using the color pickers and select your export format: PNG for digital use, SVG for printing, or JPG for smaller file sizes.',
  },
  {
    number: 3,
    icon: <Download className="w-8 h-8" />,
    title: 'Generate and download',
    description: 'Click the Generate button to create your QR code instantly, then download it in your chosen format. No watermarks, no sign-up, completely free.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-secondary/20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          How It Works
        </h2>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Create your custom QR code in three simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {steps.map((step, index) => (
          <div key={step.number} className="relative">
            {/* Connector line (hidden on mobile, shown on md+) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-16 left-[calc(50%+2rem)] w-[calc(100%-2rem)] h-0.5 bg-primary/20" />
            )}

            {/* Step content */}
            <div className="relative flex flex-col items-center text-center">
              {/* Step number */}
              <div className="w-16 h-16 rounded-full bg-primary text-background flex items-center justify-center text-2xl font-bold mb-4 relative z-10">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-background border-2 border-primary/20 text-primary flex items-center justify-center mb-4">
                {step.icon}
              </div>

              {/* Title and description */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
