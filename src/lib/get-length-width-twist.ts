import type { boxType } from '../types';
export const getLengthWidthToTwist = (box: boxType, dimensions: number[]) => {
	let lengthToTwist = 0,
		widthToTwist = 0;

	if (dimensions[0] > box.box_width) {
		//increase width, decrease length
		widthToTwist = dimensions[0] - box.box_width;
		lengthToTwist = box.box_width - dimensions[0];
	} else {
		//increase length, decrease width
		lengthToTwist = dimensions[2] - box.box_length;
		widthToTwist = box.box_length - dimensions[2];
	}
	return { lengthToTwist, widthToTwist };
};
