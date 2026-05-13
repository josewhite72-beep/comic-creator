// ===== STATE =====
const S = {
  layout: '2x3',
  selectedPanel: null,
  panels: {},       // panelIdx -> { bg: svgString|null, elements: [] }
  textSize: 9,
  bubbleColor: '#ffffff',
  deferredInstall: null
};

// ===== LAYOUT HELPERS =====
const LAYOUT_COUNTS = { '2x3':6, '3x2':6, '2x2':4, strip:4, wide:6 };
const panelCount = () => LAYOUT_COUNTS[S.layout] || 6;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  buildDrawer();
  buildBubbleColors();
  renderGrid();
  bindEvents();
  loadAutoSave();
});

// ===== EVENTS =====
function bindEvents() {
  // layout change
  document.getElementById('layoutSel').addEventListener('change', e => {
    S.layout = e.target.value;
    renderGrid();
  });

  // drawer
  document.getElementById('menuBtn').addEventListener('click', openDrawer);
  document.getElementById('assetsBtn').addEventListener('click', openDrawer);
  document.getElementById('closeDrawer').addEventListener('click', closeDrawer);
  document.getElementById('drawerOverlay').addEventListener('click', closeDrawer);

  // drawer tabs
  document.querySelectorAll('.dtab').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.tab === 'custom') buildCustomGrid();
      document.querySelectorAll('.dtab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });

  // AI panel
  document.getElementById('aiOpenBtn').addEventListener('click', openAIModal);
  document.getElementById('closeAI').addEventListener('click', closeAIModal);
  document.getElementById('aiOverlay').addEventListener('click', closeAIModal);

  // Save
  document.getElementById('saveBtn').addEventListener('click', openSaveModal);
  document.getElementById('closeSave').addEventListener('click', closeSaveModal);
  document.getElementById('saveOverlay').addEventListener('click', closeSaveModal);

  // Export
  document.getElementById('exportBtn').addEventListener('click', openExportModal);
  document.getElementById('closeExport').addEventListener('click', closeExportModal);
  document.getElementById('exportOverlay').addEventListener('click', closeExportModal);

  // Install PWA
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    S.deferredInstall = e;
    document.getElementById('installBanner').classList.remove('hidden');
  });
  document.getElementById('installBtn').addEventListener('click', async () => {
    if (!S.deferredInstall) return;
    S.deferredInstall.prompt();
    const { outcome } = await S.deferredInstall.userChoice;
    if (outcome === 'accepted') document.getElementById('installBanner').classList.add('hidden');
    S.deferredInstall = null;
  });
  document.getElementById('dismissInstall').addEventListener('click', () => {
    document.getElementById('installBanner').classList.add('hidden');
  });

  // Clear cache & reload
  document.getElementById('clearCacheBtn').addEventListener('click', async () => {
    if (!confirm('Clear cache and reload the app?')) return;
    // Unregister all service workers
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.unregister()));
    }
    // Delete all caches
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }
    location.reload(true);
  });

  // SVG file input
  document.getElementById('svgFileInput').addEventListener('change', handleSVGFile);

  // Paste modal
  document.getElementById('closePaste').addEventListener('click', closePasteModal);
  document.getElementById('pasteOverlay').addEventListener('click', closePasteModal);

  // Panel sheet close on canvas tap outside
  document.getElementById('comicGrid').addEventListener('click', e => {
    if (e.target === document.getElementById('comicGrid')) {
      closePanelSheet();
    }
  });
}

// ===== DRAWER =====
function openDrawer() {
  document.getElementById('drawer').classList.remove('hidden');
  document.getElementById('drawerOverlay').classList.remove('hidden');
}
function closeDrawer() {
  document.getElementById('drawer').classList.add('hidden');
  document.getElementById('drawerOverlay').classList.add('hidden');
}

// ===== GRID =====
function renderGrid() {
  const grid = document.getElementById('comicGrid');
  grid.className = 'comic-grid layout-' + S.layout;
  grid.innerHTML = '';
  const count = panelCount();
  for (let i = 0; i < count; i++) {
    grid.appendChild(createPanelEl(i));
  }
  autoSave();
}

