import { BugAnimation } from './core';

import '../css/style.scss';

import { CockraochName } from './enums';
import { ITransform } from './interface';

const header = document.querySelector<HTMLElement>('.header');
const bubble = document.querySelector<HTMLElement>('.bubble');
const bubbleImg = bubble?.querySelector<HTMLElement>('.bubble__img');
const bugsTop = document.querySelector<HTMLElement>('.bugs-top');

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

bugAnimation.setAnimation('/bug-runner/src/data/bug-animation.json', updatePaths);
