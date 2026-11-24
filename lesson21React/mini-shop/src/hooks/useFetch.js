
import { useEffect, useState } from 'react'

export function useFetch(url, token) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isUnauthorized, setIsUnauthorized] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      setError('')
      setIsUnauthorized(false)

      try {
        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : {}

        const response = await fetch(url, { headers })

        if (response.status === 401) {
          if (!cancelled) {
            setIsUnauthorized(true)
          }
          throw new Error('Сесія завершилась — увійдіть ще раз')
        }

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? 'Нічого не знайдено'
              : `Помилка сервера: ${response.status}`
          )
        }

        const json = await response.json()

        if (!cancelled) {
          setData(json)
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError.message)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [url, token, reloadKey])

  function reload() {
    setReloadKey((key) => key + 1)
  }

  return {
    data,
    isLoading,
    error,
    isUnauthorized,
    reload,
  }
}
