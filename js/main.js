/* ============ CONFIG: edit this block ============ */
var CONFIG={
  her:"Ruthba", me:"Tashkir",
  start:"2026-09-28T00:00:00",          /* the day you became a couple */
  song:"audio/song.mp3",                /* optional: drop your song here, otherwise a soft synth melody plays */
  memories:[
    ["Week 1","Everything felt new, and I kept smiling at my phone."],
    ["Week 2","I started saving little things to tell you later."],
    ["Week 3","Ordinary days turned into the part I look forward to."],
    ["Week 4","I stopped imagining the future without you in it."]],
  photos:[
    ["images/hero.jpg","Under the red lights"],
    ["images/tea-stall.jpg","Tea stall, your head on my shoulder"],
    ["images/sunset.jpg","Golden hour"],
    ["images/saree.jpg","You, in that saree"],
    ["images/night-lights.jpg","Night out"],
    ["images/smile.jpg","That smile"],
    ["images/hearts.jpg","Heart filter, real heart"],
    ["images/close.jpg","Close enough to count eyelashes"]],
  finale:"images/finale.jpg",
  coupons:["Coupon: one movie night, your pick, my treat. 🍿","Coupon: one long hug with no time limit. 🤗","Coupon: one 3 a.m. debug session together, snacks included. 💻"],
  letter:"Dear {her},\n\nOne month ago it was new. Today it already feels like home.\n\nThank you for your patience, your laugh, and for every time you made a hard day lighter. I keep finding new reasons to like you more.\n\nThis is only month one. I want month two, then month twelve, and then all the ones after that. Whatever we build, I want to build it with you.\n\nHappy 1 month, my love. ❤️"
};
/* ================================================= */
var $=function(x){return document.getElementById(x)};
var P;try{P=new URLSearchParams(location.search)}catch(e){P=new URLSearchParams("")}
var HER=P.get("her")||CONFIG.her,ME=P.get("me")||CONFIG.me,START=new Date(P.get("start")||CONFIG.start);
function typeTo(el,t,sp,cb){var k=0;(function s(){if(k<t.length){el.textContent+=t[k++];setTimeout(s,sp)}else if(cb)cb()})()}

/* timeline */
CONFIG.memories.forEach(function(m){var d=document.createElement("div");d.innerHTML="<b></b><span></span>";d.firstChild.textContent=m[0];d.lastChild.textContent=m[1];$("tl").appendChild(d)});

/* hero slideshow */
var sl=$("slides"),si=0;
CONFIG.photos.forEach(function(p){var i=document.createElement("img");i.src=p[0];i.alt="";sl.appendChild(i)});
function slide(){var a=sl.children;if(!a.length)return;for(var i=0;i<a.length;i++)a[i].classList.remove("on");void sl.offsetWidth;a[si%a.length].classList.add("on");si++}
slide();setInterval(slide,6000);

/* gallery + lightbox */
CONFIG.photos.forEach(function(p,i){var d=document.createElement("div");d.className="pol";d.style.setProperty("--r",((i%2?1:-1)*(1+Math.random()*2.5))+"deg");
d.innerHTML="<img loading=lazy alt=''><span></span>";d.firstChild.src=p[0];d.lastChild.textContent=p[1];
d.onclick=function(){$("lbimg").src=p[0];$("lbcap").textContent=p[1];$("lb").hidden=false};$("gal").appendChild(d)});
$("lb").onclick=function(){this.hidden=true};
document.addEventListener("keydown",function(e){if(e.key=="Escape")$("lb").hidden=true});
document.documentElement.style.setProperty("--finale","url("+CONFIG.finale+")");

/* live counter */
function live(){var s=Math.max(0,Math.floor((Date.now()-START)/1000)),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60);
$("live").innerHTML=[[d,"days"],[h,"hours"],[m,"min"],[s%60,"sec"]].map(function(x){return"<div><b>"+x[0]+"</b><small>"+x[1]+"</small></div>"}).join("")}
live();setInterval(live,1000);

