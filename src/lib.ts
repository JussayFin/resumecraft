import {Document,Packer,Paragraph,TextRun,AlignmentType,BorderStyle,Tab,TabStopType} from 'docx'
export type Entry={id:string;title:string;org:string;place:string;start:string;end:string;current:boolean;text:string}
export type Data={name:string;title:string;email:string;phone:string;city:string;link:string;summary:string;photo:string;exp:Entry[];edu:Entry[];cert:Entry[];skills:string;software:string;soft:string;languages:string;projects:string;awards:string;refs:string}
export type Style={color:string;font:string;size:number;gap:number;margin:number;photo:boolean}
export type Res={id:string;name:string;tpl:string;updated:number;data:Data;style:Style}
export type Tpl={id:string;name:string;cat:string;layout:'single'|'left'|'right'|'band'|'center'|'split';head:'line'|'bar'|'caps'|'box'|'plain'|'dot';font:string;dark?:boolean}
export const uid=()=>Math.random().toString(36).slice(2,9)
export const newEntry=():Entry=>({id:uid(),title:'',org:'',place:'',start:'',end:'',current:false,text:''})
export const emptyData:Data={name:'',title:'',email:'',phone:'',city:'',link:'',summary:'',photo:'',exp:[],edu:[],cert:[],skills:'',software:'',soft:'',languages:'',projects:'',awards:'',refs:''}
export const defStyle:Style={color:'#111111',font:'',size:13,gap:14,margin:16,photo:true}
export const FONTS=['Arial','Georgia','Times New Roman','Verdana','Trebuchet MS','Tahoma','Courier New']
const T=(s:string):Tpl=>{const [id,name,cat,layout,head,font,dark]=s.split('|');return {id,name,cat,layout:layout as any,head:head as any,font,dark:!!dark}}
export const TPLS:Tpl[]=[
'minimalist|Minimalist|Professional|single|plain|Arial','modern-pro|Modern Professional|Professional|left|line|Arial','corporate|Corporate|Professional|band|bar|Arial','executive|Executive|Professional|center|caps|Georgia','traditional|Traditional|Professional|single|line|Times New Roman','elegant|Elegant|Professional|center|dot|Georgia',
'designer|Creative Designer|Creative|left|box|Trebuchet MS|1','sidebar|Modern Sidebar|Creative|right|bar|Verdana','contemporary|Contemporary|Creative|split|line|Trebuchet MS','bold|Bold Typography|Creative|band|caps|Arial','portfolio|Portfolio Style|Creative|split|box|Georgia',
'simple-ats|Simple ATS|ATS-Friendly|single|plain|Arial','pro-ats|Professional ATS|ATS-Friendly|single|line|Arial','compact|Compact One-Page|ATS-Friendly|single|caps|Arial','trad-ats|Traditional ATS|ATS-Friendly|single|line|Times New Roman','modern-ats|Modern ATS|ATS-Friendly|single|bar|Verdana',
'fresh|Fresh Graduate|Specialized|left|line|Verdana','finance|Accounting and Finance|Specialized|band|line|Times New Roman','admin|Administrative Assistant|Specialized|single|box|Tahoma','it|Information Technology|Specialized|split|caps|Courier New','engineering|Engineering|Specialized|left|caps|Arial|1','european|European CV|Specialized|left|plain|Arial','academic|Academic|Specialized|single|caps|Times New Roman','experienced|Experienced Professional|Specialized|split|bar|Georgia','photo|Photo Resume|Specialized|center|line|Trebuchet MS'].map(T)
export const tplOf=(id:string)=>TPLS.find(t=>t.id===id)||TPLS[0]
export const dr=(e:Entry)=>[e.start,e.current?'Present':e.end].filter(Boolean).join(' – ')
export const lines=(t:string)=>t.split('\n').map(x=>x.trim()).filter(Boolean)
export const SAMPLE:Data={...emptyData,name:'Alex Morgan',title:'Business Analyst',email:'alex@email.com',phone:'+63 900 000 0000',city:'Davao City, PH',summary:'Detail-oriented graduate with hands-on inventory and recordkeeping experience.',skills:'Data Entry, Reporting, Bookkeeping',software:'MS Excel, Word',soft:'Communication, Teamwork',languages:'English, Filipino',
exp:[{...newEntry(),title:'Inventory Intern',org:'Sample Corp',start:'2025',end:'2026',text:'Tracked incoming and outgoing stock\nMaintained accurate records'}],edu:[{...newEntry(),title:'BS Business Administration',org:'Sample College',start:'2022',end:'2026'}]}
export const completion=(d:Data)=>Math.round([d.name,d.title,d.email,d.phone,d.summary,d.exp.length,d.edu.length,d.skills||d.software].filter(Boolean).length/8*100)
export async function toDocx(r:Res){
 const d=r.data,s=r.style,t=tplOf(r.tpl),c=s.color.replace('#',''),font=s.font||t.font,sz=Math.round(s.size*1.5),m=Math.round(s.margin*56.7),w=Math.round((210-2*s.margin)*56.7)
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
