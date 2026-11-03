import {useState} from 'react';
import elements from '../data/elements.json';
type Target={symbol:string;number:number;hint:string};
const targets:Target[]=[
{symbol:'Li',number:3,hint:'โลหะแอลคาไล คาบ 2 มีอิเล็กตรอนเวเลนซ์ 1 ตัว'},
{symbol:'Na',number:11,hint:'โลหะแอลคาไล คาบ 3 เกิด Na⁺ ได้'},
{symbol:'K',number:19,hint:'โลหะแอลคาไล คาบ 4 มีแนวโน้มว่องไวกับน้ำมากกว่า Li และ Na'}
];
export function ParticleScanner({onClose}:{onClose:()=>void}){
 const [chosen,setChosen]=useState(11);const [mode,setMode]=useState<'identity'|'shells'|'properties'>('identity');
 const t=targets.find(x=>x.number===chosen)!;
 const e=elements.find(x=>x.atomicNumber===chosen);
 const shells=chosen===3?[2,1]:chosen===11?[2,8,1]:[2,8,8,1];
 return <div className="overlay"><section className="modal scanner-panel" role="dialog" aria-modal="true" aria-label="Particle Scanner">
 <div className="quest-chip">🔎 PARTICLE SCANNER</div><h2>เครื่องสแกนธาตุ</h2><p>เลือกผลึกแล้วสลับโหมดสแกนเพื่อเปิดเผยเบาะแสทางเคมี</p>
 <div className="scanner-targets">{targets.map(x=><button key={x.number} className={chosen===x.number?'chosen':''} onClick={()=>setChosen(x.number)}>{x.symbol} · {x.number}</button>)}</div>
 <div className="scanner-symbol"><strong>{t.symbol}</strong><span>{e?.nameTh ?? t.symbol}</span></div>
 <div className="scanner-modes"><button onClick={()=>setMode('identity')} className={mode==='identity'?'chosen':''}>ข้อมูล</button><button onClick={()=>setMode('shells')} className={mode==='shells'?'chosen':''}>ชั้นอิเล็กตรอน</button><button onClick={()=>setMode('properties')} className={mode==='properties'?'chosen':''}>สมบัติ</button></div>
 {mode==='identity'&&<p>เลขอะตอม {chosen} · หมู่ 1 · คาบ {e?.period} · สัญลักษณ์ {t.symbol}</p>}
 {mode==='shells'&&<><div className="scanner-shells">{shells.map((n,i)=><span key={i}>ชั้น {i+1}: {n} e⁻</span>)}</div><p>การกระจายอิเล็กตรอนแบบชั้นพลังงานสำหรับอะตอมเป็นกลาง</p></>}
 {mode==='properties'&&<p>{t.hint} · การเปรียบเทียบปฏิกิริยากับน้ำทำได้ในระบบจำลองเท่านั้น</p>}
 <button className="primary" onClick={onClose}>ปิดเครื่องสแกน</button>
 </section></div>
}