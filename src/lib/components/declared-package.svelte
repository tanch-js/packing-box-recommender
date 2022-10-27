<script>
	/** @type {any} */ export let order;
</script>

<div class="">
	<p class="font-semibold">Declared Dimensions</p>
	<div class="border-t-2 border-gray-500 pr-20">
		<div class="flex flex-col gap-y-2">
			<div class="mt-1 pr-4">
				Length:
				{order.ParcelLength}
			</div>
			<div class="pr-4">
				Width:
				{order.ParcelWidth}
			</div>
			<div class="pr-4">
				Height:
				{order.ParcelHeight}
			</div>
			<div class="pr-4">
				Weight:
				{order.ParcelWeight} kg
			</div>
			<p>
				Volumetric: {((order.ParcelLength * order.ParcelWidth * order.ParcelHeight) / 5000).toFixed(
					2
				)} kg
			</p>
		</div>
	</div>
</div>
