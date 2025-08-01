import { mockAddresses } from '@/lib/data/addresses'
import { Address, Order, OrderCategory, StatusOrder } from '@/types/orderTypes'
import { v1 } from 'uuid'
import { courierComments } from '@/lib/data/courierComments'

function getRandomOAddress(): Address {
  const index = Math.floor(Math.random() * mockAddresses.length)
  return mockAddresses[index]
}

function getDateNumber(date = new Date()): string {
  const year = date.getFullYear().toString().slice(-2)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}${month}${day}`
}

function getRandomItem<T>(array: T[]): T | null {
  if (!array || array.length === 0) return null
  return array[Math.floor(Math.random() * array.length)]
}

export function createRandomOrder(number: number): Order {
  const sender = getRandomOAddress()
  let recipient = getRandomOAddress()
  while (sender.id === recipient.id && sender.city !== recipient.city) {
    recipient = getRandomOAddress()
  }

  const randomType = getRandomItem(Object.values(OrderCategory))
  const randomComment = getRandomItem(courierComments)

  if (!randomType || !randomComment) {
    throw new Error('Invalid data')
  }

  return {
    id: v1(),
    orderNumber: `${getDateNumber()}-${number}`,
    orderType: randomType,
    sender: `улица: ${sender.street}, дом: ${sender.houseNumber}`,
    recipient: `улица: ${recipient.street}, дом: ${recipient.houseNumber}`,
    statusOrder: randomType === OrderCategory.FOOD ? StatusOrder.notReady : StatusOrder.ready,
    comment: randomComment,
    skipOrder: false,
    accepted: false,
  }
}
