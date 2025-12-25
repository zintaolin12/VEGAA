import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { supabase } from "../../lib/supabase"
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

  // ================= FETCH PROFILE =================
  useEffect(() => {
    if (!user) return

    supabase
      .from("profiles")
      .select("username, avatar_url")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setUsername(data.username ?? "")
          setAvatar(data.avatar_url ?? null)
        }
      })
  }, [user])

  // ================= SAVE PROFILE =================
  async function saveProfile() {
    if (!user) return
    setSaving(true)

    await supabase.from("profiles").upsert({
      id: user.id,
      username,
      avatar_url: avatar,
      updated_at: new Date().toISOString(),
    })

    setSaving(false)
  }

  // ================= UPLOAD AVATAR =================
  async function uploadAvatar(file: File) {
    if (!user) return

    const ext = file.name.split(".").pop()
    const path = `${user.id}.${ext}`

    await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true })

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(path)

    setAvatar(data.publicUrl)
  }

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="p-6 text-blue-400 text-center">
        Loading profile…
      </div>
    )
  }

  // ================= AUTHENTICATED =================
  if (user) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-[#0b1220] border border-blue-900/30 rounded-lg p-6 space-y-5">
        <h2 className="text-xl font-semibold text-blue-400">
          Account Settings
        </h2>

        {/* AVATAR */}
        <div className="flex items-center gap-4">
          <img
            src={avatar ?? "/avatar-placeholder.png"}
            className="w-16 h-16 rounded-full border border-blue-900/40 object-cover"
          />

          <label className="text-sm cursor-pointer text-blue-400">
            Change avatar
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                e.target.files && uploadAvatar(e.target.files[0])
              }
            />
          </label>
        </div>

        {/* USERNAME */}
        <div>
          <label className="text-xs text-blue-400">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-black border border-blue-900/30 px-3 py-2 rounded mt-1"
            placeholder="Your username"
          />
        </div>

        {/* INFO */}
        <div className="text-xs text-gray-400 space-y-1">
          <p>Email: {user.email}</p>
          <p>Provider: {user.app_metadata.provider}</p>
        </div>

        {/* ACTIONS */}
        <button
          onClick={saveProfile}
          disabled={saving}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>

        <button
          onClick={signOut}
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-white"
        >
          Sign out
        </button>
      </div>
    )
  }

  // ================= LOGIN =================
  return (
    <div className="max-w-md mx-auto mt-10 bg-[#0b1220] border border-blue-900/30 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-blue-400">
        Sign in to VEGA
      </h2>

      <button
        onClick={signInWithGoogle}
        className="w-full bg-blue-600 py-2 rounded text-white"
      >
        Continue with Google
      </button>

      <button
        onClick={signInWithDiscord}
        className="w-full bg-indigo-600 py-2 rounded text-white"
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
        type="password"
        placeholder="Password"
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
