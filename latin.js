(() => {
'use strict';
const all=(window.QUESTIONS||[]).filter(q=>q.status==='locked'&&typeof q.la==='string'&&q.la.trim()&&typeof q.a==='string'&&q.a.trim());
const systems=[{id:'luusto',name:'Luusto',test:q=>/^QA(?:[1-8])(?:\.|$)/.test(q.qa)},{id:'lihakset',name:'Lihakset',test:q=>q.qa.startsWith('QA9.')},{id:'verenkierto',name:'Verenkiertoelimistö',test:q=>/^QA(?:10|11|12)\./.test(q.qa)}];
const $=s=>document.querySelector(s);
const shuffle=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b};
let pool=[],order=[],index=0,points=0,answered=false,currentTitle='';
const clean=s=>s.trim().toLocaleLowerCase('fi');
// Latin-mode display normalization only; preserve the locked image quiz data.
const latinDisplayCorrections=Object.freeze({
  'vv. hepatica':'vv. hepaticae',
  'atrium dextrum/dx.':'atrium dextrum',
  'atrium sinistrum/sin.':'atrium sinistrum',
  'ventriculus dexter/dx.':'ventriculus dexter',
  'ventriculus sinister/sin.':'ventriculus sinister'
});
const displayLatin=q=>latinDisplayCorrections[q.la]||q.la;
// Only genuine source pairs, no inferred translations. Avoid duplicate Finnish answers.
const pairs=all.filter(q=>!all.some(other=>other!==q&&clean(other.la)===clean(q.la)&&clean(other.a)!==clean(q.a)));
const unique=arr=>[...new Map(arr.map(q=>[clean(q.a),q])).values()];
const bySystem=s=>unique(pairs.filter(s.test));
const count=s=>bySystem(s).length;
const show=id=>{['menu','game','finish'].forEach(x=>$('#'+x).hidden=x!==id)};
const optionsFor=q=>{const sys=systems.find(s=>s.test(q));const own=unique(pairs.filter(x=>x!==q&&clean(x.a)!==clean(q.a)&&(sys?sys.test(x):true)));
const candidates=shuffle(own).slice(0,3);if(candidates.length<3)return null;return shuffle([q.a,...candidates.map(x=>x.a)])};
function menu(){show('menu');$('#availability').textContent=`${pairs.length} latinankielistä nimiparia / 161 hyväksyttyä kuvakysymystä. Muut kysymykset jätetään pois, kunnes latinankieliset nimet on tarkistettu.`;const entries=[{name:'Kaikki aiheet',items:unique(pairs)},...systems.map(s=>({name:s.name,items:bySystem(s)}))];$('#categories').replaceChildren();entries.forEach(e=>{const btn=document.createElement('button');const b=document.createElement('strong');b.textContent=e.name;const span=document.createElement('span');span.textContent=`${e.items.length} nimiparia · satunnainen järjestys`;btn.append(b,span);btn.disabled=e.items.length<4;btn.onclick=()=>start(e.items,e.name);$('#categories').append(btn)})}
function start(list,title){pool=list;order=shuffle(list).map(q=>({q,opts:optionsFor(q)})).filter(x=>x.opts);index=0;points=0;currentTitle=title;if(!order.length)return;show('game');render()}
function render(){answered=false;const {q,opts}=order[index];$('#progress').textContent=`Kysymys ${index+1} / ${order.length}`;$('#points').textContent=`${points} pistettä`;$('#fill').style.width=`${index/order.length*100}%`;$('#category').textContent=currentTitle;$('#term').textContent=displayLatin(q);$('#feedback').textContent='';$('#next').hidden=true;$('#answers').replaceChildren();opts.forEach(opt=>{const b=document.createElement('button');b.textContent=opt;b.onclick=()=>{if(answered)return;answered=true;if(opt===q.a)points++;$('#points').textContent=`${points} pistettä`;[...$('#answers').children].forEach(x=>{x.disabled=true;if(x.textContent===q.a)x.classList.add('ok');else if(x===b)x.classList.add('bad')});$('#feedback').textContent=(opt===q.a?'✓ Oikein! ':'✕ Oikea vastaus: ')+q.a+' — '+displayLatin(q);$('#next').hidden=false};$('#answers').append(b)})}
$('#next').onclick=()=>{index++;if(index>=order.length){show('finish');$('#result').textContent=`${currentTitle}: ${points} / ${order.length} oikein (${Math.round(points/order.length*100)} %).`}else render()};
$('#back').onclick=menu;$('#finishBack').onclick=menu;$('#again').onclick=()=>start(pool,currentTitle);
const themeKey='anatomiapeli-theme';let theme='light';try{theme=localStorage.getItem(themeKey)||'light'}catch(e){};
function setTheme(t){document.body.classList.toggle('dark',t==='dark');$('#theme').textContent=t==='dark'?'☀️ Vaalea':'🌙 Tumma';try{localStorage.setItem(themeKey,t)}catch(e){}}
$('#theme').onclick=()=>setTheme(document.body.classList.contains('dark')?'light':'dark');setTheme(theme);menu();
})();