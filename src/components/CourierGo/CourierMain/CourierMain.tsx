'use client';

import React, { useEffect, useState } from 'react';
import { Order } from '@/types/orderTypes';
import { queueManagement } from '@/lib/utils/queueManagement';
import { fetchNextOrder } from '@/lib/utils/fetchNextOrder';

export const CourierMain = () => {
  const [order, setOrder] = useState<Order | null>(null);

  const handleReject = (rejectedOrder: Order) => {
    setOrder(null);
    queueManagement.markOrderAsRejected(rejectedOrder.orderNumber);
    fetchNextOrder().then((res) => {
      if (res === 'no') {
        alert('НЕТ ЗАКАЗОВ ОБНОВИ СТРАНИЦУ');
      } else {
        setOrder(res);
      }
    });
  };

  useEffect(() => {
    fetchNextOrder().then((resul) => {
      if (resul === 'no') {
        alert('НЕТ ЗАКАЗОВ ОБНОВИ СТРАНИЦУ');
      } else {
        setOrder(resul);
      }
    });
  }, []);

  return (
    <div>
      <div>Карта</div>
      <div>Время на смене</div>
      <div>Закончить смену (где-то будет кнопка)</div>

      <br />

      {order ? (
        <div>
          <h3>Заказ №: {order.orderNumber}</h3>
          <div>Тип: {order.orderType}</div>
          <div>Отправитель: {order.sender}</div>
          <div>Получатель: {order.recipient}</div>
          <div>Статус: {order.statusOrder}</div>
          <div>Комментарий к заказу: {order.comment}</div>

          <div>
            <button
            // onClick={handleAccept}
            // disabled={isLoading}
            >
              Принять заказ
            </button>
            <button
              onClick={() => handleReject(order)}
              // disabled={isLoading}
            >
              Отказаться
            </button>
          </div>
        </div>
      ) : (
        'поиск заказа....'
      )}
    </div>
  );
};
