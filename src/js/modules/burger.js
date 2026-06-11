export function initBurger() {
	const burger = document.getElementById('burgerBtn')
	const nav = document.querySelector('.nav')

	if (!burger || !nav) return

	burger.addEventListener('click', (e) => {
		e.stopPropagation()
		burger.classList.toggle('burger--active')
		nav.classList.toggle('nav--active')
	})

	document.querySelectorAll('.nav__link').forEach(link => {
		link.addEventListener('click', () => {
			burger.classList.remove('burger--active')
			nav.classList.remove('nav--active')
		})
	})

	document.addEventListener('click', (e) => {
		if (nav.classList.contains('nav--active') && 
		    !nav.contains(e.target) && 
		    !burger.contains(e.target)) {
			burger.classList.remove('burger--active')
			nav.classList.remove('nav--active')
		}
	})
}