<script>
	/** @type {import('../types').boxType[]} */ export let boxes;
</script>

<div>
	<p class="font-semibold">Boxes</p>
	<div class="flex flex-col flex-wrap gap-y-1 overflow-auto max-h-40 border-t-2 border-gray-500">
		{#each boxes as box}
			<div class="grid grid-cols-[120px_auto] border-r px-2">
				<p class="max-w-[120px] truncate">{box.box_name}</p>
				<div class="flex gap-x-1">
					<p>{box.box_length}</p>
					x
					<p>{box.box_width}</p>
					x
					<p>{box.box_height}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
