'use client'

import { CourierDashboard } from '@/components/CourierDashboard/CourierDashboard'
import { Header } from '@/components/Header/Header'
import { useEffect } from 'react'
import { queueManagement } from '@/lib/utils/queueManagement'
import { TemporaryAdministrator } from '@/components/TemporaryAdministrator/TemporaryAdministrator'
import { MAX_INTERVAL, MAX_QUEUE, MIN_INTERVAL } from '@/consnants'

export default function Home() {
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
      <Header />
      <TemporaryAdministrator />
      <CourierDashboard />
    </div>
  )
}
