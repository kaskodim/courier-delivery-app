// app/orders/[orderNumber]/OrderWrapper.tsx
'use client'

import { Order } from '@/components/Order/Order'
import { useSearchParams } from 'next/navigation'

export default function OrderWrapper({ orderNumber }: { orderNumber: string }) {
  const searchParams = useSearchParams()
  const validatedOrderNumber = searchParams?.get('orderNumber') || orderNumber

  return <Order orderNumber={validatedOrderNumber} />
}