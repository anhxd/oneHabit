import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Tracker from '../components/Tracker'
import Loader from '../components/Loader'

export default function Home() {
  const [session, setSession] = useState(null)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const link = document.querySelector("link[rel='icon']") || document.createElement('link')
    link.rel = 'icon'
    link.href = '/assets/favicon.png'
    document.head.appendChild(link)
    document.title = 'OneHabit'
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 3400)
    return () => clearTimeout(t)
  }, [])

  if (showLoader) return <Loader onDone={() => setShowLoader(false)} />
  if (!session?.user) return <Auth onAuthed={(u) => setSession({ user: u })} />
  return <Tracker user={session.user} />
}
