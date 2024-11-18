import { IBugAnimation } from '../interface';

export class BugAnimation {
	private targetX = 0;
	private targetY = 0;
	private currentX = 0;
	private currentY = 0;
	private container: HTMLElement;
	private bubble: HTMLElement;
	private bubbleImg: HTMLElement;
	private rect: DOMRect;

	constructor(props: IBugAnimation) {
		if (!props.bubble || !props.bubbleImg || !props.container) {
			throw new Error('Element not found');
		}

		this.container = props.container;
		this.rect = this.container.getBoundingClientRect();
		this.bubble = props.bubble;
		this.bubbleImg = props.bubbleImg;

		this.moveTo();
		this.animateHover();
	}

	private moveTo() {
		this.container.addEventListener('mousemove', (e) => {
			const mouseEvent = e as MouseEvent;

			this.targetX = mouseEvent.pageX;
			this.targetY = mouseEvent.pageY;
		});
	}

	private animateHover() {
		this.currentX += (this.targetX - this.currentX) * 0.1;
		this.currentY += (this.targetY - this.currentY) * 0.1;

		this.bubble!.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;
		this.bubbleImg!.style.transform = `translate3d(${-this.currentX}px, ${-this.currentY}px, 0)`;

		requestAnimationFrame(() => this.animateHover());
	}

	public setCoords(paths: any) {}
}
