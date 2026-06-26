import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session ? 'found' : 'not found')
      if (session) {
        setUser(session.user)
        setToken(session.access_token)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event, session ? 'has session' : 'no session')
        if (event === 'SIGNED_OUT') {
          setUser(null)
          setToken(null)
          setLoading(false)
        } else if (session) {
          // Small delay to ensure token is ready
          setTimeout(() => {
            setUser(session.user)
            setToken(session.access_token)
            setLoading(false)
          }, 100)
        } else {
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function register(full_name, email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name } }
    })
    if (error) throw new Error(error.message)
    return data
  }

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw new Error(error.message)
    return data
  }

  async function logout() {
    await supabase.auth.signOut()
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}