import lottie from 'lottie-web';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/all';

import '../css/style.scss';

const header = document.querySelector('.header');
const bubble = document.querySelector('.bubble') as HTMLElement;
const bubbleImg = bubble?.querySelector('.bubble__img') as HTMLElement;

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

const animation = gsap.to('.bugs-top', {
	motionPath: {
		path: [
			{ x: 0, y: 0 },
			{ x: headerReact?.right, y: headerReact?.bottom + 300 },
		],
		autoRotate: true,
	},
	transform: 10,
	transformOrigin: '50% 50%',
	duration: 5,
	overwrite: false,
	delay: 0,
	repeat: -1,
});

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

header?.addEventListener('mousemove', function (e: Event) {
	const mouseEvent = e as MouseEvent;
	targetX = mouseEvent.pageX;
	targetY = mouseEvent.pageY;
});

function animateHover() {
	currentX += (targetX - currentX) * 0.1;
	currentY += (targetY - currentY) * 0.1;

	bubble!.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
	bubbleImg!.style.transform = `translate3d(${-currentX}px, ${-currentY}px, 0)`;

	requestAnimationFrame(animateHover);
}

animateHover();