function createPanelEl(idx) {
  const div = document.createElement('div');
  div.className = 'panel' + (S.panels[idx] && (S.panels[idx].bg || (S.panels[idx].elements && S.panels[idx].elements.length)) ? '' : ' empty');
  div.id = 'panel-' + idx;

  const numEl = document.createElement('span');
  numEl.className = 'panel-num';
  numEl.textContent = idx + 1;
  div.appendChild(numEl);

  if (!S.panels[idx] || (!S.panels[idx].bg && !(S.panels[idx].elements && S.panels[idx].elements.length))) {
    const hint = document.createElement('div');
    hint.className = 'panel-empty-hint';
    hint.innerHTML = 'Tap panel<br>+ add assets';
    div.appendChild(hint);
  } else {
    restorePanel(div, idx);
  }

  div.addEventListener('click', e => {
    if (e.target.closest('.bubble-del') || e.target.closest('.sprite-del')) return;
    selectPanel(idx);
  });
  return div;
}

function restorePanel(el, idx) {
  const pd = S.panels[idx];
  if (!pd) return;
  if (pd.bg) {
    const wrap = document.createElement('div');
    wrap.className = 'panel-bg-wrap';
    wrap.innerHTML = pd.bg;
    el.appendChild(wrap);
  }
  if (pd.elements) {
    pd.elements.forEach(item => addElementToPanel(el, item, false));
  }
}

// ===== PANEL SELECTION =====
function selectPanel(idx) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('selected'));
  const panel = document.getElementById('panel-' + idx);
  if (panel) {
    panel.classList.add('selected');
    panel.classList.remove('empty');
    const hint = panel.querySelector('.panel-empty-hint');
    if (hint) hint.style.display = 'none';
  }
  S.selectedPanel = idx;
  openPanelSheet();
}

function openPanelSheet() {
  document.getElementById('panelSheet').classList.remove('hidden');
}
function closePanelSheet() {
  document.getElementById('panelSheet').classList.add('hidden');
}

// ===== ENSURE PANEL DATA =====
function ensurePanel(idx) {
  if (!S.panels[idx]) S.panels[idx] = { bg: null, elements: [] };
  if (!S.panels[idx].elements) S.panels[idx].elements = [];
  const panel = document.getElementById('panel-' + idx);
  if (panel) {
    panel.classList.remove('empty');
    const hint = panel.querySelector('.panel-empty-hint');
    if (hint) hint.remove();
  }
  return panel;
}

// ===== ADD BUBBLE =====
function addBubble(type) {
  if (S.selectedPanel === null) { showToast('Tap a panel first!'); return; }
  const idx = S.selectedPanel;
  const panel = ensurePanel(idx);
  const item = {
    type: 'bubble', btype: type,
    text: type === 'caption' ? 'Narrator text...' : type === 'thought' ? 'Hmm...' : 'Hello!',
    x: 8, y: type === 'caption' ? 0 : 12,
    color: type === 'caption' ? '#fff9c4' : S.bubbleColor,
    size: S.textSize
  };
  S.panels[idx].elements.push(item);
  addElementToPanel(panel, item, true);
  autoSave();
}

// ===== ADD ELEMENT TO PANEL DOM =====
function addElementToPanel(panelEl, item, interactive) {
  if (item.type === 'bubble') {
    const el = document.createElement('div');
    el.className = item.btype === 'speech' ? 'speech-bubble' :
                   item.btype === 'thought' ? 'thought-bubble' : 'caption-box';
    el.style.fontSize = (item.size || 9) + 'px';
    el.style.background = item.color || '#ffffff';
    if (item.btype !== 'caption') {
      el.style.left = (item.x || 8) + 'px';
      el.style.top = (item.y || 12) + 'px';
    } else {
      el.style.top = '0';
    }
    el.contentEditable = 'true';
    el.textContent = item.text || '';

    const del = document.createElement('button');
    del.className = 'bubble-del';
    del.textContent = '×';
    del.addEventListener('click', e => { e.stopPropagation(); el.remove(); });
    el.appendChild(del);

    if (interactive) makeDraggable(el, panelEl);
    panelEl.appendChild(el);

  } else if (item.type === 'char' || item.type === 'obj') {
    const el = document.createElement('div');
    el.className = 'char-sprite';
    el.style.left = (item.x || 15) + 'px';
    el.style.top = (item.y || 10) + 'px';
    el.style.width = item.w || (item.type === 'obj' ? '32px' : '44px');
    el.style.height = item.h || (item.type === 'obj' ? '32px' : '58px');
    el.innerHTML = item.svg || '';

    const del = document.createElement('button');
    del.className = 'sprite-del';
    del.textContent = '×';
    del.addEventListener('click', e => { e.stopPropagation(); el.remove(); });
    el.appendChild(del);

    if (interactive) makeDraggable(el, panelEl);
    panelEl.appendChild(el);
  }
}

