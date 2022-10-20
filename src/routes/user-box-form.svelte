<script>
	/** @type {import('../types').boxType[]} */ export let boxes;
	console.log(boxes);
</script>

<div>
	<p>Boxes</p>
	{#each boxes as box}
		<div class="grid grid-cols-[150px_auto]">
			<p>{box.box_name}</p>
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
