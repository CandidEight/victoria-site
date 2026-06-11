export function initForms() {
	const contactForm = document.getElementById('contactForm')
	const modalForm = document.getElementById('modalForm')
	const formStatus = document.getElementById('formStatus')

	const sendForm = async (data) => {
		console.log('Форма отправлена:', data)
		alert(`Заявка от ${data.name}, телефон: ${data.phone}. Скоро свяжусь!`)
		return { success: true }
	}

	if (contactForm) {
		contactForm.addEventListener('submit', async (e) => {
			e.preventDefault()
			const submitBtn = contactForm.querySelector('button[type="submit"]')
			const originalText = submitBtn.textContent

			submitBtn.textContent = 'Отправка...'
			submitBtn.disabled = true

			const formData = {
				name: document.getElementById('name')?.value || '',
				phone: document.getElementById('phone')?.value || '',
				childAge: document.getElementById('childAge')?.value || '',
				message: 'Заявка с сайта'
			}

			await sendForm(formData)

			if (formStatus) {
				formStatus.textContent = 'Заявка отправлена! Я свяжусь с вами в ближайшее время.'
				formStatus.className = 'form__status form__status--success'
			}

			contactForm.reset()
			submitBtn.textContent = originalText
			submitBtn.disabled = false

			setTimeout(() => {
				if (formStatus) {
					formStatus.style.opacity = '0'
					setTimeout(() => {
						formStatus.textContent = ''
						formStatus.className = 'form__status'
						formStatus.style.opacity = '1'
					}, 300)
				}
			}, 5000)
		})
	}

	if (modalForm) {
		modalForm.addEventListener('submit', async (e) => {
			e.preventDefault()
			const submitBtn = modalForm.querySelector('button[type="submit"]')
			const originalText = submitBtn.textContent

			submitBtn.textContent = 'Отправка...'
			submitBtn.disabled = true

			const formData = {
				name: document.getElementById('modalName')?.value || '',
				phone: document.getElementById('modalPhone')?.value || '',
				childAge: document.getElementById('modalChildAge')?.value || '',
				message: 'Заявка через модальное окно'
			}

			await sendForm(formData)

			const modal = document.getElementById('modal')
			if (modal) {
				modal.classList.remove('modal--open')
				document.body.style.overflow = ''
			}

			modalForm.reset()
			submitBtn.textContent = originalText
			submitBtn.disabled = false
		})
	}
}