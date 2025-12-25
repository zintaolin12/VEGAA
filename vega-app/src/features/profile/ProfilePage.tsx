import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type UserProfile = {
  id: string;
  email: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? "",
        });
      }
      setLoading(false);
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email ?? "",
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return <div className="text-blue-400">Loading profile…</div>;
  }

  /* ================= AUTHENTICATED ================= */
  if (user) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <h1 className="text-xl font-semibold text-blue-400">Profile</h1>

        <div className="bg-[#0b1220] border border-blue-900/30 rounded p-6 space-y-4">
          <div>
            <p className="text-xs text-blue-400">Email</p>
            <p className="text-white">{user.email}</p>
          </div>

          <div>
            <p className="text-xs text-blue-400">User ID</p>
            <p className="text-xs text-blue-300 break-all">{user.id}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-3 rounded bg-red-600/80 hover:bg-red-600 text-white"
        >
          Logout
        </button>
      </div>
    );
  }

  /* ================= UNAUTHENTICATED ================= */
  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-xl font-semibold text-blue-400">
        Login to VEGA
      </h1>

      <div className="bg-[#0b1220] border border-blue-900/30 rounded p-6 space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full bg-black border border-blue-900/40 text-white px-4 py-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full bg-black border border-blue-900/40 text-white px-4 py-3 rounded"
        />

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 text-white"
        >
          Login
        </button>
      </div>

      <p className="text-xs text-blue-400 text-center">
        Accounts are managed securely via Supabase
      </p>
    </div>
  );
}
