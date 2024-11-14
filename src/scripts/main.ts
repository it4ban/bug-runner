import lottie from 'lottie-web';

import '../css/style.scss';

const header = document.querySelector('.header');
const bubble = document.querySelector('.bubble') as HTMLElement;
const bubbleImg = bubble?.querySelector('.bubble__img') as HTMLElement;
const bug = document.querySelector('.bug') as HTMLElement;
const bugContainer = document.querySelector('.bugs-top');

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

const headerRect = header?.getBoundingClientRect();
const diagonalPositions = [
	{ x: headerRect?.left, y: headerRect?.top },
	{ x: headerRect?.right, y: headerRect?.bottom },
	{ x: headerRect?.right, y: headerRect?.top },
	{ x: headerRect?.left, y: headerRect?.bottom },
];

let currentPositionIndex = 0;
let startX = diagonalPositions[0].x;
let startY = diagonalPositions[0].y;
let endX = diagonalPositions[1].x;
let endY = diagonalPositions[1].y;
let progress = 0;
const speed = 0.005;

header?.addEventListener('mousemove', function (e: Event) {
	const mouseEvent = e as MouseEvent;
	targetX = mouseEvent.pageX;
	targetY = mouseEvent.pageY;

	console.log(targetX, targetY);
});

lottie.loadAnimation({
	container: document.querySelector('.bug') ?? document.body,
	renderer: 'svg',
	loop: true,
	autoplay: true,
	path: '/bug-runner/src/data/bug-animation.json',
});

function animateHover() {
	currentX += (targetX - currentX) * 0.1;
	currentY += (targetY - currentY) * 0.1;

	bubble!.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
	bubbleImg!.style.transform = `translate3d(${-currentX}px, ${-currentY}px, 0)`;

	requestAnimationFrame(animateHover);
}

function animateBug() {
	progress += speed;

	const currentX = startX + (endX - startX) * progress;
	const currentY = startY + (endY - startY) * progress;

	bug.style.transform = `matrix(1, 0, 0, 1, ${currentX}, ${currentY})`;

	if (progress >= 1) {
		progress = 0;
		currentPositionIndex = (currentPositionIndex + 1) % diagonalPositions.length;
		startX = diagonalPositions[currentPositionIndex].x;
		startY = diagonalPositions[currentPositionIndex].y;
		endX = diagonalPositions[(currentPositionIndex + 1) % diagonalPositions.length].x;
		endY = diagonalPositions[(currentPositionIndex + 1) % diagonalPositions.length].y;
	}

	requestAnimationFrame(animateBug);
}

animateBug();

animateHover();
