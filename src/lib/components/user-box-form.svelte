<script>
	/** @type {import('@src/types').boxType[]} */ export let boxes;
</script>

<div>
	<p class="font-semibold">Boxes</p>
	<div class="flex flex-col flex-wrap gap-y-1 overflow-auto max-h-40 border-y-2 border-gray-500">
		{#each boxes as box}
			<div class="grid grid-cols-[120px_auto] border-r px-2">
				<p class="max-w-[120px] truncate">{box.box_name}</p>
				<div class="flex gap-x-1">
					<p>{box.box_length}</p>
					x
					<p>{box.box_width}</p>
					x
					<p>{box.box_height}</p>
				</div>
			</div>
		{/each}
	</div>
	<div class="mt-4">
		<p class="font-semibold">Steps to update boxes</p>
		<ol class="list-decimal">
			<li>
				Go to <a
					class="text-blue-500"
					href="https://www.justship.sg/dashboard/profile"
					target="_blank"
					rel="noopener noreferrer">JustShip my profile page</a
				>
			</li>
			<li>Login with username: csops@justship.sg, <br />password: same as justship staff pw</li>
			<li>Add/update boxes using the form</li>
		</ol>
	</div>
</div>
