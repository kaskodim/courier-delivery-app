'use client'

import { useEffect, useState } from 'react'
import { Order } from '@/types/orderTypes'
import { supabase } from '@lib/supabase/supabase-client'

export const useOrderData = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)

  const fetchOrders = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('orders').select('*')
    if (error) {
      console.error('Ошибка при загрузке заказов:', error.message)
    } else {
      setOrders(data || [])
    }
    setLoading(false)
  }

  // TODO реализовать подписку на изменение в БД от Supabase
  useEffect(() => {
    fetchOrders()
  }, [])

  const addOrder = async (newOrder: Omit<Order, 'id' | 'orderNumber'>) => {
    setLoading(true)
    // 'id' и 'orderNumber' создаются автоматически на Supabase
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Пользователь не авторизован')

    const orderWithUser = {
      ...newOrder,
      userId: user.id,
    }
    const { data, error } = await supabase
      .from('orders')
      .insert(orderWithUser)
      .select()
    if (error) throw error

    setOrders((prev) => [...prev, data[0]])
    setLoading(false)
  }

  const deleteOrder = async (id: string) => {
    setLoading(true)
    const { error } = await supabase.from('orders').delete().eq('id', id)
    if (error) {
      console.error(`Ошибка при удалении заказа ${id}:', ${error.message}`)
    } else {
      setOrders((prev) => prev.filter((order) => order.id !== id))
    }
    setLoading(false)
  }

  return { orders, loading, addOrder, deleteOrder }
}
