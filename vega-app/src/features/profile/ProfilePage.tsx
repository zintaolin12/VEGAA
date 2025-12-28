import { useEffect, useState, ChangeEvent } from "react"
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
  const [avatar, setAvatar] = useState<string>("")
  const [saving, setSaving] = useState(false)

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    if (!user) return

    supabase
      .from("profiles")
      .select("username, avatar")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setUsername(data.username ?? "")
          setAvatar(data.avatar ?? "")
        }
      })
  }, [user])

  /* ================= SAVE PROFILE ================= */
  const saveProfile = async () => {
    if (!user) return
    setSaving(true)

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      username,
      avatar,
      updated_at: new Date().toISOString(),
    })

    setSaving(false)

    if (error) {
      alert(error.message)
      return
    }

    alert("Profile saved")
  }

  /* ================= AVATAR UPLOAD ================= */
  const uploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files?.[0]) return

    const file = e.target.files[0]
    const ext = file.name.split(".").pop()
    const filePath = `${user.id}.${ext}`

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true })

    if (error) {
      alert(error.message)
      return
    }

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath)

    setAvatar(data.publicUrl)

    await supabase.from("profiles").upsert({
      id: user.id,
      avatar: data.publicUrl,
    })
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
            <div className="relative">
              <img
                src={
                  avatar ||
                  `https://api.dicebear.com/7.x/identicon/svg?seed=${user.id}`
                }
                className="w-20 h-20 rounded-full border border-blue-900/30 object-cover"
              />

              <label className="absolute bottom-0 right-0 bg-blue-600 text-xs px-2 py-1 rounded cursor-pointer">
                Edit
                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadAvatar}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <p className="text-sm text-blue-400">Signed in as</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <label className="text-sm text-blue-400">Username</label>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full bg-black border border-blue-900/30 px-3 py-2 rounded"
          />

          <label className="text-sm text-blue-400">Avatar URL</label>
          <input
            value={avatar}
            onChange={e => setAvatar(e.target.value)}
            className="w-full bg-black border border-blue-900/30 px-3 py-2 rounded"
          />

          <button
            type="button"
            onClick={saveProfile}
            disabled={saving}
            className="w-full bg-blue-600 py-2 rounded disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save profile"}
          </button>
        </div>

        <button
          onClick={signOut}
          className="w-full bg-red-600 py-2 rounded"
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

      <button onClick={signInWithGoogle} className="w-full bg-blue-600 py-2 rounded">
        Continue with Google
      </button>

      <button onClick={signInWithDiscord} className="w-full bg-indigo-600 py-2 rounded">
        Continue with Discord
      </button>

      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full bg-black border border-blue-900/30 px-3 py-2 rounded"
      />

      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="w-full bg-black border border-blue-900/30 px-3 py-2 rounded"
      />

      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => signInWithEmail(email, password)} className="bg-blue-600 py-2 rounded">
          Sign in
        </button>
        <button onClick={() => signUpWithEmail(email, password)} className="bg-blue-800 py-2 rounded">
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
