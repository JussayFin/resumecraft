import {Document,Packer,Paragraph,TextRun,AlignmentType,BorderStyle,Tab,TabStopType} from 'docx'
export type Entry={id:string;title:string;org:string;place:string;start:string;end:string;current:boolean;text:string}
export type Data={name:string;title:string;email:string;phone:string;city:string;link:string;summary:string;photo:string;exp:Entry[];edu:Entry[];cert:Entry[];skills:string;software:string;soft:string;languages:string;projects:string;awards:string;refs:string}
export type Style={color:string;font:string;size:number;gap:number;margin:number;photo:boolean}
export type Res={id:string;name:string;tpl:string;updated:number;data:Data;style:Style}
export type Tpl={id:string;name:string;cat:string;layout:'single'|'left'|'right'|'band'|'center'|'split';head:'line'|'bar'|'caps'|'box'|'plain'|'dot'|'side'|'pill'|'under';font:string;dark?:boolean;accent:string;ent:'r'|'l'|'d';chip:'c'|'t'|'l';nm:'b'|'l'|'c';deco:'n'|'s'|'t'|'f'}
export const uid=()=>Math.random().toString(36).slice(2,9)
export const newEntry=():Entry=>({id:uid(),title:'',org:'',place:'',start:'',end:'',current:false,text:''})
export const emptyData:Data={name:'',title:'',email:'',phone:'',city:'',link:'',summary:'',photo:'',exp:[],edu:[],cert:[],skills:'',software:'',soft:'',languages:'',projects:'',awards:'',refs:''}
export const defStyle:Style={color:'#111111',font:'',size:13,gap:14,margin:16,photo:true}
export const FONTS=['Inter','DM Sans','Poppins','Montserrat','Manrope','Space Grotesk','Lora','Playfair Display','JetBrains Mono','Arial']
const FM:Record<string,string>={minimalist:'Inter','modern-pro':'DM Sans',corporate:'Manrope',executive:'Lora',traditional:'Lora',elegant:'Playfair Display',designer:'Poppins',sidebar:'DM Sans',contemporary:'Space Grotesk',bold:'Montserrat',portfolio:'Playfair Display','simple-ats':'Inter','pro-ats':'DM Sans',compact:'Inter','trad-ats':'Lora','modern-ats':'Manrope',fresh:'Poppins',finance:'Lora',admin:'DM Sans',it:'JetBrains Mono',engineering:'Space Grotesk',european:'Inter',academic:'Lora',experienced:'Montserrat',photo:'Poppins'}
const dx=(f:string)=>/Lora|Playfair|Georgia/.test(f)?'Georgia':/Mono|Courier/.test(f)?'Courier New':f==='Arial'?f:'Calibri'
const T=(s:string):Tpl=>{const [id,name,cat,layout,head,font,dark,accent,ent,chip,nm,deco]=s.split('|');return {id,name,cat,layout,head,font:FM[id]||font,dark:!!dark,accent,ent,chip,nm,deco} as Tpl}
export const TPLS:Tpl[]=[
'minimalist|Minimalist|Professional|single|under|Arial||#111111|r|t|l|n','modern-pro|Modern Professional|Professional|left|pill|Arial||#1e3a5f|r|c|b|n','corporate|Corporate|Professional|band|bar|Arial||#14315c|r|t|b|n','executive|Executive|Professional|center|caps|Georgia||#3b2f2f|r|t|c|f','traditional|Traditional|Professional|single|line|Times New Roman||#000000|r|t|b|n','elegant|Elegant|Professional|center|dot|Georgia||#7f1d1d|l|t|c|n',
'designer|Creative Designer|Creative|left|box|Trebuchet MS|1|#e11d48|d|c|b|n','sidebar|Modern Sidebar|Creative|right|pill|Verdana||#0f766e|d|c|b|n','contemporary|Contemporary|Creative|split|line|Trebuchet MS||#4338ca|r|c|b|n','bold|Bold Typography|Creative|band|caps|Arial||#111111|l|t|b|n','portfolio|Portfolio Style|Creative|split|box|Georgia||#7c3aed|d|c|b|s',
'simple-ats|Simple ATS|ATS-Friendly|single|plain|Arial||#000000|r|t|b|n','pro-ats|Professional ATS|ATS-Friendly|single|line|Arial||#1f2937|r|t|b|n','compact|Compact One-Page|ATS-Friendly|single|caps|Arial||#000000|r|t|c|n','trad-ats|Traditional ATS|ATS-Friendly|single|line|Times New Roman||#000000|r|t|b|n','modern-ats|Modern ATS|ATS-Friendly|single|bar|Verdana||#1e3a8a|r|t|b|n',
'fresh|Fresh Graduate|Specialized|left|under|Verdana||#0891b2|r|c|b|t','finance|Accounting and Finance|Specialized|band|line|Times New Roman||#14532d|r|t|b|n','admin|Administrative Assistant|Specialized|single|side|Tahoma||#9a3412|l|t|b|n','it|Information Technology|Specialized|split|caps|Courier New||#059669|d|c|c|s','engineering|Engineering|Specialized|left|caps|Arial|1|#1d4ed8|r|t|b|n','european|European CV|Specialized|left|plain|Arial||#2563eb|l|t|b|n','academic|Academic|Specialized|single|side|Times New Roman||#111111|l|l|b|n','experienced|Experienced Professional|Specialized|split|bar|Georgia||#44403c|r|t|b|t','photo|Photo Resume|Specialized|left|bar|Trebuchet MS|1|#0d0d0d|r|c|b|n'].map(T)
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
