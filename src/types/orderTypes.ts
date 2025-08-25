export type Order = {
  id: string
  orderNumber: string
  orderType: OrderCategory
  sender: string
  recipient: string
  orderStatus: OrderStatus
  comment: string
  accepted: boolean
  userId: string | null
  courierId: string | null
}

export enum OrderCategory {
  FOOD = 'Еда',
  DOCS = 'Документы',
  PRODUCT = 'Товар',
}

export enum OrderStatus {
  notReady = 'собирается...',
  ready = 'готов к получению',
  accepted = 'принят курьером',
  delivered = 'доставлен',
}
