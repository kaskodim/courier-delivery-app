// app/orders/[orderNumber]/page.tsx
import { Order } from '@/components/Order/Order'

type OrderPageProps = {
  params: {
    orderNumber: string
  }
}

export default async function OrderPage({ params }: OrderPageProps) {
  // В App Router с async params доступен сразу
  return (
    <div>
      <Order orderNumber={params.orderNumber} />
    </div>
  )
}