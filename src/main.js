import './css/main.css'

document.addEventListener('DOMContentLoaded', () => {
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

	const tabBtns = document.querySelectorAll('.tab-btn')
	const tabPanes = document.querySelectorAll('.tab-pane')

	if (tabBtns.length) {
		tabBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				const tabId = btn.dataset.tab

				tabBtns.forEach(b => b.classList.remove('tab-btn--active'))
				tabPanes.forEach(pane => pane.classList.remove('tab-pane--active'))

				btn.classList.add('tab-btn--active')

				const activePane = document.querySelector(`.tab-pane[data-tab-content="${tabId}"]`)
				if (activePane) {
					activePane.classList.add('tab-pane--active')
				}
			})
		})
	}

	const certificatesGrid = document.getElementById('certificatesGrid')
	if (certificatesGrid) {
		const certificates = [
			{ title: 'Диплом о высшем образовании', description: 'МПГУ, факультет дошкольной педагогики и психологии', year: '2012' },
			{ title: 'Повышение квалификации', description: 'Современные методики раннего развития детей 2-3 лет', year: '2020' },
			{ title: 'Курс "Монтессори-педагогика"', description: 'Международный институт Монтессори-педагогики', year: '2021' },
			{ title: 'Логопедические методики', description: 'Запуск речи у неговорящих детей', year: '2022' },
			{ title: 'Детская психология', description: 'Психологическое консультирование родителей дошкольников', year: '2023' },
			{ title: 'Нейропсихология', description: 'Нейропсихологический подход в развитии детей', year: '2024' }
		]

		certificatesGrid.innerHTML = certificates.map(cert => `
			<div class="certificate-card">
				<div class="certificate-card__year">${cert.year}</div>
				<h3 class="certificate-card__title">${cert.title}</h3>
				<p class="certificate-card__desc">${cert.description}</p>
			</div>
		`).join('')
	}

	const reviewsGrid = document.getElementById('reviewsGrid')
	if (reviewsGrid) {
		const reviews = [
			{ name: 'Екатерина', child: 'Мама Артема, 5 лет', text: 'Виктория Сергеевна занимается с сыном уже полгода. Ребенок с нетерпением ждет каждого занятия! Стал лучше читать и считать. Очень внимательный и профессиональный педагог.' },
			{ name: 'Анна', child: 'Мама Софии, 4 года', text: 'Огромное спасибо Виктории Сергеевне за индивидуальный подход. Дочь очень стеснительная, но педагог нашла к ней подход. Результаты уже через месяц занятий!' },
			{ name: 'Мария', child: 'Мама Димы, 6 лет', text: 'Готовились к школе с Викторией Сергеевной. Ребенок поступил в гимназию, легко прошел тестирование. Очень рекомендую!' }
		]

		reviewsGrid.innerHTML = reviews.map(review => `
			<div class="review-card">
				<div class="review-card__header">
					<div class="review-card__name">${review.name}</div>
					<div class="review-card__child">${review.child}</div>
				</div>
				<p class="review-card__text">${review.text}</p>
				<div class="review-card__rating">★★★★★</div>
			</div>
		`).join('')
	}

	const modal = document.getElementById('modal')
	const openModalBtn = document.getElementById('openModalBtn')
	const closeModalBtn = document.getElementById('closeModalBtn')

	if (modal && openModalBtn) {
		openModalBtn.addEventListener('click', () => {
			modal.classList.add('modal--open')
			document.body.style.overflow = 'hidden'
		})

		const closeModal = () => {
			modal.classList.remove('modal--open')
			document.body.style.overflow = ''
		}

		if (closeModalBtn) {
			closeModalBtn.addEventListener('click', closeModal)
		}

		modal.querySelector('.modal__overlay')?.addEventListener('click', closeModal)

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && modal.classList.contains('modal--open')) {
				closeModal()
			}
		})
	}

	const contactForm = document.getElementById('contactForm')
	const modalForm = document.getElementById('modalForm')
	const formStatus = document.getElementById('formStatus')

	const sendForm = async (data) => {
		console.log('Форма отправлена:', data)
		alert(`Заявка от ${data.name}, телефон: ${data.phone}. В демо-режиме заявка не отправлена. Для реальной отправки настрой Telegram бота.`)
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
				name: document.getElementById('name').value,
				phone: document.getElementById('phone').value,
				email: document.getElementById('email').value,
				message: document.getElementById('message').value
			}

			await sendForm(formData)

			if (formStatus) {
				formStatus.textContent = '✅ Заявка отправлена! Я свяжусь с вами в ближайшее время.'
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
				name: document.getElementById('modalName').value,
				phone: document.getElementById('modalPhone').value,
				childAge: document.getElementById('modalChildAge').value,
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
})