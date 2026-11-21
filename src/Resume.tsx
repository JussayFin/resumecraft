import {Data,Style,Tpl,Entry,dr,lines} from './lib'
const items=(x:string)=>x.split(/[\n,]/).map(a=>a.trim()).filter(Boolean)
export default function Resume({d,s,t}:{d:Data;s:Style;t:Tpl}){
 const c=s.color,f=`'${s.font||t.font}',sans-serif`,L=t.layout,side=L==='left'||L==='right',ats=t.cat==='ATS-Friendly'
 const showPh=!!d.photo&&s.photo&&!ats,m=s.margin+'mm',dark=side&&!!t.dark,grid=t.head==='side'&&!side&&L!=='split',tight=t.id==='compact'?.8:1
 const H=(x:string,inv=false)=>{const col=inv?'#fff':c,b:any={fontWeight:700,fontSize:'.85em',textTransform:'uppercase',marginTop:grid?0:s.gap*tight,marginBottom:6,color:col,letterSpacing:'.06em'}
  switch(t.head){case 'line':b.borderBottom=`1.5px solid ${col}`;break
   case 'bar':b.background=col;b.color=inv?c:'#fff';b.padding='2px 8px';break
   case 'caps':case 'side':b.letterSpacing='.2em';break
   case 'box':b.border=`1.5px solid ${col}`;b.padding='2px 8px';b.display='inline-block';break
   case 'plain':b.color=inv?'#fff':'#111';break
   case 'dot':b.textAlign='center';x='· '+x+' ·';break
   case 'pill':b.background=inv?'#ffffff33':c+'1f';b.borderRadius=99;b.padding='1px 10px';b.display='inline-block';break
   case 'under':b.display='inline-block';b.borderBottom=`3px solid ${col}`;b.paddingBottom=2}
  return <div style={b}>{x}</div>}
 const sec=(h:string,body:any,inv=false)=>grid?<section style={{display:'grid',gridTemplateColumns:'24% 1fr',gap:10,marginTop:s.gap*tight}}>{H(h,inv)}<div>{body}</div></section>:<section>{H(h,inv)}{body}</section>
 const det=(e:Entry)=>{const o=[e.org,e.place].filter(Boolean).join(', '),tl=lines(e.text);return <>{o&&<div className="italic opacity-80">{o}</div>}{tl.length>0&&<ul className="list-disc ml-4">{tl.map((x,i)=><li key={i}>{x}</li>)}</ul>}</>}
 const ents=(h:string,l:Entry[])=>l.length>0&&sec(h,l.map(e=>{const k={key:e.id}
  if(t.ent==='l'&&!side&&L!=='split')return <div {...k} style={{display:'grid',gridTemplateColumns:'22% 1fr',gap:10,marginBottom:8,breakInside:'avoid'}}><div className="opacity-75" style={{fontSize:'.9em'}}>{dr(e)}</div><div><b>{e.title}</b>{det(e)}</div></div>
  if(t.ent==='d')return <div {...k} style={{borderLeft:`2px solid ${c}`,paddingLeft:10,marginBottom:8,marginLeft:4,position:'relative',breakInside:'avoid'}}><i style={{position:'absolute',left:-6,top:5,width:10,height:10,borderRadius:99,background:c}}/><div className="opacity-75" style={{fontSize:'.85em'}}>{dr(e)}</div><b>{e.title}</b>{det(e)}</div>
  return <div {...k} style={{breakInside:'avoid',marginBottom:8}}><div className="flex justify-between gap-2"><b>{e.title}</b><span className="shrink-0 opacity-75">{dr(e)}</span></div>{det(e)}</div>}))
 const txt=(h:string,x:string)=>x&&sec(h,<ul className="list-disc ml-4">{lines(x).map((l,i)=><li key={i}>{l}</li>)}</ul>)
 const sk=[['Skills',d.skills],['Software',d.software],['Soft Skills',d.soft],['Languages',d.languages]].filter(x=>x[1])
 const skills=(inv=false)=>sk.length>0&&sec('Skills',sk.map(([a,b])=><div key={a} style={{marginBottom:5}}>{t.chip==='t'?<><b>{a}: </b>{items(b).join(', ')}</>:<><b>{a}</b>{t.chip==='c'?<div style={{marginTop:3}}>{items(b).map(i=><span key={i} style={{display:'inline-block',border:`1px solid ${inv?'#fff':c}`,borderRadius:99,padding:'0 9px',margin:'0 4px 4px 0',fontSize:'.9em'}}>{i}</span>)}</div>:<ul className="list-disc ml-4" style={{columns:2}}>{items(b).map(i=><li key={i}>{i}</li>)}</ul>}</>}</div>),inv)
 const contact=[d.email,d.phone,d.city,d.link].filter(Boolean)
 const big=t.id==='photo'||side,photo=showPh&&<img src={d.photo} style={{width:big?'100%':'30mm',maxWidth:big?'46mm':undefined,height:big?'52mm':'36mm',objectFit:'cover',borderRadius:L==='center'||t.id==='photo'?(L==='center'?'50%':10):3,margin:big?'0 auto':undefined,display:'block'}}/>
 const nmS:any=t.id==='bold'?{fontSize:'3.2em',fontWeight:900,textTransform:'uppercase',letterSpacing:'-.01em'}:t.nm==='l'?{fontSize:'2.7em',fontWeight:300,letterSpacing:'.1em',textTransform:'uppercase'}:t.nm==='c'?{fontSize:'1.9em',fontWeight:700,letterSpacing:'.22em',textTransform:'uppercase'}:{fontSize:'2.4em',fontWeight:800}
 const hd=L==='band'||L==='split'
 const nameBlock=<div style={{textAlign:L==='center'?'center':'left'}}><div style={{...nmS,lineHeight:1.1,color:hd?'#fff':c}}>{d.name||'Your Name'}</div><div style={{fontSize:'1.05em',opacity:.85,marginTop:3,letterSpacing:t.nm==='c'?'.15em':undefined,textTransform:t.nm==='c'?'uppercase':undefined}}>{d.title}</div>{!side&&L!=='split'&&<div style={{marginTop:5,fontSize:'.9em'}}>{contact.join('  ·  ')}</div>}</div>
 const header=<div style={{display:'flex',justifyContent:L==='center'?'center':'space-between',alignItems:'center',gap:14,flexDirection:L==='center'?'column':'row',...(hd?{background:c,color:'#fff',padding:m}:{})}}>{nameBlock}{!side&&photo}</div>
 const sideBox=<div>{side&&photo}{!side&&photo}{sec('Contact',contact.map(x=><div key={x} style={{wordBreak:'break-word',marginBottom:3}}>{x}</div>),dark)}{skills(dark)}</div>
 const main=<>{d.summary&&sec('Summary',<div>{d.summary}</div>)}{!side&&L!=='split'&&skills()}{ents('Experience',d.exp)}{ents('Education',d.edu)}{ents('Certifications',d.cert)}{txt('Projects',d.projects)}{txt('Awards',d.awards)}{txt('References',d.refs)}</>
 let body
 if(side){const sb=<div style={{padding:m,background:dark?c:c+'14',color:dark?'#fff':'#111'}}>{sideBox}</div>
  body=<div style={{display:'grid',gridTemplateColumns:L==='left'?'33% 67%':'67% 33%',minHeight:'297mm'}}>{L==='left'&&sb}<div style={{padding:m}}>{nameBlock}{main}</div>{L==='right'&&sb}</div>}
 else if(L==='split')body=<>{header}<div style={{display:'grid',gridTemplateColumns:'65% 35%'}}><div style={{padding:m}}>{main}</div><div style={{padding:m,background:c+'14'}}>{contact.length>0&&sec('Contact',contact.map(x=><div key={x} style={{wordBreak:'break-word',marginBottom:3}}>{x}</div>)) }{skills()}</div></div></>
 else body=<>{L==='band'?header:<div style={{padding:`${m} ${m} 0`}}>{header}</div>}<div style={{padding:m,paddingTop:L==='band'?m:s.gap}}>{main}</div></>
 return <div style={{width:'210mm',minHeight:'297mm',background:'#fff',color:'#111',fontFamily:f,fontSize:s.size,lineHeight:1.4,boxSizing:'border-box',position:'relative'}}>
  {t.deco==='t'&&<div style={{height:'7mm',background:c}}/>}{t.deco==='s'&&<div style={{position:'absolute',left:0,top:0,bottom:0,width:'7mm',background:c}}/>}{t.deco==='f'&&<div style={{position:'absolute',inset:'6mm',border:`1.5px solid ${c}`,pointerEvents:'none'}}/>}
  <div style={{marginLeft:t.deco==='s'?'7mm':0}}>{body}</div></div>}
