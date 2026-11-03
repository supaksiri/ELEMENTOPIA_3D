import test from 'node:test';import assert from 'node:assert/strict';import{readFileSync}from'node:fs';
const elements=JSON.parse(readFileSync(new URL('../src/data/elements.json',import.meta.url),'utf8'));
test('known regions',()=>{for(const n of [58,71,90,103])assert.equal(elements[n-1].group,null)});
test('no fabricated standard atomic weights',()=>elements.forEach(x=>assert.equal(x.standardAtomicWeight.kind,'unavailable')));
test('source provenance nonempty',()=>elements.forEach(x=>assert.ok(x.sourceUrl.startsWith('https://'))));
