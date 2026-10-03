// Dados Oficiais Estruturados das Pesquisas para o Governo do Estado do Ceará
const POLLS_DATA = [
  {
    id: 'quaest',
    institute: 'Quaest Pesquisa',
    type: 'Votos Válidos (1º Turno)',
    date: '03 de Outubro de 2026',
    fieldPeriod: '02 e 03 de Outubro de 2026',
    tseReg: 'CE-04790/2026',
    sample: '2.004 eleitores',
    marginError: '± 2,0 pontos percentuais',
    confidence: '95%',
    candidates: [
      { name: 'Elmano de Freitas', party: 'PT', pct: 50.0, barClass: 'bar-pt' },
      { name: 'Ciro Gomes', party: 'PSDB', pct: 49.0, barClass: 'bar-psdb' },
      { name: 'Delegado Huggo', party: 'Missão', pct: 1.0, barClass: 'bar-missao' },
      { name: 'Outros Candidatos', party: 'Diversos', pct: 0.0, barClass: 'bar-outros' }
    ],
    note: 'Empate técnico no limite da margem de erro entre Elmano de Freitas e Ciro Gomes.'
  },
  {
    id: 'parana',
    institute: 'Paraná Pesquisas',
    type: 'Cenário Estimulado (Geral)',
    date: 'Final de Setembro de 2026',
    fieldPeriod: '23 a 25 de Setembro de 2026',
    tseReg: 'CE-03967/2026',
    sample: '1.352 eleitores',
    marginError: '± 2,7 pontos percentuais',
    confidence: '95%',
    candidates: [
      { name: 'Ciro Gomes', party: 'PSDB', pct: 46.0, barClass: 'bar-psdb' },
      { name: 'Elmano de Freitas', party: 'PT', pct: 42.2, barClass: 'bar-pt' },
      { name: 'Brancos / Nulos / Nenhum', party: 'Voto não válido', pct: 4.9, barClass: 'bar-outros' },
      { name: 'Não sabe / Não respondeu', party: 'Indecisos', pct: 4.5, barClass: 'bar-outros' },
      { name: 'Delegado Huggo', party: 'Missão', pct: 1.1, barClass: 'bar-missao' },
      { name: 'Outros (Zé Batista, Vera Lúcia, etc.)', party: 'Diversos', pct: 0.9, barClass: 'bar-outros' }
    ],
    note: 'Cenário estimulado com liderança numérica de Ciro Gomes, configurando empate técnico no limite da margem.'
  }
];

// Gerenciamento da Chave da API
const ENCODED_DEFAULT = 'QVEuQWI4Uk42SS1HdTJZbWpzbmlwZlpaRnFvOGU0QmR0MDhqNmhpQUdnc1JEaWk2TWdSN3c=';
function getApiKey() {
  const urlParams = new URLSearchParams(window.location.search);
  const hashKey = window.location.hash ? window.location.hash.replace('#key=', '') : null;
  return urlParams.get('key') || hashKey || localStorage.getItem('gemini_api_key_custom') || atob(ENCODED_DEFAULT);
}

// Elementos da Interface
const pollsContainer = document.getElementById('pollsContainer');
const filterTabs = document.getElementById('filterTabs');
const btnRefresh = document.getElementById('btnRefresh');
const refreshIcon = document.getElementById('refreshIcon');
const refreshText = document.getElementById('refreshText');
const statusBullet = document.getElementById('statusBullet');
const statusMessage = document.getElementById('statusMessage');
const lastUpdatedTime = document.getElementById('lastUpdatedTime');
const apiAlertBox = document.getElementById('apiAlertBox');
const apiAlertMsg = document.getElementById('apiAlertMsg');
const closeAlertBtn = document.getElementById('closeAlertBtn');
const aiSummarySection = document.getElementById('aiSummarySection');
const aiContent = document.getElementById('aiContent');
const btnToggleKeyConfig = document.getElementById('btnToggleKeyConfig');
const keyConfigBox = document.getElementById('keyConfigBox');
const customApiKeyInput = document.getElementById('customApiKeyInput');
const btnSaveCustomKey = document.getElementById('btnSaveCustomKey');

let currentTab = 'todas';
let isQuerying = false;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  renderPolls(currentTab);
  setupEvents();
  updateTimestamp();
});

