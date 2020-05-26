import wireSlidersToHandlers from './DOM/parameters';
import Model from './model';
import Stats from './data/stats';
import Bounds from './data/bounds';
import { SPACE_BETWEEN_COMMUNITIES, TYPES } from './CONSTANTS';
import RelocationUtil from './relocationUtil';

export default class Community {
  constructor(numModels, agentView, width, height, stats, updateStats) {
    this.numModels = numModels;
    this.communities = {};
    this.height = height;
    this.width = width;
    this.stats = stats;
    this.agentView = agentView;
    this.updateStats = updateStats;

    this._chartInterval = null;

    this.lastTimestamp = 0;

    this._passDrawInfoAnimationFrame = null;
    this.relocationUtil = new RelocationUtil(this);

    this._setValuesFromStatsToLocal(stats);

    // DEBUG
    window.community = this;
  }

  _createDividedStats() {
    return new Stats(
      Math.round(this.numSusceptible / this.numModels),
      Math.round(this.numNonInfectious / this.numModels),
      Math.round(this.numInfectious / this.numModels),
      Math.round(this.numDead / this.numModels),
      Math.round(this.numImmune / this.numModels)
    );
  }

  _setValuesFromStatsToLocal(stats) {
    this.numSusceptible = stats.susceptible;
    this.numInfectious = stats.infectious;
    this.numNonInfectious = stats.noninfectious;
    this.numImmune = stats.immune;
    this.numDead = stats.dead;
  }

  registerRelocation(person) {
    this.relocationUtil.insertRelocation(person);
  }

  pauseExecution() {
    // Cancel animation frame
    cancelAnimationFrame(this._passDrawInfoAnimationFrame);
    this._passDrawInfoAnimationFrame = null;
    // clearInterval(this._chartInterval);
    // this._chartInterval = null;
    // Cancel all model intervals/animationFrames
    Object.values(this.communities).forEach((com) => com.pauseExecution());
  }

  resumeExecution() {
    // Resume animationFrame
    this._animationFunction();
    // if(this._chartInterval === null) {
    //   this._chartInterval = setInterval(this.compileStats.bind(this), 500);
    // }
    // Resume models intervals/animationFrames
    Object.values(this.communities).forEach((com) => com.resumeExecution());
  }

  populateCommunities() {
    for (let i = 0; i < this.numModels; i++) {
      this.communities[i].populateCanvas();
    }
  }

  run() {
    wireSlidersToHandlers(this);
    this.populateCommunities();

    this._animationFunction();
    this._chartInterval = setInterval(this.compileStats.bind(this), 500);
  }

  _animationFunction(timestamp) {
    let dt = 0;
    if (this.lastTimestamp && timestamp) {
      dt = timestamp - this.lastTimestamp;
    } // The time passed since running the last step.
    this.lastTimestamp = timestamp;

    this.passDrawInfoToAgentChart();
    Object.values(this.communities).forEach((mod) => mod.step(dt));
    // Check all relocations
    this.relocationUtil.handleAllRelocations();
  }

  passDrawInfoToAgentChart() {
    this._passDrawInfoAnimationFrame = requestAnimationFrame(
      this._animationFunction.bind(this)
    );

    const allData = Object.values(this.communities)
      .map((com) => com.getDrawInfo())
      .reduce((acc, cur) => ({
        positions: acc.positions.concat(cur.positions),
        colors: acc.colors.concat(cur.colors),
        size: this.communities[0].personRadius,
        count: acc.count + cur.count,
      }));

    // TODO remove this and refactor person to get his own drawInfo
    this.relocationUtil.relocations
      .filter((re) => !re.person.isDead())
      .forEach(({ person }) => {
        allData.positions.push(person.x);
        allData.positions.push(person.y);
        allData.colors.push(parseInt(person.color.slice(1, 3), 16) / 255.0);
        allData.colors.push(parseInt(person.color.slice(3, 5), 16) / 255.0);
        allData.colors.push(parseInt(person.color.slice(5, 7), 16) / 255.0);
        allData.colors.push(1);
        allData.count++;
      });
    this.agentView.draw(allData);
  }

