import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import {
  signInWithGoogle,
  signInWithDiscord,
  signInWithMagicLink,
  signInWithEmail,
  signUpWithEmail,
  signOut,
} from "../../lib/auth"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [sent, setSent] = useState(false)

  if (loading) {
    return <div className="text-blue-400 p-6">Loading profile…</div>
  }

  // ===================== AUTHENTICATED =====================
  if (user) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-[#0b1220] border border-blue-900/30 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-blue-400">Profile</h2>

        <div className="text-sm text-gray-300 space-y-1">
          <p>
            <span className="text-blue-400">Email:</span>{" "}
            {user.email}
          </p>
          <p>
            <span className="text-blue-400">User ID:</span>{" "}
            {user.id}
          </p>
          <p>
            <span className="text-blue-400">Provider:</span>{" "}
            {user.app_metadata.provider}
          </p>
        </div>

        <button
          onClick={signOut}
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-white font-medium"
        >
          Sign out
        </button>
      </div>
    )
  }

  // ===================== LOGIN =====================
  return (
    <div className="max-w-md mx-auto mt-10 bg-[#0b1220] border border-blue-900/30 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-blue-400">
        Sign in to VEGA
      </h2>

      {/* SOCIAL */}
      <div className="space-y-2">
        <button
          onClick={signInWithGoogle}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white"
        >
          Continue with Google
        </button>

        <button
          onClick={signInWithDiscord}
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded text-white"
        >
          Continue with Discord
        </button>
      </div>

      <div className="text-center text-xs text-gray-400">OR</div>

      {/* EMAIL */}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="w-full bg-black border border-blue-900/30 px-3 py-2 rounded"
      />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        className="w-full bg-black border border-blue-900/30 px-3 py-2 rounded"
      />

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => signInWithEmail(email, password)}
          className="bg-blue-600 py-2 rounded"
        >
          Sign In
        </button>

        <button
          onClick={() => signUpWithEmail(email, password)}
          className="bg-blue-800 py-2 rounded"
        >
          Sign Up
        </button>
      </div>

      {/* MAGIC LINK */}
      <button
        onClick={async () => {
          await signInWithMagicLink(email)
          setSent(true)
        }}
        className="w-full border border-blue-900/30 py-2 rounded"
      >
        Send magic link
      </button>

      {sent && (
        <p className="text-xs text-green-400 text-center">
          Magic link sent. Check your email.
        </p>
      )}
    </div>
  )
}
