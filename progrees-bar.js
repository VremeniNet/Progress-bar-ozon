class ProgressBar extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :host {
					height: 100vh;
          display: flex;
					align-items: center;
					justify-content: center;          
          font-family: 'Roboto', sans-serif;
        }

        .container {
          display: flex;
          flex-direction: column;
          width: 200px;
          height: 60vh;
          position: relative;
        }

        .outer {
          height: 200px;
          width: 200px;
          padding: 20px;
          box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.3),
            -3px -3px 10px -1px rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          margin-bottom: 10vh;
        }

        .inner {
          height: 160px;
          width: 160px;
          box-shadow: inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2),
            inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
            -0.5px -0.5px 0 rgba(255, 255, 255, 1),
            0.5px 0.5px 0 rgba(0, 0, 0, 0.15),
            0 12px 10px -10px rgba(0, 0, 0, 0.05);
          border-radius: 50%;
        }

        circle {
          fill: none;
          stroke: url(#GradientColor);
          stroke-width: 20px;
          stroke-dasharray: 565;
          stroke-dashoffset: 197;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
          transition: stroke-dashoffset 0.5s linear;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        svg {
          position: absolute;
          top: 0;
          left: 0;
        }

        /* controls можно оставить или убрать, если управление будет только через API */
        .controls {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          font-size: 20px;
          font-weight: 500;
          gap: 16px;
        }

        .input-block {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .toggle-block {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        input[type='number'] {
          width: 60px;
          height: 30px;
          text-align: center;
          border: 2px solid black;
          border-radius: 20px;
          outline: none;
          font-size: 16px;
          font-weight: bold;
          -moz-appearance: textfield;
        }

        input[type='number']::-webkit-outer-spin-button,
        input[type='number']::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .toggle {
          position: relative;
          width: 60px;
          height: 30px;
        }

        .toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          border-radius: 25px;
          transition: 0.4s;
          height: 30px;
          width: 60px;
        }

        .slider:before {
          position: absolute;
          content: '';
          height: 25px;
          width: 25px;
          left: 3px;
          bottom: 2.5px;
          background-color: white;
          border-radius: 50%;
          transition: 0.4s;
        }

        input:checked + .slider {
          background-color: blue;
        }

        input:checked + .slider:before {
          transform: translateX(30px);
        }

        @media screen and (max-width: 1024px) and (orientation: landscape) {
          .container {
            flex-direction: row;
            width: 70vw;
            height: 60vh;
            gap: 60px;
          }

          .controls {
            align-items: flex-start;
            margin-top: 0;
          }
        }
      </style>

      <div class="container">
        <div class="outer">
          <div class="inner"></div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200px" height="200px">
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stop-color="#0000FF" />
              <stop offset="100%" stop-color="#0000CD" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="90" stroke-linecap="round" />
        </svg>

        <!-- В будущем можно убрать -->
        <div class="controls">
          <div class="input-block">
            <input type="number" id="progressValue" min="0" max="100" value="65" />
            <label for="progressValue">Value</label>
          </div>
          <div class="toggle-block">
            <label class="toggle">
              <input type="checkbox" id="animate" />
              <span class="slider"></span>
            </label>
            <label for="animate">Animate</label>
          </div>
          <div class="toggle-block">
            <label class="toggle">
              <input type="checkbox" id="hide" />
              <span class="slider"></span>
            </label>
            <label for="hide">Hide</label>
          </div>
        </div>
      </div>
    `

		this.shadowRoot
			.getElementById('progressValue')
			?.addEventListener('input', e => {
				this.setValue(e.target.value)
			})
		this.shadowRoot.getElementById('animate')?.addEventListener('change', e => {
			this.setAnimate(e.target.checked)
		})
		this.shadowRoot.getElementById('hide')?.addEventListener('change', e => {
			this.setHide(e.target.checked)
		})
	}

	// Публичные методы для API

	setValue(value) {
		const circle = this.shadowRoot.querySelector('circle')
		const dashoffset = 565 - (565 * value) / 100
		circle.style.strokeDashoffset = dashoffset
	}

	setAnimate(animate) {
		const svg = this.shadowRoot.querySelector('svg')
		svg.style.animation = animate ? 'rotate 3s linear infinite' : 'none'
	}

	setHide(hide) {
		const container = this.shadowRoot.querySelector('.container')
		container.querySelectorAll('svg, .outer, .inner').forEach(el => {
			el.style.visibility = hide ? 'hidden' : 'visible'
		})
	}
}

customElements.define('progress-bar', ProgressBar)
