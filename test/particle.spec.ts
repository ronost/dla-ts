import { Particle } from '../src/particle';
import { Direction } from '../src/direction';

describe('particle', () => {
    let p;
    let canvasSide = 99;
    let particleSize = 3;

    beforeEach(() => {
        p = new Particle({x: 10, y: 10});
    });

    it('should set X, Y and free coordinates when object is instantiated', () => {
        expect(p.getPosition().x).toEqual(10);
        expect(p.getPosition().y).toEqual(10);
        expect(p.isFree()).toBeTruthy();
    });

    it('should set free to false when bound', () => {
        expect(p.isFree()).toBeTruthy();
        p.bind();
        expect(p.isFree()).toBeFalsy();
    });

    it('should move LEFT', () => {
        p.move(Direction.get('LEFT'), particleSize, canvasSide, canvasSide);
        expect(p.getPosition().x).toEqual(10 - particleSize);
        expect(p.getPosition().y).toEqual(10);
    });

    it('should move UP', () => {
        p.move(Direction.get('UP'), particleSize, canvasSide, canvasSide);
        expect(p.getPosition().x).toEqual(10);
        expect(p.getPosition().y).toEqual(10 + particleSize);
    });

    it('should move DOWN', () => {
        p.move(Direction.get('DOWN'), particleSize, canvasSide, canvasSide);
        expect(p.getPosition().x).toEqual(10);
        expect(p.getPosition().y).toEqual(10 - particleSize);
    });

    it('should move RIGHT', () => {
        p.move(Direction.get('RIGHT'), particleSize, canvasSide, canvasSide);
        expect(p.getPosition().x).toEqual(10 + particleSize);
        expect(p.getPosition().y).toEqual(10);
    });

    it('should throw error when no move', () => {
        expect(() => { 
            p.move({x: 0, y: 0}, particleSize, canvasSide, canvasSide) 
        }).toThrow(new Error ('No move: No direction'));
        
        expect(p.getPosition().x).toEqual(10);
        expect(p.getPosition().y).toEqual(10);
    });

    it('should move UP LEFT', () => {
        p.move(Direction.get('UP_LEFT'), particleSize, canvasSide, canvasSide);
        expect(p.getPosition().x).toEqual(10 - particleSize);
        expect(p.getPosition().y).toEqual(10 + particleSize);
    });

    it('should move UP RIGHT', () => {
        p.move(Direction.get('UP_RIGHT'), particleSize, canvasSide, canvasSide);
        expect(p.getPosition().x).toEqual(10 + particleSize);
        expect(p.getPosition().y).toEqual(10 + particleSize);
    });

    it('should move DOWN LEFT', () => {
        p.move(Direction.get('DOWN_LEFT'), particleSize, canvasSide, canvasSide);
        expect(p.getPosition().x).toEqual(10 - particleSize);
        expect(p.getPosition().y).toEqual(10 - particleSize);
    });

    it('should move DOWN RIGHT', () => {
        p.move(Direction.get('DOWN_RIGHT'), particleSize, canvasSide, canvasSide);
        expect(p.getPosition().x).toEqual(10 + particleSize);
        expect(p.getPosition().y).toEqual(10 - particleSize);
    });

    it('should not allow particle to move outside X limit', () => {
        let p1 = new Particle({x: canvasSide - particleSize * 2, y: 10});
        p1.move({x: 1, y: 0}, particleSize, canvasSide, canvasSide);
        expect(p1.getPosition().x).toEqual(canvasSide - particleSize);
        expect(() => { 
            p1.move({x: 1, y: 0}, particleSize, canvasSide, canvasSide ) 
        }).toThrow(new Error ('No move: Limit violation'));
        expect(p1.getPosition().x).toEqual(canvasSide - particleSize);

        let p2 = new Particle({x: particleSize, y: 10});
        p2.move({x: -1, y: 0}, particleSize, canvasSide, canvasSide);
        expect(p2.getPosition().x).toEqual(0);
        expect(() => { 
            p2.move({x: -1, y: 0}, particleSize, canvasSide, canvasSide ) 
        }).toThrow(new Error ('No move: Limit violation'));
        expect(p2.getPosition().x).toEqual(0);
    });

    it('should not allow particle to move outside Y limit', () => {
        let p1 = new Particle({x: 10, y: canvasSide - particleSize * 2});
        p1.move({x: 0, y: 1}, particleSize, canvasSide, canvasSide);
        expect(p1.getPosition().y).toEqual(canvasSide - particleSize);
        expect(() => { 
            p1.move({x: 0, y: 1}, particleSize, canvasSide, canvasSide ) 
        }).toThrow(new Error ('No move: Limit violation'));
        expect(p1.getPosition().y).toEqual(canvasSide - particleSize);

        let p2 = new Particle({x: 10, y: particleSize});
        p2.move({x: 0, y: -1}, particleSize, canvasSide, canvasSide);
        expect(p2.getPosition().y).toEqual(0);
        expect(() => { 
            p2.move({x: 0, y: -1}, particleSize, canvasSide, canvasSide ) 
        }).toThrow(new Error ('No move: Limit violation'));
        expect(p2.getPosition().y).toEqual(0);
    });
});
