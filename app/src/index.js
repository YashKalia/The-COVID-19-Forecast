/* eslint-disable import/first */
require('seedrandom')('hi.', { global: true });

import './scripts/DOM/sideMenu';
import presetManager from './scripts/presetsManager';
import Main from './scripts/main';
import {
  createPresetsDropDown,
  setAttractionToCenter,
  setNumCommunities,
  setRepulsionForce,
} from './scripts/DOM/domValues';

const {
  INITIAL_SUSCEPTIBLE,
  INITIAL_NONINFECTIOUS,
  INITIAL_INFECTIOUS,
  INITIAL_IMMUNE,
  INITIAL_DEAD,
  ATTRACTION_FORCE,
  NUM_COMMUNITIES,
  REPULSION_FORCE,
} = presetManager.loadPreset();

function setPresetData() {
  setAttractionToCenter(ATTRACTION_FORCE);
  setNumCommunities(NUM_COMMUNITIES);
  setRepulsionForce(REPULSION_FORCE);
}

/**
 * A function to initialize our program when the page is loaded.
 */
window.onload = function () {
  // const seedrandom = require('seedrandom')
  // const rand = seedrandom('hello', { global: true });

  createPresetsDropDown();
  setPresetData();
  const glCanvas = document.getElementById('glCanvas');
  const context = glCanvas.getContext('webgl');
  const chartCtx = document.getElementById('chart-canvas').getContext('2d');
  const demographicsCtx = document
    .getElementById('demographics')
    .getContext('2d');
  const borderCtx = document.getElementById('BorderCanvas').getContext('2d');
  const { height } = borderCtx.canvas.getBoundingClientRect();
  borderCtx.transform(1, 0, 0, -1, 0, height);

  if (context === null) {
    this.alert('Please enable webGl support');
    return;
  }
  const main = new Main(
    context,
    chartCtx,
    borderCtx,
    demographicsCtx,
    glCanvas.width,
    glCanvas.height,
    INITIAL_SUSCEPTIBLE,
    INITIAL_NONINFECTIOUS,
    INITIAL_INFECTIOUS,
    INITIAL_DEAD,
    INITIAL_IMMUNE
  );

  main.run();
};
