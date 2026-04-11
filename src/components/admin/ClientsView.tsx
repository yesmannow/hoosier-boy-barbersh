import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import {
  CaretLeft, MagnifyingGlass, User, Phone, Envelope, CalendarBlank,
  CurrencyDollar, Tag, Star, Warning, Clock, ChatCircle, PaperPlaneTilt,
  Lightning, Users, Funnel, Plus, CheckCircle, XCircle, ArrowsClockwise,
  Note, CalendarPlus
} from '@phosphor-icons/react'
import { clients, getBarberById } from '@/lib/adminData'
import { format, parseISO, differenceInDays } from 'date-fns'
import { Client } from '@/lib/types'

interface ClientsViewProps {
  onBack: () => void
}

// ── CRM enrichment helpers ────────────────────────────────────────────────────

type LifecycleStage = 'lead' | 'new' | 'active' | 'vip' | 'at-risk' | 'lost'

function getLifecycleStage(client: Client): LifecycleStage {
  const daysSince = client.lastVisit
    ? differenceInDays(new Date(), parseISO(client.lastVisit))
    : 999
  if (client.appointmentHistory.length === 0) return 'lead'
  if (client.appointmentHistory.length === 1) return 'new'
  if (client.totalSpend >= 500 && daysSince <= 60) return 'vip'
  if (daysSince > 60) return 'at-risk'
  if (daysSince > 120) return 'lost'
  return 'active'
}

function getStageConfig(stage: LifecycleStage) {
  const map: Record<LifecycleStage, { label: string; color: string; bg: string }> = {
    lead:    { label: 'Lead',    color: 'text-blue-400',   bg: 'bg-blue-500/20 border-blue-500/40' },
    new:     { label: 'New',     color: 'text-purple-400', bg: 'bg-purple-500/20 border-purple-500/40' },
    active:  { label: 'Active',  color: 'text-green-400',  bg: 'bg-green-500/20 border-green-500/40' },
    vip:     { label: 'VIP ⭐',  color: 'text-yellow-400', bg: 'bg-yellow-500/20 border-yellow-500/40' },
    'at-risk': { label: 'At Risk', color: 'text-orange-400', bg: 'bg-orange-500/20 border-orange-500/40' },
    lost:    { label: 'Lost',    color: 'text-red-400',    bg: 'bg-red-500/20 border-red-500/40' },
  }
  return map[stage]
}

// Mock comms history per client
const commsHistory: Record<string, Array<{ id: string; type: 'email' | 'sms' | 'note' | 'call'; text: string; date: string; direction: 'in' | 'out' }>> = {
  'client-001': [
    { id: 'c1-1', type: 'email', text: 'Appointment confirmation sent for Jan 15 at 10:00 AM', date: '2024-01-14T09:00:00Z', direction: 'out' },
    { id: 'c1-2', type: 'sms', text: 'Reminder: your appointment is tomorrow at 10 AM!', date: '2024-01-14T17:00:00Z', direction: 'out' },
    { id: 'c1-3', type: 'note', text: 'Mentioned he wants to try a skin fade next visit', date: '2024-01-08T11:30:00Z', direction: 'in' },
  ],
  'client-002': [
    { id: 'c2-1', type: 'email', text: 'Hair system maintenance reminder sent', date: '2024-01-08T09:00:00Z', direction: 'out' },
    { id: 'c2-2', type: 'note', text: '4-week maintenance cycle, very happy with current system', date: '2024-01-10T14:00:00Z', direction: 'in' },
  ],
  'client-004': [
    { id: 'c4-1', type: 'sms', text: 'Win-back offer: $5 off your next visit — it\'s been a while!', date: '2023-12-20T10:00:00Z', direction: 'out' },
    { id: 'c4-2', type: 'email', text: 'Customer replied: will rebook next week', date: '2023-12-21T15:00:00Z', direction: 'in' },
    { id: 'c4-3', type: 'note', text: 'Ran 15 min late on last visit, noted in profile', date: '2024-01-09T12:00:00Z', direction: 'in' },
  ],
  'client-006': [
    { id: 'c6-1', type: 'email', text: 'Monthly newsletter — January promos', date: '2024-01-02T09:00:00Z', direction: 'out' },
    { id: 'c6-2', type: 'call', text: 'Outbound call: confirmed upcoming maintenance appointment', date: '2024-01-10T11:00:00Z', direction: 'out' },
  ]
}

// Segment definitions
const segments = [
  { id: 'all', label: 'All Clients', icon: Users },
  { id: 'vip', label: 'VIP', icon: Star },
  { id: 'at-risk', label: 'At Risk', icon: Warning },
  { id: 'active', label: 'Active', icon: CheckCircle },
  { id: 'new', label: 'New Clients', icon: Plus },
]

