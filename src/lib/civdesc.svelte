<script>
  import TechSummary from './TechSummary.svelte';
  import Popup from './Popup.svelte';
  export let changeCiv, civnames, toggleClick;
  let selected = "Aztecs";

  let civdesc;
  let display_units;
  let display_techs;
  let display_unique;
  let show_unique = false;

  const toggle = () => {
    if( toggleClick) show_unique = !show_unique;
  };
  const show = () => {
    if( !toggleClick) show_unique = true;
  };
  const hide = () => {
    if( !toggleClick) show_unique = false;
  };

  const changeMyCiv = (() => {
    const ret  = changeCiv(selected);
    civdesc = ret.civdesc;
    display_units = ret.display_units;
    display_techs = ret.display_techs;
    display_unique = ret.display_unique;
  });
  changeMyCiv();
</script>

<div class="civcount">
  <select bind:value={selected} on:change="{changeMyCiv}" >
    {#each civnames as civname}
      <option value={civname}>
        {civname}
      </option>
    {/each}
  </select>
</div>
<div on:click={toggle} on:mouseenter={show} on:mouseleave={hide}>
  {@html civdesc}
</div>
<div class="popup-outer">
  {#if show_unique}
    <div class="popup">
      <div class="row">
        <img src="{'https://aoe2techtree.net/img/Units/'+
                   display_unique.castle.info.info_list[0].ID+'.png'}"
                   alt="castle UU">
        <img src="{'https://aoe2techtree.net/img/Units/'+
                   display_unique.imperial.info.info_list[0].ID+'.png'}"
                   alt="imperial UU">
       </div>
       <div class="row">
        <Popup info="{display_unique.castle.info}" info_index="{0}"/>
        <Popup info="{display_unique.imperial.info}" info_index="{0}"/>
      </div>
    </div>
  {/if}
</div>
<div class="summary">
  <TechSummary display_units="{display_units}" display_techs="{display_techs}"/>
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