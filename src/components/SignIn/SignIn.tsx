'use client'

import { useState } from 'react'

import styles from './SignIn.module.css'
import { supabase } from '@lib/supabase/supabase-client'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const { error: singInError } = await supabase.auth.signInWithPassword({ email, password })
    if (singInError) {
      console.error('ошибка при входе:', singInError.message)
      return
    }
    router.push('/')
  }

  return (
    <div className={styles.signinContainer}>
      <h2>Вход</h2>
      <form className={styles.form} onSubmit={handleSignIn}>
        <div className={styles.fieldContainer}>
          <label className={styles.label}>Email:</label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.fieldContainer}>
          <label className={styles.label}>Пароль:</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className={styles.button} type="submit">
          Войти
        </button>
      </form>
    </div>
  )
}
