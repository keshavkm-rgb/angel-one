const AngelSim={QTY:416,INVESTED:253000,AVG:608.17,PREV:588.25,cycle:[587.25,587.45,587.70,587.95,588.20,588.05,587.75,587.50,587.90,588.45,588.15,587.60,587.80],load(){try{return JSON.parse(localStorage.getItem('angelone_hindzinc_sim_v1'))||{price:587.80,ts:Date.now()}}catch(e){return{price:587.80,ts:Date.now()}}},save(price){localStorage.setItem('angelone_hindzinc_sim_v1',JSON.stringify({price,ts:Date.now()}));},calc(px){let current=px*this.QTY,today=(px-this.PREV)*this.QTY,overall=current-this.INVESTED;return{current,today,overall,tp:(px-this.PREV)/this.PREV*100,op:overall/this.INVESTED*100}},money(n){return '₹'+Math.abs(n).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2})},signed(n){return (n>=0?'+':'−')+this.money(n)},pct(n){return (n>=0?'+':'−')+Math.abs(n).toFixed(2)+'%'},cls(n){return n>=0?'green':'red'},render(){let px=this.load().price,c=this.calc(px);document.querySelectorAll('[data-price]').forEach(e=>e.textContent=px.toFixed(2));[['current',c.current],['today',c.today],['overall',c.overall]].forEach(([k,v])=>document.querySelectorAll('[data-'+k+']').forEach(e=>{e.textContent=(k==='current'?this.money(v):this.signed(v));if(k!=='current')e.classList.add(this.cls(v))}));[['todaypct',c.tp],['overallpct',c.op]].forEach(([k,v])=>document.querySelectorAll('[data-'+k+']').forEach(e=>{e.textContent=this.pct(v);e.classList.add(this.cls(v))}));},start(){this.save(587.80);this.render();let ci=this.cycle.findIndex(v=>Math.abs(v-587.80)<.01);setInterval(()=>{ci=(ci+1)%this.cycle.length;this.save(this.cycle[ci]);this.render();window.dispatchEvent(new Event('angelTick'));},2200);let n=23914.45,s=76570.35;setInterval(()=>{n+=(Math.random()-.48)*1.2;s+=(Math.random()-.48)*3.8;let ne=document.getElementById('nifty'),se=document.getElementById('sensex');if(ne)ne.textContent=n.toFixed(2)+' ▼';if(se)se.textContent=s.toFixed(2)+' ▼';},900);}};document.addEventListener('DOMContentLoaded',()=>AngelSim.start());
document.addEventListener('DOMContentLoaded',()=>{
  const file=(location.pathname.split('/').pop()||'home.html').toLowerCase();
  const groups={
    home:['home.html'],
    watch:['watchlist.html','tradeone.html'],
    portfolio:['portfolio.html','equity.html','mutualfunds.html','investment-picks.html','hindzinc.html'],
    orders:['orders.html','positions.html'],
    account:['account.html','profile.html','pnl.html','transactions.html','withdrawn.html']
  };
  let key='home';
  Object.entries(groups).forEach(([k,files])=>{if(files.includes(file))key=k});
  document.querySelectorAll('.bottomnav .navitem').forEach(a=>a.classList.toggle('active',a.dataset.nav===key));
});
