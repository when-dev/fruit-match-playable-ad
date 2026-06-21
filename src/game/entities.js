import { GAME_CONFIG } from './config.js';
import { randomBetween, randomInt } from '../utils/random.js';

const FRUIT_EMOJIS = ['🍎', '🍌', '🍓', '🍊', '🍇'];

let entityId = 0;

export function createFruit() {
  const size = randomBetween(
    GAME_CONFIG.fruit.minSize,
    GAME_CONFIG.fruit.maxSize,
  );

  return {
    id: entityId++,
    type: 'fruit',
    emoji: FRUIT_EMOJIS[randomInt(0, FRUIT_EMOJIS.length - 1)],
    x: randomBetween(16, GAME_CONFIG.width - size - 16),
    y: -size,
    size,
    speed: randomBetween(
      GAME_CONFIG.fruit.minSpeed,
      GAME_CONFIG.fruit.maxSpeed,
    ),
    points: GAME_CONFIG.fruit.points,
  };
}

export function createBomb() {
  const size = GAME_CONFIG.bomb.size;

  return {
    id: entityId++,
    type: 'bomb',
    emoji: '💣',
    x: randomBetween(16, GAME_CONFIG.width - size - 16),
    y: -size,
    size,
    speed: GAME_CONFIG.bomb.speed,
    damage: GAME_CONFIG.bomb.damage,
  }
}

export function createRandomEntity() {
  const bombChance = 0.25;
  const shouldCreateBomb = Math.random() < bombChance;

  if (shouldCreateBomb) {
    return createBomb()
  }
  return createFruit()
}