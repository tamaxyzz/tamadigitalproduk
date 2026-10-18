const CONFIG = {
  whatsappNumber: "6285815721322",
  telegramUrl: "https://t.me/username_admin",
  testimonialUrl: "https://t.me/username_testimoni",
  qrisImage: "https://files.catbox.moe/50w487.jpg",
  storeName: "TAMA ORDER"
};

const themes = [
  ["dark", "Dark", "#795bff,#08c8f2"],
  ["light", "Light", "#2586ff,#05c8df"],
  ["ocean", "Ocean", "#00b9d8,#00e5b4"],
  ["purple", "Purple", "#a33dff,#f044c8"],
  ["emerald", "Emerald", "#00c879,#9cf43d"],
  ["sunset", "Sunset", "#ff713c,#ffc13d"],
  ["rose", "Rose", "#ff4d91,#ff88bf"],
  ["cyberpunk", "Cyberpunk", "#ff3ec9,#00e5ff"],
  ["nord", "Nord", "#81a1c1,#88c0d0"],
  ["dracula", "Dracula", "#bd93f9,#ff79c6"],
  ["coffee", "Coffee", "#a96a3d,#e0ad64"],
  ["candy", "Candy", "#ff68ba,#8bbcff"],
  ["matrix", "Matrix", "#00e65b,#a6ff4d"]
];

const products = [
  {
    name: "PAKET DIGITAL BASIC",
    desc: "Paket digital praktis untuk kebutuhan harian.",
    symbol: "T",
    tag: "STARTER",
    plans: [["1 bulan", 20000], ["Permanen", 40000]]
  },
  {
    name: "PAKET DIGITAL PLUS",
    desc: "Paket digital tambahan dengan proses pemesanan mudah.",
    symbol: "＋",
    tag: "POPULAR",
    plans: [["1 bulan", 30000], ["Permanen", 55000]]
  },
  {
    name: "PAKET DIGITAL PRO",
    desc: "Paket dengan opsi lebih lengkap.",
    symbol: "PRO",
    tag: "PREMIUM",
    plans: [["1 bulan", 45000], ["Permanen", 80000]]
  }
];

const $ = selector => document.querySelector(selector);
const fmt = n => new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
}).format(n);

function hideLoader() {
  const loader = $("#pageLoader");
  if (loader) {
    loader.classList.add("loader-hidden");
    setTimeout(() => loader.remove(), 700);
  }
}

function render() {
  const root = $("#products");
  if (!root) return;

  root.innerHTML = products.map((p, i) => `
    <article class="card">
      <div class="art">${p.symbol}</div>
      <span class="tag">${p.tag}</span>
      <h3>${p.name}</h3>
      <p class="desc muted">${p.desc}</p>
      <div class="bottom">
        <div>
          <span class="muted">Mulai dari</span>
          <div class="priceval">${fmt(Math.min(...p.plans.map(x => x[1])))}</div>
        </div>
        <div class="card-actions">
          <button class="preview" data-preview="${i}">Preview</button>
          <button class="buy" data-p="${i}">Buy ↗</button>
        </div>
      </div>
    </article>
  `).join("");
}

function openModal(title, html) {
  $("#modalTitle").textContent = title;
  $("#modalBody").innerHTML = html;
  $("#modal").hidden = false;
}

function renderThemes() {
  const box = $("#themeChoices");
  if (!box) return;

  const active = document.body.dataset.theme || "dark";
  box.innerHTML = themes.map(([id, name, colors]) => `
    <button class="theme-choice ${active === id ? "active" : ""}"
      data-theme="${id}">
      <span class="swatch"
        style="--s:linear-gradient(135deg,${colors})"></span>
      ${name}
    </button>
  `).join("");
}

function setTheme(id) {
  if (!themes.some(t => t[0] === id)) id = "dark";
  document.body.dataset.theme = id;

  try {
    localStorage.setItem("tama-theme", id);
  } catch (_) {}

  renderThemes();
}

function showPlans(productIndex) {
  const p = products[productIndex];
  if (!p) return;

  openModal("Pilih Paket", `
    <p class="muted">${p.name}</p>
    ${p.plans.map((plan, i) => `
      <div class="price">
        <div>
          <span class="muted">${plan[0]}</span>
          <h2>${fmt(plan[1])}</h2>
        </div>
        <button data-plan="${i}" data-p="${productIndex}">Pilih</button>
      </div>
    `).join("")}
  `);
}

