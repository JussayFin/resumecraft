import {Mail,Phone,MapPin,Link2} from 'lucide-react'
import {Data,Style,Tpl,Entry,dr,lines} from './lib'
const items=(x:string)=>x.split(/[\n,]/).map(a=>a.trim()).filter(Boolean)
const INK='#1f2937',MUTE='#6b7280'
export default function Resume({d,s,t}:{d:Data;s:Style;t:Tpl}){
 const c=s.color,fam=s.font||t.font,f=`'${fam}',${/Lora|Playfair|Georgia|Times/.test(fam)?'serif':'sans-serif'}`,L=t.layout,side=L==='left'||L==='right',ats=t.cat==='ATS-Friendly'
 const showPh=!!d.photo&&s.photo&&!ats,m=s.margin+'mm',dark=side&&!!t.dark,hd=L==='band'||L==='split',grid=t.head==='side'&&!side&&!hd&&L!=='split',tight=t.id==='compact'?.8:1
 const H=(x:string,inv=false)=>{const col=inv?'#fff':c,b:any={fontWeight:700,fontSize:'.74em',textTransform:'uppercase',marginTop:grid?2:s.gap*tight,marginBottom:7,color:col,letterSpacing:'.16em'}
  switch(t.head){case 'line':b.borderBottom=`1px solid ${inv?'#ffffff55':'#d1d5db'}`;b.paddingBottom=4;break
   case 'bar':b.background=inv?'#fff':c;b.color=inv?c:'#fff';b.padding='3px 10px';b.borderRadius=3;break
   case 'caps':b.letterSpacing='.26em';break
   case 'plain':b.color=inv?'#fff':INK;break
   case 'box':b.border=`1.5px solid ${col}`;b.padding='3px 10px';b.display='inline-block';b.borderRadius=6;break
   case 'dot':b.textAlign='center';x='—  '+x+'  —';break
   case 'pill':b.background=inv?'#ffffff33':c+'1a';b.borderRadius=99;b.padding='2px 12px';b.display='inline-block';break
   case 'under':b.display='inline-block';b.borderBottom=`2.5px solid ${col}`;b.paddingBottom=3}
  return <div style={b}>{x}</div>}
 const sec=(h:string,body:any,inv=false)=>grid?<section style={{display:'grid',gridTemplateColumns:'24% 1fr',gap:10,marginTop:s.gap*tight}}>{H(h,inv)}<div>{body}</div></section>:<section>{H(h,inv)}{body}</section>
 const dt=(e:Entry,x?:any)=><span style={{color:MUTE,fontSize:'.88em',whiteSpace:'nowrap',...x}}>{dr(e)}</span>
 const det=(e:Entry)=>{const o=[e.org,e.place].filter(Boolean).join(', '),tl=lines(e.text);return <>{o&&<div style={{color:c,fontWeight:500}}>{o}</div>}{tl.length>0&&<ul className="ml-4 list-disc" style={{marginTop:2}}>{tl.map((x,i)=><li key={i} style={{marginBottom:1}}>{x}</li>)}</ul>}</>}
 const ttl=(e:Entry)=><b style={{fontWeight:600,fontSize:'1.03em'}}>{e.title}</b>
 const ents=(h:string,l:Entry[])=>l.length>0&&sec(h,l.map(e=>{const k={key:e.id}
  if(t.ent==='l'&&!side&&L!=='split')return <div {...k} style={{display:'grid',gridTemplateColumns:'22% 1fr',gap:10,marginBottom:9,breakInside:'avoid'}}>{dt(e,{whiteSpace:'normal',paddingTop:2})}<div>{ttl(e)}{det(e)}</div></div>
  if(t.ent==='d')return <div {...k} style={{borderLeft:`2px solid ${c}40`,paddingLeft:12,marginBottom:9,marginLeft:4,position:'relative',breakInside:'avoid'}}><i style={{position:'absolute',left:-6,top:4,width:10,height:10,borderRadius:99,background:c,boxShadow:'0 0 0 3px #fff'}}/>{dt(e)}<div>{ttl(e)}</div>{det(e)}</div>
  return <div {...k} style={{breakInside:'avoid',marginBottom:9}}><div className="flex justify-between gap-3 items-baseline">{ttl(e)}{dt(e)}</div>{det(e)}</div>}))
 const txt=(h:string,x:string)=>x&&sec(h,<ul className="ml-4 list-disc">{lines(x).map((l,i)=><li key={i} style={{marginBottom:1}}>{l}</li>)}</ul>)
 const sk=[['Skills',d.skills],['Software',d.software],['Soft Skills',d.soft],['Languages',d.languages]].filter(x=>x[1])
 const skills=(inv=false)=>sk.length>0&&sec('Skills',sk.map(([a,b])=><div key={a} style={{marginBottom:6}}>{t.chip==='t'?<><b style={{fontWeight:600}}>{a}: </b>{items(b).join(', ')}</>:<><b style={{fontWeight:600}}>{a}</b>{t.chip==='c'?<div style={{marginTop:4,display:'flex',flexWrap:'wrap',gap:4}}>{items(b).map(i=><span key={i} style={{background:inv?'#ffffff26':c+'14',color:inv?'#fff':INK,borderRadius:6,padding:'1px 9px',fontSize:'.88em'}}>{i}</span>)}</div>:<ul className="ml-4 list-disc" style={{columns:2}}>{items(b).map(i=><li key={i}>{i}</li>)}</ul>}</>}</div>),inv)
 const ci:any[]=[[Mail,d.email],[Phone,d.phone],[MapPin,d.city],[Link2,d.link]].filter(x=>x[1])
 const row=ci.map(([I,x])=><span key={x} style={{display:'inline-flex',alignItems:'center',gap:5,marginRight:14}}><I size={12} strokeWidth={2.2}/>{x}</span>)
 const col=ci.map(([I,x])=><div key={x} style={{display:'flex',gap:7,marginBottom:5,wordBreak:'break-word'}}><I size={13} style={{flex:'none',marginTop:3}}/>{x}</div>)
 const big=t.id==='photo'||side,photo=showPh&&<img src={d.photo} style={{width:big?'100%':'30mm',maxWidth:big?'46mm':undefined,height:big?'52mm':'36mm',objectFit:'cover',borderRadius:L==='center'?'50%':14,margin:big?'0 auto 4mm':undefined,display:'block',border:hd?'3px solid #fff':undefined}}/>
 const nmS:any=t.id==='bold'?{fontSize:'3.1em',fontWeight:900,textTransform:'uppercase',letterSpacing:'-.02em'}:t.nm==='l'?{fontSize:'2.6em',fontWeight:300,letterSpacing:'.12em',textTransform:'uppercase'}:t.nm==='c'?{fontSize:'1.8em',fontWeight:600,letterSpacing:'.24em',textTransform:'uppercase'}:{fontSize:'2.6em',fontWeight:700,letterSpacing:'-.025em'}
 const nameBlock=<div style={{textAlign:L==='center'?'center':'left'}}><div style={{...nmS,lineHeight:1.08,color:hd?'#fff':INK}}>{d.name||'Your Name'}</div><div style={{fontSize:'1.1em',fontWeight:500,marginTop:4,color:hd?'#ffffffe6':c,letterSpacing:t.nm==='c'?'.16em':undefined,textTransform:t.nm==='c'?'uppercase':undefined}}>{d.title}</div>{!side&&!hd&&<div style={{marginTop:8,fontSize:'.88em',color:MUTE,display:'flex',flexWrap:'wrap',justifyContent:L==='center'?'center':'flex-start'}}>{row}</div>}{L==='band'&&<div style={{marginTop:8,fontSize:'.88em',color:'#ffffffd9',display:'flex',flexWrap:'wrap'}}>{row}</div>}</div>
 const header=<div style={{display:'flex',justifyContent:L==='center'?'center':'space-between',alignItems:'center',gap:14,flexDirection:L==='center'?'column':'row',...(hd?{background:`linear-gradient(120deg,${c},${c}d9)`,color:'#fff',padding:m}:{})}}>{nameBlock}{!side&&photo}</div>
 const sideBox=<div>{photo}{sec('Contact',col,dark)}{skills(dark)}</div>
 const main=<>{d.summary&&sec('Summary',<div style={{color:'#374151'}}>{d.summary}</div>)}{!side&&L!=='split'&&skills()}{ents('Experience',d.exp)}{ents('Education',d.edu)}{ents('Certifications',d.cert)}{txt('Projects',d.projects)}{txt('Awards',d.awards)}{txt('References',d.refs)}</>
 let body
 if(side){const sb=<div style={{padding:m,background:dark?`linear-gradient(180deg,${c},${c}ee)`:c+'0f',color:dark?'#fff':INK}}>{sideBox}</div>
  body=<div style={{display:'grid',gridTemplateColumns:L==='left'?'33% 67%':'67% 33%',minHeight:'297mm'}}>{L==='left'&&sb}<div style={{padding:m}}>{nameBlock}{main}</div>{L==='right'&&sb}</div>}
 else if(L==='split')body=<>{header}<div style={{display:'grid',gridTemplateColumns:'65% 35%'}}><div style={{padding:m}}>{main}</div><div style={{padding:m,background:c+'0f'}}>{sec('Contact',col)}{skills()}</div></div></>
 else body=<>{L==='band'?header:<div style={{padding:`${m} ${m} 0`}}>{header}</div>}<div style={{padding:m,paddingTop:L==='band'?m:s.gap}}>{main}</div></>
 return <div className="rc" style={{['--ac' as any]:c,width:'210mm',minHeight:'297mm',background:'#fff',color:INK,fontFamily:f,fontSize:s.size,lineHeight:1.45,boxSizing:'border-box',position:'relative'}}>
  {t.deco==='t'&&<div style={{height:'5mm',background:`linear-gradient(90deg,${c},${c}88)`}}/>}{t.deco==='s'&&<div style={{position:'absolute',left:0,top:0,bottom:0,width:'5mm',background:c}}/>}{t.deco==='f'&&<div style={{position:'absolute',inset:'6mm',border:`1px solid ${c}`,pointerEvents:'none'}}/>}
  <div style={{marginLeft:t.deco==='s'?'5mm':0}}>{body}</div></div>}
