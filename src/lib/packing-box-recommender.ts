import type { boxType, itemType, suitableBoxType } from '../types';
import { putItem, getRotatedItemDimensions } from './3d-bin-packing';

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
		const {
			itemFit,
			heightToCut,
			twistingRequired,
			lengthToTwist,
			widthToTwist,
			optimalItemRotation
		} = putItem(box, item);
		if (itemFit) {
			const [width, height, length] = getRotatedItemDimensions(item, optimalItemRotation);
			const rotatedItemDimensions = {
				width: width + item.fragileBuffer,
				height: height + item.fragileBuffer,
				length: length + item.fragileBuffer
			};
			fittingBoxes.push({
				...box,
				heightToCut,
				twistingRequired,
				lengthToTwist,
				widthToTwist,
				rotatedItemDimensions
			});
		}
	}

	const uncustomisedFedexBoxes = [];
	const boxesUnderItemWeight = [];
	const otherBoxes = [];
	let adjustedItemWeight = Math.ceil(item.weight * 2) / 2;
	if (adjustedItemWeight == 0) {
		adjustedItemWeight = 0.5;
	}
	for (const box of fittingBoxes) {
		//Fedex box will be charged at minimum 1kg
		if (
			adjustedItemWeight > 0.5 &&
			adjustedItemWeight >= box.volumetric &&
			box.box_name.includes('Fedex')
		) {
			box.heightToCut = 0;
			uncustomisedFedexBoxes.push(box);
			continue;
		}
		if (adjustedItemWeight >= box.volumetric) {
			box.heightToCut = 0;
			boxesUnderItemWeight.push(box);
			continue;
		}
		const volumetricAfterCutting =
			(box.box_length * box.box_width * (box.box_height - box.heightToCut)) / 5000;
		if (adjustedItemWeight >= volumetricAfterCutting) {
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
	const volumetricOfA =
		Math.round(((a.box_length * a.box_width * (a.box_height - a.heightToCut)) / 5000) * 100) / 100;
	const volumetricOfB =
		Math.round(((b.box_length * b.box_width * (b.box_height - b.heightToCut)) / 5000) * 100) / 100;
	if (volumetricOfA < volumetricOfB) {
		return -1;
	} else if (volumetricOfA > volumetricOfB) {
		return 1;
	}
	return 0;
};
