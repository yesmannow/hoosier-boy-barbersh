import { useState } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { PublicApp } from '@/components/public/PublicApp'
import { AdminApp } from '@/components/admin/AdminApp'
import { UserCircle, Scissors } from '@phosphor-icons/react'

type AppMode = 'public' | 'admin'

function App() {
  const [appMode, setAppMode] = useState<AppMode>('public')
  const [userRole, setUserRole] = useState<'owner' | 'barber'>('owner')

  const toggleRole = () => {
    if (userRole === 'owner') {
      setUserRole('barber')
    } else {
      setUserRole('owner')
    }
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button 
          onClick={() => setAppMode('public')} 
          variant={appMode === 'public' ? 'default' : 'outline'}
          size="sm"
          className="bg-card shadow-lg"
        >
          <UserCircle size={16} className="mr-2" />
          Public
        </Button>
        <Button 
          onClick={() => setAppMode('admin')} 
          variant={appMode === 'admin' ? 'default' : 'outline'}
          size="sm"
          className="bg-card shadow-lg"
        >
          <Scissors size={16} className="mr-2" />
          Admin
        </Button>
        {appMode === 'admin' && (
          <Button onClick={toggleRole} variant="outline" size="sm" className="bg-card shadow-lg">
            Switch to {userRole === 'owner' ? 'Barber' : 'Owner'} View
          </Button>
        )}
      </div>

      {appMode === 'public' ? <PublicApp /> : <AdminApp userRole={userRole} />}
      
      <Toaster />
    </>
  )
}

export default App
