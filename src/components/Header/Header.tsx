import React from 'react'
import styles from './Header.module.css'
import { supabase } from '@lib/supabase/supabase-client'
import { useRouter } from 'next/navigation'

export const Header = () => {

  const router = useRouter()


  const hendleOut = async () => {
   await supabase.auth.signOut()
    router.push('/auth')
  }

  return (
    <>
      <div className={styles.header}>
        фамилия имя
        <button onClick={hendleOut}>выйти</button>
      </div>
    </>
  )
}
