'use client'

import { useOrderData } from '@/hooks/useOrderData'
import { Button } from 'primereact/button'
import { OrderCategory, OrderStatus } from '@/types/orderTypes'

export default function GroupButtons() {
  const { addOrder } = useOrderData()

  const handlerAddOrd = async () => {
    try {
      // Тестовые данные заказа
      const testOrder = {
        orderNumber: `TEST-${Date.now()}`,
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
      alert('Тестовый заказ создан!')

      // Если нужно перейти на другую страницу после создания:
      // router.push('/orders');
    } catch (error) {
      console.error('Ошибка создания тестового заказа:', error)
      alert('Ошибка при создании заказа')
    }
  }

  return (
    <div className={'flex gap-2'}>
      <Button
        label={'создать заказ'}
        onClick={handlerAddOrd}
      />
      <Button label={'создать рандомный заказ'} />
      <Button label={'обновить таблицу'} />
    </div>
  )
}
