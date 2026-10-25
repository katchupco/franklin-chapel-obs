(()=>{'use strict';
const q=new URLSearchParams(location.search),id=q.get('scene')||document.body.dataset.scene||'welcome',stage=document.getElementById('stage');
const people={pastor:['OUR PASTOR','Rev. John T. Morrison, Jr.','Franklin Chapel A.M.E. Zion Church'],firstlady:['OUR FIRST LADY','Renée Morrison','Honoring a heart for ministry and service'],morning:['10 AM GUEST SPEAKER','Dr. Carlos Perkins','Bethel AME • Indianapolis, Indiana'],afternoon:['3 PM GUEST SPEAKER','Pastor Darrell “BJ” Gibson','Nazareth MBC • Wagram, North Carolina']};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const lockup='<div class="event-lockup"><span class="script">Pastor</span><strong>APPRECIATION</strong><span class="spaced">SUNDAY</span></div>';
const bg='<div class="backdrop" aria-hidden="true"></div><div class="sheen" aria-hidden="true"></div>';
const header='<img class="full-logo" src="assets/church-logo.png" alt="Franklin Chapel"><div class="church-name">FRANKLIN CHAPEL A.M.E. ZION</div><div class="date-top">SUNDAY · OCTOBER 25, 2026</div>';
const footer='<div class="footer"><div><strong>Honoring Pastor &amp; First Lady Morrison</strong><br><span>10 AM &amp; 3 PM · Laurinburg, North Carolina</span></div><span>franklinchapel.org</span></div>';
const bug='<img class="overlay-art" src="assets/live-bug.svg" alt="Pastor Appreciation Sunday">';
const full={welcome:['Welcome home.','Pastor Appreciation Sunday'],starting:['Worship begins soon.','A day of honor. A time of thanksgiving.'],break:['We’ll be right back.','Stay with us. The celebration continues.'],ending:['Thank you for worshiping.','Celebrating faithful leadership. Honoring a shared journey.'],standby:['We believe God.','Honoring faithful leadership']};
function fit(){const r=Math.min(innerWidth/1920,innerHeight/1080);stage.style.transform=`translate(${(innerWidth-1920*r)/2}px,${(innerHeight-1080*r)/2}px) scale(${r})`;}
addEventListener('resize',fit);fit();
if(q.get('hold')==='1')document.body.classList.add('hold');
if(q.get('preview')==='1')document.body.style.background='repeating-conic-gradient(#202027 0 25%,#30303a 0 50%) 0/40px 40px';
if(id==='flyer'){stage.innerHTML='<img class="flyer" src="assets/pastor-appreciation-flyer.png" alt="Pastor Appreciation Sunday, October 25. Pastor John T. Morrison Jr. and First Lady Renée Morrison. Dr. Carlos Perkins at 10 AM. Pastor Darrell BJ Gibson at 3 PM.">';}
else if(id==='background'){stage.innerHTML=bg;}
else if(full[id]){const [title,sub]=full[id];stage.innerHTML=bg+header+`<section class="hero"><p class="kicker">${esc(sub)}</p>${lockup}<h1>${esc(title)}</h1><p class="honorees">Rev. John T. Morrison, Jr. &amp; First Lady Renée Morrison</p></section>`+footer;}
else if(id==='countdown'){
 stage.innerHTML=bg+header+`<section class="hero countdown">${lockup}<div class="timer" id="timer" role="timer" aria-label="Time until worship">05:00</div><div class="status" id="countdownStatus">Worship begins soon</div></section>`+footer;
 const raw=q.has('seconds')?Number(q.get('seconds')):Number(q.get('minutes')||5)*60;const seconds=Number.isFinite(raw)?Math.max(1,Math.min(3600,raw)):300;let start=performance.now();
 function tick(){const left=Math.max(0,Math.ceil(seconds-(performance.now()-start)/1000));document.getElementById('timer').textContent=String(Math.floor(left/60)).padStart(2,'0')+':'+String(left%60).padStart(2,'0');document.getElementById('countdownStatus').textContent=left?'Worship begins soon':'Worship begins now';}
 tick();setInterval(tick,200);addEventListener('obsSourceActiveChanged',event=>{if(event.detail?.active){start=performance.now();tick();}});
}
else if(id==='live'){stage.innerHTML=bug;}
else if(people[id]){stage.innerHTML=bug+`<img class="overlay-art lower" src="assets/${id}-lower-third.svg" alt="${esc(people[id].join(' — '))}">`;}
else if(id==='scripture'){
 const title=(q.get('title')||'Scripture Reading').slice(0,80),sub=(q.get('subtitle')||'Follow along with today’s reading.').slice(0,200);
 stage.innerHTML=bug+`<section class="scripture-card"><small>THE WORD</small><h1>${esc(title)}</h1><p>${esc(sub)}</p></section>`;
}
else if(id==='offering'){
 stage.innerHTML=bg+header+'<section class="offering-title"><span class="kicker">GENEROSITY IN ACTION</span><h1>Ways<br>to give.</h1><p>Your generosity supports the ministry and mission of Franklin Chapel.</p></section><section class="giving-cards"><article class="giving-card"><img src="assets/qr-give-website.png" alt="Scan to open the official Franklin Chapel giving page"><small>ONLINE GIVING</small><strong>franklinchapel.org/give</strong><p>Scan to choose a giving method</p></article><article class="giving-card"><img src="assets/qr-give-cashapp.png" alt="Scan to open Franklin Chapel Cash App"><small>CASH APP</small><strong>$FRANKLINCHAPELNC</strong><p>Give to Franklin Chapel</p></article></section>'+footer;
}
else if(id==='giving'){stage.innerHTML='<img class="overlay-art" src="assets/giving-overlay.svg" alt="Ways to give: franklinchapel.org/give. Cash App $FRANKLINCHAPELNC.">';}
else if(id==='announcements'||id==='bigz'){
 const file=id==='announcements'?'sunday-announcements.mp4':'big-z-tv-promo.mp4';
 stage.innerHTML=`<video class="video" id="media" src="assets/${file}" playsinline autoplay loop preload="auto" aria-label="${id==='announcements'?'Sunday announcement reel':'BIG-Z TV promo'}"></video><div class="play-layer" id="startLayer" hidden><button type="button" id="startVideo">Play with sound</button><p>Pastor Appreciation Sunday</p></div><div class="media-error" id="mediaError" hidden>Video unavailable<br><small>Open the pack guide to check the media file.</small></div>`;
 const v=document.getElementById('media');v.muted=q.get('mute')==='1'||self!==top;
 async function play(){try{await v.play();document.getElementById('startLayer').hidden=true;}catch(e){if(e.name==='NotAllowedError')document.getElementById('startLayer').hidden=false;}}
 document.getElementById('startVideo').onclick=()=>{v.muted=false;play();};v.addEventListener('playing',()=>document.getElementById('startLayer').hidden=true);v.addEventListener('error',()=>document.getElementById('mediaError').hidden=false);play();
}else{stage.innerHTML=bg+header;}
document.body.dataset.renderedScene=id;
})();
