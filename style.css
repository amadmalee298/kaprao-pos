:root {
    --bg: #0f0700;
    --bg2: #1a0e03;
    --bg3: #251508;
    --card: #1e1005;
    --card2: #2a1a08;
    --orange: #e8650a;
    --orange2: #ff8c2a;
    --orange3: #ffaa55;
    --red: #c0392b;
    --red2: #e74c3c;
    --green: #1e7d4b;
    --green2: #27ae60;
    --yellow: #f39c12;
    --text: #f5e6d0;
    --text2: #c9aa85;
    --text3: #8a6a45;
    --border: #3d2410;
    --border2: #5a3820;
    --shadow: 0 4px 24px rgba(0,0,0,0.6);
    --radius: 18px;
    --radius-sm: 10px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }

  body {
    font-family: 'Noto Sans Thai', 'Sarabun', sans-serif;
    background: var(--bg);
    color: var(--text);
    height: 100dvh;
    overflow: hidden;
    user-select: none;
  }

  /* ============ SCREENS ============ */
  .screen { display: none; height: 100dvh; flex-direction: column; overflow: hidden; }
  .screen.active { display: flex; }

  /* ============ LOGIN ============ */
  #screen-login {
    background: radial-gradient(ellipse at 30% 20%, #3d1a00 0%, #0f0700 60%);
    align-items: center;
    justify-content: center;
    gap: 0;
  }

  .login-logo {
    font-size: 88px;
    margin-bottom: 8px;
    filter: drop-shadow(0 0 30px rgba(232,101,10,0.5));
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .login-title {
    font-size: 42px;
    font-weight: 800;
    color: var(--orange2);
    letter-spacing: 2px;
    margin-bottom: 4px;
    text-shadow: 0 0 40px rgba(232,101,10,0.4);
  }

  .login-sub {
    font-size: 16px;
    color: var(--text3);
    margin-bottom: 48px;
    letter-spacing: 4px;
  }

  .login-box {
    background: var(--card);
    border: 1px solid var(--border2);
    border-radius: 24px;
    padding: 40px 48px;
    width: 420px;
    box-shadow: var(--shadow), 0 0 60px rgba(232,101,10,0.08);
  }

  .login-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--text3);
    letter-spacing: 2px;
    margin-bottom: 10px;
    margin-top: 20px;
  }
  .login-label:first-child { margin-top: 0; }

  .staff-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 24px;
  }

  .staff-btn {
    background: var(--card2);
    border: 2px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 16px;
    color: var(--text2);
    font-size: 15px;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.18s;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .staff-btn .staff-icon { font-size: 28px; }
  .staff-btn:active, .staff-btn.selected {
    background: var(--orange);
    border-color: var(--orange2);
    color: white;
    transform: scale(0.97);
  }

  .pin-display {
    background: var(--bg3);
    border: 1px solid var(--border2);
    border-radius: var(--radius-sm);
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-bottom: 16px;
  }

  .pin-dot {
    width: 14px; height: 14px;
    border-radius: 50%;
    background: var(--border2);
    transition: background 0.15s;
  }
  .pin-dot.filled { background: var(--orange2); }

  .pin-pad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .pin-key {
    background: var(--card2);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    height: 58px;
    font-size: 22px;
    font-weight: 700;
    color: var(--text);
    cursor: pointer;
    font-family: inherit;
    transition: all 0.12s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pin-key:active { background: var(--orange); border-color: var(--orange2); transform: scale(0.94); }
  .pin-key.del { font-size: 20px; color: var(--text3); }
  .pin-key.enter { background: var(--orange); border-color: var(--orange2); }
  .pin-key.enter:active { background: var(--orange2); }

  /* ============ BOTTOM NAV ============ */
  .bottom-nav {
    display: flex;
    background: var(--card);
    border-top: 1px solid var(--border);
    padding: 0 8px;
    padding-bottom: env(safe-area-inset-bottom, 8px);
    flex-shrink: 0;
  }

  .nav-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 4px;
    gap: 4px;
    cursor: pointer;
    border: none;
    background: transparent;
    color: var(--text3);
    font-family: inherit;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: color 0.15s;
    border-radius: var(--radius-sm);
  }
  .nav-btn .nav-icon { font-size: 24px; transition: transform 0.15s; }
  .nav-btn.active { color: var(--orange2); }
  .nav-btn.active .nav-icon { transform: scale(1.15); }
  .nav-btn:active { opacity: 0.7; }

  /* ============ POS ============ */
  #screen-pos {
    background: var(--bg);
  }

  .pos-header {
    display: flex;
    align-items: center;
    padding: 16px 20px 12px;
    border-bottom: 1px solid var(--border);
    gap: 12px;
    background: var(--bg2);
    flex-shrink: 0;
  }

  .pos-header-title {
    font-size: 22px;
    font-weight: 800;
    color: var(--orange2);
    flex: 1;
  }

  .order-count-badge {
    background: var(--orange);
    color: white;
    border-radius: 20px;
    padding: 4px 14px;
    font-size: 13px;
    font-weight: 700;
  }

  .table-tag {
    background: var(--card2);
    border: 1px solid var(--border2);
    border-radius: 20px;
    padding: 6px 16px;
    font-size: 13px;
    color: var(--text2);
    font-weight: 600;
  }

  .pos-body {
    display: flex;
    flex: 1;
    overflow: hidden;
    gap: 0;
  }

  /* LEFT: Menu */
  .menu-panel {
    width: 58%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--border);
    overflow: hidden;
  }

  .menu-cats {
    display: flex;
    gap: 8px;
    padding: 14px 16px;
    overflow-x: auto;
    flex-shrink: 0;
    scrollbar-width: none;
  }
  .menu-cats::-webkit-scrollbar { display: none; }

  .cat-btn {
    background: var(--card2);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 8px 18px;
    color: var(--text2);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    font-family: inherit;
    transition: all 0.15s;
    flex-shrink: 0;
  }
  .cat-btn.active {
    background: var(--orange);
    border-color: var(--orange2);
    color: white;
  }
  .cat-btn:active { transform: scale(0.96); }

  .menu-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    padding: 0 16px 16px;
    overflow-y: auto;
    flex: 1;
  }

  .menu-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 18px;
    cursor: pointer;
    transition: all 0.18s;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 130px;
  }
  .menu-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--orange);
    opacity: 0;
    transition: opacity 0.15s;
  }
  .menu-card:active { transform: scale(0.97); background: var(--card2); }
  .menu-card:active::before { opacity: 1; }

  .menu-card-emoji { font-size: 40px; }
  .menu-card-name { font-size: 18px; font-weight: 700; color: var(--text); line-height: 1.3; }
  .menu-card-price { font-size: 22px; font-weight: 800; color: var(--orange2); }
  .menu-card-sub { font-size: 12px; color: var(--text3); }

  .menu-card-badge {
    position: absolute;
    top: 12px; right: 12px;
    background: var(--orange);
    color: white;
    border-radius: 12px;
    padding: 3px 10px;
    font-size: 13px;
    font-weight: 800;
    min-width: 28px;
    text-align: center;
  }

  /* RIGHT: Cart */
  .cart-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--bg2);
    overflow: hidden;
  }

  .cart-header {
    padding: 14px 16px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .cart-title { font-size: 17px; font-weight: 700; color: var(--text2); }

  .clear-btn {
    background: transparent;
    border: 1px solid var(--border2);
    border-radius: 8px;
    padding: 6px 12px;
    color: var(--text3);
    font-size: 12px;
    cursor: pointer;
    font-family: inherit;
  }
  .clear-btn:active { background: var(--red); color: white; border-color: var(--red2); }

  .cart-list {
    flex: 1;
    overflow-y: auto;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .cart-item {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: slideIn 0.2s ease;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .cart-item-emoji { font-size: 24px; flex-shrink: 0; }
  .cart-item-info { flex: 1; min-width: 0; }
  .cart-item-name { font-size: 13px; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cart-item-price-single { font-size: 11px; color: var(--text3); }

  .qty-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .qty-btn {
    width: 32px; height: 32px;
    border-radius: 8px;
    border: 1px solid var(--border2);
    background: var(--card2);
    color: var(--text);
    font-size: 18px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-family: inherit;
    font-weight: 700;
    transition: all 0.12s;
    flex-shrink: 0;
  }
  .qty-btn:active { background: var(--orange); border-color: var(--orange2); transform: scale(0.9); }
  .qty-btn.minus:active { background: var(--red); border-color: var(--red2); }

  .qty-num { font-size: 16px; font-weight: 800; color: var(--text); min-width: 22px; text-align: center; }
  .cart-item-total { font-size: 14px; font-weight: 800; color: var(--orange2); min-width: 52px; text-align: right; flex-shrink: 0; }

  .cart-empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: var(--text3);
  }
  .cart-empty-icon { font-size: 52px; opacity: 0.4; }
  .cart-empty-text { font-size: 15px; }

  /* Cart Summary */
  .cart-summary {
    border-top: 1px solid var(--border);
    padding: 14px 16px;
    background: var(--card);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: var(--text2);
  }

  .discount-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .discount-input {
    flex: 1;
    background: var(--bg3);
    border: 1px solid var(--border2);
    border-radius: 8px;
    padding: 8px 12px;
    color: var(--text);
    font-size: 14px;
    font-family: inherit;
    outline: none;
  }
  .discount-input:focus { border-color: var(--orange2); }

  .summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
    border-top: 1px solid var(--border);
    font-size: 20px;
    font-weight: 800;
    color: var(--orange2);
  }

  .payment-btns {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 4px;
  }

  .pay-method-btn {
    background: var(--card2);
    border: 2px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 10px 6px;
    color: var(--text2);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    text-align: center;
    transition: all 0.15s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .pay-method-btn .pay-icon { font-size: 20px; }
  .pay-method-btn.active { background: var(--orange); border-color: var(--orange2); color: white; }
  .pay-method-btn:active { transform: scale(0.95); }

  .checkout-btn {
    width: 100%;
    background: linear-gradient(135deg, var(--orange), var(--orange2));
    border: none;
    border-radius: var(--radius-sm);
    padding: 18px;
    color: white;
    font-size: 20px;
    font-weight: 800;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s;
    letter-spacing: 1px;
    box-shadow: 0 4px 20px rgba(232,101,10,0.35);
    margin-top: 4px;
  }
  .checkout-btn:active { transform: scale(0.98); opacity: 0.9; }
  .checkout-btn:disabled { background: var(--bg3); color: var(--text3); box-shadow: none; cursor: default; }

  /* ============ MODAL ============ */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 100;
    backdrop-filter: blur(4px);
  }
  .modal-overlay.open { display: flex; }

  .modal-box {
    background: var(--card);
    border: 1px solid var(--border2);
    border-radius: 24px;
    padding: 36px;
    width: 90%;
    max-width: 420px;
    box-shadow: var(--shadow);
    animation: popIn 0.2s ease;
  }
  @keyframes popIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .modal-title { font-size: 22px; font-weight: 800; color: var(--orange2); margin-bottom: 24px; }
  .modal-amount { font-size: 48px; font-weight: 800; color: var(--text); text-align: center; margin: 16px 0; }
  .modal-label { font-size: 14px; color: var(--text3); font-weight: 600; margin-bottom: 8px; }

  .cash-input {
    width: 100%;
    background: var(--bg3);
    border: 2px solid var(--border2);
    border-radius: var(--radius-sm);
    padding: 16px;
    color: var(--text);
    font-size: 28px;
    font-weight: 800;
    font-family: inherit;
    text-align: right;
    outline: none;
    margin-bottom: 12px;
  }
  .cash-input:focus { border-color: var(--orange2); }

  .change-display {
    background: var(--green);
    border-radius: var(--radius-sm);
    padding: 16px;
    text-align: center;
    margin-bottom: 20px;
  }
  .change-label { font-size: 13px; color: rgba(255,255,255,0.7); margin-bottom: 4px; }
  .change-amount { font-size: 36px; font-weight: 800; color: white; }

  .modal-btns { display: flex; gap: 12px; }
  .modal-cancel {
    flex: 1;
    background: var(--card2);
    border: 1px solid var(--border2);
    border-radius: var(--radius-sm);
    padding: 16px;
    color: var(--text2);
    font-size: 16px;
    font-family: inherit;
    cursor: pointer;
  }
  .modal-confirm {
    flex: 2;
    background: var(--green2);
    border: none;
    border-radius: var(--radius-sm);
    padding: 16px;
    color: white;
    font-size: 18px;
    font-weight: 800;
    font-family: inherit;
    cursor: pointer;
  }
  .modal-confirm:active { opacity: 0.85; }

  .quick-cash {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }
  .quick-cash-btn {
    background: var(--card2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px;
    color: var(--text2);
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.12s;
  }
  .quick-cash-btn:active { background: var(--orange); color: white; border-color: var(--orange2); }

  /* ============ HISTORY ============ */
  #screen-history { background: var(--bg); }

  .history-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    background: var(--bg2);
    flex-shrink: 0;
  }

  .history-header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }

  .page-title { font-size: 24px; font-weight: 800; color: var(--orange2); }

  .search-box {
    display: flex;
    align-items: center;
    background: var(--card);
    border: 1px solid var(--border2);
    border-radius: 12px;
    padding: 10px 16px;
    gap: 10px;
  }

  .search-icon { font-size: 18px; color: var(--text3); }

  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--text);
    font-size: 15px;
    font-family: inherit;
    outline: none;
  }
  .search-input::placeholder { color: var(--text3); }

  .filter-tabs {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  .filter-tab {
    background: var(--card2);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 7px 16px;
    color: var(--text3);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s;
  }
  .filter-tab.active { background: var(--orange); border-color: var(--orange2); color: white; }

  .history-list {
    flex: 1;
    overflow-y: auto;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .history-date-group { }
  .history-date-label {
    font-size: 12px;
    font-weight: 700;
    color: var(--text3);
    letter-spacing: 2px;
    margin-bottom: 10px;
    padding-left: 4px;
  }

  .receipt-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 16px 18px;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    transition: all 0.15s;
    margin-bottom: 8px;
  }
  .receipt-card:active { background: var(--card2); transform: scale(0.99); }

  .receipt-icon { font-size: 32px; }
  .receipt-info { flex: 1; }
  .receipt-id { font-size: 12px; color: var(--text3); font-weight: 600; letter-spacing: 1px; }
  .receipt-items { font-size: 14px; color: var(--text2); margin-top: 2px; }
  .receipt-time { font-size: 11px; color: var(--text3); margin-top: 2px; }
  .receipt-amount { text-align: right; }
  .receipt-total { font-size: 20px; font-weight: 800; color: var(--orange2); }
  .receipt-method { font-size: 11px; color: var(--text3); margin-top: 2px; }
  .receipt-method-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 700;
  }
  .badge-cash { background: rgba(39,174,96,0.2); color: var(--green2); }
  .badge-transfer { background: rgba(52,152,219,0.2); color: #3498db; }
  .badge-qr { background: rgba(155,89,182,0.2); color: #9b59b6; }

  .history-summary-bar {
    background: var(--card);
    border-top: 1px solid var(--border);
    padding: 14px 20px;
    display: flex;
    justify-content: space-around;
    flex-shrink: 0;
  }
  .summary-stat { text-align: center; }
  .summary-stat-val { font-size: 20px; font-weight: 800; color: var(--orange2); }
  .summary-stat-label { font-size: 11px; color: var(--text3); font-weight: 600; margin-top: 2px; }

  /* ============ DASHBOARD ============ */
  #screen-dashboard { background: var(--bg); }

  .dashboard-header {
    padding: 18px 20px 14px;
    border-bottom: 1px solid var(--border);
    background: var(--bg2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .dash-date { font-size: 13px; color: var(--text3); font-weight: 600; }

  .dashboard-body {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .dash-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .dash-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    position: relative;
    overflow: hidden;
  }

  .dash-card::after {
    content: '';
    position: absolute;
    top: -20px; right: -20px;
    width: 80px; height: 80px;
    border-radius: 50%;
    opacity: 0.06;
  }

  .dash-card.orange::after { background: var(--orange2); }
  .dash-card.green::after { background: var(--green2); }
  .dash-card.yellow::after { background: var(--yellow); }
  .dash-card.red::after { background: var(--red2); }

  .dash-card-icon { font-size: 28px; margin-bottom: 10px; }
  .dash-card-label { font-size: 12px; color: var(--text3); font-weight: 600; letter-spacing: 1px; margin-bottom: 6px; }
  .dash-card-value { font-size: 30px; font-weight: 800; color: var(--text); line-height: 1; }
  .dash-card-unit { font-size: 13px; color: var(--text3); font-weight: 600; margin-top: 4px; }
  .dash-card-trend {
    font-size: 12px;
    font-weight: 700;
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .trend-up { color: var(--green2); }
  .trend-down { color: var(--red2); }

  .dash-section-title {
    font-size: 16px;
    font-weight: 800;
    color: var(--text2);
    margin-bottom: 12px;
    letter-spacing: 0.5px;
  }

  .top-menu-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .top-menu-item {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 14px 16px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .top-menu-rank {
    font-size: 18px;
    font-weight: 800;
    color: var(--text3);
    min-width: 28px;
    text-align: center;
  }
  .top-menu-rank.gold { color: #f1c40f; }
  .top-menu-rank.silver { color: #bdc3c7; }
  .top-menu-rank.bronze { color: #cd7f32; }

  .top-menu-emoji { font-size: 28px; }
  .top-menu-info { flex: 1; }
  .top-menu-name { font-size: 15px; font-weight: 700; color: var(--text); }
  .top-menu-count { font-size: 12px; color: var(--text3); margin-top: 2px; }

  .top-menu-bar-wrap {
    flex: 2;
    background: var(--bg3);
    border-radius: 6px;
    height: 10px;
    overflow: hidden;
  }
  .top-menu-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--orange), var(--orange2));
    border-radius: 6px;
    transition: width 0.8s ease;
  }

  .top-menu-revenue { font-size: 14px; font-weight: 800; color: var(--orange2); min-width: 70px; text-align: right; }

  .monthly-chart {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
  }

  .chart-bars {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    height: 100px;
    margin-top: 16px;
  }

  .chart-bar-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    height: 100%;
    justify-content: flex-end;
  }

  .chart-bar {
    width: 100%;
    background: linear-gradient(to top, var(--orange), var(--orange2));
    border-radius: 6px 6px 0 0;
    min-height: 4px;
    transition: height 0.8s ease;
    position: relative;
  }
  .chart-bar.today { background: linear-gradient(to top, var(--yellow), #f1c40f); }

  .chart-label { font-size: 10px; color: var(--text3); font-weight: 600; }

  /* ============ SETTINGS ============ */
  #screen-settings { background: var(--bg); }

  .settings-body {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .settings-section {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }

  .settings-section-title {
    padding: 14px 18px;
    font-size: 12px;
    font-weight: 800;
    color: var(--text3);
    letter-spacing: 2px;
    border-bottom: 1px solid var(--border);
    background: var(--bg3);
  }

  .menu-item-row {
    display: flex;
    align-items: center;
    padding: 16px 18px;
    border-bottom: 1px solid var(--border);
    gap: 14px;
  }
  .menu-item-row:last-child { border-bottom: none; }

  .menu-item-emoji-big { font-size: 34px; }
  .menu-item-details { flex: 1; }
  .menu-item-name-big { font-size: 16px; font-weight: 700; color: var(--text); }
  .menu-item-category { font-size: 12px; color: var(--text3); margin-top: 2px; }

  .price-edit-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .price-edit-input {
    background: var(--bg3);
    border: 1px solid var(--border2);
    border-radius: 8px;
    padding: 8px 12px;
    color: var(--orange2);
    font-size: 16px;
    font-weight: 800;
    font-family: inherit;
    text-align: right;
    outline: none;
    width: 90px;
  }
  .price-edit-input:focus { border-color: var(--orange2); }

  .save-price-btn {
    background: var(--green2);
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    color: white;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
  }
  .save-price-btn:active { opacity: 0.8; }

  .toggle-btn {
    position: relative;
    width: 52px;
    height: 28px;
    background: var(--border2);
    border-radius: 14px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .toggle-btn.on { background: var(--orange); }
  .toggle-btn::after {
    content: '';
    position: absolute;
    top: 3px; left: 3px;
    width: 22px; height: 22px;
    background: white;
    border-radius: 50%;
    transition: left 0.2s;
  }
  .toggle-btn.on::after { left: 27px; }

  .add-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 18px;
    background: transparent;
    border: 2px dashed var(--border2);
    border-radius: var(--radius);
    color: var(--orange2);
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s;
  }
  .add-menu-btn:active { background: var(--card2); border-color: var(--orange); }

  /* ============ TOAST ============ */
  .toast {
    position: fixed;
    top: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(-80px);
    background: var(--green2);
    color: white;
    padding: 14px 28px;
    border-radius: 40px;
    font-size: 16px;
    font-weight: 700;
    z-index: 200;
    transition: transform 0.3s ease;
    white-space: nowrap;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }
  .toast.show { transform: translateX(-50%) translateY(0); }

  /* ============ RECEIPT DETAIL MODAL ============ */
  .receipt-detail {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .receipt-detail-row {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    color: var(--text2);
    padding: 4px 0;
    border-bottom: 1px solid var(--border);
  }
  .receipt-detail-row:last-child { border-bottom: none; }
  .receipt-detail-total {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 800;
    color: var(--orange2);
    padding-top: 8px;
    border-top: 2px solid var(--border2);
    margin-top: 4px;
  }

  /* ============ EXPORT MODAL ============ */
  .export-options { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
  .export-option-btn {
    background: var(--card2);
    border: 2px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 16px 20px;
    display: flex; align-items: center; gap: 14px;
    cursor: pointer; font-family: inherit; color: var(--text);
    transition: all 0.15s; text-align: left;
  }
  .export-option-btn:hover { border-color: var(--orange2); background: var(--bg3); }
  .export-option-btn.selected { border-color: var(--orange2); background: rgba(232,101,10,0.1); }
  .export-option-btn:active { transform: scale(0.98); }
  .export-icon-big { font-size: 30px; }
  .export-option-title { font-size: 15px; font-weight: 700; }
  .export-option-sub { font-size: 12px; color: var(--text3); margin-top: 2px; }
  .export-do-btn {
    width: 100%; background: linear-gradient(135deg,#1a7a3a,var(--green2));
    border: none; border-radius: var(--radius-sm); padding: 18px;
    color: white; font-size: 18px; font-weight: 800; cursor: pointer;
    font-family: inherit; letter-spacing: 0.5px;
    box-shadow: 0 4px 20px rgba(39,174,96,0.3);
  }
  .export-do-btn:active { opacity: 0.88; transform: scale(0.98); }

  /* ============ DASHBOARD ENHANCED ============ */
  .dash-kpi-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
  .kpi-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 18px 16px;
    position: relative; overflow: hidden;
  }
  .kpi-card::before {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
  }
  .kpi-orange::before { background: var(--orange2); }
  .kpi-green::before  { background: var(--green2); }
  .kpi-yellow::before { background: var(--yellow); }
  .kpi-red::before    { background: var(--red2); }
  .kpi-blue::before   { background: #3498db; }
  .kpi-purple::before { background: #9b59b6; }

  .kpi-icon { font-size: 22px; margin-bottom: 8px; }
  .kpi-label { font-size: 11px; color: var(--text3); font-weight: 700; letter-spacing: 1px; margin-bottom: 4px; }
  .kpi-value { font-size: 26px; font-weight: 800; color: var(--text); line-height: 1; }
  .kpi-sub { font-size: 11px; color: var(--text3); margin-top: 5px; }
  .kpi-trend { font-size: 12px; font-weight: 700; margin-top: 5px; display: flex; align-items: center; gap: 3px; }
  .kpi-up { color: var(--green2); } .kpi-down { color: var(--red2); }

  .dash-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .dash-row-3 { display: grid; grid-template-columns: 2fr 1fr; gap: 14px; }

  .dash-widget {
    background: var(--card); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 18px 20px;
  }
  .widget-title { font-size: 14px; font-weight: 800; color: var(--text2); margin-bottom: 14px; letter-spacing: 0.5px; }

  /* Peak Hour chart */
  .peak-bars { display: flex; align-items: flex-end; gap: 5px; height: 80px; }
  .peak-bar-wrap { flex:1; display:flex; flex-direction:column; align-items:center; gap:4px; height:100%; justify-content:flex-end; }
  .peak-bar { width:100%; border-radius:5px 5px 0 0; min-height:3px; transition: height 0.7s ease; }
  .peak-bar.hot { background: linear-gradient(to top, var(--red), var(--red2)); }
  .peak-bar.warm { background: linear-gradient(to top, var(--orange), var(--orange2)); }
  .peak-bar.cool { background: var(--card2); border: 1px solid var(--border2); }
  .peak-label { font-size: 9px; color: var(--text3); font-weight: 600; }

  /* Payment pie */
  .pay-breakdown { display: flex; flex-direction: column; gap: 10px; }
  .pay-row { display: flex; align-items: center; gap: 10px; }
  .pay-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .pay-bar-bg { flex:1; background: var(--bg3); border-radius: 6px; height: 8px; overflow:hidden; }
  .pay-bar-fill { height: 100%; border-radius: 6px; transition: width 0.8s ease; }
  .pay-pct { font-size: 13px; font-weight: 800; color: var(--text2); min-width: 36px; text-align:right; }
  .pay-name { font-size: 12px; color: var(--text3); min-width: 44px; }

  /* Staff leaderboard */
  .staff-row { display:flex; align-items:center; gap:12px; padding: 10px 0; border-bottom:1px solid var(--border); }
  .staff-row:last-child { border-bottom: none; }
  .staff-rank-num { font-size:18px; font-weight:800; color:var(--text3); min-width:24px; text-align:center; }
  .staff-avatar { font-size: 26px; }
  .staff-info { flex:1; }
  .staff-name { font-size:14px; font-weight:700; color:var(--text); }
  .staff-orders { font-size:11px; color:var(--text3); margin-top:2px; }
  .staff-revenue { font-size:15px; font-weight:800; color:var(--orange2); }

  /* Revenue chart (30-day) */
  .rev-chart-wrap { overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; }
  .rev-chart-wrap::-webkit-scrollbar { display: none; }
  .rev-bars-30 { display:flex; align-items:flex-end; gap:3px; height:90px; min-width: 500px; }
  .rev-bar-30-wrap { flex:1; display:flex; flex-direction:column; align-items:center; gap:4px; height:100%; justify-content:flex-end; min-width:14px; }
  .rev-bar-30 { width:100%; border-radius:3px 3px 0 0; min-height:3px; background: linear-gradient(to top, var(--orange), var(--orange2)); opacity:0.7; transition: height 0.5s; }
  .rev-bar-30.today-30 { opacity:1; background: linear-gradient(to top, var(--yellow), #f1c40f); }
  .rev-label-30 { font-size:8px; color:var(--text3); }

  /* Cost section */
  .cost-row { display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid var(--border); }
  .cost-row:last-child { border-bottom:none; }
  .cost-label { font-size:13px; color:var(--text2); }
  .cost-value { font-size:14px; font-weight:800; }
  .cost-profit { color: var(--green2); }
  .cost-expense { color: var(--red2); }
  .cost-neutral { color: var(--text); }

  /* Export button in dashboard */
  .dash-export-btn {
    display: flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg,#1a7a3a,var(--green2));
    border: none; border-radius: var(--radius-sm);
    padding: 10px 20px; color: white; font-size: 14px; font-weight: 700;
    cursor: pointer; font-family: inherit;
  }
  .dash-export-btn:active { opacity: 0.85; }

  /* Responsive dash */
  @media (max-width: 767px) {
    .dash-kpi-row { grid-template-columns: repeat(2,1fr); }
    .dash-row-2 { grid-template-columns: 1fr; }
    .dash-row-3 { grid-template-columns: 1fr; }
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

  /* iPad landscape optimization */
  @media (min-width: 768px) and (orientation: landscape) {
    .menu-grid { grid-template-columns: repeat(3, 1fr); }
    .dash-grid { grid-template-columns: repeat(4, 1fr); }
  }

  @media (min-width: 1024px) {
    .menu-grid { grid-template-columns: repeat(3, 1fr); }
  }
