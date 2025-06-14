'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Facebook, Menu } from 'lucide-react'

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="p-2 bg-blue-600 rounded-lg">
              <Facebook className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">
              FB Extractor
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Trang chủ
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Hướng dẫn
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Liên hệ
            </motion.a>
          </nav>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header 