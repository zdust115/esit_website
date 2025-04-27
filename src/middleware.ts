// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // Escludi i percorsi pubblici (login, API auth, static, ecc.)
  const publicPaths = ['/login', '/api/auth', '/_next', '/favicon.ico']
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Verifica l’esistenza del cookie di sessione
  const token = req.cookies.get('next-auth.session-token')
  if (!token) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('from', req.url)  // opzionale: per tornare alla pagina desiderata
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}
