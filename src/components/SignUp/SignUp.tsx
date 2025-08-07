'use client'

import { useState } from 'react'
import styles from './SignUp.module.css'
import { supabase } from '@lib/supabase/supabase-client'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (password !== confirmPassword) {
      setError('Пароли не совпадают')
      return
    }

    const { error: singUpError } = await supabase.auth.signUp({ email, password, options: { data: { name } } })
    if (singUpError) {
      console.error('ошибка при регистрации:', singUpError.message)
      return
    }

    // const { error } = await supabase.auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     data: {
    //       name,
    //     },
    //   },
    // });
    //
    // if (error) {
    //   setError(error.message);
    // } else {
    //   setSuccess('Регистрация успешна! Проверьте email для подтверждения.');
    // }
  }

  return (
    <div className={styles.signupContainer}>
      <h2>Регистрация</h2>
      <form className={styles.form} onSubmit={handleSignUp}>
        <div className={styles.fieldContainer}>
          <label className={styles.label}>Имя:</label>
          <input className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
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
        <div className={styles.fieldContainer}>
          <label className={styles.label}>Подтверждение пароля:</label>
          <input
            className={styles.input}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button className={styles.button} type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  )
}
