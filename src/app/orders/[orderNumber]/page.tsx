// app/orders/[orderNumber]/page.tsx
import { Suspense } from 'react'
import OrderWrapper from './OrderWrapper'
import Loading from '@/app/orders/[orderNumber]/loading';


export default function OrderPage({
                                    params
                                  }: {
  params: { orderNumber: string }
}) {
  return (
    <Suspense fallback={<Loading />}>
      <OrderWrapper orderNumber={params.orderNumber} />
    </Suspense>
  )
}