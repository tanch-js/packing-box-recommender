<script>
	/** @type {import('../types').itemType} */ export let item;
	/**
	 * @type {number} */ export let numberOfSolutions;
</script>

<div>
	<p class="font-semibold">Item</p>
	<div class="flex flex-col gap-y-2 border-t-2 border-gray-500">
		<div class="grid grid-cols-[54px_3.5rem_2rem_auto] gap-x-1 mt-1 pr-4 items-center">
			Length:
			<input
				class="w-14 text-center border-2 border-gray-400 rounded-md"
				type="number"
				bind:value={item.length}
				min="0"
				step="0.5"
			/>
			+{item.fragileBuffer ?? 0}
			<input type="range" bind:value={item.length} min="0" max="100" tabindex="-1" />
		</div>
		<div class="grid grid-cols-[54px_3.5rem_2rem_auto] gap-x-1 pr-4 items-center">
			Width:
			<input
				class="w-14 text-center border-2 border-gray-400 rounded-md"
				type="number"
				bind:value={item.width}
				min="0"
				step="0.5"
			/>+{item.fragileBuffer ?? 0}
			<input type="range" bind:value={item.width} min="0" max="100" tabindex="-1" />
		</div>
		<div class="grid grid-cols-[54px_3.5rem_2rem_auto] gap-x-1 pr-4 items-center">
			Height:
			<input
				class="w-14 text-center border-2 border-gray-400 rounded-md"
				type="number"
				bind:value={item.height}
				min="0"
				step="0.5"
			/>+{item.fragileBuffer ?? 0}
			<input type="range" bind:value={item.height} min="0" max="100" tabindex="-1" />
		</div>
		<div class="grid grid-cols-[54px_3.5rem_2rem_auto] gap-x-1 pr-4 items-center">
			Weight:
			<input
				class="w-14 text-center border-2 border-gray-400 rounded-md"
				type="number"
				bind:value={item.weight}
				min="0"
				step="0.5"
			/>kg
		</div>
		<p>Volumetric: {((item.length * item.width * item.height) / 5000).toFixed(2)} kg</p>
		<div>
			Fragile Buffer: <input
				class="w-14 text-center border-2 border-gray-400 rounded-md"
				type="number"
				bind:value={item.fragileBuffer}
				min="0"
				step="0.5"
			/>
		</div>
		<div>
			Maximum number of suggestions to show: <input
				class="w-14 text-center border-2 border-gray-400 rounded-md"
				type="number"
				bind:value={numberOfSolutions}
				min="0"
				max="10"
			/>
		</div>
	</div>
</div>