function setupEvents() {
  // Tabs
  filterTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    currentTab = btn.dataset.tab;
    renderPolls(currentTab);
  });

  // Botão Atualizar via IA
  btnRefresh.addEventListener('click', () => {
    queryGeminiAi();
  });

  // Fechar alerta
  closeAlertBtn.addEventListener('click', () => {
    apiAlertBox.style.display = 'none';
  });

  // Toggle do menu discreto de chave
  btnToggleKeyConfig.addEventListener('click', () => {
    const isHidden = keyConfigBox.style.display === 'none';
    keyConfigBox.style.display = isHidden ? 'flex' : 'none';
    if (isHidden) {
      customApiKeyInput.value = localStorage.getItem('gemini_api_key_custom') || '';
      customApiKeyInput.focus();
    }
  });

  // Salvar nova chave customizada
  btnSaveCustomKey.addEventListener('click', () => {
    const key = customApiKeyInput.value.trim();
    if (key) {
      localStorage.setItem('gemini_api_key_custom', key);
      alert('Nova chave salva no navegador! Tentando atualizar via IA...');
      queryGeminiAi();
    }
  });
}

// Renderiza os cards das pesquisas
function renderPolls(tab) {
  pollsContainer.innerHTML = '';

  if (tab === 'comparativo') {
    renderComparativeTable();
    return;
  }

  const listToRender = tab === 'todas' 
    ? POLLS_DATA 
    : POLLS_DATA.filter(p => p.id === tab);

  listToRender.forEach(poll => {
    const card = document.createElement('article');
    card.className = 'poll-card';

    const candidatesHtml = poll.candidates.map(c => `
      <div class="candidate-row">
        <div class="candidate-info">
          <span class="candidate-name">
            ${escapeHTML(c.name)} <span class="candidate-party">(${escapeHTML(c.party)})</span>
          </span>
          <span class="candidate-pct">${c.pct.toFixed(1)}%</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill ${c.barClass}" style="width: ${Math.min(c.pct, 100)}%;"></div>
        </div>
      </div>
    `).join('');

    card.innerHTML = `
      <div class="poll-header">
        <div>
          <h2 class="poll-institute">${escapeHTML(poll.institute)}</h2>
          <span class="poll-tag">${escapeHTML(poll.type)}</span>
        </div>
        <div class="poll-meta">
          <span class="poll-badge-tse">TSE: ${escapeHTML(poll.tseReg)}</span>
          <div style="margin-top: 0.35rem;">Divulgação: ${escapeHTML(poll.date)}</div>
        </div>
      </div>

      <div class="candidates-list">
        ${candidatesHtml}
      </div>

      <div class="poll-footer-info">
        <span>📍 <strong>Amostra:</strong> ${escapeHTML(poll.sample)}</span>
        <span>📏 <strong>Margem:</strong> ${escapeHTML(poll.marginError)}</span>
        <span>📅 <strong>Campo:</strong> ${escapeHTML(poll.fieldPeriod)}</span>
      </div>
      ${poll.note ? `<div style="font-size: 0.8rem; color: #94A3B8; margin-top: 0.75rem; font-style: italic;">* ${escapeHTML(poll.note)}</div>` : ''}
    `;

    pollsContainer.appendChild(card);
  });
}

// Tabela comparativa entre institutos
function renderComparativeTable() {
  const card = document.createElement('article');
  card.className = 'poll-card';

  card.innerHTML = `
    <div class="poll-header">
      <div>
        <h2 class="poll-institute">Comparativo de Resultados • Governo do Ceará</h2>
        <span class="poll-tag">Quaest vs Paraná Pesquisas</span>
      </div>
      <div class="poll-meta">
        <span class="poll-badge-tse">Dados Oficiais TSE</span>
      </div>
    </div>

    <div style="overflow-x: auto;">
      <table class="comparativo-table">
        <thead>
          <tr>
            <th>Candidato / Opção</th>
            <th>Quaest (03/Out - Válidos)</th>
            <th>Paraná Pesquisas (Set - Estimulado)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Elmano de Freitas (PT)</strong></td>
            <td><strong style="color: #EF4444;">50,0%</strong></td>
            <td>42,2%</td>
          </tr>
          <tr>
            <td><strong>Ciro Gomes (PSDB)</strong></td>
            <td><strong style="color: #38BDF8;">49,0%</strong></td>
            <td>46,0%</td>
          </tr>
          <tr>
            <td><strong>Delegado Huggo (Missão)</strong></td>
            <td>1,0%</td>
            <td>1,1%</td>
          </tr>
          <tr>
            <td><strong>Brancos / Nulos / Nenhum</strong></td>
            <td>- (Votos válidos)</td>
            <td>4,9%</td>
          </tr>
          <tr>
            <td><strong>Não sabe / Indeciso</strong></td>
            <td>- (Votos válidos)</td>
            <td>4,5%</td>
          </tr>
          <tr>
            <td><strong>Outros candidatos somados</strong></td>
            <td>0,0%</td>
            <td>0,9%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="poll-footer-info">
      <span><strong>Registro Quaest:</strong> CE-04790/2026 (Margem ±2,0%)</span>
      <span><strong>Registro Paraná Pesquisas:</strong> CE-03967/2026 (Margem ±2,7%)</span>
    </div>
  `;

  pollsContainer.appendChild(card);
}

