'use client'

import { useOrderData } from '@/hooks/useOrderData'
import { OrderCategory, OrderStatus } from '@/types/orderTypes'
import Button from '@mui/material/Button'

export default function GroupButtons() {
  const { addOrder } = useOrderData()

  const handleTestAddOrder = async () => {
    try {
      // Тестовые данные заказа
      const testOrder = {
        orderType: OrderCategory.FOOD,
        sender: 'Тестовый отправитель',
        recipient: 'Тестовый получатель',
        orderStatus: OrderStatus.notReady,
        comment: 'Тестовый заказ',
        accepted: false,
        userId: '', // Заполнится автоматически если есть RLS политика
        courierId: null,
      }
      await addOrder(testOrder)
      console.log('тест заказ создан')
    } catch (error) {
      console.error('Ошибка создания тестового заказа:', error)
      alert('Ошибка при создании заказа')
    }
  }

  return (
    <div className={'flex gap-2'}>
      <Button variant="contained" size="small">
        создать заказ
      </Button>
      <Button variant="contained" size="small" onClick={handleTestAddOrder}>
        создать тестовый заказ
      </Button>
    </div>
  )
}
