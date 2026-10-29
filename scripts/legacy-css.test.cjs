const {test}=require('node:test');
const assert=require('node:assert/strict');
const {restoreColors}=require('./legacy-css.cjs');
const rules=[{context:[],selector:'.stone',property:'background',after:'rgb(249 248 247/.6)',before:'hsla(30,14%,97%,.6)'}];
test('restores only exact baseline declaration, preserving other values and asset references',()=>{
 const result=restoreColors(['.stone{background:rgb(249 248 247/.6);color:red;background-image:url(/new-hash.svg)}'],rules);
 assert.equal(result[0],'.stone{background:hsla(30,14%,97%,.6);color:red;background-image:url(/new-hash.svg)}');
});
test('missing, unexpected and duplicate declarations fail closed',()=>{
 for(const css of ['.other{background:rgb(249 248 247/.6)}','.stone{background:red}', '.stone{background:rgb(249 248 247/.6)}.stone{background:rgb(249 248 247/.6)}']) assert.throws(()=>restoreColors([css],rules));
});
test('matches exact media ancestry and aggregates across assets',()=>{
 const r=[{...rules[0],context:['@media (min-width:800px)']}];
 assert.equal(restoreColors(['.stone{color:red}','@media (min-width:800px){.stone{background:rgb(249 248 247/.6)}}'],r)[1],'@media (min-width:800px){.stone{background:hsla(30,14%,97%,.6)}}');
});
