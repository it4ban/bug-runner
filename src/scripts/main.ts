import '../css/style.scss';

const header = document.querySelector('.header');
const bubble = document.querySelector('.bubble') as HTMLElement;
const bubbleImg = bubble?.querySelector('.bubble__img') as HTMLElement;

header?.addEventListener('mousemove', (e) => {
	bubble.style.transform = `translate3d(${e.pageX}px, ${e.pageY}px, 0)`;
	bubbleImg.style.transform = `translate3d(${-e.pageX}px, ${-e.pageY}px, 0)`;
});
