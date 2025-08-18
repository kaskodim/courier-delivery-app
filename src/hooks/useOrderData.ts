'use client'

import { useEffect, useState } from 'react'
import { Order } from '@/types/orderTypes'
import { supabase } from '@lib/supabase/supabase-client'

export const useOrderData = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    supabase
      .from('orders')
      .select('*')
      .then(({ data, error }) => {
        if (error) console.error('Ошибка:', error)
        else setOrders(data || [])
        setLoading(false)
      })
  }, [])

  const addOrder = async (newOrder: Omit<Order, 'id'>) => {
    // Получаем текущего пользователя
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('Пользователь не авторизован')
    }

    // Добавляем userId к заказу
    const orderWithUser = {
      ...newOrder,
      userId: user.id, // Используем реальный UUID пользователя
    }

    const { data, error } = await supabase
      .from('orders')
      .insert(orderWithUser)
      .select()

    if (error) throw error

    setOrders((prev) => [...prev, data[0]])
    return data[0]
  }

  const deleteOrder = async (id: string) => {
    const { error } = await supabase.from('orders').delete().eq('id', id)
    if (error) console.error('Ошибка:', error)
    else setOrders((prev) => prev.filter((order) => order.id !== id))
  }

  const updateOrder = async (id: string, updatedFields: Partial<Order>) => {
    const { data, error } = await supabase
      .from('orders')
      .update(updatedFields)
      .eq('id', id)
      .select()
    if (error) console.error('Ошибка:', error)
    else
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? data[0] : order)),
      )
  }

  return { orders, loading, addOrder, deleteOrder, updateOrder, setOrders }
}


// 'use client'
//
// import { useEffect, useState } from 'react'
// import { Order } from '@/types/orderTypes'
// import { supabase } from '@lib/supabase/supabase-client'
//
// export const useOrderData = () => {
//   const [orders, setOrders] = useState<Order[]>([])
//   const [loading, setLoading] = useState(false)
//
//   useEffect(() => {
//     setLoading(true)
//     supabase
//       .from('orders')
//       .select('*')
//       .then(({ data, error }) => {
//         if (error) console.error('Ошибка:', error)
//         else setOrders(data || [])
//         setLoading(false)
//       })
//   }, []) // Запускается один раз при монтировании
//
//   return { orders, loading, setOrders } // Добавляем setOrders для обновления извне
// }
