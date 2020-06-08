/* eslint-disable no-shadow */
import wNumb from 'wnumb';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css'; // Import styles
import presetsManager from '../presetsManager';
import {
  setInitialNumInfectious,
  setInitialNumSusceptible,
  setNumCommunities,
  setAttractionToCenter,
  setRepulsionForce,
  setTransmissionProbability,
  setNonInToImmuneProb,
  setIncubationTime,
  setInfectiousTime,
  setTimeUntilDead,
  setInfectionRadius,
} from './domValues';
import { PRESET_TYPES } from '../CONSTANTS';

const {
  TRANSMISSION_PROB,
  NONIN_TO_IMMUNE_PROB,
  MIN_INCUBATION_TIME,
  MAX_INCUBATION_TIME,
  INFECTION_RADIUS,
  INITIAL_INFECTIOUS,
  INITIAL_SUSCEPTIBLE,
  MIN_INFECTIOUS_TIME,
  MAX_INFECTIOUS_TIME,
  MIN_TIME_UNTIL_DEAD,
  MAX_TIME_UNTIL_DEAD,
  REPULSION_FORCE,
  ATTRACTION_FORCE,
  NUM_COMMUNITIES,
} = presetsManager.loadPreset();

export function createSingleSlider(id, start, min, max, setter) {
  console.log(id);
  const sliderElem = document.getElementById(id);
  console.log(sliderElem);
  const slider = noUiSlider.create(sliderElem, {
    range: {
      min: min,
      max: max,
    },
    format: wNumb({
      decimals: '0',
    }),
    tooltips: [true],
    connect: true,
    start: [start],
  });

  slider.on('change', (values) => {
    console.log(values);
    const val = parseInt(values[0], 10);
    setter(val);
  });

  return slider;
}

export function createDualSliders(id, min, max, minSetter, maxSetter) {
  const sliderElem = document.getElementById(id);
  const slider = noUiSlider.create(sliderElem, {
    range: {
      min: min,
      max: max,
    },
    format: wNumb({
      decimals: '0',
    }),
    tooltips: [true, true],
    connect: true,
    start: [min, max],
  });

  slider.on('change', (values) => {
    const minVal = parseInt(values[0], 10);
    const maxVal = parseInt(values[1], 10);
    minSetter(minVal);
    maxSetter(maxVal);
  });

  return slider;
}

// The outValOp is for percentages, we can pass a function that will multiply a fraction by 100 for displaying to user
// Otherwise the default is just a function that returns the variable itself
/**
 * A function linking the output numbers to the sliders and their relevant values inside the model.
 *
 * @param {string} inputId The name given to the slider in the HTML.
 * @param {string} outputId The name given to the output value in the HTML.
 * @param {number} initial The default value of the output.
 * @param {string} suffix A string representing the unit of the value.
 * @param {function} setter A setter function inside the model which should be passed the value of the slider.
 * @param {function} outValOp A function applied between the slider and output value if these don't correspond.
 */
function wireInput(
  inputId,
  outputId,
  initial,
  suffix,
  setter,
  outValOp = (x) => x
) {
  // TimeToSymptoms
  const inputHtml = document.getElementById(inputId);
  const outputHtml = document.getElementById(outputId);
  inputHtml.value = initial;
  outputHtml.value = `${outValOp(initial)} ${suffix}`;
  inputHtml.addEventListener('change', (e) => {
    const newVal = parseFloat(e.target.value);
    setter(newVal);
    outputHtml.value = `${outValOp(newVal)} ${suffix}`;
  });
}

/**
 * A function binding the sliders to a specific model.
 *
 * @param {Model} model The model to bind the sliders to.
 */
