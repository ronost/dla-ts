import { Particle } from './particle';
import { ParticleList } from './particlelist';
import { Direction } from './direction';

export class ParticleEngine {
    private particleList: ParticleList;
    private context: CanvasRenderingContext2D;
    private particleSize: number;
  
    constructor(particleList: ParticleList, particleSize: number, context: CanvasRenderingContext2D) {
        this.particleList = particleList;
        this.particleSize = particleSize;
        this.context = context;
    }

    public run() {
        for (let particle of this.particleList.get()) {
          this.context.fillStyle = '000000';
          this.context.fillRect(particle.getPosition().x, particle.getPosition().y, this.particleSize, this.particleSize);

            if (particle.isFree()) {
                // Randown walk
                particle.move(Direction.random(), this.particleSize);
                for (let staticParticle of this.particleList.get().filter(p => !p.isFree())) {
                    // Pythagorean metric to determine distance. 
                    // Use multiplier to allow for diagonal relationsships.
                    let multiplier = 1.5;
                    let dx = Math.abs(particle.getPosition().x - staticParticle.getPosition().x);
                    let dy = Math.abs(particle.getPosition().y - staticParticle.getPosition().y);
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance <= this.particleSize * multiplier) {
                        particle.bind();
                    }
                }
            }
        }
    }
}
