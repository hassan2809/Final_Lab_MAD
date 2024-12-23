import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xzlmwofbgfxdhdpvcrtg.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bG13b2ZiZ2Z4ZGhkcHZjcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4OTA3OTMsImV4cCI6MjA1MDQ2Njc5M30.EciUxojrHcL0jg9iDnWYc6g-PPN-MhihOOVy6f8Nzd0"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})