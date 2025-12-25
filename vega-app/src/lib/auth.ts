import { supabase } from "./supabase";

export async function signInWithMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin,
    },
  });

  if (error) throw error;
}

export async function signOut() {
  await supabase.auth.signOut();
}
