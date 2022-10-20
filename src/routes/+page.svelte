<script>
	import { afterUpdate } from 'svelte';
	/** @type {import('./$types').PageData} */ export let data;
	import UserBoxForm from './user-box-form.svelte';
	import ItemInput from './item-input.svelte';
	import { packingBoxRecommender } from '$lib/packing-box-recommender';
	/** @type {import('../types').itemType} */ let item = {
		length: 10,
		width: 10,
		height: 10,
		fragileBuffer: 0
	};
	/** @type {import('../types').suitableBoxType[]} */ let suitableBoxes = [];

	afterUpdate(() => {
		suitableBoxes = packingBoxRecommender(item, data.boxes);
	});
</script>

<h1 class="text-red-500">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<div class="max-w-6xl mx-auto mt-24">
	<div class="flex flex-col">
		<div class="grid grid-cols-2">
			<div>
				<ItemInput bind:item />
			</div>
			<UserBoxForm boxes={data.boxes} />
		</div>
		<div class="mt-4">
			<p>Suggested Boxes:</p>
			<div class="grid grid-cols-3 divide-y-8 divide-transparent mt-2">
				{#each suitableBoxes as suitableBox (suitableBox.id)}
					<div>
						<p class="font-semibold">{suitableBox.box_name}</p>
						<p>{suitableBox.box_length}x{suitableBox.box_width}x{suitableBox.box_height}</p>
						<p>
							Volumetric: {(suitableBox.box_length *
								suitableBox.box_width *
								suitableBox.box_height) /
								5000}
						</p>
						<p>Height To Cut: {suitableBox.heightToCut}</p>
						<p>Twisting required: {suitableBox.twistingRequired}</p>
						<p>
							Volumetric after cutting: {(suitableBox.box_length *
								suitableBox.box_width *
								(suitableBox.box_height - suitableBox.heightToCut)) /
								5000}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