function init() {
  try {
    let savedTheme = "dark";
    try {
      savedTheme = localStorage.getItem("tama-theme") || "dark";
    } catch (_) {}

    setTheme(savedTheme);
    render();
    renderThemes();

    if ($("#themeBtn")) {
      $("#themeBtn").onclick = () => {
        $("#themeBackdrop").hidden = !$("#themeBackdrop").hidden;
        renderThemes();
      };
    }

    if ($("#themeChoices")) {
      $("#themeChoices").onclick = e => {
        const btn = e.target.closest("[data-theme]");
        if (!btn) return;
        setTheme(btn.dataset.theme);
        $("#themeBackdrop").hidden = true;
      };
    }

    if ($("#themeBackdrop")) {
      $("#themeBackdrop").onclick = e => {
        if (e.target.id === "themeBackdrop") {
          e.currentTarget.hidden = true;
        }
      };
    }

    if ($("#products")) {
      $("#products").onclick = e => {
        const preview = e.target.closest("[data-preview]");
        if (preview) {
          const p = products[Number(preview.dataset.preview)];
          if (!p) return;

          openModal(p.name, `
            <div class="art">${p.symbol}</div>
            <p class="muted">${p.desc}</p>
            <div class="detail">
              <p><b>PILIHAN PAKET</b></p>
              ${p.plans.map(plan => `
                <div class="price">
                  <div>
                    <span class="muted">${plan[0]}</span>
                    <h2>${fmt(plan[1])}</h2>
                  </div>
                </div>
              `).join("")}
            </div>
            <button class="buy" data-preview-buy="${Number(preview.dataset.preview)}">
              Pilih Paket ↗
            </button>
          `);
          return;
        }

        const buy = e.target.closest("[data-p]");
        if (buy) showPlans(Number(buy.dataset.p));
      };
    }

    if ($("#modalBody")) {
      $("#modalBody").onclick = e => {
        const previewBuy = e.target.closest("[data-preview-buy]");
        if (previewBuy) {
          showPlans(Number(previewBuy.dataset.previewBuy));
          return;
        }

        const button = e.target.closest("[data-plan]");
        if (!button) return;

        const p = products[Number(button.dataset.p)];
        const plan = p?.plans[Number(button.dataset.plan)];
        if (!p || !plan) return;

        const date = new Intl.DateTimeFormat("id-ID", {
          dateStyle: "long"
        }).format(new Date());

        const message = `Halo admin ${CONFIG.storeName}, saya ingin memesan ${p.name} (${plan[0]}) seharga ${fmt(plan[1])}.`;

        openModal("Pembayaran", `
          ${CONFIG.qrisImage
            ? `<img src="${CONFIG.qrisImage}" alt="QRIS pembayaran"
                style="width:100%;max-width:300px;display:block;margin:auto">`
            : `<div class="notice">QRIS belum diatur.</div>`}
          <div class="detail">
            <p><b>DETAIL PESANAN</b></p>
            <p>Produk: <b>${p.name}</b></p>
            <p>Paket: <b>${plan[0]}</b></p>
            <p>Harga: <b>${fmt(plan[1])}</b></p>
            <p>Tanggal: <b>${date}</b></p>
          </div>
          <div class="notice">Verifikasi pembayaran dilakukan manual.</div>
          <div class="contact">
            <a href="https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}"
              target="_blank" rel="noopener">WhatsApp</a>
            <a class="telegram" href="${CONFIG.telegramUrl}"
              target="_blank" rel="noopener">Telegram</a>
          </div>
        `);
      };
    }

    if ($("#close")) {
      $("#close").onclick = () => $("#modal").hidden = true;
    }

    if ($("#modal")) {
      $("#modal").onclick = e => {
        if (e.target.id === "modal") e.currentTarget.hidden = true;
      };
    }

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        if ($("#modal")) $("#modal").hidden = true;
        if ($("#themeBackdrop")) $("#themeBackdrop").hidden = true;
      }
    });

    if ($("#prev")) {
      $("#prev").onclick = () => $("#products")?.scrollBy({
        left: -300, behavior: "smooth"
      });
    }

    if ($("#next")) {
      $("#next").onclick = () => $("#products")?.scrollBy({
        left: 300, behavior: "smooth"
      });
    }

    if ($("#tutorial")) {
      $("#tutorial").onclick = () => openModal("Tutorial Membeli", `
        <div class="detail">
          <p>1. Pilih produk yang kamu inginkan.</p>
          <p>2. Tekan Preview atau Buy.</p>
          <p>3. Pilih paket dan periksa detail pesanan.</p>
          <p>4. Hubungi admin untuk instruksi pembayaran.</p>
          <p>5. Kirim bukti pembayaran untuk verifikasi manual.</p>
        </div>
      `);
    }

    const testimonial = document.querySelector('[data-channel="testimonial"]');
    const admin = document.querySelector('[data-channel="admin"]');

    if (testimonial) testimonial.href = CONFIG.testimonialUrl;
    if (admin) admin.href = CONFIG.telegramUrl;

  } catch (error) {
    console.error("TAMA ORDER error:", error);
  } finally {
    hideLoader();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

window.addEventListener("error", hideLoader);
setTimeout(hideLoader, 2500);
