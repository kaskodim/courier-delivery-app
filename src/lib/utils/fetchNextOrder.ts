import { Order } from '@/types/orderTypes'
import { queueManagement } from '@/lib/utils/queueManagement'

export const fetchNextOrder = (): Promise<Order> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const newOrder = queueManagement.getOrder()
        if (newOrder) {
          resolve(newOrder)
        }
      } catch (error) {
        reject(error)
      }
    }, 1000)
  })
