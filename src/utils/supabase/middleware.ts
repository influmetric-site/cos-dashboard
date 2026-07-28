import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const DEFAULT_SUPABASE_URL = 'https://phaefjvodotocnvpryzv.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoYWVmanZvZG90b2NudnByeXp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyMTI5MjUsImV4cCI6MjEwMDc4ODkyNX0.vF5YcX89aww_UIR1Ph3GQb7cOAgaLX0BUN3N4Q73sq8'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY

  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl.includes('your-supabase-project') ||
    !supabaseUrl.startsWith('https://')
  ) {
    return supabaseResponse
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const url = request.nextUrl.clone()
    const path = url.pathname

    const isProtectedRoute =
      path.startsWith('/cos') ||
      path.startsWith('/admin') ||
      path === '/' ||
      ['/metrik', '/buyume', '/performans', '/strateji', '/raporlar', '/trend-sensoru', '/pazar-analizi'].some((p) =>
        path.startsWith(p)
      )

    // Protection Guard: Unauthenticated access to protected routes redirects to /login
    if (!user && isProtectedRoute) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    // Redirect authenticated users from /login to /cos
    if (user && path === '/login') {
      url.pathname = '/cos'
      return NextResponse.redirect(url)
    }

    // RBAC Admin Guard: Accessing /admin requires role === 'admin' or email === 'batur.guzey@gmail.com'
    if (user && path.startsWith('/admin')) {
      const isSuperAdminEmail = user.email === 'batur.guzey@gmail.com'
      
      if (!isSuperAdminEmail) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle()

        if (!profile || profile.role !== 'admin') {
          url.pathname = '/cos'
          return NextResponse.redirect(url)
        }
      }
    }
  } catch (error) {
    console.error('Middleware auth check error:', error)
  }

  return supabaseResponse
}
