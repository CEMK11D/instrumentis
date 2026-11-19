/* ========================================
1. STARE ȘI ELEMENTE HTML
======================================== */

const state = {
    cart: JSON.parse(
        localStorage.getItem('instrumentis-cart') || '[]'
    )
};

const $ = selector => document.querySelector(selector);

const grid = $('#productGrid');
const filter = $('#filter');
const search = $('#search');


/* ========================================
2. CATEGORII
======================================== */

if (filter && typeof products !== 'undefined') {
    const uniqueCategories = [...new Set(products.map(product => product.category))];

    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filter.appendChild(option);
    });
}


/* ========================================
3. FORMATAREA PREȚURILOR
======================================== */

function money(price) {
    return new Intl.NumberFormat('ro-RO').format(price) + ' LEI';
}


/* ========================================
4. AFIȘAREA PRODUSELOR
======================================== */

function renderProducts() {
    if (!grid || typeof products === 'undefined') return;
    
    const query = search ? search.value.toLowerCase().trim() : '';
    const category = filter ? filter.value : '';

    const list = products.filter(product => {
        const matchesCategory = !category || product.category === category;
        const matchesSearch = !query || `${product.name} ${product.category} ${product.desc}`.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    if (!list.length) {
        grid.innerHTML = '<p style="padding: 20px; color: #aaa;">Nu am găsit produse pentru căutarea ta.</p>';
        return;
    }

    grid.innerHTML = list.map(product => `
        <article class="product">
            <div class="product-img">
                <img src="assets/${product.image}" alt="${product.name}">
            </div>
            <div class="product-body">
                <span class="product-cat">${product.category}</span>
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <div class="product-bottom">
                    <span class="price" translate="no" lang="ro">${money(product.price)}</span>
                    <div>
                        <button class="add btn gold" data-id="${product.id}">+ Coș</button>
                        <button class="add details btn outline" data-id="${product.id}">Detalii</button>
                    </div>
                </div>
            </div>
        </article>
    `).join('');
}


/* ========================================
5. SALVAREA COȘULUI
======================================== */

function save() {
    localStorage.setItem('instrumentis-cart', JSON.stringify(state.cart));
}


/* ========================================
6. ADĂUGAREA PRODUSELOR ÎN COȘ (FĂRĂ DESCHIDERE AUTOMATĂ)
======================================== */

function add(id) {
    const product = products.find(item => item.id === id);
    if (!product) return;

    const cartItem = state.cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.qty++;
    } else {
        state.cart.push({ id, qty: 1 });
    }

    save();
    renderCart();
    toast(`${product.name} a fost adăugat în coș.`);
}


/* ========================================
7. AFIȘAREA COȘULUI (COMPLET FUNCȚIONAL)
======================================== */

function renderCart() {
    const countBadge = $('#cartCount');
    if (countBadge) {
        countBadge.textContent = state.cart.reduce((total, item) => total + item.qty, 0);
    }

    const cartItems = $('#cartItems');
    if (!cartItems) return;

    if (!state.cart.length) {
        cartItems.innerHTML = '<p style="color:#888; text-align:center; padding: 20px 0;">Coșul tău este gol.</p>';
    } else {
        cartItems.innerHTML = state.cart.map(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return '';

            return `
                <div class="cart-item" style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px;">
                    <img src="assets/${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px;">
                    <div style="flex: 1;">
                        <b style="font-size: 14px; display: block; color: #fff;">${product.name}</b>
                        <small translate="no" lang="ro" style="color: #d4af37;">${money(product.price)} / buc.</small>
                        <div class="qty" style="display: flex; align-items: center; gap: 8px; margin-top: 5px;">
                            <button data-minus="${product.id}" style="background: #222; color: #fff; border: 1px solid #444; width: 22px; height: 22px; cursor: pointer; border-radius: 4px;">−</button>
                            <span style="color: #fff; font-size: 13px;">${item.qty}</span>
                            <button data-plus="${product.id}" style="background: #222; color: #fff; border: 1px solid #444; width: 22px; height: 22px; cursor: pointer; border-radius: 4px;">+</button>
                        </div>
                    </div>
                    <b translate="no" lang="ro" style="color: #fff; font-size: 14px;">${money(product.price * item.qty)}</b>
                </div>
            `;
        }).join('') + `
            <button id="clearCartBtn" style="background: transparent; color: #ff6b6b; border: 1px solid #ff6b6b; width: 100%; padding: 8px; border-radius: 6px; cursor: pointer; margin-top: 10px; font-size: 12px;">
                Golește coșul
            </button>
        `;
    }

    const total = state.cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? product.price * item.qty : 0);
    }, 0);

    const cartTotal = $('#cartTotal');
    if (cartTotal) {
        cartTotal.setAttribute('translate', 'no');
        cartTotal.setAttribute('lang', 'ro');
        cartTotal.textContent = money(total);
    }
}


