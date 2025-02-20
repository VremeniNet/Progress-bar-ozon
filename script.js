document.getElementById('progressValue').addEventListener('input', function () {
	const value = this.value
	const circle = document.querySelector('circle')

	const dashoffset = 565 - (565 * value) / 100
	circle.style.strokeDashoffset = dashoffset
})

document.getElementById('animate').addEventListener('change', function () {
	const svg = document.querySelector('svg')

	if (this.checked) {
		svg.style.animation = 'rotate 3s linear infinite'
	} else {
		svg.style.animation = 'none'
	}
})

document.getElementById('hide').addEventListener('change', function () {
	const container = document.querySelector('.container')
	const hideCheckbox = document.getElementById('hide')

	if (this.checked) {
		container.querySelectorAll('svg, .outer, .inner').forEach(element => {
			element.style.visibility = 'hidden'
		})
	} else {
		container.querySelectorAll(' svg, .outer, .inner').forEach(element => {
			element.style.visibility = 'visible'
		})
	}
})
