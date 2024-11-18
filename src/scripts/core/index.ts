import lottie from 'lottie-web';

import { CockraochName } from '../enums';
import { IBugAnimation, ITransform, ILottieData } from '../interface';

export class BugAnimation {
	private targetX = 0;
	private targetY = 0;
	private currentX = 0;
	private currentY = 0;
	private container: HTMLElement;
	private bubble: HTMLElement;
	private bubbleImg: HTMLElement;
	private bugsTop: HTMLElement;

	constructor(props: IBugAnimation) {
		if (!props.bubble || !props.bubbleImg || !props.container || !props.bugsTop) {
			throw new Error('Failed to init animation');
		}

		this.container = props.container;
		this.bubble = props.bubble;
		this.bubbleImg = props.bubbleImg;
		this.bugsTop = props.bugsTop;

		this.moveTo();
		this.animateHover();
	}

	private moveTo() {
		this.container.addEventListener('mousemove', (e) => {
			const mouseEvent = e as MouseEvent;

			this.targetX = mouseEvent.pageX;
			this.targetY = mouseEvent.pageY;
		});

		this.container.addEventListener('mouseout', () => {
			this.targetX = window.innerWidth / 2;
			this.targetY = window.innerHeight / 2;
		});
	}

	private animateHover() {
		this.currentX += (this.targetX - this.currentX) * 0.1;
		this.currentY += (this.targetY - this.currentY) * 0.1;

		this.bubble!.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;
		this.bubbleImg!.style.transform = `translate3d(${-this.currentX}px, ${-this.currentY}px, 0)`;

		requestAnimationFrame(() => this.animateHover());
	}

	private updateAnimationPath(
		newCoords: Partial<Record<CockraochName, ITransform>>,
		lottieData: ILottieData,
	): ILottieData {
		lottieData.layers.forEach((layer) => {
			if (layer.nm.startsWith('cockraoch control')) {
				const pathData = newCoords[layer.nm];

				if (pathData) {
					// update coords
					layer.ks.p.k[0].s = pathData.p.k[0].s;
					layer.ks.p.k[0].to = pathData.p.k[0].to;
					layer.ks.p.k[1].s = pathData.p.k[1].s;

					// update angle rotate
					layer.ks.r.k[0].s = pathData.r.k[0].s;
					layer.ks.r.k[1].s = pathData.r.k[1].s;
				}
			}
		});

		return lottieData;
	}

	public setAnimation(file: string, coords?: Partial<Record<CockraochName, ITransform>>) {
		fetch(file)
			.then((res) => res.json())
			.then((lottieData: ILottieData) => {
				if (coords) {
					const upadatedAnimation = this.updateAnimationPath(coords, lottieData);

					lottie.loadAnimation({
						container: this.bugsTop,
						renderer: 'svg',
						loop: true,
						autoplay: true,
						animationData: upadatedAnimation,
					});
				} else {
					lottie.loadAnimation({
						container: this.bugsTop,
						renderer: 'svg',
						loop: true,
						autoplay: true,
						animationData: lottieData,
					});
				}
			})
			.catch((err) => console.error(err));
	}
}
