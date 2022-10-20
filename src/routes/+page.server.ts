import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUserBoxes } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const boxes = await getUserBoxes('2986');
	if (boxes) {
		return { boxes };
	}
	throw error(404, 'Not found');
};
