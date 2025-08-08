'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/supabase-client'
import { useRouter } from 'next/navigation'
import { MIN_PASSWORD_LENGTH } from '@/consnants'

export function useAuthLogic() {
  const [isSignIn, setIsSignIn] = useState<boolean>(true) // вход - true || регистрация - false
  const [email, setEmail] = useState<string>('') // email
  const [name, setName] = useState<string>('') // name
  const [password, setPassword] = useState<string>('') // пароль для входа или регистрации
  const [confirmPassword, setConfirmPassword] = useState<string>('') // пароль для сравнения перед регистрацией
  const [error, setError] = useState<string | null>(null) // error
  const [success, setSuccess] = useState<string | null>(null) // сообщение для успешной регистрации
  const [isEmailConfirmed, setIsEmailConfirmed] = useState<boolean>(false) // подтвержден ли email
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!isSignIn && password !== confirmPassword) {
      setError('Пароли не совпадают')
      return
    }

    //валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!isSignIn && !emailRegex.test(email)) {
      setError('Введите корректный email')
      return
    }

    if (!isSignIn && password.length < MIN_PASSWORD_LENGTH) {
      setError(`Пароль должен быть не короче ${MIN_PASSWORD_LENGTH} символов`)
      return
    }

    if (isSignIn) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Неверный email или пароль')
        } else {
          setError('Ошибка входа. Попробуйте снова')
        }
        return
      }
      router.push('/')
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } })
      if (error) {
        if (error.message.includes('User already registered')) {
          setError('Этот email уже зарегистрирован. Войдите или используйте другой email')
        } else if (error.message.includes('Invalid format')) {
          setError('Некорректный формат email или пароля')
        } else {
          setError('Ошибка регистрации. Попробуйте снова позже')
        }
        return
      }
      setSuccess('Регистрация успешна! Подтвердите email.')
      setIsEmailConfirmed(false)
    }
  }

  // Сбрасываем ошибку при вводе в любое поле
  const resetError = () => setError(null)

  useEffect(() => {
    if (success && !isSignIn) {
      const checkEmailConfirmation = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (session?.user?.confirmed_at) {
          setIsEmailConfirmed(true)
          router.push('/')
        }
      }
      const interval = setInterval(checkEmailConfirmation, 3000)
      return () => clearInterval(interval)
    }
  }, [success, isSignIn, router])

  return {
    isSignIn,
    setIsSignIn,
    email,
    setEmail: (value: string) => {
      setEmail(value)
      resetError()
    },
    name,
    setName: (value: string) => {
      setName(value)
      resetError()
    },
    password,
    setPassword: (value: string) => {
      setPassword(value)
      resetError()
    },
    confirmPassword,
    setConfirmPassword: (value: string) => {
      setConfirmPassword(value)
      resetError()
    },
    error,
    success,
    isEmailConfirmed,
    handleSubmit,
  }
}
