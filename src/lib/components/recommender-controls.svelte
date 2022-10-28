<script>
	import ItemInput from './item-input.svelte';
	import { packingBoxRecommender } from '$lib/packing-box-recommender';
	import { numberOfSolutions } from '@src/stores';
	import DeclaredPackage from './declared-package.svelte';

	/** @type {import('@src/types').boxType[]} */ export let boxes;
	/** @type {any} */ export let order;
	/** @type {import('@src/types').suitableBoxType[]} */ let suitableBoxes = [];
	/** @type {import('@src/types').itemType} */ let item = {
		length: parseFloat(order.ParcelLength),
		width: parseFloat(order.ParcelWidth),
		height: parseFloat(order.ParcelHeight),
		weight: parseFloat(order.ParcelWeight),
		fragileBuffer: 0
	};
	function resetItemDimensions() {
		item = {
			length: parseFloat(order.ParcelLength),
			width: parseFloat(order.ParcelWidth),
			height: parseFloat(order.ParcelHeight),
			weight: parseFloat(order.ParcelWeight),
			fragileBuffer: 0
		};
	}
	let uploadedImages = [];

	$: suitableBoxes = packingBoxRecommender(item, boxes, $numberOfSolutions);
</script>

<div class="flex flex-col text-base">
	<div class="flex">
		<DeclaredPackage {order} />
		<ItemInput bind:item />
		<div>
			<div class="pl-12 pt-8">
				<button
					class="border rounded-md bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white py-1.5 px-3"
					on:click={resetItemDimensions}
					>Reset
				</button>
				<!-- <form>
					<label>
						Upload pack images
						<input
							type="file"
							id={`${order.PackageID}-upload`}
							accept="image/png, image/jpeg, image/jpg"
							multiple={true}
							on:input={function () {
								console.log(this.files);
							}}
						/>
					</label>
				</form> -->
			</div>
		</div>
	</div>
	<div class="my-16">
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
					<table class="bg-slate-300">
						<thead>
							<tr><th /><th>L</th><th>W</th><th>H</th></tr>
						</thead>
						<tbody>
							<tr
								><th>Box</th>
								<td
									>{suitableBox.box_length}
									{#if suitableBox.twistingRequired}
										{suitableBox.lengthToTwist > 0 ? ' + ' : ' - '}
										{Math.abs(suitableBox.lengthToTwist)}
									{/if}
								</td>
								<td
									>{suitableBox.box_width}
									{#if suitableBox.twistingRequired}
										{suitableBox.widthToTwist > 0 ? ' + ' : ' - '}
										{Math.abs(suitableBox.widthToTwist)}
									{/if}
								</td>
								<td
									>{suitableBox.box_height}
									{#if suitableBox.heightToCut > 0}
										-
										{suitableBox.heightToCut}
									{/if}
								</td>
							</tr>
							<tr
								><th>Item</th><td>{suitableBox.rotatedItemDimensions.length}</td><td
									>{suitableBox.rotatedItemDimensions.width}</td
								><td>{suitableBox.rotatedItemDimensions.height}</td></tr
							>
						</tbody>
					</table>
					<!-- <p>
						{#if suitableBox.twistingRequired}
							→ {suitableBox.twistedLength}x{suitableBox.twistedWidth}x{suitableBox.box_height}
						{/if}
					</p> -->
					<p class="mt-1">
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

<style>
	th {
		font-weight: 600;
	}
	th,
	td {
		border-width: 1px;
		padding: 0.25rem 0.5rem;
		border-color: rgb(107 114 128);
	}
	td {
		text-align: center;
	}
</style>
