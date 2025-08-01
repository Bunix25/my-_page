"use client"

import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Play, Code, Star, Zap, Eye } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution built with Next.js, TypeScript, and Stripe integration. Features include user authentication, product management, and secure payment processing.",
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS", "Prisma", "PostgreSQL"],
    image: "/api/placeholder/400/250",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    stats: { stars: 245, forks: 89, views: 1200 },
    category: "Full-Stack",
    difficulty: "Advanced"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "Redux"],
    image: "/api/placeholder/400/250",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    stats: { stars: 189, forks: 67, views: 890 },
    category: "Real-time",
    difficulty: "Advanced"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.",
    technologies: ["Vue.js", "OpenWeather API", "Chart.js", "CSS3", "Vite", "PWA"],
    image: "/api/placeholder/400/250",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    stats: { stars: 156, forks: 45, views: 720 },
    category: "Dashboard",
    difficulty: "Intermediate"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js and Framer Motion, featuring smooth animations and responsive design.",
    technologies: ["Next.js", "Framer Motion", "TypeScript", "Tailwind CSS", "Three.js"],
    image: "/api/placeholder/400/250",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    stats: { stars: 98, forks: 23, views: 450 },
    category: "Portfolio",
    difficulty: "Intermediate"
  },
  {
    id: 5,
    title: "Chat Application",
    description: "Real-time chat application with user authentication, message encryption, and file sharing capabilities.",
    technologies: ["React", "Firebase", "Socket.io", "Material-UI", "Node.js", "WebRTC"],
    image: "/api/placeholder/400/250",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    stats: { stars: 203, forks: 78, views: 1100 },
    category: "Communication",
    difficulty: "Advanced"
  },
  {
    id: 6,
    title: "Fitness Tracker",
    description: "A comprehensive fitness tracking app with workout planning, progress analytics, and social features.",
    technologies: ["React Native", "Redux", "GraphQL", "PostgreSQL", "Apollo", "Expo"],
    image: "/api/placeholder/400/250",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    stats: { stars: 167, forks: 56, views: 830 },
    category: "Mobile",
    difficulty: "Advanced"
  }
]

// Particle System Component
const ParticleSystem = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 2 + 0.5,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.speed * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Floating Elements Component
const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 10 - 5, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  )
}

// Interactive Project Card Component
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })

  useEffect(() => {
    if (isHovered && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      rotateX.set((mousePosition.y - centerY) / 10)
      rotateY.set((mousePosition.x - centerX) / 10)
    } else {
      rotateX.set(0)
      rotateY.set(0)
    }
  }, [isHovered, mousePosition, rotateX, rotateY])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative group cursor-pointer ${
        project.featured ? 'lg:col-span-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <motion.div
        className="relative h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden h-full">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Animated Border */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
            }}
            animate={{
              background: [
                'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
                'linear-gradient(45deg, transparent, rgba(147, 51, 234, 0.3), transparent)',
                'linear-gradient(45deg, transparent, rgba(236, 72, 153, 0.3), transparent)',
                'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Project Image/Placeholder */}
          <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Floating Icons */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-6xl text-white/20"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Code />
              </motion.div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30 backdrop-blur-sm">
                {project.category}
              </span>
            </div>

            {/* Difficulty Badge */}
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 text-xs rounded-full border backdrop-blur-sm ${
                project.difficulty === 'Advanced' 
                  ? 'bg-red-500/20 text-red-300 border-red-500/30'
                  : 'bg-green-500/20 text-green-300 border-green-500/30'
              }`}>
                {project.difficulty}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <motion.h3 
              className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300"
              animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
            >
              {project.title}
            </motion.h3>
            
            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech: string, techIndex: number) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: techIndex * 0.1 }}
                  className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded border border-gray-600/50 hover:bg-blue-500/20 hover:text-blue-300 hover:border-blue-500/30 transition-all duration-200"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>{project.stats.stars}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{project.stats.views}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3" />
                <span>{project.difficulty}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <motion.a
                href={project.liveUrl}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 text-sm font-medium text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-4 h-4" />
                <span>Live Demo</span>
              </motion.a>
              <motion.a
                href={project.githubUrl}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200 text-sm font-medium text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Glow Effect */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const categories = ['All', 'Full-Stack', 'Real-time', 'Dashboard', 'Portfolio', 'Communication', 'Mobile']
  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 -z-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        <ParticleSystem />
        <FloatingElements />
      </motion.div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between"
        >
          <Link 
            href="/" 
            className="group flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <motion.div
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.div>
            <span>Back to Home</span>
          </Link>
          
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            style={{ y: textY }}
          >
            My Projects
          </motion.h1>
        </motion.div>
      </header>

      {/* Search and Filter Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="container mx-auto px-6 mb-12"
      >
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm"
            />
            <motion.div
              className="absolute inset-0 rounded-lg border border-transparent"
              animate={{
                boxShadow: searchTerm ? "0 0 20px rgba(59, 130, 246, 0.3)" : "0 0 0px rgba(59, 130, 246, 0)",
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <main className="container mx-auto px-6 pb-16">
        {/* Featured Projects */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <motion.h2 
            className="text-2xl font-semibold mb-8 text-gray-200"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Featured Projects
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.filter(p => p.featured).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.section>

        {/* All Projects */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.h2 
            className="text-2xl font-semibold mb-8 text-gray-200"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            All Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  )
} 