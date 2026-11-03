import {useState} from 'react';
import {useGame,MISSIONS} from '../state';
import type {MissionId} from '../state';
type Challenge={prompt:string;choices:string[];correct:number;reason:string};
const challenges:Record<Exclude<MissionId,'crystal'>,Challenge[]>={
 forge:[{prompt:'อะตอมโซเดียม-23 ที่เป็นกลางมีองค์ประกอบใด?',choices:['11 โปรตอน 12 นิวตรอน 11 อิเล็กตรอน','12 โปรตอน 11 นิวตรอน 11 อิเล็กตรอน','11 โปรตอน 11 นิวตรอน 12 อิเล็กตรอน'],correct:0,reason:'เลขอะตอม Na = 11 และเลขมวล 23 จึงมีนิวตรอน 12'}],
 dash:[{prompt:'บนสะพาน 3 ทาง จะเลือกชุดธาตุหมู่ 1 ชุดใด?',choices:['Li → Na → K','Be → Mg → Ca','F → Cl → Br'],correct:0,reason:'Li, Na และ K เป็นโลหะแอลคาไลในหมู่ 1'}],
 reaction:[{prompt:'ในแบบจำลอง เมื่อเปรียบเทียบ Li, Na และ K กับน้ำ แนวโน้มความว่องไวเป็นอย่างไร?',choices:['Li > Na > K','K > Na > Li','Na > Li > K'],correct:1,reason:'ความว่องไวของโลหะแอลคาไลโดยทั่วไปเพิ่มขึ้นเมื่อเลื่อนลงตามหมู่ (ใช้แบบจำลองเท่านั้น)'}],
 temple:[{prompt:'เรียงธาตุจากเลขอะตอมน้อยไปมาก เพื่อเปิดประตูวิหาร',choices:['K → Na → Li','Na → Li → K','Li → Na → K'],correct:2,reason:'Li = 3, Na = 11, K = 19'}],
 guardian:[
 {prompt:'ผู้พิทักษ์ด่าน 1: โซเดียมมีเวเลนซ์อิเล็กตรอนกี่ตัว?',choices:['1','2','7'],correct:0,reason:'Na มีการจัดเรียงอิเล็กตรอน 2,8,1'},
 {prompt:'ผู้พิทักษ์ด่าน 2: ธาตุใดในกลุ่มนี้ว่องไวกับน้ำมากที่สุด?',choices:['Li','Na','K'],correct:2,reason:'ในกลุ่ม Li, Na, K ความว่องไวเพิ่มลงตามหมู่'},
 {prompt:'ผู้พิทักษ์ด่าน 3: โซเดียมโดยทั่วไปเกิดไอออนใด?',choices:['Na²⁺','Na⁺','Na⁻'],correct:1,reason:'โซเดียมเสียอิเล็กตรอน 1 ตัวเกิด Na⁺'}
 ]};
export function MissionPanel(){const mission=useGame(s=>s.mission);const phase=useGame(s=>s.phase);const finish=useGame(s=>s.finishMission);const setPhase=useGame(s=>s.setPhase);const [step,setStep]=useState(0);const [answer,setAnswer]=useState<number|null>(null);const [attempts,setAttempts]=useState(0);if(phase!=='puzzle'||!mission||mission==='crystal')return null;
const list=challenges[mission];const index=Math.min(step,list.length-1);const c=list[index];const correct=answer===c.correct;
const next=()=>{if(!correct)return;if(index===list.length-1){finish(mission);setStep(0);setAnswer(null);setAttempts(0);}else{setStep(index+1);setAnswer(null);}};
return <div className="overlay"><section className="modal" role="dialog" aria-modal="true" aria-label="ภารกิจเคมี">
<div className="quest-chip">⚔️ {MISSIONS.find(x=>x.id===mission)?.title} · ด่าน {index+1}/{list.length}</div>
<h2>{c.prompt}</h2>
{mission==='reaction'&&<p>🔬 แบบจำลองเพื่อการเรียนรู้ ไม่ใช่คำแนะนำให้ทำปฏิกิริยาจริง</p>}
<div className="answer-grid">{c.choices.map((v,i)=><button key={i} className={answer===i?'chosen':''} onClick={()=>{setAnswer(i);setAttempts(n=>n+1)}}>{v}</button>)}</div>
{answer!==null&&<p className={correct?'correct':'wrong'}>{correct?'✓ '+c.reason:'ยังไม่ถูกต้อง ลองตรวจข้อมูลธาตุและเลือกใหม่'}</p>}
<p>จำนวนครั้งที่ลองตอบ: {attempts}</p>
<button className="primary" disabled={!correct} onClick={next}>{index===list.length-1?'รับรางวัลและผ่านด่าน':'เข้าสู่ด่านต่อไป'}</button>
<button onClick={()=>{setPhase('explore');setStep(0);setAnswer(null)}}>กลับไปสำรวจ</button>
</section></div>}
