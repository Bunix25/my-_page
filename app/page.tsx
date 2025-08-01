"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Code, Sparkles, Menu, X, Phone, Mail, MapPin } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"

// Components
import Social from "@/components/social"
import Stats from "@/components/stats"
import ParticleField from "@/components/particle-field"
import SkillsGlobe from "@/components/skills-globe"
import AnimatedText from "@/components/animated-text"
import InteractiveTerminal from "@/components/interactive-terminal"
import CustomCursor from "@/components/custom-cursor"
import ScrollProgress from "@/components/scroll-progress"

const Home = () => {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 0.2])
  const skillsScale = useTransform(scrollYProgress, [0.2, 0.4], [0.8, 1])
  const terminalOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1])

  // Scroll to top on page load/refresh
  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0)
    
    // Also scroll to top after a brief delay to ensure it takes effect
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      if (scrollPosition < windowHeight * 0.5) {
        setActiveSection("hero")
      } else if (scrollPosition < windowHeight * 1.2) {
        setActiveSection("skills")
      } else {
        setActiveSection("terminal")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      <CustomCursor />
      <ScrollProgress />

      {/* Mobile Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50 md:hidden"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <motion.h1 
            className="text-xl font-bold bg-gradient-to-r from-accent-pink via-accent to-accent-blue bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Slava
          </motion.h1>
          
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/95 backdrop-blur-md border-t border-gray-200/50"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-accent transition-colors font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div ref={containerRef} className="relative min-h-[300vh] overflow-hidden bg-white text-black">
        {/* Animated background elements */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]" />
          <motion.div style={{ opacity: backgroundOpacity }}>
            <ParticleField />
          </motion.div>
        </div>

        {/* Decorative elements - hidden on mobile */}
        <div className="fixed top-20 right-10 w-16 h-16 border border-black/10 rounded-full hidden md:block" />
        <div className="fixed bottom-40 right-20 w-8 h-8 bg-accent/20 rounded-full hidden md:block" />
        <motion.div
          className="fixed top-[30%] left-10 w-24 h-24 hidden md:block"
          animate={{
            rotate: 360,
            borderRadius: ["20% 80% 20% 80%", "80% 20% 80% 20%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            background: "linear-gradient(45deg, rgba(142, 255, 170, 0.2), rgba(0, 255, 255, 0.1))",
            boxShadow: "0 0 20px rgba(142, 255, 170, 0.3)",
            backdropFilter: "blur(10px)",
          }}
        />
        <motion.div
          className="fixed top-[60%] right-[15%] w-16 h-16 hidden md:block"
          animate={{
            rotate: 360,
            borderRadius: ["30% 70% 70% 30%", "50% 50% 50% 50%", "30% 70% 30% 70%"],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            background: "linear-gradient(45deg, rgba(255, 100, 200, 0.2), rgba(190, 120, 255, 0.1))",
            boxShadow: "0 0 20px rgba(255, 100, 200, 0.3)",
            backdropFilter: "blur(10px)",
          }}
        />
        <motion.div
          className="fixed bottom-[20%] left-[20%] w-20 h-20 hidden md:block"
          animate={{
            rotate: -360,
            borderRadius: ["50% 50% 50% 50%", "60% 40% 30% 70%", "30% 60% 70% 40%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            background: "linear-gradient(45deg, rgba(80, 170, 255, 0.2), rgba(255, 200, 70, 0.1))",
            boxShadow: "0 0 20px rgba(80, 170, 255, 0.3)",
            backdropFilter: "blur(10px)",
          }}
        />

        {/* Hero Section */}
        <section id="hero" className="min-h-screen pt-[140px] md:pt-[140px] pb-20 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center max-w-[900px] mx-auto relative">
              {/* Background blur effects - enhanced */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-accent-pink/20 rounded-full blur-[150px] -z-10"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 1.5, delay: 0.7 }}
                className="absolute top-40 -right-20 w-[500px] h-[500px] bg-accent-blue/20 rounded-full blur-[150px] -z-10"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 1.5, delay: 0.9 }}
                className="absolute bottom-20 left-40 w-[400px] h-[400px] bg-accent-purple/20 rounded-full blur-[150px] -z-10"
              />

              {/* Glitch effect badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-6 relative group"
              >
                <span className="px-4 md:px-6 py-2.5 border border-accent/50 rounded-full text-accent font-medium inline-block mb-4 backdrop-blur-sm shadow-lg shadow-accent/5 bg-white/80 relative z-10 overflow-hidden text-sm md:text-base">
                  <span className="relative z-10 flex items-center gap-2">
                    <Code className="size-4" />
                    <span>Full Stack Developer</span>
                    <Sparkles className="size-4" />
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-accent/10"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      ease: "linear",
                      repeatDelay: 5,
                    }}
                  />
                </span>

                {/* Glitch effect on hover */}
                <AnimatePresence>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute inset-0 px-4 md:px-6 py-2.5 border border-accent/50 rounded-full text-accent font-medium inline-block mb-4 backdrop-blur-sm shadow-lg shadow-accent/5 bg-white/80 opacity-0 group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 0.5, 0],
                        x: [0, (i - 1) * 4, 0],
                        y: [0, (i - 1) * -2, 0],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        delay: i * 0.1,
                        repeatDelay: 2,
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Code className="size-4" />
                        <span>Full Stack Developer</span>
                        <Sparkles className="size-4" />
                      </span>
                    </motion.span>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Animated heading */}
              <div className="mb-8 text-center">
                <AnimatedText
                  text="Hi, I'm Slava"
                  className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6rem] font-bold leading-[1.1] tracking-tight text-black"
                  highlightClass="text-gradient-rainbow font-extrabold"
                  highlightWords={["Slava"]}
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="max-w-[600px] mx-auto mb-12 text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed text-center px-4"
              >
                I craft <span className="text-accent font-semibold">innovative digital experiences</span> with
                cutting-edge technologies, focusing on <span className="text-gray-900 font-semibold">performance</span>,
                <span className="text-gray-900 font-semibold"> accessibility</span>, and
                <span className="text-gray-900 font-semibold"> stunning design</span>.
              </motion.p>

              {/* Buttons with advanced hover effects */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-16 px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group w-full sm:w-auto"
                >
                  <Link href="/projects" className="block w-full">
                    <Button
                      variant="default"
                      size="lg"
                      className="bg-gradient-to-r from-accent-pink via-accent to-accent-blue hover:from-accent-pink/90 hover:via-accent/90 hover:to-accent-blue/90 border-0 gap-2 text-white transition-all duration-300 h-14 px-8 rounded-xl shadow-lg shadow-accent-pink/20 w-full sm:w-auto"
                    >
                      <span className="font-medium">View Projects</span>
                      <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  {/* Button glow effect */}
                  <motion.div
                    className="absolute -inset-1 rounded-xl bg-gradient-to-r from-accent-pink/50 via-accent/50 to-accent-blue/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 transition-all duration-300 border-gray-400 bg-white/80 backdrop-blur-sm h-14 px-8 rounded-xl hover:bg-white hover:border-gray-500 shadow-lg relative z-10 text-gray-800 w-full sm:w-auto"
                  >
                    <span className="font-medium">Download CV</span>
                    <Download className="size-5" />
                  </Button>

                  {/* Button subtle glow */}
                  <div className="absolute -inset-1 rounded-xl bg-white/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex justify-center"
              >
                <Social />
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <div className="w-8 h-12 rounded-full border-2 border-gray-400 flex justify-center pt-2">
              <motion.div
                className="w-1 h-2 bg-gray-500 rounded-full"
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            </div>
          </motion.div>
        </section>

        {/* Skills Section with 3D Globe */}
        <section id="skills" className="min-h-screen flex items-center justify-center relative py-20">
          <motion.div className="container mx-auto px-4" style={{ scale: skillsScale }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-black text-center lg:text-left"
                >
                  Technical Expertise
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {[
                    { name: "Frontend Development", level: 95 },
                    { name: "Backend Development", level: 85 },
                    { name: "UI/UX Design", level: 90 },
                    { name: "DevOps & Deployment", level: 80 },
                    { name: "Performance Optimization", level: 88 },
                  ].map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-800 font-medium text-sm md:text-base">{skill.name}</span>
                        <span className="text-accent font-semibold text-sm md:text-base">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-accent to-accent-blue rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.1 * index }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                className="order-1 lg:order-2 h-[300px] md:h-[400px] lg:h-[500px] relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <SkillsGlobe />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Interactive Terminal Section */}
        <section className="min-h-screen flex items-center justify-center relative py-20">
          <motion.div className="container mx-auto px-4" style={{ opacity: terminalOpacity }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center text-black"
            >
              Let's Connect
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <InteractiveTerminal />
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="container mx-auto px-4"
          >
            <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-black">Get In Touch</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Phone className="w-8 h-8 text-accent mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </motion.div>

                <motion.div
                  className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Mail className="w-8 h-8 text-accent mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">hello@slava.dev</p>
                </motion.div>

                <motion.div
                  className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <MapPin className="w-8 h-8 text-accent mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-600">San Francisco, CA</p>
                </motion.div>
              </div>

              <Stats />
            </div>
          </motion.div>
        </section>
      </div>
    </>
  )
}

export default Home

