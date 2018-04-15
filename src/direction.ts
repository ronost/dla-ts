import { PARTICLE_SIZE } from './constants';

const DIRECTION: any = {
  UP: Object.freeze({'x': 0, 'y': PARTICLE_SIZE}),
  UP_RIGHT: Object.freeze({'x': PARTICLE_SIZE, 'y': PARTICLE_SIZE}),
  RIGHT: Object.freeze({'x': PARTICLE_SIZE, 'y': 0}),
  DOWN_RIGHT: Object.freeze({'x': PARTICLE_SIZE, 'y': -PARTICLE_SIZE}),
  DOWN: Object.freeze({'x': 0, 'y': -PARTICLE_SIZE}),
  DOWN_LEFT: Object.freeze({'x': -PARTICLE_SIZE, 'y': -PARTICLE_SIZE}),
  LEFT: Object.freeze({'x': -PARTICLE_SIZE, 'y': 0}),
  UP_LEFT: Object.freeze({'x': -PARTICLE_SIZE, 'y': PARTICLE_SIZE})
};

export class Direction {
  public static random() {
    let rnd_idx = Math.floor(Math.random() * Object.keys(DIRECTION).length);
    return DIRECTION[Object.keys(DIRECTION)[rnd_idx]];
  }

  public static get(key) {
    return DIRECTION[key];
  }
}
