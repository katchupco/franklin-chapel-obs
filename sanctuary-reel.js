/* Franklin Chapel sanctuary reel. Media is 1920x1080 H.264/AAC. */
(()=>{
 'use strict';
 function easternDate(date=new Date()){
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date).map(x=>[x.type,x.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
 }
 function eligible(entries,date=easternDate()){
  return entries.filter(item=>!item.expires||item.expires>=date);
 }
 window.FranklinSanctuaryReel={eligible,easternDate,version:'2026-10-25-fullscreen'};
 async function initialize(){
  const $=id=>document.getElementById(id),video=$('reel'),query=new URLSearchParams(location.search);
  const embedded=window.self!==window.top;
  video.muted=embedded||query.get('mute')==='1';
  $('controls').hidden=query.get('controls')!=='1';
  let all=[],current='',failed=new Set(),busy=false;
  const available=()=>eligible(all).filter(item=>!failed.has(item.id)&&(!query.has('clip')||item.id===query.get('clip')));
  function status(item){$('reelStatus').textContent=item.label;video.setAttribute('aria-label',item.label);}
  async function play(){
   try{await video.play();$('startLayer').hidden=true;}
   catch(error){if(error.name==='NotAllowedError')$('startLayer').hidden=false;else if(error.name!=='AbortError')skipFailed();}
  }
  function skipFailed(){const id=current;setTimeout(()=>{if(current===id)next(true);},0);}
  async function load(item){
   if(!item){$('errorLayer').hidden=false;return;}
   current=item.id;status(item);$('errorLayer').hidden=true;video.src=item.src;video.load();await play();
  }
  async function next(error=false){
   if(busy)return;busy=true;
   try{
    if(error&&current)failed.add(current);
    const list=available();let index=list.findIndex(item=>item.id===current);
    // A missing/expired current clip advances to the first remaining entry.
    await load(list[index<0?0:(index+1)%list.length]);
   }finally{busy=false;}
  }
  video.addEventListener('ended',()=>next());
  video.addEventListener('error',skipFailed);
  video.addEventListener('playing',()=>{$('startLayer').hidden=true;$('pauseButton').textContent='Pause';});
  video.addEventListener('pause',()=>{$('pauseButton').textContent='Resume';});
  $('startButton').addEventListener('click',play);
  $('pauseButton').addEventListener('click',()=>video.paused?play():video.pause());
  $('soundButton').textContent=video.muted?'Sound on':'Mute';
  $('soundButton').addEventListener('click',()=>{video.muted=!video.muted;$('soundButton').textContent=video.muted?'Sound on':'Mute';});
  $('nextButton').addEventListener('click',()=>next());
  $('fullscreenButton').addEventListener('click',()=>{
   const screen=document.querySelector('.screen');
   if(document.fullscreenElement)document.exitFullscreen?.();else if(screen.requestFullscreen)screen.requestFullscreen();else video.webkitEnterFullscreen?.();
  });
  $('retryButton').addEventListener('click',()=>{failed.clear();current='';next();});
  try{
   const response=await fetch('sanctuary-reel-playlist.json?v=20261025fullscreen',{cache:'no-store'});
   if(!response.ok)throw new Error('Playlist unavailable');
   const data=await response.json();all=Array.isArray(data.clips)?data.clips:[];
   await load(available()[0]);
  }catch{ $('errorLayer').hidden=false; }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize,{once:true});else initialize();
})();
