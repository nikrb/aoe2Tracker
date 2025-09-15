<script>
  // TODO we lose the second tooltip on second dot when first is red
  import Popup from './Popup.svelte';
  export let info, onResearched;
  let show_info = false;
  let info_index = 0;

  const show = (i) => { show_info = true; info_index = i; };
  const hide = () => show_info = false;
  // units Attack, HP, LineOfSight, MeleeArmor, PierceArmor, Range, MinRange, TrainTime
  // techs ResearchTime, 
  function onClick(){
    onResearched(info);
  }
  function dummyKeydown(){}
</script>

<div class="col" on:click={onClick} on:keydown={dummyKeydown}>
<div class="popup-container" >
  <div class="icons">
    <img src="{'https://aoe2techtree.net/img/'+
                info.info_type.replace(/\S/, (s)=>s.toUpperCase())+'s/'+
                info.info_list[
                  info.researched < info.available-1?info.researched:info.available-1
                ].id+
                '.png' }"
                alt="unit pic">
  </div>
  <div class="row">
    {#each Array(info.researched) as _, i}
      <div class="dotred"
        on:mouseenter={() => show(i)}
        on:mouseleave={hide}
        >
      </div>
    {/each}
    {#each Array(info.available - info.researched) as _, i}
      <div class="dot"
        on:mouseenter={() => show(i)}
        on:mouseleave={hide}
        >
      </div>
    {/each}
    {#if show_info}
      <div class="popup">
        <Popup info={info} info_index={info_index}/>
      </div>
    {/if}
  </div>
</div>
</div>


<style>
  img {
    width: 32px;
  }
  .icons {
    /* there's an extra 4px height coming from somewhere! */
    height: 32px;
  }
  /* thanks w3schools */
  .dot {
    height: 5px;
    width: 5px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
  }
  .dotred {
    height: 5px;
    width: 5px;
    background-color: #f00;
    border-radius: 50%;
    display: inline-block;
  }
  .row {
    display: flex;
    justify-content: center;
    height: 10px;
    align-items: center;
  }
  .col {
    display: flex;
    flex-direction: column;
    margin: 0 2px;
    cursor: pointer;
  }
  .popup-container {
    position: relative;
  }
  .popup {
    width: 150px;
    bottom: 10px;
    position: absolute;
    z-index: 100;
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 0.5em;
    font-size: 0.8em;
  }
</style>