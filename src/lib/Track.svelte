<script>
	// TODO rewind playback transport
	// each unit and tech has its own timeouts, research and text.
	// the research timeout triggers research completion and displays text
	// the text timeout is for 2 seconds and clears the research finished text
	// units are actually unit tech upgrades, e.g. archer -> crossbowman
	import TechSummary from './TechSummary.svelte';
	import UnitCard from './UnitCard.svelte';
	import htmlTemplate from '../assets/htmlTemplate.txt?raw';
	import Counter from './Counter.svelte';
	export let display_units, display_techs;
	let message_id = 0;
	let messageq = [];
	let wood = 0, food = 0, gold = 0, stone = 0;
	let startTime, gameMsecs, gameTime="0:00:00";
	let state = "stopped";
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

	const GAME_SECOND = 588; // ms
	
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

		clearTimeout(ages_info.research_timeout);
		clearTimeout(ages_info.text_timeout);
		ages_info.research_timeout = 0;
		ages_info.text_timeout = 0;

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
		state = "playback";
		reset();
		interval = setInterval( play, GAME_SECOND);    
	}
	function startRecording(){
		state = "record";
		reset();
		recording = [];
		interval = setInterval( record, GAME_SECOND);
	}
	function formatTime(msecs){
		let h,m,s;
		h = Math.floor(msecs/1000/60/60);
		m = Math.floor((msecs/1000/60/60 - h)*60);
		s = Math.floor(((msecs/1000/60/60 - h)*60 - m)*60);
		s < 10 ? s = `0${s}`: s = `${s}`;
		m < 10 ? m = `0${m}`: m = `${m}`;
		return `${h}:${m}:${s}`;
	}
	function getGameTimestamp() {
		gameMsecs = (Date.now() - startTime) * 1.7;
		return gameMsecs;
	}
	function doTimeInc() {  
		if( state === "playback") {
			// fast forward adjusts gameMsecs
			gameMsecs += GAME_SECOND;
		} else {
			gameMsecs = getGameTimestamp();
		}
		gameTime = formatTime(gameMsecs);
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
		startPlayback();
	}
	function onrecord(){
		startRecording();
	}
	function keyUpdate(code, count){
		switch(code) {
			case 'KeyA':
			case 'KeyZ':
				wood += count;
				break;
			case 'KeyS':
			case 'KeyX':
				food += count;
				break;
			case 'KeyD':
			case 'KeyC':
				gold += count;
				break;
			case 'KeyF':
			case 'KeyV':
				stone += count;
				break;
		}
		if( wood < 0) wood = 0;
		if( food < 0) food = 0;
		if( gold < 0) gold = 0;
		if( stone < 0) stone = 0;
	}
	function getKeyCodeFromLabel(label, amount){
		let keycode = null;
		switch(label) {
			case 'wood':
				keycode = amount > 0 ? 'KeyA' : 'KeyZ';
				break;
			case 'food':
				keycode = amount > 0 ? 'KeyS' : 'KeyX';
				break;
			case 'gold':
				keycode = amount > 0 ? 'KeyD' : 'KeyC';
				break;
			case 'stone':
				keycode = amount > 0 ? 'KeyF' : 'KeyV';
				break;
			default:
				break;
		}
		return keycode;
	}
	function recordUpdate(code, amount){
		const ts = getGameTimestamp();
		if (recording.length > 0 &&
				ts - recording[recording.length-1].last_update < 5000 &&
				recording[recording.length-1].code === code ){
			recording[recording.length-1].count += amount;
			recording[recording.length-1].last_update = ts;
		} else {
			recording.push({t: ts, type:"key", code: code, count: amount, last_update: ts});
		}
	}
	function ResourceUpdate(label, amount){
		if( state === "playback") return;
		const keycode = getKeyCodeFromLabel(label, amount);
		recordUpdate(keycode, amount);
		keyUpdate(keycode, amount);
	}
	function onkeyDown(e){
		if(state === "playback") return;
		let dv = -1;
		if( ['KeyA', 'KeyS', 'KeyD', 'KeyF'].includes(e.code)) dv = 1;
		recordUpdate(e.code, dv);
		keyUpdate(e.code, dv);
	}
	function onResearchFinished(unit) {
		unit.research_timeout = 0;
		clearTimeout(unit.text_timeout);
		techText = unit.info_list[unit.researched-1].name+" finished";
		unit.text_timeout = setTimeout(clearTechText, 2000, unit);
	}
	function researched(unit) {
		if(state === "playback") return;

		clearTimeout(unit.research_timeout);

		clearTimeout(unit.text_timeout);
		unit.text_timeout = 0;

		const delay = unit.info_list[unit.researched].ResearchTime * GAME_SECOND;
		unit.research_timeout = setTimeout(onResearchFinished, delay, unit);
		if( unit.researched++ > unit.available-1) unit.researched = 0;
		// we could check info_type and just assign one, but is it worth it?
		ages_info = ages_info;
		display_units = display_units;
		display_techs = display_techs;
		recording.push({t: gameMsecs, type:"research", code: unit});
	}

	function generateReport(){
		let report = htmlTemplate;
		recording.forEach(e => {
			if(e.type === "key"){
				keyUpdate(e.code, e.count);
				report += `<div>${formatTime(e.t)}</div><div>${wood}</div> <div>${food}</div> <div>${gold}</div> <div>${stone}</div>\n`;
			}
			else if(e.type === "research") {
				report += `<div>${formatTime(e.t)}-${e.code.info_list[e.code.researched].name}</div><div></div><div></div><div></div><div></div>\n`;
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
		reset();
		const text = generateReport();
		saveReport(text);
	}
</script>

<svelte:window on:keydown={onkeyDown}/>
<main>
	<button on:click={reset} >Reset</button>
	<button on:click={onplay}>Play</button>
	<button on:click={onrecord}>Record</button>
	{state}
	<button on:click={onReport}>Report</button>
	<article class="timer">
		Time
		<input class="gametime" type="text" bind:value={gameTime}/>
		{#if state === "playback"}
			<!-- <button on:click={timeBackward} class="transport-button">{"<"}</button> -->
			<button on:click={timeForward} class="transport-button">></button>
		{/if}
		<!-- <label class:fadeit={techText !== ""}>{techText}</label> -->
		{techText}
	</article>
  	<article>
		<div>
			age
			<UnitCard
				onResearched={researched}
				info={ages_info}>
			</UnitCard>
		</div>
	</article>
	<div class="counter-container">
		<Counter bind:value={wood} label="wood" {ResourceUpdate}/>
		<Counter bind:value={food} label="food"  {ResourceUpdate}/>
		<Counter bind:value={gold} label="gold"  {ResourceUpdate}/>
		<Counter bind:value={stone} label="stone"  {ResourceUpdate}/>
	</div>
	<div>
		<TechSummary 
			researched={researched}
			display_units={display_units} 
			display_techs={display_techs} 
		/>
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
  .counter-container {
	display: flex;
	justify-content: center;
	gap: 1em;
	margin-bottom: 1em;
  }
</style>