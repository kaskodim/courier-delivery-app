import React from 'react'
import { Order } from '@/components/Order/Order'

type OrderPageProps = {
  params: {
    orderNumber: string
  }
}

const OrderPage = ({ params }: OrderPageProps) => {
  return (
    <div>
      <Order orderNumber={params.orderNumber} />
    </div>
  )
}

export default OrderPage