/* canvases */
var bg=$("bg"),bx=bg.getContext("2d"),fx=$("fx"),fc=fx.getContext("2d"),stars=[],shoot=[],ps=[];
function size(){bg.width=fx.width=innerWidth;bg.height=fx.height=innerHeight;stars=[];for(var n=0;n<140;n++)stars.push({x:Math.random()*bg.width,y:Math.random()*bg.height,r:Math.random()*1.5+.3,t:Math.random()*6})}
size();onresize=size;
var COL=["#ff5d8f","#ffd36b","#ff9ad0","#8be9fd","#fff"];
function firework(x,y){var c=COL[Math.floor(Math.random()*5)];for(var n=0;n<70;n++){var a=Math.random()*6.28,s=Math.random()*6+1;ps.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,g:.08,l:1,c:c,r:2.5})}}
function confetti(n){for(var i=0;i<n;i++)ps.push({x:Math.random()*fx.width,y:-10,vx:(Math.random()-.5)*3,vy:2+Math.random()*3,g:.03,l:2,c:COL[i%5],r:4,sq:1})}
function show(){firework(fx.width*.25,fx.height*.35);setTimeout(function(){firework(fx.width*.75,fx.height*.3)},300);setTimeout(function(){firework(fx.width*.5,fx.height*.45)},600);confetti(90)}
var f=0;(function loop(){requestAnimationFrame(loop);if(document.hidden)return;f++;
bx.clearRect(0,0,bg.width,bg.height);bx.fillStyle="#fff";
stars.forEach(function(s){bx.globalAlpha=.35+.65*Math.abs(Math.sin(f/50+s.t));bx.beginPath();bx.arc(s.x,s.y,s.r,0,6.3);bx.fill()});
if(f%260===0)shoot.push({x:Math.random()*bg.width,y:Math.random()*bg.height*.4,l:1});
shoot=shoot.filter(function(s){s.x+=9;s.y+=5;s.l-=.02;bx.globalAlpha=Math.max(0,s.l);bx.strokeStyle="#ffd9ec";bx.lineWidth=2;bx.beginPath();bx.moveTo(s.x,s.y);bx.lineTo(s.x-60,s.y-33);bx.stroke();return s.l>0});
fc.clearRect(0,0,fx.width,fx.height);
ps=ps.filter(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.l-=.012;fc.globalAlpha=Math.max(0,Math.min(1,p.l));fc.fillStyle=p.c;
if(p.sq)fc.fillRect(p.x,p.y,p.r*1.6,p.r);else{fc.beginPath();fc.arc(p.x,p.y,p.r,0,6.3);fc.fill()}return p.l>0&&p.y<fx.height+20})})();

/* floating hearts */
var EM=["❤️","💖","💕","💗","✨","🌸"];
setInterval(function(){if(document.hidden)return;var s=document.createElement("span");s.textContent=EM[Math.floor(Math.random()*6)];
s.style.left=Math.random()*100+"%";s.style.fontSize=(14+Math.random()*22)+"px";s.style.opacity=.6;s.style.setProperty("--dx",(Math.random()*80-40)+"px");
s.style.animationDuration=(7+Math.random()*6)+"s";$("fl").appendChild(s);setTimeout(function(){s.remove()},13500)},650);

/* music: your own mp3 if audio/song.mp3 exists, otherwise a synthesized melody */
var AC,on=false,step=0,timer,song;
var CH=[[261.63,329.63,392,523.25],[196,246.94,293.66,392],[220,261.63,329.63,440],[174.61,220,261.63,349.23]],PAT=[0,1,2,3,2,1,2,1],PEN=[523.25,587.33,659.25,783.99,880,1046.5];
function note(fr,t,d,v,ty){var o=AC.createOscillator(),g=AC.createGain();o.type=ty||"triangle";o.frequency.value=fr;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.03);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d+.05)}
function tick(){var c=CH[Math.floor(step/8)%4],i=step%8,t=AC.currentTime+.05;note(c[PAT[i]],t,.9,.09);if(i==0){note(c[0]/2,t,3,.08,"sine");note(c[2],t,3,.03,"sine")}
if(Math.random()<.28)note(PEN[Math.floor(Math.random()*6)],t,1.2,.05,"sine");step++}
function synth(v){if(v){if(!AC)AC=new(window.AudioContext||window.webkitAudioContext)();if(AC.resume)AC.resume();clearInterval(timer);timer=setInterval(tick,420)}else clearInterval(timer)}
function music(v){on=v;$("mute").textContent=v?"🎵":"🔇";
if(!v){clearInterval(timer);if(song)song.pause();return}
if(song&&song.ok){song.play();return}
if(song===undefined){song=new Audio(CONFIG.song);song.loop=true;song.volume=.7;
song.play().then(function(){song.ok=true}).catch(function(){song.ok=false;if(on)synth(true)})}else synth(true)}
$("mute").onclick=function(){music(!on)};

