"use client"

import { motion } from "framer-motion"
import CountUp from "react-countup"

const statsData = [
  {
    value: 5,
    suffix: "+",
    text: "Years of Experience",
    icon: "⏱️",
    bgClass: "bg-gradient-to-br from-accent-blue/20 to-accent-cyan/20 border-accent-blue/30",
    textClass: "text-accent-blue font-bold",
  },
  {
    value: 100,
    suffix: "+",
    text: "Projects Completed",
    icon: "🚀",
    bgClass: "bg-gradient-to-br from-accent-pink/20 to-accent-purple/20 border-accent-pink/30",
    textClass: "text-accent-pink font-bold",
  },
  {
    value: 50,
    suffix: "+",
    text: "Happy Clients",
    icon: "😊",
    bgClass: "bg-gradient-to-br from-accent/20 to-accent-yellow/20 border-accent/30",
    textClass: "text-accent font-bold",
  },
  {
    value: 10,
    suffix: "+",
    text: "Awards Received",
    icon: "🏆",
    bgClass: "bg-gradient-to-br from-accent-orange/20 to-accent-yellow/20 border-accent-orange/30",
    textClass: "text-accent-orange font-bold",
  },
]

const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {statsData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
          className="text-center group"
        >
          <motion.div
            className={`text-4xl mb-3 w-16 h-16 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border ${item.bgClass} group-hover:border-accent/50 transition-colors duration-300`}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.3 },
            }}
          >
            <span>{item.icon}</span>
          </motion.div>

          <div className="relative mb-2">
            <div className={`text-4xl md:text-5xl font-bold flex justify-center items-center gap-1 ${item.textClass}`}>
              <CountUp end={item.value} duration={3} enableScrollSpy scrollSpyOnce />
              <span>{item.suffix}</span>
            </div>
            <motion.div
              className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 ${
                index % 2 === 0
                  ? "bg-gradient-to-r from-accent-pink/50 to-accent-purple/50"
                  : "bg-gradient-to-r from-accent-blue/50 to-accent-cyan/50"
              } rounded-full`}
              initial={{ width: 0 }}
              whileInView={{ width: "40%" }}
              transition={{ duration: 1, delay: index * 0.2 + 1 }}
              viewport={{ once: true }}
            />
          </div>
          <p className="text-gray-700">{item.text}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default Stats

