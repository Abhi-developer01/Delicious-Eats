import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// This route handles the initial redirection to Google's OAuth screen.
export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  // Get the URL to redirect the user to for Google's sign-in page.
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // This is the URL Supabase will redirect back to after authentication.
      redirectTo: `${requestUrl.origin}/auth/callback`,
    },
  })

  // If there's an error or the URL is missing, redirect to an error page.
  if (error || !data.url) {
    console.error('Error during Google sign-in redirect:', error)
    return NextResponse.redirect(`${requestUrl.origin}/login?error=Could not authenticate user`)
  }

  // Redirect the user to the Google sign-in page.
  // This is a server-side redirect, which is more likely to be respected by webviews.
  return NextResponse.redirect(data.url)
}
