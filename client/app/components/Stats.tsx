'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, MessageCircle, TrendingUp } from 'lucide-react'

interface StatsProps {
  totalExtractions: number
  extractedCount: number
}

const Stats: React.FC<StatsProps> = ({ totalExtractions, extractedCount }) => {
  const stats = [
    {
      icon: MessageCircle,
      label: "Bình luận đã trích xuất",
      value: totalExtractions.toLocaleString(),
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Users,
      label: "Người dùng hoạt động",
      value: "2,847",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: TrendingUp,
      label: "Tỷ lệ thành công",
      value: "98.5%",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + (0.1 * index) }}
              className="text-right"
            >
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </motion.div>
          </div>
          <p className="text-gray-600 font-medium">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Stats 