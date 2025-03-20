"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const socialLinks = [
  {
    icon: <Github className="size-5" />,
    url: "https://github.com",
    delay: 0.6,
    hoverColor: "group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-gray-700 group-hover:to-gray-900",
    glowColor: "bg-gray-500/20",
  },
  {
    icon: <Linkedin className="size-5" />,
    url: "https://linkedin.com",
    delay: 0.7,
    hoverColor:
      "group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-accent-blue group-hover:to-blue-700",
    glowColor: "bg-accent-blue/20",
  },
  {
    icon: <Twitter className="size-5" />,
    url: "https://twitter.com",
    delay: 0.8,
    hoverColor:
      "group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-accent-blue group-hover:to-blue-400",
    glowColor: "bg-accent-blue/20",
  },
  {
    icon: <Mail className="size-5" />,
    url: "mailto:contact@example.com",
    delay: 0.9,
    hoverColor:
      "group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-accent-pink group-hover:to-red-500",
    glowColor: "bg-accent-pink/20",
  },
]

const Social = () => {
  return (
    <div className="flex gap-6">
      {socialLinks.map((link, index) => (
        <motion.a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-12 h-12 border border-gray-300 rounded-full flex justify-center items-center text-gray-700 ${link.hoverColor} transition-all duration-300 hover:scale-110 shadow-lg bg-white/80 backdrop-blur-sm relative group`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: link.delay }}
          whileHover={{ y: -5 }}
        >
          {link.icon}

          {/* Glow effect on hover */}
          <motion.div
            className={`absolute inset-0 rounded-full ${link.glowColor} blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        </motion.a>
      ))}
    </div>
  )
}

export default Social

