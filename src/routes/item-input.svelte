<script>
	/** @type {import('../types').itemType} */ export let item;
</script>

<div>
	Item dimensions:
	<div>
		<label>
			length: <input type="number" bind:value={item.length} min="0" /> +{item.fragileBuffer}
			<input type="range" bind:value={item.length} min="0" max="100"  tabindex="-1"/>
		</label>
	</div>
	<div>
		<label
			>width: <input type="number" bind:value={item.width} min="0" />+{item.fragileBuffer}
			<input type="range" bind:value={item.width} min="0" max="100" tabindex="-1"/>
		</label>
	</div>
	<div>
		<label>
			height: <input type="number" bind:value={item.height} min="0" />+{item.fragileBuffer}
			<input type="range" bind:value={item.height} min="0" max="100" tabindex="-1"/>
		</label>
	</div>
	<p>Volumetric: {(item.length * item.width * item.height) / 5000}</p>
	<div>Fragile Buffer: <input type="number" bind:value={item.fragileBuffer} min="0" /></div>
</div>
