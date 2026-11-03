import test from 'node:test';import assert from 'node:assert/strict';import{readFileSync}from'node:fs';
const el=JSON.parse(readFileSync(new URL('../src/data/elements.json',import.meta.url),'utf8'));
test('118 elements numbered sequentially',()=>{assert.equal(el.length,118);el.forEach((x,i)=>assert.equal(x.atomicNumber,i+1))});
test('unique symbols',()=>assert.equal(new Set(el.map(x=>x.symbol)).size,118));
test('fundamental locations',()=>{assert.equal(el[10].symbol,'Na');assert.equal(el[16].symbol,'Cl');assert.equal(el[78].symbol,'Au');assert.equal(el[117].symbol,'Og')});
test('valid periods and group',()=>el.forEach(x=>{assert.ok(x.period>=1&&x.period<=7);assert.ok(x.group===null||(x.group>=1&&x.group<=18))}));
