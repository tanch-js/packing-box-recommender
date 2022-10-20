export type boxType = {
	id: string;
	box_name: string;
	box_length: number;
	box_width: number;
	box_height: number;
};

export type itemType = {
	length: number;
	width: number;
	height: number;
	fragileBuffer: number;
};

export type suitableBoxType = {
	id: string;
	box_name: string;
	box_length: number;
	box_width: number;
	box_height: number;
	heightToCut: number;
	twistingRequired: boolean;
};
