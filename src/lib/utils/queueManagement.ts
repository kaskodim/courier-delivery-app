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
     * Удаляет и возвращает заказ по номеру из очереди
     * @returns {Order | undefined} Удаленный заказ или undefined, если очередь пуста
     */
    removeOrderByNuber(number: string) {

      const order =  this.getOrderByNumber(number)
      if (!order) return undefined;

      const index = orderQueue.findIndex(order => order.orderNumber === number);
      if (index !== -1) {
        return orderQueue.splice(index, 1)[0];
      }
      return undefined;

    },



    /**
     * Возвращает текущее состояние очереди (копию массива)
     * @returns {Order[]} Массив заказов
     */
    getOrderQueue(): Order[] {
      return [...orderQueue];
    },

    /**
     * Возвращает первый не отклоненный и не принятый заказ в очереди без удаления
     * @returns {Order | null} Первый заказ или null, если очередь пуста
     */
    getOrder(): Order | null {
      if (orderQueue.length > 0) {
        const filteredOrders = orderQueue.filter((order) => !order.skipOrder && !order.accepted);
        return filteredOrders[0];
      }
      return null;
    },

    /**
     * Возвращает заказ по номеру в очереди без удаления
     * @returns {Order | null} Заказ по номеру или null, если очередь пуста
     */
    getOrderByNumber(number: string): Order | null {
      const queue = this.getOrderQueue();
      const nextOrder = queue.find((or) => or.orderNumber === number) || null;
      return nextOrder;
    },

    /**
     * Возвращает количество заказов в очереди
     */
    getQueueSize(): number {
      return orderQueue.length;
    },

    /**
     * Помечает заказ как отклоненный курьером
     * @param {string} number Номер заказа
     * @returns {boolean} Успешность операции
     */
    markOrderRejected(number: string): boolean {
      const order = this.getOrderByNumber(number);
      if (order) {
        order.skipOrder = true;
        return true;
      }
      return false;
    },
  };
}

export const queueManagement = createManagement();