/* gate */
$("open").onclick=function(){try{music(true)}catch(e){}$("gate").classList.add("out");$("mute").hidden=false;show();
typeTo($("ttl"),"Happy 1 Month, "+HER+"!",70,function(){typeTo($("sub"),"One month with you, and I would pick this again every time. 💞",35)})};

/* reveal + count up */
function count(el){var n=+el.dataset.n,s=null;(function st(ts){if(!s)s=ts;var p=Math.min((ts-s)/1800,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3))).toLocaleString();if(p<1)requestAnimationFrame(st)})(performance.now())}
var io=window.IntersectionObserver?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!e.target.classList.contains("in")){e.target.classList.add("in");e.target.querySelectorAll("[data-n]").forEach(count);e.target.querySelectorAll(".pol").forEach(function(p,i){setTimeout(function(){p.classList.add("in")},i*160)})}})},{threshold:.2}):null;
document.querySelectorAll(".rv").forEach(function(r){if(io)io.observe(r);else{r.classList.add("in");r.querySelectorAll(".pol").forEach(function(p){p.classList.add("in")})}});

/* gifts */
document.querySelectorAll(".gift").forEach(function(b){b.onclick=function(){b.classList.remove("shake");void b.offsetWidth;b.classList.add("shake");
setTimeout(function(){b.textContent="💝";$("gtxt").textContent=CONFIG.coupons[+b.dataset.i];var r=b.getBoundingClientRect();firework(r.left+r.width/2,r.top)},450)}});

/* candle */
$("blow").onclick=function(){$("fm").classList.add("off");$("wish").textContent="Wish made. Mine is month two, with you. 🌙";show()};

/* heart game */
var caught=0,ar=$("arena");
for(var h=0;h<8;h++)(function(){var b=document.createElement("button");b.textContent=["💖","💘","💝","💗"][h%4];b.setAttribute("aria-label","heart");
b.style.left=(6+Math.random()*80)+"%";b.style.top=(6+Math.random()*75)+"%";b.style.animationDelay=(-Math.random()*2)+"s";
b.onclick=function(){var r=b.getBoundingClientRect();firework(r.left+24,r.top+24);b.remove();caught++;$("cnt").textContent=caught+" / 8";
if(caught==8){$("cnt").textContent="All 8 caught! 💞";setTimeout(finale,900)}};ar.appendChild(b)})();
function finale(){var lb=$("letterBox"),L=CONFIG.letter.replace("{her}",HER);lb.style.display="block";lb.scrollIntoView({behavior:"smooth",block:"center"});show();
var k=0;(function t(){if(k<L.length){lb.textContent+=L[k++];setTimeout(t,30)}else{var s=$("sign");s.textContent="Yours, "+ME+" 💍";s.style.opacity=1;show();setTimeout(show,1200)}})()}

/* ===================== EXTRAS ===================== */
CONFIG.chapters=[
 ["images/sunset.jpg","Chapter 1","The golden hour","Some hours with you feel longer and softer than any other hour of the day."],
 ["images/night-lights.jpg","Chapter 2","Red lights, quiet streets","Out late, your head on my shoulder. I would take this night again without changing anything."],
 ["images/tea-stall.jpg","Chapter 3","Small places, big feelings","A tea stall can be the best restaurant in the city when you are sitting in it."],
 ["images/saree.jpg","Chapter 4","You, just you","You walk in and the room gets quieter. I am still not used to it."]];
CONFIG.reasons=["Your smile fixes my worst days.","You listen like it matters.","You laugh at my bad jokes.","You make ordinary days feel planned.","You are kind when nobody is watching.","You make me want to be better.","Your voice calms me down.","You are patient with me.","You are brilliant and you never show off.","Being with you feels like home.","Silence with you is comfortable.","You chose me, and I am still amazed."];

/* chapters */
CONFIG.chapters.forEach(function(c){var d=document.createElement("div");d.className="chap";
d.innerHTML="<div class=cimg><img alt='' loading=lazy></div><div class=ctxt><small></small><h3></h3><p></p></div>";
d.querySelector("img").src=c[0];d.querySelector("small").textContent=c[1].toUpperCase();d.querySelector("h3").textContent=c[2];d.querySelector("p").textContent=c[3];
$("chaps").appendChild(d);if(io)io.observe(d);else d.classList.add("in")});

