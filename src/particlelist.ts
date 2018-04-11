import { Particle } from './particle'
import { PARTICLE_SIZE } from './constants';

export class ParticleList {
    private particleList: Array<Particle> = [];

    constructor(staticParticle: Particle, canvasWidth: number, canvasHeight: number, nrOfRandomParticles: number = 0) {
        this.add(staticParticle);

        for (let i = 0; i < nrOfRandomParticles; i++) {
            let x: number = this.randomPosition(0, canvasWidth);
            let y: number = this.randomPosition(0, canvasHeight);
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
        // TODO: Write tests for this, it's supposed to give random position with regards to size of particle.
        function rnd() {
            let rndValue = Math.floor(Math.random() * (max - min + 1)) + min;
            if(rndValue % PARTICLE_SIZE === 0) {
                return rndValue;
            }
            return rnd();
        }
        return rnd();
    }
}
