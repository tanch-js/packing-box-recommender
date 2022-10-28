<script>
	import RecommenderControls from './recommender-controls.svelte';
	/**  @type {number }*/ export let i;
	/** @type {import('@src/types').boxType[]} */ export let boxes;
	/** @type {any} */ export let order;
	let tabOpen = false;
</script>

<tr
	class={`cursor-pointer ${tabOpen ? 'bg-gray-300' : 'hover:bg-gray-200 '}`}
	on:click={() => {
		tabOpen = !tabOpen;
	}}
>
	<td class="text-center">{i + 1}</td>
	<td class="text-center">{order.PackageID}</td>
	<td class="">
		{#if order.NeedsFragilePacking}
			<span class="rounded-md bg-gray-500 text-white font-medium py-1 px-2">Frag Pack</span>
		{:else}
			<span class="rounded-md bg-gray-500 text-white font-medium py-1 px-2">Pack</span>
		{/if}
	</td>
	<td>{order.SenderName}</td>
	<td>{order.RecName}</td>
	<td>{order.RecCountry}</td>
	<td>${order.ItemTotalPrice}</td>
	<td class="text-center">{order.IsInsured ? '✔️' : ''}</td>
	<td style="min-width:260px;max-width:360px">{order.CustomerRemarks}</td>
	<td class="text-center">{order.TrackingNo ?? ''}</td>
</tr>
<tr class={tabOpen ? '' : 'hidden'}>
	<td class="" colspan="10">
		<div class="py-2">
			{#if order.images.length === 0}
				<p>No Image Found</p>
			{:else}
				<div class="max-w-full overflow-auto image-grid">
					{#each order.images as image}
						<div class="w-60 h-[15.5rem]">
							<img
								class="object-contain w-60 h-60"
								src={image}
								alt="request timed-out, if situation persists, please let the admin know"
								loading="lazy"
							/>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</td>
</tr>
<tr class={tabOpen ? '' : 'hidden'}>
	<td colspan="10" class="bg-slate-100">
		<div>
			<RecommenderControls {order} {boxes} />
		</div>
	</td>
</tr>

<style>
	.image-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, 15rem);
		gap: 1.5rem;
	}

	td {
		border-width: 1px;
		padding: 0.45rem 0.5rem;
		border-color: rgb(107 114 128);
	}
</style>
