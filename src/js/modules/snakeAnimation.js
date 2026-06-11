export function initSnakeAnimation() {
	const methodGrid = document.querySelector('.method__grid')
	const snakeSvg = document.querySelector('.method__snake')
	
	if (!methodGrid || !snakeSvg) return
	
	// Флаг, чтобы анимация запускалась только один раз
	let animationStarted = false
	
	const startAnimation = () => {
		if (animationStarted) return
		animationStarted = true
		
		const snakePath = document.querySelector('.method__snake path')
		if (snakePath) {
			const length = snakePath.getTotalLength()
			
			snakePath.style.strokeDasharray = length
			snakePath.style.strokeDashoffset = length
			snakeSvg.style.opacity = '1'
			
			setTimeout(() => {
				snakePath.style.transition = 'stroke-dashoffset 5s cubic-bezier(0.4, 0, 0.2, 1)'
				snakePath.style.strokeDashoffset = '0'
			}, 50)
		}
	}
	
	// Наблюдаем за секцией method (старт при появлении в зоне видимости)
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				startAnimation()
				observer.unobserve(methodGrid)
			}
		})
	}, { 
		threshold: 0.2,           // 20% блока видно (раньше, чем было)
		rootMargin: '-50px 0px 0px 0px'  // Смещаем, чтобы срабатывало чуть раньше
	})
	
	observer.observe(methodGrid)
}