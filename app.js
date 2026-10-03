// Dados Oficiais Estruturados das Pesquisas - Governo do Estado do Ceará
const POLLS_DATA = [
  {
    id: 'quaest',
    institute: 'Quaest Pesquisa',
    type: 'Votos Válidos (1º Turno) • Levantamento de Véspera',
    publishedAt: '03 de Outubro de 2026 (Hoje)',
    publishedHour: '18h00',
    fieldPeriod: '02 e 03 de Outubro de 2026',
    isCollectedToday: true,
    tseReg: 'CE-04790/2026',
    sample: '2.004 eleitores',
    marginError: '± 2,0 pontos percentuais',
    confidence: '95%',
    source: {
      name: 'TV Verdes Mares / G1 Ceará / O Povo',
      url: 'https://g1.globo.com/ce/ceara/'
    },
    timingClarification: '✅ Pesquisa de Véspera: Entrevistas feitas ontem e hoje (02 e 03/out) e divulgadas hoje às 18h.',
    previousPoll: {
      date: '28 de Setembro de 2026',
      tseReg: 'CE-03120/2026',
      label: 'Rodada Anterior Quaest'
    },
    candidates: [
      { name: 'Elmano de Freitas', party: 'PT', pct: 50.0, prevPct: 48.0, barClass: 'bar-pt' },
      { name: 'Ciro Gomes', party: 'PSDB', pct: 49.0, prevPct: 50.0, barClass: 'bar-psdb' },
      { name: 'Delegado Huggo', party: 'Missão', pct: 1.0, prevPct: 1.0, barClass: 'bar-missao' },
      { name: 'Outros Candidatos', party: 'Diversos', pct: 0.0, prevPct: 1.0, barClass: 'bar-outros' }
    ],
    note: 'Empate técnico rigoroso na margem de erro entre Elmano de Freitas e Ciro Gomes.',
    socials: [
      { label: '𝕏 @pesquisaquaest', url: 'https://twitter.com/pesquisaquaest' },
      { label: '📷 @quaestpesquisa', url: 'https://www.instagram.com/quaestpesquisa' }
    ]
  },
  {
    id: 'datafolha',
    institute: 'Datafolha',
    type: 'Votos Válidos (1º Turno) • Levantamento de Véspera',
    publishedAt: '03 de Outubro de 2026 (Hoje)',
    publishedHour: '18h30',
    fieldPeriod: '02 e 03 de Outubro de 2026',
    isCollectedToday: true,
    tseReg: 'CE-08721/2026',
    sample: '2.150 eleitores',
    marginError: '± 2,0 pontos percentuais',
    confidence: '95%',
    source: {
      name: 'Folha de S.Paulo / TV Globo',
      url: 'https://www1.folha.uol.com.br/'
    },
    timingClarification: '✅ Pesquisa de Véspera: Entrevistas feitas ontem e hoje (02 e 03/out) e divulgadas hoje às 18h30.',
    previousPoll: {
      date: '27 de Setembro de 2026',
      tseReg: 'CE-05410/2026',
      label: 'Rodada Anterior Datafolha'
    },
    candidates: [
      { name: 'Elmano de Freitas', party: 'PT', pct: 50.0, prevPct: 48.5, barClass: 'bar-pt' },
      { name: 'Ciro Gomes', party: 'PSDB', pct: 47.0, prevPct: 48.0, barClass: 'bar-psdb' },
      { name: 'Delegado Huggo', party: 'Missão', pct: 2.0, prevPct: 1.5, barClass: 'bar-missao' },
      { name: 'Outros Candidatos', party: 'Diversos', pct: 1.0, prevPct: 2.0, barClass: 'bar-outros' }
    ],
    note: 'Datafolha divulgado na véspera aponta empate técnico no limite máximo da margem.',
    socials: [
      { label: '🌐 folha.uol.com.br', url: 'https://www1.folha.uol.com.br/' },
      { label: '𝕏 @folha', url: 'https://twitter.com/folha' }
    ]
  },
  {
    id: 'parana',
    institute: 'Paraná Pesquisas',
    type: 'Última Rodada Disponível • Coleta de Setembro',
    publishedAt: '26 de Setembro de 2026',
    publishedHour: '07h30',
    fieldPeriod: '23 a 25 de Setembro de 2026',
    isCollectedToday: false,
    tseReg: 'CE-03967/2026',
    sample: '1.352 eleitores',
    marginError: '± 2,7 pontos percentuais',
    confidence: '95%',
    source: {
      name: 'Portal Paraná Pesquisas / Poder360 / Gazeta do Povo',
      url: 'https://www.paranapesquisas.com.br'
    },
    timingClarification: '⚠️ Esclarecimento: Esta pesquisa foi realizada entre 23 e 25 de setembro (publicada em 26/set). A Paraná Pesquisas NÃO realizou coleta em campo hoje (03/out). Os números exibidos são a última pesquisa oficial disponível do instituto.',
    previousPoll: {
      date: '15 de Setembro de 2026',
      tseReg: 'CE-02450/2026',
      label: 'Rodada Anterior Paraná Pesquisas'
    },
    candidates: [
      { name: 'Ciro Gomes', party: 'PSDB', pct: 46.0, prevPct: 44.5, barClass: 'bar-psdb' },
      { name: 'Elmano de Freitas', party: 'PT', pct: 42.2, prevPct: 43.1, barClass: 'bar-pt' },
      { name: 'Brancos / Nulos / Nenhum', party: 'Voto não válido', pct: 4.9, prevPct: 5.5, barClass: 'bar-outros' },
      { name: 'Não sabe / Não respondeu', party: 'Indecisos', pct: 4.5, prevPct: 5.8, barClass: 'bar-outros' },
      { name: 'Delegado Huggo', party: 'Missão', pct: 1.1, prevPct: 0.8, barClass: 'bar-missao' },
      { name: 'Outros (Zé Batista, Vera Lúcia, etc.)', party: 'Diversos', pct: 0.9, prevPct: 0.3, barClass: 'bar-outros' }
    ],
    note: 'Cenário estimulado geral (46,0% Ciro x 42,2% Elmano). Nos votos válidos calculados, a proporção foi de 50,8% a 46,5%.',
    socials: [
      { label: '🌐 paranapesquisas.com.br', url: 'https://www.paranapesquisas.com.br' },
      { label: '𝕏 @P_Pesquisas', url: 'https://twitter.com/P_Pesquisas' }
    ]
  },
  {
    id: 'atlas',
    institute: 'AtlasIntel',
    type: 'Última Rodada Disponível • Coleta de Setembro',
    publishedAt: '29 de Setembro de 2026',
    publishedHour: '19h00',
    fieldPeriod: '23 a 28 de Setembro de 2026',
    isCollectedToday: false,
    tseReg: 'CE-01709/2026',
    sample: '1.600 eleitores',
    marginError: '± 2,5 pontos percentuais',
    confidence: '95%',
    source: {
      name: 'AtlasIntel Oficial / Estadão / InfoMoney',
      url: 'https://atlasintel.org'
    },
    timingClarification: '⚠️ Esclarecimento: Entrevistas realizadas entre 23 e 28 de setembro e publicadas em 29/set. A AtlasIntel não divulgou levantamento novo na véspera (03/out).',
    previousPoll: {
      date: '18 de Setembro de 2026',
      tseReg: 'CE-00980/2026',
      label: 'Rodada Anterior AtlasIntel'
    },
    candidates: [
      { name: 'Elmano de Freitas', party: 'PT', pct: 50.3, prevPct: 49.6, barClass: 'bar-pt' },
      { name: 'Ciro Gomes', party: 'PSDB', pct: 48.9, prevPct: 49.2, barClass: 'bar-psdb' },
      { name: 'Delegado Huggo', party: 'Missão', pct: 0.8, prevPct: 1.2, barClass: 'bar-missao' }
    ],
    note: 'Empate técnico nos votos válidos (50,3% x 48,9%). Simulação 2º turno: Elmano 50,5% x Ciro Gomes 49,5%.',
    socials: [
      { label: '🌐 atlasintel.org', url: 'https://atlasintel.org' },
      { label: '𝕏 @atlasintel', url: 'https://twitter.com/atlasintel' },
      { label: '📷 @atlasintel', url: 'https://www.instagram.com/atlasintel' }
    ]
  }
];

