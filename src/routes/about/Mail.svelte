<script>
	import { pb, profile } from '$lib/pocketbase';
	let disabled = true;

	let input;
	let mail;

	function isEdit() {
		let m = mail.text.toLowerCase().replace(/[^a-zа-я]/g, '');
		let i = input.innerText.toLowerCase().replace(/[^a-zа-я]/g, '');

		return m.includes(i) || i.includes(m);
	}

	async function send() {
		if (!disabled) {
			if (mail && isEdit()) {
				mail = await pb.collection('mails').update(mail.id, {
					text: input.innerText,
					read: false,
					author: $profile.id
				});
			} else {
				mail = await pb.collection('mails').create({
					text: input.innerText,
					read: false,
					author: $profile.id
				});
			}
			disabled = true;
		}
	}

	function handleInput() {
		disabled = input.innerText === '' || input.innerText === mail?.text;
	}

	function handlePaste(event) {
		input.innerText += event.clipboardData.getData('text/plain');
	}
</script>

<form on:submit|preventDefault={send}>
	<div
		role="textbox"
		tabindex="0"
		on:paste|preventDefault={handlePaste}
		class="input"
		contenteditable="true"
		data-placeholder="Предложение или пожелание"
		bind:this={input}
		on:input={handleInput}
	/>
	<span>
		{#if disabled}
			{#if input?.innerText !== ''}
				Отправлено
			{/if}
		{:else}
			Черновик
		{/if}
		<button  {disabled} type="submit">
			<img src="Outline/Communication/Send.svg" alt="send" />
		</button>
	</span>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		background: var(--color-0);
		width: 100%;
		gap: 5px;
	}

	span {
		margin-left: auto;
		display: flex;
		flex-direction: row;
		gap: 10px;
		align-items: center;
		color: var(--color-3);
	}

	div:empty:before {
		content: attr(data-placeholder);
		color: var(--color-2);
	}
	div {
		width: 100%;
		outline: none;
		min-height: 100px;
		font-size: var(--font-1);
	}
</style>
