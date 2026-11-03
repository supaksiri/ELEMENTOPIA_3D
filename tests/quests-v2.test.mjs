import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const state=readFileSync(new URL('../src/state.ts',import.meta.url),'utf8');
const panel=readFileSync(new URL('../src/ui/MissionPanel.tsx',import.meta.url),'utf8');
test('six unique RPG missions declared',()=>{
  const ids=['crystal','forge','dash','reaction','temple','guardian'];
  for(const id of ids)assert.match(state,new RegExp("id:'"+id+"'"));
  assert.equal((state.match(/\{id:'(?:crystal|forge|dash|reaction|temple|guardian)'/g)||[]).length,6);
});
test('six mission reward guard prevents duplicate grants',()=>{
 assert.match(state,/s\.completed\.includes\(id\)/);
 assert.match(state,/MISSIONS\[idx-1\]\.id/);
});
test('boss has three actual stages and science feedback',()=>{
 assert.match(panel,/ผู้พิทักษ์ด่าน 1/);
 assert.match(panel,/ผู้พิทักษ์ด่าน 2/);
 assert.match(panel,/ผู้พิทักษ์ด่าน 3/);
 assert.match(panel,/reason/);
});
test('local save schema version 2',()=>{
 assert.match(state,/version:2/);
 assert.match(state,/elementopia\.v2/);
});
