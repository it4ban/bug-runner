import '../scss/style.scss';

import gsap from 'gsap';

import { BugAnimation } from './core';
import { CockraochName } from './enums';
import { ITransform } from './interface';

const header = document.querySelector<HTMLElement>('.header');
const bubble = document.querySelector<HTMLElement>('.bubble');
const bubbleImg = bubble?.querySelector<HTMLElement>('.bubble__img');
const bugsTop = document.querySelector<HTMLElement>('.bugs-top');

const pulseTimeline = gsap.timeline({ repeat: -1, yoyo: true });

pulseTimeline
	.to('.cursor span', {
		scale: 1.3,
		duration: 0.6,
		ease: 'power1.inOut',
	})
	.to('.cursor span', {
		scaleX: 1.3,
		scaleY: 0.8,
		duration: 0.6,
		ease: 'power1.inOut',
	});

gsap.set('.cursor', {
	xPercent: -50,
	yPercent: -50,
});

let xTo = gsap.quickTo('.cursor', 'x', { duration: 0.01, ease: 'power1.inOut' });
let yTo = gsap.quickTo('.cursor', 'y', { duration: 0.01, ease: 'power1.inOut' });

window.addEventListener('mousemove', (e) => {
	const mouseEvent = e as MouseEvent;

	xTo(mouseEvent.clientX);
	yTo(mouseEvent.clientY);
});

const updatePaths: Partial<Record<CockraochName, ITransform>> = {
	'cockraoch control': {
		r: {
			k: [
				{
					s: [0], // начальный угол поворота
				},
				{
					s: [0], // конечный угол поворота
				},
			],
		},
		p: {
			k: [
				{
					s: [833, 573, 0], // координаты начала анимации
					to: [-200, -150, 0], // вектор направления движения
				},
				{
					s: [0, 0, 0], // конечная точка завершения анимации
				},
			],
		},
	},
};

const bugAnimation = new BugAnimation({
	container: header,
	bubble: bubble,
	bubbleImg: bubbleImg,
	bugsTop: bugsTop,
});

bugAnimation.setAnimation('/bug-runner/bug-animation.json');
