"use client"

import { useState } from "react"
import AdminLogin from "./admin-login"
import AdminDashboard from "./admin-dashboard"

interface AdminPageProps {
  onBack?: () => void
}

export default function AdminPage({ onBack }: AdminPageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  if (isLoggedIn) {
    return <AdminDashboard onLogout={handleLogout} />
  }

  return <AdminLogin onLogin={handleLogin} onBack={onBack} />
}
