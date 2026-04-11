import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  CaretLeft, Robot, Lightning, Plugs, Gear, Play, Pause, CheckCircle,
  Warning, ArrowRight, Brain, Envelope, Bell, Users, CalendarBlank,
  ChartBar, Funnel, ChatCircle, Plus, ArrowsClockwise, Star, Target,
  PaperPlaneTilt, Clock
} from '@phosphor-icons/react'

interface AutomationViewProps {
  onBack: () => void
}

// ── Connector definitions ─────────────────────────────────────────────────────

interface Connector {
  id: string
  name: string
  category: 'ai' | 'marketing' | 'crm' | 'communication' | 'calendar' | 'automation'
  description: string
  status: 'connected' | 'not-connected' | 'coming-soon'
  logoEmoji: string
  color: string
  capabilities: string[]
}

const connectors: Connector[] = [
  // AI / MCP
  {
    id: 'chatgpt',
    name: 'ChatGPT / OpenAI',
    category: 'ai',
    description: 'AI receptionist, marketing copywriter, and intelligent workflow orchestrator.',
    status: 'coming-soon',
    logoEmoji: '🤖',
    color: 'text-emerald-400',
    capabilities: ['Auto-reply to inquiries', 'Write promo emails', 'Summarize client notes', 'Suggest upsells']
  },
  {
    id: 'claude',
    name: 'Claude (Anthropic)',
    category: 'ai',
    description: 'Conversational AI for nuanced client communications and smart scheduling decisions.',
    status: 'coming-soon',
    logoEmoji: '✦',
    color: 'text-orange-400',
    capabilities: ['Client chat assistant', 'Content generation', 'Lead qualification', 'Tone-matched replies']
  },
  {
    id: 'gemini',
    name: 'Gemini AI (Google)',
    category: 'ai',
    description: 'Google multimodal AI integrated with Google Workspace and Ads for full-funnel intelligence.',
    status: 'coming-soon',
    logoEmoji: '💎',
    color: 'text-blue-400',
    capabilities: ['Google Ads optimization', 'Calendar-aware scheduling', 'Image analysis for portfolio', 'Search visibility insights']
  },
  // Marketing
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    category: 'marketing',
    description: 'Email marketing, automated drip campaigns, and audience segmentation.',
    status: 'not-connected',
    logoEmoji: '🐵',
    color: 'text-yellow-400',
    capabilities: ['Welcome series for new clients', 'Win-back campaigns for at-risk clients', 'Monthly newsletter', 'Birthday offers']
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    category: 'marketing',
    description: 'Local search ads to drive new bookings from Noblesville & surrounding areas.',
    status: 'not-connected',
    logoEmoji: '🎯',
    color: 'text-blue-500',
    capabilities: ['Auto-pause ads on fully-booked days', 'Boost ads on slow days', 'Conversion tracking', 'Keyword insights']
  },
  // CRM
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'crm',
    description: 'Full CRM, deal pipeline, and marketing automation for lead nurturing.',
    status: 'not-connected',
    logoEmoji: '🧡',
    color: 'text-orange-500',
    capabilities: ['Lead pipeline', 'Deal tracking', 'Contact sync', 'Email sequences']
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'crm',
    description: 'Enterprise CRM for tracking leads, opportunities, and client lifetime value.',
    status: 'coming-soon',
    logoEmoji: '☁️',
    color: 'text-sky-400',
    capabilities: ['Opportunity tracking', 'Revenue forecasting', 'Client 360 view', 'Custom workflows']
  },
  // Communication
  {
    id: 'slack',
    name: 'Slack',
    category: 'communication',
    description: 'Team notifications for new bookings, no-shows, and daily summaries sent to your shop channel.',
    status: 'not-connected',
    logoEmoji: '💬',
    color: 'text-purple-400',
    capabilities: ['New booking alerts', 'No-show notifications', 'Daily digest', 'Client milestone alerts']
  },
  {
    id: 'gmail',
    name: 'Gmail / Google Workspace',
    category: 'communication',
    description: 'Two-way email sync for client communications, confirmations, and follow-ups.',
    status: 'not-connected',
    logoEmoji: '📧',
    color: 'text-red-400',
    capabilities: ['Appointment confirmations', 'Follow-up emails', 'Review requests', 'Promotional sends']
  },
  // Calendar
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    category: 'calendar',
    description: 'Sync barber schedules, block availability, and auto-create calendar events on booking.',
    status: 'not-connected',
    logoEmoji: '📅',
    color: 'text-blue-400',
    capabilities: ['Auto-sync bookings', 'Block-off times', 'Barber schedule view', 'Reminders']
  },
  // Automation
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'automation',
    description: 'No-code automation glue connecting 5,000+ apps. Build zaps for any workflow.',
    status: 'not-connected',
    logoEmoji: '⚡',
    color: 'text-orange-400',
    capabilities: ['New booking → Slack alert', 'New client → Mailchimp list', 'Review request triggers', 'CRM sync']
  },
  {
    id: 'n8n',
    name: 'n8n',
    category: 'automation',
    description: 'Self-hosted workflow automation for complex multi-step sequences with full data control.',
    status: 'coming-soon',
    logoEmoji: '🔀',
    color: 'text-pink-400',
    capabilities: ['Custom workflow builder', 'Webhook triggers', 'Data transformation', 'On-premise option']
  }
]