/* ========================================
8. NOTIFICĂRI TOAST
======================================== */

function toast(message) {
    const element = $('#toast');
    if (!element) return;
    element.textContent = message;
    element.classList.add('show');
    setTimeout(() => { element.classList.remove('show'); }, 1800);
}


/* ========================================
9. DESCHIDEREA ȘI ÎNCHIDEREA COȘULUI
======================================== */

function openCart() {
    const cart = $('#cart');
    const overlay = $('#overlay');
    if (cart) cart.classList.add('open');
    if (overlay) overlay.classList.add('show');
}

function closeCart() {
    const cart = $('#cart');
    const overlay = $('#overlay');
    if (cart) cart.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
}


/* ========================================
10. DETALIILE PRODUSELOR (MODAL)
======================================== */

function details(id) {
    const product = products.find(item => item.id === id);
    if (!product) return;

    const modalContent = $('#modalContent');
    const productModal = $('#productModal');

    if (modalContent) {
        modalContent.innerHTML = `
            <div class="modal-body-content" style="display:flex; gap:20px; align-items:center; flex-wrap:wrap;">
                <img src="assets/${product.image}" alt="${product.name}" style="max-width:200px; border-radius:8px;">
                <div>
                    <span class="product-cat" style="color:#d4af37; font-size:12px; text-transform:uppercase;">${product.category}</span>
                    <h2 style="margin: 5px 0 10px 0; color:#fff;">${product.name}</h2>
                    <p style="color:#bbb; font-size:14px; margin-bottom:10px;">${product.desc}</p>
                    <div class="specs" style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:15px;">
                        ${product.specs.map(spec => `<span style="background:#222; padding:4px 8px; border-radius:4px; font-size:11px; color:#ddd;">${spec}</span>`).join('')}
                    </div>
                    <div style="margin: 15px 0;">
                        <span class="price" translate="no" lang="ro" style="font-size: 22px; font-weight: bold; color:#d4af37;">
                            ${money(product.price)}
                        </span>
                        <span style="font-size: 11px; color: #888; margin-left: 8px;">(TVA inclus)</span>
                    </div>
                    <button class="btn gold" data-modal-add="${product.id}">Adaugă în coș</button>
                </div>
            </div>
        `;
    }

    if (productModal) productModal.classList.add('show');
}


/* ========================================
11. EVENIMENTELE PRODUSELOR & MODALULUI
======================================== */

if (grid) {
    grid.addEventListener('click', event => {
        const addButton = event.target.closest('.add');
        const detailsButton = event.target.closest('.details');

        if (detailsButton) {
            details(Number(detailsButton.dataset.id));
            return;
        }
        if (addButton && !addButton.classList.contains('details')) {
            add(Number(addButton.dataset.id));
        }
    });
}

const modalContentEl = $('#modalContent');
if (modalContentEl) {
    modalContentEl.addEventListener('click', event => {
        const button = event.target.closest('[data-modal-add]');
        if (!button) return;

        add(Number(button.dataset.modalAdd));
        const productModal = $('#productModal');
        if (productModal) productModal.classList.remove('show');
    });
}


/* ========================================
12. CĂUTARE ȘI FILTRARE
======================================== */

if (filter) filter.addEventListener('change', renderProducts);
if (search) search.addEventListener('input', renderProducts);

