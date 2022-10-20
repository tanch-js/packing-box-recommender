import type { boxType, itemType, suitableBoxType } from '../types';
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
	const suitableBoxes: suitableBoxType[] = [];
	for (const box of sortedBoxes) {
		const { itemFit, heightToCut, twistingRequired } = putItem(box, item);
		if (itemFit) {
			suitableBoxes.push({ ...box, heightToCut, twistingRequired });
			if (suitableBoxes.length === 3) {
				break;
			}
		}
	}
	return suitableBoxes;
};
