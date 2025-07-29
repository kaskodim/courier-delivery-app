import { mockAddresses } from '@/lib/data/addresses';
import { v1 } from 'uuid';

export type OrderType = {
  id: string;
  orderNumber: number;
  orderType: 'food' | 'documents' | 'products';
  sender: string;
  recipient: string;
  status: 'собирается...' | 'готов к получению' | 'принят курьером' | 'доставлен';
};

export function getRandomAddress() {
  const index = Math.floor(Math.random() * mockAddresses.length);
  return mockAddresses[index];
}

export function getRandomOrder(): OrderType {
  const sender = getRandomAddress();
  let recipient = getRandomAddress();

  // Гарантируем, что получатель отличается от отправителя
  while (recipient.id === sender.id) {
    recipient = getRandomAddress();
  }

  return {
    id: v1(),
    orderNumber: Math.floor(Math.random() * 9000000) + 1000000, // Случайный 7-значный номер
    orderType: ['food', 'documents', 'products'][Math.floor(Math.random() * 3)] as OrderType['orderType'],
    sender: sender.fullAddress,
    recipient: recipient.fullAddress,
    status: 'собирается...',
  };
}
