import { Check } from 'lucide-react'

interface TrustSignal {
  text: string
}

const trustSignals: TrustSignal[] = [
  { text: 'No signup required' },
  { text: 'No watermarks added' },
  { text: 'Unlimited QR codes' },
  { text: 'Your data stays private' },
  { text: 'Free forever' },
  { text: 'Works offline after first load' },
]

export function TrustSignals() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trustSignals.map((signal, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-foreground/80"
          >
            <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="text-sm sm:text-base">{signal.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
