export function initMethodBuy() {
	const buyBtn = document.getElementById('methodBuyBtn')
	const buyModal = document.getElementById('buyModal')
	const closeBuyBtn = document.getElementById('closeBuyModal')
	const buyForm = document.getElementById('buyForm')

	if (!buyBtn || !buyModal) return

	// Открытие модалки
	buyBtn.addEventListener('click', () => {
		buyModal.classList.add('modal--open')
		document.body.style.overflow = 'hidden'
	})

	// Закрытие
	const closeBuyModal = () => {
		buyModal.classList.remove('modal--open')
		document.body.style.overflow = ''
	}

	if (closeBuyBtn) closeBuyBtn.addEventListener('click', closeBuyModal)
	buyModal.querySelector('.modal__overlay')?.addEventListener('click', closeBuyModal)

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && buyModal.classList.contains('modal--open')) {
			closeBuyModal()
		}
	})

	// Отправка формы
	if (buyForm) {
		buyForm.addEventListener('submit', async (e) => {
			e.preventDefault()
			const submitBtn = buyForm.querySelector('button[type="submit"]')
			const originalText = submitBtn.textContent

			submitBtn.textContent = 'Обработка...'
			submitBtn.disabled = true

			const formData = {
				name: document.getElementById('buyName')?.value || '',
				phone: document.getElementById('buyPhone')?.value || '',
				email: document.getElementById('buyEmail')?.value || '',
				product: 'Авторская методика Виктории Салеевой',
				price: '2 490 ₽'
			}

			console.log('Покупка методики:', formData)
			alert(`Спасибо, ${formData.name}! На ваш телефон ${formData.phone} отправлена ссылка на оплату.`)

			buyForm.reset()
			submitBtn.textContent = originalText
			submitBtn.disabled = false
			closeBuyModal()
		})
	}
}