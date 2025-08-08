import React from 'react'
import styles from './../Auth.module.css'

type Props = {
  isSignIn: boolean
  email: string
  setEmail: (value: string) => void
  name: string
  setName: (value: string) => void
  password: string
  setPassword: (value: string) => void
  confirmPassword: string
  setConfirmPassword: (value: string) => void
  error: string | null
  handleSubmit: (e: React.FormEvent) => void
  setIsSignIn: (value: boolean) => void
}

export function AuthForm({
  isSignIn,
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  handleSubmit,
  setIsSignIn,
}: Props) {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {!isSignIn && (
        <div className={styles.field}>
          <label className={styles.label}>Имя:</label>
          <input className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} required />
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
  )
}
