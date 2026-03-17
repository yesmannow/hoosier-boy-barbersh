import logo from '@/assets/images/Hoosierboy_Barbershop_logo_1.png'

interface NavigationHeaderProps {
  showBackButton?: boolean
  onBack?: () => void
}

export function NavigationHeader({ showBackButton, onBack }: NavigationHeaderProps) {
  return (
    <div className="w-full bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-3 flex items-center justify-between">
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
            className="h-10 w-auto object-contain"
          />
        </div>
      </div>
    </div>
  )
}
