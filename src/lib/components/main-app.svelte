<script>
	import DailyPackages from './daily-packages.svelte';
	/** @type {import('@src/types').boxType[]} */ export let boxes;
	/** @type {any[]} */ export let orders;
</script>

<div class="flex flex-col pb-24">
	<DailyPackages {boxes} bind:orders />
</div>
