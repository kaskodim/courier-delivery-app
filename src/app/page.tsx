'use client';

import { CourierGo } from '@/components/CourierGo/CourierGo';
import { Header } from '@/components/Header/Header';
import { useEffect } from 'react';
import { queueManagement } from '@/lib/utils/queueManagement';

export default function Home() {

  //имитация поступления заказов в очередь
  useEffect(() => {
    const idInterval = setInterval(() => {
      if (queueManagement.getQueueSize() <= 5) {
        queueManagement.addOrder();
      }

    }, 1000);
    return () => clearInterval(idInterval);
  }, []);

  return (
    <div>
      <Header />
      <CourierGo />
    </div>
  );
}
