import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          goals: string | null
          profession: string | null
          overall_progress: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          goals?: string | null
          profession?: string | null
          overall_progress?: number
        }
        Update: {
          name?: string
          goals?: string | null
          profession?: string | null
          overall_progress?: number
        }
      }
      user_skills: {
        Row: {
          id: string
          user_id: string
          skill_template_id: number
          current_progress: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          skill_template_id: number
          current_progress?: number
        }
        Update: {
          current_progress?: number
        }
      }
      development_milestones: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          type: 'start' | 'milestone' | 'goal'
          duration: string | null
          priority: 'high' | 'medium' | 'low' | null
          category: 'personal_brand' | 'skills' | 'experience' | 'job_search' | null
          completed: boolean
          progress: number
          position: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          title: string
          description?: string | null
          type: 'start' | 'milestone' | 'goal'
          duration?: string | null
          priority?: 'high' | 'medium' | 'low' | null
          category?: 'personal_brand' | 'skills' | 'experience' | 'job_search' | null
          completed?: boolean
          progress?: number
          position?: number | null
        }
        Update: {
          title?: string
          description?: string | null
          completed?: boolean
          progress?: number
        }
      }
      // Добавим остальные типы по мере необходимости
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type UserSkill = Database['public']['Tables']['user_skills']['Row'] 
export type DevelopmentMilestone = Database['public']['Tables']['development_milestones']['Row']