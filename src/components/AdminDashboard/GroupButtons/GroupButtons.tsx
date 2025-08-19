'use client'

import { useOrderData } from '@/hooks/useOrderData'
import { OrderCategory, OrderStatus } from '@/types/orderTypes'
import Button from '@mui/material/Button'

export default function GroupButtons() {
  const { addOrder } = useOrderData()

  const handleAddOrder = async () => {
    try {
      // Тестовые данные заказа
      const testOrder = {
        orderType: OrderCategory.FOOD,
        sender: 'Тестовый отправитель',
        recipient: 'Тестовый получатель',
        orderStatus: OrderStatus.notReady,
        comment: 'Тестовый заказ',
        accepted: true,
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
      <Button variant="contained" onClick={handleAddOrder} size="small">
        создать заказ
      </Button>
      <Button variant="contained" size="small">создать рандомный заказ</Button>
      <Button variant="contained" size="small">обновить таблицу</Button>
    </div>
  )
}
