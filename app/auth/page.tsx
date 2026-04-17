"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [role, setRole] = useState<"student" | "landlord">("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError("")

    // Validate .edu for students
    if (mode === "signup" && role === "student" && !email.endsWith(".edu")) {
      setError("Students must sign up with a .edu email address.")
      setLoading(false)
      return
    }

    if (mode === "signup") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, role }
        }
      })
      if (signUpError) { setError(signUpError.message); setLoading(false); return }

      router.push("/listings")
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) { setError(signInError.message); setLoading(false); return }
      router.push("/listings")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <img src="/images/campus-crib-no-house.png" className="absolute top-[0%] left-1/2 w-[70%] -translate-x-1/2 h-auto" alt="Full logo"/>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md z-0">
        <h1 className="text-2xl font-quickSand font-semibold text-[#6a0d83] mb-6 text-center">
          {mode === "login" ? "Welcome back" : "Join Campus Crib"}
        </h1>

        {mode === "signup" && (
          <>
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-[#ce4993] focus:outline-none"
            />
            <div className="flex gap-3 mb-3">
              {(["student", "landlord"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 rounded-lg border capitalize font-quickSand transition ${
                    role === r
                      ? "bg-gradient-to-r from-[#6a0d83] to-[#ce4993] text-white border-transparent"
                      : "text-gray-600 hover:border-[#ce4993]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </>
        )}

        <input
          type="email"
          placeholder={role === "student" ? "your@university.edu" : "your@email.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-[#ce4993] focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-[#ce4993] focus:outline-none"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-[#6a0d83] to-[#ce4993] text-white font-quickSand font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : mode === "login" ? "Sign In" : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-[#ce4993] hover:underline"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  )
}