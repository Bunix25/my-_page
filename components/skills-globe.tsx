"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const skills = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#000000" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Node.js", color: "#8CC84B" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "Three.js", color: "#000000" },
  { name: "Framer", color: "#0055FF" },
  { name: "GraphQL", color: "#E535AB" },
  { name: "MongoDB", color: "#47A248" },
  { name: "AWS", color: "#FF9900" },
  { name: "Docker", color: "#2496ED" },
  { name: "Git", color: "#F05032" },
  { name: "Figma", color: "#F24E1E" },
  { name: "Vercel", color: "#000000" },
]

const SkillsGlobe = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 200

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Create globe geometry
    const globeGeometry = new THREE.SphereGeometry(80, 64, 64)
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0x333333,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    })
    const globe = new THREE.Mesh(globeGeometry, globeMaterial)
    scene.add(globe)

    // Add colorful atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(85, 64, 64)
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 color1 = vec3(0.3, 0.6, 1.0); // Blue
          vec3 color2 = vec3(1.0, 0.4, 0.8); // Pink
          vec3 color3 = vec3(0.5, 1.0, 0.6); // Green
          
          // Create a rainbow effect based on position
          float t = (vNormal.y + 1.0) * 0.5; // -1 to 1 -> 0 to 1
          vec3 color = mix(color1, color2, t);
          color = mix(color, color3, vNormal.x * 0.5 + 0.5);
          
          gl_FragColor = vec4(color, intensity * 0.5);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    scene.add(atmosphere)

    // Add skills as points on the globe
    const skillsGroup = new THREE.Group()
    scene.add(skillsGroup)

    // Create skill points
    skills.forEach((skill, index) => {
      // Calculate position on sphere
      const phi = Math.acos(-1 + (2 * index) / skills.length)
      const theta = Math.sqrt(skills.length * Math.PI) * phi

      const x = 90 * Math.sin(phi) * Math.cos(theta)
      const y = 90 * Math.sin(phi) * Math.sin(theta)
      const z = 90 * Math.cos(phi)

      // Create point geometry
      const geometry = new THREE.SphereGeometry(3, 16, 16)
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(skill.color),
        transparent: true,
        opacity: 0.8,
      })

      const point = new THREE.Mesh(geometry, material)
      point.position.set(x, y, z)
      point.userData = { name: skill.name }

      // Add to group
      skillsGroup.add(point)

      // Add text label
      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")
      canvas.width = 128
      canvas.height = 64

      if (context) {
        context.fillStyle = "rgba(0, 0, 0, 0)"
        context.fillRect(0, 0, canvas.width, canvas.height)

        context.font = "bold 24px Arial"
        context.fillStyle = skill.color
        context.textAlign = "center"
        context.fillText(skill.name, canvas.width / 2, canvas.height / 2)

        const texture = new THREE.CanvasTexture(canvas)
        const labelMaterial = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
        })

        const label = new THREE.Sprite(labelMaterial)
        label.position.set(x * 1.2, y * 1.2, z * 1.2)
        label.scale.set(30, 15, 1)
        label.visible = false
        label.userData = { isLabel: true, forPoint: point.id }

        skillsGroup.add(label)
      }
    })

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      // Update the raycaster
      raycaster.setFromCamera(mouse, camera)

      // Find intersections
      const intersects = raycaster.intersectObjects(skillsGroup.children)

      // Reset all labels
      skillsGroup.children.forEach((child) => {
        if (child.userData && child.userData.isLabel) {
          child.visible = false
        }
      })

      // Show label for hovered point
      if (intersects.length > 0) {
        const object = intersects[0].object
        if (object.userData && object.userData.name) {
          setHoveredSkill(object.userData.name)

          // Find and show corresponding label
          skillsGroup.children.forEach((child) => {
            if (child.userData && child.userData.isLabel && child.userData.forPoint === object.id) {
              child.visible = true
            }
          })
        }
      } else {
        setHoveredSkill(null)
      }
    }

    window.addEventListener("mousemove", onMouseMove)

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {hoveredSkill && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg border border-gray-200 text-black font-medium"
        >
          <span>{hoveredSkill}</span>
        </motion.div>
      )}
    </div>
  )
}

export default SkillsGlobe

