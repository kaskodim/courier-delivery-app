import styles from '../styles.module.css'
import React from 'react'

type Props = {
  setIsGo: (flag: boolean) => void
}

export const Go = ({ setIsGo }: Props) => {
  return (
    <div className={styles.containerGo}>
      <span>Нажми чтобы начать доставки</span>
      <button onClick={() => setIsGo(true)}>Go!</button>
    </div>
  )
}
