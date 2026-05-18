// ============ DATA ============
let menuItems = [
  { id: 1, name: 'กะเพราไก่',        emoji: '🍗', price: 60, cat: 'กะเพรา',    desc: 'ไก่สด ใบกะเพราหอม',      active: true },
  { id: 2, name: 'กะเพราเนื้อ',      emoji: '🥩', price: 80, cat: 'กะเพรา',    desc: 'เนื้อวัวนุ่ม รสเข้มข้น',  active: true },
  { id: 3, name: 'กะเพราทะเล',       emoji: '🦐', price: 90, cat: 'กะเพรา',    desc: 'กุ้ง หมึก หอย สดใหม่',    active: true },
  { id: 4, name: 'กะเพราหมู',        emoji: '🐷', price: 65, cat: 'กะเพรา',    desc: 'หมูสับ รสกลมกล่อม',       active: true },
  { id: 5, name: 'น้ำเปล่า',         emoji: '💧', price: 10, cat: 'เครื่องดื่ม', desc: 'น้ำดื่มสะอาด',           active: true },
  { id: 6, name: 'น้ำอัดลม',         emoji: '🥤', price: 20, cat: 'เครื่องดื่ม', desc: 'เย็นชื่นใจ',             active: true },
  { id: 7, name: 'น้ำส้ม',           emoji: '🍊', price: 25, cat: 'เครื่องดื่ม', desc: 'น้ำส้มคั้นสด',           active: true },
  { id: 8, name: 'มะม่วงน้ำปลาหวาน', emoji: '🥭', price: 35, cat: 'ของหวาน',   desc: 'มะม่วงน้ำดอกไม้',        active: true },
];

let cart = [];
let currentPay = 'cash';
let orderNum = 1;
let currentStaff = 'สมชาย';
let pin = '';
let historyFilter = 'today';
let activeCat = 'all';

// ============ LOCALSTORAGE PERSISTENCE ============
const LS = {
  HISTORY: 'kp_history',
  MENUS:   'kp_menus',
  ORDER:   'kp_orderNum',
};

function saveAll() {
  try {
    // Serialize dates as ISO strings
    const hist = salesHistory.map(s => ({...s, date: s.date instanceof Date ? s.date.toISOString() : s.date}));
    localStorage.setItem(LS.HISTORY, JSON.stringify(hist));
    localStorage.setItem(LS.MENUS,   JSON.stringify(menuItems));
    localStorage.setItem(LS.ORDER,   JSON.stringify(orderNum));
  } catch(e) { console.warn('saveAll failed', e); }
}

function loadAll() {
  try {
    const rawHist = localStorage.getItem(LS.HISTORY);
    if (rawHist) {
      const parsed = JSON.parse(rawHist);
      salesHistory = parsed.map(s => ({...s, date: new Date(s.date)}));
    }
    const rawMenus = localStorage.getItem(LS.MENUS);
    if (rawMenus) {
      const saved = JSON.parse(rawMenus);
      // Merge saved prices back into default menuItems (preserves new items too)
      saved.forEach(sm => {
        const idx = menuItems.findIndex(m => m.id === sm.id);
        if (idx >= 0) menuItems[idx] = {...menuItems[idx], ...sm};
        else menuItems.push(sm);
      });
    }
    const rawOrder = localStorage.getItem(LS.ORDER);
    if (rawOrder) orderNum = JSON.parse(rawOrder);
  } catch(e) { console.warn('loadAll failed', e); }
}

// Demo history -- only seed if localStorage is empty
let salesHistory = [];
function generateDemoHistory() {
  const methods = ['cash','transfer','qr'];
  const now = new Date();
  const items = ['กะเพราไก่','กะเพราเนื้อ','กะเพราทะเล','กะเพราหมู'];
  for(let i = 0; i < 18; i++) {
    const d = new Date(now);
    d.setHours(now.getHours() - Math.floor(Math.random()*72));
    const menuSample = items.slice(0, Math.floor(Math.random()*3)+1);
    const total = menuSample.reduce((s,m) => {
      const it = menuItems.find(x=>x.name===m);
      return s + (it ? it.price * (Math.floor(Math.random()*2)+1) : 60);
    }, 0);
    salesHistory.push({
      id: `#${String(i+1).padStart(3,'0')}`,
      date: d,
      items: menuSample,
      cartDetail: menuSample.map(n=>{const it=menuItems.find(x=>x.name===n);return{name:n,price:it?it.price:60,qty:1,emoji:it?it.emoji:'🍽️',id:it?it.id:0};}),
      total,
      method: methods[Math.floor(Math.random()*3)],
      staff: ['สมชาย','สมหญิง','มาลี'][Math.floor(Math.random()*3)],
      discount: 0
    });
  }
  salesHistory.sort((a,b) => b.date - a.date);
  saveAll(); // persist demo data
}

// Load persisted data; seed demo only on very first run
loadAll();
if (salesHistory.length === 0) generateDemoHistory();