// ===== PLACE CHAR =====
function placeChar(key) {
  if (S.selectedPanel === null) { showToast('Tap a panel first!'); closeDrawer(); return; }
  const idx = S.selectedPanel;
  const panel = ensurePanel(idx);
  const charDef = CHAR_LIST.find(c => c.key === key);
  const color = charDef && charDef.colors.length ? charDef.colors[0] : undefined;
  const svg = color ? CHARS[key](color) : CHARS[key]();
  const item = { type: 'char', key, svg, x: 15, y: 8, w: '44px', h: '58px' };
  S.panels[idx].elements.push(item);
  addElementToPanel(panel, item, true);
  closeDrawer();
  autoSave();
  showToast(key.charAt(0).toUpperCase() + key.slice(1) + ' added!');
}

// ===== PLACE BACKGROUND =====
function placeBg(key) {
  if (S.selectedPanel === null) { showToast('Tap a panel first!'); closeDrawer(); return; }
  const idx = S.selectedPanel;
  ensurePanel(idx);
  S.panels[idx].bg = BGS[key];
  const panel = document.getElementById('panel-' + idx);
  // remove existing bg
  const existingBg = panel.querySelector('.panel-bg-wrap');
  if (existingBg) existingBg.remove();
  const wrap = document.createElement('div');
  wrap.className = 'panel-bg-wrap';
  wrap.innerHTML = S.panels[idx].bg;
  panel.insertBefore(wrap, panel.firstChild);
  panel.classList.remove('empty');
  closeDrawer();
  autoSave();
  showToast('Background set!');
}

// ===== PLACE OBJ =====
function placeObj(key) {
  if (S.selectedPanel === null) { showToast('Tap a panel first!'); closeDrawer(); return; }
  const idx = S.selectedPanel;
  const panel = ensurePanel(idx);
  const item = { type: 'obj', key, svg: OBJS[key], x: 30, y: 50, w: '34px', h: '34px' };
  S.panels[idx].elements.push(item);
  addElementToPanel(panel, item, true);
  closeDrawer();
  autoSave();
}

// ===== CLEAR PANEL =====
function clearSelectedPanel() {
  if (S.selectedPanel === null) { showToast('Tap a panel first!'); return; }
  const idx = S.selectedPanel;
  S.panels[idx] = { bg: null, elements: [] };
  const panel = document.getElementById('panel-' + idx);
  panel.innerHTML = '<span class="panel-num">' + (idx + 1) + '</span><div class="panel-empty-hint">Tap panel<br>+ add assets</div>';
  panel.classList.add('empty');
  autoSave();
  showToast('Panel cleared');
}

// ===== CLEAR BUBBLES =====
function clearBubbles() {
  if (S.selectedPanel === null) return;
  const panel = document.getElementById('panel-' + S.selectedPanel);
  panel.querySelectorAll('.speech-bubble, .thought-bubble, .caption-box').forEach(b => b.remove());
  showToast('Bubbles removed');
}

