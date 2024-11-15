import lottie from 'lottie-web';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/all';

import { BugAnimation } from './core';

import '../css/style.scss';

const header = document.querySelector<HTMLElement>('.header');
const bubble = document.querySelector<HTMLElement>('.bubble');
const bubbleImg = bubble?.querySelector<HTMLElement>('.bubble__img');

let lottieAnimation = lottie.loadAnimation({
	container: document.querySelector('.bugs-top') ?? document.body,
	renderer: 'svg',
	loop: true,
	autoplay: true,
	path: '/bug-runner/src/data/bug-animation.json',
});

const headerReact = header?.getBoundingClientRect();

gsap.registerPlugin(MotionPathPlugin);
gsap.config({
	autoSleep: 320,
	force3D: true,
	nullTargetWarn: true,
	units: {
		lineHeight: '',
	},
});

gsap.to('.bugs-top', {
	motionPath: {
		path: [
			{ x: 0, y: 0 },
			{ x: headerReact?.right, y: headerReact?.bottom },
		],
		autoRotate: true,
	},
	transformOrigin: '50% 50%',
	duration: 5,
	repeat: -1,
	overwrite: false,
	delay: 0,
});

new BugAnimation({
	container: header,
	bubble: bubble,
	bubbleImg: bubbleImg,
});
