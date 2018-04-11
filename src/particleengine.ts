import { Particle } from './particle';
import { PARTICLE_SIZE } from './constants';
import { Direction } from './direction';

export class ParticleEngine {
    private particleList: Array<Particle> = [];
    private context: CanvasRenderingContext2D;
  
    constructor(context: CanvasRenderingContext2D) {
        //this.particleList = particleList;
        this.context = context;
    }

    public init(nrOfParticles=100, canvasWidth=100, canvasHeight=100) {
        //Add one static item in the middle
        this.particleList.push(new Particle({x: Math.round(canvasWidth/2),y: Math.round(canvasHeight/2)}, false));
        //Add the rest
        for (let i = 0; i < nrOfParticles - 1; i++) {
            let x: number = this.randomInt(0, canvasWidth);
            let y: number = this.randomInt(0, canvasHeight);
            this.particleList.push(new Particle({x: x, y: y}));
        }
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

    private randomInt(min: number, max: number)  {
        // TODO: Change so that it's not fully random but random in accordance to ParticleSize.
        // E.g: if particle size is 2. A new particle can be added to x,y: 0, 2, 4, 6 and so on. If particle size is 3 
        // a new particle can be added to x,y: 0, 3, 6, 9 and so on.
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
}