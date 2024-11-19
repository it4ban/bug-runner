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

let xTo = gsap.quickTo('.cursor', 'x', { duration: 0.01, ease: 'power2.inOut' });
let yTo = gsap.quickTo('.cursor', 'y', { duration: 0.01, ease: 'power2.inOut' });

window.addEventListener('mousemove', (e) => {
	const mouseEvent = e as MouseEvent;

	xTo(mouseEvent.clientX);
	yTo(mouseEvent.clientY);
});

window.addEventListener('mouseout', () => {
	xTo(window.innerWidth / 2);
	yTo(window.innerHeight / 2);
});

const updatePaths: Partial<Record<CockraochName, ITransform>> = {
	'cockraoch control': {
		r: {
			k: [
				{
					s: [130], // начальный угол поворота
				},
				{
					s: [130], // конечный угол поворота
				},
			],
		},
		p: {
			k: [
				{
					s: [0, 245, 0], // координаты начала анимации
					to: [0, 0, 0], // вектор направления движения
				},
				{
					s: [900, 245, 0], // конечная точка завершения анимации
				},
			],
		},
	},
	'cockraoch control 2': {
		r: {
			k: [
				{
					s: [130],
				},
				{
					s: [130],
				},
			],
		},
		p: {
			k: [
				{
					s: [0, 260, 0],
					to: [0, 0, 0],
				},
				{
					s: [900, 260, 0],
				},
			],
		},
	},
	'cockraoch control 4': {
		r: {
			k: [
				{
					s: [130],
				},
				{
					s: [130],
				},
			],
		},
		p: {
			k: [
				{
					s: [0, 200, 0],
					to: [0, 0, 0],
				},
				{
					s: [900, 200, 0],
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

bugAnimation.setAnimation('/bug-runner/bug-animation.json', updatePaths);
