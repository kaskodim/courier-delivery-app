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

  useEffect(() => {
    fetchOrders()

    const setupSubscription = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session || !session.access_token) {
        console.error('Нет активной сессии или токена авторизации')
        return
      }

      const channel = supabase.channel('custom-orders-channel-' + Date.now(), {
        config: {
          broadcast: { ack: true },
          presence: { key: session.access_token },
        },
      })
      channel
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
          fetchOrders()
        })
        .subscribe((status, err) => {
          if (status === 'CHANNEL_ERROR') {
            console.log({ myErr: err })
            console.error('Ошибка подписки:', 'Проверьте RLS, сеть или авторизацию')
          }
        })
      return () => {
        channel.unsubscribe()
      }
    }

    setupSubscription().catch((err) => console.error('Ошибка настройки подписки:', err))
  }, [])

  const addOrder = async (newOrder: Omit<Order, 'id' | 'orderNumber'>) => {
    // 'id' и 'orderNumber' создаются автоматически на Supabase
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Пользователь не авторизован')

    const orderWithUser = {
      ...newOrder,
      userId: user.id,
    }

    const { data, error } = await supabase.from('orders').insert(orderWithUser).select()
    if (error) throw error

    setOrders((prev) => [...prev, data[0]])
    return data[0]
  }

  const deleteOrder = async (id: string) => {
    const { error } = await supabase.from('orders').delete().eq('id', id)
    if (error) console.error('Ошибка при удалении заказа:', error.message)
    else setOrders((prev) => prev.filter((order) => order.id !== id))
  }

  const updateOrder = async (id: string, updatedFields: Partial<Order>) => {
    const { data, error } = await supabase
      .from('orders')
      .update(updatedFields)
      .eq('id', id)
      .select()
    if (error) console.error('Ошибка при обновлении заказа:', error.message)
    else setOrders((prev) => prev.map((order) => (order.id === id ? data[0] : order)))
  }

  return { orders, loading, addOrder, deleteOrder, updateOrder, setOrders }
}