// ===== TEXT SIZE =====
function setTextSize(btn) {
  document.querySelectorAll('.sz-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  S.textSize = parseInt(btn.dataset.size);
}

// ===== BUBBLE COLORS =====
function buildBubbleColors() {
  const row = document.getElementById('bubbleColors');
  BUBBLE_COLORS.forEach(color => {
    const div = document.createElement('div');
    div.className = 'bc' + (color === S.bubbleColor ? ' active' : '');
    div.style.background = color;
    if (color === '#ffffff') div.style.border = '2px solid #ddd';
    div.addEventListener('click', () => {
      document.querySelectorAll('.bc').forEach(b => b.classList.remove('active'));
      div.classList.add('active');
      S.bubbleColor = color;
    });
    row.appendChild(div);
  });
}

// ===== DRAG (mouse + touch) =====
function makeDraggable(el, container) {
  let startX, startY, elX, elY, dragging = false;

  function getPos(e) {
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX, y: t.clientY };
  }

  function onStart(e) {
    if (e.target.contentEditable === 'true' && !e.target.classList.contains('char-sprite')) return;
    if (e.target.classList.contains('bubble-del') || e.target.classList.contains('sprite-del')) return;
    e.preventDefault();
    dragging = true;
    const pos = getPos(e);
    const rect = el.getBoundingClientRect();
    startX = pos.x - rect.left;
    startY = pos.y - rect.top;
    el.style.zIndex = 50;
  }

  function onMove(e) {
    if (!dragging) return;
    e.preventDefault();
    const pos = getPos(e);
    const cr = container.getBoundingClientRect();
    let nx = pos.x - cr.left - startX;
    let ny = pos.y - cr.top - startY;
    nx = Math.max(0, Math.min(cr.width - el.offsetWidth, nx));
    ny = Math.max(0, Math.min(cr.height - el.offsetHeight, ny));
    el.style.left = nx + 'px';
    el.style.top = ny + 'px';
  }

  function onEnd() {
    dragging = false;
    el.style.zIndex = '';
  }

  el.addEventListener('mousedown', onStart);
  el.addEventListener('touchstart', onStart, { passive: false });
  document.addEventListener('mousemove', onMove);
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('mouseup', onEnd);
  document.addEventListener('touchend', onEnd);
}

// ===== BUILD DRAWER =====
function buildDrawer() {
  // Characters
  const charGrid = document.getElementById('charGrid');
  CHAR_LIST.forEach(c => {
    const item = document.createElement('div');
    item.className = 'asset-item';
    const svgFn = CHARS[c.key];
    const svg = typeof svgFn === 'function' ? svgFn() : svgFn;
    item.innerHTML = svg + `<div class="asset-label">${c.label}</div>`;
    item.addEventListener('click', () => placeChar(c.key));
    charGrid.appendChild(item);
  });

  // Backgrounds
  const bgGrid = document.getElementById('bgGrid');
  BG_LIST.forEach(b => {
    const item = document.createElement('div');
    item.className = 'asset-item bg-item';
    item.innerHTML = BGS[b.key] + `<div class="asset-label">${b.label}</div>`;
    item.addEventListener('click', () => placeBg(b.key));
    bgGrid.appendChild(item);
  });

  // Objects
  const objGrid = document.getElementById('objGrid');
  OBJ_LIST.forEach(o => {
    const item = document.createElement('div');
    item.className = 'asset-item obj-item';
    item.innerHTML = OBJS[o.key] + `<div class="asset-label">${o.label}</div>`;
    item.addEventListener('click', () => placeObj(o.key));
    objGrid.appendChild(item);
  });
}

// ===== AI MODAL =====
function openAIModal() {
  document.getElementById('aiModal').classList.remove('hidden');
  document.getElementById('aiOverlay').classList.remove('hidden');
  document.getElementById('aiStatus').classList.add('hidden');
}
function closeAIModal() {
  document.getElementById('aiModal').classList.add('hidden');
  document.getElementById('aiOverlay').classList.add('hidden');
}

async function generateStory() {
  const topic = document.getElementById('aiTopic').value.trim();
  const grade = document.getElementById('aiGrade').value;
  const phase = document.getElementById('aiPhase').value;
  const context = document.getElementById('aiContext').value.trim();

  if (!topic) { showToast('Enter a topic first!'); return; }

  const btn = document.getElementById('aiGenerateBtn');
  const status = document.getElementById('aiStatus');
  btn.disabled = true;
  btn.textContent = '⏳ Generating...';
  status.className = 'ai-status';
  status.classList.remove('hidden');
  status.textContent = '✨ Writing your comic story...';

  try {
    const resp = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic, grade, phase, context,
        panelCount: panelCount()
      })
    });

    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.error || 'Server error ' + resp.status);
    }

    const data = await resp.json();
    const panels = data.panels;

    status.textContent = '✅ Story ready! Applying to panels...';
    status.className = 'ai-status success';
    applyStoryToPanels(panels);
    setTimeout(closeAIModal, 1400);

  } catch (err) {
    status.textContent = '❌ ' + err.message;
    status.className = 'ai-status error';
  } finally {
    btn.disabled = false;
    btn.textContent = '✨ Generate Story';
  }
}