  _createIncrementals() {
    // return [new Bounds(0, 100, 0, 100), new Bounds(120, 220, 0, 100)];
    const listOfBounds = [];
    // Space between each of the models + 2 on the sides
    let widthFactor = 1;
    let heightFactor = 1;
    if (this.numModels <= 6) {
      widthFactor = 2;
      heightFactor = Math.ceil(this.numModels / widthFactor);
    } else if (this.numModels <= 12) {
      widthFactor = 3;
      heightFactor = Math.ceil(this.numModels / widthFactor);
    }

    const oneModelWidth = Math.round(
      (this.width - (widthFactor + 1) * SPACE_BETWEEN_COMMUNITIES) / widthFactor
    );

    const oneModelHeight = Math.round(
      (this.height - (heightFactor + 1) * SPACE_BETWEEN_COMMUNITIES) /
        heightFactor
    );
    let currentX = 0;
    let currentY = 0;
    let nextY = 0;

    for (let i = 0; i < this.numModels; i++) {
      if (
        (this.numModels <= 6 && i % 2 === 0) ||
        (this.numModels <= 12 && this.numModels >= 7 && i % 3 === 0)
      ) {
        currentX = SPACE_BETWEEN_COMMUNITIES;
        currentY = nextY + SPACE_BETWEEN_COMMUNITIES;
        nextY = currentY + oneModelHeight;
      }
      listOfBounds.push(
        new Bounds(currentX, currentX + oneModelWidth, currentY, nextY)
      );
      currentX += oneModelWidth;
      currentX += SPACE_BETWEEN_COMMUNITIES;
    }

    return listOfBounds;
  }

  setupCommunity() {
    const dividedStats = this._createDividedStats();
    const bounds = this._createIncrementals();

    for (let i = 0; i < this.numModels; i++) {
      this.communities[i] = new Model(
        i,
        bounds[i],
        dividedStats,
        this.registerRelocation.bind(this)
      );

      // DEBUG
      window.model = this.communities[i];
    }
  }

  compileStats() {
    const stats = Object.values(this.communities)
      .map((m) => m.exportStats())
      .reduce(
        (acc, cur) =>
          new Stats(
            acc.susceptible + cur.susceptible,
            acc.noninfectious + cur.noninfectious,
            acc.infectious + cur.infectious,
            acc.dead + cur.dead,
            acc.immune + cur.immune
          )
      );

    const relocationStats = this.relocationUtil.getStats();
    const finalStats = Stats.joinStats(stats, relocationStats);

    this._setValuesFromStatsToLocal(finalStats);
    this.updateStats(finalStats);
  }

  resetCommunity(stats) {
    this._setValuesFromStatsToLocal(stats);

    const dividedStats = this._createDividedStats();
    Object.values(this.communities).forEach((m) => m.resetModel(dividedStats));
  }

  // SLIDER HANDLER METHODS

  updateAgentSize(newValue) {
    Object.values(this.communities).forEach((model) =>
      model.setPersonRadius(newValue)
    );
  }

  updateInfectionRadius(newValue) {
    Object.values(this.communities).forEach((model) =>
      model.setInfectionRadius(newValue)
    );
  }

  updateMinTimeUntilDead(newValue) {
    Object.values(this.communities).forEach((model) =>
      model.setMinTimeUntilDead(newValue)
    );
  }

  updateMaxTimeUntilDead(newValue) {
    Object.values(this.communities).forEach((model) =>
      model.setMaxTimeUntilDead(newValue)
    );
  }

  updateMinInfectiousTime(newValue) {
    Object.values(this.communities).forEach((model) =>
      model.setMinInfectiousTime(newValue)
    );
  }

  updateMaxInfectiousTime(newValue) {
    Object.values(this.communities).forEach((model) =>
      model.setMaxInfectiousTime(newValue)
    );
  }

  updateMinIncubationTime(newValue) {
    Object.values(this.communities).forEach((model) =>
      model.setMinIncubationTime(newValue)
    );
  }

  updateMaxIncubationTime(newValue) {
    Object.values(this.communities).forEach((model) =>
      model.setMaxIncubationTime(newValue)
    );
  }

  updateTransmissionProb(newValue) {
    Object.values(this.communities).forEach((model) =>
      model.setTransmissionProb(newValue)
    );
  }

  updateNonInToImmuneProb(newValue) {
    Object.values(this.communities).forEach((model) =>
      model.setNonInToImmuneProb(newValue)
    );
  }

  updateRepulsionForce(newValue) {
    Object.values(this.communities).forEach((model) =>
      model.setRepulsionForce(newValue)
    );
  }

  updateAttractionToCenter(newValue) {
    Object.values(this.communities).forEach((model) =>
      model.setAttractionToCenter(newValue)
    );
  }
}