export default function (model) {
  // TimeoSymptoms
  createSingleSlider(
    'transmissionProbabilitySlider',
    TRANSMISSION_PROB,
    0,
    10,
    (val) => model.updateTransmissionProb(val / 10)
  );

  wireInput(
    'nonInToImmuneProb',
    'nonInToImmuneProbOut',
    NONIN_TO_IMMUNE_PROB,
    '%',
    model.updateNonInToImmuneProb.bind(model),
    (x) => x * 100
  );

  // incubation time
  createDualSliders(
    'incubationTimeSlider',
    MIN_INCUBATION_TIME,
    MAX_INCUBATION_TIME,
    model.updateMinIncubationTime.bind(model),
    model.updateMaxIncubationTime.bind(model)
  );

  // infectious time
  createDualSliders(
    'infectiousTimeSlider',
    MIN_INFECTIOUS_TIME,
    MAX_INFECTIOUS_TIME,
    model.updateMinInfectiousTime.bind(model),
    model.updateMaxInfectiousTime.bind(model)
  );

  // Time until dead
  createDualSliders(
    'timeUntilDeadSlider',
    MIN_TIME_UNTIL_DEAD,
    MAX_TIME_UNTIL_DEAD,
    model.updateMinTimeUntilDead.bind(model),
    model.updateMaxTimeUntilDead.bind(model)
  );

  // Infection radius
  wireInput(
    'infectionCircleRadius',
    'infectionRadiusOut',
    INFECTION_RADIUS,
    'people',
    model.updateInfectionRadius.bind(model)
  );

  createSingleSlider('repulsionForceSlider', REPULSION_FORCE, 0, 10, (val) =>
    model.updateRepulsionForce(val / 10)
  );

  createSingleSlider('attractionForceSlider', ATTRACTION_FORCE, 0, 10, (val) =>
    model.updateAttractionToCenter(val / 10)
  );

  // initial number of susceptibles

  wireInput(
    'initSusceptible',
    'initSusceptibleCount',
    INITIAL_SUSCEPTIBLE,
    '',
    (x) => x // Don't need a setter
  );

  // initial number of infected
  wireInput(
    'initInfectious',
    'initInfectiousCount',
    INITIAL_INFECTIOUS,
    '',
    (x) => x // Don't need a setter
  );

  wireInput(
    'numCommunities',
    'numCommunitiesOut',
    NUM_COMMUNITIES,
    '',
    (x) => x
  );
}

/**
 * A function binding the reload button to our main class.
 *
 * @param {Main} main The instance of the main class to bind our reload button to.
 */
export function wireReloadButtonToMain(main) {
  // Reset button
  document
    .getElementById('reload')
    .addEventListener('click', () => main.reset());
}

export function wireReloadPresetToMain(main) {
  document.getElementById('select').addEventListener('click', function () {
    const val = document.getElementById('preset-list').value;
    if (val === '0') return;
    presetsManager.changePreset(val);

    const {
      INITIAL_INFECTIOUS,
      INITIAL_SUSCEPTIBLE,
      NUM_COMMUNITIES,
      ATTRACTION_FORCE,
      REPULSION_FORCE,
      TRANSMISSION_PROB,
      NONIN_TO_IMMUNE_PROB,
      MIN_INCUBATION_TIME,
      MAX_INCUBATION_TIME,
      MIN_INFECTIOUS_TIME,
      MAX_INFECTIOUS_TIME,
      MIN_TIME_UNTIL_DEAD,
      MAX_TIME_UNTIL_DEAD,
      INFECTION_RADIUS,
    } = presetsManager.loadPreset();

    setInitialNumSusceptible(INITIAL_SUSCEPTIBLE);
    setInitialNumInfectious(INITIAL_INFECTIOUS);
    setNumCommunities(NUM_COMMUNITIES);
    setAttractionToCenter(ATTRACTION_FORCE);
    setRepulsionForce(REPULSION_FORCE);
    setTransmissionProbability(TRANSMISSION_PROB);
    setNonInToImmuneProb(NONIN_TO_IMMUNE_PROB);
    setIncubationTime(MIN_INCUBATION_TIME, MAX_INCUBATION_TIME);
    setInfectiousTime(MIN_INFECTIOUS_TIME, MAX_INFECTIOUS_TIME);
    setTimeUntilDead(MIN_TIME_UNTIL_DEAD, MAX_TIME_UNTIL_DEAD);
    setInfectionRadius(INFECTION_RADIUS);

    main.changePreset();
  });
}

export function createPresetsDropDown() {
  const options = `
  <option value="0">Select preset:</option>
  ${Object.keys(PRESET_TYPES).map(
    (key) => `<option value="${key}">${PRESET_TYPES[key]}</option>`
  )}
  `;

  document.getElementById('preset-list').innerHTML = options;
}
