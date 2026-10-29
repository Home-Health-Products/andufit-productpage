// Preserve legacy browser compositing after Next 15 CSS serialization changes.
const postcss = require('postcss');
function identity(context,selector,property){return JSON.stringify([context,selector,property]);}
function restoreColors(sources,rules){
 const byKey=new Map(rules.map(r=>[identity(r.context,r.selector,r.property),r]));
 if(byKey.size!==rules.length)throw new Error('Duplicate legacy CSS rule');
 const counts=new Map(rules.map(r=>[r,0]));
 const output=sources.map(source=>{
  const root=postcss.parse(source);
  root.walkDecls(decl=>{
   if(decl.parent.type!=='rule')return;
   const context=[];for(let n=decl.parent.parent;n&&n.type!=='root';n=n.parent)if(n.type==='atrule')context.unshift('@'+n.name+' '+n.params);
   const rule=byKey.get(identity(context,decl.parent.selector,decl.prop));if(!rule)return;
   if(decl.value!==rule.after)throw new Error('Unexpected legacy CSS value: '+decl.parent.selector+' '+decl.prop);
   counts.set(rule,counts.get(rule)+1);decl.value=rule.before;
  });
  return root.toString();
 });
 for(const [rule,count]of counts)if(count!==1)throw new Error('Legacy CSS coverage '+count+': '+rule.selector+' '+rule.property);
 return output;
}
class LegacyCssColorsPlugin{
 constructor(rules){this.rules=rules;}
 apply(compiler){
  if(!compiler.options.plugins.some(p=>p.constructor.name==='RealContentHashPlugin')&&!compiler.options.optimization.realContentHash)throw new Error('Legacy CSS requires webpack realContentHash');
  compiler.hooks.compilation.tap('LegacyCssColorsPlugin',compilation=>{
   compilation.hooks.processAssets.tap({name:'LegacyCssColorsPlugin',stage:401},()=>{
    const assets=compilation.getAssets().filter(a=>/\.css$/.test(a.name));
    if(assets.some(a=>a.info.related?.sourceMap))throw new Error('Legacy CSS source maps require regeneration');
    const restored=restoreColors(assets.map(a=>a.source.source().toString()),this.rules);
    assets.forEach((asset,i)=>compilation.updateAsset(asset.name,new compiler.webpack.sources.RawSource(restored[i]),asset.info));
   });
  });
 }
}
module.exports={restoreColors,LegacyCssColorsPlugin};