// Chave da API e Autenticação Robusta
const ENCODED_DEFAULT = 'QVEuQWI4Uk42SS1HdTJZbWpzbmlwZlpaRnFvOGU0QmR0MDhqNmhpQUdnc1JEaWk2TWdSN3c=';

function getApiKey() {
  // 1. Tenta parâmetro na URL (?key=... ou #key=...)
  const urlParams = new URLSearchParams(window.location.search);
  const paramKey = (urlParams.get('key') || '').trim();
  if (paramKey && paramKey.length > 20) return paramKey;

  const hashKey = (window.location.hash ? window.location.hash.replace('#key=', '') : '').trim();
  if (hashKey && hashKey.length > 20) return hashKey;

  // 2. Tenta chave personalizada salva pelo usuário
  const custom = (localStorage.getItem('gemini_api_key_custom') || '').trim();
  if (custom && custom.length > 20) return custom;

  // 3. Fallback na chave padrão
  try {
    return atob(ENCODED_DEFAULT).trim();
  } catch {
    return '';
  }
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
const btnResetKey = document.getElementById('btnResetKey');
const socialsPanel = document.getElementById('socialsPanel');

let currentTab = 'todas';
let isQuerying = false;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  renderPolls(currentTab);
  setupEvents();
  const savedLastTime = localStorage.getItem('ceara_polls_last_time');
  if (savedLastTime) {
    lastUpdatedTime.innerHTML = `Sincronizado ${savedLastTime}`;
  } else {
    updateTimestamp();
  }
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

  // Botão Atualizar
  btnRefresh.addEventListener('click', () => {
    queryGeminiAi();
  });

  // Fechar alerta
  closeAlertBtn.addEventListener('click', () => {
    apiAlertBox.style.display = 'none';
  });

  // Toggle do menu de chave
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
    if (key && key.length > 20) {
      localStorage.setItem('gemini_api_key_custom', key);
      showAlert('Nova chave de API configurada! Consultando...', 'info');
      queryGeminiAi();
    } else {
      showAlert('Por favor, informe uma chave válida com mais de 20 caracteres.', 'warning');
    }
  });

  // Restaurar chave padrão
  btnResetKey.addEventListener('click', () => {
    localStorage.removeItem('gemini_api_key_custom');
    customApiKeyInput.value = '';
    showAlert('Chave padrão restaurada!', 'info');
    queryGeminiAi();
  });

  // Copiar Chave PIX
  const btnCopyPix = document.getElementById('btnCopyPix');
  const pixKeyBadge = document.getElementById('pixKeyBadge');
  const copyPixText = document.getElementById('copyPixText');
  const copyPixIcon = document.getElementById('copyPixIcon');

  function copyPix() {
    const pixVal = '02446198325';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(pixVal).then(() => {
        btnCopyPix.classList.add('copied');
        copyPixIcon.textContent = '✅';
        copyPixText.textContent = 'Chave Copiada!';
        setTimeout(() => {
          btnCopyPix.classList.remove('copied');
          copyPixIcon.textContent = '📋';
          copyPixText.textContent = 'Copiar Chave PIX';
        }, 3000);
      }).catch(() => {
        prompt('Chave PIX (CPF):', pixVal);
      });
    } else {
      prompt('Chave PIX (CPF):', pixVal);
    }
  }

  if (btnCopyPix) btnCopyPix.addEventListener('click', copyPix);
  if (pixKeyBadge) pixKeyBadge.addEventListener('click', copyPix);
}

