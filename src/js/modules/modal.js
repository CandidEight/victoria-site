export function initModal() {
	const modal = document.getElementById('modal')
	const openModalBtns = [document.getElementById('openModalBtn'), document.getElementById('heroModalBtn')]
	const closeModalBtn = document.getElementById('closeModalBtn')

	if (!modal || !openModalBtns[0]) return

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