'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/supabase-client'
import { useRouter } from 'next/navigation'
import styles from './Auth.module.css'

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!isSignIn && password !== confirmPassword) {
      setError('Пароли не совпадают')
      return
    }

    if (isSignIn) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError('Ошибка входа: ' + error.message)
        return
      }
      router.push('/')
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } })
      if (error) {
        setError('Ошибка регистрации: ' + error.message)
        return
      }
      setSuccess('Регистрация успешна! Подтвердите email.')
      setIsEmailConfirmed(false)
    }
  }

  useEffect(() => {
    if (success && !isSignIn) {
      const checkEmailConfirmation = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user?.confirmed_at) {
          setIsEmailConfirmed(true)
          router.push('/')
        }
      }

      const interval = setInterval(checkEmailConfirmation, 1000)
      return () => clearInterval(interval)
    }
  }, [success, isSignIn, router])

  return (
    <div className={styles.authContainer}>
      <h2>{isSignIn ? 'Вход' : 'Регистрация'}</h2>
      {success && !isEmailConfirmed ? (
        <div>
          <p className={styles.success}>{success}</p>
          <p>Ожидаем подтверждения email...</p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          {!isSignIn && (
            <div className={styles.field}>
              <label className={styles.label}>Имя:</label>
              <input
                className={styles.input}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className={styles.field}>
            <label className={styles.label}>Email:</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Пароль:</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isSignIn && (
            <div className={styles.field}>
              <label className={styles.label}>Повторите пароль:</label>
              <input
                className={styles.input}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.button} type="submit">
            {isSignIn ? 'Войти' : 'Зарегистрироваться'}
          </button>
          <button type="button" onClick={() => setIsSignIn(!isSignIn)} className={styles.toggleButton}>
            {isSignIn ? 'Регистрация' : 'Вход'}
          </button>
        </form>
      )}
    </div>
  )
}