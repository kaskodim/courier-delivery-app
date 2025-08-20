'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import Button from '@mui/material/Button'

const CreateOrder = () => {
  const router = useRouter()

  return (
    <div>
      создание нового заказа
      <Button onClick={() => router.push('/admin')}> назад </Button>
    </div>
  )
}

export default CreateOrder
