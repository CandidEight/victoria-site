export function initScrollTop() {
	const btn = document.getElementById('scrollTopBtn')
	if (!btn) return

	const toggleBtn = () => {
		if (window.scrollY > 400) {
			btn.classList.add('visible')
		} else {
			btn.classList.remove('visible')
		}
	}

	window.addEventListener('scroll', toggleBtn)
	window.addEventListener('resize', toggleBtn)

	btn.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	})

	toggleBtn()
}