import type { boxType, itemType } from '../types';
import { putItem } from './3d-bin-packing';
/* 
Assumptions:
1. Only 1 item
2. Item dimensions is the minimum rectangular box fit
3. 
*/
export const packingBoxRecommender = (item: itemType, boxes: boxType[]) => {
	const sortedBoxes: boxType[] = boxes
		.map((ele) => ele)
		.sort((a: boxType, b: boxType) => {
			const volumeOfA = a.box_length * a.box_width * a.box_height;
			const volumeOfB = b.box_length * b.box_width * b.box_height;
			if (volumeOfA < volumeOfB) {
				return -1;
			}
			if (volumeOfA > volumeOfB) {
				return 1;
			}
			return 0;
		});
	const suitableBoxes: boxType[] = [];
	for (const box of sortedBoxes) {
		if (putItem(box, item)) {
			suitableBoxes.push(box);
			if (suitableBoxes.length === 3) {
				break;
			}
		}
	}
	return suitableBoxes;
};
