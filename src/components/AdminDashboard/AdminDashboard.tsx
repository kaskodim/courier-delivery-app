'use client'

import React, { useState, useEffect } from 'react'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { supabase } from '@/lib/supabase/supabase-client'
import { Order, OrderCategory, OrderStatus } from '@/types/orderTypes'
import { courierComments } from '@lib/data/courierComments'
import { getRandomItem } from '@lib/utils/createRandomOrder'
import { mockAddresses } from '@lib/data/addresses'

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [maxNumber, setMaxNumber] = useState(0)

  function getDateNumber(): string {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}${month}${day}` // Например, 20250814
  }

  const fetchOrders = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('orders').select('*')
    if (error) throw error
    console.log(data)
    setOrders(data)
    const todayOrders = data.filter(order => order.orderNumber.startsWith(getDateNumber()))
    const maxNum = todayOrders.reduce((max, order) => {
      const num = parseInt(order.orderNumber.split('-')[1]) || 0
      return num > max ? num : max
    }, 0)
    setMaxNumber(maxNum)
    setLoading(false)
    return data
  }

  const createNewRandomOrderHandler = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    const newOrderNumber = `${getDateNumber()}-${String(maxNumber + 1).padStart(4, '0')}`
    const newOrder = {
      orderNumber: newOrderNumber,
      sender: getRandomItem(mockAddresses)?.street,
      recipient: getRandomItem(mockAddresses)?.street,
      comment: getRandomItem(courierComments),
      accepted: false,
      orderType: OrderCategory.FOOD,
      orderStatus: OrderStatus.ready,
      courier_id: null,
      user_id: user?.id || null,
    }
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([newOrder])
        .select()
      if (error) throw error
      console.log('Создан заказ:', data[0].orderNumber)
      fetchOrders()
    } catch (error) {
      console.error('Ошибка при создании заказа:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteOrder = async (orderId: string) => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId)
      if (error) throw error
      console.log('Заказ удалён:', orderId)
      fetchOrders()
    } catch (error) {
      console.error('Ошибка при удалении заказа:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="flex flex-col gap-4 p-4">





      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Управление заказами</h2>
        <div className={'flex gap-3'}>
          <Button
            label="Создать заказ"
            severity="info"
            icon="pi pi-plus"
            loading={loading}
            size={'small'}
          />
          <Button
            label="Рандомный заказ"
            severity="info"
            icon="pi pi-plus"
            onClick={createNewRandomOrderHandler}
            loading={loading}
            size={'small'}
          />
          <Button
            label="Обновить заказы"
            severity="info"
            icon="pi pi-plus"
            onClick={fetchOrders}
            loading={loading}
            size={'small'}
          />
        </div>
      </div>

      <DataTable
        value={orders}
        loading={loading}
        paginator
        rows={10}
        emptyMessage="Нет доступных заказов"
        size={'small'}
        rowsPerPageOptions={[5, 10, 25, 50]}
      >
        <Column
          field="id"
          header="id"
          sortable
        />
        <Column
          field="orderNumber"
          header="Номер заказа"
          sortable
        />
        <Column
          field="orderType"
          header="Тип"
        />
        <Column
          field="sender"
          header="Отправитель"
        />
        <Column
          field="recipient"
          header="Получатель"
        />
        <Column
          field="orderStatus"
          header="Статус заказа"
        />
        <Column
          field="comment"
          header="Комментарий к заказу"
        />
        <Column
          field="accepted"
          header="принят"
        />
        <Column
          field="courier_id"
          header="courier_id"
        />
        <Column
          field="user_id"
          header="user_id"
        />
        <Column
          header="Действия"
          body={(rowData) => (
            <div className="flex gap-2">
              <Button
                icon="pi pi-trash"
                severity="danger"
                text
                size={'small'}
                onClick={() => deleteOrder(rowData.id)}
              />
              <Button
                icon="pi pi-pencil"
                severity="warning"
                text
                size={'small'}
              />
            </div>
          )}
        />
      </DataTable>
    </div>
  )
}