document.querySelectorAll('.cat-grid button').forEach(button => {
    button.addEventListener('click', () => {
        if (filter) {
            filter.value = button.dataset.filter;
            renderProducts();
            const catalogSec = $('#catalog');
            if (catalogSec) catalogSec.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


/* ========================================
13. EVENIMENTELE COȘULUI ȘI INTERACȚIUNI
======================================== */

const cartOpenBtn = $('#cartOpen');
const cartCloseBtn = $('#cartClose');
const overlay = $('#overlay');
const modalClose = $('#modalClose');
const productModal = $('#productModal');

if (cartOpenBtn) cartOpenBtn.onclick = openCart;
if (cartCloseBtn) cartCloseBtn.onclick = closeCart;
if (overlay) overlay.onclick = () => {
    closeCart();
    if (productModal) productModal.classList.remove('show');
    const checkoutModal = $('#checkoutModal');
    if (checkoutModal) checkoutModal.style.display = 'none';
};

if (modalClose) {
    modalClose.onclick = () => {
        if (productModal) productModal.classList.remove('show');
    };
}

const cartItemsContainer = $('#cartItems');
if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', event => {
        if (event.target.id === 'clearCartBtn') {
            state.cart = [];
            save();
            renderCart();
            toast('Coșul a fost golit.');
            return;
        }

        const button = event.target.closest('[data-plus], [data-minus]');
        if (!button) return;

        const id = Number(button.dataset.plus || button.dataset.minus);
        const item = state.cart.find(i => i.id === id);
        if (!item) return;

        if (button.hasAttribute('data-plus')) {
            item.qty++;
        } else {
            item.qty--;
        }

        if (item.qty <= 0) {
            state.cart = state.cart.filter(i => i.id !== id);
        }

        save();
        renderCart();
    });
}


/* ========================================
14. FINALIZARE COMANDĂ, VALIDĂRI & FORMATĂRI CARD/TELEFON
======================================== */

const checkoutBtn = $('#checkout');
const checkoutModal = $('#checkoutModal');
const closeCheckoutModal = $('#closeCheckoutModal');
const checkoutForm = $('#checkoutForm');
const custPayment = $('#custPayment');
const cardDetailsContainer = $('#cardDetailsContainer');

// Input-uri
const phoneInput = $('#custPhone');
const cardNumberInput = $('#cardNumber');
const cardExpInput = $('#cardExp');
const cardCvvInput = $('#cardCvv');

// Telefon: strict cifre, max 10
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 10);
    });
}

// Număr card: spațiu la fiecare 4 cifre
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '').substring(0, 16);
        value = value.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = value;
    });
}

// Data expirării: adaugă automat "/" după primele 2 cifre
if (cardExpInput) {
    cardExpInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (value.length >= 3) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
}

// CVV: strict cifre, max 3
if (cardCvvInput) {
    cardCvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });
}

// Comutator Vizibilitate Card
if (custPayment && cardDetailsContainer) {
    custPayment.onchange = () => {
        if (custPayment.value === 'card') {
            cardDetailsContainer.style.display = 'flex';
            if (cardNumberInput) cardNumberInput.setAttribute('required', 'true');
            if (cardExpInput) cardExpInput.setAttribute('required', 'true');
            if (cardCvvInput) cardCvvInput.setAttribute('required', 'true');
        } else {
            cardDetailsContainer.style.display = 'none';
            if (cardNumberInput) cardNumberInput.removeAttribute('required');
            if (cardExpInput) cardExpInput.removeAttribute('required');
            if (cardCvvInput) cardCvvInput.removeAttribute('required');
        }
    };
}

if (checkoutBtn) {
    checkoutBtn.onclick = (e) => {
        e.stopPropagation();
        if (!state.cart.length) {
            return toast('Adaugă cel puțin un produs în coș.');
        }
        
        closeCart();
        
        if (checkoutModal) {
            checkoutModal.style.display = 'flex';
        }
    };
}

if (closeCheckoutModal) {
    closeCheckoutModal.onclick = () => {
        if (checkoutModal) checkoutModal.style.display = 'none';
        if (overlay) overlay.classList.remove('show');
    };
}

if (checkoutForm) {
    checkoutForm.onsubmit = (e) => {
        e.preventDefault();
        
        const name = $('#custName') ? $('#custName').value : 'Client';
        const county = $('#custCounty') ? $('#custCounty').value : '';
        const city = $('#custCity') ? $('#custCity').value : '';
        const address = $('#custAddress') ? $('#custAddress').value : '';
        const paymentMethod = $('#custPayment') ? $('#custPayment').value : 'ramburs';
        
        const totalAmount = state.cart.reduce((sum, item) => {
            const p = products.find(prod => prod.id === item.id);
            return sum + (p ? p.price * item.qty : 0);
        }, 0);

        if (paymentMethod === 'card') {
            alert(`💳 Tranzacție autorizată cu succes!\n\nMulțumim, ${name}!\nLivrare în: jud. ${county}, loc. ${city}, str. ${address}\nPlata online cu cardul (${money(totalAmount)}) a fost procesată cu succes.`);
        } else {
            alert(`📦 Comandă înregistrată cu succes!\n\nMulțumim, ${name}!\nLivrare în: jud. ${county}, loc. ${city}, str. ${address}\nValoare totală: ${money(totalAmount)} (Plată ramburs la curier).`);
        }

        state.cart = [];
        save();
        renderCart();
        
        if (checkoutModal) checkoutModal.style.display = 'none';
        if (overlay) overlay.classList.remove('show');
        checkoutForm.reset();
        if (cardDetailsContainer) cardDetailsContainer.style.display = 'none';
    };
}


