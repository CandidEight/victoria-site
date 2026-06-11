export function initBurger() {
	const burgerBtn = document.getElementById('burgerBtn')
	const nav = document.querySelector('.nav')

	if (!burgerBtn || !nav) return

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