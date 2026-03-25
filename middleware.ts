import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // We only want to protect /admin/menu and other potential /admin/* routes
  // excluding /admin/login
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    const token = request.cookies.get('aurum_admin_token')?.value

    if (!token || token !== 'authenticated') {
      // Redirect to the login page if not authenticated
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Redirect /admin directly to /admin/menu
  if (path === '/admin') {
    return NextResponse.redirect(new URL('/admin/menu', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*'],
}
