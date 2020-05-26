import { getRandomIntExceptForValue } from './util';
import { TYPES } from './CONSTANTS';
import RelocationInfo from './data/relocationInfo';
import Stats from './data/stats';

export default class RelocationUtil {
  constructor(community) {
    this.community = community;
    this.relocations = [];

    // DEBUG
    window.relocationUtil = this;
  }

  handleAllRelocations() {
    for (let i = 0; i < this.relocations.length; i++) {
      const relocation = this.relocations[i];
      relocation.takeStep();
      if (relocation.hasArrived()) {
        this.community.pauseExecution();

        relocation.person.relocating = false;
        this.community.communities[relocation.destId].handlePersonJoining(
          relocation.person
        );
        this._removeRelocationInfo(relocation);

        this.community.resumeExecution();
      }
    }
  }

  insertRelocation(person) {
    console.log('He watned to relocate');
    // Pause
    this.community.pauseExecution();
    // Move person
    const sourceId = person.modelId;
    // Get models which very high density and exclude them from models being relocated to
    const maxTotalPopulation = Math.round(
      (this.community.stats.sum() / this.community.numModels) * 1.5
    );
    const exclude = []; 
    // Object.values(this.community.communities)
    //   .filter((mod) => mod.totalPopulation > maxTotalPopulation)
    //   .map((mod) => mod.id)
    //   .concat([sourceId]);
    // // Destination Id
    const destId = getRandomIntExceptForValue(
      0,
      this.community.numModels - 1,
      exclude
    );
    this.community.communities[sourceId].handlePersonLeaving(person);
    // Change modelId of person
    person.modelId = destId;
    const distCoords = this.community.communities[destId].getRandomPoint();

    // Do it via this
    this.relocations.push(new RelocationInfo(person, distCoords, destId));
    // Resume
    this.community.resumeExecution();
  }

  _removeRelocationInfo(relocationInfo) {
    const lengthBefore = this.relocations.length;
    this.relocations = this.relocations.filter((rel) => rel !== relocationInfo);
    if (lengthBefore !== this.relocations.length + 1) {
      throw Error(
        'Tried to remove a relocation info but nothing was removed???'
      );
    }
  }

  getStats() {
    const stats = new Stats(0, 0, 0, 0, 0);
    this.relocations.forEach(({ person }) => {
      switch (person.type) {
        case TYPES.SUSCEPTIBLE:
          stats.susceptible++;
          break;
        case TYPES.NONINFECTIOUS:
          stats.noninfectious++;
          break;
        case TYPES.INFECTIOUS:
          stats.infectious++;
          break;
        case TYPES.IMMUNE:
          stats.immune++;
          break;
        case TYPES.DEAD:
          stats.dead++;
          break;
        default:
          throw Error('Unknown type');
      }
    });
    return stats;
  }
}
