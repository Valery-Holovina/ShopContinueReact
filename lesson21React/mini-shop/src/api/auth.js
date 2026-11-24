import { LOGIN_URL } from './endpoints.js'

// Надсилає логін і пароль на сервер.
// Успіх → об'єкт користувача з accessToken. Помилка → throw Error з текстом для користувача.
export async function loginRequest(username, password) {
  const response = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, expiresInMins: 60 }),
  })

  if (response.status === 400 || response.status === 401) {
    throw new Error('Неправильний логін або пароль')
  }
  if (!response.ok) {
    throw new Error(`Помилка сервера: ${response.status}`)
  }

  return response.json()
}
