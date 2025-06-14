'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Download, Sparkles, Facebook, Github, Heart } from 'lucide-react'
import ExtractorForm from './components/ExtractorForm'
import Header from './components/Header'
import Stats from './components/Stats'

export default function Home() {
  const [extractedCount, setExtractedCount] = useState(0)
  const [totalExtractions, setTotalExtractions] = useState(1247) // Mock data

  const handleExtractionComplete = (count: number) => {
    setExtractedCount(count)
    setTotalExtractions(prev => prev + count)
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-indigo-600/10"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mr-4"
              >
                <Sparkles className="w-8 h-8 text-blue-600" />
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Trích xuất bình luận Facebook
              </h1>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="ml-4"
              >
                <Facebook className="w-8 h-8 text-blue-600" />
              </motion.div>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Công cụ chuyên nghiệp để trích xuất bình luận Facebook nhanh chóng và hiệu quả
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 text-sm text-gray-500"
            >
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
                Trích xuất nhanh chóng
              </div>
              <div className="flex items-center">
                <Download className="w-4 h-4 mr-2 text-green-500" />
                Xuất file CSV
              </div>
              <div className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                Giao diện đẹp mắt
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <Stats totalExtractions={totalExtractions} extractedCount={extractedCount} />

          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <ExtractorForm onExtractionComplete={handleExtractionComplete} />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tại sao chọn công cụ của chúng tôi?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Được thiết kế với công nghệ hiện đại và giao diện thân thiện
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: "Trích xuất nhanh",
                description: "Lấy hàng nghìn bình luận chỉ trong vài phút",
                color: "text-blue-500"
              },
              {
                icon: Download,
                title: "Xuất CSV dễ dàng",
                description: "Tải về file CSV với đầy đủ thông tin chi tiết",
                color: "text-green-500"
              },
              {
                icon: Sparkles,
                title: "Giao diện đẹp",
                description: "Thiết kế hiện đại với animation mượt mà",
                color: "text-purple-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Facebook className="w-6 h-6 text-blue-400 mr-2" />
              <span className="text-xl font-semibold">Facebook Comment Extractor</span>
            </div>
            <p className="text-gray-400 mb-6">
              Công cụ trích xuất bình luận Facebook chuyên nghiệp
            </p>
            <div className="flex items-center justify-center text-gray-400">
              <span>Được tạo với</span>
              <Heart className="w-4 h-4 text-red-500 mx-2" />
              <span>bởi ForLC Team</span>
            </div>
          </motion.div>
        </div>
      </footer>
    </main>
  )
} 