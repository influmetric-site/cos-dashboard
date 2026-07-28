import { createBrowserClient } from '@supabase/ssr'

const DEFAULT_SUPABASE_URL = 'https://phaefjvodotocnvpryzv.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoYWVmanZvZG90b2NudnByeXp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyMTI5MjUsImV4cCI6MjEwMDc4ODkyNX0.vF5YcX89aww_UIR1Ph3GQb7cOAgaLX0BUN3N4Q73sq8'

export function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY
  return Boolean(
    url && 
    key && 
    !url.includes('your-supabase-project') &&
    url.startsWith('https://')
  )
}

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
