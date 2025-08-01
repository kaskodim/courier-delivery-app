'use client'

import { CourierGo } from '@/components/CourierGo/CourierGo'
import { Header } from '@/components/Header/Header'
import { useEffect } from 'react'
import { queueManagement } from '@/lib/utils/queueManagement'
import { TemporaryAdministrator } from '@/components/TemporaryAdministrator/TemporaryAdministrator'
import { MAX_INTERVAL, MAX_QUEUE, MIN_INTERVAL } from '@/consnants'

export default function Home() {
  //имитация поступления заказов в очередь
  useEffect(() => {
    const randomInterval = Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL
    const idInterval = setInterval(() => {
      if (queueManagement.getQueueSize() < MAX_QUEUE) {
        queueManagement.addOrder()
      }
    }, randomInterval)
    return () => clearInterval(idInterval)
  }, [])

  return (
    <div>
      <Header />
      <TemporaryAdministrator />
      <CourierGo />
    </div>
  )
}
