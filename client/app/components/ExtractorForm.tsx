'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Download, Loader2, Key, Link, Hash, CheckCircle, XCircle } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface ExtractorFormProps {
  onExtractionComplete: (count: number) => void
}

const ExtractorForm: React.FC<ExtractorFormProps> = ({ onExtractionComplete }) => {
  const [formData, setFormData] = useState({
    token: '',
    url: '',
    maxComments: '100'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    count?: number
    downloadUrl?: string
    filename?: string
  } | null>(null)
  const [progress, setProgress] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.token.trim()) {
      toast.error('Vui lòng nhập Token API Apify')
      return
    }
    
    if (!formData.url.trim()) {
      toast.error('Vui lòng nhập URL bài đăng Facebook')
      return
    }

    setIsLoading(true)
    setResult(null)
    setProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + Math.random() * 15
      })
    }, 1000)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${API_URL}/api/extract`, {
        token: formData.token,
        url: formData.url,
        maxComments: parseInt(formData.maxComments)
      }, {
        timeout: 300000, // 5 phút timeout
        headers: {
          'Content-Type': 'application/json'
        }
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (response.data.success) {
        setResult(response.data)
        onExtractionComplete(response.data.count)
        toast.success(`Thành công! Đã trích xuất ${response.data.count} bình luận`)
      } else {
        setResult(response.data)
        toast.error(response.data.message)
      }
    } catch (error: any) {
      clearInterval(progressInterval)
      setProgress(0)
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra khi trích xuất'
      setResult({
        success: false,
        message: errorMessage
      })
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault() // Ngăn form submit
    e.stopPropagation() // Ngăn event bubbling
    
    if (result?.downloadUrl) {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const fullUrl = result.downloadUrl.startsWith('http') 
        ? result.downloadUrl 
        : `${API_URL}${result.downloadUrl}`;
      
      // Tạo link download tạm thời
      const link = document.createElement('a');
      link.href = fullUrl;
      link.download = result.filename || 'facebook_comments.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Đang tải file...')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          🚀 Trích xuất bình luận Facebook
        </h2>
        <p className="text-blue-100">
          Nhập thông tin bên dưới để bắt đầu trích xuất
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Token Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <Key className="w-4 h-4 mr-2 text-blue-600" />
            Token API Apify *
          </label>
          <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 <strong>Bạn cần có token API Apify riêng để sử dụng công cụ này.</strong> 
              <br />
              Đăng ký tại{' '}
              <a 
                href="https://apify.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                apify.com
              </a>
              {' '}→ Console → Integrations → API tokens → Create new token
            </p>
          </div>
          <input
            type="text"
            name="token"
            value={formData.token}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Nhập token API Apify của bạn..."
            required
          />
        </motion.div>

        {/* URL Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <Link className="w-4 h-4 mr-2 text-blue-600" />
            URL bài đăng Facebook *
          </label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="https://www.facebook.com/..."
            required
          />
        </motion.div>

        {/* Max Comments Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <Hash className="w-4 h-4 mr-2 text-blue-600" />
            Số lượng bình luận tối đa
          </label>
          <input
            type="number"
            name="maxComments"
            value={formData.maxComments}
            onChange={handleInputChange}
            min="1"
            max="10000"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="100"
          />
        </motion.div>

        {/* Progress Bar */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-100 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Đang xử lý...
              </span>
              <span className="text-sm font-medium text-blue-600">
                {progress.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              />
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Đang trích xuất...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Play className="w-5 h-5 mr-2" />
              Bắt đầu trích xuất
            </div>
          )}
        </motion.button>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-4 rounded-xl border ${
              result.success
                ? 'border-green-200 bg-green-50'
                : 'border-red-200 bg-red-50'
            }`}
          >
            <div className="flex items-center mb-2">
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mr-2" />
              )}
              <span className={`font-semibold ${
                result.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {result.success ? 'Thành công!' : 'Lỗi!'}
              </span>
            </div>
            <p className={`mb-3 ${
              result.success ? 'text-green-700' : 'text-red-700'
            }`}>
              {result.message}
            </p>
            
            {/* Download button trong result box */}
            {result.success && result.downloadUrl && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Tải file CSV
                </button>
              </div>
            )}
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}

export default ExtractorForm 