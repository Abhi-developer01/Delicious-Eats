'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/types/supabase'
import { supabase } from '@/lib/supabase'
import { requestNotificationPermission } from '@/lib/firebase-messaging'

type AuthContextType = {
  user: User | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user ID:', userId)
      const { data, error, status } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      console.log('Supabase response:', { data, error, status })

      if (error && status !== 406) {
        console.error('Error fetching profile:', error)
        throw error
      }

      if (data) {
        console.log('Profile data found:', data)
        setProfile(data)
        
        // Request notification permission and update FCM token
        try {
          console.log('Requesting notification permission...')
          const fcmToken = await requestNotificationPermission()
          console.log('FCM token received:', fcmToken)
          
          if (fcmToken && fcmToken !== data.fcm_token) {
            console.log('Updating FCM token in profile...')
            await updateFCMToken(userId, fcmToken)
            // Update local profile state with new token
            setProfile({ ...data, fcm_token: fcmToken })
          }
        } catch (error) {
          console.error('Error handling notifications:', error)
        }
      } else {
        console.warn('No profile found for user:', userId)
        setProfile(null)
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error)
    }
  }

  const updateFCMToken = async (userId: string, token: string) => {
    try {
      console.log('Updating FCM token for user:', userId)
      const { error } = await supabase
        .from('profiles')
        .update({ fcm_token: token })
        .eq('id', userId)

      if (error) {
        console.error('Error updating FCM token:', error)
        throw error
      }

      console.log('FCM token updated successfully')
    } catch (error) {
      console.error('Error in updateFCMToken:', error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      if (data.user) {
        console.log('User signed in successfully:', data.user.id)
        await fetchProfile(data.user.id)
      }
    } catch (error) {
      console.error('Error in signIn:', error)
      throw error
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })
      if (error) throw error
      if (data.user) {
        console.log('User signed up successfully:', data.user.id)
        await fetchProfile(data.user.id)
      }
    } catch (error) {
      console.error('Error in signUp:', error)
      throw error
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
} 