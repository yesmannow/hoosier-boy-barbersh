import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { contactInfo, shopProfile, galleryItems, externalLinks } from '@/lib/adminData'
import { 
  MapPin, 
  Phone, 
  EnvelopeSimple, 
  Clock,
  Globe,
  ArrowUpRight
} from '@phosphor-icons/react'

export function ShopInfoView() {
  const formatHours = () => {
    const days: Array<{ day: string; hours: string; isOpen: boolean }> = []
    
    const dayOrder: Array<keyof typeof contactInfo.hours> = [
      'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
    ]
    
    dayOrder.forEach(day => {
      const dayHours = contactInfo.hours[day]
      days.push({
        day: day.charAt(0).toUpperCase() + day.slice(1),
        hours: dayHours.closed ? 'Closed' : `${dayHours.open} - ${dayHours.close}`,
        isOpen: !dayHours.closed
      })
    })
    
    return days
  }

  const todayDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()]
  const stationImage = galleryItems.find(g => g.sortOrder === 2)

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="font-bold text-2xl">Shop Info</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Everything you need to know
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        <Card className="overflow-hidden">
          <img
            src={stationImage?.imagePath}
            alt={stationImage?.altText}
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <img
              src={shopProfile.logoImage}
              alt={shopProfile.name}
              className="h-12 w-auto mb-3"
            />
            <h2 className="font-bold text-xl mb-2">{shopProfile.name}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {shopProfile.about}
            </p>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <MapPin size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="text-sm text-muted-foreground">
                {contactInfo.address}<br />
                {contactInfo.city}, {contactInfo.state} {contactInfo.zip}
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.open(contactInfo.mapLink, '_blank')}
          >
            <MapPin size={16} className="mr-2" />
            Get Directions
          </Button>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Clock size={20} className="text-primary" />
            </div>
            <h3 className="font-semibold">Hours of Operation</h3>
          </div>
          
          <div className="space-y-2">
            {formatHours().map((day, idx) => (
              <div 
                key={idx}
                className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                  day.day.toLowerCase() === todayDay 
                    ? 'bg-primary/10 border border-primary/20' 
                    : 'bg-muted/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{day.day}</span>
                  {day.day.toLowerCase() === todayDay && (
                    <Badge variant="default" className="text-xs">Today</Badge>
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  day.isOpen ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {day.hours}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 space-y-4">
          <h3 className="font-semibold">Contact Us</h3>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => window.location.href = `tel:${contactInfo.phone}`}
          >
            <Phone size={20} className="mr-3 text-primary" />
            <div className="flex flex-col items-start">
              <span className="text-xs text-muted-foreground">Phone</span>
              <span className="font-medium">{contactInfo.phone}</span>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => window.location.href = `mailto:${contactInfo.email}`}
          >
            <EnvelopeSimple size={20} className="mr-3 text-primary" />
            <div className="flex flex-col items-start">
              <span className="text-xs text-muted-foreground">Email</span>
              <span className="font-medium">{contactInfo.email}</span>
            </div>
          </Button>

          {contactInfo.websiteLink && (
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.open(contactInfo.websiteLink, '_blank')}
            >
              <Globe size={20} className="mr-3 text-primary" />
              <div className="flex flex-col items-start flex-1">
                <span className="text-xs text-muted-foreground">Website</span>
                <span className="font-medium">Visit Our Website</span>
              </div>
              <ArrowUpRight size={16} className="text-muted-foreground" />
            </Button>
          )}
        </Card>

        <Card className="p-5 bg-primary/10 border-primary/20">
          <h3 className="font-semibold mb-2">Booking Recommended</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {shopProfile.bookingNote}
          </p>
          <div className="flex items-center gap-2 text-xs text-primary">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Walk-ins welcome based on availability</span>
          </div>
        </Card>

        {externalLinks && externalLinks.length > 0 && (
          <Card className="p-5">
            <h3 className="font-semibold mb-3">More Information</h3>
            <div className="space-y-2">
              {externalLinks.map((link) => (
                <Button
                  key={link.id}
                  variant="outline"
                  size="sm"
                  className="w-full justify-between"
                  onClick={() => window.open(link.url, '_blank')}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={14} />
                </Button>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
