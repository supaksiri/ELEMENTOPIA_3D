# ELEMENTOPIA 3D — RPG Upgrade progress (v0.3 work in progress)

Updated 2026-11-03.

## Committed changes
- Six ordered mission IDs: crystal, forge, dash, reaction, temple, guardian.
- Chemistry choice interactions with feedback; boss is three sequential puzzles.
- XP, completion tracker, simple progression prerequisites, idempotent rewards.
- Local save schema v2 and best-effort migration from legacy pq3d.save.
- Quest Board user interface and exported progress v2.
- Procedural additional hub landmarks, lamps and volcanic visual effects.

## Limitations / not yet complete
- Atom Forge now has interactive proton/neutron/electron counters for Na-23 (2D interface); Dash, Reaction Lab and Temple remain question-based rather than physical 3D mini-games.
- No new navigable physical 3D level architecture or NPC dialogue yet.
- Only one collectible element is implemented, not 118 collectible entities.
- Neither full TypeScript build nor production browser/WebGL smoke test has been confirmed in this session.
- Deployment success and current GitHub Actions run status have not been verified.
- The earlier 30-mission, eight-region long-term roadmap remains outstanding.

## Run in CI
npm install --no-audit --no-fund
npm run typecheck
npm test
npm run build

## Recommended next milestone
Fix any reported CI errors, verify Pages deploy of dist, then build interactive Atom Forge with draggable particles and actual obstacle-based Element Dash. Test progress migration and mobile usability in a browser.
