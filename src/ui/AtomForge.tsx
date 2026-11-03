import {useState} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls,Float} from '@react-three/drei';
import {useGame} from '../state';
type Particle='p'|'n'|'e';
const colors:Record<Particle,string>={p:'#ff9a58',n:'#8ca9c9',e:'#27d7eb'};
function AtomModel({counts}:{counts:Record<Particle,number>}){
 const core=Array.from({length:counts.p+counts.n},(_,i)=>{const angle=i*2.399963;const radius=.15*Math.sqrt(i);return {x:Math.cos(angle)*radius,y:Math.sin(angle)*radius,z:(i%5-2)*.15,type:i<counts.p?'p':'n'}});
 const electrons=Array.from({length:counts.e},(_,i)=>{const shell=i<2?0:i<10?1:2;const index=shell===0?i:shell===1?i-2:i-10;const count=shell===0?Math.min(2,counts.e):shell===1?Math.min(8,Math.max(0,counts.e-2)):Math.max(1,counts.e-10);const angle=2*Math.PI*index/count;const r=1+shell*.48;return {x:r*Math.cos(angle),y:r*Math.sin(angle),z:0}});
 return <><ambientLight intensity={1.6}/><directionalLight position={[4,5,6]} intensity={2}/><Float floatIntensity={.12} rotationIntensity={.08}><group>{core.map((v,i)=><mesh key={i} position={[v.x,v.y,v.z]}><sphereGeometry args={[.18,14,12]}/><meshStandardMaterial color={colors[v.type as Particle]} roughness={.3}/></mesh>)}{[1,1.48,1.96].map((r,i)=><mesh key={'ring'+i} rotation={[.22,.14,0]}><torusGeometry args={[r,.012,6,80]}/><meshBasicMaterial color="#6b9db7" transparent opacity={.7}/></mesh>)}{electrons.map((v,i)=><mesh key={'e'+i} position={[v.x,v.y,v.z]}><sphereGeometry args={[.085,12,10]}/><meshStandardMaterial color={colors.e} emissive={colors.e} emissiveIntensity={.5}/></mesh>)}</group></Float><OrbitControls enablePan={false} minDistance={3} maxDistance={8}/></>;
}
export function AtomForge(){
 const [counts,setCounts]=useState<Record<Particle,number>>({p:8,n:10,e:8});
 const [hint,setHint]=useState(false);
 const [selected,setSelected]=useState<Particle>('p');
 const finish=useGame(s=>s.finishMission);
 const setPhase=useGame(s=>s.setPhase);
 const ok=counts.p===11&&counts.n===12&&counts.e===11;
 const adjust=(key:Particle,delta:number)=>setCounts(prev=>({...prev,[key]:Math.max(0,Math.min(25,prev[key]+delta))}));
 const add=(key:Particle)=>adjust(key,1);
 const drop=(ev:React.DragEvent<HTMLDivElement>)=>{ev.preventDefault();const value=ev.dataTransfer.getData('text/plain');if(value==='p'||value==='n'||value==='e')add(value)};
 return <div className="overlay"><section className="modal atom-forge-panel" role="dialog" aria-modal="true" aria-label="Atom Forge 3D">
 <div className="quest-chip">⚛ ATOM FORGE 3D · Sodium-23</div><h2>ประกอบอะตอม Na-23</h2>
 <p>ลากลูกอนุภาคลงในห้องหลอม หรือเลือกชนิดแล้วกดเพิ่ม/ลดบนมือถือ</p>
 <div className="atom-forge-layout">
 <div className="atom-forge-drop" onDragOver={ev=>ev.preventDefault()} onDrop={drop} aria-label="ปล่อยอนุภาคที่นี่">
 <Canvas camera={{position:[0,1,5.8],fov:48}} dpr={[1,1.5]} gl={{alpha:true}}><AtomModel counts={counts}/></Canvas>
 </div>
 <div className="forge-controls">
 {([{key:'p',label:'โปรตอน p⁺'},{key:'n',label:'นิวตรอน n⁰'},{key:'e',label:'อิเล็กตรอน e⁻'}] as const).map(item=><div className="forge-particle-row" key={item.key}>
 <button draggable onDragStart={ev=>ev.dataTransfer.setData('text/plain',item.key)} onClick={()=>setSelected(item.key)} className={selected===item.key?'chosen':''} title="ลากลงโมเดลหรือเลือกอนุภาค"><span style={{color:colors[item.key]}}>●</span> {item.label}</button>
 <button onClick={()=>adjust(item.key,-1)} aria-label={'ลด'+item.label}>−</button><b>{counts[item.key]}</b><button onClick={()=>add(item.key)} aria-label={'เพิ่ม'+item.label}>+</button></div>)}
 <button onClick={()=>add(selected)}>เพิ่ม {selected==='p'?'โปรตอน':selected==='n'?'นิวตรอน':'อิเล็กตรอน'} ที่เลือก</button>
 <p>เลขอะตอม (Z) = {counts.p} · เลขมวล (A) = {counts.p+counts.n} · ประจุ = {counts.p-counts.e>0?'+':''}{counts.p-counts.e}</p>
 {ok?<p className="correct">✓ Na-23 เป็นกลางถูกต้อง!</p>:<p>เป้าหมาย: Z=11, A=23 และประจุเป็นศูนย์</p>}
 </div></div>
 {hint&&<p className="correct">คำใบ้: โปรตอน 11, นิวตรอน 23−11 และอะตอมที่เป็นกลางมีโปรตอนเท่ากับอิเล็กตรอน</p>}
 <p className="atom-model-note">โมเดลชั้นอิเล็กตรอนเป็นภาพเพื่อการเรียนรู้ ไม่ใช่วงโคจรจริงของอิเล็กตรอน</p>
 <button onClick={()=>setHint(true)}>💡 คำใบ้</button><button className="primary" disabled={!ok} onClick={()=>finish('forge')}>รับรางวัล 120 XP</button><button onClick={()=>setPhase('explore')}>กลับไปสำรวจ</button>
 </section></div>;
}
