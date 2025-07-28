'use client';

import React, { useEffect } from 'react';
import { getRandomOrder, OrderType } from '@/lib/utils/getRandomAddress';

export const CourierMain = () => {
  const [order, setOrder] = React.useState<OrderType | null>(null);
  const [disadbledB, setDisadbledB] = React.useState<boolean>(true);

  const handler = () => {
    setOrder(getRandomOrder);
  };

  useEffect(() => {

    setTimeout(()=>{
      setOrder(getRandomOrder)
      setDisadbledB(false);
    }, 3000)

  }, []);

  return (
    <div>
      <div>карта</div>
      <div>время на смене</div>
      <div>закончить смену где-то будет кнопка</div>

      <br />

      <div>
        Заказ №: {order?.orderNumber}
        <div>отправитель: {order?.sender} </div>
        <div>получатель: {order?.recipient}</div>
      </div>

      <div>
        <button disabled={disadbledB}>принять заказ</button>
        <button onClick={handler}
                disabled={disadbledB}
        >отказаться</button>
      </div>
    </div>
  );
};
