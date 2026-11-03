# ELEMENTOPIA 3D — อาณาจักรธาตุมหัศจรรย์

เกมผจญภัย 3D สำหรับการเรียนรู้ตารางธาตุ พัฒนาในรูปแบบ React + Three.js / React Three Fiber + Rapier

## ติดตั้ง

```bash
npm install
npm run dev
npm run typecheck
npm test
npm run build
```

**สำคัญ:** เนื่องจากสภาพแวดล้อมสร้างไฟล์อาจไม่มีการเชื่อมต่อ npm registry จึงอาจยังไม่มี package-lock.json ให้เรียก `npm install` เพียงครั้งแรกและ commit `package-lock.json` ก่อนใช้ GitHub Actions ที่เรียก `npm install`.

## วิธีเล่น
WASD เดิน, เมาส์หมุนกล้อง, Shift วิ่ง, Space กระโดด, E สำรวจ. เดินไปเก็บผลึกสีทองใกล้ (3,1) → ไปเครื่องทดลองสีม่วงใกล้ (-4,-1) → ตอบคำถาม Na หมู่ 1 → เดินผ่านประตูที่ (10,0) เพื่อไปเขต Alkali Volcano.

## GitHub Pages
สร้าง repository `ELEMENTOPIA_3D`; push ไฟล์ทั้งหมดไปยัง main; เปิด Settings → Pages → Source = GitHub Actions และรอ Actions ผ่าน แล้ว URL ที่คาดหมายคือ `https://supaksiri.github.io/ELEMENTOPIA_3D/` (ยังไม่ยืนยันว่าออนไลน์)

## สถานะ
ดู `IMPLEMENTATION_STATUS.md`. ข้อมูล 118 ธาตุมีเลขอะตอม/สัญลักษณ์ แต่ชื่อและมวลอะตอมอีกหลายรายการยังรอการตรวจยืนยัน จึงไม่ถือว่าฐานข้อมูลเคมีสมบูรณ์. ใช้เพื่อพัฒนาและทดลองระบบ ไม่ควรใช้เป็นฐานอ้างอิงการเรียนการสอนจนตรวจทานเสร็จ.

## เอกลักษณ์เกมใหม่ (Brand Guide)
- ชื่อ: **ELEMENTOPIA 3D — อาณาจักรธาตุมหัศจรรย์**
- แนวกราฟิก: Luminous Hybrid RPG; Navy `#10233F`, Cyan `#15BDD4`, Violet `#7855D8`, Gold `#E8B75C`
- โลโก้ไฟล์ `public/assets/elementopia-emblem.svg` เป็นภาพเวกเตอร์ต้นฉบับ รูปผลึกหกเหลี่ยมและวงแหวนอะตอมเชิงสัญลักษณ์
- ชื่อ repository ใหม่: `ELEMENTOPIA_3D` (การเปลี่ยนชื่อ repository จริงบน GitHub ต้องทำในหน้า Settings ของ repository)
- เนื่องจากเกมรุ่นนี้เป็นต้นแบบ v0.2 มิใช่เกมเนื้อหาครบ 30 ภารกิจ จึงต้องทดสอบจริงก่อนใช้ในการเรียน
