import type { boxType, itemType } from '../types';

const ROTATION_TYPES = ['RT_WHL', 'RT_HWL', 'RT_HLW', 'RT_LHW', 'RT_LWH', 'RT_WLH'];

const getRotatedItemDimensions = (item: itemType, rotation: string) => {
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

const itemFit = (box: boxType, dimensions: number[]) => {
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
	let lowestItemHeight = 0;
	let twistingRequired = false;
	for (const rotation of ROTATION_TYPES) {
		twistingRequired = false;
		const dimensions = getRotatedItemDimensions(item, rotation);
		if (!itemFitTwistedBox(box, dimensions)) {
			continue;
		}
		twistingRequired = !itemFit(box, dimensions);
		console.log('twisting required:', twistingRequired);
		if (dimensions[1] < lowestItemHeight || lowestItemHeight === 0) {
			lowestItemHeight = dimensions[1];
		}
	}
	return {
		itemFit: Boolean(lowestItemHeight),
		heightToCut: box.box_height - lowestItemHeight,
		twistingRequired
	};
};
