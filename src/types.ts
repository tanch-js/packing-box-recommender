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
	twistedLength: number;
	twistedWidth: number;
};

export type pickupDataType = {
	name: string;
	orderID: string;
	images: string[];
};