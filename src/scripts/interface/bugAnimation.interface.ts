import { CockraochName } from '../enums';

export interface IBugAnimation {
	container: HTMLElement | null;
	bubble: HTMLElement | null;
	bubbleImg: HTMLElement | null | undefined;
	bugsTop: HTMLElement | null | undefined;
}

interface IKeyFrame {
	s: [number, number, number];
	to?: [number, number, number];
}

interface IPosition {
	k: [IKeyFrame, IKeyFrame];
}

interface IRotateFrame {
	s: [number];
}

interface IRotate {
	k: [IRotateFrame, IRotateFrame];
}

export interface ITransform {
	p: IPosition;
	r: IRotate;
}

export interface ILayer {
	nm: CockraochName;
	ks: ITransform;
}

export interface ILottieData {
	layers: ILayer[];
}
