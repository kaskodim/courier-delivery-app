'use client'

import { Suspense, useEffect, useState } from 'react'
import { supabase } from '@lib/supabase/supabase-client'
import { Session } from '@supabase/auth-js'
import Auth from '@components/Auth/Auth'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)
  const [userRole] = useState<'admin' | 'courier'>('admin')
  const router = useRouter()

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession()
    setSession(currentSession.data.session)
  }

  useEffect(() => {
    if (userRole === 'admin') {
      router.push('/admin')
    }
    if (userRole === 'courier') {
      router.push('/courier')
    }
  }, [userRole, router])

  //
  useEffect(() => {
    fetchSession()
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      },
    )
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <div style={{ width: '900px' }}>
      {session ? (
        <>
          <Suspense fallback={<div>Загрузка курьера...</div>}></Suspense>
        </>
      ) : (
        <Auth />
      )}
    </div>
  )
}
