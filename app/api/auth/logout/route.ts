import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  
  // Clear the authentication cookie
  response.cookies.delete('aurum_admin_token');

  return response;
}
