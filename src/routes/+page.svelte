<script>
	import Edit from './Edit.svelte';
	import { login, edit } from '$lib/store';
	import { upload } from '$lib/image';
	import { profile } from '$lib/pocketbase';
	import Login from '$lib/User/Login.svelte';
	import Profile from '$lib/User/Profile.svelte';
</script>

{#if $login}
	<Login />
{:else if $edit || $upload}
	<Edit />
{:else if $profile}
	<Profile />
{:else}
	<Edit />
{/if}
