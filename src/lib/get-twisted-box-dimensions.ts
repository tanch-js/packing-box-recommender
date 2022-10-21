import type { boxType } from '../types';
export const getTwistedBoxDimensions = (box: boxType, dimensions: number[]) => {
	let twistedLength = 0,
		twistedWidth = 0;

	if (dimensions[0] > box.box_width) {
		//increase width, decrease length
		twistedWidth = dimensions[0];
		twistedLength = box.box_length - (dimensions[0] - box.box_width);
	} else {
		//increase length, decrease width
		twistedLength = dimensions[2];
		twistedWidth = box.box_width - (dimensions[2] - box.box_length);
	}
	return { twistedLength, twistedWidth };
};
