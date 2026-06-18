import { initBurger } from './modules/burger.js'
import { initModal } from './modules/modal.js'
import { initCertificates } from './modules/certificates.js'
import { initReviews } from './modules/reviews.js'
import { initForms } from './modules/forms.js'
import { initPhoneMask } from './modules/phoneMask.js'
import { initSnakeAnimation } from './modules/snakeAnimation.js'
import { initMethodBuy } from './modules/methodBuy.js'
import { initScrollTop } from './modules/scrollTop.js'

document.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded сработал')
	
	initBurger()
	initModal()
	initCertificates()
	initReviews()
	initForms()
	initPhoneMask()
	initSnakeAnimation()
	initMethodBuy()
	initScrollTop()
	
	console.log('Все модули инициализированы')
})