function applyStoryToPanels(panels) {
  panels.forEach(pd => {
    const idx = pd.panel - 1;
    if (idx < 0 || idx >= panelCount()) return;

    selectPanel(idx);
    const panel = ensurePanel(idx);
    if (!S.panels[idx].elements) S.panels[idx].elements = [];

    if (pd.caption) {
      const capItem = {
        type: 'bubble', btype: 'caption',
        text: pd.caption, x: 0, y: 0,
        color: '#fff9c4', size: 9
      };
      S.panels[idx].elements.push(capItem);
      addElementToPanel(panel, capItem, true);
    }

    if (pd.speech && pd.speech.length) {
      const speeches = pd.speech.filter(s => s && s !== 'null');
      speeches.forEach((txt, si) => {
        const bItem = {
          type: 'bubble', btype: 'speech',
          text: txt, x: si === 0 ? 6 : 55, y: pd.caption ? 22 : 10,
          color: si === 0 ? '#ffffff' : '#fff9c4', size: 9
        };
        S.panels[idx].elements.push(bItem);
        addElementToPanel(panel, bItem, true);
      });
    }

    panel.classList.remove('empty');
    const hint = panel.querySelector('.panel-empty-hint');
    if (hint) hint.remove();
  });
  autoSave();
  showToast('Story applied! Add characters & backgrounds.');
}

// ===== SAVE / LOAD MODAL =====
function openSaveModal() {
  document.getElementById('saveModal').classList.remove('hidden');
  document.getElementById('saveOverlay').classList.remove('hidden');
  renderSavedList();
}
function closeSaveModal() {
  document.getElementById('saveModal').classList.add('hidden');
  document.getElementById('saveOverlay').classList.add('hidden');
}

function saveComic() {
  const name = document.getElementById('saveName').value.trim() || ('Comic ' + new Date().toLocaleDateString());
  const saves = JSON.parse(localStorage.getItem('comicSaves') || '[]');
  const snapshot = captureSnapshot();
  saves.unshift({ name, date: new Date().toISOString(), layout: S.layout, snapshot });
  if (saves.length > 20) saves.splice(20);
  localStorage.setItem('comicSaves', JSON.stringify(saves));
  document.getElementById('saveName').value = '';
  renderSavedList();
  showToast('Saved: ' + name);
}

function captureSnapshot() {
  // Capture current DOM text from panels
  const snap = { layout: S.layout, panels: {} };
  for (let i = 0; i < panelCount(); i++) {
    const pd = S.panels[i];
    if (!pd) continue;
    snap.panels[i] = {
      bg: pd.bg || null,
      elements: []
    };
    const panelEl = document.getElementById('panel-' + i);
    if (!panelEl) continue;
    // Capture bubbles with current text
    panelEl.querySelectorAll('.speech-bubble, .thought-bubble, .caption-box').forEach(el => {
      const text = el.childNodes[0] ? el.childNodes[0].textContent : el.textContent;
      const btype = el.classList.contains('speech-bubble') ? 'speech' :
                    el.classList.contains('thought-bubble') ? 'thought' : 'caption';
      snap.panels[i].elements.push({
        type: 'bubble', btype,
        text: text.trim(),
        x: parseInt(el.style.left) || 0,
        y: parseInt(el.style.top) || 0,
        color: el.style.background || '#ffffff',
        size: parseInt(el.style.fontSize) || 9
      });
    });
    // Capture sprites
    panelEl.querySelectorAll('.char-sprite').forEach(el => {
      snap.panels[i].elements.push({
        type: 'char',
        svg: el.innerHTML.replace(/<button[^>]*>.*?<\/button>/gs, ''),
        x: parseInt(el.style.left) || 0,
        y: parseInt(el.style.top) || 0,
        w: el.style.width || '44px',
        h: el.style.height || '58px'
      });
    });
  }
  return snap;
}

function loadSnapshot(snap) {
  S.layout = snap.layout || '2x3';
  document.getElementById('layoutSel').value = S.layout;
  S.panels = {};
  Object.keys(snap.panels).forEach(k => {
    S.panels[parseInt(k)] = snap.panels[k];
  });
  renderGrid();
}

