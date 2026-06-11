export function initReviews() {
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
}