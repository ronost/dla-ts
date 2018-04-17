import { Particle } from '../src/particle';
import { ParticleList } from '../src/particlelist';

describe('particleList', () => {
    let canvasSide = 99;
    let particleSize = 3;
    let particleList: ParticleList;
    
    beforeEach(() => {
        particleList = new ParticleList(canvasSide, particleSize, 50);
    });
    
    it('should contain 50 dynamic particles in list', () => {
        expect(particleList.get().filter(particle => particle.isFree()).length).toBe(50);
    });

    it('should have added particles to positions that are multiples of particleSize', () => {
        // For example, if particleSize is 3. Valid positions would be: 0, 3, 6, 9, 12...
        particleList.get().forEach(particle => {
            expect(particle.getPosition().x % particleSize).toBe(0);
            expect(particle.getPosition().y % particleSize).toBe(0);
        });
    });

    it('should throw error when Canvas side is not multiple of Particle size', () => {
        expect(() => { 
            new ParticleList(particleSize * 100 - 1, 50) 
        }).toThrow(new Error ('Canvas side is not multiple of Particle size'));
    });

});
