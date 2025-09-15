<script>
  import UnitCard from "./UnitCard.svelte";
  export let display_units, display_techs, researched;
  // not bothering with dock atm
  const buildings = [
    { name: "eco", short: "eco"},
	{ name: "blacksmith", short: "smith"},
    { name: "archery", short: "archery"},
    { name: "barracks", short: "barrak"},
    { name: "stable", short:"stable"},
    { name: "workshop", short: "seige"},
	{ name: "castle", short: "castle"},
	{ name: "university", short: "uni"},
    { name: "monastery", short: "monk"},
  ];
  const onResearched = function(unit) {
    researched(unit);
  }
</script>

<div class="row">
	{#each buildings as building}
		<div class="col">
			<div class="building"><b>{building.short}</b></div>
			{#each display_techs as t}
				<!-- blacksmith tech first -->
				{#if t.building.includes(building.name) && t.type !== "unique"}
					<UnitCard
					onResearched={onResearched}
					info={t}>
					</UnitCard>
				{/if}
			{/each}
			{#each display_units as d}
				{#if d.building === building.name}
					<UnitCard
					onResearched={onResearched}
					info={d}>
					</UnitCard>
				{/if}
			{/each}
			{#each display_techs as t}
				{#if t.building.includes(building.name) && t.type === "unique"}
					<UnitCard
					onResearched={onResearched}
					info={t}>
					</UnitCard>
				{/if}
			{/each}
		</div>
	{/each}
</div>

<style>
  .row {
    display: flex;
	flex-direction: column;
  }
  .col {
    display: flex;
	align-items: flex-start;
    flex: 10%;
  }
  .building {
    display: flex;
    justify-content:flex-end;
	width: 7rem;
  }
</style>