# Implementation Status — 0.1 prototype

- Implemented: React/R3F 3D procedural hub, camera orbit, WASD movement, Rapier rigidbody/capsule collider, collision boundaries, simple collectible, chemistry question, unlockable portal, local persistence, settings, mobile joystick, 118 element symbols/atomic numbers, atlas UI, progress export, GH Pages workflow, basic Node tests.
- Incomplete: 30 fully playable quests; 8 distinctly modeled regions (hub and volcanic color variant only); authored characters/animations; real scientific simulations; audio; comprehensive performance and browser QA; verified element names and atomic weights; teacher roster; production deployment.
- Important: 118 entries are structural data with many placeholder names and unavailable weights, **not** a scientifically validated educational dataset. No deployment has been performed.
- Build status: npm package install / typecheck / build must be verified in a network-enabled environment if dependencies unavailable locally.
- Deployment deviation: CI uses `npm install`, not `npm ci`, because npm registry is unreachable in the build environment and a trustworthy lockfile could not be generated. Generate/commit package-lock.json with `npm install`, then change CI to `npm ci`.
- English element names 1–118 were populated from the locally available RDKit periodic table; Thai transliterations not individually verified are visibly marked as pending. Atomic weights remain unset pending authoritative review.

## v0.2 Brand Rename
- เปลี่ยนชื่อภายในโค้ดและ metadata เป็น ELEMENTOPIA 3D
- เปลี่ยน base path สำหรับ GitHub Pages เป็น `/ELEMENTOPIA_3D/`
- เพิ่มโลโก้ SVG ต้นฉบับและปรับ intro, HUD และ favicon
- ยังไม่ได้เปลี่ยนชื่อ repository ที่อยู่บน GitHub โดยตรง และยังไม่ได้ยืนยัน deployment ออนไลน์
