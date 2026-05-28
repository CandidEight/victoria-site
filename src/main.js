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
	}

	const reviewsTrack = document.getElementById('reviewsTrack')
	const reviewsDots = document.getElementById('reviewsDots')
	let currentReview = 0
	let reviews = []

	if (reviewsTrack && reviewsDots) {
		reviews = [
			{ name: 'Екатерина', child: 'мама Артема, 6 лет', text: 'Виктория Сергеевна — настоящий профессионал с большой душой. Сын ходил на занятия с удовольствием, ждал каждую встречу. Результат — поступление в сильную школу и главное — любовь к учебе!', rating: 5 },
			{ name: 'Анна', child: 'мама Софии, 5 лет', text: 'Дочь была очень стеснительной, боялась отвечать. Виктория Сергеевна нашла подход, и через месяц София сама тянула руку и просила дополнительные задания. Огромное спасибо за чуткость и профессионализм.', rating: 5 },
			{ name: 'Мария', child: 'мама Димы, 7 лет', text: 'Готовились к школе полгода. Результат превзошел ожидания — сын не только научился читать и считать, но и стал увереннее в себе. Виктория Сергеевна стала для него настоящим наставником.', rating: 5 }
		]

		reviewsTrack.innerHTML = reviews.map(review => `
			<div class="review-card">
				<div class="review-card__header">
					<div class="review-card__name">${review.name}</div>
					<div class="review-card__child">${review.child}</div>
				</div>
				<p class="review-card__text">${review.text}</p>
				<div class="review-card__rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
			</div>
		`).join('')

		reviewsDots.innerHTML = reviews.map((_, i) => `<div class="reviews__dot ${i === 0 ? 'reviews__dot--active' : ''}" data-review="${i}"></div>`).join('')

		const updateReviewSlider = () => {
			if (reviewsTrack) {
				reviewsTrack.style.transform = `translateX(-${currentReview * 100}%)`
			}
			document.querySelectorAll('.reviews__dot').forEach((dot, i) => {
				dot.classList.toggle('reviews__dot--active', i === currentReview)
			})
		}

		const prevBtn = document.getElementById('prevReview')
		const nextBtn = document.getElementById('nextReview')

		if (prevBtn) {
			prevBtn.addEventListener('click', () => {
				currentReview = (currentReview - 1 + reviews.length) % reviews.length
				updateReviewSlider()
			})
		}

		if (nextBtn) {
			nextBtn.addEventListener('click', () => {
				currentReview = (currentReview + 1) % reviews.length
				updateReviewSlider()
			})
		}

		document.querySelectorAll('.reviews__dot').forEach(dot => {
			dot.addEventListener('click', (e) => {
				currentReview = parseInt(e.target.dataset.review)
				updateReviewSlider()
			})
		})

		updateReviewSlider()
	}

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