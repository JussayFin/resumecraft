import {useEffect,useState} from 'react'
import {LayoutDashboard,LayoutGrid,Plus,Copy,Trash2,Pencil,Download,FileText,ArrowLeft,ArrowUp,ArrowDown,Eye} from 'lucide-react'
import Resume from './Resume'
import {Res,Data,Entry,TPLS,tplOf,uid,newEntry,emptyData,defStyle,FONTS,SAMPLE,completion,toDocx} from './lib'
const K='resumecraft.v1'
const load=():Res[]=>{try{return JSON.parse(localStorage.getItem(K)||'[]')}catch{return[]}}
const Thumb=({tpl,color}:{tpl:string;color?:string})=><div style={{width:'60mm',height:'85mm',overflow:'hidden'}}><div style={{zoom:.285}}><Resume d={SAMPLE} s={{...defStyle,color:color||'#1f2937'}} t={tplOf(tpl)}/></div></div>
const F=({l,children}:{l:string;children:any})=><label className="block mb-3 text-sm font-medium">{l}<div className="mt-1 font-normal">{children}</div></label>
function Entries({list,set,L}:{list:Entry[];set:(l:Entry[])=>void;L:string[]}){
 const up=(i:number,p:Partial<Entry>)=>set(list.map((e,j)=>j===i?{...e,...p}:e))
 const mv=(i:number,k:number)=>{const l=[...list],[x]=l.splice(i,1);l.splice(i+k,0,x);set(l)}
 return <div>{list.map((e,i)=><div key={e.id} className="border rounded-xl p-3 mb-3 bg-white">
  <div className="flex gap-1 justify-end mb-2"><button className="btn" disabled={i===0} onClick={()=>mv(i,-1)}><ArrowUp size={14}/></button><button className="btn" disabled={i===list.length-1} onClick={()=>mv(i,1)}><ArrowDown size={14}/></button><button className="btn" onClick={()=>set(list.filter((_,j)=>j!==i))}><Trash2 size={14}/></button></div>
  <F l={L[0]}><input value={e.title} onChange={x=>up(i,{title:x.target.value})}/></F><F l={L[1]}><input value={e.org} onChange={x=>up(i,{org:x.target.value})}/></F>
  <F l="Location"><input value={e.place} onChange={x=>up(i,{place:x.target.value})}/></F>
  <div className="grid grid-cols-2 gap-2"><F l={L[2]}><input value={e.start} onChange={x=>up(i,{start:x.target.value})}/></F><F l={L[3]}><input disabled={e.current} value={e.end} onChange={x=>up(i,{end:x.target.value})}/></F></div>
  <label className="flex gap-2 text-sm mb-3 items-center"><input type="checkbox" style={{width:16}} checked={e.current} onChange={x=>up(i,{current:x.target.checked})}/>Currently here</label>
  <F l={L[4]}><textarea rows={3} value={e.text} onChange={x=>up(i,{text:x.target.value})}/></F></div>)}
  <button className="btn" onClick={()=>set([...list,newEntry()])}><Plus size={14}/>Add</button></div>}