// ── Pre-built workflow templates ──────────────────────────────────────────────

interface WorkflowTemplate {
  id: string
  name: string
  description: string
  trigger: string
  steps: string[]
  category: 'retention' | 'lead-nurture' | 'operations' | 'marketing' | 'receptionist'
  enabled: boolean
  lastRun?: string
  runsThisMonth: number
}

const workflowTemplates: WorkflowTemplate[] = [
  {
    id: 'wf-001',
    name: 'Appointment Confirmation & Reminder',
    description: 'Automatically confirms bookings and sends a 24-hour reminder via email + SMS.',
    trigger: 'New appointment booked',
    steps: ['Send confirmation email (Gmail)', 'Add to Google Calendar', 'Schedule 24hr SMS reminder', 'Log in CRM'],
    category: 'operations',
    enabled: true,
    lastRun: '2024-01-11T09:30:00Z',
    runsThisMonth: 47
  },
  {
    id: 'wf-002',
    name: 'Win-Back: At-Risk Clients',
    description: 'Detects clients who haven\'t visited in 45+ days and triggers a personalized re-engagement email.',
    trigger: '45 days since last visit',
    steps: ['AI writes personalized email (ChatGPT)', 'Send via Mailchimp', 'Add "At-Risk" tag in CRM', 'Notify owner in Slack'],
    category: 'retention',
    enabled: true,
    lastRun: '2024-01-10T08:00:00Z',
    runsThisMonth: 8
  },
  {
    id: 'wf-003',
    name: 'New Client Welcome Series',
    description: 'Three-email welcome sequence for first-time clients to build loyalty and encourage rebooking.',
    trigger: 'First appointment completed',
    steps: ['Day 1: Thank-you email with review link (Gmail)', 'Day 7: Style tips + rebook CTA (Mailchimp)', 'Day 21: Loyalty offer (Mailchimp)'],
    category: 'lead-nurture',
    enabled: true,
    lastRun: '2024-01-09T14:00:00Z',
    runsThisMonth: 12
  },
  {
    id: 'wf-004',
    name: 'No-Show Follow-Up',
    description: 'Sends a compassionate rescheduling prompt after a missed appointment.',
    trigger: 'Appointment marked no-show',
    steps: ['Wait 2 hours', 'Send rescheduling email (Gmail)', 'Log note in CRM', 'Slack alert to owner'],
    category: 'operations',
    enabled: true,
    lastRun: '2024-01-08T17:00:00Z',
    runsThisMonth: 3
  },
  {
    id: 'wf-005',
    name: 'AI Receptionist — Intake Chat',
    description: 'ChatGPT-powered chat widget answers FAQs, collects lead info, and books appointments automatically.',
    trigger: 'Visitor starts chat on website',
    steps: ['ChatGPT answers FAQ', 'Qualify lead intent', 'Collect name/phone/email', 'Create booking or add to HubSpot pipeline'],
    category: 'receptionist',
    enabled: false,
    runsThisMonth: 0
  },
  {
    id: 'wf-006',
    name: 'Slow Day Fill — Ad Boost',
    description: 'When tomorrow\'s schedule is <50% booked, automatically increases Google Ads budget to drive walk-ins.',
    trigger: 'Schedule <50% capacity at 5 PM',
    steps: ['Check tomorrow\'s availability (Calendar)', 'Boost Google Ads budget +$20', 'Send promo text blast (Mailchimp SMS)', 'Notify owner in Slack'],
    category: 'marketing',
    enabled: false,
    runsThisMonth: 0
  },
  {
    id: 'wf-007',
    name: 'Birthday & Milestone Offers',
    description: 'Sends personalized birthday offers and loyalty milestone rewards automatically.',
    trigger: 'Client birthday or 10th visit milestone',
    steps: ['AI personalizes offer (ChatGPT)', 'Send via Mailchimp', 'Apply promo code in booking system', 'Log in CRM history'],
    category: 'retention',
    enabled: true,
    lastRun: '2024-01-05T09:00:00Z',
    runsThisMonth: 2
  },
  {
    id: 'wf-008',
    name: 'Review Request Automation',
    description: 'Requests Google reviews from happy clients 2 hours after appointment completion.',
    trigger: 'Appointment marked completed',
    steps: ['Wait 2 hours', 'Send review request SMS/email (Gmail)', 'Track response in CRM', 'Flag negative sentiment for follow-up'],
    category: 'marketing',
    enabled: true,
    lastRun: '2024-01-11T16:00:00Z',
    runsThisMonth: 31
  }
]

