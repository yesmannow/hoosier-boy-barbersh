import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CaretLeft, MagnifyingGlass, User, Phone, Envelope, CalendarBlank, CurrencyDollar } from '@phosphor-icons/react'
import { clients, getBarberById } from '@/lib/adminData'
import { format, parseISO } from 'date-fns'

interface ClientsViewProps {
  onBack: () => void
}

export function ClientsView({ onBack }: ClientsViewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClient, setSelectedClient] = useState<string | null>(null)

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const client = selectedClient ? clients.find(c => c.id === selectedClient) : null
  const preferredBarber = client?.preferredBarberId ? getBarberById(client.preferredBarberId) : null

  return (
    <div className="h-full flex">
      <div className="w-96 border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <CaretLeft size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Clients</h1>
              <p className="text-sm text-muted-foreground">{clients.length} total clients</p>
            </div>
          </div>
          <div className="relative">
            <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {filteredClients.map(client => (
              <Card
                key={client.id}
                className={`p-4 cursor-pointer transition-all hover:border-primary ${
                  selectedClient === client.id ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => setSelectedClient(client.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{client.name}</h3>
                  {client.noShowCount > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {client.noShowCount} no-show{client.noShowCount > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{client.phone}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    ${client.totalSpend} spent
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {client.appointmentHistory.length} visits
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 p-6">
        {!client ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <User size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">Select a client to view details</p>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-full">
            <div className="max-w-3xl space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">{client.name}</h2>
                <p className="text-muted-foreground">
                  Client since {format(parseISO(client.createdAt), 'MMMM yyyy')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 border-border">
                  <div className="flex items-center gap-3">
                    <CurrencyDollar size={24} className="text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Spend</p>
                      <p className="text-2xl font-bold text-foreground">${client.totalSpend}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-border">
                  <div className="flex items-center gap-3">
                    <CalendarBlank size={24} className="text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Visits</p>
                      <p className="text-2xl font-bold text-foreground">{client.appointmentHistory.length}</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a href={`tel:${client.phone}`} className="font-semibold text-primary hover:underline">
                        {client.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Envelope size={20} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href={`mailto:${client.email}`} className="font-semibold text-primary hover:underline">
                        {client.email}
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Preferences</h3>
                <div className="space-y-3">
                  {preferredBarber && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Preferred Barber</p>
                      <Badge variant="secondary">{preferredBarber.name}</Badge>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Favorite Services</p>
                    <div className="flex flex-wrap gap-2">
                      {client.favoriteServices.slice(0, 3).map((serviceId, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {serviceId.replace(/-/g, ' ').replace(/^[a-z]/, m => m.toUpperCase())}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {client.lastVisit && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Last Visit</p>
                      <p className="font-semibold text-foreground">
                        {format(parseISO(client.lastVisit), 'MMMM d, yyyy')}
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {client.internalNotes && (
                <Card className="p-6 border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Internal Notes</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{client.internalNotes}</p>
                  <Button variant="outline" className="mt-4" size="sm">
                    Edit Notes
                  </Button>
                </Card>
              )}

              <Card className="p-6 border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Statistics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">No Shows</p>
                    <p className="text-2xl font-bold text-foreground">{client.noShowCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Cancellations</p>
                    <p className="text-2xl font-bold text-foreground">{client.cancellationCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Avg Spend</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${Math.round(client.totalSpend / client.appointmentHistory.length)}
                    </p>
                  </div>
                </div>
              </Card>

              <div className="flex gap-2">
                <Button className="flex-1">Book Appointment</Button>
                <Button variant="outline" className="flex-1">View History</Button>
              </div>
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  )
}
