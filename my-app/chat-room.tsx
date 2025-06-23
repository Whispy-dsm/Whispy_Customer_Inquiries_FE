"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, MessageCircle, User, Shield, Paperclip, X, ImageIcon, FileText, Download } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "admin"
  timestamp: Date
  files?: File[]
}

interface ChatRoomProps {
  onBack?: () => void
}

export default function ChatRoom({ onBack }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "안녕하세요! 문의해주신 내용에 대해 도움을 드리겠습니다.",
      sender: "admin",
      timestamp: new Date(Date.now() - 60000),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isConnected, setIsConnected] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) => {
      const isValidType =
        file.type.startsWith("image/") || file.type === "application/pdf" || file.type.startsWith("text/")
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
      return isValidType && isValidSize
    })

    setUploadedFiles((prev) => [...prev, ...validFiles].slice(0, 3)) // 최대 3개 파일
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

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="w-4 h-4" />
    return <FileText className="w-4 h-4" />
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() && uploadedFiles.length === 0) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
      files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
    setUploadedFiles([])

    // 어드민 응답 시뮬레이션
    setTimeout(
      () => {
        const adminResponse: Message = {
          id: (Date.now() + 1).toString(),
          text:
            uploadedFiles.length > 0
              ? "파일을 확인했습니다. 추가로 설명해주실 내용이 있나요?"
              : "네, 확인했습니다. 조금 더 자세히 설명해주시겠어요?",
          sender: "admin",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, adminResponse])
      },
      1000 + Math.random() * 2000,
    )
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[90vh] max-h-[600px] flex flex-col">
        {/* 헤더 */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 mb-4">
          <CardHeader className="text-center py-4">
            <div className="flex items-center justify-between">
              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-600 hover:text-slate-900">
                  ← 뒤로
                </Button>
              )}
              <div className="flex items-center gap-3 flex-1 justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Whispy 실시간 상담</h1>
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
                    {isConnected ? "연결됨" : "연결 끊김"}
                  </div>
                </div>
              </div>
              <div className="w-16"></div> {/* 균형을 위한 빈 공간 */}
            </div>
          </CardHeader>
        </Card>

        {/* 채팅 영역 */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 flex-1 flex flex-col min-h-0">
          <CardContent className="flex-1 flex flex-col p-0 min-h-0">
            {/* 메시지 목록 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback
                        className={
                          message.sender === "user" ? "bg-yellow-400 text-slate-900" : "bg-slate-200 text-slate-700"
                        }
                      >
                        {message.sender === "user" ? <User className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                      {/* 파일들 표시 */}
                      {message.files && message.files.length > 0 && (
                        <div className="space-y-1">
                          {message.files.map((file, fileIndex) => (
                            <div
                              key={fileIndex}
                              className={`flex items-center gap-2 p-2 rounded-lg border ${
                                message.sender === "user"
                                  ? "bg-yellow-300 border-yellow-400"
                                  : "bg-white border-slate-200"
                              }`}
                            >
                              <div
                                className={`w-6 h-6 rounded flex items-center justify-center ${
                                  message.sender === "user"
                                    ? "bg-yellow-500 text-slate-900"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {getFileIcon(file)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-xs font-medium truncate ${
                                    message.sender === "user" ? "text-slate-900" : "text-slate-700"
                                  }`}
                                >
                                  {file.name}
                                </p>
                                <p
                                  className={`text-xs ${
                                    message.sender === "user" ? "text-slate-700" : "text-slate-500"
                                  }`}
                                >
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`p-1 h-6 w-6 ${
                                  message.sender === "user"
                                    ? "hover:bg-yellow-500 text-slate-700"
                                    : "hover:bg-slate-200 text-slate-500"
                                }`}
                              >
                                <Download className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 텍스트 메시지 */}
                      {message.text && (
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            message.sender === "user" ? "bg-yellow-400 text-slate-900" : "bg-slate-100 text-slate-900"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${message.sender === "user" ? "text-slate-700" : "text-slate-500"}`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* 입력 영역 */}
            <div className="border-t border-slate-200 p-4">
              {/* 업로드된 파일 미리보기 */}
              {uploadedFiles.length > 0 && (
                <div className="mb-3 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center">
                          {getFileIcon(file)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-900 truncate">{file.name}</p>
                          <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-slate-400 hover:text-red-500 p-1 h-6 w-6"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="file"
                  id="chat-file-upload"
                  multiple
                  accept="image/*,.pdf,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("chat-file-upload")?.click()}
                  disabled={!isConnected || uploadedFiles.length >= 3}
                  className="border-slate-200 text-slate-600 hover:bg-slate-50 px-2"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 border-slate-200 focus:border-yellow-400 focus:ring-yellow-400"
                  disabled={!isConnected}
                />
                <Button
                  type="submit"
                  disabled={(!newMessage.trim() && uploadedFiles.length === 0) || !isConnected}
                  className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* 하단 정보 */}
        <div className="mt-4 text-center text-slate-400 text-xs">
          <p>🔒 모든 대화는 안전하게 암호화됩니다</p>
        </div>
      </div>
    </div>
  )
}
