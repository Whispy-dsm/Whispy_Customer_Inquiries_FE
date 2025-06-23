"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Shield, Mail, Clock, MessageCircle, User, LogOut, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Inquiry {
  id: string
  email: string
  category: string
  title: string
  content: string
  status: "new" | "in-progress" | "resolved"
  createdAt: Date
}

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // 샘플 문의 데이터
  const [inquiries] = useState<Inquiry[]>([
    {
      id: "1",
      email: "user1@example.com",
      category: "UI/UX 문제",
      title: "로그인 버튼이 작동하지 않아요",
      content: "로그인 버튼을 클릭해도 아무 반응이 없습니다. 브라우저는 Chrome을 사용하고 있습니다.",
      status: "new",
      createdAt: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      email: "user2@example.com",
      category: "기능 오류",
      title: "파일 업로드가 안 됩니다",
      content: "PDF 파일을 업로드하려고 하는데 계속 오류가 발생합니다.",
      status: "in-progress",
      createdAt: new Date(Date.now() - 7200000),
    },
    {
      id: "3",
      email: "user3@example.com",
      category: "성능 문제",
      title: "페이지 로딩이 너무 느려요",
      content: "메인 페이지 로딩에 10초 이상 걸립니다.",
      status: "resolved",
      createdAt: new Date(Date.now() - 86400000),
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "new":
        return "신규"
      case "in-progress":
        return "처리중"
      case "resolved":
        return "완료"
      default:
        return status
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900">Whispy Admin</CardTitle>
                  <CardDescription>문의 관리 대시보드</CardDescription>
                </div>
              </div>
              <Button
                onClick={onLogout}
                variant="outline"
                className="border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">신규 문의</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {inquiries.filter((i) => i.status === "new").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">처리중</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {inquiries.filter((i) => i.status === "in-progress").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">완료</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {inquiries.filter((i) => i.status === "resolved").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 검색 및 필터 */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="문의 제목, 이메일, 카테고리로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-400" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 border-slate-200 focus:border-yellow-400 focus:ring-yellow-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="new">신규</SelectItem>
                    <SelectItem value="in-progress">처리중</SelectItem>
                    <SelectItem value="resolved">완료</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 문의 목록 */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900">문의 목록 ({filteredInquiries.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredInquiries.map((inquiry, index) => (
                <div
                  key={inquiry.id}
                  className={`p-4 hover:bg-slate-50 transition-colors ${
                    index !== filteredInquiries.length - 1 ? "border-b border-slate-100" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-slate-200 text-slate-700">
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-slate-900 truncate">{inquiry.title}</h3>
                          <p className="text-sm text-slate-600">{inquiry.email}</p>
                        </div>
                        <Badge className={getStatusColor(inquiry.status)}>{getStatusText(inquiry.status)}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-2 line-clamp-2">{inquiry.content}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{inquiry.category}</span>
                        <span>{formatDate(inquiry.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
