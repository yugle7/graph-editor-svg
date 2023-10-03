<script>
	import Edit from './Edit.svelte';
	import View from './View.svelte';
	import { edit, login } from '$lib/store';
	import { profile } from '$lib/pocketbase';
	import Login from '$lib/User/Login.svelte';
</script>

{#if $login}
	<Login />
{:else if $edit}
	<Edit />
{:else if $profile}
	<View />
{/if}
