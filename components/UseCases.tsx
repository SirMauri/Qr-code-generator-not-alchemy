import {
  Utensils,
  CreditCard,
  Ticket,
  Wifi,
  Link2,
  TrendingUp,
  Home,
  Heart
} from 'lucide-react'

interface UseCase {
  icon: React.ReactNode
  title: string
  description: string
}

const useCases: UseCase[] = [
  {
    icon: <Utensils className="w-6 h-6" />,
    title: 'Restaurant Menus',
    description: 'Share digital menus with customers instantly. Perfect for contactless ordering and menu updates.',
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Business Cards',
    description: 'Add QR codes to business cards to share contact info, websites, or portfolios instantly.',
  },
  {
    icon: <Ticket className="w-6 h-6" />,
    title: 'Event Ticketing',
    description: 'Generate QR codes for event tickets, check-ins, and attendee tracking.',
  },
  {
    icon: <Wifi className="w-6 h-6" />,
    title: 'WiFi Sharing',
    description: 'Share WiFi credentials easily with guests without revealing the password.',
  },
  {
    icon: <Link2 className="w-6 h-6" />,
    title: 'Payment Links',
    description: 'Share payment URLs for services, products, or donations quickly and securely.',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Marketing Campaigns',
    description: 'Track campaign performance by adding QR codes to print ads, posters, and packaging.',
  },
  {
    icon: <Home className="w-6 h-6" />,
    title: 'Real Estate Listings',
    description: 'Link property listings, virtual tours, and contact forms from print materials.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Wedding Invitations',
    description: 'Share wedding details, RSVPs, gift registries, and photo galleries easily.',
  },
]

export function UseCases() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Endless Possibilities
        </h2>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          From small businesses to personal projects, QR codes make sharing information effortless
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {useCases.map((useCase, index) => (
          <div
            key={index}
            className="group bg-background border border-foreground/10 rounded-lg p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              {useCase.icon}
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {useCase.title}
            </h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              {useCase.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
