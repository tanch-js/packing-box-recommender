<script>
	/** @type {import('../types').itemType} */ export let item;
</script>

<div>
	<p class="font-semibold">Item</p>
	<div class="flex flex-col gap-y-2 border-t-2 border-gray-500">
		<div class="grid grid-cols-[52px_3.5rem_2rem_auto] gap-x-1 mt-1 pr-4 items-center">
			length:
			<input
				class="w-14 text-center border-2 border-gray-700 rounded-md pl-3"
				type="number"
				bind:value={item.length}
				min="0"
			/>
			+{item.fragileBuffer ?? 0}
			<input type="range" bind:value={item.length} min="0" max="100" tabindex="-1" />
		</div>
		<div class="grid grid-cols-[52px_3.5rem_2rem_auto] gap-x-1 pr-4 items-center">
			width:
			<input
				class="w-14 text-center border-2 border-gray-700 rounded-md pl-3"
				type="number"
				bind:value={item.width}
				min="0"
			/>+{item.fragileBuffer ?? 0}
			<input type="range" bind:value={item.width} min="0" max="100" tabindex="-1" />
		</div>
		<div class="grid grid-cols-[52px_3.5rem_2rem_auto] gap-x-1 pr-4 items-center">
			height:
			<input
				class="w-14 text-center border-2 border-gray-700 rounded-md pl-3"
				type="number"
				bind:value={item.height}
				min="0"
			/>+{item.fragileBuffer ?? 0}
			<input type="range" bind:value={item.height} min="0" max="100" tabindex="-1" />
		</div>
		<p>Volumetric: {(item.length * item.width * item.height) / 5000}</p>
		<div>
			Fragile Buffer: <input
				class="w-14 text-center border-2 border-gray-700 rounded-md pl-3"
				type="number"
				bind:value={item.fragileBuffer}
				min="0"
			/>
		</div>
	</div>
</div>