// ── AI Agent personas ──────────────────────────────────────────────────────────

const aiAgents = [
  {
    id: 'receptionist',
    name: 'AI Receptionist',
    icon: '🤵',
    status: 'inactive' as const,
    description: 'Handles incoming inquiries 24/7, books appointments, and answers FAQs with human-like conversation.',
    superpowers: ['Answers calls & chats after hours', 'Books & reschedules appointments', 'Handles cancellations gracefully', 'Collects new lead info'],
    poweredBy: ['ChatGPT', 'Claude'],
    stats: { handledThisMonth: 0, conversionRate: '–', avgResponseTime: '< 3s' }
  },
  {
    id: 'marketing-coordinator',
    name: 'Marketing Coordinator',
    icon: '📣',
    status: 'active' as const,
    description: 'Keeps your book full with automated campaigns, smart ad management, and client re-engagement.',
    superpowers: ['Writes email campaigns', 'Manages Google Ads budget dynamically', 'Segments clients for targeted offers', 'Tracks ROI across channels'],
    poweredBy: ['Mailchimp', 'Google Ads', 'ChatGPT'],
    stats: { handledThisMonth: 63, conversionRate: '18%', avgResponseTime: 'Auto' }
  },
  {
    id: 'client-success',
    name: 'Client Success Agent',
    icon: '🌟',
    status: 'active' as const,
    description: 'Nurtures existing clients, tracks loyalty, and proactively reaches out to at-risk customers.',
    superpowers: ['Tracks visit cadence & flags at-risk', 'Sends personalized win-back offers', 'Birthday & milestone rewards', 'Keeps VIP clients engaged'],
    poweredBy: ['HubSpot', 'Mailchimp', 'ChatGPT'],
    stats: { handledThisMonth: 22, conversionRate: '34%', avgResponseTime: 'Daily' }
  },
  {
    id: 'workflow-builder',
    name: 'Workflow Architect',
    icon: '⚙️',
    status: 'inactive' as const,
    description: 'Intelligently builds and optimizes multi-step automations based on shop data and booking patterns.',
    superpowers: ['Detects scheduling gaps and fills them', 'Suggests automation improvements', 'Monitors workflow health', 'Optimizes send times'],
    poweredBy: ['n8n', 'Zapier', 'Gemini AI'],
    stats: { handledThisMonth: 0, conversionRate: '–', avgResponseTime: '–' }
  }
]

// ── Category labels ────────────────────────────────────────────────────────────

const categoryLabels: Record<string, string> = {
  ai: 'AI & MCP',
  marketing: 'Marketing',
  crm: 'CRM',
  communication: 'Communication',
  calendar: 'Calendar & Scheduling',
  automation: 'Automation Engines'
}

const workflowCategoryColors: Record<string, string> = {
  retention: 'bg-green-500/20 text-green-400 border-green-500/30',
  'lead-nurture': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  operations: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  marketing: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  receptionist: 'bg-primary/20 text-primary border-primary/30'
}

// ── Component ─────────────────────────────────────────────────────────────────

