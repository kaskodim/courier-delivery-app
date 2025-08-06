'use client'

import React, { useState } from 'react'
import { CourierStart } from '@/components/CourierStart/CourierStart'
import styles from './CourierDashboard.module.css'
import { CourierMain } from '@/components/CourierDashboard/CourierMain/CourierMain'
import { useSearchParams } from 'next/navigation'

export const CourierDashboard = () => {
  const searchParams = useSearchParams()
  const confirmed = searchParams.get('confirmed') === 'true'
  const [isGo, setIsGo] = useState<boolean>(!confirmed)

  return <div className={styles.container}>{isGo ? <CourierStart setIsGo={setIsGo} /> : <CourierMain />}</div>
}
