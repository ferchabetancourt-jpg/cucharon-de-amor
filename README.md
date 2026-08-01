# Cucharon de Amor BETA

<!DOCTYPE html>

<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cucharón de Amor</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root {
  --t: #C4622D; --tl: #E8956A; --cr: #FDF6EC; --cd: #F5E8D0;
  --v: #5A7A5E; --vl: #8FAF93; --c: #2C2416; --o: #D4A853;
  --b: #FEFCF8; --sh: rgba(44,36,22,0.12);
}
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'DM Sans',sans-serif; background:var(--cr); color:var(--c); min-height:100vh; }

.nav { position:sticky; top:0; z-index:100; background:var(–b); border-bottom:1px solid var(–cd); display:flex; max-width:720px; margin:0 auto; box-shadow:0 2px 10px var(–sh); }
.ntab { flex:1; padding:14px 8px; border:none; background:transparent; font-family:‘DM Sans’,sans-serif; font-size:13px; font-weight:500; color:#A0907A; cursor:pointer; border-bottom:3px solid transparent; display:flex; align-items:center; justify-content:center; gap:6px; transition:all 0.2s; }
.ntab.on { color:var(–t); border-bottom-color:var(–t); }
.badge { background:var(–t); color:white; border-radius:20px; padding:1px 7px; font-size:11px; }

.pg { display:none; }
.pg.on { display:block; }
.wrap { max-width:720px; margin:0 auto; padding:24px 18px 80px; }

.hdr { text-align:center; margin-bottom:24px; }
.hdr-ic { font-size:44px; display:block; margin-bottom:8px; animation:float 3s ease-in-out infinite; }
@keyframes float { 0%,100%{transform:translateY(0) rotate(-5deg)} 50%{transform:translateY(-7px) rotate(5deg)} }
.hdr h1 { font-family:‘Playfair Display’,serif; font-size:clamp(24px,6vw,38px); color:var(–t); margin-bottom:4px; }
.hdr h1 em { font-style:italic; color:var(–c); }
.tag { font-size:12px; color:var(–v); letter-spacing:.08em; text-transform:uppercase; font-weight:500; }

.card { background:var(–b); border-radius:18px; padding:20px; margin-bottom:16px; box-shadow:0 3px 18px var(–sh); }
.card-t { border-left:4px solid var(–t); }
.card-g { background:linear-gradient(135deg,var(–v),#3D6641); color:white; position:relative; overflow:hidden; }
.card-g::after { content:‘♥’; position:absolute; right:16px; top:50%; transform:translateY(-50%); font-size:60px; opacity:.1; }
.card-g p { font-family:‘Playfair Display’,serif; font-style:italic; font-size:15px; line-height:1.6; }
.card-g .auth { font-style:normal; font-size:11px; opacity:.65; margin-top:8px; text-transform:uppercase; letter-spacing:.1em; }
.card-insp { background:linear-gradient(145deg,var(–t),#A84E22); color:white; position:relative; overflow:hidden; }
.card-insp::before { content:‘🫙’; position:absolute; right:-8px; bottom:-16px; font-size:80px; opacity:.12; transform:rotate(20deg); }
.card-insp h2 { font-family:‘Playfair Display’,serif; font-size:18px; margin-bottom:8px; }
.card-insp p { font-size:14px; line-height:1.7; opacity:.95; font-weight:300; }
.card-res { border-top:4px solid var(–o); display:none; }
.card-res.on { display:block; }
.card-res h3 { font-family:‘Playfair Display’,serif; font-size:18px; color:var(–t); margin-bottom:10px; }
.card-res .body { font-size:14px; line-height:1.8; white-space:pre-wrap; }

.lbl { font-size:11px; text-transform:uppercase; letter-spacing:.12em; color:var(–v); font-weight:500; margin-bottom:10px; display:flex; align-items:center; gap:8px; }

.mood-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
.mb { background:var(–cr); border:2px solid transparent; border-radius:12px; padding:10px 6px; cursor:pointer; text-align:center; font-family:‘DM Sans’,sans-serif; transition:all .2s; }
.mb:active { transform:scale(.97); }
.mb.on { border-color:var(–t); background:linear-gradient(135deg,#fff5ef,#ffeedd); }
.me { font-size:20px; display:block; margin-bottom:3px; }
.mt { font-size:11px; font-weight:500; }

.rbtn { margin-top:12px; background:rgba(255,255,255,.2); border:1px solid rgba(255,255,255,.3); color:white; padding:7px 16px; border-radius:50px; cursor:pointer; font-size:12px; font-family:‘DM Sans’,sans-serif; font-weight:500; display:inline-flex; align-items:center; gap:6px; }

.txta { width:100%; padding:11px 14px; border:2px solid var(–cd); border-radius:12px; font-family:‘DM Sans’,sans-serif; font-size:14px; color:var(–c); background:var(–cr); resize:none; outline:none; margin-top:10px; }
.txta:focus { border-color:var(–tl); }
.chips { display:flex; gap:7px; flex-wrap:wrap; margin:10px 0; }
.chip { background:var(–cr); border:2px solid var(–cd); border-radius:50px; padding:5px 12px; font-size:12px; cursor:pointer; font-family:‘DM Sans’,sans-serif; font-weight:500; transition:all .2s; }
.chip.on { background:var(–v); border-color:var(–v); color:white; }

.gbtn { width:100%; background:linear-gradient(135deg,var(–t),var(–tl)); color:white; border:none; padding:14px; border-radius:12px; font-family:‘Playfair Display’,serif; font-size:16px; font-style:italic; cursor:pointer; box-shadow:0 5px 16px rgba(196,98,45,.25); margin-top:4px; transition:all .3s; }
.gbtn:active { transform:scale(.98); opacity:.9; }
.gbtn:disabled { opacity:.65; }

.sbtn { width:100%; background:var(–v); color:white; border:none; padding:12px; border-radius:12px; font-family:‘DM Sans’,sans-serif; font-size:14px; font-weight:500; cursor:pointer; margin-top:12px; display:none; transition:all .2s; }
.sbtn:active { opacity:.85; }

.nudge { background:var(–cd); border-radius:13px; padding:12px 15px; margin-bottom:16px; border-left:3px solid var(–o); font-size:13px; display:flex; align-items:flex-start; gap:9px; }

/* MIS RECETAS */
.pg-hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
.pg-hdr h2 { font-family:‘Playfair Display’,serif; font-size:21px; color:var(–t); }
.nbtn { background:var(–t); color:white; border:none; padding:9px 16px; border-radius:50px; font-family:‘DM Sans’,sans-serif; font-size:13px; font-weight:500; cursor:pointer; }
.nbtn:active { opacity:.85; }

.srch { position:relative; margin-bottom:12px; }
.si { position:absolute; left:14px; top:50%; transform:translateY(-50%); font-size:14px; pointer-events:none; }
.sinp { width:100%; padding:10px 16px 10px 38px; border:2px solid var(–cd); border-radius:50px; font-family:‘DM Sans’,sans-serif; font-size:13px; background:var(–b); outline:none; }
.sinp:focus { border-color:var(–tl); }

.cats { display:flex; gap:7px; flex-wrap:wrap; margin-bottom:16px; }
.cc { background:var(–cr); border:2px solid var(–cd); border-radius:50px; padding:5px 12px; font-size:12px; cursor:pointer; font-family:‘DM Sans’,sans-serif; font-weight:500; color:var(–c); transition:all .2s; }
.cc.on { background:var(–t); border-color:var(–t); color:white; }

.rc { background:var(–b); border-radius:15px; padding:16px; box-shadow:0 3px 14px var(–sh); margin-bottom:11px; border-left:4px solid var(–o); cursor:pointer; }
.rc-top { display:flex; justify-content:space-between; align-items:flex-start; gap:8px; }
.rn { font-family:‘Playfair Display’,serif; font-size:16px; font-weight:700; margin-bottom:3px; }
.rm { display:flex; gap:7px; align-items:center; flex-wrap:wrap; margin-top:4px; }
.rcat { background:var(–cd); border-radius:50px; padding:2px 9px; font-size:11px; font-weight:500; color:var(–v); }
.rtm { font-size:11px; color:#9A8A7A; }
.rpv { font-size:12px; color:#8A7A6A; margin-top:6px; line-height:1.5; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.rac { display:flex; gap:5px; flex-shrink:0; }
.bic { background:var(–cr); border:none; border-radius:8px; width:30px; height:30px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:13px; }

.empty { text-align:center; padding:50px 20px; color:#B0A090; }
.empty span { font-size:46px; display:block; margin-bottom:12px; opacity:.5; }
.empty h3 { font-family:‘Playfair Display’,serif; font-size:18px; color:var(–c); margin-bottom:6px; }
.empty p { font-size:13px; line-height:1.6; }

/* DETALLE */
.det { background:var(–b); border-radius:18px; padding:20px; box-shadow:0 3px 18px var(–sh); display:none; }
.det.on { display:block; }
.det h2 { font-family:‘Playfair Display’,serif; font-size:21px; color:var(–t); margin-bottom:9px; }
.det .db { font-size:14px; line-height:1.9; white-space:pre-wrap; }
.vbtn { background:var(–cd); border:none; border-radius:50px; padding:7px 15px; font-family:‘DM Sans’,sans-serif; font-size:13px; cursor:pointer; margin-bottom:14px; display:inline-flex; align-items:center; gap:5px; }

/* MODAL */
.ov { position:fixed; inset:0; background:rgba(44,36,22,.5); z-index:200; display:flex; align-items:flex-end; justify-content:center; opacity:0; pointer-events:none; transition:opacity .3s; }
.ov.on { opacity:1; pointer-events:all; }
.modal { background:var(–b); border-radius:22px 22px 0 0; padding:22px 20px 36px; width:100%; max-width:720px; max-height:90vh; overflow-y:auto; transform:translateY(100%); transition:transform .35s cubic-bezier(.32,.72,0,1); }
.ov.on .modal { transform:translateY(0); }
.mh { width:36px; height:4px; background:var(–cd); border-radius:2px; margin:0 auto 16px; }
.modal h2 { font-family:‘Playfair Display’,serif; font-size:19px; color:var(–t); margin-bottom:16px; }
.fl { display:block; font-size:11px; font-weight:500; color:var(–v); text-transform:uppercase; letter-spacing:.08em; margin-bottom:5px; margin-top:13px; }
.fi { width:100%; padding:11px 13px; border:2px solid var(–cd); border-radius:11px; font-family:‘DM Sans’,sans-serif; font-size:14px; color:var(–c); background:var(–cr); outline:none; }
.fi:focus { border-color:var(–tl); }
.frow { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.fta { width:100%; padding:10px 13px; border:2px solid var(–cd); border-radius:11px; font-family:‘DM Sans’,sans-serif; font-size:14px; color:var(–c); background:var(–cr); outline:none; resize:vertical; min-height:90px; }
.fta:focus { border-color:var(–tl); }
.fse { width:100%; padding:11px 13px; border:2px solid var(–cd); border-radius:11px; font-family:‘DM Sans’,sans-serif; font-size:14px; color:var(–c); background:var(–cr); outline:none; }
.mgb { width:100%; background:linear-gradient(135deg,var(–t),var(–tl)); color:white; border:none; padding:13px; border-radius:12px; font-family:‘Playfair Display’,serif; font-size:15px; font-style:italic; cursor:pointer; margin-top:14px; }
.mcb { width:100%; background:transparent; color:var(–c); border:2px solid var(–cd); padding:11px; border-radius:12px; font-family:‘DM Sans’,sans-serif; font-size:13px; cursor:pointer; margin-top:7px; }

.dots { display:flex; gap:6px; justify-content:center; padding:18px; }
.dot { width:9px; height:9px; background:var(–tl); border-radius:50%; animation:bou 1.2s infinite; }
.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}
@keyframes bou{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-9px)}}

.ft { text-align:center; font-size:11px; color:var(–vl); margin-top:16px; font-style:italic; }





🍳 Chef📖 Mis Recetas 0






    🥄
    

Cucharón de Amor


    

✦ Tu compañero de cocina cotidiana ✦



  


    

"Cocinar con intención es el acto más generoso que puedes hacer por ti misma. No importa si es perfecto — importa que lo hiciste con amor."


    

— Cucharón de Amor, Modo Chef 🍳



  


    

🌿 ¿Cómo está tu cuerpo hoy?


    


      🌱Quiero liviano
      🫂Necesito confort
      ⚡Rápido y rico
      🍮Antojo dulce
      ✨Sin culpa
      🎲Sorpréndeme
    



  


    

✨ Inspiración del momento


    

Cargando...


    🔄 Otra inspiración



  


    

🍳 Generador Cucharón de Amor


    

Decime qué tenés en la nevera y lo que necesita tu cuerpo hoy.


    
    


      🔥 Air Fryer
      ⏱ -20 min
      🌾 Sin gluten
      🥛 Sin lácteos
      💪 Proteínas
      🥦 Veggie
    


    🥄 Cocinar con amor



  


    

🍽️ Tu receta


    


    💾 Guardar en mis recetas



  


    💛
    Filosofía Cucharón: Rico… pero tu cuerpo dice gracias, no queja. Intención sobre perfección. Sabor sobre complejidad.

Hecho con amor para Fercha · VERA + Modo Chef 🍳








    


      

📖 Mis Recetas


      + Nueva
    


    

🔍


    


      Todas
      🔥 Air Fryer
      ⚡ Rápidas
      🍮 Dulces
      🌱 Livianas
      🫂 Confort
      📌 Otras
    


    



  


    ← Volver
    


    


      
      
    


    



  

Tus recetas se guardan en esta sesión 💛








    


    

✍️ Nueva receta


    
    Nombre *
    
    


      


        Categoría
        
          🔥 Air Fryer
          ⚡ Rápidas
          🍮 Dulces
          🌱 Livianas
          🫂 Confort
          📌 Otras
        
      


      


        Tiempo aprox.
        
      


    


    Ingredientes
    
    Preparación
    
    Notas / Secretos (opcional)
    
    💾 Guardar receta
    Cancelar

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://cucharon-de-amor.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bbd4c914-86df-4fa6-bb0f-67c9d821eb96).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
