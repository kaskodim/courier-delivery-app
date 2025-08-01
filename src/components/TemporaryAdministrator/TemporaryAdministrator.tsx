'use client'

import React, { useEffect, useState } from 'react'
import { queueManagement } from '@/lib/utils/queueManagement'
import { MAX_QUEUE } from '@/consnants'
import styles from './styles.module.css'

export const TemporaryAdministrator = () => {
  const [queue, setQueue] = useState(0)
  const [maxQueue, setMaxQueue] = useState<'max' | null>(null)

  const removeHandler = () => {
    queueManagement.removeOrder()
  }
  const addHandler = () => {
    queueManagement.addOrder()
  }

  useEffect(() => {
    const idIntervalAdmin = setInterval(() => {
      setQueue(queueManagement.getQueueSize())
      if (queue >= MAX_QUEUE) {
        setMaxQueue('max')
      } else {
        setMaxQueue(null)
      }
    }, 500)
    return () => clearInterval(idIntervalAdmin)
  }, [queue])

  return (
    <div className={styles.container}>
      <h3>Временный Администратор:</h3>
      <h5>этого компонента здесь не будет в итоговой версии</h5>

      <br />

      <h4>заказы поступают в очередь автоматически</h4>
      <h5>отказанные заказы помечаются флагом и повторно пользователю не выводятся</h5>

      <br />

      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <span> максимальная очередь заказов: {MAX_QUEUE}</span>
          <span>
            количество заказов в очереди: {queue} {maxQueue}
          </span>
        </div>

        <div className={styles.buttons}>
          <button onClick={addHandler}>добавить в очередь</button>
          <button onClick={removeHandler}>удалить из очереди</button>
        </div>
      </div>
    </div>
  )
}