function Editor({r,upd,back}:{r:Res;upd:(p:Partial<Res>)=>void;back:()=>void}){
 const [tab,setTab]=useState('Info'),[pv,setPv]=useState(false),d=r.data,s=r.style
 const sd=(p:Partial<Data>)=>upd({data:{...d,...p}}),ss=(p:Partial<typeof s>)=>upd({style:{...s,...p}})
 const T=(k:keyof Data,l:string,area=false,rows=3)=><F l={l}>{area?<textarea rows={rows} value={d[k] as string} onChange={e=>sd({[k]:e.target.value})}/>:<input value={d[k] as string} onChange={e=>sd({[k]:e.target.value})}/>}</F>
 const pdf=()=>{const o=document.title;document.title=d.name||'resume';window.print();document.title=o}
 const photo=(f?:File)=>{if(!f)return;const fr=new FileReader();fr.onload=()=>sd({photo:fr.result as string});fr.readAsDataURL(f)}
 return <div className="flex flex-col h-screen"><div className="noprint flex flex-wrap items-center gap-2 p-3 border-b bg-white">
  <button className="btn" onClick={back}><ArrowLeft size={14}/></button><input style={{width:180}} value={r.name} onChange={e=>upd({name:e.target.value})}/>
  <select style={{width:190}} value={r.tpl} onChange={e=>upd({tpl:e.target.value})}>{['Professional','Creative','ATS-Friendly','Specialized'].map(c=><optgroup key={c} label={c}>{TPLS.filter(t=>t.cat===c).map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</optgroup>)}</select>
  <button className="btn md:hidden" onClick={()=>setPv(!pv)}><Eye size={14}/>{pv?'Edit':'Preview'}</button>
  <div className="ml-auto flex gap-2"><button className="btn dark" onClick={pdf}><Download size={14}/>PDF</button><button className="btn" onClick={()=>toDocx(r)}><FileText size={14}/>DOCX</button></div></div>
  <div className="flex flex-1 overflow-hidden"><div className={`noprint md:w-[420px] w-full overflow-auto p-4 ${pv?'hidden md:block':''}`}>
   <div className="flex gap-1 flex-wrap mb-4">{['Info','Experience','Education','Skills','More','Design'].map(x=><button key={x} className={'btn '+(tab===x?'dark':'')} onClick={()=>setTab(x)}>{x}</button>)}</div>
   {tab==='Info'&&<>{T('name','Full name *')}{T('title','Professional title')}{T('email','Email *')}{T('phone','Phone *')}{T('city','City, Country')}{T('link','LinkedIn / Portfolio URL')}{T('summary','Professional summary',true,4)}<F l="Profile photo"><input type="file" accept="image/*" onChange={e=>photo(e.target.files?.[0])}/></F>{d.photo&&<button className="btn" onClick={()=>sd({photo:''})}>Remove photo</button>}</>}
   {tab==='Experience'&&<Entries list={d.exp} set={l=>sd({exp:l})} L={['Job title','Company','Start date','End date','Responsibilities & achievements (one per line)']}/>}
   {tab==='Education'&&<Entries list={d.edu} set={l=>sd({edu:l})} L={['Degree / course & field','School / university','Start date','Graduation date','Achievements (one per line)']}/>}
   {tab==='Skills'&&<>{T('skills','Hard / technical skills (one per line or comma)',true)}{T('software','Software proficiency',true)}{T('soft','Soft skills',true)}{T('languages','Languages',true)}</>}
   {tab==='More'&&<><div className="font-semibold mb-2">Certifications & training</div><Entries list={d.cert} set={l=>sd({cert:l})} L={['Certification','Issuing organization','Date obtained','Expires (optional)','Notes']}/>{T('projects','Projects (one per line)',true,4)}{T('awards','Awards (one per line)',true)}{T('refs','References (optional)',true)}</>}
   {tab==='Design'&&<><F l="Primary color"><input type="color" style={{height:40}} value={s.color} onChange={e=>ss({color:e.target.value})}/></F>
    <F l="Font"><select value={s.font} onChange={e=>ss({font:e.target.value})}><option value="">Template default</option>{FONTS.map(f=><option key={f}>{f}</option>)}</select></F>
    <F l={`Font size: ${s.size}px`}><input type="range" min={10} max={16} value={s.size} onChange={e=>ss({size:+e.target.value})}/></F>
    <F l={`Section spacing: ${s.gap}px`}><input type="range" min={6} max={28} value={s.gap} onChange={e=>ss({gap:+e.target.value})}/></F>
    <F l={`Page margins: ${s.margin}mm`}><input type="range" min={8} max={26} value={s.margin} onChange={e=>ss({margin:+e.target.value})}/></F>
    <label className="flex gap-2 text-sm mb-3 items-center"><input type="checkbox" style={{width:16}} checked={s.photo} onChange={e=>ss({photo:e.target.checked})}/>Show profile photo</label>
    <button className="btn" onClick={()=>upd({style:defStyle})}>Reset to default</button></>}
  </div>
  <div className={`flex-1 overflow-auto bg-neutral-200 p-4 ${pv?'':'hidden md:block'}`}><div className="sheet-wrap shadow-lg mx-auto" style={{zoom:Math.min(1,(innerWidth-(innerWidth>=768?480:32))/794),width:'210mm'}}><Resume d={d} s={s} t={tplOf(r.tpl)}/></div></div></div></div>}
export default function App(){
 const [rs,setRs]=useState<Res[]>(load),[v,setV]=useState<{p:string;id?:string}>({p:'home'}),[cat,setCat]=useState('All')
 useEffect(()=>{localStorage.setItem(K,JSON.stringify(rs))},[rs])
 const create=(tpl:string)=>{const r:Res={id:uid(),name:'Untitled resume',tpl,updated:Date.now(),data:emptyData,style:defStyle};setRs([r,...rs]);setV({p:'edit',id:r.id})}
 const cur=rs.find(r=>r.id===v.id)
 if(v.p==='edit'&&cur)return <Editor r={cur} back={()=>setV({p:'home'})} upd={p=>setRs(rs.map(r=>r.id===cur.id?{...r,...p,updated:Date.now()}:r))}/>
 const nav=(p:string,I:any,l:string)=><button className={'btn '+(v.p===p?'dark':'')} onClick={()=>setV({p})}><I size={16}/>{l}</button>
 return <div className="md:flex min-h-screen"><aside className="md:w-56 p-4 border-b md:border-r bg-white flex md:flex-col gap-2 flex-wrap"><div className="font-bold text-xl mb-2 w-full">ResumeCraft</div>{nav('home',LayoutDashboard,'My Resumes')}{nav('tpl',LayoutGrid,'Templates')}<button className="btn dark" onClick={()=>create('minimalist')}><Plus size={16}/>New resume</button></aside>
 <main className="flex-1 p-5">{v.p==='tpl'?<><h1 className="text-2xl font-bold mb-3">Templates</h1><div className="flex gap-2 flex-wrap mb-4">{['All','Professional','Creative','ATS-Friendly','Specialized'].map(c=><button key={c} className={'btn '+(cat===c?'dark':'')} onClick={()=>setCat(c)}>{c}</button>)}</div>
  <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">{TPLS.filter(t=>cat==='All'||t.cat===cat).map(t=><div key={t.id} className="bg-white border rounded-xl p-3"><div className="mx-auto border" style={{width:'60mm'}}><Thumb tpl={t.id}/></div><div className="font-semibold mt-2">{t.name}</div><div className="text-xs text-neutral-500 mb-2">{t.cat}</div><button className="btn dark" onClick={()=>create(t.id)}>Use template</button></div>)}</div></>
 :<><h1 className="text-2xl font-bold mb-4">My Resumes</h1>{rs.length===0?<div className="border-2 border-dashed rounded-2xl p-10 text-center bg-white"><FileText className="mx-auto mb-3" size={40}/><p className="mb-4">No resumes yet. Create your first one.</p><button className="btn dark" onClick={()=>setV({p:'tpl'})}>Browse templates</button></div>
  :<div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">{[...rs].sort((a,b)=>b.updated-a.updated).map(r=><div key={r.id} className="bg-white border rounded-xl p-3"><div className="mx-auto border" style={{width:'60mm'}}><Thumb tpl={r.tpl} color={r.style.color}/></div><div className="font-semibold mt-2 truncate">{r.name}</div><div className="text-xs text-neutral-500">{tplOf(r.tpl).name} · {completion(r.data)}% complete · {new Date(r.updated).toLocaleDateString()}</div>
   <div className="flex gap-1 mt-2"><button className="btn dark" onClick={()=>setV({p:'edit',id:r.id})}><Pencil size={14}/>Edit</button><button className="btn" onClick={()=>setRs([{...r,id:uid(),name:r.name+' (copy)',updated:Date.now()},...rs])}><Copy size={14}/></button><button className="btn" onClick={()=>confirm(`Delete "${r.name}"?`)&&setRs(rs.filter(x=>x.id!==r.id))}><Trash2 size={14}/></button></div></div>)}</div>}</>}</main></div>}