export function AutomationView({ onBack }: AutomationViewProps) {
  const [workflowStates, setWorkflowStates] = useState<Record<string, boolean>>(
    Object.fromEntries(workflowTemplates.map(w => [w.id, w.enabled]))
  )
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const toggleWorkflow = (id: string) => {
    setWorkflowStates(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const connectorCategories = ['all', ...Array.from(new Set(connectors.map(c => c.category)))]

  const filteredConnectors = activeCategory === 'all'
    ? connectors
    : connectors.filter(c => c.category === activeCategory)

  const connectedCount = connectors.filter(c => c.status === 'connected').length
  const activeWorkflows = Object.values(workflowStates).filter(Boolean).length
  const totalRunsThisMonth = workflowTemplates.reduce((sum, w) => sum + w.runsThisMonth, 0)

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <CaretLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Robot size={24} className="text-primary" />
              Automation & AI Hub
            </h1>
            <p className="text-sm text-muted-foreground">
              Connector apps, intelligent workflows, and AI agents for Hoosier Boy Barbershop
            </p>
          </div>
        </div>
        <Button size="sm" className="gap-2">
          <Plus size={16} />
          New Workflow
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-5 border-border">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Connectors Active</span>
                <Plugs size={16} className="text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">{connectedCount}</p>
              <p className="text-xs text-muted-foreground">of {connectors.length} available</p>
            </Card>
            <Card className="p-5 border-border">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Active Workflows</span>
                <Lightning size={16} className="text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">{activeWorkflows}</p>
              <p className="text-xs text-muted-foreground">of {workflowTemplates.length} configured</p>
            </Card>
            <Card className="p-5 border-border">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Runs This Month</span>
                <ArrowsClockwise size={16} className="text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">{totalRunsThisMonth}</p>
              <p className="text-xs text-muted-foreground">automated actions</p>
            </Card>
            <Card className="p-5 border-border">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">AI Agents</span>
                <Brain size={16} className="text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">
                {aiAgents.filter(a => a.status === 'active').length}
              </p>
              <p className="text-xs text-muted-foreground">of {aiAgents.length} running</p>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="agents">
            <TabsList className="mb-4 flex-wrap h-auto gap-1 bg-card border border-border p-1">
              <TabsTrigger value="agents" className="gap-2 text-xs sm:text-sm">
                <Brain size={15} />AI Agents
              </TabsTrigger>
              <TabsTrigger value="workflows" className="gap-2 text-xs sm:text-sm">
                <Lightning size={15} />Workflows
              </TabsTrigger>
              <TabsTrigger value="connectors" className="gap-2 text-xs sm:text-sm">
                <Plugs size={15} />Connectors
              </TabsTrigger>
              <TabsTrigger value="insights" className="gap-2 text-xs sm:text-sm">
                <ChartBar size={15} />AI Insights
              </TabsTrigger>
            </TabsList>

            {/* ── AI Agents ─────────────────────────────────────────────────── */}
            <TabsContent value="agents" className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Hypothetical AI agents act as specialized team members — always on, always learning from your shop data.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {aiAgents.map(agent => (
                  <Card key={agent.id} className="p-6 border-border flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{agent.icon}</span>
                        <div>
                          <h3 className="font-semibold text-foreground">{agent.name}</h3>
                          <Badge
                            variant="outline"
                            className={agent.status === 'active'
                              ? 'border-green-500/40 text-green-400 bg-green-500/10 text-xs'
                              : 'border-muted-foreground/30 text-muted-foreground text-xs'}
                          >
                            {agent.status === 'active' ? '● Active' : '○ Inactive'}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => {}}
                      >
                        {agent.status === 'active' ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Activate</>}
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground">{agent.description}</p>

                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Superpowers</p>
                      <ul className="space-y-1">
                        {agent.superpowers.map((sp, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                            <CheckCircle size={14} className="text-primary flex-shrink-0" />
                            {sp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground">Powered by:</span>
                      {agent.poweredBy.map(p => (
                        <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                      ))}
                    </div>

                    <Separator />
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Actions/mo</p>
                        <p className="font-bold text-foreground">{agent.stats.handledThisMonth}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Conversion</p>
                        <p className="font-bold text-foreground">{agent.stats.conversionRate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Response</p>
                        <p className="font-bold text-foreground">{agent.stats.avgResponseTime}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* MCP note */}
              <Card className="p-5 border-border bg-primary/5">
                <div className="flex items-start gap-3">
                  <Brain size={24} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">About MCP (Model Context Protocol)</h4>
                    <p className="text-sm text-muted-foreground">
                      MCP is an emerging open standard that lets AI models like Claude and ChatGPT securely connect to external
                      data sources — your booking calendar, CRM, and shop data — so the AI always has up-to-date context. This
                      enables the agents above to make smart, personalized decisions without manual data exports.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* ── Workflows ─────────────────────────────────────────────────── */}
            <TabsContent value="workflows" className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Pre-built automation recipes triggered by booking events, client behavior, and scheduling patterns.
                </p>
                <div className="flex gap-2">
                  {['all', 'operations', 'retention', 'lead-nurture', 'marketing', 'receptionist'].map(cat => (
                    <Button
                      key={cat}
                      variant={activeCategory === cat ? 'default' : 'outline'}
                      size="sm"
                      className="text-xs capitalize"
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat === 'all' ? 'All' : cat.replace('-', ' ')}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {workflowTemplates
                  .filter(w => activeCategory === 'all' || w.category === activeCategory)
                  .map(workflow => (
                    <Card key={workflow.id} className="p-5 border-border">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold text-foreground">{workflow.name}</h3>
                            <Badge
                              variant="outline"
                              className={`text-xs ${workflowCategoryColors[workflow.category]}`}
                            >
                              {workflow.category.replace('-', ' ')}
                            </Badge>
                            {workflowStates[workflow.id] && (
                              <Badge variant="outline" className="text-xs border-green-500/40 text-green-400 bg-green-500/10">
                                ● Live
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{workflow.description}</p>

                          {/* Trigger + steps */}
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="bg-card border border-border rounded-full px-2.5 py-0.5 text-muted-foreground font-medium">
                              ▶ {workflow.trigger}
                            </span>
                            {workflow.steps.map((step, i) => (
                              <span key={i} className="flex items-center gap-1">
                                <ArrowRight size={10} className="text-muted-foreground" />
                                <span className="bg-secondary rounded-full px-2.5 py-0.5 text-foreground">{step}</span>
                              </span>
                            ))}
                          </div>

                          {workflow.lastRun && workflowStates[workflow.id] && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Last run: {new Date(workflow.lastRun).toLocaleDateString()} · {workflow.runsThisMonth} runs this month
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-xs text-muted-foreground">
                            {workflowStates[workflow.id] ? 'On' : 'Off'}
                          </span>
                          <Switch
                            checked={workflowStates[workflow.id]}
                            onCheckedChange={() => toggleWorkflow(workflow.id)}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>

              <Card className="p-5 border-dashed border-border text-center">
                <Plus size={24} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium text-foreground mb-1">Build a Custom Workflow</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Drag-and-drop workflow builder — connect any trigger to any action across your stack.
                </p>
                <Button variant="outline" size="sm" className="gap-2">
                  <Lightning size={14} />
                  Open Workflow Builder
                </Button>
              </Card>
            </TabsContent>

            {/* ── Connectors ────────────────────────────────────────────────── */}
            <TabsContent value="connectors" className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                {connectorCategories.map(cat => (
                  <Button
                    key={cat}
                    variant={activeCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    className="text-xs capitalize"
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat === 'all' ? 'All Apps' : categoryLabels[cat] || cat}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredConnectors.map(connector => (
                  <Card key={connector.id} className="p-5 border-border flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{connector.logoEmoji}</span>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">{connector.name}</h3>
                          <Badge variant="secondary" className="text-xs mt-0.5">
                            {categoryLabels[connector.category]}
                          </Badge>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          connector.status === 'connected'
                            ? 'text-xs border-green-500/40 text-green-400 bg-green-500/10'
                            : connector.status === 'coming-soon'
                            ? 'text-xs border-muted-foreground/30 text-muted-foreground'
                            : 'text-xs border-yellow-500/40 text-yellow-400 bg-yellow-500/10'
                        }
                      >
                        {connector.status === 'connected' ? '● Connected'
                          : connector.status === 'coming-soon' ? 'Coming Soon'
                          : '○ Not Connected'}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground">{connector.description}</p>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1.5">Use cases:</p>
                      <ul className="space-y-1">
                        {connector.capabilities.slice(0, 3).map((cap, i) => (
                          <li key={i} className="text-xs text-foreground flex items-center gap-1.5">
                            <CheckCircle size={11} className="text-primary flex-shrink-0" />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant={connector.status === 'connected' ? 'outline' : 'default'}
                      size="sm"
                      className="w-full mt-auto"
                      disabled={connector.status === 'coming-soon'}
                    >
                      {connector.status === 'connected' ? 'Manage'
                        : connector.status === 'coming-soon' ? 'Coming Soon'
                        : 'Connect'}
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* ── AI Insights ───────────────────────────────────────────────── */}
            <TabsContent value="insights" className="space-y-4">
              <p className="text-sm text-muted-foreground">
                AI-generated insights based on your booking history, client behavior, and revenue trends.
              </p>

              {/* Insight cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="p-5 border-border border-l-4 border-l-orange-500">
                  <div className="flex items-start gap-3">
                    <Warning size={20} className="text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">3 Clients At Risk of Churning</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Matthew Brown, Thomas Johnson, and Robert Chen haven't booked in 30+ days.
                        Historical data shows these clients visit every 3–4 weeks.
                      </p>
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                        <PaperPlaneTilt size={12} />
                        Trigger Win-Back Campaign
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 border-border border-l-4 border-l-green-500">
                  <div className="flex items-start gap-3">
                    <Star size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Top Revenue Day: Friday</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Fridays generate 34% more revenue than any other day. Consider adding a
                        premium "Friday Express" service or requiring advance booking on Fridays.
                      </p>
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                        <Gear size={12} />
                        Adjust Friday Availability
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 border-border border-l-4 border-l-blue-500">
                  <div className="flex items-start gap-3">
                    <Target size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Upsell Opportunity: Beard Add-Ons</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        6 clients regularly book haircuts but have never tried a beard service.
                        An AI-personalized "add beard trim for $10 today" offer could generate
                        ~$60 in upsell revenue this week alone.
                      </p>
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                        <Envelope size={12} />
                        Send Upsell Offer
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 border-border border-l-4 border-l-purple-500">
                  <div className="flex items-start gap-3">
                    <Clock size={20} className="text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Scheduling Gap: Wednesday Mornings</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Wednesday 8–11 AM is consistently underbooked (avg 28% utilization).
                        AI recommends a "Wednesday Morning Special" discount or targeted ad campaign.
                      </p>
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                        <Lightning size={12} />
                        Create Fill-Gap Workflow
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 border-border border-l-4 border-l-primary">
                  <div className="flex items-start gap-3">
                    <Users size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Referral Program Potential</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Joseph Taylor and David Rodriguez have high satisfaction scores and visit
                        frequently. They're ideal candidates for a "refer a friend, get $10 off" program.
                      </p>
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                        <ChatCircle size={12} />
                        Launch Referral Campaign
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 border-border border-l-4 border-l-yellow-500">
                  <div className="flex items-start gap-3">
                    <CalendarBlank size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Seasonal Prep: Spring Booking Surge</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Based on last year's patterns, March–April see a 22% booking increase.
                        AI recommends preparing a "Spring Refresh" campaign and expanding Saturday slots.
                      </p>
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                        <Funnel size={12} />
                        Plan Spring Campaign
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* AI Chat Preview */}
              <Card className="p-6 border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Robot size={22} className="text-primary" />
                  <h3 className="font-semibold text-foreground">Ask Your AI Marketing Coordinator</h3>
                  <Badge variant="outline" className="text-xs border-muted-foreground/30 text-muted-foreground">
                    Hypothetical Preview
                  </Badge>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 space-y-3 mb-3">
                  <div className="flex gap-3">
                    <span className="text-lg flex-shrink-0">🤖</span>
                    <div className="bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-foreground max-w-md">
                      Hey! I noticed you have 4 open slots this Saturday. Want me to send a same-week
                      flash offer to your last 20 clients?
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-primary text-primary-foreground rounded-xl px-4 py-2.5 text-sm max-w-sm">
                      Yes, offer $5 off if they book today.
                    </div>
                    <span className="text-lg flex-shrink-0">👤</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-lg flex-shrink-0">🤖</span>
                    <div className="bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-foreground max-w-md">
                      Done! I sent the flash offer to 20 clients via email. I'll also pause the
                      offer automatically once all 4 slots are booked. 🎉
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ask your AI coordinator anything about your shop..."
                    readOnly
                  />
                  <Button size="sm" className="gap-2" disabled>
                    <PaperPlaneTilt size={14} />
                    Send
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  * AI Coordinator feature requires ChatGPT or Claude connector to be active.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  )
}
