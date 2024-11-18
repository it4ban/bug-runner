import lottie from 'lottie-web';

import { BugAnimation } from './core';

import '../css/style.scss';

import { CockraochName } from './enums';
import { ILottieData, ILayer, ITransform } from './interface';

const header = document.querySelector<HTMLElement>('.header');
const bubble = document.querySelector<HTMLElement>('.bubble');
const bubbleImg = bubble?.querySelector<HTMLElement>('.bubble__img');

function updateCockroachPaths(
	updateData: Partial<Record<CockraochName, ITransform>>,
	lottieData: ILottieData,
): ILottieData {
	lottieData.layers.forEach((layer) => {
		if (layer.nm.startsWith('cockraoch control')) {
			const pathData = updateData[layer.nm];

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

fetch('/bug-runner/src/data/bug-animation.json')
	.then((res) => res.json())
	.then((lottieData: ILottieData) => {
		const updatedData = updateCockroachPaths(updatePaths, lottieData);

		lottie.loadAnimation({
			container: document.querySelector('.bugs-top') ?? document.body,
			animationData: updatedData ?? null,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: updatedData ? undefined : '/bug-runner/src/data/bug-animation.json',
		});
	});

new BugAnimation({
	container: header,
	bubble: bubble,
	bubbleImg: bubbleImg,
});
