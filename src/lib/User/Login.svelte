<script>
	import { login } from '$lib/store';
	import { pb } from '$lib/pocketbase';
	import Home from './Home.svelte';

	let email = '';
	let password = '';
	let error = {
		email: '',
		password: '',
		message: ''
	};

	function getUsername(email) {
		return email.substring(0, email.indexOf('@'));
	}

	async function logIn() {
		try {
			await pb.collection('users').authWithPassword(email, password);
			$login = false;
		} catch (err) {
			error.message = err.message;
		}
	}
	async function signUp() {
		try {
			const data = {
				email,
				password,
				passwordConfirm: password,
				username: getUsername(email)
			};
			const result = await pb.collection('users').create(data);
			await logIn();
		} catch (err) {
			const data = err.originalError.data.data;

			for (var key in data) {
				error[key] = data[key].message;
			}
		}
	}
</script>

<Home />
<div class="outer">
	<form on:submit|preventDefault>
		<input
			class="input"
			placeholder="Email"
			bind:value={email}
			on:keydown={() => {
				error.email = '';
				error.message = '';
			}}
			id="email"
			type="email"
			name="email"
			required
		/>
		{#if error.email !== ''}
			<span class="failed">{error.email}</span>
		{/if}

		<input
			class="input"
			placeholder="Пароль"
			bind:value={password}
			on:keydown={() => {
				error.message = '';
				error.password = '';
			}}
			id="password"
			type="password"
			name="password"
			required
		/>
		{#if error.password !== ''}
			<span class="failed">{error.password}</span>
		{/if}

		{#if error.message !== ''}
			<span class="failed">{error.message}</span>
		{/if}
		<br />
		<button
			class="button"
			disabled={email === '' || password === '' || error.message !== ''}
			type="submit"
			on:click={logIn}>Вход</button
		>
		<button
			class="button"
			disabled={email === '' || password === '' || error.email !== '' || error.password !== ''}
			type="submit"
			on:click={signUp}>Регистрация</button
		>
	</form>
</div>

<style>
	.outer {
		display: flex;
		justify-content: center;
		height: 100vh;
		width: 100%;
		padding-top: 60px;
	}

	form {
		display: flex;
		flex-direction: column;
		width: calc(100vw - 40px);
		min-width: 180px;
		max-width: 250px;
	}

	.failed {
		color: var(--color-red);
		font-size: 10px;
	}

	button {
		width: 100%;
	}
	input::placeholder {
		text-align: center;
	}
</style>