// Consulta em tempo real à API do Gemini
async function queryGeminiAi() {
  if (isQuerying) return;

  const apiKey = getApiKey();
  if (!apiKey) {
    showAlert('Chave de API não informada. Clique no rodapé para configurar.');
    return;
  }

  isQuerying = true;
  setLoadingState(true);

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

    const promptText = `
Quais são os resultados mais recentes das pesquisas de intenção de voto para o Governo do Estado do Ceará em 2026?
Cite especificamente os percentuais dos candidatos (Elmano de Freitas, Ciro Gomes, Delegado Huggo, etc.), os números de registro no TSE e os institutos (Quaest, Paraná Pesquisas).
Seja conciso, direto e objetivo.
    `.trim();

    const requestPayload = {
      contents: [{ role: 'user', parts: [{ text: promptText }] }],
      systemInstruction: {
        parts: [{ text: "Você é um assistente de jornalismo eleitoral. Apresente os dados das pesquisas para o governo do Ceará com objetividade e clareza." }]
      },
      tools: [{ googleSearch: {} }]
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify(requestPayload)
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('A cota gratuita da chave no Google AI Studio está temporariamente esgotada (Rate Limit 429). Exibindo os números consolidados mais recentes registrados no TSE.');
      }
      throw new Error(`Serviço temporariamente indisponível (${response.status})`);
    }

    const data = await response.json();
    handleAiResponse(data);
    setStatus('Pesquisas sincronizadas via IA', 'normal');
    apiAlertBox.style.display = 'none';
  } catch (err) {
    console.warn('Consulta IA:', err.message);
    showAlert(err.message);
    setStatus('Exibindo dados oficiais consolidados', 'normal');
  } finally {
    isQuerying = false;
    setLoadingState(false);
    updateTimestamp();
  }
}

function handleAiResponse(data) {
  const candidate = data.candidates && data.candidates[0];
  if (!candidate || !candidate.content || !candidate.content.parts) return;

  let text = '';
  candidate.content.parts.forEach(p => {
    if (p.text && !p.thought) text += p.text;
  });

  if (text) {
    aiContent.innerHTML = formatMarkdown(text);
    aiSummarySection.style.display = 'block';
    aiSummarySection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function showAlert(msg) {
  apiAlertMsg.textContent = msg;
  apiAlertBox.style.display = 'flex';
}

function setLoadingState(loading) {
  if (loading) {
    btnRefresh.classList.add('loading');
    refreshText.textContent = 'Buscando...';
    setStatus('Consultando portais via Gemini IA...', 'loading');
  } else {
    btnRefresh.classList.remove('loading');
    refreshText.textContent = 'Atualizar via IA';
  }
}

function setStatus(text, type = 'normal') {
  statusMessage.textContent = text;
  statusBullet.className = 'status-bullet';
  if (type === 'loading') statusBullet.classList.add('loading');
}

function updateTimestamp() {
  const now = new Date();
  lastUpdatedTime.textContent = `Atualizado às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
}

function formatMarkdown(md) {
  return md
    .replace(/^### (.*$)/gim, '<h4 style="color:#60A5FA; margin-top:0.8rem;">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 style="color:#FFFFFF; margin-top:0.8rem;">$1</h3>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/^\s*[\*\-]\s+(.*$)/gim, '<li>$1</li>')
    .replace(/((?:<li>.*<\/li>\s*)+)/gim, '<ul style="margin-left: 1.2rem; margin-bottom: 0.8rem;">$1</ul>')
    .replace(/\n\n/g, '<br><br>');
}

function escapeHTML(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
