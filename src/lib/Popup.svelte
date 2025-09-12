<script>
  export let info, info_index;
</script>


<div class="outer">
  <div>{info.info_list[info_index].name}</div>
  <div class="cost-outer">
    {#if typeof info.info_list[info_index].Cost.Wood !== "undefined"}
      <img src="https://aoe2techtree.net/img/wood.png">
      <span class="cost">{info.info_list[info_index].Cost.Wood}</span>
    {/if}
    {#if typeof info.info_list[info_index].Cost.Food !== "undefined"}
      <img src="https://aoe2techtree.net/img/food.png">
      <span class="cost">{info.info_list[info_index].Cost.Food}</span>
    {/if}
    {#if typeof info.info_list[info_index].Cost.Gold !== "undefined"}
      <img src="https://aoe2techtree.net/img/gold.png">
      <span class="cost">{info.info_list[info_index].Cost.Gold}</span>
    {/if}
    {#if typeof info.info_list[info_index].Cost.stone !== "undefined"}
      <img src="https://aoe2techtree.net/img/stone.png">
      <span class="cost">{info.info_list[info_index].Cost.stone}</span>
    {/if}
  </div>
  {#if info.info_type === "unit"}
      <div>
        HP: {info.info_list[info_index].HP}
        Train: {info.info_list[info_index].TrainTime}
      </div>
      <div>
        Atck: {info.info_list[info_index].Attack}
        Armr: {info.info_list[info_index].MeleeArmor}/
                {info.info_list[info_index].PierceArmor}
      </div>
      <div>
        Range: {info.info_list[info_index].Range}
        {#if info.info_list[info_index].MinRange !== 0}
          (min): {info.info_list[info_index].MinRange}
        {/if}
      </div>
      <div>
        Spd: {info.info_list[info_index].Speed}
        LOS: {info.info_list[info_index].LineOfSight}
      </div>
  {:else}
    <div>
       Research: {info.info_list[info_index].ResearchTime}
    </div>
  {/if}
</div>


<style>
  .outer {
    margin: 5px;
  }
  .cost-outer {
    display: flex;
    justify-content: center;
    padding: 5px;
  }
  .cost-outer>img {
    width: 16px;
  }
  .cost {
    padding: 0 2px;
  }
</style>