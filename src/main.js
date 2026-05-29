import './css/main.css'

console.log('main.js загружен')

document.addEventListener('DOMContentLoaded', () => {

	console.log('DOMContentLoaded сработал')

	const burgerBtn = document.getElementById('burgerBtn')
	const nav = document.querySelector('.nav')

	if (burgerBtn && nav) {
		burgerBtn.addEventListener('click', () => {
			burgerBtn.classList.toggle('burger--active')
			nav.classList.toggle('nav--active')
			document.body.style.overflow = nav.classList.contains('nav--active') ? 'hidden' : ''
		})

		document.querySelectorAll('.nav__link').forEach(link => {
			link.addEventListener('click', () => {
				burgerBtn.classList.remove('burger--active')
				nav.classList.remove('nav--active')
				document.body.style.overflow = ''
			})
		})
	}

	const modal = document.getElementById('modal')
	const openModalBtns = [document.getElementById('openModalBtn'), document.getElementById('heroModalBtn')]
	const closeModalBtn = document.getElementById('closeModalBtn')

	if (modal && openModalBtns[0]) {
		openModalBtns.forEach(btn => {
			if (btn) {
				btn.addEventListener('click', () => {
					modal.classList.add('modal--open')
					document.body.style.overflow = 'hidden'
				})
			}
		})

		const closeModal = () => {
			modal.classList.remove('modal--open')
			document.body.style.overflow = ''
		}

		if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal)
		modal.querySelector('.modal__overlay')?.addEventListener('click', closeModal)

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && modal.classList.contains('modal--open')) closeModal()
		})
	}

	const certificatesGrid = document.getElementById('certificatesGrid')
	console.log('certificatesGrid найден?', certificatesGrid)

	if (certificatesGrid) {
		const certificates = [
			{ title: 'Диплом МПГУ', description: 'Факультет дошкольной педагогики и психологии', year: '2015' },
			{ title: 'Авторская методика', description: 'Курс повышения квалификации по раннему развитию', year: '2019' },
			{ title: 'Монтессори-педагогика', description: 'Международный институт Монтессори', year: '2021' },
			{ title: 'Нейропсихология', description: 'Нейропсихологический подход в развитии детей', year: '2022' },
			{ title: 'Эмоциональный интеллект', description: 'Психологическое консультирование', year: '2023' },
			{ title: 'Скорочтение', description: 'Современные методики чтения для дошкольников', year: '2024' }
		]

		certificatesGrid.innerHTML = certificates.map(cert => `
			<div class="certificate-card">
				<div class="certificate-card__year">${cert.year}</div>
				<h3 class="certificate-card__title">${cert.title}</h3>
				<p class="certificate-card__desc">${cert.description}</p>
			</div>
		`).join('')

		console.log('Сертификатов вставлено:', document.querySelectorAll('.certificate-card').length)
	} else {
		console.error('certificatesGrid НЕ НАЙДЕН в DOM')
	}

	// Блок отзывов через кнопки VK и MAX (карусель удалена)
	const reviewVkBtn = document.getElementById('reviewVk')
	const reviewMaxBtn = document.getElementById('reviewMax')

	if (reviewVkBtn) {
		reviewVkBtn.addEventListener('click', () => {
			console.log('Переход на отзывы VK')
		})
	}

	if (reviewMaxBtn) {
		reviewMaxBtn.addEventListener('click', () => {
			console.log('Переход в чат MAX')
		})
	}

	const imageWrapper = document.querySelector('.reviews__image-wrapper')
	if (imageWrapper) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					imageWrapper.classList.add('reveal')
					observer.unobserve(imageWrapper)
				}
			})
		}, { threshold: 0.3 })
		observer.observe(imageWrapper)
	}

	const contactForm = document.getElementById('contactForm')
	const modalForm = document.getElementById('modalForm')
	const formStatus = document.getElementById('formStatus')

	const phoneInputs = document.querySelectorAll('input[type="tel"]')
	phoneInputs.forEach(input => {
		input.addEventListener('input', (e) => {
			let value = e.target.value.replace(/\D/g, '')
			if (value.length > 11) value = value.slice(0, 11)
			
			let formatted = ''
			if (value.length > 0) {
				if (value[0] === '7' || value[0] === '8') {
					formatted = '+7'
					let rest = value.slice(1)
					if (rest.length > 0) formatted += ' (' + rest.slice(0, 3)
					if (rest.length > 3) formatted += ') ' + rest.slice(3, 6)
					if (rest.length > 6) formatted += '-' + rest.slice(6, 8)
					if (rest.length > 8) formatted += '-' + rest.slice(8, 10)
				} else {
					formatted = '+7 (' + value.slice(0, 3)
					if (value.length > 3) formatted += ') ' + value.slice(3, 6)
					if (value.length > 6) formatted += '-' + value.slice(6, 8)
					if (value.length > 8) formatted += '-' + value.slice(8, 10)
				}
			}
			e.target.value = formatted
		})
	})

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

			if (modal) {
				modal.classList.remove('modal--open')
				document.body.style.overflow = ''
			}

			modalForm.reset()
			submitBtn.textContent = originalText
			submitBtn.disabled = false
		})
	}

	console.log('DOMContentLoaded отработал полностью')
})