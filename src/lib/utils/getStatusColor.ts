import { OrderStatus } from '@/types/orderTypes'

export const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.delivered:
      return 'success'
    case OrderStatus.accepted:
      return 'primary'
    case OrderStatus.ready:
      return 'info'
    case OrderStatus.notReady:
      return 'warning'
    default:
      return 'default'
  }
}
