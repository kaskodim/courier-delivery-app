export type Order = {
  id: string;
  orderNumber: string;
  orderType: OrderType;
  sender: string;
  recipient: string;
  statusOrder: StatusOrder
  comment: string;
  skipOrder: boolean;
};

export type Address = {
  id: string;
  city: string;
  street: string;
  houseNumber: string;
};

export enum OrderType {
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
