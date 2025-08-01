'use client'

import React, { useEffect, useState } from 'react'
import { Order as OrderType } from '@/types/orderTypes'
import { queueManagement } from '@/lib/utils/queueManagement'
import { useRouter } from 'next/navigation'
import styles from './styles.module.css'

type OrderProps = {
  orderNumber: string
}

export const Order = ({ orderNumber }: OrderProps) => {
  const [order, setOrder] = useState<OrderType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const handlerBack = () => router.push('/')

  const handlerComplete = () => {
    if (order) {
      queueManagement.removeOrderByNuber(order.orderNumber)
    }
    router.push('/')
  }

  useEffect(() => {
    setIsLoading(true)
    // Добавляем небольшую задержку для симуляции загрузки
    const timer = setTimeout(() => {
      const foundOrder = queueManagement.getOrderByNumber(orderNumber)
      setOrder(foundOrder)
      setIsLoading(false)
    }, 200)

    return () => clearTimeout(timer)
  }, [orderNumber])

  if (isLoading) {
    return <div>Загрузка данных заказа...</div>
  }

  if (!order) {
    return (
      <div className={styles.container}>
        <div>Заказ не найден или кто-то его уже забрал</div>
        <button onClick={handlerBack}>Вернуться</button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div>
        <h2>Детали заказа: {order.orderNumber}</h2>
        <br />
        <div>Тип: {order.orderType}</div>
        <div>Отправитель: {order.sender}</div>
        <div>Получатель: {order.recipient}</div>
        <br />
        <div>Комментарий к заказу: {order.comment}</div>
      </div>
      <br />
      <div>
        <button onClick={handlerComplete}>Заказ доставлен</button>
      </div>
    </div>
  )
}