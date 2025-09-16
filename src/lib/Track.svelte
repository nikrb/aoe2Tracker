<script>
	// TODO rewind playback transport
	import TechSummary from './TechSummary.svelte';
	import UnitCard from './UnitCard.svelte';
	import htmlTemplate from '../assets/htmlTemplate.txt?raw';
	export let display_units, display_techs;
	let message_id = 0;
	let messageq = [];
	let wood = 0, food = 0, gold = 0, stone = 0;
	let startTime, gameMsecs, gameTime="0:00:00";
	let playback = false;
	let recording = [];
	let recIndex = 0;
	// interval for playback or recording
	let interval = 0;
	let techText = "";
	let ages_info = {
		info_type: "age",
		researched: 0,
		available: 3,
		info_list: [
		{type: "ages", name: "Feudal Age", id: "feudal_age_de", Cost: {Food: 500}, ResearchTime: 130},
		{type: "ages", name: "Castle Age", id: "castle_age_de", Cost: {Food: 800, Gold: 200}, ResearchTime: 160},
		{type: "ages", name: "Imperial Age", id: "imperial_age_de", Cost: {Food: 1000, Gold: 800}, ResearchTime: 190},
		]
	};
	
	reset();
	function reset(){
		techText = "";
		startTime = Date.now();
		gameMsecs = 0;
		wood = food = gold = stone = 0;
		ages_info.researched = 0;
		clearTimeout( ages_info.timeout);
		ages_info.timeout = 0;

		display_units.forEach(e => e.researched = 0);
		display_techs.forEach(e => e.researched = 0);
		recIndex = 0;

		display_units.forEach(e => {
			if(e.research_timeout) clearTimeout(e.research_timeout);
			e.research_timeout = 0;
			if(e.text_timeout) clearTimeout(e.text_timeout);
			e.text_timeout = 0;
		});
		display_techs.forEach(e => {
			if(e.research_timeout) clearTimeout(e.research_timeout);
			e.research_timeout = 0;
			if(e.text_timeout) clearTimeout(e.text_timeout);
			e.text_timeout = 0;
		});
		if(interval) clearInterval(interval);
		interval = 0;

		// nbmk: do we need all these to force update?
		ages_info = ages_info;
		display_units = display_units;
		display_techs = display_techs;
	}
	function startPlayback(){
		interval = setInterval( play, 625);    
	}
	function startRecording(){
		reset();
		recording = [];
		interval = setInterval( record, 625);
	}
	function doTimeInc() {  
		if( playback) {
		// fast forward adjusts gameMsecs
			gameMsecs += 625;
		} else {
		// attempt to sync with game time, doesn't work though, still gain
			gameMsecs = (Date.now() - startTime) * 1.7;
		} 
		let h,m,s;
		h = Math.floor(gameMsecs/1000/60/60);
		m = Math.floor((gameMsecs/1000/60/60 - h)*60);
		s = Math.floor(((gameMsecs/1000/60/60 - h)*60 - m)*60);
		s < 10 ? s = `0${s}`: s = `${s}`;
		m < 10 ? m = `0${m}`: m = `${m}`;
		gameTime = `${h}:${m}:${s}`;
	}
	function clearTechText(unit){
		unit.text_timeout = 0;
		techText = "";
	}
	function play() {
		doTimeInc();
		if( recIndex < recording.length ) {
			while(recIndex < recording.length && gameMsecs > recording[recIndex].t) {
				if(recording[recIndex].type === "key")
					keyUpdate(recording[recIndex].code, recording[recIndex].count);
				else {
					clearTimeout(unit.text_timeout);
					const unit = recording[recIndex].code;
					techText = unit.info_list[unit.researched].name;
					unit.text_timeout = setTimeout(clearTechText, 2000, unit);

					const delay = unit.info_list[unit.researched].ResearchTime * 1000;
					unit.research_timeout = setTimeout(onResearchFinished, delay, unit);

					if( unit.researched < unit.available-1) unit.researched++;

					// nbmk: do we need all these to force update?
					ages_info = ages_info;
					display_units = display_units;
					display_techs = display_techs;
				}
				recIndex++;
			}
		} else {
			clearInterval(interval);
			interval = 0;
		}
	}
	function timeForward(){ 
		gameMsecs = recording[recIndex].t;
	}
	function timeBackward(){
		// TODO nope!
		recIndex = recIndex?recIndex-1:0;
		gameMsecs = recording[recIndex].t;
	}
	function record(){
		doTimeInc();
	}
	function onplay(){
		playback = true;
		reset();
		startPlayback();
	}
	function onrecord(){
		playback = false;
		startRecording();
	}
	function keyUpdate(code, count = 1){
		switch(code) {
		case 'KeyA':
			wood += count;
			break;
		case 'KeyS':
			food += count;
			break;
		case 'KeyD':
			gold += count;
			break;
		case 'KeyF':
			stone += count;
			break;
		case 'KeyZ':
			wood -= count;
			if( wood < 0) wood = 0;
			break;
		case 'KeyX':
			food -= count;
			if( food < 0) food = 0;
			break;
		case 'KeyC':
			gold -= count;
			if( gold < 0) gold = 0;
			break;
		case 'KeyV':
			stone -= count;
			if( stone < 0) stone = 0;
			break;
		}
	}
	function onkeyDown(e){
		if(playback) return;
		if( e.shiftKey && recording.length > 0){
			// add the increment to the last entry
			const t = recording[recording.length-1];
			t.count++;
		} else {
			recording.push({t: gameMsecs, type:"key", code: e.code, count:1});
		}
		keyUpdate(e.code, 1);
	}
	function onResearchFinished(unit) {
		unit.research_timeout = 0;
		techText = unit.info_list[unit.researched-1].name+" finished";
		unit.text_timeout = setTimeout(clearTechText, 2000, unit);
	}
	function researched(unit) {
		if(playback) return;

		clearTimeout(unit.research_timeout);
		
		clearTimeout(unit.text_timeout);
		unit.text_timeout = 0;

		const delay = unit.info_list[unit.researched].ResearchTime * 625;
		unit.research_timeout = setTimeout(onResearchFinished, delay, unit);
		if( unit.researched++ > unit.available-1) unit.researched = 0;
		// we could check info_type and just assign one, but is it worth it?
		ages_info = ages_info;
		display_units = display_units;
		display_techs = display_techs;
		recording.push({t: gameMsecs, type:"research", code: unit});
	}

	function generateReport(){
		console.log("Recording length:", recording.length);
		let report = htmlTemplate;
		reset();
		recording.forEach(e => {
			if(e.type === "key"){
				keyUpdate(e.code, e.count);
				report += `<div></div><div>${wood}</div> <div>${food}</div> <div>${gold}</div> <div>${stone}</div>\n`;
			}
			else if(e.type === "research") {
				report += `<div>${e.code.info_list[e.code.researched].name}</div><div></div><div></div><div></div><div></div>\n`;
			}
		});
		report += "</div>\n</body>\n</html>\n";
		return report;
	}
	function saveReport(text) {
		const blob = new Blob([text], { type: "text/plain" });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = "report.html";
		a.click();

		URL.revokeObjectURL(url);
	}
	function onReport() {
		const text = generateReport();
		saveReport(text);
	}
