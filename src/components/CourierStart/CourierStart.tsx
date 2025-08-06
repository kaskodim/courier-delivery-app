import styles from '../CourierDashboard/CourierDashboard.module.css'
import React from 'react'

type Props = {
  setIsGo: (flag: boolean) => void
}

export const CourierStart = ({ setIsGo }: Props) => {
  return (
    <div className={styles.containerGo}>
      <span>Нажми чтобы начать доставки</span>
      <button onClick={() => setIsGo(false)}>Go!</button>
    </div>
  )
}
