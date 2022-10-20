<script>
	/** @type {import('./$types').PageData} */ export let data;
	import UserBoxForm from './user-box-form.svelte';
	import ItemInput from './item-input.svelte';
	import { packingBoxRecommender } from '$lib/packing-box-recommender';
	/** @type {import('../types').itemType} */ let item = {
		length: 1,
		width: 2,
		height: 3
	};
	/** @type {import('../types').boxType[]} */ let suitableBoxes = [];
</script>

<h1 class="text-red-500">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<div class="grid grid-cols-2 max-w-6xl mx-auto mt-24">
	<div>
		<ItemInput bind:item />
		<button class="mt-4 border bg-gray-200 py-1 px-2 active:bg-gray-300" on:click={() => (suitableBoxes = packingBoxRecommender(item, data.boxes))}
			>Recommend some boxes</button
		>
		<div class="mt-4">
			<p>Suggested Boxes:</p>
			<div class="divide-y-8 divide-transparent mb-4">
				{#each suitableBoxes as suitableBox (suitableBox.id)}
					<div>
						{suitableBox.box_name}
						{suitableBox.box_length}x{suitableBox.box_width}x{suitableBox.box_height}
						<p>
							Volumetric: {(suitableBox.box_length *
								suitableBox.box_width *
								suitableBox.box_height) /
								5000}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<UserBoxForm boxes={data.boxes} />
</div>
