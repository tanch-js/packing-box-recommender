import type { boxType, itemType, suitableBoxType } from '../types';
import { putItem } from './3d-bin-packing';

export const packingBoxRecommender = (
	item: itemType,
	boxes: boxType[],
	numberOfSolutions: number
) => {
	const sortedBoxes = boxes
		.map((ele) => ele)
		.sort((a, b) => {
			if (a.volumetric < b.volumetric) {
				return -1;
			}
			if (a.volumetric > b.volumetric) {
				return 1;
			}
			return 0;
		});
	const fittingBoxes: suitableBoxType[] = [];
	for (const box of sortedBoxes) {
		const { itemFit, heightToCut, twistingRequired, twistedLength, twistedWidth } = putItem(
			box,
			item
		);
		if (itemFit) {
			fittingBoxes.push({
				...box,
				heightToCut,
				twistingRequired,
				twistedLength,
				twistedWidth
			});
		}
	}

	const uncustomisedFedexBoxes = [];
	const boxesUnderItemWeight = [];
	const otherBoxes = [];
	for (const box of fittingBoxes) {
		//Fedex box will be charged at minimum 1kg
		if (item.weight > 0.5 && item.weight >= box.volumetric && box.box_name.includes('Fedex')) {
			box.heightToCut = 0;
			uncustomisedFedexBoxes.push(box);
			continue;
		}
		if (item.weight >= box.volumetric) {
			box.heightToCut = 0;
			boxesUnderItemWeight.push(box);
			continue;
		}
		const volumetricAfterCutting =
			(box.box_length * box.box_width * (box.box_height - box.heightToCut)) / 5000;
		if (item.weight >= volumetricAfterCutting) {
			boxesUnderItemWeight.push(box);
			continue;
		}
		otherBoxes.push(box);
	}

	boxesUnderItemWeight.sort((a, b) => {
		if (!a.twistingRequired && !b.twistingRequired) {
			if (a.volumetric < b.volumetric) {
				return -1;
			}
			if (a.volumetric > b.volumetric) {
				return 1;
			}
			return 0;
		}
		if (!a.twistingRequired) {
			return -1;
		}
		return 0;
	});

	return [
		...uncustomisedFedexBoxes,
		...boxesUnderItemWeight,
		...otherBoxes.sort(sortByVolumetricAfterCutting)
	].slice(0, numberOfSolutions);
};

const sortByVolumetricAfterCutting = (a: suitableBoxType, b: suitableBoxType) => {
	const volumetricOfA = (a.box_length * a.box_width * (a.box_height - a.heightToCut)) / 5000;
	const volumetricOfB = (b.box_length * b.box_width * (b.box_height - b.heightToCut)) / 5000;
	if (volumetricOfA < volumetricOfB) {
		return -1;
	} else if (volumetricOfA > volumetricOfB) {
		return 1;
	}
	return 0;
};
