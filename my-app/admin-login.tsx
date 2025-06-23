"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Shield, Eye, EyeOff } from "lucide-react"

interface AdminLoginProps {
  onLogin: () => void
  onBack?: () => void
}

export default function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // 간단한 로그인 검증 (실제로는 서버에서 처리)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === "admin@whispy.com" && password === "admin123") {
      onLogin()
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고 섹션 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Whispy Admin</h1>
          <p className="text-slate-300">관리자 로그인</p>
        </div>

        {/* 로그인 폼 카드 */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-slate-900">관리자 로그인</CardTitle>
            <CardDescription className="text-slate-600">관리자 계정으로 로그인하여 문의를 관리하세요.</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  이메일
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@whispy.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 border-slate-200 focus:border-yellow-400 focus:ring-yellow-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">
                  비밀번호
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 border-slate-200 focus:border-yellow-400 focus:ring-yellow-400"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-3 transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    로그인 중...
                  </div>
                ) : (
                  "로그인"
                )}
              </Button>

              {onBack && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="w-full border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  뒤로 가기
                </Button>
              )}
            </form>

            {/* 테스트 계정 안내 */}
            <div className="mt-6 p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-600 text-center">
                <strong>테스트 계정:</strong>
                <br />
                이메일: admin@whispy.com
                <br />
                비밀번호: admin123
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 하단 정보 */}
        <div className="mt-8 text-center text-slate-400 text-sm">
          <p>© 2024 Whispy Admin. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
