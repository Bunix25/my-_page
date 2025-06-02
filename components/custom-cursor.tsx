"use client"

import { useEffect } from "react"

const CustomCursor = () => {
  useEffect(() => {
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
  
  return null
}

export default CustomCursor

