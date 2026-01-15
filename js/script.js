(function(){
  const display = document.getElementById('display');
  const startBtn = document.getElementById('startBtn');
  const lapBtn = document.getElementById('lapBtn');
  const resetBtn = document.getElementById('resetBtn');
  const lapsOl = document.getElementById('laps');

  let startTime = 0;
  let elapsed = 0; // ms
  let timerId = null;
  let running = false;
  let laps = [];

  function format(ms){
    const totalCentis = Math.floor(ms/10);
    const centis = totalCentis % 100;
    const totalSecs = Math.floor(totalCentis/100);
    const secs = totalSecs % 60;
    const mins = Math.floor(totalSecs/60);
    return `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}.${String(centis).padStart(2,'0')}`;
  }

  function tick(){
    const now = performance.now();
    elapsed = now - startTime;
    display.textContent = format(elapsed);
  }

  function start(){
    if(running) return;
    running = true;
    startTime = performance.now() - elapsed;
    timerId = setInterval(tick, 31); // ~30fps update (good balance)
    startBtn.textContent = 'Stop';
    lapBtn.disabled = false;
    resetBtn.disabled = true;
  }

  function stop(){
    if(!running) return;
    running = false;
    clearInterval(timerId);
    timerId = null;
    // leave elapsed as-is
    startBtn.textContent = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = false;
  }

  function reset(){
    elapsed = 0;
    display.textContent = format(0);
    laps = [];
    renderLaps();
    resetBtn.disabled = true;
  }

  function lap(){
    if(!running) return;
    laps.unshift({time:elapsed, text:format(elapsed)});
    renderLaps();
  }

  function renderLaps(){
    lapsOl.innerHTML = '';
    if(laps.length === 0){
      lapsOl.innerHTML = '<li style="list-style:none;color:var(--muted)">No laps yet</li>';
      return;
    }
    laps.forEach((l,i)=>{
      const li = document.createElement('li');
      li.innerHTML = `<span>Lap ${laps.length - i}</span><strong>${l.text}</strong>`;
      lapsOl.appendChild(li);
    });
  }

  // Event listeners
  startBtn.addEventListener('click', ()=>{ if(running) stop(); else start(); });
  lapBtn.addEventListener('click', lap);
  resetBtn.addEventListener('click', reset);

  // keyboard shortcuts: Space = start/stop, L = lap, R = reset
  window.addEventListener('keydown', (e)=>{
    if(e.code === 'Space'){
      e.preventDefault();
      if(running) stop(); else start();
    } else if(e.key.toLowerCase() === 'l'){
      lap();
    } else if(e.key.toLowerCase() === 'r'){
      reset();
    }
  });

  // small UX: double-click display to copy current time
  display.addEventListener('dblclick', async ()=>{
    try{
      await navigator.clipboard.writeText(display.textContent);
      display.animate([{opacity:1},{opacity:0.6},{opacity:1}],{duration:420});
    }catch(e){
      console.warn('copy failed', e);
    }
  });

  // initialize UI state
  display.textContent = format(0);
  renderLaps();
})();
