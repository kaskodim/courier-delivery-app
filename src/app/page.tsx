'use client'


import { CourierDashboard } from '@/components/CourierDashboard/CourierDashboard'
import { Suspense, useEffect, useState } from 'react'
import { queueManagement } from '@/lib/utils/queueManagement'
import { MAX_INTERVAL, MAX_QUEUE, MIN_INTERVAL } from '@/consnants'
import { supabase } from '@lib/supabase/supabase-client'
import { Session } from '@supabase/auth-js'
import Auth from '@components/Auth/Auth'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)
  const [userRole, setUserRole] = useState<'admin' | 'courier'>('admin')
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
      router.push('/')
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

  //имитация поступления заказов в очередь - временное решение
  useEffect(() => {
    let idInterval: NodeJS.Timeout
    const addOrderWithRandomInterval = () => {
      if (queueManagement.getQueueSize() < MAX_QUEUE) {
        queueManagement.addOrder()
      }
      const randomInterval =
        Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) +
        MIN_INTERVAL
      clearInterval(idInterval)
      idInterval = setInterval(addOrderWithRandomInterval, randomInterval)
    }
    idInterval = setInterval(addOrderWithRandomInterval, MIN_INTERVAL)
    return () => clearInterval(idInterval)
  }, [])

  return (
      <div style={{ width: '900px' }}>
        {session ? (
          <>
            <Suspense fallback={<div>Загрузка курьера...</div>}>
              <CourierDashboard />
            </Suspense>
          </>
        ) : (
          <Auth />
        )}
      </div>
  )
}
