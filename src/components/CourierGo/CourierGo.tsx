'use client'

import React, { useState, useEffect } from 'react'
import { Go } from '@/components/CourierGo/Go/Go'
import styles from './styles.module.css'
import { CourierMain } from '@/components/CourierGo/CourierMain/CourierMain'

export const CourierGo = () => {
  const [isGo, setIsGo] = useState<boolean>(true)

  useEffect(() => {
    // Проверяем, было ли уже подтверждение
    const isConfirmed = sessionStorage.getItem('goConfirmed') === 'true'
    setIsGo(!isConfirmed)
  }, [])

  const handleConfirm = () => {
    sessionStorage.setItem('goConfirmed', 'true')
    setIsGo(false)
  }

  return <div className={styles.container}>{isGo ? <Go setIsGo={handleConfirm} /> : <CourierMain />}</div>
}
