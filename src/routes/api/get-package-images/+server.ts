import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getCompletedPickups } from '$lib/server/woocenter-crawler';

export const GET: RequestHandler = async () => {
	try {
		const allCompletedPickups = await getCompletedPickups();
		return json(allCompletedPickups);
	} catch (err) {
		throw error(400, `failed to get completed pickups data ${err}`);
	}
};
