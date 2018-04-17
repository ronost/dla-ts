export class Particle {
    private coordinates: Object;
    private free: Boolean;

    constructor(coordinates: Object, free: boolean = true) {
      this.coordinates = Object.seal(coordinates);
      this.free = free;
    }

    public getPosition(): any {
      return this.coordinates;
    }

    public bind() {
      this.free = false;
    }

    public isFree() {
      return this.free;
    }

    public move(direction: any, stepSize: number = 1) {
      if (direction.x === 0 && direction.y === 0) {
        throw new Error('No move');
      }

      this.coordinates['x'] += direction.x * stepSize;
      this.coordinates['y'] += direction.y * stepSize;
    }
}
