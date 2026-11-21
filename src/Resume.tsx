import {Data,Style,Tpl,Entry,dr,lines} from './lib'
export default function Resume({d,s,t}:{d:Data;s:Style;t:Tpl}){
 const c=s.color,f=`'${s.font||t.font}',sans-serif`,side=t.layout==='left'||t.layout==='right'
 const ats=t.cat==='ATS-Friendly',showPh=d.photo&&s.photo&&!ats,m=s.margin+'mm',dark=side&&t.dark
 const H=(x:string,inv=false)=>{const col=inv?'#fff':c,b:any={fontWeight:700,fontSize:'0.85em',textTransform:'uppercase',marginTop:s.gap,marginBottom:6,color:col}
  if(t.head==='line')b.borderBottom=`1.5px solid ${col}`
  if(t.head==='bar'){b.background=col;b.color=inv?c:'#fff';b.padding='2px 8px'}
  if(t.head==='caps')b.letterSpacing='.18em'
  if(t.head==='box'){b.border=`1.5px solid ${col}`;b.padding='2px 8px';b.display='inline-block'}
  if(t.head==='plain'){b.color=inv?'#fff':'#111'}
  if(t.head==='dot'){b.textAlign='center';x='· '+x+' ·'}
  return <div style={b}>{x}</div>}
 const ents=(h:string,l:Entry[])=>l.length>0&&<section>{H(h)}{l.map(e=><div key={e.id} style={{breakInside:'avoid',marginBottom:6}}>
  <div className="flex justify-between gap-2"><b>{e.title}</b><span className="shrink-0 opacity-75">{dr(e)}</span></div>
  <div className="opacity-80 italic">{[e.org,e.place].filter(Boolean).join(', ')}</div>
  {lines(e.text).length>0&&<ul className="list-disc ml-4">{lines(e.text).map((x,i)=><li key={i}>{x}</li>)}</ul>}</div>)}</section>
 const txt=(h:string,x:string)=>x&&<section style={{breakInside:'avoid'}}>{H(h)}<ul className="list-disc ml-4">{lines(x).map((l,i)=><li key={i}>{l}</li>)}</ul></section>
 const sk=[['Skills',d.skills],['Software',d.software],['Soft Skills',d.soft],['Languages',d.languages]].filter(x=>x[1])
 const contact=[d.email,d.phone,d.city,d.link].filter(Boolean)
 const photo=showPh&&<img src={d.photo} style={{width:t.id==='photo'?'38mm':'28mm',height:t.id==='photo'?'38mm':'34mm',objectFit:'cover',borderRadius:t.id==='photo'||t.layout==='center'?'50%':3}}/>
 const skills=(inv=false)=>sk.length>0&&<section>{H('Skills',inv)}{sk.map(([a,b])=><div key={a} style={{marginBottom:3}}><b>{a}: </b>{b}</div>)}</section>
 const sideBox=<div>{photo}{H('Contact',dark)}{contact.map(x=><div key={x} style={{wordBreak:'break-word'}}>{x}</div>)}{skills(dark)}</div>
 const main=<>{d.summary&&<section>{H('Summary')}<div>{d.summary}</div></section>}{!side&&t.layout!=='split'&&skills()}{ents('Experience',d.exp)}{ents('Education',d.edu)}{ents('Certifications',d.cert)}{txt('Projects',d.projects)}{txt('Awards',d.awards)}{txt('References',d.refs)}</>
 const nameBlock=<div className={t.layout==='center'?'text-center':''}><div style={{fontSize:'2.3em',fontWeight:700,lineHeight:1.1,color:t.layout==='band'?'#fff':c,textTransform:t.id==='bold'?'uppercase':undefined}}>{d.name||'Your Name'}</div><div style={{fontSize:'1.1em',opacity:.85}}>{d.title}</div>{!side&&t.layout!=='split'&&<div style={{marginTop:4,fontSize:'.9em'}}>{contact.join('  |  ')}</div>}</div>
 const header=<div style={{display:'flex',justifyContent:t.layout==='center'?'center':'space-between',alignItems:'center',gap:12,...(t.layout==='band'||t.layout==='split'?{background:c,color:'#fff',padding:m}:{}),flexDirection:t.layout==='center'?'column':'row'}}>{nameBlock}{!side&&photo}</div>
 const page:any={width:'210mm',minHeight:'297mm',background:'#fff',color:'#111',fontFamily:f,fontSize:s.size,lineHeight:1.4,boxSizing:'border-box'}
 let body
 if(side){const sb=<div style={{padding:m,background:dark?c:c+'14',color:dark?'#fff':'#111'}}>{sideBox}</div>
  body=<div style={{display:'grid',gridTemplateColumns:t.layout==='left'?'32% 68%':'68% 32%',minHeight:'297mm'}}>{t.layout==='left'&&sb}<div style={{padding:m}}>{nameBlock}{main}</div>{t.layout==='right'&&sb}</div>}
 else if(t.layout==='split')body=<>{header}<div style={{display:'grid',gridTemplateColumns:'65% 35%'}}><div style={{padding:m}}>{main}</div><div style={{padding:m,background:c+'14'}}>{sideBox}</div></div></>
 else body=<>{t.layout==='band'?header:<div style={{padding:`${m} ${m} 0`}}>{header}</div>}<div style={{padding:m,paddingTop:t.layout==='band'?m:0}}>{main}</div></>
 return <div style={page}>{body}</div>}
