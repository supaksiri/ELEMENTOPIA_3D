import {create} from 'zustand';
export type Phase='intro'|'explore'|'puzzle'|'reward';
export type MissionId='crystal'|'forge'|'dash'|'reaction'|'temple'|'guardian';
export const MISSIONS: {id:MissionId;title:string;description:string;xp:number}[]=[
{id:'crystal',title:'Crystal Rush',description:'ค้นหาและสะสมผลึก Na ในเมืองกลาง',xp:100},
{id:'forge',title:'Atom Forge',description:'ประกอบอะตอม Na-23 ให้ถูกต้อง',xp:120},
{id:'dash',title:'Element Dash',description:'เลือกเส้นทางธาตุหมู่ 1 ให้ถูกต้อง',xp:150},
{id:'reaction',title:'Reaction Lab',description:'เปรียบเทียบแนวโน้มปฏิกิริยากับน้ำในแบบจำลอง',xp:160},
{id:'temple',title:'Periodic Temple',description:'เรียงธาตุตามเลขอะตอม',xp:180},
{id:'guardian',title:'Guardian of Alkali',description:'พิชิตผู้พิทักษ์ด้วยความรู้เคมี 3 ด่าน',xp:250}
];
type Save={version:2; completed:MissionId[]; xp:number; zone:'hub'|'alkali-volcano'};
const KEY='elementopia.v2';
const initial:Save={version:2,completed:[],xp:0,zone:'hub'};
const validIds=MISSIONS.map(m=>m.id);
const load=():Save=>{try{const x=JSON.parse(localStorage.getItem(KEY)||'null');if(x?.version===2&&Array.isArray(x.completed)){const completed=validIds.filter(id=>x.completed.includes(id));return {version:2,completed,xp:MISSIONS.filter(m=>completed.includes(m.id)).reduce((a,m)=>a+m.xp,0),zone:x.zone==='alkali-volcano'?'alkali-volcano':'hub'};}const old=JSON.parse(localStorage.getItem('pq3d.save')||'null');if(old?.version===1){const completed:MissionId[]=old.solved?['crystal','forge']:old.crystal?['crystal']:[];return {version:2,completed,xp:MISSIONS.filter(m=>completed.includes(m.id)).reduce((a,m)=>a+m.xp,0),zone:old.zone==='alkali-volcano'?'alkali-volcano':'hub'};}return initial;}catch{return initial}};
const save=(s:Save)=>{try{localStorage.setItem(KEY,JSON.stringify(s));}catch{ /* private browsing */ }};
export type Store=Save&{phase:Phase;atlas:boolean;settings:boolean;quality:'low'|'medium'|'high';joystick:{x:number;y:number};near:string;notice:string;mission:MissionId|null; crystal:boolean;solved:boolean;wins:number;setNear:(x:string)=>void;setStick:(x:{x:number;y:number})=>void;setPhase:(x:Phase)=>void;setNotice:(x:string)=>void;setAtlas:(x:boolean)=>void;setSettings:(x:boolean)=>void;setQuality:(x:'low'|'medium'|'high')=>void; startMission:(id:MissionId)=>void;finishMission:(id:MissionId)=>void;collect:()=>void;solve:()=>void;travel:()=>void;reset:()=>void};
const derive=(s:Save)=>({...s,crystal:s.completed.includes('crystal'),solved:s.completed.includes('forge'),wins:s.completed.length});
export const useGame=create<Store>((set,get)=>({...derive(load()),phase:'intro',atlas:false,settings:false,quality:'medium',joystick:{x:0,y:0},near:'',notice:'',mission:null,setNear:near=>set({near}),setStick:joystick=>set({joystick}),setPhase:phase=>set({phase}),setNotice:notice=>set({notice}),setAtlas:atlas=>set({atlas}),setSettings:settings=>set({settings}),setQuality:quality=>set({quality}),startMission:mission=>{const s=get();const idx=MISSIONS.findIndex(m=>m.id===mission);if(idx<0||s.completed.includes(mission)||(idx>0&&!s.completed.includes(MISSIONS[idx-1].id)))return;set({mission,phase:'puzzle'});},finishMission:id=>{const s=get();const idx=MISSIONS.findIndex(m=>m.id===id);if(idx<0||s.completed.includes(id)||(idx>0&&!s.completed.includes(MISSIONS[idx-1].id)))return;const completed=[...s.completed,id];const next:Save={version:2,completed,xp:s.xp+MISSIONS[idx].xp,zone:s.zone};save(next);set({...derive(next),phase:'reward',mission:id,notice:'ผ่านภารกิจ '+MISSIONS[idx].title+'!'});},collect:()=>get().finishMission('crystal'),solve:()=>get().finishMission('forge'),travel:()=>{const s=get();if(!s.completed.includes('forge'))return;const next:Save={version:2,completed:s.completed,xp:s.xp,zone:s.zone==='hub'?'alkali-volcano':'hub'};save(next);set({...derive(next),notice:next.zone==='hub'?'กลับสู่เมืองกลาง':'เข้าสู่ Alkali Volcano'});},reset:()=>{save(initial);set({...derive(initial),phase:'intro',mission:null,notice:''});}}));