// ============ LOGIN ============
function selectStaff(btn, name) {
  document.querySelectorAll('.staff-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  currentStaff = name.replace(/นาย |นาง |น\.ส\. /,'');
}

function pinPress(v) {
  if(pin.length >= 4) return;
  pin += v;
  updatePinDots();
  if(pin.length === 4) setTimeout(pinEnter, 200);
}

function pinDel() {
  pin = pin.slice(0,-1);
  updatePinDots();
}

function updatePinDots() {
  for(let i=0;i<4;i++) {
    document.getElementById('d'+i).classList.toggle('filled', i < pin.length);
  }
}

function pinEnter() {
  if(pin.length < 4) { showToast('⚠️ กรุณาใส่ PIN 4 หลัก'); return; }
  // Accept any 4-digit PIN for demo
  document.getElementById('staff-display').textContent = '👨‍🍳 ' + currentStaff;
  goTo('pos');
  document.getElementById('bottom-nav').style.display = 'flex';
  pin = '';
  updatePinDots();
}

// ============ NAVIGATION ============
function goTo(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-'+screen).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const nb = document.getElementById('nav-'+screen);
  if(nb) nb.classList.add('active');

  if(screen === 'pos') renderMenu();
  if(screen === 'history') renderHistory();
  if(screen === 'dashboard') renderDashboard();
  if(screen === 'settings') renderSettings();
}

// ============ MENU ============
function filterCat(btn, cat) {
  document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  activeCat = cat;
  renderMenu();
}

function renderMenu() {
  const grid = document.getElementById('menu-grid');
  // Only show active items on POS
  const pool = activeCat === 'all' ? menuItems : menuItems.filter(m => m.cat === activeCat);
  const filtered = pool.filter(m => m.active !== false);
  if (filtered.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text3);font-size:15px;">ไม่มีเมนูในหมวดนี้</div>';
    return;
  }
  grid.innerHTML = filtered.map(item => {
    const inCart = cart.find(c => c.id === item.id);
    const qty = inCart ? inCart.qty : 0;
    return `
      <div class="menu-card" onclick="addToCart(${item.id})">
        <span class="menu-card-emoji">${item.emoji}</span>
        <div class="menu-card-name">${item.name}</div>
        <div class="menu-card-price">฿${item.price}</div>
        <div class="menu-card-sub">${item.desc}</div>
        ${qty > 0 ? `<div class="menu-card-badge">${qty}</div>` : ''}
      </div>`;
  }).join('');
}

// ============ CART ============
function addToCart(id) {
  const item = menuItems.find(m => m.id === id);
  if (!item) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty = Number(existing.qty) + 1;
    existing.price = Number(item.price); // always sync latest price from menuItems
  } else {
    cart.push({ ...item, price: Number(item.price), qty: 1 });
  }
  renderCart();
  renderMenu();
}

function changeQty(id, delta) {
  const idx = cart.findIndex(c => c.id === id);
  if (idx < 0) return;
  // sync latest price from menuItems in case it changed
  const menuItem = menuItems.find(m => m.id === id);
  if (menuItem) cart[idx].price = Number(menuItem.price);
  cart[idx].qty = Number(cart[idx].qty) + delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  renderCart();
  renderMenu();
}

function clearCart() {
  cart = [];
  renderCart();
  renderMenu();
}

