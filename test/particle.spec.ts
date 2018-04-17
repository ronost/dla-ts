import { Particle } from '../src/particle';
import { Direction } from '../src/direction';

describe('particle', () => {
    let p;
    let particleSize = 5;

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
        p.move(Direction.get('LEFT'), particleSize);
        expect(p.getPosition().x).toEqual(10 - particleSize);
        expect(p.getPosition().y).toEqual(10);
    });

    it('should move UP', () => {
        p.move(Direction.get('UP'), particleSize);
        expect(p.getPosition().x).toEqual(10);
        expect(p.getPosition().y).toEqual(10 + particleSize);
    });

    it('should move DOWN', () => {
        p.move(Direction.get('DOWN'), particleSize);
        expect(p.getPosition().x).toEqual(10);
        expect(p.getPosition().y).toEqual(10 - particleSize);
    });

    it('should move RIGHT', () => {
        p.move(Direction.get('RIGHT'), particleSize);
        expect(p.getPosition().x).toEqual(10 + particleSize);
        expect(p.getPosition().y).toEqual(10);
    });

    it('should throw error when no move', () => {
        expect(() => { 
            p.move({x: 0, y: 0}) 
        }).toThrow(new Error ('No move'));
        
        expect(p.getPosition().x).toEqual(10);
        expect(p.getPosition().y).toEqual(10);
    });

    it('should move UP LEFT', () => {
        p.move(Direction.get('UP_LEFT'), particleSize);
        expect(p.getPosition().x).toEqual(10 - particleSize);
        expect(p.getPosition().y).toEqual(10 + particleSize);
    });

    it('should move UP RIGHT', () => {
        p.move(Direction.get('UP_RIGHT'), particleSize);
        expect(p.getPosition().x).toEqual(10 + particleSize);
        expect(p.getPosition().y).toEqual(10 + particleSize);
    });

    it('should move DOWN LEFT', () => {
        p.move(Direction.get('DOWN_LEFT'), particleSize);
        expect(p.getPosition().x).toEqual(10 - particleSize);
        expect(p.getPosition().y).toEqual(10 - particleSize);
    });

    it('should move DOWN RIGHT', () => {
        p.move(Direction.get('DOWN_RIGHT'), particleSize);
        expect(p.getPosition().x).toEqual(10 + particleSize);
        expect(p.getPosition().y).toEqual(10 - particleSize);
    });
});
