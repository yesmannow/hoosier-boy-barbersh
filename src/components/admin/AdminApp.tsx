import { useState } from 'react'
import { AdminLayout } from './AdminLayout'
import { Dashboard } from './Dashboard'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function AdminApp() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [userRole, setUserRole] = useState<'owner' | 'barber'>('owner')
  const [barberId, setBarberId] = useState<string | undefined>(undefined)

  const toggleRole = () => {
    if (userRole === 'owner') {
      setUserRole('barber')
      setBarberId('jimmy-bissonette')
    } else {
      setUserRole('owner')
      setBarberId(undefined)
    }
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard userRole={userRole} barberId={barberId} onViewChange={setCurrentView} />
      
      case 'schedule':
      case 'week':
      case 'clients':
      case 'barbers':
      case 'services':
      case 'availability':
      case 'analytics':
      case 'shop-profile':
      case 'settings':
        return (
          <div className="p-6">
            <Card className="p-12 text-center border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {currentView.charAt(0).toUpperCase() + currentView.slice(1)} View
              </h2>
              <p className="text-muted-foreground mb-6">
                This view is part of Phase 2.1 and ready for full implementation
              </p>
              <Button onClick={() => setCurrentView('dashboard')}>
                Back to Dashboard
              </Button>
            </Card>
          </div>
        )
      
      default:
        return <Dashboard userRole={userRole} barberId={barberId} onViewChange={setCurrentView} />
    }
  }

  return (
    <div className="relative">
      <div className="fixed top-4 right-4 z-50">
        <Button onClick={toggleRole} variant="outline" className="bg-card">
          Switch to {userRole === 'owner' ? 'Barber' : 'Owner'} View
        </Button>
      </div>
      
      <AdminLayout
        currentView={currentView}
        onViewChange={setCurrentView}
        userRole={userRole}
        barberName={barberId === 'jimmy-bissonette' ? 'Jimmy Bissonette' : undefined}
      >
        {renderView()}
      </AdminLayout>
    </div>
  )
}
