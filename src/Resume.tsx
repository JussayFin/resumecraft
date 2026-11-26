import {Mail,Phone,MapPin,Link2,Target,Briefcase,GraduationCap,User,Award,FolderOpen,Users,Languages} from 'lucide-react'
import {Data,Style,Tpl,Entry,dr,lines} from './lib'
const items=(x:string)=>x.split(/[\n,]/).map(a=>a.trim()).filter(Boolean)
const INK='#1f2937',MUTE='#6b7280'
const SW:Record<string,string[]>={a:['M470 168C700 125 900 40 1055 0V70C900 130 700 175 470 168Z','M560 160C760 130 930 85 1055 50V110C900 130 720 175 560 160Z'],b:['M640 0H1055V150Z','M820 0H1055V80Z'],c:['M300 170C550 110 800 170 1055 30V85C800 200 550 150 300 170Z','M520 170C720 140 900 120 1055 100V135C900 155 720 180 520 170Z'],n:[]}
const IC:any={'Career Objective':Target,'Work Experience':Briefcase,Education:GraduationCap,'Core Competencies':User,Languages,Certifications:Award,Projects:FolderOpen,Awards:Award,References:Users}
export default function Resume({d,s,t}:{d:Data;s:Style;t:Tpl}){
 const c=s.color,hi=s.hi||t.hi,fam=s.font||t.font,f=`'${fam}',${/Lora|Playfair|Georgia|Times/.test(fam)?'serif':'sans-serif'}`,L=t.layout,plain=L==='plain',side=L==='left'||L==='right',m=s.margin+'mm'
 const showPh=!!d.photo&&s.photo&&!plain,tight=t.id==='compact'?.8:1,mt=s.gap*tight
 const H=(x:string,inv=false)=>{const I=IC[x]||User
  if(t.head==='pill')return <div style={{display:'flex',alignItems:'center',marginTop:mt,marginBottom:8}}><span style={{width:30,height:30,borderRadius:99,background:hi,color:c,display:'flex',alignItems:'center',justifyContent:'center',flex:'none',zIndex:1}}><I size={16}/></span><span style={{flex:1,marginLeft:-15,paddingLeft:24,height:25,display:'flex',alignItems:'center',borderRadius:inv?0:8,background:inv?`linear-gradient(90deg,${hi}88,${hi})`:c,color:inv?c:'#f3f4f6',fontWeight:700,fontSize:'.78em',letterSpacing:'.08em',textTransform:'uppercase'}}>{x}</span></div>
  const b:any={fontWeight:700,fontSize:'.76em',textTransform:'uppercase',letterSpacing:'.16em',marginTop:mt,marginBottom:7,color:inv?hi:c}
  if(t.head==='bar'){b.background=inv?hi:c;b.color=inv?c:'#fff';b.padding='3px 10px';b.borderRadius=3}
  if(t.head==='line'){b.borderBottom=`1.5px solid ${inv?hi:c+'44'}`;b.paddingBottom=4}
  return <div style={b}>{x}</div>}
 const sec=(h:string,body:any,inv=false)=><section>{H(h,inv)}{body}</section>
 const dt=(e:Entry,x?:any)=><span style={{color:MUTE,fontSize:'.88em',whiteSpace:'nowrap',...x}}>{dr(e)}</span>
 const det=(e:Entry)=>{const o=[e.org,e.place].filter(Boolean).join(', '),tl=lines(e.text);return <>{o&&<div style={{color:c,fontWeight:500}}>{o}</div>}{tl.length>0&&<ul className="ml-4 list-disc" style={{marginTop:2}}>{tl.map((x,i)=><li key={i} style={{marginBottom:1}}>{x}</li>)}</ul>}</>}
 const ttl=(e:Entry)=><b style={{fontWeight:600,fontSize:'1.03em'}}>{e.title}</b>
 const ents=(h:string,l:Entry[])=>l.length>0&&sec(h,l.map(e=>{const k={key:e.id}
  if(t.ent==='l')return <div {...k} style={{display:'grid',gridTemplateColumns:'24% 1fr',gap:10,marginBottom:9,breakInside:'avoid'}}>{dt(e,{whiteSpace:'normal',paddingTop:2})}<div>{ttl(e)}{det(e)}</div></div>
  if(t.ent==='d')return <div {...k} style={{borderLeft:`2px solid ${c}40`,paddingLeft:12,marginBottom:9,marginLeft:4,position:'relative',breakInside:'avoid'}}><i style={{position:'absolute',left:-6,top:4,width:10,height:10,borderRadius:99,background:c,boxShadow:'0 0 0 3px #fff'}}/>{dt(e)}<div>{ttl(e)}</div>{det(e)}</div>
  return <div {...k} style={{breakInside:'avoid',marginBottom:9}}><div className="flex justify-between gap-3 items-baseline">{ttl(e)}{dt(e)}</div>{det(e)}</div>}))
 const txt=(h:string,x:string)=>x&&sec(h,<ul className="ml-4 list-disc">{lines(x).map((l,i)=><li key={i} style={{marginBottom:1}}>{l}</li>)}</ul>)
 const all=[...items(d.skills),...items(d.software),...items(d.soft)],langs=items(d.languages)
 const bl=(a:string[])=><ul className="ml-4 list-disc">{a.map(i=><li key={i} style={{marginBottom:3}}>{i}</li>)}</ul>
 const skillBody=(inv:boolean)=>t.chip==='c'?<div style={{display:'flex',flexWrap:'wrap',gap:4}}>{all.map(i=><span key={i} style={{background:inv?'#ffffff26':c+'14',color:inv?'#fff':INK,borderRadius:6,padding:'1px 9px',fontSize:'.9em'}}>{i}</span>)}</div>:inv||t.chip==='l'?bl(all):<>{[['Skills',d.skills],['Software',d.software],['Soft skills',d.soft]].filter(x=>x[1]).map(([a,b])=><div key={a} style={{marginBottom:3}}><b style={{fontWeight:600}}>{a}: </b>{items(b).join(', ')}</div>)}</>
 const skills=(inv=false)=>all.length>0&&sec('Core Competencies',skillBody(inv),inv),lang=(inv=false)=>langs.length>0&&sec('Languages',bl(langs),inv)
 const edSide=(inv:boolean)=>d.edu.length>0&&sec('Education',d.edu.map(e=><div key={e.id} style={{marginBottom:9,breakInside:'avoid'}}><b style={{fontWeight:600}}>{e.title}</b>{[e.org,e.place].filter(Boolean).map(x=><div key={x}>{x}</div>)}{dr(e)&&<div style={{opacity:.7,fontSize:'.88em'}}>{dr(e)}</div>}{lines(e.text).map((x,i)=><div key={i} style={{fontSize:'.9em'}}>{x}</div>)}</div>),inv)
 const ci:any[]=[[Phone,d.phone],[Mail,d.email],[MapPin,d.city],[Link2,d.link]].filter(x=>x[1])
 const row=ci.flatMap(([I,x],i)=>[i>0&&<i key={'s'+i} style={{width:2,height:18,background:plain?'#d1d5db':hi,margin:'0 12px'}}/>,<span key={x} style={{display:'inline-flex',alignItems:'center',gap:6}}><I size={13} strokeWidth={2.2}/>{x}</span>])
 const hc=plain?INK:'#fff'
 const nameBlock=<div><div style={{fontSize:'2.9em',fontWeight:800,lineHeight:1.05,textTransform:'uppercase',color:plain?c:hc,letterSpacing:t.id==='bold'?'-.02em':'.01em'}}>{d.name||'Your Name'}</div><div style={{fontSize:'1.12em',fontWeight:700,color:plain?INK:hi,textTransform:'uppercase',marginTop:4}}>{d.title}</div><div style={{height:2,background:plain?'#d1d5db':hi,margin:'10px 0'}}/><div style={{display:'flex',flexWrap:'wrap',alignItems:'center',rowGap:4,fontSize:'.88em',color:plain?MUTE:'#ffffffe6'}}>{row}</div></div>
 const header=<div style={{position:'relative',overflow:'hidden',padding:m,background:plain?'transparent':c,display:'flex',gap:'8mm',alignItems:'center'}}>{!plain&&<svg viewBox="0 0 1055 170" preserveAspectRatio="none" style={{position:'absolute',right:0,top:0,width:'60%',height:'60%'}}>{SW[t.sw].map((p,i)=><path key={i} d={p} fill={hi} opacity={i?.45:.9}/>)}</svg>}{showPh&&<img src={d.photo} style={{position:'relative',width:'42mm',height:'50mm',objectFit:'cover',borderRadius:16,border:`4px solid ${hi}`,flex:'none'}}/>}<div style={{position:'relative',flex:1}}>{nameBlock}</div></div>
 const base=<>{d.summary&&sec('Career Objective',<div style={{color:'#374151'}}>{d.summary}</div>)}</>
 const tail=<>{ents('Work Experience',d.exp)}{!side&&L!=='split'&&ents('Education',d.edu)}{ents('Certifications',d.cert)}{txt('Projects',d.projects)}{txt('Awards',d.awards)}{txt('References',d.refs)}</>
 const main=<>{base}{!side&&L!=='split'&&<>{skills()}{lang()}</>}{tail}</>
 const panel:any={background:'#fff',color:INK,padding:m}
 let body
 if(plain)body=<div style={{padding:`0 ${m} ${m}`}} className="mk">{main}</div>
 else if(side){const sb=<div style={{padding:m,color:'#fff'}}>{skills(true)}{lang(true)}{edSide(true)}</div>,mn=<div className="mk" style={{...panel,borderRadius:L==='left'?'28px 0 0 0':'0 28px 0 0'}}>{main}</div>
  body=<div style={{display:'grid',gridTemplateColumns:L==='left'?'33% 67%':'67% 33%',flex:1}}>{L==='left'?<>{sb}{mn}</>:<>{mn}{sb}</>}</div>}
 else if(L==='split')body=<div className="mk" style={{display:'grid',gridTemplateColumns:'63% 37%',flex:1,background:'#fff',borderRadius:'28px 28px 0 0',overflow:'hidden'}}><div style={{padding:m,color:INK}}>{base}{tail}</div><div style={{padding:m,background:c+'10',color:INK}}>{skills()}{lang()}{edSide(false)}</div></div>
 else body=<div className="mk" style={{...panel,flex:1,borderRadius:'28px 28px 0 0'}}>{main}</div>
 return <div className="rc" style={{['--ac' as any]:hi,['--mc' as any]:c,width:'210mm',minHeight:'297mm',display:'flex',flexDirection:'column',background:plain?'#fff':c,color:INK,fontFamily:f,fontSize:s.size,lineHeight:1.45,boxSizing:'border-box'}}>{header}{body}</div>}
