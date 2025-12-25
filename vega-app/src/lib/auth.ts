import { supabase } from "./supabase"

export const signInWithGoogle = () =>
  supabase.auth.signInWithOAuth({ provider: "google" })

export const signInWithDiscord = () =>
  supabase.auth.signInWithOAuth({ provider: "discord" })

export const signInWithMagicLink = (email: string) =>
  supabase.auth.signInWithOtp({ email })

export const signUpWithEmail = (email: string, password: string) =>
  supabase.auth.signUp({ email, password })

export const signInWithEmail = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password })

export const signOut = () => supabase.auth.signOut()
