export function initMethodSnake() {
	const canvas = document.getElementById('methodCanvas')
	if (!canvas) return

	const container = document.querySelector('.method__grid')
	if (!container) return

	function drawSnakeLine() {
		const cards = document.querySelectorAll('.method__card')
		if (cards.length !== 3) return

		const rects = []
		const containerRect = container.getBoundingClientRect()

		cards.forEach(card => {
			const rect = card.getBoundingClientRect()
			rects.push({
				left: rect.left - containerRect.left,
				right: rect.right - containerRect.left,
				top: rect.top - containerRect.top,
				bottom: rect.bottom - containerRect.top,
				centerX: rect.left + rect.width / 2 - containerRect.left
			})
		})

		canvas.width = container.offsetWidth
		canvas.height = container.offsetHeight

		const ctx = canvas.getContext('2d')
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.beginPath()
		ctx.strokeStyle = '#2D6A4F'
		ctx.lineWidth = 5
		ctx.lineCap = 'round'
		ctx.lineJoin = 'round'

		const startX = rects[0].right + 30
		const startY = rects[0].top + (rects[0].bottom - rects[0].top) / 2 + 10
		const endX = rects[2].left - 30
		const endY = rects[2].top + (rects[2].bottom - rects[2].top) / 2 - 10

		ctx.moveTo(startX, startY)

		// ТВОЙ РАБОЧИЙ КОД, НО С БОЛЕЕ ЧАСТЫМИ ИЗГИБАМИ (S-УЗОР)
		ctx.quadraticCurveTo(rects[1].centerX - 50, rects[0].top - 35, rects[1].centerX - 30, rects[1].top + 10)
		ctx.quadraticCurveTo(rects[1].centerX - 15, rects[1].bottom + 35, rects[1].centerX, rects[1].top - 15)
		ctx.quadraticCurveTo(rects[1].centerX + 15, rects[1].bottom + 40, rects[1].centerX + 30, rects[1].top - 10)
		ctx.quadraticCurveTo(rects[1].centerX + 45, rects[1].bottom + 30, rects[1].centerX + 60, rects[1].top - 20)
		ctx.quadraticCurveTo(rects[1].centerX + 75, rects[1].bottom + 20, rects[2].centerX - 30, rects[2].top + 25)
		ctx.quadraticCurveTo(rects[2].centerX - 10, rects[2].bottom - 20, rects[2].centerX + 10, rects[2].top - 10)
		ctx.quadraticCurveTo(rects[2].centerX + 30, rects[2].bottom - 15, endX, endY)

		ctx.stroke()
	}

	drawSnakeLine()
	window.addEventListener('resize', () => setTimeout(drawSnakeLine, 100))
	const observer = new MutationObserver(() => drawSnakeLine())
	observer.observe(container, { childList: true, subtree: true, attributes: true })
}