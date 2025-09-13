<script>
  let gameMsecs = 0, gameTime="0:00:00";
  let playback = false;
  let recording = [];
  let recIndex = 0;
  let interval = 0;
  
  function onUpdate(){
    if(playback) return;
    recording.push({t: gameMsecs, code: e.code});
  }
  reset();
  function reset(){
    gameMsecs = 0;
    wood = food = gold = stone = 0;
    recIndex = 0;
    if(interval) clearInterval(interval);
    if(playback){
      interval = setInterval( play, 625);    
    } else {
      recording = [];
      interval = setInterval( record, 625);
    }
  }
  function doTimeInc() {    
    gameMsecs += 625;
    let h,m,s;
    h = Math.floor(gameMsecs/1000/60/60);
    m = Math.floor((gameMsecs/1000/60/60 - h)*60);
    s = Math.floor(((gameMsecs/1000/60/60 - h)*60 - m)*60);
    s < 10 ? s = `0${s}`: s = `${s}`;
    m < 10 ? m = `0${m}`: m = `${m}`;
    gameTime = `${h}:${m}:${s}`;
  }
  function play() {
    doTimeInc();
    while(gameMsecs > recording[recIndex].t) {
      recIndex++;
    }
  }
  function record(){
    doTimeInc();
  }
  function onplay(){
    playback = true;
    reset();
  }
  function onrecord(){
    playback = false;
    reset();
  }
</script>

  <button on:click={reset} >Reset</button>
  <button on:click={onplay}>Play</button>
  <button on:click={onrecord}>Record</button>
  {playback?"playback":"recording"}
  <article>
    Time
    <input class="gametime" type="text" bind:value={gameTime}/>
  </article>

<style>
</style>