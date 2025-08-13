import React from 'react'
import styles from './../Auth.module.css'

type Props = {
  success: string | null
}

export function ConfirmEmail({ success }: Props) {
  return (
    <div>
      <p className={styles.success}>{success}</p>
      <p>Ожидаем подтверждения email...</p>
    </div>
  )
}
