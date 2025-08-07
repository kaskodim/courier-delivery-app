'use client'

import { CourierDashboard } from '@/components/CourierDashboard/CourierDashboard'
import { Header } from '@/components/Header/Header'
import { Suspense, useEffect, useState } from 'react'
import { queueManagement } from '@/lib/utils/queueManagement'
import { TemporaryAdministrator } from '@/components/TemporaryAdministrator/TemporaryAdministrator'
import { MAX_INTERVAL, MAX_QUEUE, MIN_INTERVAL } from '@/consnants'
import { supabase } from '@lib/supabase/supabase-client'
import AuthPage from '@/app/auth/page'

export default function Home() {
  const [session, setSession] = useState<any>(null)

  console.log('helllp')

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession()
    setSession(currentSession.data.session)
  }

  useEffect(() => {
    fetchSession()

    const {data: authListener} = supabase.auth.onAuthStateChange((_event, session)=>{
      setSession(session)
    })

    return ()=>{
      authListener.subscription.unsubscribe()
    }


  }, [])

  //имитация поступления заказов в очередь
  useEffect(() => {
    let idInterval: NodeJS.Timeout
    const addOrderWithRandomInterval = () => {
      if (queueManagement.getQueueSize() < MAX_QUEUE) {
        queueManagement.addOrder()
      }
      const randomInterval = Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL
      clearInterval(idInterval)
      idInterval = setInterval(addOrderWithRandomInterval, randomInterval)
    }
    idInterval = setInterval(addOrderWithRandomInterval, MIN_INTERVAL)
    return () => clearInterval(idInterval)
  }, [])

  return (
    <div>
      {session ? (
        <>
          <Header />
          <TemporaryAdministrator />
          <Suspense fallback={<div>Загрузка курьера...</div>}>
            <CourierDashboard />
          </Suspense>
        </>
      ) : (
        <AuthPage />
      )}
    </div>
  )
}
