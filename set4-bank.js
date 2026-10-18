/* Authored Set 4 converter. The original Sets 1–3 generator remains unchanged. */
(() => {
"use strict";
const names={P4:["Files and software","Working with text","Digital presentations","Multimedia","Digital communication","Spreadsheets","Scratch coding"],P5:["Storage and data","Networks and addresses","Word documents","Online safety","Excel data","Audio and video","Scratch projects"],P6:["Computer components","Enhanced documents","Spreadsheet analysis","Web pages","Digital life and technologies","Algorithms and flowcharts","Scratch game design"]};
function part(prompt,expected){return {prompt,answer:String(expected),model:String(expected),alternatives:[],hint:"Consider the situation carefully. Your teacher will review the full response."};}
function makePaper(level){
 const d=window.SET4_DATA&&window.SET4_DATA[level];if(!d)throw Error("Set 4 data missing");
 const A=d.sectionA.map((q,i)=>({id:"A"+(i+1),number:i+1,section:"A",unit:null,topic:"Applied multiple choice",marks:1,prompt:q.question,choices:q.choices,correct:q.correct,model:q.choices[q.correct],explanation:q.explanation}));
 const B=d.sectionB.map((q,i)=>{const keys=[...q.keyPoints];if(q.thirdMarkCriteria&&keys.length<q.marks)keys.push(q.thirdMarkCriteria);if(keys.length!==q.marks)throw Error(level+" B"+(i+1)+" marking points do not match marks");
 return {id:"B"+(i+1),number:21+i,section:"B",unit:null,topic:q.topic,marks:q.marks,context:q.question+" Give one response in each numbered box. Each box is one provisional mark; explanations require teacher review.",parts:keys.map((k,j)=>part("Answer point "+(j+1)+" of "+keys.length+".",k))};});
 const C=d.sectionC.map((q,i)=>({id:"C"+(i+1),number:21+B.length+i,section:"C",unit:null,topic:q.title,marks:q.parts.reduce((n,p)=>n+p.marks,0),context:q.scenario,visual:q.visual||null,parts:q.parts.flatMap(p=>Array.from({length:p.marks},(_,j)=>part(p.question+(p.marks>1?" (mark "+(j+1)+")":""),p.expected)))}));
 const questions=[...A,...B,...C],totals={A:A.reduce((n,q)=>n+q.marks,0),B:B.reduce((n,q)=>n+q.marks,0),C:C.reduce((n,q)=>n+q.marks,0)};
 if(questions.length!==44||totals.A!==20||totals.B!==35||totals.C!==45)throw Error("Set 4 mark or question totals invalid");
 return {level,set:4,units:names[level],questions,totals};
}
window.SET4_BANK={makePaper};
})();
