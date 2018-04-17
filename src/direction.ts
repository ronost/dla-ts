const DIRECTION: any = {
  UP: Object.freeze({'x': 0, 'y': 1}),
  UP_RIGHT: Object.freeze({'x': 1, 'y': 1}),
  RIGHT: Object.freeze({'x': 1, 'y': 0}),
  DOWN_RIGHT: Object.freeze({'x': 1, 'y': -1}),
  DOWN: Object.freeze({'x': 0, 'y': -1}),
  DOWN_LEFT: Object.freeze({'x': -1, 'y': -1}),
  LEFT: Object.freeze({'x': -1, 'y': 0}),
  UP_LEFT: Object.freeze({'x': -1, 'y': 1})
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
