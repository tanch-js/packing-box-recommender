<script>
	import PackageDetails from './package-details.svelte';

	/** @type {import('@src/types').boxType[]} */ export let boxes;
	/** @type {any[]} */ export let orders;

</script>

<div>
	<div class="flex items-center justify-between mb-0.5">
		<div class="flex items-center gap-x-10">
			<p class="font-semibold">Daily Packages to Pack ({orders.length})</p>
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
					<PackageDetails {order} {i} {boxes} />
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
