import { Particle } from './particle';
import { PARTICLE_SIZE } from './constants';
import { DLA_CANVAS_SIDE } from './constants';
import { ParticleEngine } from './particleengine';
import { ParticleList } from './particlelist';

let canvas = <HTMLCanvasElement> document.getElementById('dlaCanvas');
canvas.width = DLA_CANVAS_SIDE;
canvas.height = DLA_CANVAS_SIDE;
let ctx : CanvasRenderingContext2D = canvas.getContext('2d');

let particleList: ParticleList;
let particleEngine: ParticleEngine;


window.onload = () => {
  init();
  animate();
}

let randomInt = (min: number, max: number)  => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let init = () => {
  particleList = new ParticleList(DLA_CANVAS_SIDE, PARTICLE_SIZE, 1500);
  particleEngine = new ParticleEngine(particleList, PARTICLE_SIZE, ctx);
}

let animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

  particleEngine.run();

  window.requestAnimationFrame(animate);
}
