"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const commands = {
  help: "Available commands: help, about, skills, contact, projects, clear",
  about:
    "I'm a passionate Full Stack Developer with expertise in creating modern web applications using cutting-edge technologies.",
  skills:
    "Frontend: React, Next.js, TypeScript, Tailwind CSS\nBackend: Node.js, Express, GraphQL, MongoDB\nOther: Three.js, Framer Motion, Docker, AWS",
  contact: "Email: slava@example.com\nLinkedIn: linkedin.com/in/slava\nGitHub: github.com/slava",
  projects:
    "1. E-commerce Platform - Next.js, Stripe, MongoDB\n2. 3D Portfolio - Three.js, React, Framer Motion\n3. Real-time Chat - Socket.io, React, Node.js\n4. AI Dashboard - OpenAI API, Next.js, Tailwind",
}

const InteractiveTerminal = () => {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<{ type: "command" | "response"; text: string }[]>([
    { type: "response", text: "Welcome to my interactive terminal! Type 'help' to see available commands." },
  ])
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    setHistory((prev) => [...prev, { type: "command", text: `> ${cmd}` }])

    if (trimmedCmd === "") {
      return
    }

    if (trimmedCmd === "clear") {
      setHistory([])
      return
    }

    const response = commands[trimmedCmd as keyof typeof commands]

    if (response) {
      setHistory((prev) => [...prev, { type: "response", text: response }])
    } else {
      setHistory((prev) => [
        ...prev,
        { type: "response", text: `Command not found: ${trimmedCmd}. Type 'help' to see available commands.` },
      ])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCommand(input)
    setInput("")
  }

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Focus input on terminal click
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <motion.div
      className="bg-black/80 backdrop-blur-md border border-accent/30 rounded-lg overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Terminal header */}
      <div className="bg-black/50 px-4 py-2 flex items-center border-b border-accent/20">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-white/70 text-sm font-mono mx-auto">slava@portfolio ~ </div>
      </div>

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className="h-[300px] overflow-y-auto p-4 font-mono text-sm bg-gradient-to-b from-black/90 to-black/70"
        onClick={focusInput}
      >
        {history.map((item, index) => (
          <div
            key={index}
            className={`mb-2 ${
              item.type === "command"
                ? "text-accent-cyan"
                : item.text.includes("Available commands")
                  ? "text-accent-yellow"
                  : item.text.includes("Command not found")
                    ? "text-accent-pink"
                    : "text-white/90"
            }`}
          >
            {item.text.split("\n").map((line, i) => (
              <div key={i}>
                {line.includes("Frontend:") ? (
                  <span>
                    Frontend: <span className="text-accent-blue">React</span>,{" "}
                    <span className="text-accent-cyan">Next.js</span>,{" "}
                    <span className="text-accent-blue">TypeScript</span>,{" "}
                    <span className="text-accent">Tailwind CSS</span>
                  </span>
                ) : line.includes("Backend:") ? (
                  <span>
                    Backend: <span className="text-accent-green">Node.js</span>,{" "}
                    <span className="text-accent-yellow">Express</span>,{" "}
                    <span className="text-accent-pink">GraphQL</span>,{" "}
                    <span className="text-accent-green">MongoDB</span>
                  </span>
                ) : line.includes("Other:") ? (
                  <span>
                    Other: <span className="text-white">Three.js</span>,{" "}
                    <span className="text-accent-blue">Framer Motion</span>,{" "}
                    <span className="text-accent-cyan">Docker</span>, <span className="text-accent-orange">AWS</span>
                  </span>
                ) : (
                  line
                )}
              </div>
            ))}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-accent-cyan mr-2">{">"}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white/90"
            autoFocus
          />
        </form>
      </div>
    </motion.div>
  )
}

export default InteractiveTerminal

