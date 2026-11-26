import {Document,Packer,Paragraph,TextRun,AlignmentType,BorderStyle,Tab,TabStopType} from 'docx'
export type Entry={id:string;title:string;org:string;place:string;start:string;end:string;current:boolean;text:string}
export type Data={name:string;title:string;email:string;phone:string;city:string;link:string;summary:string;photo:string;exp:Entry[];edu:Entry[];cert:Entry[];skills:string;software:string;soft:string;languages:string;projects:string;awards:string;refs:string}
export type Style={color:string;hi:string;font:string;size:number;gap:number;margin:number;photo:boolean}
export type Res={id:string;name:string;tpl:string;updated:number;data:Data;style:Style}
export type Tpl={id:string;name:string;cat:string;layout:'left'|'right'|'top'|'split'|'plain';head:'pill'|'bar'|'line'|'plain';font:string;accent:string;hi:string;sw:'a'|'b'|'c'|'n';ent:'r'|'l'|'d';chip:'c'|'t'|'l'}
export const uid=()=>Math.random().toString(36).slice(2,9)
export const newEntry=():Entry=>({id:uid(),title:'',org:'',place:'',start:'',end:'',current:false,text:''})
export const emptyData:Data={name:'',title:'',email:'',phone:'',city:'',link:'',summary:'',photo:'',exp:[],edu:[],cert:[],skills:'',software:'',soft:'',languages:'',projects:'',awards:'',refs:''}
export const defStyle:Style={color:'#111111',hi:'',font:'',size:13,gap:14,margin:16,photo:true}
export const FONTS=['Lato','Inter','DM Sans','Poppins','Montserrat','Manrope','Space Grotesk','Lora','Playfair Display','JetBrains Mono','Arial']
const FM:Record<string,string>={minimalist:'Inter','modern-pro':'DM Sans',corporate:'Manrope',executive:'Lora',traditional:'Lora',elegant:'Playfair Display',designer:'Poppins',sidebar:'DM Sans',contemporary:'Space Grotesk',bold:'Montserrat',portfolio:'Playfair Display','simple-ats':'Inter','pro-ats':'DM Sans',compact:'Inter','trad-ats':'Lora','modern-ats':'Manrope',fresh:'Poppins',finance:'Lora',admin:'DM Sans',it:'JetBrains Mono',engineering:'Space Grotesk',european:'Inter',academic:'Lora',experienced:'Montserrat',photo:'Poppins'}
const dx=(f:string)=>/Lora|Playfair|Georgia/.test(f)?'Georgia':/Mono|Courier/.test(f)?'Courier New':f==='Arial'?f:'Calibri'
const T=(s:string):Tpl=>{const [id,name,cat,layout,head,font,accent,hi,sw,ent,chip]=s.split('|');return {id,name,cat,layout,head,font,accent,hi,sw,ent,chip} as Tpl}
export const TPLS:Tpl[]=[
'minimalist|Minimalist|Professional|top|line|Inter|#111111|#d4d4d4|n|r|t','modern-pro|Modern Professional|Professional|left|pill|Lato|#0a1a3c|#d4af37|a|r|l','corporate|Corporate|Professional|right|bar|Inter|#14315c|#93c5fd|b|r|l','executive|Executive|Professional|top|pill|Lora|#1c1917|#d6b36a|a|r|t','traditional|Traditional|Professional|split|line|Lora|#1f2937|#9ca3af|n|r|t','elegant|Elegant|Professional|top|line|Playfair Display|#4a0d1d|#e8b4bc|c|l|t',
'designer|Creative Designer|Creative|left|pill|Poppins|#111111|#ff5a7a|c|d|c','sidebar|Modern Sidebar|Creative|right|pill|DM Sans|#064e3b|#6ee7b7|b|d|c','contemporary|Contemporary|Creative|split|pill|Space Grotesk|#312e81|#a5b4fc|a|r|c','bold|Bold Typography|Creative|top|bar|Montserrat|#000000|#facc15|b|l|t','portfolio|Portfolio Style|Creative|left|bar|Playfair Display|#3b0764|#d8b4fe|c|d|c',
'simple-ats|Simple ATS|ATS-Friendly|plain|plain|Inter|#000000|#000000|n|r|t','pro-ats|Professional ATS|ATS-Friendly|plain|line|DM Sans|#1f2937|#1f2937|n|r|t','compact|Compact One-Page|ATS-Friendly|plain|line|Inter|#000000|#000000|n|r|t','trad-ats|Traditional ATS|ATS-Friendly|plain|line|Lora|#000000|#000000|n|r|t','modern-ats|Modern ATS|ATS-Friendly|plain|bar|Manrope|#1e3a8a|#1e3a8a|n|r|t',
'fresh|Fresh Graduate|Specialized|left|pill|Poppins|#0c4a6e|#7dd3fc|a|r|c','finance|Accounting and Finance|Specialized|top|pill|Lora|#14532d|#86efac|a|r|t','admin|Administrative Assistant|Specialized|right|pill|DM Sans|#7c2d12|#fdba74|c|l|c','it|Information Technology|Specialized|left|bar|JetBrains Mono|#020617|#22d3ee|b|d|c','engineering|Engineering|Specialized|split|bar|Space Grotesk|#1e3a8a|#fbbf24|b|r|t','european|European CV|Specialized|left|line|Lato|#1e40af|#bfdbfe|n|l|l','academic|Academic|Specialized|top|line|Lora|#27272a|#a1a1aa|n|l|l','experienced|Experienced Professional|Specialized|right|pill|Manrope|#0d0d0d|#cfcfcf|a|r|l','photo|Photo Resume|Specialized|left|pill|Lato|#0d0d0d|#cfcfcf|a|r|l'].map(T)
export const tplOf=(id:string)=>TPLS.find(t=>t.id===id)||TPLS[0]
export const dr=(e:Entry)=>[e.start,e.current?'Present':e.end].filter(Boolean).join(' – ')
export const lines=(t:string)=>t.split('\n').map(x=>x.trim()).filter(Boolean)
const PH=`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 48'><rect width='40' height='48' fill='%23cbd5e1'/><circle cx='20' cy='18' r='8' fill='%2394a3b8'/><path d='M4 48c0-14 32-14 32 0z' fill='%2394a3b8'/></svg>`
const E=(title:string,org:string,place:string,start:string,end:string,text:string)=>({...newEntry(),title,org,place,start,end,text})
export const SAMPLE:Data={...emptyData,photo:PH,name:'Alex Morgan',title:'Business Analyst',email:'alex@email.com',phone:'+63 900 000 0000',city:'Davao City, PH',link:'linkedin.com/in/alexmorgan',summary:'Detail-oriented graduate with hands-on inventory, reporting and recordkeeping experience, eager to support daily operations.',skills:'Data Entry, Reporting, Bookkeeping, Inventory Control',software:'MS Excel, MS Word, Google Sheets',soft:'Communication, Teamwork, Problem Solving',languages:'English, Filipino',
exp:[E('Inventory Intern','Sample Construction Corp','Davao City','2025','2026','Tracked incoming and outgoing materials\nMaintained accurate stock records\nPrepared stock movement reports'),E('Office Assistant','Sample Trading','Nabunturan','2023','2024','Filed and organized documents\nAssisted customers with inquiries')],
edu:[E('BS Business Administration','Sample College','Nabunturan','2022','2026','Major in Financial Management')],cert:[E('Bookkeeping Training','TESDA','','2025','','')],awards:'Dean\'s Lister'}
export const completion=(d:Data)=>Math.round([d.name,d.title,d.email,d.phone,d.summary,d.exp.length,d.edu.length,d.skills||d.software].filter(Boolean).length/8*100)
export async function toDocx(r:Res){
 const d=r.data,s=r.style,t=tplOf(r.tpl),c=s.color.replace('#',''),font=dx(s.font||t.font),sz=Math.round(s.size*1.5),m=Math.round(s.margin*56.7),w=Math.round((210-2*s.margin)*56.7)
 const run=(text:string,o:any={})=>new TextRun({text,font,size:sz,...o})
 const ctr=t.layout==='center'||t.layout==='band'?AlignmentType.CENTER:AlignmentType.LEFT
 const out:Paragraph[]=[]
 const head=(x:string)=>out.push(new Paragraph({children:[run(x.toUpperCase(),{bold:true,color:c})],spacing:{before:s.gap*12,after:80},border:{bottom:{style:BorderStyle.SINGLE,size:6,color:c,space:1}}}))
 const bl=(x:string)=>lines(x).forEach(l=>out.push(new Paragraph({children:[run(l)],bullet:{level:0},spacing:{after:20}})))
 const ents=(h:string,l:Entry[])=>{if(!l.length)return;head(h);l.forEach(e=>{out.push(new Paragraph({tabStops:[{type:TabStopType.RIGHT,position:w}],children:[run(e.title,{bold:true}),new TextRun({children:[new Tab(),dr(e)],font,size:sz})]}));const o=[e.org,e.place].filter(Boolean).join(', ');if(o)out.push(new Paragraph({children:[run(o,{italics:true})]}));bl(e.text)})}
 out.push(new Paragraph({alignment:ctr,children:[run(d.name||'Your Name',{bold:true,size:sz*2,color:c})]}))
 if(d.title)out.push(new Paragraph({alignment:ctr,children:[run(d.title)]}))
 out.push(new Paragraph({alignment:ctr,children:[run([d.email,d.phone,d.city,d.link].filter(Boolean).join('  |  '))]}))
 if(d.summary){head('Summary');out.push(new Paragraph({children:[run(d.summary)]}))}
 const sk=[['Skills',d.skills],['Software',d.software],['Soft Skills',d.soft],['Languages',d.languages]].filter(x=>x[1])
 if(sk.length){head('Skills');sk.forEach(([a,b])=>out.push(new Paragraph({children:[run(a+': ',{bold:true}),run(b)]})))}
 ents('Experience',d.exp);ents('Education',d.edu);ents('Certifications',d.cert)
 ;[['Projects',d.projects],['Awards',d.awards],['References',d.refs]].forEach(([h,x])=>{if(x){head(h);bl(x)}})
 const doc=new Document({sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:m,bottom:m,left:m,right:m}}},children:out}]})
 const blob=await Packer.toBlob(doc),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=(d.name||'resume')+'.docx';a.click()
}
