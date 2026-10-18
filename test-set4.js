const fs=require("fs"),vm=require("vm"),assert=require("assert");const ctx={window:{}};vm.createContext(ctx);
for(const f of ["bank.js","set4-data.js","set4-bank.js"])vm.runInContext(fs.readFileSync(f,"utf8"),ctx,{filename:f});
for(const level of ["P4","P5","P6"])for(let set=1;set<=4;set++){
const p=set===4?ctx.window.SET4_BANK.makePaper(level):ctx.window.PRACTICE_BANK.makePaper(level,set);
assert.equal(p.questions.length,set===4?44:level==="P6"?40:46);
assert.equal(p.totals.A,20);assert.equal(p.totals.B,35);assert.equal(p.totals.C,45);
for(const q of p.questions){if(q.section==="A")assert(q.choices[q.correct]);else assert.equal(q.parts.length,q.marks);}
console.log(level,"Set",set,"OK");
}
