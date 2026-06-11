import '../css/main.css'
import { initBurger } from './modules/burger.js'
import { initModal } from './modules/modal.js'
import { initCertificates } from './modules/certificates.js'
import { initReviews } from './modules/reviews.js'
import { initForms } from './modules/forms.js'
import { initPhoneMask } from './modules/phoneMask.js'
import { initSnakeAnimation } from './modules/snakeAnimation.js'

document.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded сработал')
	
	initBurger()
	initModal()
	initCertificates()
	initReviews()
	initForms()
	initPhoneMask()
	initSnakeAnimation()
	
	console.log('Все модули инициализированы')
})