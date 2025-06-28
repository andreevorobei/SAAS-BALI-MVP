import { useState, useEffect } from 'react'
import { supabase, type Profile } from '@/lib/supabase'
import { useAuth } from './useAuth'

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchProfile()
    } else {
      setProfile(null)
      setLoading(false)
    }
  }, [user])

  const fetchProfile = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (data) {
      setProfile(data)
    }
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error)
    }
    setLoading(false)
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'No user' }

    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, ...updates })
      .select()
      .single()

    if (data) {
      setProfile(data)
    }
    return { data, error }
  }

  const createProfile = async (name: string, goals?: string) => {
    if (!user) return { error: 'No user' }

    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        name,
        goals: goals || null,
      })
      .select()
      .single()

    if (data) {
      setProfile(data)
    }
    return { data, error }
  }

  return {
    profile,
    loading,
    updateProfile,
    createProfile,
    refetch: fetchProfile,
  }
}