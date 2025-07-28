'use client';

import React, { useState } from 'react';
import { Go } from '@/components/CourierGo/Go/Go';
import styles from './styles.module.css';
import { CourierMain } from '@/components/CourierGo/CourierMain/CourierMain';

export const CourierGo = () => {
  const [isGo, setIsGo] = useState<boolean>(false);




  return (
    <div className={styles.container}>
      {!isGo
          ? <Go setIsGo={setIsGo}/>
          : <CourierMain/>}
    </div>
  );
};
