// Перевіряє форму оформлення.
// Повертає об'єкт помилок: { phone: 'Текст помилки' }. Порожній об'єкт — помилок немає.
export function validateCheckout(form) {
  const errors = {}

  if (form.fullName.trim().length < 3) {
    errors.fullName = "Вкажіть ім'я та прізвище"
  }

  // Прибираємо пробіли, дужки й дефіси: "+38 (067) 123-45-67" → "+380671234567"
  const phoneDigits = form.phone.replace(/[\s()-]/g, '')
  if (!/^\+?\d{10,12}$/.test(phoneDigits)) {
    errors.phone = 'Телефон у форматі +380671234567'
  }

  if (!form.city.trim()) {
    errors.city = 'Вкажіть місто'
  }

  if (form.address.trim().length < 5) {
    errors.address = form.delivery === 'courier' ? 'Вкажіть вулицю і номер будинку' : 'Вкажіть номер відділення'
  }

  return errors
}
