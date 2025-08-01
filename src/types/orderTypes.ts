export type Order = {
  id: string
  orderNumber: string
  orderType: OrderCategory
  sender: string
  recipient: string
  statusOrder: StatusOrder
  comment: string
  skipOrder: boolean
  accepted: boolean
}

export type Address = {
  id: string
  city: string
  street: string
  houseNumber: string
}

export enum OrderCategory {
  FOOD = 'Еда',
  DOCS = 'Документы',
  PRODUCT = 'Товар',
}

export enum StatusOrder {
  notReady = 'собирается...',
  ready = 'готов к получению',
  accepted = 'принят курьером',
  delivered = 'доставлен',
}