</script>

<svelte:window on:keydown={onkeyDown}/>
<main>
  <button on:click={reset} >Reset</button>
  <button on:click={onplay}>Play</button>
  <button on:click={onrecord}>Record</button>
  {playback?"playback":"recording"}
  <button on:click={onReport}>Report</button>
  <article class="timer">
    Time
    <input class="gametime" type="text" bind:value={gameTime}/>
    {#if playback}
      <!-- <button on:click={timeBackward} class="transport-button">{"<"}</button> -->
      <button on:click={timeForward} class="transport-button">></button>
    {/if}
    <!-- <label class:fadeit={techText !== ""}>{techText}</label> -->
    {techText}
  </article>
  <article>
  <div class="res">
    age
    <UnitCard
      onResearched={researched}
      info={ages_info}>
    </UnitCard>
  </div>
  <div class="res">
    wood
    <input type="number" bind:value={wood} />
  </div>
  <div class="res">
    food
    <input type="number" bind:value={food} />
  </div>
  <div class="res">
    gold
    <input type="number" bind:value={gold} />
  </div>
  <div class="res">
    stone
    <input type="number" bind:value={stone} />
  </div>
  </article>
  <div>
    <TechSummary 
      researched={researched}
      display_units={display_units} 
      display_techs={display_techs} />
  </div>
</main>

<style>
  article {
    display: flex;
  }
  .timer {
    margin: 10px 0 5px 0;
  }
  label {
    opacity: 1;
  }
  label.fadeit {
    opacity: 0;
    transition: opacity 2s ease;
  }
  .transport-button {
    padding: 2px 6px;
  }
  .gametime{
    padding: 0 5px;
    width: 4em;
    border-style: none;
  }
  .res {
    display: flex;
    flex-direction: column;
    padding: 0 1em;
  }
  input{
    /* width: 3em; */
	font-size: 2rem;
	padding: 1rem;
  }
</style>