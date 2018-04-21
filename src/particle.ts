export class Particle {
    private coordinates: Object;
    private free: Boolean;
    private _boundIndex: number;

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

    public get boundIndex() {
      return this._boundIndex;
    }

    public set boundIndex(val: number) {
      this._boundIndex = val;
    }

    public move(direction: any, stepSize: number = 1, limitX: number, limitY: number) {
      if (direction.x === 0 && direction.y === 0) {
        throw new Error('No move: No direction');
      }

      let futureX = this.coordinates['x'] + direction.x * stepSize;
      let futureY = this.coordinates['y'] + direction.y * stepSize;

      if((futureX >= limitX || futureX < 0) || (futureY >= limitY || futureY < 0)) {
        throw new Error('No move: Limit violation');
      }

      this.coordinates['x'] = futureX;
      this.coordinates['y'] = futureY;
    }
}
