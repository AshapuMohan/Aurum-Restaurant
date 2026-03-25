import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    // Use an environment variable for production, fallback for development
    const adminPassword = process.env.ADMIN_PASSWORD || 'aurum2024';

    if (password === adminPassword) {
      const response = NextResponse.json({ success: true, message: 'Authenticated' });
      
      // Set HTTP-only secure cookie
      response.cookies.set({
        name: 'aurum_admin_token',
        value: 'authenticated',
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: 'strict',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
