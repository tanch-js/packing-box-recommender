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

export const putItem = (box: boxType, item: itemType) => {
	for (const rotation of ROTATION_TYPES) {
		const dimensions = getRotatedItemDimensions(item, rotation);
		if (
			box.box_width < dimensions[0] ||
			box.box_height < dimensions[1] ||
			box.box_length < dimensions[2]
		) {
			continue;
		}
		return true;
	}
	return false;
};
