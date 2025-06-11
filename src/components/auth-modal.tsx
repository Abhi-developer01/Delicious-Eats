'use client'

import { useState, useEffect } from 'react'
import { useAuth } from './auth-context'
import { FcGoogle } from 'react-icons/fc'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { signInWithGoogle as signInWithGoogleService, getGoogleSignInUrl } from '@/lib/auth-service'
import { isGoogleAuthBlocked } from '@/lib/browser-detector'


type AuthMode = 'signin' | 'signup' | 'forgot-password'

export function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [showVerificationDialog, setShowVerificationDialog] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [googleSignInUrl, setGoogleSignInUrl] = useState<string | null>(null)
  const [isWebView, setIsWebView] = useState(false)
  const { signIn, signUp } = useAuth()

  useEffect(() => {
    const checkWebView = async () => {
      const blocked = isGoogleAuthBlocked();
      setIsWebView(blocked);
      if (blocked) {
        try {
          const url = await getGoogleSignInUrl();
          setGoogleSignInUrl(url);
        } catch (error) {
          console.error('Failed to get Google sign in URL', error);
          setError('Could not prepare Google Sign-In. Please try again later.');
        }
      }
    };

    if (isOpen) {
      checkWebView();
    }
  }, [isOpen]);

  const handleGoogleSignIn = async () => {

    setError('')
    setLoading(true)
    try {
            await signInWithGoogleService();
      // Supabase handles redirection, so we might not need to explicitly call onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')
    setLoading(true)

    try {
      if (mode === 'signin') {
        await signIn(email, password)
      } else if (mode === 'signup') {
        if (!fullName) {
          setError('Full name is required')
          return
        }
        await signUp(email, password, fullName)
        // For email sign-up, Supabase sends a confirmation email by default
        // if email confirmation is enabled in your Supabase project settings.
        setSubmittedEmail(email)
        setShowVerificationDialog(true)
        // Clear form and reset for next time
        setEmail('')
        setPassword('')
        setFullName('')
        setMode('signin')
        onClose() // Close the main auth modal
        return // Prevent further execution in this submit handler
      } else if (mode === 'forgot-password') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        })
        if (error) throw error
        setSuccessMessage('Password reset link sent to your email!')
        setMode('signin')
        setEmail('')
        return
      }
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>


      {/* Main Auth Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={mode === 'signup'}
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {mode !== 'forgot-password' && (
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            {successMessage && <p className="text-sm font-medium text-green-600">{successMessage}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Send Reset Link'}
            </Button>

            {(mode === 'signin' || mode === 'signup') && (
              <>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                {isWebView ? (
              <Button asChild variant="outline" className="w-full flex items-center justify-center gap-2">
                <a href={googleSignInUrl || '#'}>
                  <FcGoogle className="h-5 w-5" />
                  Sign in with Google
                </a>
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <FcGoogle className="h-5 w-5" />
                Sign in with Google
              </Button>
            )}
              </>
            )}

            <p className="text-center text-sm text-gray-600">
              {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Send Reset Link'}
            </p>
            <p className="text-center text-sm text-gray-600">
              {mode === 'signin' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Sign Up
                  </button>

                  <br />
                  {' '}
                  <button
                    type="button"
                    onClick={() => setMode('forgot-password')}
                    className="text-primary text-left text-slate-400 mt-8 underline-offset-4 hover:underline hover:text-slate-800"
                  >
                    Forgot Password?
                  </button>
                </>
              ) : mode === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Remember your password?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Sign In
                  </button>
                </>
              )}
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* Verification Email Sent Modal */}
      <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Check Your Email</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              A verification email has been sent to{' '}
              <strong className="text-foreground">{submittedEmail}</strong>.
              Please check your inbox (and spam folder) and follow the instructions to complete your registration.
            </p>
          </div>
          <Button onClick={() => setShowVerificationDialog(false)} className="w-full">
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}