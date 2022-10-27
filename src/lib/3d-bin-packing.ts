import type { boxType, itemType } from '../types';
import { getLengthWidthToTwist } from './get-length-width-twist';

const ROTATION_TYPES = ['RT_WHL', 'RT_HWL', 'RT_HLW', 'RT_LHW', 'RT_LWH', 'RT_WLH'];

export const getRotatedItemDimensions = (item: itemType, rotation: string) => {
	switch (rotation) {
		case 'RT_WHL':
			return [item.width, item.height, item.length];
		case 'RT_HWL':
			return [item.height, item.width, item.length];
		case 'RT_HLW':
			return [item.height, item.length, item.width];
		case 'RT_LHW':
			return [item.length, item.height, item.width];
		case 'RT_LWH':
			return [item.length, item.width, item.height];
		case 'RT_WLH':
			return [item.width, item.length, item.height];
		default:
			return [];
	}
};

const itemFitNormalBox = (box: boxType, dimensions: number[]) => {
	return (
		box.box_width >= dimensions[0] &&
		box.box_height >= dimensions[1] &&
		box.box_length >= dimensions[2]
	);
};

const itemFitTwistedBox = (box: boxType, dimensions: number[]) => {
	return (
		box.box_width + box.box_length >= dimensions[0] + dimensions[2] &&
		box.box_height >= dimensions[1]
	);
};

export const putItem = (box: boxType, item: itemType) => {
	let canFit = false;
	let lowestItemHeight = 0;
	let twistingRequired = false;
	let lengthToTwist = 0,
		widthToTwist = 0;
	let optimalItemRotation = ROTATION_TYPES[0];
	for (const rotation of ROTATION_TYPES) {
		const dimensions = getRotatedItemDimensions(item, rotation).map(
			(ele) => ele + item.fragileBuffer ?? 0
		);

		//case where box will not be cut/twisted
		if (box.box_name.includes('Fedex')) {
			if (itemFitNormalBox(box, dimensions)) {
				return {
					itemFit: true,
					heightToCut: 0,
					twistingRequired,
					lengthToTwist,
					widthToTwist,
					optimalItemRotation: rotation
				};
			}
		} else {
			if (!itemFitTwistedBox(box, dimensions)) {
				continue;
			}
			canFit = true;
			if (dimensions[1] < lowestItemHeight || lowestItemHeight === 0) {
				twistingRequired = !itemFitNormalBox(box, dimensions);
				optimalItemRotation = rotation;
				lowestItemHeight = dimensions[1];
				if (twistingRequired) {
					const dimensionsToTwist = getLengthWidthToTwist(box, dimensions);
					lengthToTwist = dimensionsToTwist.lengthToTwist;
					widthToTwist = dimensionsToTwist.widthToTwist;
				}
			}
		}
	}
	return {
		itemFit: canFit,
		heightToCut: box.box_height - lowestItemHeight,
		twistingRequired,
		lengthToTwist,
		widthToTwist,
		optimalItemRotation
	};
};