function renderSavedList() {
  const list = document.getElementById('savedList');
  const saves = JSON.parse(localStorage.getItem('comicSaves') || '[]');
  if (!saves.length) { list.innerHTML = '<p style="font-size:12px;color:#aaa;">No saved comics yet.</p>'; return; }
  list.innerHTML = '';
  saves.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'saved-item';
    const d = new Date(s.date);
    div.innerHTML = `
      <div class="saved-item-name">${s.name}</div>
      <div class="saved-item-date">${d.toLocaleDateString()}</div>
      <div class="saved-item-btns">
        <button class="si-btn" onclick="loadComic(${i})">Load</button>
        <button class="si-btn danger" onclick="deleteComic(${i})">✕</button>
      </div>`;
    list.appendChild(div);
  });
}

function loadComic(i) {
  const saves = JSON.parse(localStorage.getItem('comicSaves') || '[]');
  if (!saves[i]) return;
  loadSnapshot(saves[i].snapshot);
  closeSaveModal();
  showToast('Loaded: ' + saves[i].name);
}

function deleteComic(i) {
  const saves = JSON.parse(localStorage.getItem('comicSaves') || '[]');
  const name = saves[i].name;
  saves.splice(i, 1);
  localStorage.setItem('comicSaves', JSON.stringify(saves));
  renderSavedList();
  showToast('Deleted: ' + name);
}

function autoSave() {
  try {
    const snap = captureSnapshot();
    localStorage.setItem('comicAutosave', JSON.stringify(snap));
  } catch(e) {}
}

function loadAutoSave() {
  try {
    const raw = localStorage.getItem('comicAutosave');
    if (!raw) return;
    const snap = JSON.parse(raw);
    if (snap && snap.panels && Object.keys(snap.panels).length > 0) {
      loadSnapshot(snap);
    }
  } catch(e) {}
}

// ===== EXPORT MODAL =====
function openExportModal() {
  document.getElementById('exportModal').classList.remove('hidden');
  document.getElementById('exportOverlay').classList.remove('hidden');
}
function closeExportModal() {
  document.getElementById('exportModal').classList.add('hidden');
  document.getElementById('exportOverlay').classList.add('hidden');
}

