'use client'

import React, { useEffect, useState } from 'react'
import { Order } from '@/types/orderTypes'
import { queueManagement } from '@/lib/utils/queueManagement'
import { fetchNextOrder } from '@/lib/utils/fetchNextOrder'
import styles from './styles.module.css'
import { useRouter } from 'next/navigation'

export const CourierMain = () => {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  const handleReject = (rejectedOrder: Order) => {
    // TODO: продумать логику если все заказы будут в отказе курьером,
    // сейчас не принятые заказы второй раз не отображаются, висят в очереди
    setCurrentOrder(null)
    setIsLoading(true)
    queueManagement.markOrderRejected(rejectedOrder.orderNumber)
    if (!currentOrder) {
      fetchNextOrder().then((order) => {
        setIsLoading(false)
        setCurrentOrder(order)
      })
    }
  }

  const handleAccept = async () => {
    if (currentOrder) {
      currentOrder.accepted = true
      // Используем push без await (так как это клиентский переход)
      router.push(`/orders/${currentOrder.orderNumber}`)
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!currentOrder) {
        fetchNextOrder().then((order) => {
          setIsLoading(false)
          setCurrentOrder(order)
        })
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [currentOrder])

  return (
    <div className={styles.container}>
      <h5>Это главный компонент. Здесь информация о поступающем заказе </h5>

      <br />

      <div>Карта (тут будет карта)</div>
      <div>Время на смене (тут будет время на смене)</div>
      <div>Закончить смену (где-то будет кнопка)</div>

      <br />

      {isLoading ? (
        <div>поиск заказа....</div>
      ) : currentOrder ? (
        <div>
          <h3>Заказ №: {currentOrder.orderNumber}</h3>
          <div>Тип: {currentOrder.orderType}</div>
          <div>Отправитель: {currentOrder.sender}</div>
          <div>Получатель: {currentOrder.recipient}</div>
          <div>Статус: {currentOrder.statusOrder}</div>
          <div>Комментарий к заказу: {currentOrder.comment}</div>

          <div>
            <button onClick={handleAccept}>Принять заказ</button>
            <button onClick={() => handleReject(currentOrder)}>Отказаться</button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
