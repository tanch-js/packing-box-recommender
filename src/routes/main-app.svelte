<script>
	import ItemInput from './item-input.svelte';
	import DailyPackages from './daily-packages.svelte';
	import { packingBoxRecommender } from '$lib/packing-box-recommender';

	/** @type {import('../types').itemType} */ let item = {
		length: 10,
		width: 10,
		height: 6,
		weight: 2,
		fragileBuffer: 0
	};
	/** @type {import('../types').boxType[]} */ export let boxes;
	/** @type {any} */ export let orders;
	/** @type {import('../types').suitableBoxType[]} */ let suitableBoxes = [];
	/** @type {number} */ export let numberOfSolutions;

	$: suitableBoxes = packingBoxRecommender(item, boxes, numberOfSolutions);
</script>

<div class="flex flex-col">
	<DailyPackages bind:orders />
	<ItemInput bind:item />
	<div class="mt-16">
		<p class="font-semibold">Suggested Boxes</p>
		<div class="grid grid-cols-3 mt-1 border-t-2 border-gray-500 gap-y-4 divide-black">
			{#each suitableBoxes as suitableBox (suitableBox.id)}
				<div class="mt-1">
					<p class="font-semibold">
						{suitableBox.box_name}
						{#if suitableBox.twistingRequired}
							<span class="italic">(Twisting required)</span>
						{/if}
					</p>
					<p>
						{suitableBox.box_length}x{suitableBox.box_width}x{suitableBox.box_height}
						{#if suitableBox.twistingRequired}
							→ {suitableBox.twistedLength}x{suitableBox.twistedWidth}x{suitableBox.box_height}
						{/if}
					</p>
					<p>
						Volumetric: {suitableBox.volumetric.toFixed(2)}
					</p>
					{#if suitableBox.heightToCut > 0}
						<p>Height to cut: {suitableBox.heightToCut}</p>
						<p>
							Volumetric after cutting: {(suitableBox.box_length *
								suitableBox.box_width *
								(suitableBox.box_height - suitableBox.heightToCut)) /
								5000}
						</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
