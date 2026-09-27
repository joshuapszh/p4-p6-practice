(() => {
  "use strict";
  const KEY="digital-literacy-practice-v1";
  const app=document.getElementById("app");
  let state=load(), level=null, paper=null, attempt=null, qIndex=0, view="home";
  function load(){try{return JSON.parse(localStorage.getItem(KEY))||{attempts:[]}}catch{return {attempts:[]}}}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));return true}catch{return false}}
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const norm=s=>String(s||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9=+$-]+/g," ").replace(/\s+/g," ").trim();
  function matches(text,part){
    const source=norm(text);
    if(!source)return false;
    return [part.answer,...part.alternatives].some(raw=>{
      const value=norm(raw);
      if(!value)return false;
      if(["=","+","-","$"].includes(value))return String(text).includes(value);
      const position=(" "+source+" ").indexOf(" "+value+" ");
      if(position<0)return false;
      const preceding=source.slice(Math.max(0,position-25),position).trim().split(" ").slice(-2);
      return !preceding.some(word=>["not","no","never","isnt","isn't"].includes(word));
    });
  }
  function qstate(q){if(!attempt.answers[q.id])attempt.answers[q.id]={};return attempt.answers[q.id]}
  function ready(q){const a=attempt.answers[q.id];return q.section==="A"?a&&Number.isInteger(a.choice):a&&a.revealed===true}
  function stats(){
    const section={A:{got:0,max:20},B:{got:0,max:35},C:{got:0,max:45}};
    let improvement=0, flagged=[];
    for(const q of paper.questions){
      const a=attempt.answers[q.id]||{};
      if(q.section==="A"){if(a.choice===q.correct)section.A.got++;continue}
      (q.parts||[]).forEach((p,i)=>{
        if(a.firstCorrect?.[i])section[q.section].got++;
        if(a.retryCorrect?.[i]&&!a.firstCorrect?.[i])improvement++;
        if(a.submitted&&a.firstAnswers?.[i]&&!a.firstCorrect?.[i]){
          flagged.push({q:q.number,part:i+1,topic:q.topic,answer:a.firstAnswers[i],expected:p.model||p.answer});
        }
      });
    }
    return {section,total:section.A.got+section.B.got+section.C.got,improvement,flagged};
  }
  function renderHome(){
    view="home";paper=null;attempt=null;
    app.innerHTML=`<div class="stack"><div><h1>Choose your year group</h1><p class="muted">Three original, untimed 100-mark sets for each level. Your work stays on this device until you submit a report through Google Classroom.</p></div><div class="grid three">${["P4","P5","P6"].map(g=>`<button class="tile" data-action="level" data-level="${g}"><strong>Primary ${g.slice(1)}</strong><span>Three full practice sets · no time limit</span></button>`).join("")}</div><div class="card"><h2>How practice works</h2><p>Multiple-choice questions show the answer immediately. For written questions, check your first answer, read a hint, try once more, and then compare with the model answer. The practice mark uses your first answer.</p><p class="muted">When you finish, print or save the short report as a PDF and submit it in Google Classroom. Repeat a set whenever you want.</p></div></div>`;
  }
  function renderLevel(g){
    level=g;view="level";attempt=null;paper=null;
    app.innerHTML=`<div class="row between"><div><p class="muted">Digital Literacy practice</p><h1>Primary ${g.slice(1)} sets</h1><p class="muted">Each set: Section A 20 marks · Section B 35 marks · Section C 45 marks.</p></div><button class="btn plain" data-action="home">Change level</button></div>
      <div class="grid three">${[1,2,3].map(n=>`<div class="card"><h2>Set ${n}</h2><p class="muted">Original questions at a similar level of difficulty. Work at your own pace.</p><button class="btn" data-action="prepare" data-set="${n}">Open Set ${n}</button></div>`).join("")}</div>`;
  }
  function renderPrepare(set){
    paper=PRACTICE_BANK.makePaper(level,Number(set));view="prepare";
    app.innerHTML=`<div class="row between"><div><p class="muted">Primary ${level.slice(1)} · Set ${set}</p><h1>Start or resume practice</h1></div><button class="btn plain" data-action="level" data-level="${level}">Back to sets</button></div>
      <div class="grid two"><div class="card"><h2>New attempt</h2><p class="muted">Enter the same name and class you will use on your Classroom report.</p>
      <form id="start-form"><div class="field"><label for="student-name">Student name</label><input id="student-name" maxlength="80" autocomplete="name" required></div>
      <div class="field"><label for="student-class">Class</label><input id="student-class" maxlength="40" required></div>
      <button class="btn" type="submit">Begin new attempt</button></form></div>
      <div class="card"><h2>Resume on this device</h2><p class="muted">If you started here before, enter the same name and class to find your attempts. On another device, start a new attempt.</p>
      <form id="find-form"><div class="field"><label for="find-name">Student name</label><input id="find-name" maxlength="80" required></div>
      <div class="field"><label for="find-class">Class</label><input id="find-class" maxlength="40" required></div><button class="btn alt" type="submit">Find attempts</button></form><div id="history"></div></div></div>`;
  }
  function showHistory(name,klass){
    const matches=state.attempts.filter(a=>a.level===level&&a.set===paper.set&&norm(a.name)===norm(name)&&norm(a.className)===norm(klass));
    const box=document.getElementById("history");
    box.innerHTML=matches.length?`<h3 class="section-title">Attempts on this device</h3>${matches.slice().reverse().map(a=>`<div class="history-item"><div><strong>${esc(new Date(a.created).toLocaleString())}</strong><div class="muted small">${a.finished?"Completed":"In progress"} · Attempt ${a.attemptNumber}</div></div><button class="btn alt" data-action="resume" data-id="${esc(a.id)}">${a.finished?"View report":"Resume"}</button></div>`).join("")}`:`<p class="muted" style="margin-top:15px">No matching attempts found on this device.</p>`;
  }
  function start(name,klass){
    const prior=state.attempts.filter(a=>a.level===level&&a.set===paper.set&&norm(a.name)===norm(name)&&norm(a.className)===norm(klass)).length;
    const id=(crypto.randomUUID?.()||String(Date.now())+Math.random().toString(36).slice(2));
    attempt={id,level,set:paper.set,name:name.trim(),className:klass.trim(),attemptNumber:prior+1,created:new Date().toISOString(),finished:null,answers:{}};
    state.attempts.push(attempt);save();qIndex=0;renderPractice();
  }
  function resume(id){
    attempt=state.attempts.find(a=>a.id===id);if(!attempt)return;
    level=attempt.level;paper=PRACTICE_BANK.makePaper(level,attempt.set);
    if(attempt.finished)renderResult();else{qIndex=paper.questions.findIndex(q=>!ready(q));if(qIndex<0)qIndex=0;renderPractice()}
  }
  function renderPractice(){
    view="practice";const q=paper.questions[qIndex], a=qstate(q);
    const done=paper.questions.filter(ready).length;
    const nav=paper.questions.map((item,i)=>`<button title="Question ${item.number}" data-action="go" data-index="${i}" class="${i===qIndex?"active":""} ${ready(item)?"done":""}">${item.number}</button>`).join("");
    const body=q.section==="A"?renderMCQ(q,a):renderWritten(q,a);
    app.innerHTML=`<div class="row between" style="margin-bottom:18px"><div><p class="muted">Primary ${level.slice(1)} · Set ${paper.set} · Attempt ${attempt.attemptNumber}</p><h1>Practice paper</h1></div><button class="btn plain" data-action="level" data-level="${level}">Save and leave</button></div>
      <div class="layout"><aside class="card side"><strong>${done} of ${paper.questions.length} questions complete</strong><div class="bar"><span style="width:${Math.round(done/paper.questions.length*100)}%"></span></div><p class="muted small">No time limit. Your work saves on this device.</p><div class="row"><span class="tag">A · 20</span><span class="tag">B · 35</span><span class="tag">C · 45</span></div><div class="nav" aria-label="Question navigation">${nav}</div><button class="btn ${done===paper.questions.length?"":"alt"}" data-action="finish" ${done===paper.questions.length?"":"disabled"}>Finish set</button><p class="muted small" style="margin-top:10px">Finish becomes available after every question is checked or skipped.</p></aside>
      <section class="card"><div class="row between"><div><span class="tag">Section ${q.section}</span> <span class="tag">Question ${q.number}</span></div><strong>${q.marks} ${q.marks===1?"mark":"marks"}</strong></div><p class="muted small" style="margin-top:10px">${esc(q.topic)}</p><h2 style="margin-top:12px">${q.section==="A"?"Choose one answer":q.section==="B"?"Short answers":"Application and scenarios"}</h2>${q.visual?renderVisual(q.visual):""}${body}<div class="row between" style="margin-top:26px"><button class="btn alt" data-action="prev" ${qIndex===0?"disabled":""}>Previous</button><button class="btn alt" data-action="next" ${qIndex===paper.questions.length-1?"disabled":""}>Next</button></div></section></div>`;
  }
  function renderVisual(v){
    if(v.type!=="flowchart")return "";
    return `<figure class="diagram"><figcaption>${esc(v.title)} flowchart</figcaption><svg viewBox="0 0 720 500" role="img" aria-label="Flowchart for ${esc(v.title)}. Start, input ${esc(v.input)}, decision ${esc(v.test)}. Yes leads to ${esc(v.yesAction)} and ${esc(v.yesOutput)}. No leads to ${esc(v.noOutput)}. Both branches end."><defs><marker id="arrowhead" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 9 3.5, 0 7" fill="#24547f"/></marker></defs>
      <g class="flow-line" marker-end="url(#arrowhead)"><path d="M250 58 V74"/><path d="M250 126 V153"/><path d="M250 256 V283"/><path d="M250 341 V364"/><path d="M250 416 V435"/><path d="M356 205 H545 V278"/><path d="M545 342 V460 H312"/></g>
      <ellipse cx="250" cy="35" rx="58" ry="23"/><text x="250" y="40">Start</text>
      <polygon points="150,76 370,76 350,126 130,126"/><text x="250" y="105">${esc(v.input)}</text>
      <polygon points="250,154 356,205 250,256 144,205"/><text x="250" y="210">${esc(v.test)}</text>
      <text class="flow-label" x="278" y="273">Yes</text><text class="flow-label" x="455" y="195">No</text>
      <rect x="135" y="285" width="230" height="56" rx="6"/><text x="250" y="317">${esc(v.yesAction)}</text>
      <polygon points="150,365 370,365 350,416 130,416"/><text x="250" y="395">${esc(v.yesOutput)}</text>
      <polygon points="440,280 670,280 650,342 420,342"/><text x="545" y="315">${esc(v.noOutput)}</text>
      <ellipse cx="250" cy="461" rx="62" ry="24"/><text x="250" y="466">End</text>
    </svg></figure>`;
  }
  function renderMCQ(q,a){
    return `<p class="question">${esc(q.prompt)}</p><div role="group" aria-label="Answer choices">${q.choices.map((choice,i)=>`<label class="choice ${Number.isInteger(a.choice)?(i===q.correct?"correct":i===a.choice?"wrong":""):""}"><input type="radio" name="mcq" value="${i}" data-action="mcq" ${Number.isInteger(a.choice)?"disabled":""} ${a.choice===i?"checked":""}><strong>${"ABCD"[i]}.</strong> ${esc(choice)}</label>`).join("")}</div>
      ${Number.isInteger(a.choice)?`<div class="hint ${a.choice===q.correct?"good":"warn"}" role="status"><strong>${a.choice===q.correct?"Correct.":"The correct answer is "+esc(q.model)+"."}</strong><div>${esc(q.explanation)}</div></div>`:`<p class="muted small">The answer and a reason appear as soon as you choose.</p>`}`;
  }
  function renderWritten(q,a){
    const parts=q.parts.map((p,i)=>{
      const first=a.firstAnswers?.[i]??"";
      const initial=`<div class="field"><label for="part-${i}">(${String.fromCharCode(97+i)}) ${esc(p.prompt)} <span class="muted">[1]</span></label><textarea id="part-${i}" data-part="${i}" maxlength="600" ${a.submitted?"disabled":""}>${esc(a.drafts?.[i]??first)}</textarea></div>`;
      if(!a.submitted)return initial;
      const correct=a.firstCorrect?.[i];
      const retry=!correct&&!a.revealed?`<div class="field"><label for="retry-${i}">Try (${String.fromCharCode(97+i)}) once more</label><textarea id="retry-${i}" data-retry="${i}" maxlength="600">${esc(a.retryDrafts?.[i]||"")}</textarea></div>`:"";
      const fb=correct?`<div class="hint good small"><strong>First answer matched.</strong><div><strong>Expected answer:</strong> ${esc(p.model||p.answer)}</div></div>`:
        a.revealed?`<div class="hint ${a.retryCorrect?.[i]?"good":"warn"} small"><strong>${a.retryCorrect?.[i]?"Improved after the hint.":"Compare with the model answer."}</strong><div><strong>Expected answer:</strong> ${esc(p.model||p.answer)}</div></div>`:
        `<div class="hint small"><strong>Hint:</strong> ${esc(p.hint)} Your first answer may also be correct in different wording; an uncertain answer will be flagged for teacher review.</div>`;
      return `<div>${initial}${fb}${retry}</div>`;
    }).join("<hr style='border:0;border-top:1px solid #e0e8f2;margin:18px 0'>");
    const controls=!a.submitted?`<div class="row"><button class="btn" data-action="check">Check first answers</button><button class="btn plain" data-action="skip">Skip question</button></div>`:
      !a.revealed?`<div class="row"><button class="btn" data-action="retry">Check retries and show models</button><button class="btn plain" data-action="reveal">Show models without retry</button></div>`:
      `<p class="muted small">First answers earn the practice marks. Retried answers show improvement but do not change that score.</p>`;
    return `<div class="hint small" style="margin-bottom:16px">${esc(q.context)} Each part is worth one mark.</div>${parts}${controls}<div id="message" class="error" role="alert"></div>`;
  }
  function setMessage(s){const el=document.getElementById("message");if(el)el.textContent=s}
  function collectDrafts(q,a,kind){
    if(kind==="first")a.drafts=q.parts.map((_,i)=>document.getElementById("part-"+i)?.value||a.drafts?.[i]||"");
    else a.retryDrafts=q.parts.map((_,i)=>document.getElementById("retry-"+i)?.value||a.retryDrafts?.[i]||"");
    save();
  }
  function checkFirst(skip=false){
    const q=paper.questions[qIndex],a=qstate(q);collectDrafts(q,a,"first");
    a.firstAnswers=skip?q.parts.map(()=>""):a.drafts.slice();
    a.firstCorrect=q.parts.map((p,i)=>matches(a.firstAnswers[i],p));
    a.submitted=true;a.revealed=skip||a.firstCorrect.every(Boolean);a.skipped=skip;save();renderPractice();
  }
  function checkRetries(reveal=false){
    const q=paper.questions[qIndex],a=qstate(q);collectDrafts(q,a,"retry");
    if(!reveal&&q.parts.some((_,i)=>!a.firstCorrect[i]&&!a.retryDrafts?.[i]?.trim())){setMessage("Write a retry for each missed part, or choose Show models without retry.");return}
    a.retryCorrect=q.parts.map((p,i)=>a.firstCorrect[i]?false:matches(a.retryDrafts?.[i]||"",p));
    a.revealed=true;save();renderPractice();
  }
  function finish(){
    if(!paper.questions.every(ready))return;
    attempt.finished=new Date().toISOString();save();renderResult();
  }
  function renderResult(){
    view="result";const s=stats();
    const topics=new Map();
    paper.questions.forEach(q=>{
      const a=attempt.answers[q.id]||{}, key=q.topic;
      if(!topics.has(key))topics.set(key,{got:0,max:0});
      const t=topics.get(key);t.max+=q.marks;
      if(q.section==="A"){if(a.choice===q.correct)t.got++}
      else t.got+=(a.firstCorrect||[]).filter(Boolean).length;
    });
    const weak=[...topics].sort((x,y)=>(x[1].got/x[1].max)-(y[1].got/y[1].max)).slice(0,3);
    app.innerHTML=`<div class="row between noprint"><div><p class="muted">Primary ${level.slice(1)} · Set ${paper.set}</p><h1>Practice complete</h1></div><button class="btn plain" data-action="level" data-level="${level}">Choose another set</button></div>
      <div class="card noprint"><div class="grid three"><div class="stat"><strong>${s.total}/100</strong><span>First-answer practice mark</span></div><div class="stat"><strong>${s.improvement}</strong><span>Answers improved after hints</span></div><div class="stat"><strong>${s.flagged.length}</strong><span>Written answers for teacher review</span></div></div><h2 style="margin-top:24px">Where to practise next</h2><div>${weak.map(([name,v])=>`<div class="topic"><span>${esc(name)}</span><strong>${v.got}/${v.max}</strong></div>`).join("")}</div><p class="muted" style="margin-top:16px">The written mark is automatic practice feedback. Your teacher may judge a different wording correct.</p>
      <div class="row"><button class="btn" data-action="report">Open Classroom report</button><button class="btn alt" data-action="prepare" data-set="${paper.set}">Try this set again</button></div></div>`;
  }
  function renderReport(){
    view="report";const s=stats();
    const topics=new Map();
    paper.questions.forEach(q=>{
      const a=attempt.answers[q.id]||{}, key=q.topic;
      if(!topics.has(key))topics.set(key,{got:0,max:0});
      const t=topics.get(key);t.max+=q.marks;
      t.got+=q.section==="A"?Number(a.choice===q.correct):(a.firstCorrect||[]).filter(Boolean).length;
    });
    const weak=[...topics].sort((x,y)=>(x[1].got/x[1].max)-(y[1].got/y[1].max)).slice(0,3);
    app.innerHTML=`<div class="row between noprint" style="margin-bottom:18px"><button class="btn alt" data-action="result">Back to results</button><button class="btn" data-action="print">Print or save as PDF</button></div>
      <article class="card report"><div><p class="muted small">Digital Literacy Practice</p><h1>Practice report</h1><p>Submit this report in Google Classroom after saving it as a PDF.</p></div>
      <table><tbody><tr><th>Student</th><td>${esc(attempt.name)}</td><th>Class</th><td>${esc(attempt.className)}</td></tr><tr><th>Paper</th><td>Primary ${level.slice(1)} · Set ${paper.set}</td><th>Attempt</th><td>${attempt.attemptNumber}</td></tr><tr><th>Completed</th><td colspan="3">${esc(new Date(attempt.finished).toLocaleString())}</td></tr></tbody></table>
      <h2>First-answer marks</h2><table><thead><tr><th>Section A</th><th>Section B</th><th>Section C</th><th>Total</th></tr></thead><tbody><tr><td>${s.section.A.got}/20</td><td>${s.section.B.got}/35</td><td>${s.section.C.got}/45</td><td><strong>${s.total}/100</strong></td></tr></tbody></table>
      <p><strong>Improved after hints:</strong> ${s.improvement} one-mark answers.</p><h2>Suggested topics to revisit</h2><ul>${weak.map(([name,v])=>`<li>${esc(name)} — ${v.got}/${v.max} first-answer marks</li>`).join("")}</ul>
      <h2>Teacher review</h2><p class="muted small">Only written first answers that did not match the practice keywords appear here. A teacher may award credit for valid wording.</p>
      ${s.flagged.length?s.flagged.map(f=>`<div class="flagitem"><strong>Question ${f.q}(${String.fromCharCode(96+f.part)}) · ${esc(f.topic)}</strong><br>Student: ${esc(f.answer.slice(0,240))}<br><span class="muted">Suggested answer: ${esc(f.expected)}</span></div>`).join(""):`<p>No written answers were flagged.</p>`}
      <p class="muted small">This is a practice result from the student's device. It is not an official examination mark. Report ID: ${esc(attempt.id.slice(0,8))}.</p></article>`;
  }
  app.addEventListener("click",e=>{
    const el=e.target.closest("[data-action]");if(!el)return;
    const action=el.dataset.action;
    if(action==="home")renderHome();
    else if(action==="level")renderLevel(el.dataset.level);
    else if(action==="prepare")renderPrepare(el.dataset.set);
    else if(action==="resume")resume(el.dataset.id);
    else if(action==="go"){qIndex=Number(el.dataset.index);renderPractice()}
    else if(action==="prev"){qIndex=Math.max(0,qIndex-1);renderPractice()}
    else if(action==="next"){qIndex=Math.min(paper.questions.length-1,qIndex+1);renderPractice()}
    else if(action==="check")checkFirst();
    else if(action==="skip")checkFirst(true);
    else if(action==="retry")checkRetries();
    else if(action==="reveal")checkRetries(true);
    else if(action==="finish")finish();
    else if(action==="report")renderReport();
    else if(action==="result")renderResult();
    else if(action==="print")window.print();
  });
  app.addEventListener("change",e=>{
    if(e.target.dataset.action!=="mcq"||!attempt)return;
    const q=paper.questions[qIndex],a=qstate(q);if(Number.isInteger(a.choice))return;
    a.choice=Number(e.target.value);save();renderPractice();
  });
  app.addEventListener("input",e=>{
    if(!attempt||view!=="practice")return;
    const q=paper.questions[qIndex],a=qstate(q);
    if(e.target.dataset.part!==undefined){a.drafts??=q.parts.map(()=>"");a.drafts[Number(e.target.dataset.part)]=e.target.value;save()}
    if(e.target.dataset.retry!==undefined){a.retryDrafts??=q.parts.map(()=>"");a.retryDrafts[Number(e.target.dataset.retry)]=e.target.value;save()}
  });
  app.addEventListener("submit",e=>{
    e.preventDefault();
    if(e.target.id==="start-form")start(document.getElementById("student-name").value,document.getElementById("student-class").value);
    if(e.target.id==="find-form")showHistory(document.getElementById("find-name").value,document.getElementById("find-class").value);
  });
  renderHome();
})();
