<script>
	import { onMount } from 'svelte';
	import PackageDetails from './package-details.svelte';

	/** @type {import('@src/types').boxType[]} */ export let boxes;
	/** @type {any[]} */ export let orders;
	let isFetching = false;
	let fetchError = false;

	const getAndSetPackageImages = async () => {
		isFetching = true;
		fetchError = false;
		try {
			const response = await fetch('/api/get-package-images', { method: 'GET' });
			/** @type {import('@src/types').pickupDataType[]}  */ const data = await response.json();
			orders = orders.map((order) => {
				const pickupData = data.find(({ name, orderID }) => {
					return (
						order.SenderName.toLowerCase().includes(name.toLowerCase()) || orderID == order.OrderID
					);
				});
				return { ...order, images: pickupData ? pickupData.images : [] };
			});
		} catch (err) {
			fetchError = true;
		} finally {
			isFetching = false;
		}
	};

	// onMount(async () => {
	// 	await getAndSetPackageImages();
	// });
</script>

<div>
	<div class="flex items-center justify-between mb-0.5">
		<div class="flex items-center gap-x-10">
			<p class="font-semibold">Daily Packages to Pack ({orders.length})</p>
			<button
				class="border rounded-md bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-wait text-white p-2"
				on:click={getAndSetPackageImages}
				disabled={isFetching}
			>
				{#if isFetching}
					Fetching Images...
				{:else}
					Fetch Images
				{/if}
			</button>
		</div>
	</div>
	<div class="border-t border-gray-500">
		<table class="text-sm table-auto w-full">
			<thead class="">
				<tr>
					<th>S/N</th>
					<th>PackageID</th>
					<th>Packing</th>
					<th>Sender</th>
					<th>RecName</th>
					<th>RecCountry</th>
					<th>DeclaredValue</th>
					<th>Insured</th>
					<th>OrderRemarks</th>
					<th>Tracking Num</th>
				</tr>
			</thead>
			<tbody>
				{#each orders as order, i (order.PackageID)}
					<PackageDetails {order} {i} {boxes} {fetchError} {isFetching} />
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	th {
		border-width: 1px;
		padding: 0.45rem 0.5rem;
		border-color: rgb(107 114 128);
	}
</style>
