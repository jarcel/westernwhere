import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'

interface PageScrollContextType {
  isWelcome: boolean
  dismissWelcome: () => void
}

const PageScrollContext = createContext<PageScrollContextType | null>(null)

export function PageScrollProvider({ children }: { children: ReactNode }) {
  const [isWelcome, setIsWelcome] = useState(true)

  const dismissWelcome = useCallback(() => {
    setIsWelcome(false)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsWelcome(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <PageScrollContext.Provider value={{ isWelcome, dismissWelcome }}>
      {children}
    </PageScrollContext.Provider>
  )
}

export function usePageScroll() {
  const context = useContext(PageScrollContext)
  if (!context) {
    throw new Error('usePageScroll must be used within a PageScrollProvider')
  }
  return context
}
