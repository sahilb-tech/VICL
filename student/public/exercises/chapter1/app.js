const app=document.getElementById('app');let i=0,score=0,correct=0,wrong=0,locked=false,sel=null,match={},pending=null,multi=new Set(),questionStatus={};
function frame(x){app.innerHTML='<div class="screen">'+x+'</div>'}
function start(){i=0;score=0;correct=0;wrong=0;questionStatus={};render()}
function render(){locked=false;sel=null;match={};pending=null;multi=new Set();let q=EXERCISE[i],p=Math.round(i/EXERCISE.length*100);let h='<div class="head"><div class="meta"><span>Exercise '+(i+1)+' of '+EXERCISE.length+'</span><span>⭐ '+score+'</span></div><div class="bar"><div style="width:'+p+'%"></div></div></div><div class="inner">'+qView(q)+'</div>';frame(h)}
function qView(q){
if(q.type==='mcq')return '<span class="pill">'+q.sec+'</span><h1 class="qtitle">'+q.q+'</h1><div class="hint">Look at the pictures carefully and choose the correct option.</div><div class="options">'+q.o.map(x=>'<button class="option" id="o'+x[0]+'" onclick="pick(\''+x[0]+'\')"><span class="icon">'+x[2]+'</span><b>('+x[0]+') '+x[1]+'</b></button>').join('')+'</div><div id="fb"></div><div class="actions"><button class="btn primary" id="sub" onclick="mcq()">Submit Answer</button></div>';
if(q.type==='match')return '<span class="pill">'+q.sec+'</span><h1 class="qtitle">'+q.q+'</h1><div class="hint">Tap an object, then tap its matching description.</div><div class="match"><div class="col"><b>Objects</b>'+q.left.map(x=>'<button class="item" id="l'+x[0]+'" onclick="left(\''+x[0]+'\')">'+x[1]+'</button>').join('')+'</div><div class="col"><b>Descriptions</b>'+q.right.map(x=>'<button class="item" id="r'+x[0]+'" onclick="right(\''+x[0]+'\')">'+x[1]+'</button>').join('')+'</div></div><div class="hint" id="ms">Matched: 0 / 4</div><div id="fb"></div><div class="actions"><button class="btn primary" onclick="matching()">Submit Answer</button></div>';
if(q.type==='fill')return '<span class="pill">'+q.sec+'</span><h1 class="qtitle">Fill in the blank</h1><div class="sentence">'+q.q.replace('______','<span class="blank">?</span>')+'</div><div class="words">'+q.o.map((x,n)=>'<button class="word" id="w'+n+'" onclick="fill(\''+x+'\','+n+')">'+x+'</button>').join('')+'</div><div id="fb"></div><div class="actions"><button class="btn primary" onclick="fillSubmit()">Submit Answer</button></div>';
if(q.type==='letter'){let ch=['A','B','C','D','W'].filter((x,n)=>x===q.a||n<4);return '<span class="pill">'+q.sec+'</span><h1 class="qtitle">'+q.q+'</h1><div class="letters">'+q.w.map(x=>x==='_'?'<span class="slot" id="slot">?</span>':'<span>'+x+'</span>').join('')+'</div><div class="words">'+ch.map((x,n)=>'<button class="word" id="lw'+n+'" onclick="letter(\''+x+'\','+n+')">'+x+'</button>').join('')+'</div><div class="machine" id="machine">'+q.icon+'</div><div class="hint" style="text-align:center">Choose a colour for the machine.</div><div class="palette">'+['#ef4444','#f59e0b','#22c55e','#3b82f6','#a855f7','#ec4899'].map(c=>'<button class="color" style="background:'+c+'" onclick="paint(\''+c+'\')"></button>').join('')+'</div><div id="fb"></div><div class="actions"><button class="btn primary" onclick="letterSubmit()">Submit Answer</button></div>'}
return '<span class="pill">'+q.sec+'</span><h1 class="qtitle">'+q.q+'</h1><div class="hint">Select the things you see in the lab.</div><div class="lab">'+q.o.map(x=>'<button class="item" id="lab'+x[0]+'" onclick="toggle(\''+x[0]+'\')"><span class="labicon">'+x[2]+'</span>'+x[1]+'</button>').join('')+'</div><div class="callout bad">⚠️ The photographed page does not visibly mark the answer key. Confirm it with your teacher before publishing.</div><div id="fb"></div><div class="actions"><button class="btn primary" onclick="lab()">Submit Answer</button></div>'}
function fb(ok,t){document.getElementById('fb').innerHTML='<div class="callout '+(ok?'good':'bad')+'">'+(ok?'✅ ':'❌ ')+t+'</div>'}
function next(){if(i<EXERCISE.length-1){i++;render()}else result()}
function recordCorrect(q){if(questionStatus[q.id])return;questionStatus[q.id]='correct';correct++;score+=q.m;}
function recordWrong(q){if(questionStatus[q.id])return;questionStatus[q.id]='wrong';wrong++;}
function finishAttempt(q, isCorrect, message){
 if(locked)return;
 locked=true;
 if(isCorrect)recordCorrect(q); else recordWrong(q);
 fb(isCorrect,message);
 document.querySelector('.actions').innerHTML='<button class="btn primary" onclick="next()">'+(i===EXERCISE.length-1?'Submit Exercise ✓':'Next Question →')+'</button>';
}
function pick(x){if(locked)return;sel=x;document.querySelectorAll('.option').forEach(e=>e.classList.remove('selected'));document.getElementById('o'+x).classList.add('selected')}
function mcq(){
 if(!sel||locked)return;
 const q=EXERCISE[i],ok=sel===q.a;
 document.querySelectorAll('.option').forEach(e=>e.classList.remove('wrong','correct'));
 if(ok)document.getElementById('o'+q.a).classList.add('correct');
 else document.getElementById('o'+sel).classList.add('wrong');
 finishAttempt(q,ok,ok?'Correct! 🎉':'Incorrect answer. Your answer has been submitted.');
}
function left(x){if(locked)return;pending=x;document.querySelectorAll('[id^="l"]').forEach(e=>e.classList.remove('active'));document.getElementById('l'+x).classList.add('active')}
function right(x){if(locked||!pending)return;match[pending]=x;document.getElementById('l'+pending).classList.add('done');document.getElementById('r'+x).classList.add('done');pending=null;document.getElementById('ms').textContent='Matched: '+Object.keys(match).length+' / 4'}
function matching(){
 if(locked)return;
 if(Object.keys(match).length<4){fb(false,'Please complete all four matches before submitting.');return}
 const q=EXERCISE[i],n=Object.keys(q.a).filter(k=>match[k]===q.a[k]).length,ok=n===4;
 finishAttempt(q,ok,ok?'All matches are correct! 🎉':'Some matches are incorrect. Your answer has been submitted.');
}
function fill(x,n){if(locked)return;sel=x;document.querySelectorAll('.word').forEach(e=>e.classList.remove('selected'));document.getElementById('w'+n).classList.add('selected')}
function fillSubmit(){
 if(!sel||locked){if(!sel)fb(false,'Choose one answer before submitting.');return}
 const q=EXERCISE[i],ok=sel===q.a;
 finishAttempt(q,ok,ok?'Correct! 🎉':'Incorrect answer. Your answer has been submitted.');
}
function letter(x,n){if(locked)return;sel=x;document.querySelectorAll('[id^="lw"]').forEach(e=>e.classList.remove('selected'));document.getElementById('lw'+n).classList.add('selected');document.getElementById('slot').textContent=x}
function paint(c){document.getElementById('machine').style.color=c}
function letterSubmit(){
 if(locked)return;
 if(!sel){fb(false,'Choose one missing letter before submitting.');return}
 const q=EXERCISE[i],ok=sel===q.a;
 finishAttempt(q,ok,ok?'Correct! 🎨 Great work!':'Incorrect answer. Your answer has been submitted.');
}
function toggle(x){if(multi.has(x)){multi.delete(x);document.getElementById('lab'+x).classList.remove('active')}else{multi.add(x);document.getElementById('lab'+x).classList.add('active')}}
function lab(){
 if(locked)return;
 locked=true;
 questionStatus[EXERCISE[i].id]='ungraded';
 fb(true,'Activity submitted. This activity is not included in the score because its answer key has not been confirmed.');
 document.querySelector('.actions').innerHTML='<button class="btn primary" onclick="next()">'+(i===EXERCISE.length-1?'Submit Exercise ✓':'Next Question →')+'</button>';
}
function result(){
 const total=EXERCISE.filter(q=>q.type!=='multi').reduce((s,q)=>s+q.m,0);
 const pct=total?Math.round(score/total*100):0;
 const stars=pct>=90?'⭐⭐⭐':pct>=70?'⭐⭐':'⭐';
 frame('<div class="result"><div class="trophy">🏆</div><h1 class="qtitle">Exercise Submitted!</h1><p>Great job! You completed the exercise.</p><div class="score">'+score+' / '+total+'</div><div class="stars">'+stars+'</div><div class="stats"><div class="stat"><b>'+correct+'</b>Correct</div><div class="stat"><b>'+wrong+'</b>Wrong</div><div class="stat"><b>'+pct+'%</b>Total Score</div></div><p class="hint">Lab Activity is completed but not scored until its answer key is confirmed.</p><div class="actions" style="justify-content:center"><button class="btn primary" onclick="start()">↻ Try Again</button><button class="btn secondary" onclick="alert(\'Connect to Chapter page\')">📖 Back to Chapter</button><button class="btn primary" onclick="alert(\'Connect to Next Chapter\')">→ Next Chapter</button></div></div>');
}
frame('<div class="hero"><div class="computer">🖥️</div><span class="badge">Chapter 1</span><h1>The Super Machine:<br>Computer</h1><div class="hero-card"><h2>📝 Exercise</h2><p>Let’s check what you learned!</p><p>✨ 5 Activities &nbsp; ⭐ Earn stars &nbsp; 📊 Track progress</p><button class="btn primary" onclick="start()">START EXERCISE →</button></div></div>');