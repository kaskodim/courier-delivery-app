import { Order } from '@/types/orderTypes';
import { queueManagement } from '@/lib/utils/queueManagement';
export const fetchNextOrder = () =>
  new Promise<Order | 'no'>((resolve) => {
    setTimeout(() => {
      const newOrder = queueManagement.getOrder();
      if (newOrder) {
        resolve(newOrder);
      }
      else {
        resolve('no');
      }
    }, 1000);
  });
