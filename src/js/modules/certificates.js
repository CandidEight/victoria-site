export function initCertificates() {
	const certificatesGrid = document.getElementById('certificatesGrid')
	if (!certificatesGrid) return

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