function exportHTML() {
  const grid = document.getElementById('comicGrid');
  const layoutCols = { '2x3':'1fr 1fr', '3x2':'1fr 1fr 1fr', '2x2':'1fr 1fr', strip:'1fr', wide:'2fr 1fr' };
  const layoutRows = { '2x3':'repeat(3,150px)', '3x2':'repeat(2,180px)', '2x2':'repeat(2,200px)', strip:'repeat(4,130px)', wide:'repeat(3,150px)' };
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Comic - AOA English</title>
<style>
body{margin:0;padding:20px;background:#f0ece4;display:flex;flex-direction:column;align-items:center;font-family:sans-serif;}
h2{margin:0 0 12px;font-size:16px;color:#555;}
.grid{display:grid;grid-template-columns:${layoutCols[S.layout]||'1fr 1fr'};grid-template-rows:${layoutRows[S.layout]||'repeat(3,150px)'};gap:4px;background:#1a1a2e;padding:4px;border-radius:6px;max-width:700px;width:100%;}
.panel{background:white;position:relative;overflow:hidden;}
.panel-bg-wrap{position:absolute;inset:0;overflow:hidden;}
.panel-bg-wrap svg{width:100%;height:100%;}
.panel-num{position:absolute;top:3px;left:5px;font-size:9px;color:rgba(0,0,0,0.2);font-family:'Comic Sans MS',cursive;z-index:20;pointer-events:none;}
.char-sprite{position:absolute;z-index:5;}
.char-sprite svg{display:block;}
.speech-bubble{position:absolute;background:white;border:2.5px solid #1a1a2e;border-radius:14px;padding:4px 8px;font-family:'Comic Sans MS',cursive;color:#1a1a2e;text-align:center;z-index:10;min-width:50px;max-width:110px;line-height:1.3;word-wrap:break-word;font-size:10px;}
.speech-bubble::after{content:'';position:absolute;bottom:-12px;left:50%;transform:translateX(-50%);border:6px solid transparent;border-top-color:#1a1a2e;}
.speech-bubble::before{content:'';position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:inherit;z-index:1;}
.thought-bubble{position:absolute;background:white;border:2.5px solid #1a1a2e;border-radius:50%;padding:8px 12px;font-family:'Comic Sans MS',cursive;color:#1a1a2e;text-align:center;z-index:10;min-width:55px;max-width:100px;line-height:1.3;font-size:10px;}
.caption-box{position:absolute;top:0;left:0;right:0;background:#fff9c4;border-bottom:2.5px solid #1a1a2e;padding:3px 6px;font-family:'Comic Sans MS',cursive;color:#1a1a2e;font-size:10px;z-index:10;line-height:1.4;}
@media print{body{padding:0;background:white;}h2{display:none;}.grid{max-width:100%;}}
</style></head>
<body>
<h2>Comic - AOA English Activity</h2>
<div class="grid">${grid.innerHTML.replace(/contenteditable="true"/g,'')}</div>
<p style="font-size:11px;color:#aaa;margin-top:12px;">Created with Comic Book Creator · MEDUCA Panama</p>
</body></html>`;

  downloadFile(html, 'comic-aoa.html', 'text/html');
  closeExportModal();
  showToast('HTML exported!');
}

function exportPrintHTML() {
  const grid = document.getElementById('comicGrid');
  const layoutCols = { '2x3':'1fr 1fr', '3x2':'1fr 1fr 1fr', '2x2':'1fr 1fr', strip:'1fr', wide:'2fr 1fr' };
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8">
<title>Comic Print</title>
<style>
*{box-sizing:border-box;}
body{margin:10mm;font-family:sans-serif;}
.grid{display:grid;grid-template-columns:${layoutCols[S.layout]||'1fr 1fr'};gap:3px;background:#000;padding:3px;border:2px solid #000;}
.panel{background:white;position:relative;overflow:hidden;min-height:120px;}
.panel-bg-wrap{position:absolute;inset:0;overflow:hidden;opacity:0.5;}
.panel-bg-wrap svg{width:100%;height:100%;}
.panel-num{position:absolute;top:2px;left:4px;font-size:8px;color:rgba(0,0,0,0.3);}
.char-sprite{position:absolute;}
.char-sprite svg{display:block;filter:grayscale(100%);}
.speech-bubble{position:absolute;background:white;border:2px solid black;border-radius:12px;padding:3px 7px;font-family:'Comic Sans MS',cursive;color:black;text-align:center;z-index:10;min-width:45px;max-width:100px;line-height:1.3;word-wrap:break-word;font-size:9px;}
.speech-bubble::after{content:'';position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:black;}
.thought-bubble{position:absolute;background:white;border:2px solid black;border-radius:50%;padding:6px 10px;font-family:'Comic Sans MS',cursive;color:black;text-align:center;z-index:10;font-size:9px;}
.caption-box{position:absolute;top:0;left:0;right:0;background:#eee;border-bottom:2px solid black;padding:2px 5px;font-family:'Comic Sans MS',cursive;color:black;font-size:9px;}
@page{margin:10mm;}
</style></head>
<body>
<div class="grid">${grid.innerHTML.replace(/contenteditable="true"/g,'')}</div>
</body></html>`;

  downloadFile(html, 'comic-print.html', 'text/html');
  closeExportModal();
  showToast('Print layout exported!');
}

function exportJSON() {
  const snap = captureSnapshot();
  downloadFile(JSON.stringify(snap, null, 2), 'comic-backup.json', 'application/json');
  closeExportModal();
  showToast('JSON backup saved!');
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}


// ===== CUSTOM ASSETS =====
const CUSTOM_STORAGE_KEY = 'comicCustomAssets';

function loadCustomAssets() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_STORAGE_KEY) || '[]');
  } catch(e) { return []; }
}

function saveCustomAssets(assets) {
  localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(assets));
}

function buildCustomGrid() {
  const grid = document.getElementById('customGrid');
  const empty = document.getElementById('customEmpty');
  const assets = loadCustomAssets();
  grid.innerHTML = '';
  if (!assets.length) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  assets.forEach((asset, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'custom-asset-wrap';
    const item = document.createElement('div');
    item.className = 'asset-item';
    item.innerHTML = asset.svg + `<div class="asset-label">${asset.name}</div>`;
    item.addEventListener('click', () => placeCustomAsset(asset));
    const del = document.createElement('button');
    del.className = 'custom-del-btn';
    del.textContent = '×';
    del.addEventListener('click', e => { e.stopPropagation(); deleteCustomAsset(i); });
    wrap.appendChild(item);
    wrap.appendChild(del);
    grid.appendChild(wrap);
  });
}

function deleteCustomAsset(idx) {
  const assets = loadCustomAssets();
  assets.splice(idx, 1);
  saveCustomAssets(assets);
  buildCustomGrid();
  showToast('Asset removed');
}

function placeCustomAsset(asset) {
  if (S.selectedPanel === null) { showToast('Tap a panel first!'); closeDrawer(); return; }
  const idx = S.selectedPanel;
  const panel = ensurePanel(idx);
  const item = { type: 'char', key: 'custom', svg: asset.svg, x: 15, y: 10, w: '52px', h: '52px' };
  S.panels[idx].elements.push(item);
  addElementToPanel(panel, item, true);
  closeDrawer();
  autoSave();
  showToast(asset.name + ' added!');
}

function addCustomAsset(name, svg) {
  // Sanitize: keep only SVG, strip scripts
  const clean = svg.replace(/<script[\s\S]*?<\/script>/gi, '')
                   .replace(/on\w+="[^"]*"/gi, '')
                   .replace(/on\w+='[^']*'/gi, '');
  if (!clean.includes('<svg')) { showToast('Invalid SVG'); return false; }

  // Normalize viewBox for consistent display
  let normalized = clean.trim();
  if (!normalized.includes('viewBox') && !normalized.includes('viewbox')) {
    normalized = normalized.replace('<svg', '<svg viewBox="0 0 100 100"');
  }
  // Force width/height to 100% for responsive display
  normalized = normalized.replace(/<svg([^>]*)width="[^"]*"/, '<svg$1');
  normalized = normalized.replace(/<svg([^>]*)height="[^"]*"/, '<svg$1');

  const assets = loadCustomAssets();
  assets.push({ name: name || 'Custom', svg: normalized });
  saveCustomAssets(assets);
  buildCustomGrid();
  return true;
}

// --- File upload ---
function handleSVGFile(e) {
  const file = e.target.files[0];
  if (!file) return;
  const name = file.name.replace(/\.svg$/i, '').replace(/-|_/g, ' ') || 'Custom';
  const reader = new FileReader();
  reader.onload = ev => {
    const text = ev.target.result;
    if (!text.includes('<svg')) {
      showToast('File does not contain SVG code');
      e.target.value = '';
      return;
    }
    const ok = addCustomAsset(name, text);
    if (ok) showToast(name + ' imported!');
    e.target.value = '';
  };
  reader.onerror = () => { showToast('Could not read file'); e.target.value = ''; };
  reader.readAsText(file);
}

// Alternative: open file manager directly (Android workaround)
function triggerSVGFile() {
  const input = document.getElementById('svgFileInput');
  // Reset to force change event even if same file
  input.value = '';
  input.click();
}

// --- Paste modal ---
function openPasteModal() {
  document.getElementById('pasteModal').classList.remove('hidden');
  document.getElementById('pasteOverlay').classList.remove('hidden');
  document.getElementById('svgPreviewBox').classList.add('hidden');
  document.getElementById('svgCode').value = '';
  document.getElementById('svgName').value = '';
}
function closePasteModal() {
  document.getElementById('pasteModal').classList.add('hidden');
  document.getElementById('pasteOverlay').classList.add('hidden');
}

function previewSVG() {
  const code = document.getElementById('svgCode').value.trim();
  const box = document.getElementById('svgPreviewBox');
  if (!code.includes('<svg')) { showToast('Paste valid SVG code'); return; }
  box.innerHTML = code;
  box.classList.remove('hidden');
}

function importPastedSVG() {
  const name = document.getElementById('svgName').value.trim() || 'Custom';
  const code = document.getElementById('svgCode').value.trim();
  if (!code) { showToast('Paste SVG code first'); return; }
  const ok = addCustomAsset(name, code);
  if (ok) {
    showToast(name + ' added to My Assets!');
    closePasteModal();
  }
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  toast.style.animation = 'none';
  void toast.offsetWidth;
  toast.style.animation = 'fadeInOut 2.5s ease forwards';
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.add('hidden'), 2600);
}
