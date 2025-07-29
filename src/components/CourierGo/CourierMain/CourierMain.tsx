'use client';

import React, { useEffect, useState } from 'react';
import { createRandomOrder } from '@/lib/utils/createRandomOrder';
import { Order, OrderType } from '@/types/orderTypes';
import { queueManagement } from '@/lib/utils/queueManagement';



export const CourierMain = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [disabledButtons, setDisabledButtons] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {

  }, []);


  return (
    <div>
      <div>Карта</div>
      <div>Время на смене</div>
      <div>Закончить смену (где-то будет кнопка)</div>

      <br />


        <div>
          <h3>Заказ №: {'000000'}</h3>
          <div>Тип: {'тип'}</div>
          <div>Отправитель: {'ар, 5'}</div>
          <div>Получатель: {'sdff,5'}</div>
          <div>Статус: {'ksdfjks'}</div>
          <div>Комментарий к заказу: {'ksdfjks'}</div>
        </div>


      <div>
        <button
          // onClick={handleAccept}
          disabled={disabledButtons || isLoading}
        >
          Принять заказ
        </button>
        <button
          // onClick={handleReject}
          disabled={disabledButtons || isLoading}
        >
          Отказаться
        </button>
      </div>
    </div>
  );
};