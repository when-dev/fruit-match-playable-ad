import { GAME_CONFIG } from './config'
import { createInitialState, GAME_STATUS } from './state'

export class Game {
	constructor(rootElement) {
		this.rootElement = rootElement
		this.state = createInitialState()

		this.handleStart = this.handleStart.bind(this)
	}

	init() {
		this.render()
	}

	start() {
		this.state.status = GAME_STATUS.PLAYING
		this.render()
	}

	handleStart() {
		this.start()
	}

	render() {
		if (this.state.status === GAME_STATUS.INTRO) {
			this.renderIntro()
			return
		}

		if (this.state.status === GAME_STATUS.PLAYING) {
			this.renderGame()
			return
		}
	}

	renderIntro() {
		this.rootElement.innerHTML = `
			<main class="ad">
				<section class="game-card">
					<div class="screen screen--intro">
						<p class="eyebrow">HTML5 PLAYABLE MINI GAME</p>

						<h1 class="title">Fruit Catcher</h1>

						<p class="description">
							Move the basket, catch fruits, avoid bombs and reach the target score before
						</p>

						<div class="intro-stats">
							<div>
								<strong>${GAME_CONFIG.duration}</strong>
								<span>Time</span>
							</div>
						</div>

						<div>
							<strong>${GAME_CONFIG.targetScore}</strong>
							<span>Target</span>
						</div>

						<div>
							<strong>${GAME_CONFIG.initialLives}</strong>
							<span>Lives</span>
						</div>

						<button class="primary-button" type="button" data-action="start">
							Start Game
						</button>
					</div>
				</section>
			</main>
		`

		this.rootElement
			.querySelector('[data-action="start"]')
			.addEventListener('click', this.handleStart)
	}

	renderGame() {
		const basket = this.state.basket

		this.rootElement.innerHTML = `
			<main class="ad">
				<section class="game-card game-card--playing">
					<div class="hud">
						<div class="hud-item">
							<span>Score</span>
							<strong>${this.state.score}</strong>
						</div>

						<div class="hud-item">
							<span>Time</span>
							<strong>${Math.ceil(this.state.timeLeft)}</strong>
						</div>

						<div class="hud-item">
							<span>Lives</span>
							<strong>${'❤️'.repeat(this.state.lives)}</strong>
						</div>
					</div>

				 <div class="game-area">
            <div 
              class="basket"
              style="
                width: ${basket.width}px;
                height: ${basket.height}px;
                transform: translate(${basket.x}px, ${basket.y}px);
              "
            >
              🧺
            </div>
          </div>
				</section>
			</main>
		`
	}
}
