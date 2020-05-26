export const INITIAL_SUSCEPTIBLE = 1000;
export const INITIAL_NONINFECTIOUS = 0;
export const INITAL_INFECTIOUS = 4;
export const INITIAL_IMMUNE = 0;
export const INITIAL_DEAD = 0;
export const REPULSION_FORCE = 0;
export const ATTRACTION_FORCE = 0;
export const PERSON_RADIUS = 5;
export const POPULATION_SPEED = 4;
export const INFECTION_RADIUS = PERSON_RADIUS + Math.floor(PERSON_RADIUS / 3);
export const MOVEMENT_TIME_SCALAR = 10;
export const TRANSMISSION_PROB = 0.9;
export const NONIN_TO_IMMUNE_PROB = 0.1;
export const TIME_UNTIL_IMMUNE = 7;

export const MIN_INCUBATION_TIME = 7;
export const MAX_INCUBATION_TIME = 14;

export const MIN_INFECTIOUS_TIME = 5;
export const MAX_INFECTIOUS_TIME = 10;

export const MIN_TIME_UNTIL_DEAD = 15;
export const MAX_TIME_UNTIL_DEAD = 30;

export const DAYS_PER_SECOND = 1;

export const COLORS = {
  SUSCEPTIBLE: '#05befc',
  NONINFECTIOUS: '#c9e265',
  INFECTIOUS: '#fd7e65',
  DEAD: 'black',
  IMMUNE: '#a6a6a6',
};

export const TYPES = {
  SUSCEPTIBLE: 's',
  NONINFECTIOUS: 'a',
  INFECTIOUS: 'i',
  DEAD: 'd',
  IMMUNE: 'im',
};

export const SPACE_BETWEEN_COMMUNITIES = 20;

// Relocation
export const RELOCATION_PROBABILITY = 0.00002;
export const RELOCATION_ERROR_MARGIN = 20;
export const RELOCATION_STEP_SIZE = 8;
