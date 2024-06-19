export function parseJwt(token: string) {
  try {
    // Декодирование токена и извлечение payload (данные пользователя)
    const base64Url = token.split('.')[1] // Извлекаем сегмент с payload
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`
    }).join(''))

    return JSON.parse(jsonPayload)
  }
  catch (e) {
    return null
  }
}
