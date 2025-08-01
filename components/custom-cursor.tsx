"use client"

import { useEffect, useState } from "react"

const CustomCursor = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Ensure default cursor is visible by removing any 'cursor: none' styles
    document.documentElement.style.cursor = 'auto'
    document.body.style.cursor = 'auto'
    
    // Find and reset any elements that might have cursor: none
    const elementsWithHiddenCursor = document.querySelectorAll('[style*="cursor: none"]')
    elementsWithHiddenCursor.forEach(el => {
      (el as HTMLElement).style.cursor = 'auto'
    })
    
    return () => {
      // Cleanup not needed as we want the cursor to remain visible
    }
  }, [])
  
  // Only render on client side to prevent hydration mismatch
  if (!isClient) {
    return null
  }
  
  return null
}

export default CustomCursor

