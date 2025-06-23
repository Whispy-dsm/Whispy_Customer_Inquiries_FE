"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Send, CheckCircle, MessageCircle, Shield, Upload, X, ImageIcon } from "lucide-react"
import ChatRoom from "./chat-room"
import AdminPage from "./admin-page"

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 제출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/") || file.type === "application/pdf"
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
      return isValidType && isValidSize
    })

    setUploadedFiles((prev) => [...prev, ...validFiles].slice(0, 5)) // 최대 5개 파일
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (showChat) {
    return <ChatRoom onBack={() => setShowChat(false)} />
  }

  if (showAdmin) {
    return <AdminPage onBack={() => setShowAdmin(false)} />
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-slate-900" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">문의 완료!</h2>
            <p className="text-slate-600 mb-6">소중한 문의를 보내주셔서 감사합니다. 빠른 시일 내에 답변드리겠습니다.</p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold"
            >
              새 문의하기
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고 섹션 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Whispy</h1>
          <p className="text-slate-300">문의하기</p>
        </div>

        {/* 문의 폼 카드 */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-slate-900">궁금한 것이 있으신가요?</CardTitle>
            <CardDescription className="text-slate-600">
              언제든지 편하게 문의해주세요. 빠르게 답변드리겠습니다.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-700 font-medium">
                  문의 카테고리
                </Label>
                <Select required>
                  <SelectTrigger className="border-slate-200 focus:border-yellow-400 focus:ring-yellow-400">
                    <SelectValue placeholder="문의 유형을 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ui">UI/UX 문제</SelectItem>
                    <SelectItem value="functionality">기능 오류</SelectItem>
                    <SelectItem value="performance">성능 문제</SelectItem>
                    <SelectItem value="security">보안 문제</SelectItem>
                    <SelectItem value="compatibility">호환성 문제</SelectItem>
                    <SelectItem value="data">데이터 오류</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  이메일
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="pl-10 border-slate-200 focus:border-yellow-400 focus:ring-yellow-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-700 font-medium">
                  문의 제목
                </Label>
                <Input
                  id="title"
                  placeholder="문의 제목을 입력해주세요"
                  required
                  className="border-slate-200 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-700 font-medium">
                  문의 내용
                </Label>
                <Textarea
                  id="description"
                  placeholder="자세한 문의 내용을 입력해주세요..."
                  required
                  rows={5}
                  className="border-slate-200 focus:border-yellow-400 focus:ring-yellow-400 resize-none"
                />
              </div>

              {/* 파일 업로드 섹션 */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">첨부 파일 (선택사항)</Label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 hover:border-yellow-400 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-sm text-slate-600 text-center">클릭하여 파일을 선택하거나 드래그하여 업로드</p>
                    <p className="text-xs text-slate-500 mt-1">이미지, PDF 파일 (최대 10MB, 5개까지)</p>
                  </label>
                </div>

                {/* 업로드된 파일 목록 */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2 mt-3">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-yellow-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                            <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-3 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      전송 중...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      문의하기
                    </div>
                  )}
                </Button>
              </div>

              <div className="mt-3">
                <Button
                  type="button"
                  onClick={() => setShowChat(true)}
                  variant="outline"
                  className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900 py-3"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  실시간 채팅
                </Button>
              </div>

              <div className="mt-2">
                <Button
                  type="button"
                  onClick={() => setShowAdmin(true)}
                  variant="outline"
                  className="w-full border-slate-400 text-slate-400 hover:bg-slate-100 hover:text-slate-900 py-2 text-sm"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  어드민 페이지
                </Button>
              </div>
            </form>

            {/* 신뢰 지표 */}
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">🔒 개인정보를 안전하게 보호합니다</p>
            </div>
          </CardContent>
        </Card>

        {/* 하단 정보 */}
        <div className="mt-8 text-center text-slate-400 text-sm">
          <p>© 2024 Whispy. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
