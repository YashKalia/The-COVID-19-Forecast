import presetManager from './scripts/presetsManager';
import Main from './scripts/main';
import { createPresetsDropDown } from './scripts/DOM/parameters';

const {
  INITIAL_SUSCEPTIBLE,
  INITIAL_NONINFECTIOUS,
  INITIAL_INFECTIOUS,
  INITIAL_IMMUNE,
  INITIAL_DEAD,
} = presetManager.loadPreset();

/**
 * A function to initialize our program when the page is loaded.
 */
window.onload = function () {
  createPresetsDropDown();
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
