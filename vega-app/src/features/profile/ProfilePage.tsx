import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
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

  const [username, setUsername] = useState("")
  const [avatar, setAvatar] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user) return

    supabase
      .from("profiles")
      .select("username, avatar_url")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setUsername(data.username || "")
          setAvatar(data.avatar_url || null)
        }
      })
  }, [user])

  const saveProfile = async () => {
    if (!user) return
    setSaving(true)

    await supabase.from("profiles").upsert({
      id: user.id,
      username,
      avatar_url: avatar,
    })

    setSaving(false)
  }

  if (loading) {
    return <div className="p-6 text-blue-400">Loading profile…</div>
  }

  /* ================= AUTHENTICATED ================= */
  if (user) {
    return (
      <div className="max-w-xl mx-auto p-6 space-y-6">
        <div className="bg-[#0b1220] border border-blue-900/30 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={
                avatar ||
                `https://api.dicebear.com/7.x/identicon/svg?seed=${user.id}`
              }
              className="w-16 h-16 rounded-full border border-blue-900/30"
            />

            <div>
              <p className="text-sm text-blue-400">Signed in as</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          {/* SETTINGS */}
          <div className="space-y-3">
            <label className="text-sm text-blue-400">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black border border-blue-900/30 px-3 py-2 rounded"
              placeholder="yourname"
            />

            <label className="text-sm text-blue-400">Avatar URL</label>
            <input
              value={avatar ?? ""}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full bg-black border border-blue-900/30 px-3 py-2 rounded"
              placeholder="https://..."
            />
          </div>

          <button
            onClick={saveProfile}
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-medium disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save profile"}
          </button>
        </div>

        <button
          onClick={signOut}
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded"
        >
          Sign out
        </button>
      </div>
    )
  }

  /* ================= LOGIN ================= */
  return (
    <div className="max-w-md mx-auto mt-10 bg-[#0b1220] border border-blue-900/30 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold text-blue-400">Sign in to VEGA</h2>

      <button
        onClick={signInWithGoogle}
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
      >
        Continue with Google
      </button>

      <button
        onClick={signInWithDiscord}
        className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded"
      >
        Continue with Discord
      </button>

      <div className="text-center text-xs text-gray-400">OR</div>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
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
          Sign in
        </button>
        <button
          onClick={() => signUpWithEmail(email, password)}
          className="bg-blue-800 py-2 rounded"
        >
          Sign up
        </button>
      </div>

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
