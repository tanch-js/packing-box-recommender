import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUserBoxes, getValidPackingOrdersForDay } from '$lib/server/db';
import type { boxType } from 'src/types';
import cloudinary from 'cloudinary';
import {
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET
} from '$env/static/private';

cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET
});

export const load: PageServerLoad = async () => {
	const boxes = await getUserBoxes('2986');
	const rawOrders = await getValidPackingOrdersForDay(new Date().toISOString().slice(0, 10));
	console.log(rawOrders[0]);

	const orders = rawOrders.reduce((acc, curr) => {
		const shipment = acc.find((shipment) => shipment.PackageID === curr.PackageID);
		if (shipment) {
			shipment.items.push({
				ItemCategory: shipment.ItemCategory,
				ItemDescription: shipment.ItemDescription,
				ItemQuantity: shipment.ItemQuantity,
				ItemPrice: shipment.ItemPrice,
				ItemTotalPrice: shipment.ItemTotalPrice,
				ItemWeight: shipment.ItemWeight
			});
		} else {
			acc.push({
				...curr,
				items: [
					{
						ItemCategory: curr.ItemCategory,
						ItemDescription: curr.ItemDescription,
						ItemQuantity: curr.ItemQuantity,
						ItemPrice: curr.ItemPrice,
						ItemTotalPrice: curr.ItemTotalPrice,
						ItemWeight: curr.ItemWeight
					}
				]
			});
		}
		return acc;
	}, []);

	const todayISOString = new Date().toISOString().slice(0, 10);

	for (const order of orders) {
		order.images = [];
		await cloudinary.v2.search
			.expression(`public_id:${todayISOString}/${order.OrderID}*`)
			.max_results(30)
			.execute()
			.then((result) => {
				if (result.total_count > 0) {
					for (const image of result.resources) {
						order.images.push(image.secure_url);
					}
				}
			});
	}

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
