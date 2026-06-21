import { GAME_CONFIG } from './config'
import { createInitialState, GAME_STATUS } from './state'
import { createFruit } from './entities'
import { clamp } from '../utils/clamp'

export class Game {
	constructor(rootElement) {
		this.rootElement = rootElement
		this.state = createInitialState()

		this.handleStart = this.handleStart.bind(this)
		this.handlePointerMove = this.handlePointerMove.bind(this)
	}

	init() {
		this.render()
	}

	start() {
		this.state = createInitialState()
		this.state.status = GAME_STATUS.PLAYING
		this.state.lastTime = performance.now()

		this.render()

		requestAnimationFrame(time => this.loop(time))
	}

	loop(currentTime) {
		if (this.state.status !== GAME_STATUS.PLAYING) {
			return
		}

		const deltaTime = (currentTime - this.state.lastTime) / 1000
		this.state.lastTime = currentTime

		this.update(deltaTime)
		this.render()

		if (this.state.status === GAME_STATUS.PLAYING) {
			requestAnimationFrame(time => this.loop(time))
		}
	}

	update(deltaTime) {
		this.state.timeLeft -= deltaTime

		if (this.state.timeLeft <= 0) {
			this.state.timeLeft = 0
			this.state.status = GAME_STATUS.LOSE
			return
		}

		this.state.spawnTimer += deltaTime * 1000

		if (this.state.spawnTimer >= GAME_CONFIG.fruit.spawnInterval) {
			this.state.entities.push(createFruit())
			if (this.state.spawnTimer >= GAME_CONFIG.fruit.spawnInterval) {
				const fruit = createFruit()

				console.log('fruit created:', fruit)

				this.state.entities.push(fruit)
				this.state.spawnTimer = 0
			}
			this.state.spawnTimer = 0
		}

		this.state.entities = this.state.entities
			.map(entity => ({
				...entity,
				y: entity.y + entity.speed * deltaTime,
			}))
			.filter(entity => entity.y < GAME_CONFIG.height + entity.size)
	}

	handleStart() {
		this.start()
	}

	handlePointerMove(event) {
		if (this.state.status !== GAME_STATUS.PLAYING) {
			return
		}

		const gameCard = this.rootElement.querySelector('.game-card')
		const rect = gameCard.getBoundingClientRect()

		const clientX = event.touches ? event.touches[0].clientX : event.clientX
		const relativeX = clientX - rect.left

		const scaleX = GAME_CONFIG.width / rect.width
		const gameX = relativeX * scaleX

		this.state.basket.x = clamp(
			gameX - this.state.basket.width / 2,
			0,
			GAME_CONFIG.width - this.state.basket.width,
		)

		this.renderGame()
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

		if (
			this.state.status === GAME_STATUS.WIN ||
			this.state.status === GAME_STATUS.LOSE
		) {
			this.renderEndScreen()
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
						<div class="intro-stat">
							<strong>${GAME_CONFIG.duration}</strong>
							<span>Time</span>
						</div>

						<div class="intro-stat">
							<strong>${GAME_CONFIG.targetScore}</strong>
							<span>Target</span>
						</div>

						<div class="intro-stat">
							<strong>${GAME_CONFIG.initialLives}</strong>
							<span>Lives</span>
						</div>
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

		const entitiesHtml = this.state.entities
			.map(
				entity => `
      <div
        class="entity entity--${entity.type}"
        style="
          width: ${entity.size}px;
          height: ${entity.size}px;
          transform: translate(${entity.x}px, ${entity.y}px);
          font-size: ${entity.size}px;
        "
      >
        ${entity.emoji}
      </div>
    `,
			)
			.join('')

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
						${entitiesHtml}

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
		const gameCard = this.rootElement.querySelector('.game-card')

		gameCard.addEventListener('mousemove', this.handlePointerMove)
		gameCard.addEventListener('touchmove', this.handlePointerMove, {
			passive: true,
		})
	}

	renderEndScreen() {
		const isWin = this.state.status === GAME_STATUS.WIN

		this.rootElement.innerHTML = `
    <main class="ad">
      <section class="game-card">
        <div class="screen screen--end">
          <p class="eyebrow">${isWin ? 'LEVEL COMPLETE' : 'TIME IS UP'}</p>

          <h1 class="title">${isWin ? 'You Win!' : 'Game Over'}</h1>

          <p class="description">
            Your score: <strong>${this.state.score}</strong>
          </p>

          <button class="primary-button" type="button" data-action="restart">
            Play Again
          </button>

          <button class="secondary-button" type="button">
            Play Full Game
          </button>
        </div>
      </section>
    </main>
  `

		const restartButton = this.rootElement.querySelector(
			'[data-action="restart"]',
		)

		restartButton.addEventListener('click', this.handleStart)
	}
}
