import {useState} from 'react';
import {useGame} from '../state';
type Particle='p'|'n'|'e';
export function AtomForge(){const [counts,setCounts]=useState<Record<Particle,number>>({p:8,n:10,e:8});const [hint,setHint]=useState(false);const finish=useGame(s=>s.finishMission);const setPhase=useGame(s=>s.setPhase);const ok=counts.p===11&&counts.n===12&&counts.e===11;const adjust=(key:Particle,delta:number)=>setCounts(prev=>({...prev,[key]:Math.max(0,Math.min(25,prev[key]+delta))}));
return <div className="overlay"><section className="modal" role="dialog" aria-modal="true" aria-label="Atom Forge"><div className="quest-chip">⚛ ATOM FORGE · Sodium-23</div><h2>ประกอบอะตอม Na-23</h2><p>ปรับจำนวนอนุภาคให้เป็นอะตอมโซเดียม-23 ที่เป็นกลาง</p>
<div className="forge-atom"><div className="forge-nucleus">นิวเคลียส<br/>p⁺ {counts.p} · n⁰ {counts.n}</div><span className="forge-electrons">e⁻ {counts.e}</span></div>
{([{key:'p',label:'โปรตอน p⁺'},{key:'n',label:'นิวตรอน n⁰'},{key:'e',label:'อิเล็กตรอน e⁻'}] as const).map(item=><div className="forge-row" key={item.key}><strong>{item.label}</strong><button onClick={()=>adjust(item.key,-1)} aria-label={'ลด'+item.label}>−</button><b>{counts[item.key]}</b><button onClick={()=>adjust(item.key,1)} aria-label={'เพิ่ม'+item.label}>+</button></div>)}
<p>{ok?'✓ อะตอมถูกต้อง! เลขอะตอม 11 เลขมวล 23 และไม่มีประจุสุทธิ':'เลขอะตอม = โปรตอน · เลขมวล = โปรตอน + นิวตรอน'}</p>
{hint&&<p className="correct">คำใบ้: Na มีเลขอะตอม 11 และ Na-23 มีเลขมวล 23 อะตอมเป็นกลางมีจำนวนโปรตอนเท่ากับอิเล็กตรอน</p>}
<button onClick={()=>setHint(true)}>💡 ขอคำใบ้</button><button className="primary" disabled={!ok} onClick={()=>finish('forge')}>ปลดล็อก Atom Forge +120 XP</button><button onClick={()=>setPhase('explore')}>กลับไปสำรวจ</button>
</section></div>}