/* ========================================
15. FORMULARUL DE CONTACT
======================================== */

const contactForm = $('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', event => {
        const button = contactForm.querySelector('button[type="submit"]');
        if (button) {
            button.textContent = 'Se trimite...';
            button.disabled = true;
        }
    });
}


/* ========================================
16. MENIUL MOBIL
======================================== */

const menuBtn = $('#menuBtn');
const nav = $('#nav');
if (menuBtn && nav) {
    menuBtn.onclick = () => {
        nav.classList.toggle('mobile');
    };
}


/* ========================================
17. ANIMAȚII LA DERULARE (SCROLL REVEAL)
======================================== */

const revealElements = document.querySelectorAll('section, .product, .feature-list article, .org-box, .map-card');
revealElements.forEach(element => { element.classList.add('reveal'); });

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(element => { revealObserver.observe(element); });


/* ========================================
18. INIȚIALIZARE PAGINĂ
======================================== */

renderProducts();
renderCart();


/* ========================================
19. POP-UP TERMENI LA INTRARE
======================================== */

const popup = document.getElementById("popup-termeni");
const butonConfirma = document.getElementById("buton-confirma");
const butonInchide = document.getElementById("buton-inchide");

if (popup && !localStorage.getItem("termeniAcceptatiInstrumentist")) {
    popup.style.display = "flex";
}

function inchidePopup() {
    if (popup) popup.style.display = "none";
    localStorage.setItem("termeniAcceptatiInstrumentist", "true");
}

if (butonConfirma) butonConfirma.addEventListener("click", inchidePopup);
if (butonInchide) butonInchide.addEventListener("click", inchidePopup);


/* ========================================
20. ASISTENT VIRTUAL LOCAL (100% STABIL, CĂUTARE PRODUSE & RĂSPUNSURI)
======================================== */

