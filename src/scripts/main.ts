import lottie from 'lottie-web';

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

new BugAnimation({
	container: header,
	bubble: bubble,
	bubbleImg: bubbleImg,
});
