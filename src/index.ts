import { Particle } from './particle';
import { PARTICLE_SIZE } from './constants';
import { ParticleEngine } from './particleengine';


const DLA_CANVAS_WIDTH = 1000;
const DLA_CANVAS_HEIGHT = 1000;

let canvas = <HTMLCanvasElement> document.getElementById('dlaCanvas');
canvas.width = DLA_CANVAS_WIDTH;
canvas.height = DLA_CANVAS_HEIGHT;
let ctx : CanvasRenderingContext2D = canvas.getContext('2d');

let particleList: Array<Particle> = [];
let particleEngine: ParticleEngine;


window.onload = () => {
  init();
  animate();
}

let randomInt = (min: number, max: number)  => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let init = () => {

  //Add one static item in the middle
  particleList.push(new Particle({x: Math.round(DLA_CANVAS_WIDTH/2),y: Math.round(DLA_CANVAS_HEIGHT/2)}, false));
  //Add the rest
  for (let i = 0; i < 5 - 1; i++) {
      let x: number = randomInt(0, DLA_CANVAS_WIDTH);
      let y: number = randomInt(0, DLA_CANVAS_HEIGHT);
      particleList.push(new Particle({x: x, y: y}));
  }

  particleEngine = new ParticleEngine(ctx);

  console.log("particleList: ", particleList);
  console.log("particleList isFree == true", particleList.filter(p => p.isFree()));
  console.log("particleList isFree == false", particleList.filter(p => !p.isFree()));
}

let animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

  particleEngine.run();

  window.requestAnimationFrame(animate);
}
