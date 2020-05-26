import {
  PERSON_RADIUS,
  COLORS,
  POPULATION_SPEED,
  TYPES,
  INFECTION_RADIUS,
  RELOCATION_STEP_SIZE,
  REPULSION_FORCE,
} from './CONSTANTS';

export default class Person {
  constructor(type, x, y, modelId) {
    this.modelId = modelId;
    this.type = type;
    this.radius = PERSON_RADIUS;
    this.infectionRadius = INFECTION_RADIUS;
    this.x = x;
    this.y = y;
    this.maxSpeed = POPULATION_SPEED;
    this.repulsionForce = REPULSION_FORCE;
    this.speedX = 3 * (Math.floor(Math.random() * 2) || -1);
    this.speedY = 3 * (Math.floor(Math.random() * 2) || -1);
    this.accX = 0;
    this.accY = 0;
    this.asymptomaticTime = 0;
    this.symptomaticTime = 0;
    this.incubationTime = 0;
    this.infectiousTime = 0;
    this.destinyDead = false;
    this.destinyImmune = false;
    this.incubationPeriod = 0;
    this.infectiousPeriod = 0;
    this.age = Math.round(Math.random() * 100);

    this.relocating = false;

    this.step = RELOCATION_STEP_SIZE;

    if (type === TYPES.SUSCEPTIBLE) this.color = COLORS.SUSCEPTIBLE;
    else if (type === TYPES.INFECTIOUS) this.color = COLORS.INFECTIOUS;
    else if (type === TYPES.NONINFECTIOUS) this.color = COLORS.NONINFECTIOUS;
    else if (type === TYPES.DEAD) this.color = COLORS.DEAD;
    else if (type === TYPES.IMMUNE) this.color = COLORS.IMMUNE;
  }

  isDead() {
    return this.type === TYPES.DEAD;
  }

  applyForce(forceX, forceY) {
    this.accX += forceX; // Plus symbol because we're adding forces together
    this.accY += forceY;
  }

  _handleXOutOfBounds(startX, endX) {
    if (this.x > endX - 2 * this.radius || this.x < startX + 2 * this.radius) {
      if (this.x > endX - 2 * this.radius) this.x = endX - 2 * this.radius;
      else if (this.x < startX + 2 * this.radius)
        this.x = startX + 2 * this.radius;
      this.speedX *= -1;
    }
  }

  _handleYOutOfBounds(startY, endY) {
    if (this.y > endY - 2 * this.radius || this.y < startY + 2 * this.radius) {
      if (this.y > endY - 2 * this.radius) this.y = endY - 2 * this.radius;
      else if (this.y < startY + 2 * this.radius)
        this.y = startY + 2 * this.radius;
      this.speedY *= -1;
    }
  }

  _checkIfExceededMaxSpeed() {
    if (Math.abs(this.speedX) > this.maxSpeed)
      this.speedX = Math.sign(this.speedX) * this.maxSpeed;

    if (Math.abs(this.speedY) > this.maxSpeed)
      this.speedY = Math.sign(this.speedY) * this.maxSpeed;
  }

  // TODO model should call with start and end
  move(startX, endX, startY, endY, dt) {
    // if (this.type !== TYPES.DEAD) {
    this.applyForce(Math.random() - 0.5, Math.random() - 0.5);

    this.speedX += this.accX * dt;
    this.speedY += this.accY * dt;

    this._checkIfExceededMaxSpeed();

    this.x += this.speedX * dt;
    this.y += this.speedY * dt;

    this._handleXOutOfBounds(startX, endX);
    this._handleYOutOfBounds(startY, endY);

    // Slow the agents down a bit, remove some energy from the system
    this.speedY *= 0.95 ** dt;
    this.speedX *= 0.95 ** dt;

    this.accX *= 0;
    this.accY *= 0;
    // }
  }

  getStep(current, destination) {
    return (destination - current) / this.step;
  }

  relocateMove({ x: destX, y: destY }) {
    this.applyForce(this.getStep(this.x, destX), this.getStep(this.y, destY));
    this.speedX += this.accX;
    this.speedY += this.accY;

    this.x += this.speedX;
    this.y += this.speedY;

    this.accX *= 0;
    this.accY *= 0;

    // Slow the agents down a bit, remove some energy from the system
    this.speedY *= 0.95;
    this.speedX *= 0.95;
  }

  metWith(p) {
    const deltaX = this.x - p.x;
    const deltaY = this.y - p.y;
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return dist < this.infectionRadius + p.infectionRadius; // Collide on infectionraduis
  }

  startIncubation() {
    this.type = TYPES.NONINFECTIOUS;
    this.color = COLORS.NONINFECTIOUS;
  }

  setIncubationPeriod(val) {
    this.incubationPeriod = val;
  }

  setInfectiousPeriod(val) {
    this.infectiousPeriod = val;
  }

  becomesImmune() {
    this.type = TYPES.IMMUNE;
    this.color = COLORS.IMMUNE;
  }

  becomesInfectious() {
    this.type = TYPES.INFECTIOUS;
    this.color = COLORS.INFECTIOUS;
  }

  repel(p) {
    const delta = { x: this.x - p.x, y: this.y - p.y };
    const dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

    if (delta.x !== 0) {
      const unitX = delta.x / dist;
      const vecX = (unitX / dist) * this.repulsionForce * 4;
      this.applyForce(vecX, 0);
    }

    if (delta.y !== 0) {
      const unitY = delta.y / dist;
      const vecY = (unitY / dist) * this.repulsionForce * 4;
      this.applyForce(0, vecY);
    }
  }

  canInfect(p) {
    return this.type === TYPES.INFECTIOUS && p.type === TYPES.SUSCEPTIBLE;
  }

  initializeAge(value) {
    this.age = value;
  }
}
