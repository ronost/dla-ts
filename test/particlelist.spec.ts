import { Particle } from '../src/particle';
import { ParticleList } from '../src/particlelist';
import { PARTICLE_SIZE } from '../src/constants';

describe('particleList', () => {
    let particleList: ParticleList;
    
    beforeEach(() => {
        particleList = new ParticleList(99, 50);
    });
    
    it('should contain 50 dynamic particles in list', () => {
        expect(particleList.get().filter(particle => particle.isFree()).length).toBe(50);
    });

    it('should have added particles to positions that are multiples of PARTICLE_SIZE', () => {
        // For example, if PARTICLE_SIZE is 3. Valid positions would be: 0, 3, 6, 9, 12...
        particleList.get().forEach(particle => {
            expect(particle.getPosition().x % PARTICLE_SIZE).toBe(0);
            expect(particle.getPosition().y % PARTICLE_SIZE).toBe(0);
        });
    });

    it('should throw error when Canvas side is not multiple of Particle size', () => {
        expect(() => { 
            new ParticleList(PARTICLE_SIZE * 100 - 1, 50) 
        }).toThrow(new Error ('Canvas side is not multiple of Particle size'));
    });

});