const commsTypeIcon = {
  email: <Envelope size={13} className="text-blue-400" />,
  sms: <ChatCircle size={13} className="text-green-400" />,
  note: <Note size={13} className="text-yellow-400" />,
  call: <Phone size={13} className="text-purple-400" />,
}

export function ClientsView({ onBack }: ClientsViewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [activeSegment, setActiveSegment] = useState('all')

  // Enrich clients with lifecycle stage
  const enrichedClients = clients.map(c => ({ ...c, stage: getLifecycleStage(c) }))

  const filteredClients = enrichedClients.filter(client => {
    const matchesSearch = (
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const matchesSegment = activeSegment === 'all' || client.stage === activeSegment
    return matchesSearch && matchesSegment
  })

  const client = selectedClient ? enrichedClients.find(c => c.id === selectedClient) : null
  const preferredBarber = client?.preferredBarberId ? getBarberById(client.preferredBarberId) : null
  const clientComms = client ? (commsHistory[client.id] ?? []) : []
  const daysSinceVisit = client?.lastVisit
    ? differenceInDays(new Date(), parseISO(client.lastVisit))
    : null

  // Summary counts for segment pills
  const segmentCounts = {
    all: enrichedClients.length,
    vip: enrichedClients.filter(c => c.stage === 'vip').length,
    'at-risk': enrichedClients.filter(c => c.stage === 'at-risk').length,
    active: enrichedClients.filter(c => c.stage === 'active').length,
    new: enrichedClients.filter(c => c.stage === 'new').length,
  }

  return (
    <div className="h-full flex">
      {/* ── Left sidebar: list + filters ─────────────────────────────────── */}
      <div className="w-96 border-r border-border flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <CaretLeft size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Client CRM</h1>
              <p className="text-sm text-muted-foreground">{clients.length} total clients</p>
            </div>
            <Button size="sm" variant="outline" className="ml-auto gap-1.5">
              <Plus size={14} />
              Add
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name, phone, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>

          {/* Segment pills */}
          <div className="flex gap-1.5 flex-wrap">
            {segments.map(seg => (
              <button
                key={seg.id}
                onClick={() => setActiveSegment(seg.id)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                  activeSegment === seg.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                {seg.label}
                <span className="opacity-70">
                  {segmentCounts[seg.id as keyof typeof segmentCounts] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {filteredClients.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No clients match your search or filter.
              </div>
            )}
            {filteredClients.map(client => {
              const stage = client.stage
              const cfg = getStageConfig(stage)
              return (
                <Card
                  key={client.id}
                  className={`p-4 cursor-pointer transition-all hover:border-primary ${
                    selectedClient === client.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => setSelectedClient(client.id)}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-foreground text-sm">{client.name}</h3>
                    <Badge variant="outline" className={`text-xs ${cfg.bg} ${cfg.color} border`}>
                      {cfg.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{client.phone}</p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Badge variant="secondary" className="text-xs">${client.totalSpend}</Badge>
                    <Badge variant="secondary" className="text-xs">{client.appointmentHistory.length} visits</Badge>
                    {client.noShowCount > 0 && (
                      <Badge variant="destructive" className="text-xs">{client.noShowCount} no-show</Badge>
                    )}
                    {client.nextAppointment && (
                      <Badge variant="outline" className="text-xs border-green-500/40 text-green-400">
                        Upcoming
                      </Badge>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        </ScrollArea>

        {/* Bulk actions footer */}
        <div className="p-3 border-t border-border">
          <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
            <Lightning size={13} />
            Bulk Campaign ({filteredClients.length} clients)
          </Button>
        </div>
      </div>

      {/* ── Right detail pane ─────────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden">
        {!client ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <User size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground font-medium">Select a client</p>
              <p className="text-sm text-muted-foreground">to view their full CRM profile</p>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-full">
            <div className="p-6 space-y-5 max-w-4xl">

              {/* Client header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-1">{client.name}</h2>
                  <p className="text-muted-foreground text-sm">
                    Client since {format(parseISO(client.createdAt), 'MMMM yyyy')}
                    {daysSinceVisit !== null && (
                      <span className={`ml-3 font-medium ${daysSinceVisit > 45 ? 'text-orange-400' : 'text-green-400'}`}>
                        · {daysSinceVisit === 0 ? 'Visited today' : `Last seen ${daysSinceVisit}d ago`}
                      </span>
                    )}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-sm px-3 py-1 ${getStageConfig(client.stage).bg} ${getStageConfig(client.stage).color} border`}
                >
                  {getStageConfig(client.stage).label}
                </Badge>
              </div>

              {/* Quick KPI row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="p-4 border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <CurrencyDollar size={16} className="text-primary" />
                    <span className="text-xs text-muted-foreground">Total Spend</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">${client.totalSpend}</p>
                </Card>
                <Card className="p-4 border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarBlank size={16} className="text-primary" />
                    <span className="text-xs text-muted-foreground">Total Visits</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{client.appointmentHistory.length}</p>
                </Card>
                <Card className="p-4 border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <CurrencyDollar size={16} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Avg Spend</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    ${client.appointmentHistory.length > 0
                      ? Math.round(client.totalSpend / client.appointmentHistory.length)
                      : 0}
                  </p>
                </Card>
                <Card className="p-4 border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <Warning size={16} className="text-destructive" />
                    <span className="text-xs text-muted-foreground">Issues</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {client.noShowCount + client.cancellationCount}
                  </p>
                </Card>
              </div>

              {/* Tabs: Profile / Communications / Notes / Actions */}
              <Tabs defaultValue="profile">
                <TabsList className="bg-card border border-border">
                  <TabsTrigger value="profile" className="text-xs sm:text-sm">Profile</TabsTrigger>
                  <TabsTrigger value="comms" className="text-xs sm:text-sm">
                    Communications
                    {clientComms.length > 0 && (
                      <Badge variant="secondary" className="ml-1.5 text-xs h-4 w-4 p-0 flex items-center justify-center">
                        {clientComms.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="text-xs sm:text-sm">Notes & Tags</TabsTrigger>
                  <TabsTrigger value="actions" className="text-xs sm:text-sm">Quick Actions</TabsTrigger>
                </TabsList>

                {/* ── Profile Tab ── */}
                <TabsContent value="profile" className="space-y-4 mt-4">
                  <Card className="p-5 border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone size={18} className="text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Phone</p>
                          <a href={`tel:${client.phone}`} className="font-semibold text-primary hover:underline text-sm">
                            {client.phone}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Envelope size={18} className="text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <a href={`mailto:${client.email}`} className="font-semibold text-primary hover:underline text-sm">
                            {client.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-5 border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Preferences</h3>
                    <div className="space-y-3">
                      {preferredBarber && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Preferred Barber</p>
                          <Badge variant="secondary">{preferredBarber.name}</Badge>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Favorite Services</p>
                        <div className="flex flex-wrap gap-2">
                          {client.favoriteServices.map((serviceId, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {serviceId.replace(/-/g, ' ').replace(/^[a-z]/, m => m.toUpperCase())}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {client.lastVisit && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Last Visit</p>
                          <p className="font-semibold text-foreground text-sm">
                            {format(parseISO(client.lastVisit), 'MMMM d, yyyy')}
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>

                  <Card className="p-5 border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Booking Reliability</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">No Shows</p>
                        <p className={`text-2xl font-bold ${client.noShowCount > 0 ? 'text-destructive' : 'text-foreground'}`}>
                          {client.noShowCount}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Cancellations</p>
                        <p className={`text-2xl font-bold ${client.cancellationCount > 1 ? 'text-orange-400' : 'text-foreground'}`}>
                          {client.cancellationCount}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Lifetime Value</p>
                        <p className="text-2xl font-bold text-primary">${client.totalSpend}</p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* ── Communications Tab ── */}
                <TabsContent value="comms" className="mt-4 space-y-3">
                  {clientComms.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">
                      <ChatCircle size={40} className="mx-auto mb-3 opacity-40" />
                      <p className="text-sm">No communications logged yet</p>
                    </div>
                  ) : (
                    clientComms
                      .slice()
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map(comm => (
                        <Card key={comm.id} className="p-4 border-border">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">{commsTypeIcon[comm.type]}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="secondary" className="text-xs capitalize">{comm.type}</Badge>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${comm.direction === 'out' ? 'border-blue-500/40 text-blue-400' : 'border-green-500/40 text-green-400'}`}
                                >
                                  {comm.direction === 'out' ? '→ Outbound' : '← Inbound'}
                                </Badge>
                                <span className="text-xs text-muted-foreground ml-auto">
                                  {format(parseISO(comm.date), 'MMM d, yyyy h:mm a')}
                                </span>
                              </div>
                              <p className="text-sm text-foreground">{comm.text}</p>
                            </div>
                          </div>
                        </Card>
                      ))
                  )}

                  <Button variant="outline" size="sm" className="gap-2 w-full">
                    <Plus size={14} />
                    Log Communication
                  </Button>
                </TabsContent>

                {/* ── Notes & Tags Tab ── */}
                <TabsContent value="notes" className="mt-4 space-y-4">
                  <Card className="p-5 border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-foreground">Internal Notes</h3>
                      <Button variant="ghost" size="sm" className="text-xs gap-1.5">
                        <Note size={13} />
                        Edit
                      </Button>
                    </div>
                    {client.internalNotes ? (
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap bg-secondary/50 rounded-lg p-3">
                        {client.internalNotes}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No notes yet. Click Edit to add notes.</p>
                    )}
                  </Card>

                  <Card className="p-5 border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-foreground">Client Tags</h3>
                      <Button variant="ghost" size="sm" className="text-xs gap-1.5">
                        <Plus size={13} />
                        Add Tag
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {client.stage === 'vip' && (
                        <Badge className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/40">⭐ VIP</Badge>
                      )}
                      {client.stage === 'at-risk' && (
                        <Badge className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/40">⚠ At Risk</Badge>
                      )}
                      {client.noShowCount === 0 && client.cancellationCount === 0 && (
                        <Badge className="text-xs bg-green-500/20 text-green-400 border border-green-500/40">✓ Reliable</Badge>
                      )}
                      {client.totalSpend > 300 && (
                        <Badge className="text-xs bg-primary/20 text-primary border border-primary/40">💰 High Value</Badge>
                      )}
                      {client.favoriteServices.some(s => s.includes('hair-replacement')) && (
                        <Badge className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/40">💈 Hair System</Badge>
                      )}
                      {client.appointmentHistory.length === 1 && (
                        <Badge className="text-xs bg-purple-500/20 text-purple-400 border border-purple-500/40">🆕 New Client</Badge>
                      )}
                      <Badge variant="outline" className="text-xs text-muted-foreground border-dashed cursor-pointer hover:border-primary">
                        + Add tag
                      </Badge>
                    </div>
                  </Card>

                  <Card className="p-5 border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Campaign Membership</h3>
                    <div className="space-y-2">
                      {['Monthly Newsletter', client.stage === 'at-risk' ? 'Win-Back Series' : null, 'Review Request Drip'].filter(Boolean).map((campaign, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-foreground">{campaign}</span>
                          <Badge variant="outline" className="text-xs border-green-500/40 text-green-400">● Active</Badge>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="mt-2 w-full gap-1.5 text-xs">
                        <Plus size={13} />
                        Add to Campaign
                      </Button>
                    </div>
                  </Card>
                </TabsContent>

                {/* ── Quick Actions Tab ── */}
                <TabsContent value="actions" className="mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="h-auto py-4 flex flex-col gap-2" variant="outline">
                      <CalendarPlus size={22} />
                      <span className="text-xs">Book Appointment</span>
                    </Button>
                    <Button className="h-auto py-4 flex flex-col gap-2" variant="outline">
                      <Envelope size={22} />
                      <span className="text-xs">Send Email</span>
                    </Button>
                    <Button className="h-auto py-4 flex flex-col gap-2" variant="outline">
                      <ChatCircle size={22} />
                      <span className="text-xs">Send SMS</span>
                    </Button>
                    <Button className="h-auto py-4 flex flex-col gap-2" variant="outline">
                      <Phone size={22} />
                      <span className="text-xs">Log Call</span>
                    </Button>
                    <Button className="h-auto py-4 flex flex-col gap-2" variant="outline">
                      <PaperPlaneTilt size={22} />
                      <span className="text-xs">Win-Back Offer</span>
                    </Button>
                    <Button className="h-auto py-4 flex flex-col gap-2" variant="outline">
                      <Star size={22} />
                      <span className="text-xs">Request Review</span>
                    </Button>
                    <Button className="h-auto py-4 flex flex-col gap-2" variant="outline">
                      <ArrowsClockwise size={22} />
                      <span className="text-xs">Sync to HubSpot</span>
                    </Button>
                    <Button className="h-auto py-4 flex flex-col gap-2" variant="outline">
                      <Lightning size={22} />
                      <span className="text-xs">Trigger Workflow</span>
                    </Button>
                  </div>

                  {client.stage === 'at-risk' && (
                    <Card className="mt-4 p-4 border-orange-500/40 bg-orange-500/5">
                      <div className="flex items-start gap-3">
                        <Warning size={18} className="text-orange-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-1">At-Risk Alert</p>
                          <p className="text-xs text-muted-foreground mb-2">
                            {client.name} hasn't visited in {daysSinceVisit} days.
                            Their usual cadence is every 3–4 weeks. A personalized win-back offer is recommended.
                          </p>
                          <Button size="sm" className="gap-1.5 text-xs">
                            <PaperPlaneTilt size={13} />
                            Send Win-Back Now
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )}
                  {client.stage === 'vip' && (
                    <Card className="mt-4 p-4 border-yellow-500/40 bg-yellow-500/5">
                      <div className="flex items-start gap-3">
                        <Star size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-1">VIP Client</p>
                          <p className="text-xs text-muted-foreground mb-2">
                            {client.name} is one of your top clients (${client.totalSpend} lifetime).
                            Consider a loyalty reward or referral ask.
                          </p>
                          <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                            <Star size={13} />
                            Send Loyalty Reward
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  )
}

