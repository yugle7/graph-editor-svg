<script>
	import Copy from './Copy.svelte';
	import { profile } from '$lib/pocketbase';
	import Mail from './Mail.svelte';
	import Gold from './Gold.svelte';

	$: to = $profile ? 'User' : 'Share';
</script>

<a href="/">
	<img src="Outline/Communication/{to}.svg" alt={to} />
</a>
<div>
	<p>Будем благодарны любым вашим пожертвованиям.</p>
	<p>Это поможет сделать графический редактор лучше и создать много других полезных приложений.</p>

	<h2>Реквизиты</h2>

	<Copy key="БИК" value="044525974" />
	<Copy key="Номер счета" value="40817810700002123956" />
	<Copy key="Корр. счет" value="30101810145250000974" />

    <Gold />
	<Mail />
</div>

<style>
	div {
		padding: 10px;
		outline: none;
	}
	a {
		position: fixed;
		right: 0;
		padding: 10px;
	}
	
</style>
