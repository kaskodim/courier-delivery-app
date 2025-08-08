import Link from 'next/link'

export default function AuthPage() {
  return (
    <div>
      <h1>Авторизация</h1>
      <p>
        <Link href="/auth/signin">Войти</Link> | <Link href="/auth/signup">Зарегистрироваться</Link>
      </p>
    </div>
  )
}
