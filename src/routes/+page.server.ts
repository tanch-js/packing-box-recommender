import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUserBoxes, getValidPackingOrdersForDay } from '$lib/server/db';
import type { boxType } from 'src/types';

export const load: PageServerLoad = async () => {
	const boxes = await getUserBoxes('2986');
	const orders = await getValidPackingOrdersForDay(new Date().toISOString().slice(0, 10));
	console.log(orders[0]);
	if (boxes) {
		return {
			boxes: boxes.map((box: boxType) => {
				return { ...box, volumetric: (box.box_length * box.box_width * box.box_height) / 5000 };
			}),
			orders: orders ?? []
		};
	}
	throw error(404, 'Not found');
};
