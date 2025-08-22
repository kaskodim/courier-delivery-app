'use client'

import React from 'react'
import { useOrderData } from '@/hooks/useOrderData'
import GroupButtons from '@components/AdminDashboard/GroupButtons/GroupButtons'
import OrderTable from '@components/AdminDashboard/OrderTable/OrderTable'

export default function AdminDashboard() {
  const { orders, loading } = useOrderData()

  return (
    <div className="flex flex-col h-[calc(100vh-60px-32px)] overflow-hidden">
      <div className="flex justify-between p-4">
        <h2 className="text-xl font-bold">Управление заказами</h2>
        <GroupButtons />
      </div>
      <div className="flex-1 overflow-hidden">
        <OrderTable orders={orders} loading={loading} />
      </div>
    </div>
  )
}