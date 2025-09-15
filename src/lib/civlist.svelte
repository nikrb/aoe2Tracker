<script>
  export let changeCiv, civnames;
  let selected = "Armenians";

  let civdesc;

const changeMyCiv = (() => {
	changeCiv(selected);
});
function init(el){
    el.focus()
}

</script>

<div class="civcount">
  <select bind:value={selected} on:change={changeMyCiv} use:init >
    {#each civnames as civname}
      <option value={civname}>
        {civname}
      </option>
    {/each}
  </select>
</div>

<style>
  .civcount {
    margin: 1em;
  }
  .popup-outer {
    display: relative;
  }
  .popup {
    position: absolute;
    z-index: 100;
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 0.5em;
    font-size: 0.8em;
  }
  .row {
    display: flex;
    justify-content: space-around;
  }
  .summary {
    margin-top: 1em;
  }
</style>