function renderCart() {
  const list  = document.getElementById('cart-list');
  const empty = document.getElementById('cart-empty');

  if (cart.length === 0) {
    // Clear only cart items, keep #cart-empty safely inside
    Array.from(list.querySelectorAll('.cart-item')).forEach(el => el.remove());
    empty.style.display = 'flex';
    document.getElementById('checkout-btn').disabled = true;
    updateTotals();
    return;
  }

  empty.style.display = 'none';

  // Remove old cart-item rows (not #cart-empty)
  Array.from(list.querySelectorAll('.cart-item')).forEach(el => el.remove());

  // Re-insert fresh rows
  cart.forEach(item => {
    const price = Number(item.price);
    const qty   = Number(item.qty);
    const div   = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span class="cart-item-emoji">${item.emoji}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price-single">฿${price} / จาน</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn minus" onclick="changeQty(${item.id},-1)">−</button>
        <span class="qty-num">${qty}</span>
        <button class="qty-btn plus" onclick="changeQty(${item.id},1)">+</button>
      </div>
      <div class="cart-item-total">฿${(price * qty).toLocaleString()}</div>`;
    list.appendChild(div);
  });

  document.getElementById('checkout-btn').disabled = false;
  updateTotals();
}

function updateTotals() {
  const subtotal = cart.reduce((s, i) => s + Number(i.price) * Number(i.qty), 0);
  const discount = parseFloat(document.getElementById('discount-input').value) || 0;
  const total = Math.max(0, subtotal - discount);
  document.getElementById('subtotal-display').textContent = '฿' + subtotal.toLocaleString();
  document.getElementById('total-display').textContent   = '฿' + total.toLocaleString();
}

function getTotal() {
  const subtotal = cart.reduce((s, i) => s + Number(i.price) * Number(i.qty), 0);
  const discount = parseFloat(document.getElementById('discount-input').value) || 0;
  return Math.max(0, subtotal - discount);
}

// ============ PAYMENT ============
function selectPay(method) {
  currentPay = method;
  ['cash','transfer','qr'].forEach(m=>{
    document.getElementById('pay-'+m).classList.toggle('active', m===method);
  });
}

function openCheckout() {
  const total = getTotal();
  document.getElementById('modal-total-amount').textContent = '฿'+total;
  document.getElementById('cash-received').value = '';
  document.getElementById('change-display').style.display = 'none';
  document.getElementById('cash-section').style.display = currentPay==='cash'?'block':'none';
  document.getElementById('qr-section').style.display = currentPay==='qr'?'block':'none';
  document.getElementById('transfer-section').style.display = currentPay==='transfer'?'block':'none';
  document.getElementById('checkout-modal').classList.add('open');
}

function calcChange() {
  const total = getTotal();
  const received = parseFloat(document.getElementById('cash-received').value)||0;
  const change = received - total;
  const disp = document.getElementById('change-display');
  if(received >= total) {
    disp.style.display = 'block';
    document.getElementById('change-amount').textContent = '฿'+change;
    disp.style.background = change >= 0 ? 'var(--green)' : 'var(--red)';
  } else {
    disp.style.display = received > 0 ? 'block' : 'none';
    document.getElementById('change-amount').textContent = '฿'+change;
    disp.style.background = 'var(--red)';
  }
}

function setCash(amount) {
  document.getElementById('cash-received').value = amount;
  calcChange();
}

function setExact() {
  document.getElementById('cash-received').value = getTotal();
  calcChange();
}

function confirmPayment() {
  const total = getTotal();
  if(currentPay === 'cash') {
    const received = parseFloat(document.getElementById('cash-received').value)||0;
    if(received < total) { showToast('⚠️ รับเงินไม่พอ'); return; }
  }

  const receipt = {
    id: `#${String(orderNum).padStart(3,'0')}`,
    date: new Date(),
    items: cart.map(c=>c.name),
    cartDetail: [...cart],
    total,
    discount: parseFloat(document.getElementById('discount-input').value)||0,
    method: currentPay,
    staff: currentStaff
  };

  salesHistory.unshift(receipt);
  orderNum++;
  saveAll(); // persist immediately
  document.getElementById('order-num').textContent = `ออเดอร์ #${String(orderNum).padStart(3,'0')}`;

  closeModal('checkout-modal');
  clearCart();
  document.getElementById('discount-input').value = '';
  showToast('✅ ชำระเงินสำเร็จ! ขอบคุณครับ');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// ============ HISTORY ============
function filterTab(btn, f) {
  document.querySelectorAll('.filter-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  historyFilter = f;
  renderHistory();
}

function filterHistory() {
  renderHistory();
}

function getFilteredHistory() {
  const now = new Date();
  const search = document.getElementById('search-input').value.toLowerCase();
  let filtered = salesHistory;

  if(historyFilter === 'today') {
    filtered = filtered.filter(s => s.date.toDateString() === now.toDateString());
  } else if(historyFilter === 'week') {
    const w = new Date(now); w.setDate(now.getDate()-7);
    filtered = filtered.filter(s => s.date >= w);
  } else if(historyFilter === 'month') {
    filtered = filtered.filter(s => s.date.getMonth()===now.getMonth() && s.date.getFullYear()===now.getFullYear());
  }

  if(search) filtered = filtered.filter(s => s.id.toLowerCase().includes(search));
  return filtered;
}

function renderHistory() {
  const filtered = getFilteredHistory();
  const list = document.getElementById('history-list');

  // Group by date
  const groups = {};
  filtered.forEach(s => {
    const dk = s.date.toLocaleDateString('th-TH', {day:'numeric',month:'long',year:'numeric'});
    if(!groups[dk]) groups[dk] = [];
    groups[dk].push(s);
  });

  if(filtered.length === 0) {
    list.innerHTML = `<div class="cart-empty" style="flex:1;display:flex;margin:40px auto;">
      <div class="cart-empty-icon">📋</div>
      <div class="cart-empty-text">ไม่พบประวัติการขาย</div></div>`;
  } else {
    list.innerHTML = Object.entries(groups).map(([date, items]) => `
      <div class="history-date-group">
        <div class="history-date-label">${date}</div>
        ${items.map(s => `
          <div class="receipt-card" onclick="showReceipt('${s.id}')">
            <div class="receipt-icon">${s.method==='cash'?'💵':s.method==='qr'?'📷':'📱'}</div>
            <div class="receipt-info">
              <div class="receipt-id">${s.id}</div>
              <div class="receipt-items">${s.items.join(', ')}</div>
              <div class="receipt-time">${s.date.toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'})} · ${s.staff}</div>
            </div>
            <div class="receipt-amount">
              <div class="receipt-total">฿${s.total}</div>
              <div><span class="receipt-method-badge badge-${s.method}">${s.method==='cash'?'เงินสด':s.method==='transfer'?'โอน':'QR'}</span></div>
            </div>
          </div>`).join('')}
      </div>`).join('');
  }

  const total = filtered.reduce((s,i)=>s+i.total, 0);
  document.getElementById('hist-count').textContent = filtered.length;
  document.getElementById('hist-revenue').textContent = '฿'+total.toLocaleString();
  document.getElementById('hist-avg').textContent = filtered.length ? '฿'+Math.round(total/filtered.length) : '฿0';
}

function showReceipt(id) {
  const s = salesHistory.find(x=>x.id===id);
  if(!s) return;
  const content = document.getElementById('receipt-detail-content');
  const detail = s.cartDetail || s.items.map(name=>{const it=menuItems.find(m=>m.name===name);return{name,price:it?it.price:0,qty:1};});
  content.innerHTML = `
    <div class="receipt-detail">
      <div class="receipt-detail-row"><span>เลขที่</span><span style="font-weight:700">${s.id}</span></div>
      <div class="receipt-detail-row"><span>วันที่</span><span>${s.date.toLocaleString('th-TH')}</span></div>
      <div class="receipt-detail-row"><span>พนักงาน</span><span>${s.staff}</span></div>
      <div class="receipt-detail-row"><span>ชำระโดย</span><span>${s.method==='cash'?'💵 เงินสด':s.method==='transfer'?'📱 โอน':'📷 QR'}</span></div>
      <div style="margin:8px 0;border-top:1px solid var(--border);padding-top:8px;font-size:13px;color:var(--text3);font-weight:700;">รายการ</div>
      ${detail.map(i=>`<div class="receipt-detail-row"><span>${i.name} ×${i.qty||1}</span><span>฿${i.price*(i.qty||1)}</span></div>`).join('')}
      ${s.discount>0?`<div class="receipt-detail-row" style="color:var(--red2)"><span>ส่วนลด</span><span>-฿${s.discount}</span></div>`:''}
      <div class="receipt-detail-total"><span>รวมทั้งหมด</span><span>฿${s.total}</span></div>
    </div>`;
  document.getElementById('receipt-modal').classList.add('open');
}

// ============ EXPORT EXCEL ============
let exportRange = 'today';

function selectExport(btn, range) {
  document.querySelectorAll('.export-option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  exportRange = range;
}

function openExportModal() {
  document.getElementById('export-modal').classList.add('open');
}

function getExportData() {
  const now = new Date();
  let data = salesHistory;
  if (exportRange === 'today') {
    data = data.filter(s => s.date.toDateString() === now.toDateString());
  } else if (exportRange === 'week') {
    const w = new Date(now); w.setDate(now.getDate() - 7);
    data = data.filter(s => s.date >= w);
  } else if (exportRange === 'month') {
    data = data.filter(s => s.date.getMonth() === now.getMonth() && s.date.getFullYear() === now.getFullYear());
  }
  return data;
}

function doExportExcel() {
  if (typeof XLSX === 'undefined') { showToast('⚠️ กรุณารอโหลด SheetJS...'); return; }
  const data = getExportData();
  if (data.length === 0) { showToast('⚠️ ไม่มีข้อมูลในช่วงที่เลือก'); return; }

  const wb = XLSX.utils.book_new();

  // ── Sheet 1: รายการขาย ──
  const salesRows = [
    ['เลขที่', 'วันที่', 'เวลา', 'รายการ', 'ยอดรวม (฿)', 'ส่วนลด (฿)', 'ยอดสุทธิ (฿)', 'ชำระโดย', 'พนักงาน']
  ];
  data.forEach(s => {
    salesRows.push([
      s.id,
      s.date.toLocaleDateString('th-TH'),
      s.date.toLocaleTimeString('th-TH', {hour:'2-digit', minute:'2-digit'}),
      s.items.join(', '),
      s.total + (s.discount||0),
      s.discount || 0,
      s.total,
      s.method === 'cash' ? 'เงินสด' : s.method === 'transfer' ? 'โอน' : 'QR Code',
      s.staff
    ]);
  });
  const totalRevenue = data.reduce((a, s) => a + s.total, 0);
  salesRows.push([]);
  salesRows.push(['', '', '', 'รวมทั้งหมด', '', '', totalRevenue, '', '']);

  const ws1 = XLSX.utils.aoa_to_sheet(salesRows);
  ws1['!cols'] = [10,14,8,30,14,12,14,12,12].map(w => ({wch: w}));
  // Style header row bold
  const headerStyle = { font: { bold: true }, fill: { fgColor: { rgb: 'E8650A' } } };
  ['A1','B1','C1','D1','E1','F1','G1','H1','I1'].forEach(cell => {
    if (ws1[cell]) ws1[cell].s = headerStyle;
  });
  XLSX.utils.book_append_sheet(wb, ws1, 'รายการขาย');

  // ── Sheet 2: เมนูขายดี ──
  const menuCount = {};
  data.forEach(s => {
    (s.cartDetail || []).forEach(i => {
      if (!menuCount[i.name]) menuCount[i.name] = { qty: 0, revenue: 0, emoji: i.emoji || '' };
      menuCount[i.name].qty += (i.qty || 1);
      menuCount[i.name].revenue += i.price * (i.qty || 1);
    });
  });
  const menuRows = [['อันดับ', 'เมนู', 'จำนวน (จาน)', 'รายได้ (฿)']];
  Object.entries(menuCount)
    .sort((a, b) => b[1].qty - a[1].qty)
    .forEach(([name, v], i) => menuRows.push([i + 1, name, v.qty, v.revenue]));
  const ws2 = XLSX.utils.aoa_to_sheet(menuRows);
  ws2['!cols'] = [{wch:8},{wch:22},{wch:14},{wch:14}];
  XLSX.utils.book_append_sheet(wb, ws2, 'เมนูขายดี');

  // ── Sheet 3: สรุปพนักงาน ──
  const staffMap = {};
  data.forEach(s => {
    if (!staffMap[s.staff]) staffMap[s.staff] = { orders: 0, revenue: 0 };
    staffMap[s.staff].orders++;
    staffMap[s.staff].revenue += s.total;
  });
  const staffRows = [['พนักงาน', 'จำนวนออเดอร์', 'ยอดขายรวม (฿)', 'เฉลี่ย/ออเดอร์ (฿)']];
  Object.entries(staffMap)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .forEach(([name, v]) => staffRows.push([name, v.orders, v.revenue, Math.round(v.revenue / v.orders)]));
  const ws3 = XLSX.utils.aoa_to_sheet(staffRows);
  ws3['!cols'] = [{wch:14},{wch:14},{wch:16},{wch:18}];
  XLSX.utils.book_append_sheet(wb, ws3, 'พนักงาน');

  // ── Sheet 4: สรุปช่องทางชำระ ──
  const payMap = { cash: 0, transfer: 0, qr: 0 };
  data.forEach(s => { payMap[s.method] = (payMap[s.method] || 0) + s.total; });
  const payTotal = Object.values(payMap).reduce((a, b) => a + b, 0);
  const payRows = [
    ['ช่องทาง', 'ยอดรวม (฿)', 'สัดส่วน (%)'],
    ['เงินสด', payMap.cash, payTotal ? ((payMap.cash / payTotal) * 100).toFixed(1) + '%' : '0%'],
    ['โอนเงิน', payMap.transfer, payTotal ? ((payMap.transfer / payTotal) * 100).toFixed(1) + '%' : '0%'],
    ['QR Code', payMap.qr, payTotal ? ((payMap.qr / payTotal) * 100).toFixed(1) + '%' : '0%'],
    [],
    ['รวม', payTotal, '100%'],
  ];
  const ws4 = XLSX.utils.aoa_to_sheet(payRows);
  ws4['!cols'] = [{wch:14},{wch:14},{wch:12}];
  XLSX.utils.book_append_sheet(wb, ws4, 'ช่องทางชำระ');

  // Generate filename
  const rangeLabel = { today: 'วันนี้', week: '7วัน', month: 'เดือนนี้', all: 'ทั้งหมด' }[exportRange];
  const dateStr = new Date().toLocaleDateString('th-TH').replace(/\//g, '-');
  const filename = `กะเพราPOS_${rangeLabel}_${dateStr}.xlsx`;

  XLSX.writeFile(wb, filename);
  closeModal('export-modal');
  showToast('✅ Export สำเร็จ! ' + data.length + ' ออเดอร์');
}

// ============ DASHBOARD ============
function renderDashboard() {
  const now = new Date();
  const today = salesHistory.filter(s => s.date.toDateString() === now.toDateString());
  const yesterday = (() => { const d = new Date(now); d.setDate(d.getDate()-1); return salesHistory.filter(s=>s.date.toDateString()===d.toDateString()); })();
  const thisMonth = salesHistory.filter(s => s.date.getMonth()===now.getMonth() && s.date.getFullYear()===now.getFullYear());
  const lastMonth = (() => { const d = new Date(now); d.setMonth(d.getMonth()-1); return salesHistory.filter(s=>s.date.getMonth()===d.getMonth()&&s.date.getFullYear()===d.getFullYear()); })();

  const todayRev = today.reduce((s,i)=>s+i.total, 0);
  const yestRev  = yesterday.reduce((s,i)=>s+i.total, 0);
  const monthRev = thisMonth.reduce((s,i)=>s+i.total, 0);
  const lastRev  = lastMonth.reduce((s,i)=>s+i.total, 0);
  const todayAvg = today.length ? Math.round(todayRev/today.length) : 0;
  const monthAvg = thisMonth.length ? Math.round(monthRev/thisMonth.length) : 0;

  // Trend helpers
  const trendPct = (cur, prev) => prev === 0 ? (cur > 0 ? '+100%' : '0%') : ((cur-prev)/prev*100).toFixed(0)+'%';
  const trendClass = (cur, prev) => cur >= prev ? 'kpi-up' : 'kpi-down';
  const trendArrow = (cur, prev) => cur >= prev ? '↑' : '↓';

  // Top menu (all-time)
  const menuCount = {};
  salesHistory.forEach(s=>(s.cartDetail||[]).forEach(i=>{
    if(!menuCount[i.name]) menuCount[i.name]={qty:0,revenue:0,emoji:i.emoji||'🍽️'};
    menuCount[i.name].qty += (i.qty||1);
    menuCount[i.name].revenue += i.price*(i.qty||1);
  }));
  const topMenus = Object.entries(menuCount).sort((a,b)=>b[1].qty-a[1].qty).slice(0,4);
  const maxQty = topMenus[0]?topMenus[0][1].qty:1;

  // Payment breakdown (this month)
  const payMap = {cash:0,transfer:0,qr:0};
  thisMonth.forEach(s=>{payMap[s.method]=(payMap[s.method]||0)+s.total;});
  const payTotal = Object.values(payMap).reduce((a,b)=>a+b,0)||1;

  // Staff leaderboard (this month)
  const staffMap = {};
  thisMonth.forEach(s=>{
    if(!staffMap[s.staff]) staffMap[s.staff]={orders:0,revenue:0};
    staffMap[s.staff].orders++; staffMap[s.staff].revenue+=s.total;
  });
  const staffAvatars = {'สมชาย':'👨‍🍳','สมหญิง':'👩‍🍳','มาลี':'👩‍💼','บุญมี':'👨‍💼'};
  const topStaff = Object.entries(staffMap).sort((a,b)=>b[1].revenue-a[1].revenue);

  // Peak hours (all-time)
  const hourBuckets = Array(24).fill(0);
  salesHistory.forEach(s=>{ hourBuckets[s.date.getHours()]++; });
  const peakHours = [
    {label:'8-9',  v: hourBuckets[8]},
    {label:'9-10', v: hourBuckets[9]},
    {label:'10-11',v: hourBuckets[10]},
    {label:'11-12',v: hourBuckets[11]},
    {label:'12-13',v: hourBuckets[12]},
    {label:'13-14',v: hourBuckets[13]},
    {label:'14-15',v: hourBuckets[14]},
    {label:'15-16',v: hourBuckets[15]},
    {label:'16-17',v: hourBuckets[16]},
    {label:'17-18',v: hourBuckets[17]},
    {label:'18-19',v: hourBuckets[18]},
    {label:'19-20',v: hourBuckets[19]},
  ];
  const maxPeak = Math.max(...peakHours.map(h=>h.v),1);

  // 30-day chart
  const days30 = [];
  for(let i=29;i>=0;i--){
    const d=new Date(now); d.setDate(now.getDate()-i);
    const rev=salesHistory.filter(s=>s.date.toDateString()===d.toDateString()).reduce((s,x)=>s+x.total,0);
    days30.push({label:d.getDate()+'', rev, isToday:i===0});
  }
  const maxRev30 = Math.max(...days30.map(d=>d.rev),1);

  // Estimated cost (assume ~40% COGS)
  const cogs = Math.round(monthRev * 0.4);
  const grossProfit = monthRev - cogs;
  const estExpense = Math.round(monthRev * 0.15); // rent, utilities est.
  const netProfit = grossProfit - estExpense;

  document.getElementById('dash-date').textContent = now.toLocaleDateString('th-TH',{weekday:'long',day:'numeric',month:'long',year:'numeric'});

  document.getElementById('dashboard-body').innerHTML = `
    <!-- Export button -->
    <div style="display:flex;justify-content:flex-end;">
      <button class="dash-export-btn" onclick="openExportModal()">
        📥 Export Excel
      </button>
    </div>

    <!-- KPI Row -->
    <div class="dash-kpi-row">
      <div class="kpi-card kpi-orange">
        <div class="kpi-icon">💰</div>
        <div class="kpi-label">ยอดขายวันนี้</div>
        <div class="kpi-value">฿${todayRev.toLocaleString()}</div>
        <div class="kpi-trend ${trendClass(todayRev,yestRev)}">${trendArrow(todayRev,yestRev)} ${trendPct(todayRev,yestRev)} vs เมื่อวาน</div>
      </div>
      <div class="kpi-card kpi-green">
        <div class="kpi-icon">👥</div>
        <div class="kpi-label">ลูกค้าวันนี้</div>
        <div class="kpi-value">${today.length}</div>
        <div class="kpi-sub">เฉลี่ย ฿${todayAvg}/ออเดอร์</div>
      </div>
      <div class="kpi-card kpi-yellow">
        <div class="kpi-icon">📅</div>
        <div class="kpi-label">รายได้เดือนนี้</div>
        <div class="kpi-value">฿${monthRev.toLocaleString()}</div>
        <div class="kpi-trend ${trendClass(monthRev,lastRev)}">${trendArrow(monthRev,lastRev)} ${trendPct(monthRev,lastRev)} vs เดือนก่อน</div>
      </div>
      <div class="kpi-card kpi-blue" style="--kpi-color:#3498db;">
        <div class="kpi-icon">📈</div>
        <div class="kpi-label">กำไรสุทธิ (ประมาณ)</div>
        <div class="kpi-value" style="color:var(--green2);">฿${netProfit.toLocaleString()}</div>
        <div class="kpi-sub">${monthRev>0?Math.round(netProfit/monthRev*100):0}% margin</div>
      </div>
    </div>

    <!-- Row 2: 30-day chart + Payment breakdown -->
    <div class="dash-row-3">
      <div class="dash-widget">
        <div class="widget-title">📈 ยอดขาย 30 วัน</div>
        <div class="rev-chart-wrap">
          <div class="rev-bars-30">
            ${days30.map(d=>`
              <div class="rev-bar-30-wrap">
                <div class="rev-bar-30 ${d.isToday?'today-30':''}" style="height:${Math.max(3,Math.round(d.rev/maxRev30*86))}px" title="฿${d.rev}"></div>
                <div class="rev-label-30">${d.label}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>
      <div class="dash-widget">
        <div class="widget-title">💳 ช่องทางชำระ</div>
        <div class="pay-breakdown">
          <div class="pay-row">
            <span class="pay-name" style="font-size:11px;">💵 สด</span>
            <div class="pay-dot" style="background:#27ae60;"></div>
            <div class="pay-bar-bg"><div class="pay-bar-fill" style="width:${(payMap.cash/payTotal*100).toFixed(0)}%;background:#27ae60;"></div></div>
            <span class="pay-pct">${(payMap.cash/payTotal*100).toFixed(0)}%</span>
          </div>
          <div class="pay-row">
            <span class="pay-name" style="font-size:11px;">📱 โอน</span>
            <div class="pay-dot" style="background:#3498db;"></div>
            <div class="pay-bar-bg"><div class="pay-bar-fill" style="width:${(payMap.transfer/payTotal*100).toFixed(0)}%;background:#3498db;"></div></div>
            <span class="pay-pct">${(payMap.transfer/payTotal*100).toFixed(0)}%</span>
          </div>
          <div class="pay-row">
            <span class="pay-name" style="font-size:11px;">📷 QR</span>
            <div class="pay-dot" style="background:#9b59b6;"></div>
            <div class="pay-bar-bg"><div class="pay-bar-fill" style="width:${(payMap.qr/payTotal*100).toFixed(0)}%;background:#9b59b6;"></div></div>
            <span class="pay-pct">${(payMap.qr/payTotal*100).toFixed(0)}%</span>
          </div>
          <div style="border-top:1px solid var(--border);padding-top:10px;margin-top:4px;">
            <div style="font-size:11px;color:var(--text3);margin-bottom:4px;">ยอดรวมเดือนนี้</div>
            <div style="font-size:20px;font-weight:800;color:var(--orange2);">฿${payTotal.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Row 3: Peak Hours + Top Menu -->
    <div class="dash-row-2">
      <div class="dash-widget">
        <div class="widget-title">⏰ ช่วงเวลาขายดี (Peak Hours)</div>
        <div class="peak-bars">
          ${peakHours.map(h=>{
            const pct = Math.round(h.v/maxPeak*100);
            const cls = pct>=80?'hot':pct>=40?'warm':'cool';
            return `<div class="peak-bar-wrap">
              <div class="peak-bar ${cls}" style="height:${Math.max(3,Math.round(h.v/maxPeak*76))}px" title="${h.v} ออเดอร์"></div>
              <div class="peak-label">${h.label}</div>
            </div>`;
          }).join('')}
        </div>
        <div style="margin-top:10px;display:flex;gap:14px;font-size:11px;color:var(--text3);">
          <span>🔴 ขายดีมาก</span><span>🟠 ขายดี</span><span>⬛ เงียบ</span>
        </div>
      </div>
      <div class="dash-widget">
        <div class="widget-title">🔥 เมนูขายดี</div>
        ${topMenus.length===0?'<div style="color:var(--text3);text-align:center;padding:16px;">ยังไม่มีข้อมูล</div>':
          topMenus.map(([name,v],i)=>{
            const ranks=['🥇','🥈','🥉','4️⃣'];
            return `<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border);">
              <span style="font-size:20px;">${ranks[i]}</span>
              <span style="font-size:22px;">${v.emoji}</span>
              <div style="flex:1;">
                <div style="font-size:13px;font-weight:700;color:var(--text);">${name}</div>
                <div style="font-size:11px;color:var(--text3);">${v.qty} จาน</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:13px;font-weight:800;color:var(--orange2);">฿${v.revenue.toLocaleString()}</div>
              </div>
            </div>`;
          }).join('')
        }
      </div>
    </div>

    <!-- Row 4: Staff Leaderboard + Cost Estimation -->
    <div class="dash-row-2">
      <div class="dash-widget">
        <div class="widget-title">🏆 ยอดขายพนักงาน (เดือนนี้)</div>
        ${topStaff.length===0?'<div style="color:var(--text3);text-align:center;padding:16px;">ยังไม่มีข้อมูล</div>':
          topStaff.map(([name,v],i)=>`
            <div class="staff-row">
              <div class="staff-rank-num" style="${i===0?'color:#f1c40f':i===1?'color:#bdc3c7':i===2?'color:#cd7f32':''}">${i+1}</div>
              <div class="staff-avatar">${staffAvatars[name]||'👤'}</div>
              <div class="staff-info">
                <div class="staff-name">${name}</div>
                <div class="staff-orders">${v.orders} ออเดอร์ · เฉลี่ย ฿${Math.round(v.revenue/v.orders)}</div>
              </div>
              <div class="staff-revenue">฿${v.revenue.toLocaleString()}</div>
            </div>`).join('')
        }
      </div>
      <div class="dash-widget">
        <div class="widget-title">💼 ประมาณกำไร-ขาดทุน (เดือนนี้)</div>
        <div class="cost-row">
          <span class="cost-label">รายได้รวม</span>
          <span class="cost-value cost-neutral">฿${monthRev.toLocaleString()}</span>
        </div>
        <div class="cost-row">
          <span class="cost-label">ต้นทุนวัตถุดิบ (~40%)</span>
          <span class="cost-value cost-expense">-฿${cogs.toLocaleString()}</span>
        </div>
        <div class="cost-row">
          <span class="cost-label">กำไรขั้นต้น</span>
          <span class="cost-value cost-profit">฿${grossProfit.toLocaleString()}</span>
        </div>
        <div class="cost-row">
          <span class="cost-label">ค่าใช้จ่ายดำเนินการ (~15%)</span>
          <span class="cost-value cost-expense">-฿${estExpense.toLocaleString()}</span>
        </div>
        <div style="border-top:2px solid var(--border2);padding-top:12px;margin-top:4px;display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:14px;font-weight:800;color:var(--text2);">กำไรสุทธิ (ประมาณ)</span>
          <span style="font-size:22px;font-weight:800;color:${netProfit>=0?'var(--green2)':'var(--red2)'};">฿${netProfit.toLocaleString()}</span>
        </div>
        <div style="margin-top:10px;padding:10px;background:var(--bg3);border-radius:8px;font-size:11px;color:var(--text3);line-height:1.6;">
          * ตัวเลขนี้เป็นการประมาณการเบื้องต้น<br>ควรปรับตามต้นทุนจริงของร้าน
        </div>
      </div>
    </div>
  `;
}

// ============ SETTINGS ============
function renderSettings() {
  const body = document.getElementById('settings-body');
  body.innerHTML = '';

  // ── Section: เมนูอาหาร ──
  const secMenu = _makeSection('เมนูอาหาร');
  menuItems.forEach(item => {
    const row = document.createElement('div');
    row.className = 'menu-item-row';
    row.style.opacity = item.active === false ? '0.45' : '1';
    row.style.transition = 'opacity 0.2s';

    // Emoji
    const emoji = document.createElement('span');
    emoji.className = 'menu-item-emoji-big';
    emoji.textContent = item.emoji;

    // Name + category
    const details = document.createElement('div');
    details.className = 'menu-item-details';
    const nameEl = document.createElement('div');
    nameEl.className = 'menu-item-name-big';
    nameEl.textContent = item.name;
    const catEl = document.createElement('div');
    catEl.className = 'menu-item-category';
    catEl.textContent = item.cat + (item.active === false ? ' · ปิดอยู่' : '');
    if (item.active === false) catEl.style.color = 'var(--red2)';
    details.appendChild(nameEl);
    details.appendChild(catEl);

    // Price input + save btn
    const priceWrap = document.createElement('div');
    priceWrap.className = 'price-edit-wrap';
    const input = document.createElement('input');
    input.className = 'price-edit-input';
    input.type = 'number';
    input.id = 'price-' + item.id;
    input.value = item.price;
    input.min = '0';
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-price-btn';
    saveBtn.textContent = 'บันทึก';
    saveBtn.onclick = () => savePrice(item.id, row);
    priceWrap.appendChild(input);
    priceWrap.appendChild(saveBtn);

    // Toggle
    const toggle = document.createElement('div');
    toggle.className = 'toggle-btn' + (item.active !== false ? ' on' : '');
    toggle.id = 'toggle-' + item.id;
    toggle.onclick = () => toggleMenu(item.id, toggle, row, catEl);

    row.appendChild(emoji);
    row.appendChild(details);
    row.appendChild(priceWrap);
    row.appendChild(toggle);
    secMenu.appendChild(row);
  });
  body.appendChild(secMenu);

  // ── Add menu button ──
  const addBtn = document.createElement('button');
  addBtn.className = 'add-menu-btn';
  addBtn.innerHTML = '<span style="font-size:24px;">+</span> เพิ่มเมนูใหม่';
  addBtn.onclick = () => showToast('🚧 ฟีเจอร์กำลังพัฒนา');
  body.appendChild(addBtn);

  // ── Section: บัญชีพนักงาน ──
  const secStaff = _makeSection('บัญชีพนักงาน');
  [
    { emoji:'👨‍🍳', name:'สมชาย', role:'เจ้าของ / แอดมิน' },
    { emoji:'👩‍🍳', name:'สมหญิง', role:'พนักงานขาย' },
    { emoji:'👩‍💼', name:'มาลี',   role:'พนักงานขาย' },
    { emoji:'👨‍💼', name:'บุญมี',  role:'พนักงานขาย' },
  ].forEach(s => {
    const row = document.createElement('div');
    row.className = 'menu-item-row';
    row.innerHTML = `
      <span class="menu-item-emoji-big">${s.emoji}</span>
      <div class="menu-item-details">
        <div class="menu-item-name-big">${s.name}</div>
        <div class="menu-item-category">${s.role}</div>
      </div>
      <div class="toggle-btn on"></div>`;
    secStaff.appendChild(row);
  });
  body.appendChild(secStaff);

  // ── Section: ระบบ ──
  const secSys = _makeSection('ระบบ');

  // Printer row
  secSys.appendChild(_sysRow('🖨️','เครื่องปริ้นท์','ไม่ได้เชื่อมต่อ',
    _btn('เชื่อมต่อ','var(--card2)','1px solid var(--border2)','var(--text3)',
      () => showToast('🔌 กำลังเชื่อมต่อ...'))));

  // Export row
  secSys.appendChild(_sysRow('📊','ส่งออกรายงาน Excel','4 ชีต: ยอดขาย / เมนู / พนักงาน / ชำระ',
    _btn('📥 Export','var(--green2)','none','white', openExportModal)));

  // Clear data row
  secSys.appendChild(_sysRow('🗑️','ล้างข้อมูลทั้งหมด','ลบประวัติขายและ reset ระบบ',
    _btn('ล้าง','var(--red)','none','white', confirmClearData), 'var(--red2)'));

  // Logout row
  const logoutRow = _sysRow('🚪','ออกจากระบบ','ล็อกเอาท์พนักงาน', null, 'var(--red2)');
  logoutRow.style.cursor = 'pointer';
  logoutRow.onclick = logout;
  secSys.appendChild(logoutRow);

  body.appendChild(secSys);
}

// Helper: create section wrapper
function _makeSection(title) {
  const sec = document.createElement('div');
  sec.className = 'settings-section';
  const titleEl = document.createElement('div');
  titleEl.className = 'settings-section-title';
  titleEl.textContent = title;
  sec.appendChild(titleEl);
  return sec;
}

// Helper: create system row
function _sysRow(emoji, name, sub, actionEl, nameColor) {
  const row = document.createElement('div');
  row.className = 'menu-item-row';
  const em = document.createElement('span');
  em.className = 'menu-item-emoji-big';
  em.textContent = emoji;
  const details = document.createElement('div');
  details.className = 'menu-item-details';
  const n = document.createElement('div');
  n.className = 'menu-item-name-big';
  n.textContent = name;
  if (nameColor) n.style.color = nameColor;
  const s = document.createElement('div');
  s.className = 'menu-item-category';
  s.textContent = sub;
  details.appendChild(n);
  details.appendChild(s);
  row.appendChild(em);
  row.appendChild(details);
  if (actionEl) row.appendChild(actionEl);
  return row;
}

// Helper: create action button
function _btn(label, bg, border, color, fn) {
  const b = document.createElement('button');
  b.innerHTML = label;
  b.style.cssText = `background:${bg};border:${border};border-radius:8px;padding:8px 16px;color:${color};font-size:13px;cursor:pointer;font-family:inherit;font-weight:700;flex-shrink:0;`;
  b.onclick = fn;
  return b;
}

function confirmClearData() {
  if (confirm('⚠️ ยืนยันการล้างข้อมูลประวัติขายทั้งหมด?\n\nการกระทำนี้ไม่สามารถกู้คืนได้')) {
    salesHistory = [];
    orderNum = 1;
    saveAll();
    document.getElementById('order-num').textContent = 'ออเดอร์ #001';
    showToast('🗑️ ล้างข้อมูลเรียบร้อย');
    renderSettings();
  }
}

function savePrice(id, row) {
  const input = document.getElementById('price-' + id);
  if (!input) return;
  const newPrice = parseFloat(input.value) || 0;
  const idx = menuItems.findIndex(m => m.id === id);
  if (idx >= 0) {
    menuItems[idx].price = newPrice;
    saveAll();
    renderMenu(); // sync POS prices
    showToast('💾 บันทึกราคา ฿' + newPrice + ' สำเร็จ');
  }
}

function toggleMenu(id, toggleEl, rowEl, catEl) {
  const idx = menuItems.findIndex(m => m.id === id);
  if (idx < 0) return;
  const nowActive = menuItems[idx].active !== false;
  menuItems[idx].active = !nowActive;
  // Update UI in-place -- no re-render, no DOM destruction
  toggleEl.classList.toggle('on', !nowActive);
  rowEl.style.opacity = !nowActive ? '1' : '0.45';
  catEl.textContent = menuItems[idx].cat + (!nowActive ? '' : ' · ปิดอยู่');
  catEl.style.color = !nowActive ? '' : 'var(--red2)';
  saveAll();
  renderMenu(); // sync POS grid
  showToast(menuItems[idx].active ? '👁️ เปิดขายเมนูนี้แล้ว' : '🙈 ซ่อนเมนูนี้ชั่วคราว');
}

function logout() {
  document.getElementById('bottom-nav').style.display = 'none';
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-login').classList.add('active');
  pin = '';
  updatePinDots();
}

// ============ TOAST ============
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2500);
}

// ============ INIT ============
renderMenu();
document.getElementById('order-num').textContent = `ออเดอร์ #${String(orderNum).padStart(3,'0')}`;
