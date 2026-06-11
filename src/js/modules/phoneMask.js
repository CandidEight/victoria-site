export function initPhoneMask() {
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
}