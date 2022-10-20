<script>
    	/** @type {import('../types').itemType} */ export let item 
	let fragileBuffer = 0;
</script>

<div>
	Item dimensions:
	<div>
		<label>
			length: <input type="number" bind:value={item.length} min="0" /> +{fragileBuffer}
			<input type="range" bind:value={item.length} min="0" max="100" />
		</label>
	</div>
	<div>
		<label
			>width: <input type="number" bind:value={item.width} min="0" />+{fragileBuffer}
			<input type="range" bind:value={item.width} min="0" max="100" />
		</label>
	</div>
	<div>
		<label>
			height: <input type="number" bind:value={item.height} min="0" />+{fragileBuffer}
			<input type="range" bind:value={item.height} min="0" max="100" />
		</label>
	</div>
	<div>Fragile Buffer: <input type="number" bind:value={fragileBuffer} min="0" /></div>
</div>
