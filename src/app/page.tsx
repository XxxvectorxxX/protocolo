"use client"
import { useAuth } from "../contexts/auth-context"

export default function HomePage() {
  const { user } = useAuth()
}
