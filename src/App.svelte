<script>
  // track villager allocation and techs through time
  // TODO we're losing time - maybe include a slider to adjust the timer?
  // TODO playback pause and speed control
  // TODO save recordings?
  import units_of_interest from './lib/aoe2uoi.js';
  import techs_of_interest from './lib/aoe2toi.js';
  import Track from './lib/Track.svelte';
  import Civlist from './lib/civlist.svelte';

  let load_complete = false;
  let aoe2data = null;
  let aoe2strings = null;
  let civcount = 1;
  // detail popups hover or click
  let display_units;
  let display_techs;
  let display_unique;
  let civnames;

function populateCivNames(){
	civnames = Object.keys(aoe2data.civ_names);
}

function changeCiv(selected) {
	const civdescid = aoe2data.civ_helptexts[selected];
	const civdesc = aoe2strings[civdescid];
	// don't think we mutate units_of_interest, so shouldn't need this
	const uoi = units_of_interest.slice();
	const civ_units = aoe2data.techtrees[selected]["units"];
		
	// civ_units is now and array of objects {age, id}
	// const unit_ids = uoi.filter(t=>civ_units.includes(t.id));
	const unit_ids = uoi.filter(u => civ_units.map(unit => unit.id).includes(u.id));

	const toi = techs_of_interest.slice();
	const civ_techs = aoe2data.techtrees[selected]["techs"];
	// civ techs is now an array of object {age, id}
	// const tech_ids = toi.filter(t=>civ_techs.includes(t.id));
	const tech_ids = toi.filter(t => civ_techs.map(tech => tech.id).includes(t.id));
	
	const unit_detail = unit_ids.map(t => ({...t, ...aoe2data.data.units[t.id]
	, name: aoe2strings[aoe2data.data.units[t.id].LanguageNameId]
	}));

	const tech_detail = tech_ids.map(t=> ({...t, ...aoe2data.data.techs[t.id]
	, name: aoe2strings[aoe2data.data.techs[t.id].LanguageNameId]
	}));
	
	const unique_unit = aoe2data.techtrees[selected]["unique"];
	const castle_unit = aoe2data.data.units[unique_unit.castleAgeUniqueUnit];
	const castle_name = aoe2strings[castle_unit.LanguageNameId];
	const imperial_unit = aoe2data.data.units[unique_unit.imperialAgeUniqueUnit];
	const imperial_name = aoe2strings[imperial_unit.LanguageNameId];
	display_unique = {
	'castle': {
		info: {
		info_index:0,
		info_type: "unit",
		info_list: [{...castle_unit, name: castle_name}]
		}
	},
	'imperial': {
		info: {
		info_index:0,
		info_type: "unit",
		info_list: [{...imperial_unit, name: imperial_name}]
		}
	}
	};

	/*
	{
		we gonna have basic unit image with dots underneath showing
		the units available, e.g. archer, xbow, arbalester
		room for 5 dots? image counts as first dot, up to 4 following (for barracks swordsman)
		TODO: If you hover over the dots, you see the unit stats
	unit_detail
	available - number 1 to 4
	}
*/
	
	// TODO: remove next, not used
	// TODO: remove available - we can count info_list
	display_units = unit_detail.reduce((acc, cur)=>{
	if(acc.length === 0) return [{...cur, available: 1, info_type: "unit", next: true, info_list:[cur]}];
	const last = acc[acc.length-1];
	if( last.type === cur.type) {
		last.available += 1;
		last.info_list = last.info_list.concat(cur);
		return acc;
	}
	return [...acc, {
		...cur, 
		available:1,
		info_type: "unit",
		info_list:[cur],
		next: last.building !== cur.building?true:false,
	}];
	}, []);
	display_techs = tech_detail.reduce((acc, cur) => {
	if( acc.length === 0) return [{...cur, available: 1, info_type: "tech", info_list: [cur]}];
	const last = acc[acc.length-1];
	if( last.building === cur.building && last.type !== "unique" && last.type === cur.type ) {
		last.available += 1;
		last.info_list = last.info_list.concat(cur);
		return acc;
	}
	return [...acc, {
		...cur,
		available: 1,
		info_type: "tech",
		info_list: [cur],
	}];
	}, []);
	return {civdesc, display_units, display_techs, display_unique};
};


const aoe2_strings_fetch = fetch('https://raw.githubusercontent.com/SiegeEngineers/aoe2techtree/master/data/locales/en/strings.json')
	.then(response => response.json())
	.then(data => {
		aoe2strings = data;
	})
	.catch(error => console.error('Error fetching strings:', error));

const aoe2_data_fetch = fetch('https://raw.githubusercontent.com/SiegeEngineers/aoe2techtree/master/data/data.json')
	.then(response => response.json())
	.then(data => {
		// Do something with the JSON data
		aoe2data = data;
		populateCivNames();
		// This just boots us - civ is actually set in civdesc.svelte
		changeCiv("Aztecs");
	})
	.catch(error => console.error('Error fetching JSON:', error));

Promise.all([aoe2_strings_fetch, aoe2_data_fetch])
	.then(() => {
		load_complete = true;
	});
  // changeCiv("Aztecs");
	// $: console.log('Changed selected:', selected);
</script>

{#if load_complete}
	<main>
		<div>
			<Civlist changeCiv={changeCiv} civnames={civnames}/>
		</div>
		<div>
			<Track display_units={display_units} display_techs={display_techs} />
		</div>
	</main>
{:else}
	<p>Loading...</p>
{/if}

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  main {
    text-align: center;
    padding: 0;
    margin: 0 auto;
  }
  @media (min-width: 480px) {
    p {
      max-width: none;
    }
  }
</style>
