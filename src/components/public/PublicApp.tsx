import { useState } from 'react'
import { HomeView } from './HomeView'
import { BookView } from './BookView'
import { BarbersView } from './BarbersView'
import { ShopInfoView } from './ShopInfoView'
import { YouView } from './YouView'
import { House, Calendar, Users, Info, UserCircle } from '@phosphor-icons/react'

type PublicView = 'home' | 'book' | 'barbers' | 'shop' | 'you'

export function PublicApp() {
  const [currentView, setCurrentView] = useState<PublicView>('home')

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={setCurrentView} />
      case 'book':
        return <BookView onNavigate={setCurrentView} />
      case 'barbers':
        return <BarbersView />
      case 'shop':
        return <ShopInfoView />
      case 'you':
        return <YouView onNavigate={setCurrentView} />
      default:
        return <HomeView onNavigate={setCurrentView} />
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="flex-1 pb-20 overflow-y-auto">
        {renderView()}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          <button
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
              currentView === 'home' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <House size={24} weight={currentView === 'home' ? 'fill' : 'regular'} />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={() => setCurrentView('book')}
            className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
              currentView === 'book' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Calendar size={24} weight={currentView === 'book' ? 'fill' : 'regular'} />
            <span className="text-xs font-medium">Book</span>
          </button>

          <button
            onClick={() => setCurrentView('barbers')}
            className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
              currentView === 'barbers' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Users size={24} weight={currentView === 'barbers' ? 'fill' : 'regular'} />
            <span className="text-xs font-medium">Barbers</span>
          </button>

          <button
            onClick={() => setCurrentView('shop')}
            className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
              currentView === 'shop' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Info size={24} weight={currentView === 'shop' ? 'fill' : 'regular'} />
            <span className="text-xs font-medium">Shop</span>
          </button>

          <button
            onClick={() => setCurrentView('you')}
            className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
              currentView === 'you' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <UserCircle size={24} weight={currentView === 'you' ? 'fill' : 'regular'} />
            <span className="text-xs font-medium">You</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
