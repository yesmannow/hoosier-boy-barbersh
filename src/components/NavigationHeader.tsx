import { useState, useEffect } from 'react'
import logo from '@/assets/images/Hoosierboy_Barbershop_logo_1.png'

interface NavigationHeaderProps {
  showBackButton?: boolean
  onBack?: () => void
}

export function NavigationHeader({ showBackButton, onBack }: NavigationHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50
      setIsScrolled(window.scrollY > scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="w-full bg-background/95 backdrop-blur border-b border-border transition-all duration-300">
      <div className={`max-w-[1400px] mx-auto px-4 lg:px-6 flex items-center justify-between transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}>
        <div className="flex items-center gap-3">
          {showBackButton && onBack && (
            <button
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground transition-colors -ml-2 pr-2"
            >
              ← Back
            </button>
          )}
          <img 
            src={logo} 
            alt="Hoosier Boy Barbershop" 
            className={`w-auto object-contain transition-all duration-300 ${
              isScrolled ? 'h-8' : 'h-16'
            }`}
          />
        </div>
      </div>
    </div>
  )
}
