const CONFIG={whatsappNumber:"6285815721322",telegramUrl:"https://t.me/username_admin",testimonialUrl:"https://t.me/username_testimoni",qrisImage:"https://files.catbox.moe/50w487.jpg",storeName:"TAMA ORDER"};
const themes=[["dark","Dark","#795bff,#08c8f2"],["light","Light","#2586ff,#05c8df"],["ocean","Ocean","#00b9d8,#00e5b4"],["purple","Purple","#a33dff,#f044c8"],["emerald","Emerald","#00c879,#9cf43d"],["sunset","Sunset","#ff713c,#ffc13d"],["rose","Rose","#ff4d91,#ff88bf"],["cyberpunk","Cyberpunk","#ff3ec9,#00e5ff"],["nord","Nord","#81a1c1,#88c0d0"],["dracula","Dracula","#bd93f9,#ff79c6"],["coffee","Coffee","#a96a3d,#e0ad64"],["candy","Candy","#ff68ba,#8bbcff"],["matrix","Matrix","#00e65b,#a6ff4d"]];
const products=[
  {
    name:"PAKET DIGITAL BASIC",
    desc:"Paket digital praktis untuk kebutuhan harian. Detail produk dikonfirmasi admin.",
    symbol:"T",
    tag:"STARTER",
    plans:[["1 bulan",20000],["Permanen",40000]]
  },
  {
    name:"PAKET DIGITAL PLUS",
    desc:"Pilihan paket digital tambahan dengan proses pemesanan mudah.",
    symbol:"＋",
    tag:"POPULAR",
    plans:[["1 bulan",30000],["Permanen",55000]]
  },
  {
    name:"PAKET DIGITAL PRO",
    desc:"Paket dengan opsi lebih lengkap. Hubungi admin untuk ketersediaan.",
    symbol:"PRO",
    tag:"PREMIUM",
    plans:[["1 bulan",45000],["Permanen",80000]]
  }
];
function render(){const root=$("#products");root.innerHTML=products.map((p,i)=>`<article class="card"><div class="art">${p.symbol}</div><h3>${p.name}</h3><p class="desc muted">${p.desc}</p><div class="bottom"><div><span class="muted">Mulai dari</span><div class="priceval">${fmt(Math.min(...p.plans.map(x=>x[1])))}</div></div><div class="card-actions"><button class="preview" data-preview="${i}">Preview</button><button class="buy" data-p="${i}">Buy ↗</button></div></div></article>`).join("")}
function open(title,html){$("#modalTitle").textContent=title;$("#modalBody").innerHTML=html;$("#modal").hidden=false}
function renderThemes(){const active=document.body.dataset.theme||"dark";$("#themeChoices").innerHTML=themes.map(([id,n,c])=>`<button class="theme-choice ${active===id?"active":""}" data-theme="${id}"><span class="swatch" style="--s:linear-gradient(135deg,${c})"></span>${n}</button>`).join("")}
function setTheme(id){if(!themes.some(t=>t[0]===id))id="dark";document.body.dataset.theme=id;try{localStorage.setItem("tama-theme",id)}catch(e){}renderThemes()}
try{setTheme(localStorage.getItem("tama-theme")||"dark")}catch(e){setTheme("dark")}render();renderThemes();
$("#themeBtn").onclick=()=>{$("#themeBackdrop").hidden=!$("#themeBackdrop").hidden;renderThemes()};
$("#themeChoices").onclick=e=>{const b=e.target.closest("[data-theme]");if(b){setTheme(b.dataset.theme);$("#themeBackdrop").hidden=true}};
$("#themeBackdrop").onclick=e=>{if(e.target.id==="themeBackdrop")e.currentTarget.hidden=true};
$("#products").onclick=e=>{const preview=e.target.closest("[data-preview]");if(preview){const p=products[+preview.dataset.preview];open(p.name,`<div class="art">${p.symbol}</div><p class="muted">${p.desc}</p><div class="detail"><p><b>PILIHAN PAKET</b></p>${p.plans.map(x=>`<div class="price"><div><span class="muted">${x[0]}</span><h2>${fmt(x[1])}</h2></div></div>`).join("")}<p>Tekan Buy untuk memilih paket dan melanjutkan pemesanan melalui admin.</p></div><button class="buy" data-preview-buy="${products.indexOf(p)}">Pilih Paket ↗</button>`);return}const b=e.target.closest("[data-p]");if(!b)return;const p=products[+b.dataset.p];open("Pilih Paket",`<p class="muted">${p.name} · PAKET TERSEDIA</p>${p.plans.map((x,i)=>`<div class="price"><div><span class="muted">${x[0]}</span><h2>${fmt(x[1])}</h2></div><button data-plan="${i}" data-p="${b.dataset.p}">Pilih</button></div>`).join("")}`)};
$("#modalBody").onclick=e=>{const choose=e.target.closest("[data-preview-buy]");if(choose){const p=products[+choose.dataset.previewBuy];open("Pilih Paket",`<p class="muted">${p.name} · PAKET TERSEDIA</p>${p.plans.map((x,i)=>`<div class="price"><div><span class="muted">${x[0]}</span><h2>${fmt(x[1])}</h2></div><button data-plan="${i}" data-p="${products.indexOf(p)}">Pilih</button></div>`).join("")}`);return}const b=e.target.closest("[data-plan]");if(!b)return;const p=products[+b.dataset.p],pl=p.plans[+b.dataset.plan],date=new Intl.DateTimeFormat("id-ID",{dateStyle:"long"}).format(new Date()),msg=`Halo admin ${CONFIG.storeName}, saya ingin memesan ${p.name} (${pl[0]}) seharga ${fmt(pl[1])}.`;open("Pembayaran",`${CONFIG.qrisImage?`<img src="${CONFIG.qrisImage}" alt="QRIS pembayaran" style="width:100%;max-width:300px;display:block;margin:auto">`:`<div class="notice">QRIS belum diatur. Tambahkan URL QRIS toko di CONFIG.qrisImage pada app.js sebelum menerima pembayaran.</div>`}<div class="detail"><p><b>DETAIL PESANAN</b></p><p>Barang: <b>${p.name}</b></p><p>Paket: <b>${pl[0]}</b></p><p>Harga: <b>${fmt(pl[1])}</b></p><p>Tanggal: <b>${date}</b></p></div><div class="notice">Kirim bukti pembayaran ke admin. Verifikasi dilakukan manual.</div><div class="contact"><a href="https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">WhatsApp</a><a class="telegram" href="${CONFIG.telegramUrl}" target="_blank" rel="noopener">Telegram</a></div>`)};
$("#close").onclick=()=>$("#modal").hidden=true;$("#modal").onclick=e=>{if(e.target.id==="modal")e.currentTarget.hidden=true};
document.addEventListener("keydown",e=>{if(e.key==="Escape"){$("#modal").hidden=true;$("#themeBackdrop").hidden=true}});
$("#prev").onclick=()=>$("#products").scrollBy({left:-300,behavior:"smooth"});$("#next").onclick=()=>$("#products").scrollBy({left:300,behavior:"smooth"});
$("#tutorial").onclick=()=>open("Tutorial Membeli",'<div class="detail"><p>1. Pilih produk yang kamu inginkan.</p><p>2. Tekan Preview untuk melihat detail atau Buy untuk memilih paket.</p><p>3. Pilih paket, lalu cek detail pesanan.</p><p>4. Hubungi admin melalui WhatsApp/Telegram dan ikuti instruksi pembayaran.</p><p>5. Kirim bukti pembayaran untuk verifikasi manual.</p></div>');
document.querySelector('[data-channel="testimonial"]').href=CONFIG.testimonialUrl;document.querySelector('[data-channel="admin"]').href=CONFIG.telegramUrl;
(()=>{const l=$("#pageLoader");if(!l)return;let done=false;const hide=()=>{if(done)return;done=true;setTimeout(()=>{l.classList.add("loader-hidden");setTimeout(()=>l.remove(),650)},450)};if(document.readyState==="complete")hide();else window.addEventListener("load",hide,{once:true});setTimeout(hide,3000)})();
