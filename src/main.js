import './style.css'
import { Game } from './game/game'

const app = document.querySelector('#app')

const game = new Game(app)
game.init()