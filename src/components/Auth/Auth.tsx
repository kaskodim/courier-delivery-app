'use client'

import React from 'react'
import styles from './Auth.module.css'
import { useAuthLogic } from '@/hooks/useAuthLogic'
import { ConfirmEmail } from '@components/Auth/ConfirmEmail/ConfirmEmail'
import { AuthForm } from '@components/Auth/AuthForm/AuthForm'

export default function Auth() {
  const {
    isSignIn,
    setIsSignIn,
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    isEmailConfirmed,
    handleSubmit,
  } = useAuthLogic()

  return (
    <div className={styles.authContainer}>
      <h2>{isSignIn ? 'Вход' : 'Регистрация'}</h2>
      {success && !isEmailConfirmed ? (
        <ConfirmEmail success={success} />
      ) : (
        <AuthForm
          isSignIn={isSignIn}
          email={email}
          setEmail={setEmail}
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          error={error}
          handleSubmit={handleSubmit}
          setIsSignIn={setIsSignIn}
        />
      )}
    </div>
  )
}
