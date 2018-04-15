import { Particle } from './particle'
import { PARTICLE_SIZE } from './constants';

export class ParticleList {
    private particleList: Array<Particle> = [];

    constructor(canvasSide: number, nrOfRandomParticles: number = 0) {
        if(!this.isMultipleOf(PARTICLE_SIZE, canvasSide)) {
            throw new Error('Canvas side is not multiple of Particle size');
        }

        // Add static somewhere near middle but still on a multiple of PARTICLE_SIZE
        let almostMiddle = Math.ceil((canvasSide / PARTICLE_SIZE) / 2) * PARTICLE_SIZE;
        this.add(new Particle({x: almostMiddle, y: almostMiddle}, false));

        for (let i = 0; i < nrOfRandomParticles; i++) {
            let x: number = this.randomPosition(0, canvasSide);
            let y: number = this.randomPosition(0, canvasSide);
            this.add(new Particle({x: x, y: y}));
        }
    }

    public add(particle: Particle) {
        this.particleList.push(particle);
    }

    public get() {
        return this.particleList;
    }

    private randomPosition (min: number, max: number) {
        // Randomizes with a spread of PARTICLE_SIZE.
        return Math.floor(Math.random() * ((max / PARTICLE_SIZE) - min + 1)) * PARTICLE_SIZE;
    }

    private isMultipleOf(particleSize: number, sideLength: number) {
        return sideLength % particleSize === 0;
    }
}
