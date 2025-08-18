'use client'

import React from 'react'
import { Button } from 'primereact/button'
import { useRouter } from 'next/navigation'

const CreateOrder = () => {
  const router = useRouter()

  return (
    <div>
      создание нового заказа
      <Button
        label={'back'}
        onClick={() => router.push('/admin')}
      />
    </div>
  )
}

export default CreateOrder