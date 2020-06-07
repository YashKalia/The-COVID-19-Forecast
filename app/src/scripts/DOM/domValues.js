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

export function getAttractionToCenter() {
  return parseFloat(document.getElementById('attractionForce').value, 10);
}

// TODO
export function setAttractionToCenter(newValue) {
  document.getElementById('attractionForce').value = newValue;
  document.getElementById('attractionForceOut').value = newValue;
}

export function getRepulsionForce() {
  return parseFloat(document.getElementById('repulsionForce').value, 10);
}

// TODO
export function setRepulsionForce(newValue) {
  document.getElementById('repulsionForce').value = newValue;
  document.getElementById('repulsionForceOut').value = newValue;
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

// updateMinIncubationTime
export function getMinIncubationTime() {
  return parseFloat(
    document.getElementById('incubationTimeSliderMinOut').value,
    10
  );
}

// TODO
export function setMinIncubationTime(newValue) {
  // document.getElementById('minIncubationTime').value = newValue;
  document.getElementById('incubationTimeSliderMinOut').value = newValue;
}

// updateMaxIncubationTime
export function getMaxIncubationTime() {
  return parseFloat(
    document.getElementById('incubationTimeSliderMaxOut').value,
    10
  );
}

// TODO
export function setMaxIncubationTime(newValue) {
  // document.getElementById('maxIncubationTime').value = newValue;
  document.getElementById('incubationTimeSliderMaxOut').value = newValue;
}

// updateMinInfectiousTime
export function getMinInfectiousTime() {
  return parseFloat(
    document.getElementById('infectiousTimeSliderMinOut').value,
    10
  );
}

// TODO
export function setMinInfectiousTime(newValue) {
  // document.getElementById('minInfectiousTime').value = newValue;
  document.getElementById('minInfectiousTimeOut').value = newValue;
}

// updateMaxInfectiousTime
export function getMaxInfectiousTime() {
  return parseFloat(
    document.getElementById('infectiousTimeSliderMaxOut').value,
    10
  );
}

// TODO
export function setMaxInfectiousTime(newValue) {
  // document.getElementById('maxInfectiousTime').value = newValue;
  document.getElementById('infectiousTimeSliderMaxOut').value = newValue;
}

// updateMinTimeUntilDead
export function getMinTimeUntilDead() {
  return parseFloat(
    document.getElementById('timeUntilDeadSliderMinOut').value,
    10
  );
}

// TODO
export function setMinTimeUntilDead(newValue) {
  // document.getElementById('minTimeUntilDead').value = newValue;
  document.getElementById('timeUntilDeadSliderMinOut').value = newValue;
}

// updateMaxTimeUntilDead
export function getMaxTimeUntilDead() {
  return parseFloat(
    document.getElementById('timeUntilDeadSliderMaxOut').value,
    10
  );
}

// TODO
export function setMaxTimeUntilDead(newValue) {
  document.getElementById('maxTimeUntilDead').value = newValue;
  document.getElementById('maxTimeUntilDeadOut').value = newValue;
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

export function createPresetsDropDown() {
  const options = `
  <option value="0">Select preset:</option>
  ${Object.keys(PRESET_TYPES).map(
    (key) => `<option value="${key}">${PRESET_TYPES[key]}</option>`
  )}
  `;

  document.getElementById('preset-list').innerHTML = options;
}
