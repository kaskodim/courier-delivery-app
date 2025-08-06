import { Suspense } from 'react'
import OrderWrapper from './OrderWrapper'
import Loading from '@/app/orders/[orderNumber]/loading'

export default async function OrderPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params // Разрешаем Promise
  return (
    <Suspense fallback={<Loading />}>
      <OrderWrapper orderNumber={orderNumber} />
    </Suspense>
  )
}
