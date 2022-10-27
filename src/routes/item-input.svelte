<script>
	/** @type {import('../types').itemType} */ export let item;
</script>

<div class="mt-4">
	<p class="font-semibold">Item</p>
	<div class="border-t-2 border-gray-500">
		<div class="flex flex-col gap-y-2 w-[50%]">
			<div class="grid grid-cols-[54px_4rem_2rem] gap-x-1 mt-1 pr-4 items-center">
				Length:
				<input
					class="w-[4rem] text-center border-2 border-gray-400 rounded-md"
					type="number"
					bind:value={item.length}
					min="0"
					step="1"
				/>
				+{item.fragileBuffer ?? 0}
				<!-- <input type="range" bind:value={item.length} min="0" max="100" tabindex="-1" /> -->
			</div>
			<div class="grid grid-cols-[54px_4rem_2rem] gap-x-1 pr-4 items-center">
				Width:
				<input
					class="w-[4rem] text-center border-2 border-gray-400 rounded-md"
					type="number"
					bind:value={item.width}
					min="0"
					step="1"
				/>+{item.fragileBuffer ?? 0}
				<!-- <input type="range" bind:value={item.width} min="0" max="100" tabindex="-1" /> -->
			</div>
			<div class="grid grid-cols-[54px_4rem_2rem] gap-x-1 pr-4 items-center">
				Height:
				<input
					class="w-[4rem] text-center border-2 border-gray-400 rounded-md"
					type="number"
					bind:value={item.height}
					min="0"
					step="1"
				/>+{item.fragileBuffer ?? 0}
				<!-- <input type="range" bind:value={item.height} min="0" max="100" tabindex="-1" /> -->
			</div>
			<div class="grid grid-cols-[54px_4rem_2rem] gap-x-1 pr-4 items-center">
				Weight:
				<input
					class="w-[4rem] text-center border-2 border-gray-400 rounded-md"
					type="number"
					bind:value={item.weight}
					min="0"
					step="0.5"
				/>kg
			</div>
			<p>
				Volumetric: {(
					((item.length + item.fragileBuffer) *
						(item.width + item.fragileBuffer) *
						(item.height + item.fragileBuffer)) /
					5000
				).toFixed(2)} kg
			</p>
			<div>
				Fragile Buffer: <input
					class="w-[4rem] text-center border-2 border-gray-400 rounded-md"
					type="number"
					bind:value={item.fragileBuffer}
					min="0"
					step="1"
				/>
			</div>
		</div>
	</div>
</div>
