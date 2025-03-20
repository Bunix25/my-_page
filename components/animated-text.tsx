"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  highlightClass?: string
  highlightWords?: string[]
}

const AnimatedText = ({ text, className, highlightClass, highlightWords = [] }: AnimatedTextProps) => {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let currentIndex = 0

    const typeText = () => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex))
        currentIndex++
        timeout = setTimeout(typeText, 100)
      } else {
        setIsTyping(false)
      }
    }

    typeText()

    return () => clearTimeout(timeout)
  }, [text])

  const renderText = () => {
    if (!highlightWords.length) {
      return displayText
    }

    // Split text and highlight specific words
    const words = displayText.split(" ")

    return words.map((word, index) => {
      const shouldHighlight = highlightWords.includes(word)

      return (
        <span key={index} className={shouldHighlight ? highlightClass : ""}>
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      )
    })
  }

  return (
    <motion.h1 className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {renderText()}
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
          className="inline-block ml-1 w-2 h-12 bg-gradient-to-b from-accent-pink via-accent to-accent-blue"
        />
      )}
    </motion.h1>
  )
}

export default AnimatedText

