'use client'

import React from 'react'
import { useOrderData } from '@/hooks/useOrderData'
import GroupButtons from '@components/AdminDashboard/GroupButtons/GroupButtons'
import OrderTable from '@components/AdminDashboard/OrderTable/OrderTable'

export default function AdminDashboard() {
  const { orders, loading } = useOrderData()

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Управление заказами</h2>
        <GroupButtons />
      </div>

      <OrderTable
        orders={orders}
        loading={loading}
      />
    </div>
  )
}
