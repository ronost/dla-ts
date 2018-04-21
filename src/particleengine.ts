import { Particle } from './particle';
import { ParticleList } from './particlelist';
import { Direction } from './direction';

export class ParticleEngine {
    private particleList: ParticleList;
    private particleSize: number;
    private canvasSide: number;
    private context: CanvasRenderingContext2D;
    private COLOR: any = {
        'FLOATING': '#000000',
        'LAYER1': '#FF0000',
        'LAYER2': '#FF7F00',
        'LAYER3': '#FFFF00',
        'LAYER4': '#00FF00',
        'LAYER5': '#0000FF',
        'LAYER6': '#4B0082',
        'LAYER7': '#9400D3'
    };
  
    constructor(particleList: ParticleList, particleSize: number, canvasSide: number, context: CanvasRenderingContext2D) {
        this.particleList = particleList;
        this.particleSize = particleSize;
        this.canvasSide = canvasSide;
        this.context = context;
    }

    public run() {
        for (let particle of this.particleList.get()) {
            if (particle.isFree()) {
                this.context.fillStyle = this.COLOR.FLOATING;
                // Random walk
                try {
                    particle.move(Direction.random(), this.particleSize, this.canvasSide, this.canvasSide);
                }
                catch {
                    continue;
                }
                for (let staticParticle of this.particleList.get().filter(p => !p.isFree())) {
                    // Pythagorean metric to determine distance. 
                    // Use multiplier to allow for diagonal relationsships.
                    let multiplier = 1.5;
                    let dx = Math.abs(particle.getPosition().x - staticParticle.getPosition().x);
                    let dy = Math.abs(particle.getPosition().y - staticParticle.getPosition().y);
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance <= this.particleSize * multiplier) {
                        particle.bind();
                        particle.boundIndex = this.particleList.currentBoundIndex++;
                    }
                }
            }
            else {
                this.context.fillStyle = this.getColor(particle.boundIndex);
            }
            this.context.fillRect(particle.getPosition().x, particle.getPosition().y, this.particleSize, this.particleSize);
        }
    }

    private getColor(idx: number) {
        let particleCount = this.particleList.get().length;

        if (idx < (particleCount / 7)) {
            return this.COLOR.LAYER1
        }
        else if (idx < (particleCount / 7 * 2)) {
            return this.COLOR.LAYER2;
        }
        else if (idx < (particleCount / 7 * 3)) {
            return this.COLOR.LAYER3;
        }
        else if (idx < (particleCount / 7 * 4)) {
            return this.COLOR.LAYER4
        }
        else if (idx < (particleCount / 7 * 5)) {
            return this.COLOR.LAYER5;
        }
        else if (idx < (particleCount / 7 * 6)) {
            return this.COLOR.LAYER6;
        }
        else if (idx < particleCount) {
            return this.COLOR.LAYER7
        }
        else {
            return this.COLOR.FLOATING;
        }
    }
}
