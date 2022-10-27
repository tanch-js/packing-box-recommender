<script>
	import UserBoxForm from './user-box-form.svelte';
	import { numberOfSolutions } from '@src/stores';

	/** @type {import('@src/types').boxType[]} */ export let boxes;
</script>

<div class="flex flex-col gap-y-4 pb-24">
	<div>
		<UserBoxForm {boxes} />
	</div>
	<div>
		Maximum number of suggestions to show: <input
			class="w-14 text-center border-2 border-gray-400 rounded-md"
			type="number"
			bind:value={$numberOfSolutions}
			min="0"
			max="10"
		/>
	</div>
</div>
