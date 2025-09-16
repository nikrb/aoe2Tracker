<script>
	export let value = 0;
	export let label = "none";
	export let ResourceUpdate;

	function onIncrement() {
		ResourceUpdate(label, 1);
	}
	function onDecrement() {
		ResourceUpdate(label, -1);
	}
</script>

<div class="container">
	<div class="res">
		{label}
		<input type="number" bind:value={value} />
	</div>
	<div class="buttons">
		<button on:click={onDecrement}>-</button>
		<button on:click={onIncrement}>+</button>
	</div>
</div>

<style>
	.container {
		display:flex;
		flex-direction: column;
	}
	.buttons {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
	.buttons button {
		font-size: 1rem;
		padding: 0.2em 0.6em;
		text-align: center;
		background-color: skyblue;
		margin-top: 0.2em;
		margin-right: 0.2em;
		border: none;
	}
	.res {
		display: flex;
		flex-direction: column;
	}
	input{
		width: 3em;
		font-size: 1rem;
		padding: 0.5rem;
	}
	.label {
		margin-right: 0.5em;
	}
</style>