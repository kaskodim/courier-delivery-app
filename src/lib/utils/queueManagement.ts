import { Order } from '@/types/orderTypes';
import { createRandomOrder } from '@/lib/utils/createRandomOrder';

function createManagement() {
  const orderQueue: Order[] = [];
  let numOrder = 1000;

  return {
    /**
     * Добавляет новый заказ в очередь
     * @returns {Order} Добавленный заказ
     */
    addOrder(): Order {
      const newOrder = createRandomOrder(numOrder);
      orderQueue.push(newOrder);
      numOrder++;
      return newOrder;
    },

    /**
     * Удаляет и возвращает первый заказ из очереди
     * @returns {Order | undefined} Удаленный заказ или undefined, если очередь пуста
     */
    removeOrder(): Order | undefined {
      return orderQueue.shift();
    },

    /**
     * Возвращает текущее состояние очереди (копию массива)
     * @returns {Order[]} Массив заказов
     */
    getOrderQueue(): Order[] {
      return [...orderQueue];
    },

    /**
     * Возвращает первый заказ в очереди без удаления
     * @returns {Order | null} Первый заказ или null, если очередь пуста
     */
    getOrder(): Order | null {
      return orderQueue.length > 0 ? orderQueue[0] : null;
    },

    /**
     * Возвращает количество заказов в очереди
     */
    getQueueSize(): number {
      return orderQueue.length;
    }
  };
}

export const queueManagement = createManagement();