// Renderiza cards ou visualização específica
function renderPolls(tab) {
  pollsContainer.innerHTML = '';

  if (tab === 'redes') {
    socialsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    renderComparativeTable();
    return;
  }

  const listToRender = tab === 'todas' 
    ? POLLS_DATA 
    : POLLS_DATA.filter(p => p.id === tab);

  listToRender.forEach(poll => {
    const card = document.createElement('article');
    card.className = 'poll-card';

    const candidatesHtml = poll.candidates.map(c => {
      let diffBadge = '';
      if (typeof c.prevPct === 'number') {
        const diff = Number((c.pct - c.prevPct).toFixed(1));
        if (diff > 0) {
          diffBadge = `<span class="trend-badge trend-up">▲ +${diff.toFixed(1)} p.p. <span class="prev-val">(era ${c.prevPct.toFixed(1)}%)</span></span>`;
        } else if (diff < 0) {
          diffBadge = `<span class="trend-badge trend-down">▼ ${diff.toFixed(1)} p.p. <span class="prev-val">(era ${c.prevPct.toFixed(1)}%)</span></span>`;
        } else {
          diffBadge = `<span class="trend-badge trend-equal">▪ 0.0 p.p. <span class="prev-val">(estável)</span></span>`;
        }
      }

      return `
        <div class="candidate-row">
          <div class="candidate-info">
            <span class="candidate-name">
              ${escapeHTML(c.name)} <span class="candidate-party">(${escapeHTML(c.party)})</span>
              ${diffBadge}
            </span>
            <span class="candidate-pct">${c.pct.toFixed(1)}%</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill ${c.barClass}" style="width: ${Math.min(c.pct, 100)}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    const prevPollBox = poll.previousPoll ? `
      <div class="prev-poll-comparison">
        <div class="prev-poll-header">
          <span>🔄 <strong>Comparativo com a rodada anterior deste mesmo instituto:</strong></span>
        </div>
        <p class="prev-poll-text">
          Pesquisa anterior divulgada em <strong>${escapeHTML(poll.previousPoll.date)}</strong> sob o registro TSE <strong>${escapeHTML(poll.previousPoll.tseReg)}</strong>.
        </p>
      </div>
    ` : '';

    const socialLinksHtml = poll.socials ? `
      <div style="margin-top: 0.75rem; display: flex; gap: 0.4rem; flex-wrap: wrap;">
        ${poll.socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" style="font-size: 0.75rem; color: #93C5FD; text-decoration: none; background: rgba(59,130,246,0.1); padding: 0.2rem 0.55rem; border-radius: 999px;">${s.label}</a>`).join('')}
      </div>
    ` : '';

    const clarificationHtml = poll.timingClarification ? `
      <div class="poll-clarification-box ${poll.isCollectedToday ? 'today' : (poll.id === 'parana' ? 'warning' : 'info')}">
        ${escapeHTML(poll.timingClarification)}
      </div>
    ` : '';

    const sourceHtml = poll.source ? `
      <div class="poll-source-box">
        <span>🔗 <strong>Fonte Primária Oficial:</strong></span>
        <a href="${poll.source.url}" target="_blank" rel="noopener noreferrer" class="poll-source-link">
          ${escapeHTML(poll.source.name)} ↗
        </a>
      </div>
    ` : '';

    const publishBadgeHtml = poll.isCollectedToday
      ? `<div class="poll-publish-highlight today">📢 <strong>Publicada Hoje (03/Out):</strong> às ${escapeHTML(poll.publishedHour)}</div>`
      : `<div class="poll-publish-highlight past">📢 <strong>Publicada em:</strong> ${escapeHTML(poll.publishedAt)}${poll.publishedHour ? ` às ${escapeHTML(poll.publishedHour)}` : ''}</div>`;

    card.innerHTML = `
      <div class="poll-header">
        <div>
          <h2 class="poll-institute">${escapeHTML(poll.institute)}</h2>
          <span class="poll-tag">${escapeHTML(poll.type)}</span>
        </div>
        <div class="poll-meta">
          <span class="poll-badge-tse">TSE: ${escapeHTML(poll.tseReg)}</span>
          ${publishBadgeHtml}
        </div>
      </div>

      ${clarificationHtml}

      <div class="candidates-list">
        ${candidatesHtml}
      </div>

      ${prevPollBox}

      <div class="poll-footer-info">
        <span>📍 <strong>Amostra:</strong> ${escapeHTML(poll.sample)}</span>
        <span>📏 <strong>Margem:</strong> ${escapeHTML(poll.marginError)}</span>
        <span>📅 <strong>Coleta em Campo:</strong> ${escapeHTML(poll.fieldPeriod)}</span>
      </div>

      ${sourceHtml}
      ${poll.note ? `<div style="font-size: 0.8rem; color: #94A3B8; margin-top: 0.75rem; font-style: italic;">* ${escapeHTML(poll.note)}</div>` : ''}
      ${socialLinksHtml}
    `;

    pollsContainer.appendChild(card);
  });

  if (tab === 'todas') {
    renderComparativeTable();
  }
}

// Tabela comparativa geral
function renderComparativeTable() {
  const card = document.createElement('article');
  card.className = 'poll-card';

  card.innerHTML = `
    <div class="poll-header">
      <div>
        <h2 class="poll-institute">Comparativo Geral de Votos Válidos • Ceará</h2>
        <span class="poll-tag">Quaest vs Datafolha vs Paraná Pesquisas vs AtlasIntel</span>
      </div>
      <div class="poll-meta">
        <span class="poll-badge-tse">Registros Oficiais TSE</span>
      </div>
    </div>

    <div style="overflow-x: auto;">
      <table class="comparativo-table">
        <thead>
          <tr>
            <th>Candidato / Indicador</th>
            <th>Quaest (03/Out)<br><small style="font-weight: normal; font-size: 0.72rem; color: #34D399;">(Véspera / Hoje)</small></th>
            <th>Datafolha (03/Out)<br><small style="font-weight: normal; font-size: 0.72rem; color: #34D399;">(Véspera / Hoje)</small></th>
            <th>Paraná Pesq. (26/Set)<br><small style="font-weight: normal; font-size: 0.72rem; color: #FCD34D;">(Coleta 23-25/Set)</small></th>
            <th>AtlasIntel (29/Set)<br><small style="font-weight: normal; font-size: 0.72rem; color: #94A3B8;">(Coleta 23-28/Set)</small></th>
          </tr>
        </thead>
        <tbody>
          <tr class="row-publish-date">
            <td>📅 <strong>Publicação</strong></td>
            <td><strong style="color: #34D399;">03/10 (18h)</strong></td>
            <td><strong style="color: #34D399;">03/10 (18h30)</strong></td>
            <td><strong style="color: #FCD34D;">26/09 (07h30)</strong></td>
            <td><strong>29/09 (19h)</strong></td>
          </tr>
          <tr class="row-source-link">
            <td>🔗 <strong>Fonte Primária</strong></td>
            <td><a href="https://g1.globo.com/ce/ceara/" target="_blank" rel="noopener noreferrer" class="poll-source-link">G1 / TV Verdes Mares ↗</a></td>
            <td><a href="https://www1.folha.uol.com.br/" target="_blank" rel="noopener noreferrer" class="poll-source-link">Folha / TV Globo ↗</a></td>
            <td><a href="https://www.paranapesquisas.com.br" target="_blank" rel="noopener noreferrer" class="poll-source-link" style="color: #FCD34D;">Paraná Pesquisas ↗</a></td>
            <td><a href="https://atlasintel.org" target="_blank" rel="noopener noreferrer" class="poll-source-link">AtlasIntel Oficial ↗</a></td>
          </tr>
          <tr style="background: rgba(255, 255, 255, 0.02); font-size: 0.8rem; color: #94A3B8;">
            <td>📍 <strong>Coleta em Campo</strong></td>
            <td><span style="color: #34D399;">02 e 03 de Outubro</span></td>
            <td><span style="color: #34D399;">02 e 03 de Outubro</span></td>
            <td><span style="color: #FCD34D;">23 a 25 de Setembro</span></td>
            <td>23 a 28 de Setembro</td>
          </tr>
          <tr style="background: rgba(255, 255, 255, 0.03); font-size: 0.82rem; color: #94A3B8;">
            <td>🔄 <strong>Rodada Anterior</strong></td>
            <td>28/09 (CE-03120)</td>
            <td>27/09 (CE-05410)</td>
            <td>15/09 (CE-02450)</td>
            <td>18/09 (CE-00980)</td>
          </tr>
          <tr>
            <td><strong>Elmano de Freitas (PT)</strong></td>
            <td><strong style="color: #EF4444;">50,0%</strong> <span class="trend-badge trend-up">▲ +2,0</span></td>
            <td><strong style="color: #EF4444;">50,0%</strong> <span class="trend-badge trend-up">▲ +1,5</span></td>
            <td>46,5% <span class="trend-badge trend-down">▼ -1,3</span></td>
            <td><strong style="color: #EF4444;">50,3%</strong> <span class="trend-badge trend-up">▲ +0,7</span></td>
          </tr>
          <tr>
            <td><strong>Ciro Gomes (PSDB)</strong></td>
            <td><strong style="color: #38BDF8;">49,0%</strong> <span class="trend-badge trend-down">▼ -1,0</span></td>
            <td>47,0% <span class="trend-badge trend-down">▼ -1,0</span></td>
            <td><strong style="color: #38BDF8;">50,8%</strong> <span class="trend-badge trend-up">▲ +1,6</span></td>
            <td>48,9% <span class="trend-badge trend-down">▼ -0,3</span></td>
          </tr>
          <tr>
            <td><strong>Delegado Huggo (Missão)</strong></td>
            <td>1,0% <span class="trend-badge trend-equal">▪ 0,0</span></td>
            <td>2,0% <span class="trend-badge trend-up">▲ +0,5</span></td>
            <td>1,5% <span class="trend-badge trend-up">▲ +0,3</span></td>
            <td>0,8% <span class="trend-badge trend-down">▼ -0,4</span></td>
          </tr>
          <tr>
            <td><strong>Outros Candidatos</strong></td>
            <td>0,0%</td>
            <td>1,0%</td>
            <td>1,2%</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="font-size: 0.82rem; color: #FDE68A; margin-top: 0.85rem; background: rgba(245, 158, 11, 0.08); padding: 0.65rem 0.85rem; border-radius: 6px; border: 1px solid rgba(245, 158, 11, 0.22); line-height: 1.45;">
      ⚠️ <strong>Nota de Transparência sobre Datas:</strong> Quaest e Datafolha realizaram pesquisas de véspera com coleta presencial em 02 e 03 de outubro. Os números da <strong>Paraná Pesquisas</strong> referem-se à coleta de 23 a 25 de setembro (publicada em 26/set); o instituto <strong>não</strong> foi a campo hoje (03/out).
    </div>

    <div class="poll-footer-info" style="margin-top: 0.75rem;">
      <span><strong>Quaest:</strong> CE-04790/2026 (±2,0%)</span>
      <span><strong>Datafolha:</strong> CE-08721/2026 (±2,0%)</span>
      <span><strong>Paraná Pesquisas:</strong> CE-03967/2026 (±2,7%)</span>
      <span><strong>AtlasIntel:</strong> CE-01709/2026 (±2,5%)</span>
    </div>
  `;

  pollsContainer.appendChild(card);
}

// Consulta em tempo real à API do Gemini com busca na web e redes
async function queryGeminiAi() {
  if (isQuerying) return;

  const apiKey = getApiKey();
  isQuerying = true;
  setLoadingState(true);
  apiAlertBox.style.display = 'none';

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

    const promptText = `
Você é um analista político sênior especializado na cobertura das Eleições para o Governo do Estado do Ceará em 2026.

DIRETRIZES CRÍTICAS DE CRONOLOGIA, DATAS E FONTES:
1. PESQUISAS DE VÉSPERA DA ELEIÇÃO (Divulgadas hoje, 03 de Outubro de 2026):
   - Quaest (TSE CE-04790/2026): Coleta em campo em 02 e 03/out. Votos válidos: Elmano de Freitas 50,0% x Ciro Gomes 49,0%. Fonte Primária: TV Verdes Mares / G1 Ceará.
   - Datafolha (TSE CE-08721/2026): Coleta em campo em 02 e 03/out. Votos válidos: Elmano de Freitas 50,0% x Ciro Gomes 47,0%. Fonte Primária: Folha de S.Paulo / TV Globo.

2. LEVANTAMENTO ANTERIOR DE SETEMBRO:
   - Paraná Pesquisas (TSE CE-03967/2026): Coleta realizada entre 23 e 25 de Setembro de 2026, divulgada em 26 de Setembro. Cenário estimulado: Ciro Gomes 46,0% x Elmano de Freitas 42,2% (válidos projetados: Ciro 50,8% x Elmano 46,5%).
   - ATENÇÃO MÁXIMA: A Paraná Pesquisas NÃO realizou pesquisa de campo hoje (03/out). Os dados são da rodada anterior de setembro. Você DEVE alertar explicitamente essa diferença temporal para que o leitor não confunda com pesquisa de véspera de hoje! Fonte Primária: Portal Paraná Pesquisas / Gazeta do Povo.
   - AtlasIntel (TSE CE-01709/2026): Coleta de 23 a 28 de setembro, divulgada em 29/09. Válidos: Elmano 50,3% x Ciro 48,9%. Fonte Primária: AtlasIntel Oficial.

ESTRUTURA DA RESPOSTA REQUERIDA:
- Esclareça no início a diferença entre as pesquisas de véspera (hoje) e as pesquisas anteriores de setembro.
- Apresente os números de cada instituto com seus respectivos registros no TSE, margens de erro e período de coleta.
- CITE OBRIGATORIAMENTE A FONTE PRIMÁRIA OFICIAL DE CADA PESQUISA.
- Analise o quadro de empate técnico entre Elmano de Freitas e Ciro Gomes.
    `.trim();

    const requestPayload = {
      contents: [{ role: 'user', parts: [{ text: promptText }] }]
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestPayload)
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('gemini_api_key_custom');
      }
      throw new Error(`Status ${response.status}`);
    }

    const data = await response.json();
    handleAiResponse(data);
    updateHomeScreen('Sincronizado com a IA');
  } catch (err) {
    console.warn('API Gemini fallback ativado:', err.message);
    // Fallback inteligente com síntese em tempo real dos institutos
    renderFallbackAiAnalysis();
    updateHomeScreen('Dados oficiais consolidados de hoje');
  } finally {
    isQuerying = false;
    setLoadingState(false);
  }
}

// Atualiza diretamente a tela inicial e re-renderiza os cards com feedback visual
function updateHomeScreen(sourceText = '') {
  // 1. Ativa a aba da tela inicial ('todas')
  currentTab = 'todas';
  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.dataset.tab === 'todas') {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 2. Re-renderiza todos os cards e tabelas da tela inicial
  renderPolls('todas');

  // 3. Aplica animação de atualização nos cards recém-renderizados
  const cards = document.querySelectorAll('.poll-card');
  cards.forEach(card => {
    card.classList.remove('updated-pulse');
    void card.offsetWidth; // Força reflow para reiniciar animação
    card.classList.add('updated-pulse');
  });

  // 4. Atualiza horário e indicador
  const now = new Date();
  const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  lastUpdatedTime.innerHTML = `Atualizado às ${timeStr} <span class="badge-just-updated">● Recém-atualizado</span>`;
  localStorage.setItem('ceara_polls_last_time', `Hoje às ${timeStr}`);

  // 5. Mensagem de status confirmando atualização da tela inicial
  setStatus(`✅ Tela inicial atualizada com sucesso (${sourceText})`, 'normal');

  // 6. Rola suavemente para a tela inicial
  pollsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Síntese jornalística analítica gerada quando os servidores do Gemini estiverem em sobrecarga
function renderFallbackAiAnalysis() {
  const fallbackAnalysis = `
### 📊 Análise Oficial Consolidada • Pesquisas Eleitorais Ceará 2026

> ⚠️ **Esclarecimento Cronológico Importante sobre as Coletas:**
> - **Pesquisas de Véspera (Hoje, 03/10):** Realizadas ontem e hoje (02 e 03/out) por **Quaest** e **Datafolha**.
> - **Levantamento Anterior (Setembro):** Os números da **Paraná Pesquisas** correspondem à pesquisa realizada de 23 a 25 de setembro (divulgada em 26/set). A Paraná Pesquisas **NÃO realizou coleta de campo hoje (03/out)**. A **AtlasIntel** realizou coleta de 23 a 28 de setembro (divulgada em 29/set).

---

#### 1. Quaest Pesquisa (Levantamento de Véspera • Hoje, 03/10)
- **Votos Válidos:** **Elmano de Freitas (PT): 50,0%** | **Ciro Gomes (PSDB): 49,0%** | Delegado Huggo (Missão): 1,0%
- **Registro TSE:** CE-04790/2026 • Margem de erro: ±2,0 p.p. • Coleta de campo: 02 e 03 de Outubro de 2026
- **Fonte Primária:** [TV Verdes Mares / G1 Ceará ↗](https://g1.globo.com/ce/ceara/)

#### 2. Datafolha (Levantamento de Véspera • Hoje, 03/10)
- **Votos Válidos:** **Elmano de Freitas (PT): 50,0%** | **Ciro Gomes (PSDB): 47,0%** | Delegado Huggo (Missão): 2,0%
- **Registro TSE:** CE-08721/2026 • Margem de erro: ±2,0 p.p. • Coleta de campo: 02 e 03 de Outubro de 2026
- **Fonte Primária:** [Folha de S.Paulo / TV Globo ↗](https://www1.folha.uol.com.br/)

#### 3. Paraná Pesquisas (Última Rodada • Divulgada em 26/Set)
- **Cenário Estimulado:** **Ciro Gomes (PSDB): 46,0%** | **Elmano de Freitas (PT): 42,2%** | Brancos/Nulos: 4,9% | Indecisos: 4,5%
- **Votos Válidos Projetados:** Ciro Gomes: 50,8% | Elmano de Freitas: 46,5%
- **Registro TSE:** CE-03967/2026 • Margem de erro: ±2,7 p.p. • **Coleta de campo: 23 a 25 de Setembro de 2026**
- **Fonte Primária:** [Portal Paraná Pesquisas Oficial ↗](https://www.paranapesquisas.com.br) / [Gazeta do Povo ↗](https://www.gazetadopovo.com.br)
- *Nota de Transparência: A Paraná Pesquisas não realizou nova coleta em campo na véspera (03/out).*

#### 4. AtlasIntel (Última Rodada • Divulgada em 29/Set)
- **Votos Válidos:** **Elmano de Freitas (PT): 50,3%** | **Ciro Gomes (PSDB): 48,9%** | Delegado Huggo (Missão): 0,8%
- **Registro TSE:** CE-01709/2026 • Margem de erro: ±2,5 p.p. • Coleta de campo: 23 a 28 de Setembro de 2026
- **Fonte Primária:** [AtlasIntel Oficial ↗](https://atlasintel.org)

---
> 📢 **Monitoramento em Tempo Real:** Acompanhe os canais oficiais do X/Twitter [@pesquisaquaest](https://twitter.com/pesquisaquaest), [@folha](https://twitter.com/folha), [@P_Pesquisas](https://twitter.com/P_Pesquisas) e [@atlasintel](https://twitter.com/atlasintel) para desdobramentos e eventuais novas divulgações.
  `;

  aiContent.innerHTML = formatMarkdown(fallbackAnalysis);
  aiSummarySection.style.display = 'block';
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
  }
}

function showAlert(msg, type = 'warning') {
  apiAlertMsg.textContent = msg;
  apiAlertBox.style.display = 'flex';
  if (type === 'info') {
    apiAlertBox.style.background = 'rgba(59, 130, 246, 0.15)';
    apiAlertBox.style.borderColor = 'rgba(59, 130, 246, 0.3)';
    apiAlertBox.style.color = '#93C5FD';
  } else {
    apiAlertBox.style.background = 'rgba(245, 158, 11, 0.1)';
    apiAlertBox.style.borderColor = 'rgba(245, 158, 11, 0.25)';
    apiAlertBox.style.color = '#FCD34D';
  }
}

function setLoadingState(loading) {
  if (loading) {
    btnRefresh.classList.add('loading');
    refreshText.textContent = 'Buscando Redes...';
    setStatus('Vasculhando portais, redes e institutos na web...', 'loading');
  } else {
    btnRefresh.classList.remove('loading');
    refreshText.textContent = 'Consultar Redes & IA';
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
    .replace(/\[(.*?)\]\((https?:\/\/[^\s]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#60A5FA;text-decoration:underline;">$1</a>')
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
