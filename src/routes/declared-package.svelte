<script>
	/** @type {any} */ export let order;
</script>

<div class="mt-4">
	<p class="font-semibold">Declared Package Dimensions</p>
	<div class="border-t-2 border-gray-500">
		<div class="flex flex-col gap-y-2 w-[50%]">
			<div class="grid grid-cols-[54px_4rem_1.5rem_auto] gap-x-1 mt-1 pr-4 items-center">
				Length:
				{order.ParcelLength}
			</div>
			<div class="grid grid-cols-[54px_4rem_1.5rem_auto] gap-x-1 pr-4 items-center">
				Width:
				{order.ParcelWidth}
			</div>
			<div class="grid grid-cols-[54px_4rem_1.5rem_auto] gap-x-1 pr-4 items-center">
				Height:
				{order.ParcelHeight}
			</div>
			<div class="grid grid-cols-[54px_4rem_1.5rem] gap-x-1 pr-4 items-center">
				Weight:
				{order.ParcelWidth}kg
			</div>
			<p>
				Volumetric: {((order.ParcelLength * order.ParcelWidth * order.ParcelHeight) / 5000).toFixed(
					2
				)} kg
			</p>
		</div>
	</div>
</div>
