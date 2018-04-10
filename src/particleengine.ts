import { Particle } from './particle';
import { PARTICLE_SIZE } from './constants';
import { Direction } from './direction';

export class ParticleEngine {
    private particleList: Array<Particle> = [];
    private context: CanvasRenderingContext2D;
  
    constructor(particleList: Array<Particle>, context: CanvasRenderingContext2D) {
        this.particleList = particleList;
        this.context = context;
    }

    public run() {
        for (let particle of this.particleList) {
          this.context.fillStyle = '000000';
          this.context.fillRect(particle.getPosition().x, particle.getPosition().y, PARTICLE_SIZE, PARTICLE_SIZE);

            if (particle.isFree()) {
                // Randown walk
                particle.move(Direction.random());
                for (let staticParticle of this.particleList.filter(p => !p.isFree())) {
                    // Pythagorean metric to determine distance. 
                    // Use multiplier to allow for diagonal relationsships.
                    let multiplier = 1.5;
                    let dx = Math.abs(particle.getPosition().x - staticParticle.getPosition().x);
                    let dy = Math.abs(particle.getPosition().y - staticParticle.getPosition().y);
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance <= PARTICLE_SIZE * multiplier) {
                        particle.bind();
                    }
                }
            }
        }
    }
}