export type boxType = {
	id: string;
	box_name: string;
	box_length: number;
	box_width: number;
	box_height: number;
	volumetric: number;
};

export type itemType = {
	length: number;
	width: number;
	height: number;
	weight: number;
	fragileBuffer: number;
};

export type suitableBoxType = boxType & {
	heightToCut: number;
	twistingRequired: boolean;
	lengthToTwist: number;
	widthToTwist: number;
	rotatedItemDimensions: { length: number; width: number; height: number };
};

export type pickupDataType = {
	name: string;
	orderID: string;
	images: string[];
};
