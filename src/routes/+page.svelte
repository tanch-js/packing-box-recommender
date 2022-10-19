<script>
	/** @type {import('./$types').PageData} */ export let data;
	import UserBoxForm from './user-box-form.svelte';
</script>

<h1 class="text-red-500">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<UserBoxForm boxes={data.boxes} />
