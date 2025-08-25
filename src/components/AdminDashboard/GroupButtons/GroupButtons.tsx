'use client'

import { Order, OrderCategory, OrderStatus } from '@/types/orderTypes'
import Button from '@mui/material/Button'

type GroupButtonsProps = {
  addOrderAction: (newOrder: Omit<Order, 'id' | 'orderNumber'>) => void
}

export default function GroupButtons({ addOrderAction }: GroupButtonsProps) {
  const handleTestAddOrder = () => {
    try {
      // Тестовые данные заказа
      const testOrder = {
        orderType: OrderCategory.FOOD,
        sender: 'Тестовый отправитель',
        recipient: 'Тестовый получатель',
        orderStatus: OrderStatus.notReady,
        comment: 'Тестовый заказ',
        accepted: false,
        userId: '',
        courierId: null,
      }
      addOrderAction(testOrder)
      console.log('тест заказ создан')
    } catch (error) {
      console.error('Ошибка создания тестового заказа:', error)
      alert('Ошибка при создании заказа')
    }
  }

  return (
    <div className={'flex gap-2'}>
      <Button variant="contained" size="small" disabled>
        создать заказ
      </Button>
      <Button variant="contained" size="small" onClick={handleTestAddOrder}>
        создать тестовый заказ
      </Button>
    </div>
  )
}