/* flip cards */
CONFIG.reasons.forEach(function(r,i){var d=document.createElement("div");d.className="fc";d.innerHTML="<div><span class=a></span><span class=b></span></div>";
d.querySelector(".a").textContent=(i+1)+" 💗";d.querySelector(".b").textContent=r;
d.onclick=function(){d.classList.toggle("fl");var q=d.getBoundingClientRect();if(d.classList.contains("fl"))firework(q.left+q.width/2,q.top)};$("rs").appendChild(d)});

/* wish lanterns */
function lantern(){var t=$("wi").value.trim()||"Us, forever";var l=document.createElement("div");l.className="lan";l.textContent=t;
l.style.left=(8+Math.random()*68)+"%";$("sky").appendChild(l);$("wi").value="";setTimeout(function(){l.remove()},9200)}
$("wb").onclick=lantern;$("wi").onkeydown=function(e){if(e.key=="Enter")lantern()};

/* countdown to month 2 */
var NEXT=new Date(START);NEXT.setMonth(NEXT.getMonth()+2);
function nextc(){var s=Math.max(0,Math.floor((NEXT-Date.now())/1000)),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60);
$("next").innerHTML=[[d,"days"],[h,"hours"],[m,"min"],[s%60,"sec"]].map(function(x){return"<div><b>"+x[0]+"</b><small>"+x[1]+"</small></div>"}).join("")}
nextc();setInterval(nextc,1000);

/* touch / mouse sparkles */
function one(x,y){var s=document.createElement("span");s.className="sp";s.textContent=EM[Math.floor(Math.random()*6)];s.style.left=x+"px";s.style.top=y+"px";
s.style.fontSize=(12+Math.random()*14)+"px";s.style.setProperty("--x",(Math.random()*120-60)+"px");s.style.setProperty("--y",(-Math.random()*120-10)+"px");
document.body.appendChild(s);setTimeout(function(){s.remove()},1000)}
var lastS=0;
addEventListener("pointerdown",function(e){for(var i=0;i<6;i++)one(e.clientX,e.clientY)});
addEventListener("pointermove",function(e){var n=Date.now();if(n-lastS>70){lastS=n;one(e.clientX,e.clientY)}});

/* scroll: progress bar, shifting background, parallax */
var busy=false;
function onS(){var mx=document.documentElement.scrollHeight-innerHeight,p=mx>0?scrollY/mx:0;$("prog").style.width=p*100+"%";
document.body.style.backgroundImage="radial-gradient(ellipse at 50% 0,hsl("+(285+p*75)+" 55% 20%) 0,#0b0618 65%)";
document.querySelectorAll(".cimg img").forEach(function(im){var r=im.parentNode.getBoundingClientRect(),c=(r.top+r.height/2-innerHeight/2)/innerHeight;
im.style.transform="translateY("+(-8-Math.max(-1,Math.min(1,c))*7)+"%)"});busy=false}
addEventListener("scroll",function(){if(!busy){busy=true;requestAnimationFrame(onS)}},{passive:true});onS();

/* countdown intro */
$("open").onclick=function(){try{music(true)}catch(e){}$("gate").classList.add("out");$("mute").hidden=false;
var it=$("intro"),n=$("in"),seq=["3","2","1","💞"],k=0;it.hidden=false;
(function s(){if(k<seq.length){n.textContent=seq[k++];n.style.animation="none";void n.offsetWidth;n.style.animation="";setTimeout(s,760)}
else{it.hidden=true;show();setTimeout(show,700);typeTo($("ttl"),"Happy 1 Month, "+HER+"!",70,function(){typeTo($("sub"),"One month with you, and I would pick this again every time. 💞",35)})}})()};

/* photo rain + love ticker in the finale */
function photoRain(){for(var i=0;i<12;i++)(function(i){setTimeout(function(){var p=CONFIG.photos[i%CONFIG.photos.length],im=document.createElement("img");im.className="fp";im.src=p[0];im.alt="";
im.style.left=(Math.random()*88)+"%";im.style.setProperty("--rr",(Math.random()*50-25)+"deg");im.style.animationDuration=(10+Math.random()*6)+"s";
document.body.appendChild(im);setTimeout(function(){im.remove()},16500)},i*900)})(i)}
var _fin=finale;finale=function(){_fin();photoRain()};
var LOVE=["I love you","আমি তোমাকে ভালোবাসি","Je t’aime","Te amo","愛してる","Ti amo","Seni seviyorum","Ich liebe dich","사랑해","Σ’αγαπώ"].join("   ✦   ")+"   ✦   ";
$("tk").textContent=LOVE+LOVE;