(function initLocalAssistant() {
    const toggleBtn = document.getElementById("aiChatToggle");
    const chatWindow = document.getElementById("aiChatWindow");
    const closeBtn = document.getElementById("aiChatClose");
    const sendBtn = document.getElementById("aiChatSend");
    const inputField = document.getElementById("aiChatInput");
    const messagesContainer = document.getElementById("aiChatMessages");

    if (!toggleBtn || !chatWindow) return;

    toggleBtn.onclick = () => {
        chatWindow.classList.toggle("open");
        if (chatWindow.classList.contains("open") && inputField) {
            inputField.focus();
        }
    };

    if (closeBtn) {
        closeBtn.onclick = () => {
            chatWindow.classList.remove("open");
        };
    }

    function normalizeText(str) {
        return str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s]/gi, " ")
            .trim();
    }

    function appendMessage(text, sender) {
        if (!messagesContainer) return;
        const msgDiv = document.createElement("div");
        msgDiv.className = `ai-msg ${sender}`;
        msgDiv.style.whiteSpace = "pre-line";
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showTypingIndicator() {
        if (!messagesContainer) return null;
        const typingDiv = document.createElement("div");
        typingDiv.className = "ai-msg bot typing";
        typingDiv.innerHTML = "<span>.</span><span>.</span><span>.</span>";
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return typingDiv;
    }

    function getSmartLocalReply(rawQuery) {
        const q = normalizeText(rawQuery);

        if (/^(salut|buna|hello|hi|hey|neata|buna ziua|buna seara)\b/.test(q) && q.split(" ").length <= 3) {
            return "Salut! Cu ce te pot ajuta astăzi legat de magazinul InstruMentis? Mă poți întreba despre produse, prețuri, livrare, retur sau date de contact.";
        }

        const stopWords = ["cat", "costa", "pret", "pretul", "aveti", "vreau", "caut", "un", "o", "de", "la", "pentru", "care", "este", "sunt", "ce", "informatii", "despre", "unui", "unei", "cu", "si"];
        const keywords = q.split(/\s+/).filter(w => w.length > 2 && !stopWords.includes(w));

        if (keywords.length > 0 && typeof products !== 'undefined') {
            const matchedProducts = products.filter(p => {
                const searchable = normalizeText(`${p.name} ${p.category} ${p.desc} ${p.specs.join(" ")}`);
                return keywords.some(kw => searchable.includes(kw));
            });

            if (matchedProducts.length > 0 && !q.includes("catalog")) {
                if (matchedProducts.length === 1) {
                    const p = matchedProducts[0];
                    return `Am găsit în catalog:\n\n🎵 ${p.name} (${p.category})\n💰 Preț: ${money(p.price)} (TVA inclus)\n📝 ${p.desc}\n⚙️ Specificații: ${p.specs.join(", ")}\n\nÎl poți adăuga direct în coș din secțiunea Catalog!`;
                } else {
                    const topList = matchedProducts.slice(0, 5).map(p => `• ${p.name} — ${money(p.price)}`).join("\n");
                    const extra = matchedProducts.length > 5 ? `\n...și încă ${matchedProducts.length - 5} produse în catalog.` : "";
                    return `Am găsit ${matchedProducts.length} produse potrivite în catalogul InstruMentis:\n\n${topList}${extra}\n\nSpune-mi numele exact al unui produs dacă vrei detalii!`;
                }
            }
        }

        if (q.includes("catalog") || q.includes("produse") || q.includes("categorii") || q.includes("instrumente") || q.includes("ce vindeti")) {
            return `Catalogul InstruMentis conține produse împărțite în categorii principale (Coarde, Clape, Suflat, Percuție, Tradiționale, Accesorii).\n\nGăsești întregul catalog derulând în jos pe pagină la secțiunea „Catalog”.`;
        }

        if (q.includes("telefon") || q.includes("tel") || q.includes("numar") || q.includes("contact") || q.includes("email") || q.includes("mail") || q.includes("adresa") || q.includes("locatie") || q.includes("unde") || q.includes("focsani") || q.includes("instagram") || q.includes("insta")) {
            return "Datele oficiale de contact InstruMentis:\n\n📞 Telefon: +40 237 323 544\n📧 Email: instrumentis2026@gmail.com\n📍 Adresă: Focșani, Bulevardul Gării 25, Vrancea, România\n📸 Instagram: @instrumentis.cemk";
        }

        if (q.includes("livrare") || q.includes("transport") || q.includes("curier") || q.includes("cat dureaza") || q.includes("zile") || q.includes("colet")) {
            return "Informații despre livrare:\n\n🚚 Livrare prin curier în toată România.\n⏱️ Termen estimativ: 2–5 zile lucrătoare de la confirmarea comenzii.";
        }

        if (q.includes("retur") || q.includes("returnez") || q.includes("returnare") || q.includes("inapoi") || q.includes("defect") || q.includes("deteriorat") || q.includes("rambursare")) {
            return "Politica de retur:\n\n🔄 Drept legal de retur: 14 zile calendaristice de la primirea produsului, fără justificarea deciziei.";
        }

        if (q.includes("comanda") || q.includes("plata") || q.includes("platesc") || q.includes("card") || q.includes("cos") || q.includes("firma de exercitiu") || q.includes("despre voi") || q.includes("cine sunteti")) {
            return "Despre InstruMentis:\n\n🎼 „Fiecare notă contează.” — InstruMentis este o firmă de exercițiu (proiect educațional la Colegiul Economic „Mihail Kogălniceanu” Focșani).\n🛒 Poți plasa comenzi folosind opțiunea de plată ramburs sau card online în coș.";
        }

        return "Sunt configurat să ofer informații exclusiv despre magazinul InstruMentis (produse, prețuri, livrare, retur sau contact). Cu ce te pot ajuta legat de site-ul nostru?";
    }

    function handleUserMessage() {
        if (!inputField) return;
        const text = inputField.value.trim();
        if (!text) return;

        appendMessage(text, "user");
        inputField.value = "";

        const typingId = showTypingIndicator();

        setTimeout(() => {
            if (typingId) typingId.remove();
            const reply = getSmartLocalReply(text);
            appendMessage(reply, "bot");
        }, 350);
    }

    if (sendBtn) {
        sendBtn.onclick = handleUserMessage;
    }

    if (inputField) {
        inputField.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                handleUserMessage();
            }
        });
    }
})();