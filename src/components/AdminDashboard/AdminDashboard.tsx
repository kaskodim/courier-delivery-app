'use client'

import React, { useState } from 'react'
import { useOrderData } from '@/hooks/useOrderData'
import GroupButtons from '@components/AdminDashboard/GroupButtons/GroupButtons'
import OrderTable from '@components/AdminDashboard/OrderTable/OrderTable'
import OrderSearch from '@components/OrderSearch/OrderSearch'

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const { orders, loading, deleteOrder, addOrder } = useOrderData()

  const filteredOrders = React.useMemo(
    () =>
      orders.filter((order) =>
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [orders, searchQuery],
  )

  return (
    <div className="flex h-[calc(100vh-60px-32px)] flex-col gap-3 overflow-hidden">
      <div className="flex justify-between p-4">
        <h2 className="text-xl font-bold">Управление заказами</h2>
        <GroupButtons addOrderAction={addOrder} />
      </div>

      <OrderSearch
        orders={orders}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex-1 overflow-hidden">
        <OrderTable
          orders={filteredOrders}
          loading={loading}
          deleteOrder={deleteOrder}
        />
      </div>
    </div>
  )
}
