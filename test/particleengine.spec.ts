import { Particle } from '../src/particle';
import { ParticleEngine } from '../src/particleengine';
import { Direction } from '../src/direction';
import { PARTICLE_SIZE } from '../src/constants';
import { ParticleList } from '../src/particlelist';

describe('particleEngile', () => {
    let engine;
    let particleList: ParticleList;
    let context: CanvasRenderingContext2D;
    let static_x = 49;
    let static_y = 49;

    beforeEach(() => {
        // Setup canvas and 2d context
        let canvas = document.createElement('canvas');
        canvas.id = "dlaTestCanvas";
        document.body.appendChild(canvas);

        context = canvas.getContext('2d');

        //Clear particleList and add static particle
        particleList = new ParticleList(new Particle({x: static_x,y: static_y}, false), 100, 100, 0);

        spyOn(context, 'fillRect').and.callThrough();
    });

    afterEach(function() {
        // Tear down canvas
        document.body.removeChild(document.getElementById('dlaTestCanvas'));
    });

    it('should run run and draw particles', () => {
        engine = new ParticleEngine(particleList, context);
        engine.run();

        expect(context.fillStyle).toBe('#000000');
        expect(context.fillRect).toHaveBeenCalled();
    });

    it('should add particle and move it to the RIGHT of static particle', () => {
        spyOn(Direction, 'random').and.returnValue(Direction.get('LEFT'));

        particleList.add(new Particle({x: static_x + 3 * PARTICLE_SIZE, y: static_y}));
        engine = new ParticleEngine(particleList, context);
    
        expect(particleList.get()[1].isFree()).toBeTruthy();

        engine.run();
        engine.run();
        
        //Should have moved particle 2 steps and bound it
        expect(Direction.random).toHaveBeenCalled();
        expect(particleList.get()[1].isFree()).toBeFalsy();
        expect(particleList.get()[1].getPosition().x).toBe(static_x + PARTICLE_SIZE);
        expect(particleList.get()[1].getPosition().y).toBe(static_y);
        //Distance should be size of particle
        expect(Math.abs(particleList.get()[1].getPosition().x - particleList.get()[0].getPosition().x)).toBe(PARTICLE_SIZE);
    
        engine.run();
        
        //Should be unchanged since particle is bound to static
        expect(particleList.get()[1].isFree()).toBeFalsy();
        expect(particleList.get()[1].getPosition().x).toBe(static_x + PARTICLE_SIZE);
        expect(particleList.get()[1].getPosition().y).toBe(static_y);
    });

    it('should add particle and move it to the LEFT of static particle', () => {
        spyOn(Direction, 'random').and.returnValue(Direction.get('RIGHT'));

        particleList.add(new Particle({x: static_x - 3 * PARTICLE_SIZE, y: static_y}));
        engine = new ParticleEngine(particleList, context);

        expect(particleList.get()[1].isFree()).toBeTruthy();

        engine.run();
        engine.run();
        
        //Should have moved particle 2 steps and bound it
        expect(Direction.random).toHaveBeenCalled();
        expect(particleList.get()[1].isFree()).toBeFalsy();
        expect(particleList.get()[1].getPosition().x).toBe(static_x - PARTICLE_SIZE);
        expect(particleList.get()[1].getPosition().y).toBe(static_y);
        //Distance should be size of particle
        expect(Math.abs(particleList.get()[1].getPosition().x - particleList.get()[0].getPosition().x)).toBe(PARTICLE_SIZE);
        
        engine.run();
        
        //Should be unchanged since particle is bound to static
        expect(particleList.get()[1].isFree()).toBeFalsy();
        expect(particleList.get()[1].getPosition().x).toBe(static_x - PARTICLE_SIZE);
        expect(particleList.get()[1].getPosition().y).toBe(static_y);
    });

    it('should add particle and move it to the TOP of static particle', () => {
        spyOn(Direction, 'random').and.returnValue(Direction.get('DOWN'));

        particleList.add(new Particle({x: static_x, y: static_y + 3 * PARTICLE_SIZE}));
        engine = new ParticleEngine(particleList, context);
        
        expect(particleList.get()[1].isFree()).toBeTruthy();

        engine.run();
        engine.run();
        
        //Should have moved particle 2 steps and bound it
        expect(Direction.random).toHaveBeenCalled();
        expect(particleList.get()[1].isFree()).toBeFalsy();
        expect(particleList.get()[1].getPosition().x).toBe(static_x);
        expect(particleList.get()[1].getPosition().y).toBe(static_y + PARTICLE_SIZE);
        //Distance should be size of particle
        expect(Math.abs(particleList.get()[1].getPosition().y - particleList.get()[0].getPosition().y)).toBe(PARTICLE_SIZE);
        
        engine.run();
        
        //Should be unchanged since particle is bound to static
        expect(particleList.get()[1].isFree()).toBeFalsy();
        expect(particleList.get()[1].getPosition().x).toBe(static_x);
        expect(particleList.get()[1].getPosition().y).toBe(static_y + PARTICLE_SIZE);
    });

    it('should add particle and move it to the BOTTOM of static particle', () => {
        spyOn(Direction, 'random').and.returnValue(Direction.get('UP'));

        particleList.add(new Particle({x: static_x, y: static_y - 3 * PARTICLE_SIZE}));
        engine = new ParticleEngine(particleList, context);
        
        expect(particleList.get()[1].isFree()).toBeTruthy();

        engine.run();
        engine.run();
        
        //Should have moved particle 2 steps and bound it
        expect(Direction.random).toHaveBeenCalled();
        expect(particleList.get()[1].isFree()).toBeFalsy();
        expect(particleList.get()[1].getPosition().x).toBe(static_x);
        expect(particleList.get()[1].getPosition().y).toBe(static_y - PARTICLE_SIZE);
        //Distance should be size of particle
        expect(Math.abs(particleList.get()[1].getPosition().y - particleList.get()[0].getPosition().y)).toBe(PARTICLE_SIZE);
        
        engine.run();
        
        //Should be unchanged since particle is bound to static
        expect(particleList.get()[1].isFree()).toBeFalsy();
        expect(particleList.get()[1].getPosition().x).toBe(static_x);
        expect(particleList.get()[1].getPosition().y).toBe(static_y - PARTICLE_SIZE);
    });

    it('should add particle and move it to the TOP-RIGHT of static particle', () => {
        spyOn(Direction, 'random').and.returnValue(Direction.get('DOWN_LEFT'));

        particleList.add(new Particle({x: static_x + 3 * PARTICLE_SIZE, y: static_y + 3 * PARTICLE_SIZE}));
        engine = new ParticleEngine(particleList, context);
        
        expect(particleList.get()[1].isFree()).toBeTruthy();

        engine.run();
        engine.run();
        
        //Should have moved particle 2 steps and bound it
        expect(Direction.random).toHaveBeenCalled();
        expect(particleList.get()[1].isFree()).toBeFalsy();
        expect(particleList.get()[1].getPosition().x).toBe(static_x + PARTICLE_SIZE);
        expect(particleList.get()[1].getPosition().y).toBe(static_y + PARTICLE_SIZE);
        //Distance should be size of particle
        expect(Math.abs(particleList.get()[1].getPosition().y - particleList.get()[0].getPosition().y)).toBe(PARTICLE_SIZE);
        expect(Math.abs(particleList.get()[1].getPosition().x - particleList.get()[0].getPosition().x)).toBe(PARTICLE_SIZE);

        engine.run();
        
        //Should be unchanged since particle is bound to static
        expect(particleList.get()[1].isFree()).toBeFalsy();
        expect(particleList.get()[1].getPosition().x).toBe(static_x + PARTICLE_SIZE);
        expect(particleList.get()[1].getPosition().y).toBe(static_y + PARTICLE_SIZE);
    });

    it('should add particle and move it to the TOP-LEFT of static particle', () => {
        spyOn(Direction, 'random').and.returnValue(Direction.get('DOWN_RIGHT'));

        particleList.add(new Particle({x: static_x - 3 * PARTICLE_SIZE, y: static_y + 3 * PARTICLE_SIZE}));
        engine = new ParticleEngine(particleList, context);

        expect(particleList.get()[1].isFree()).toBeTruthy();

        engine.run();
        engine.run();
        
        //Should have moved particle 2 steps
        expect(Direction.random).toHaveBeenCalled();
        expect(particleList.get()[1].isFree()).toBeFalsy();
        expect(particleList.get()[1].getPosition().x).toBe(static_x - PARTICLE_SIZE);
        expect(particleList.get()[1].getPosition().y).toBe(static_y + PARTICLE_SIZE);
        //Distance should be size of particle
        expect(Math.abs(particleList.get()[1].getPosition().y - particleList.get()[0].getPosition().y)).toBe(PARTICLE_SIZE);
        expect(Math.abs(particleList.get()[1].getPosition().x - particleList.get()[0].getPosition().x)).toBe(PARTICLE_SIZE);

        engine.run();
        
        //Should be unchanged since particle is bound to static
        expect(particleList.get()[1].isFree()).toBeFalsy();
        expect(particleList.get()[1].getPosition().x).toBe(static_x - PARTICLE_SIZE);
        expect(particleList.get()[1].getPosition().y).toBe(static_y + PARTICLE_SIZE);
    });

    it('should add particle and move it to the BOTTOM-LEFT of static particle', () => {
        spyOn(Direction, 'random').and.returnValue(Direction.get('UP_RIGHT'));

        particleList.add(new Particle({x: static_x - 3 * PARTICLE_SIZE, y: static_y - 3 * PARTICLE_SIZE}));
        engine = new ParticleEngine(particleList, context);

        expect(particleList.get()[1].isFree()).toBeTruthy();

        engine.run();
        engine.run();
        
        //Should have moved particle 2 steps and bound it
        expect(Direction.random).toHaveBeenCalled();
        expect(particleList.get()[1].isFree()).toBeFalsy();
        expect(particleList.get()[1].getPosition().x).toBe(static_x - PARTICLE_SIZE);
        expect(particleList.get()[1].getPosition().y).toBe(static_y - PARTICLE_SIZE);
        //Distance should be size of particle
        expect(Math.abs(particleList.get()[1].getPosition().y - particleList.get()[0].getPosition().y)).toBe(PARTICLE_SIZE);
        expect(Math.abs(particleList.get()[1].getPosition().x - particleList.get()[0].getPosition().x)).toBe(PARTICLE_SIZE);

        engine.run();
        
        //Should be unchanged since particle is bound to static
        expect(particleList.get()[1].isFree()).toBeFalsy();
        expect(particleList.get()[1].getPosition().x).toBe(static_x - PARTICLE_SIZE);
        expect(particleList.get()[1].getPosition().y).toBe(static_y - PARTICLE_SIZE);
    });

    it('should add particle and move it to the BOTTOM-RIGHT of static particle', () => {
        spyOn(Direction, 'random').and.returnValue(Direction.get('UP_LEFT'));

        particleList.add(new Particle({x: static_x + 3 * PARTICLE_SIZE, y: static_y - 3 * PARTICLE_SIZE}));
        engine = new ParticleEngine(particleList, context);

        expect(particleList.get()[1].isFree()).toBeTruthy();

        engine.run();
        engine.run();
        
        //Should have moved particle 2 steps and bound it
        expect(Direction.random).toHaveBeenCalled();
        expect(particleList.get()[1].isFree()).toBeFalsy();
        expect(particleList.get()[1].getPosition().x).toBe(static_x + PARTICLE_SIZE);
        expect(particleList.get()[1].getPosition().y).toBe(static_y - PARTICLE_SIZE);
        //Distance should be size of particle
        expect(Math.abs(particleList.get()[1].getPosition().y - particleList.get()[0].getPosition().y)).toBe(PARTICLE_SIZE);
        expect(Math.abs(particleList.get()[1].getPosition().x - particleList.get()[0].getPosition().x)).toBe(PARTICLE_SIZE);

        engine.run();
        
        //Should be unchanged since particle is bound to static
        expect(particleList.get()[1].isFree()).toBeFalsy();
        expect(particleList.get()[1].getPosition().x).toBe(static_x + PARTICLE_SIZE);
        expect(particleList.get()[1].getPosition().y).toBe(static_y - PARTICLE_SIZE);
    });
});
