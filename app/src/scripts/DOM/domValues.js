import { PRESET_TYPES } from '../CONSTANTS';

/**
 * A function returning the initial amount of susceptible people as set in the UI.
 *
 * @returns {number} The initial amount of susceptible people as set with the slider.
 */
export function getInitialNumSusceptible() {
  return parseInt(document.getElementById('initSusceptibleCount').value, 10);
}

/**
 * A function setting the initial amount of susceptible people.
 */
export function setInitialNumSusceptible(newValue) {
  document.getElementById('initSusceptibleCount').value = newValue;
  document.getElementById('initSusceptible').value = newValue;
}

/**
 * A function returning the initial amount of infectious people as set in the UI.
 *
 * @returns {number} The initial amount of infectious people as set with the slider.
 */
export function getInitialNumInfectious() {
  return parseInt(document.getElementById('initInfectiousCount').value, 10);
}

/**
 * A function setting the initial amount of infectious people.
 */
export function setInitialNumInfectious(newValue) {
  document.getElementById('initInfectiousCount').value = newValue;
  document.getElementById('initInfectious').value = newValue;
}

/**
 * A function to get the number of communities selected by the user
 * @returns {Number} number of communities
 */
export function getNumCommunities() {
  return parseInt(document.getElementById('numCommunities').value, 10);
}

/**
 * A function setting the initial amount of infectious people.
 */
export function setNumCommunities(newValue) {
  document.getElementById('numCommunities').value = newValue;
  document.getElementById('numCommunitiesOut').value = newValue;
}

/**
 * A function updating the displayed values on the page to the corresponding values.
 *
 * @param {number} numSusceptible The amount of susceptible people.
 * @param {number} numNonInfectious The amount of non-infectious people.
 * @param {number} numInfectious The amount of infectious people.
 * @param {number} numImmune The amount of immune people.
 * @param {number} numDead The amount of dead people.
 */
export function updateTheStatistics(
  numSusceptible,
  numNonInfectious,
  numInfectious,
  numImmune,
  numDead
) {
  document.getElementById('s1').innerHTML = `${numSusceptible}`;
  document.getElementById('s2').innerHTML = `${numNonInfectious}`;
  document.getElementById('s3').innerHTML = `${numInfectious}`;
  document.getElementById('s4').innerHTML = `${numImmune}`;
  document.getElementById('s5').innerHTML = `${numDead}`;
}

export function getRepulsionForce() {
  return document.getElementById('repulsionForceSlider').noUiSlider.get();
}

export function setRepulsionForce(newValue) {
  document
    .getElementById('repulsionForceSlider')
    .noUiSlider.set([newValue * 10]);
}

export function getAttractionToCenter() {
  return document.getElementById('attractionForceSlider').noUiSlider.get();
}
export function setAttractionToCenter(newValue) {
  document
    .getElementById('attractionForceSlider')
    .noUiSlider.set([newValue * 10]);
}

// updateTransmissionProb
export function getTransmissionProbability() {
  return parseFloat(document.getElementById('transmissionProb').value, 10);
}

// TODO
export function setTransmissionProbability(newValue) {
  document.getElementById('transmissionProb').value = newValue;
  document.getElementById('transmissionProbOut').value = newValue;
}

// updateNonInToImmuneProb
export function getNonInToImmuneProb() {
  return parseFloat(document.getElementById('nonInToImmuneProb').value, 10);
}

// TODO
export function setNonInToImmuneProb(newValue) {
  document.getElementById('nonInToImmuneProb').value = newValue;
  document.getElementById('transmissionProbOut').value = newValue;
}

// updateInfectionRadius
export function getInfectionRadius() {
  return parseFloat(document.getElementById('infectionCircleRadius').value, 10);
}

// TODO
export function setInfectionRadius(newValue) {
  document.getElementById('infectionCircleRadius').value = newValue;
  document.getElementById('infectionRadiusOut').value = newValue;
}

// Dual sliders

export function getIncubationTimeMinAndMax() {
  const slider = document.getElementById('incubationTimeSlider').noUiSlider;
  return [...slider.get()];
}

export function setIncubationTime(min, max) {
  document.getElementById('incubationTimeSlider').noUiSlider.set([min, max]);
}

export function getInfectiousTimeMinAndMax() {
  const slider = document.getElementById('infectiousTimeSlider').noUiSlider;
  return [...slider.get()];
}

export function setInfectiousTime(min, max) {
  document.getElementById('infectiousTimeSlider').noUiSlider.set([min, max]);
}

export function getTimeUntilDeadMinAndMax(min, max) {
  const slider = document.getElementById('timeUntilDeadSlider').noUiSlider;
  return [...slider.get()];
}

export function setTimeUntilDead(min, max) {
  document.getElementById('timeUntilDeadSlider').noUiSlider.set([min, max]);
}
