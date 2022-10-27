<script>
	/** @type {import('./$types').PageData} */ export let data;
	import MainApp from './main-app.svelte';
	import Settings from './settings.svelte';

	let numberOfSolutions = 3;
	let selectedTabIndex = 0;
</script>

<svelte:head><title>Packing Box Recommender</title></svelte:head>

<div class="max-w-7xl 2xl:max-w-[96rem] mx-auto mt-24 px-12">
	<div class="grid grid-cols-[repeat(2,100px)] gap-x-0.5 mb-4">
		<label class={selectedTabIndex === 0 ? 'checked' : ''}>
			<input type="radio" bind:group={selectedTabIndex} name="selectedTabIndex" value={0} />
			Main
		</label>
		<label class={selectedTabIndex === 1 ? 'checked' : ''}>
			<input type="radio" bind:group={selectedTabIndex} name="selectedTabIndex" value={1} />
			Settings
		</label>
	</div>
	<div class={selectedTabIndex === 0 ? '' : 'hidden'}>
		<MainApp {numberOfSolutions} boxes={data.boxes} bind:orders={data.orders} />
	</div>
	<div class={selectedTabIndex === 1 ? '' : 'hidden'}>
		<Settings bind:numberOfSolutions boxes={data.boxes} />
	</div>
</div>

<style>
	label {
		user-select: none;
		display: flex;
		gap: 2px;
		justify-content: center;
		background: #e2e8f0;
		color: #64748b;
		border: unset;
		border-radius: 6px;
		padding: 0.75rem 1.5rem;
		cursor: pointer;
	}
	label:hover {
		background: #cbd5e1;
		color: #475569;
	}
	label.checked {
		background: #94a3b8;
		color: #f1f5f9;
	}
	input {
		appearance: none;
	}
</style>
