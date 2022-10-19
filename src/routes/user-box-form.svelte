<script>
	export let boxes;
	console.log(boxes);
</script>

<div>
	<p>Boxes</p>
	{#each boxes as box}
		<div class="flex">
			<p>{box.box_name}</p>
			<p>{box.box_length}</p>
			x
			<p>{box.box_width}</p>
			x
			<p>{box.box_height}</p>
		</div>
	{/each}
</div>
