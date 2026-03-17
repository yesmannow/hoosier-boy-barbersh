import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CaretLeft, MapPin, Phone, Envelope, Clock, Globe, Star } from '@phosphor-icons/react'
import { shopProfile, contactInfo, barberProfiles, reviewHighlights, galleryItems, externalLinks } from '@/lib/adminData'

interface ShopProfileViewProps {
  onBack: () => void
}

export function ShopProfileView({ onBack }: ShopProfileViewProps) {
  const hours = [
    { day: 'Monday', hours: contactInfo.hours.monday },
    { day: 'Tuesday', hours: contactInfo.hours.tuesday },
    { day: 'Wednesday', hours: contactInfo.hours.wednesday },
    { day: 'Thursday', hours: contactInfo.hours.thursday },
    { day: 'Friday', hours: contactInfo.hours.friday },
    { day: 'Saturday', hours: contactInfo.hours.saturday },
    { day: 'Sunday', hours: contactInfo.hours.sunday }
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <CaretLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Shop Profile & Content</h1>
            <p className="text-sm text-muted-foreground">Manage public-facing shop information</p>
          </div>
        </div>
        <Button size="sm">Edit Profile</Button>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Shop Identity</h3>
            <div className="flex gap-6">
              <img 
                src={shopProfile.logoImage} 
                alt="Logo" 
                className="w-24 h-24 object-contain bg-secondary rounded-lg p-2"
              />
              <div className="flex-1">
                <h4 className="text-xl font-bold text-foreground mb-1">{shopProfile.name}</h4>
                <p className="text-muted-foreground mb-3">{shopProfile.tagline}</p>
                <p className="text-sm text-muted-foreground">{shopProfile.about}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {shopProfile.trustBullets.map((bullet, i) => (
                <Badge key={i} variant="secondary">{bullet}</Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-1" />
                <div>
                  <p className="font-semibold text-foreground">Address</p>
                  <p className="text-sm text-muted-foreground">
                    {contactInfo.address}<br />
                    {contactInfo.city}, {contactInfo.state} {contactInfo.zip}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Phone</p>
                  <a href={`tel:${contactInfo.phone}`} className="text-sm text-primary hover:underline">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Envelope size={20} className="text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <a href={`mailto:${contactInfo.email}`} className="text-sm text-primary hover:underline">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Website</p>
                  <a href={contactInfo.websiteLink} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    {contactInfo.websiteLink}
                  </a>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Business Hours</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {hours.map(({ day, hours }) => (
                <div key={day} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <span className="font-semibold text-foreground">{day}</span>
                  <span className="text-sm text-muted-foreground">
                    {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Barber Public Profiles</h3>
            <div className="grid grid-cols-2 gap-4">
              {barberProfiles.map(barber => (
                <Card key={barber.id} className="p-4 border-border">
                  <h4 className="font-semibold text-foreground mb-1">{barber.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{barber.publicSummary}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {barber.publicSpecialties.map((specialty, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{specialty}</Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Edit Profile</Button>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center gap-2 mb-4">
              <Star size={20} className="text-primary" weight="fill" />
              <h3 className="text-lg font-semibold text-foreground">Review Highlights</h3>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div>
                <p className="text-3xl font-bold text-foreground">{reviewHighlights.rating.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">{reviewHighlights.reviewCount} reviews</p>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="flex flex-wrap gap-2">
                {reviewHighlights.themeTags.map((tag, i) => (
                  <Badge key={i} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {reviewHighlights.quotes.slice(0, 4).map(quote => (
                <Card key={quote.id} className="p-3 border-border bg-secondary/50">
                  <p className="text-sm text-foreground mb-2">&ldquo;{quote.text}&rdquo;</p>
                  <p className="text-xs text-muted-foreground">- {quote.author}</p>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Gallery Preview</h3>
            <div className="grid grid-cols-3 gap-4">
              {galleryItems.map(item => (
                <div key={item.id} className="relative group">
                  <img 
                    src={item.imagePath} 
                    alt={item.altText}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center p-4">
                    <p className="text-white font-semibold mb-1">{item.title}</p>
                    {item.featured && (
                      <Badge variant="secondary" className="text-xs">Featured</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">External Links</h3>
            <div className="grid grid-cols-2 gap-3">
              {externalLinks.map(link => (
                <Button key={link.id} variant="outline" className="justify-start" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <Globe size={16} className="mr-2" />
                    {link.label}
                  </a>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
