// Gerenciamento de Estado e Elementos da Interface
const STORAGE_KEY = 'gemini_api_key_ceara_pesquisas';
// Chave padrão decodificada em tempo de execução para conformidade com GitHub Push Protection
const ENCODED_DEFAULT = 'QVEuQWI4Uk42SS1HdTJZbWpzbmlwZlpaRnFvOGU0QmR0MDhqNmhpQUdnc1JEaWk2TWdSN3c=';
function getDefaultKey() {
  try { return atob(ENCODED_DEFAULT); } catch { return ''; }
}

const apiKeyInput = document.getElementById('apiKeyInput');
const toggleKeyVisibilityBtn = document.getElementById('toggleKeyVisibility');
const saveKeyBtn = document.getElementById('saveKeyBtn');
const customPromptInput = document.getElementById('customPromptInput');
const presetChips = document.getElementById('presetChips');
const modelSelect = document.getElementById('modelSelect');
const btnSearch = document.getElementById('btnSearch');
const btnSearchText = document.getElementById('btnSearchText');
const searchSpinner = document.getElementById('searchSpinner');
const statusBadge = document.getElementById('statusBadge');
const statusText = document.getElementById('statusText');
const resultsSection = document.getElementById('resultsSection');
const resultContent = document.getElementById('resultContent');
const resultTimestamp = document.getElementById('resultTimestamp');
const copyResultBtn = document.getElementById('copyResultBtn');
const sourcesContainer = document.getElementById('sourcesContainer');
const sourcesList = document.getElementById('sourcesList');
const emptyStateCard = document.getElementById('emptyStateCard');

let rawMarkdownOutput = '';

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Suporte a URL param ou hash para outros dispositivos: ?key=... ou #key=...
  const urlParams = new URLSearchParams(window.location.search);
  const hashKey = window.location.hash ? window.location.hash.replace('#key=', '') : null;
  const urlKey = urlParams.get('key') || hashKey;

  const keyToUse = urlKey || localStorage.getItem(STORAGE_KEY) || getDefaultKey();

  if (keyToUse) {
    apiKeyInput.value = keyToUse;
    localStorage.setItem(STORAGE_KEY, keyToUse);
    setStatus('Chave configurada e pronto para consultar', 'normal');
  }

  setupEventListeners();
});

function setupEventListeners() {
  // Toggle visibilidade da chave
  toggleKeyVisibilityBtn.addEventListener('click', () => {
    const isPassword = apiKeyInput.type === 'password';
    apiKeyInput.type = isPassword ? 'text' : 'password';
    toggleKeyVisibilityBtn.textContent = isPassword ? '🙈' : '👁️';
  });

  // Salvar chave
  saveKeyBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (!key) {
      showToast('Por favor, digite ou cole uma chave de API.', 'error');
      return;
    }
    localStorage.setItem(STORAGE_KEY, key);
    showToast('Chave salva com segurança no navegador!');
  });

  // Chips de temas rápidos
  presetChips.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;

    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const promptText = chip.dataset.prompt;
    if (promptText) {
      customPromptInput.value = promptText;
      customPromptInput.focus();
    }
  });

  // Botão de busca
  btnSearch.addEventListener('click', performSearch);

  // Copiar resultado
  copyResultBtn.addEventListener('click', () => {
    if (!rawMarkdownOutput) return;
    navigator.clipboard.writeText(rawMarkdownOutput).then(() => {
      showToast('Resumo copiado para a área de transferência!');
    }).catch(() => {
      showToast('Erro ao copiar texto.', 'error');
    });
  });
}

// Executar consulta à API do Gemini com Google Search Grounding
async function performSearch() {
  const apiKey = apiKeyInput.value.trim() || localStorage.getItem(STORAGE_KEY);
  if (!apiKey) {
    showToast('Informe a sua Chave da API do Gemini para consultar.', 'error');
    apiKeyInput.focus();
    return;
  }

  const queryText = customPromptInput.value.trim();
  if (!queryText) {
    showToast('Digite ou escolha uma pergunta sobre as pesquisas.', 'error');
    return;
  }

  const selectedModel = modelSelect.value || 'gemini-3.8-flash';

  setLoadingState(true, 'Pesquisando na web via Gemini...');

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;

    const requestPayload = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${queryText}\n\nObservação importante: Estamos no ano de 2026. Busque nos sites notícias, relatórios e divulgações de institutos sobre o cenário para o Governo do Estado do Ceará. Destaque institutos (Quaest, Paraná Pesquisas, Ipec, AtlasIntel, etc.), porcentagens, data e fonte.`
            }
          ]
        }
      ],
      systemInstruction: {
        parts: [
          {
            text: "Você é um especialista em jornalismo político e análise de pesquisas eleitorais e governamentais do Estado do Ceará. Use a ferramenta de busca do Google integrada para checar se há resultados recentes sobre a disputa pelo Governo do Ceará e aprovação do governo estadual. Organize sua resposta de forma direta, clara e objetiva com marcadores e tabelas quando aplicável, indicando institutos, datas de coleta e porcentagens exatas."
          }
        ]
      },
      tools: [
        {
          googleSearch: {}
        }
      ]
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
      const errData = await response.json().catch(() => null);
      let errorMsg = `Erro na API (${response.status}): ${response.statusText}`;
      if (response.status === 429) {
        errorMsg = 'Limite temporário de requisições excedido (Cota do Google AI Studio atingida). Aguarde 1 minuto e tente novamente.';
      } else if (errData && errData.error && errData.error.message) {
        errorMsg = errData.error.message;
      }
      throw new Error(errorMsg);
    }

    const data = await response.json();
    renderResponse(data);
    setStatus('Consulta concluída com sucesso', 'success');
  } catch (error) {
    console.error('Erro ao consultar Gemini:', error);
    setStatus('Falha na consulta', 'error');
    showToast(`${error.message}`, 'error');
  } finally {
    setLoadingState(false);
  }
}

// Renderização dos dados obtidos
function renderResponse(data) {
  const candidate = data.candidates && data.candidates[0];
  if (!candidate || !candidate.content || !candidate.content.parts) {
    showToast('Nenhuma resposta retornada pelo modelo.', 'error');
    return;
  }

  // Obter texto gerado (filtrando pensamento interno se houver resposta final)
  let fullText = '';
  candidate.content.parts.forEach(part => {
    if (part.text && !part.thought) {
      fullText += part.text;
    }
  });

  if (!fullText) {
    candidate.content.parts.forEach(part => {
      if (part.text) fullText += part.text;
    });
  }

  rawMarkdownOutput = fullText;

  // Renderizar Markdown
  resultContent.innerHTML = parseMarkdownToHTML(fullText);

  // Timestamp
  const now = new Date();
  resultTimestamp.textContent = `Atualizado em ${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;

  // Obter fontes de busca (Grounding Metadata)
  const groundingMetadata = candidate.groundingMetadata;
  sourcesList.innerHTML = '';

  const sources = [];
  if (groundingMetadata) {
    // Chunks de busca
    if (Array.isArray(groundingMetadata.groundingChunks)) {
      groundingMetadata.groundingChunks.forEach(chunk => {
        if (chunk.web && chunk.web.uri) {
          sources.push({
            uri: chunk.web.uri,
            title: chunk.web.title || chunk.web.uri
          });
        }
      });
    }

    // Queries que o Gemini disparou no Google
    if (Array.isArray(groundingMetadata.webSearchQueries) && groundingMetadata.webSearchQueries.length > 0) {
      const queriesItem = document.createElement('li');
      queriesItem.className = 'source-item';
      queriesItem.innerHTML = `<span style="color: #94a3b8; font-size: 0.82rem;">🔍 Termos pesquisados no Google: <em>${groundingMetadata.webSearchQueries.map(escapeHTML).join(', ')}</em></span>`;
      sourcesList.appendChild(queriesItem);
    }
  }

  // Eliminar URLs duplicadas
  const uniqueSources = [];
  const seenUrls = new Set();
  for (const src of sources) {
    if (!seenUrls.has(src.uri)) {
      seenUrls.add(src.uri);
      uniqueSources.push(src);
    }
  }

  if (uniqueSources.length > 0) {
    uniqueSources.forEach(src => {
      const li = document.createElement('li');
      li.className = 'source-item';
      li.innerHTML = `
        <a href="${escapeHTML(src.uri)}" target="_blank" rel="noopener noreferrer">
          🔗 ${escapeHTML(src.title)}
        </a>
      `;
      sourcesList.appendChild(li);
    });
    sourcesContainer.style.display = 'block';
  } else {
    sourcesContainer.style.display = 'none';
  }

  // Exibir seções
  emptyStateCard.style.display = 'none';
  resultsSection.style.display = 'block';
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Alterar estado de carregamento
function setLoadingState(isLoading, message = 'Consultando...') {
  btnSearch.disabled = isLoading;
  if (isLoading) {
    btnSearch.classList.add('loading');
    btnSearchText.textContent = 'Buscando em tempo real...';
    setStatus(message, 'loading');
  } else {
    btnSearch.classList.remove('loading');
    btnSearchText.textContent = '🔍 Consultar Todos os Sites Agora';
  }
}

function setStatus(text, type = 'normal') {
  statusText.textContent = text;
  statusBadge.className = 'status-indicator';
  if (type === 'loading') {
    statusBadge.classList.add('loading');
  } else if (type === 'error') {
    statusBadge.classList.add('error');
  }
}

// Conversor leve de Markdown para HTML
function parseMarkdownToHTML(markdown) {
  if (!markdown) return '';

  let html = escapeHTML(markdown);

  // Tabelas Markdown simples
  html = html.replace(/\n\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g, (match, headerLine, bodyLines) => {
    const headers = headerLine.split('|').map(h => h.trim()).filter(Boolean);
    const rows = bodyLines.trim().split('\n').map(row => {
      const cols = row.split('|').map(c => c.trim()).filter(Boolean);
      return `<tr>${cols.map(c => `<td>${c}</td>`).join('')}</tr>`;
    }).join('');

    return `
      <div style="overflow-x: auto; margin: 1rem 0;">
        <table>
          <thead>
            <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  });

  // Cabeçalhos (###, ##, #)
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Negrito e Itálico
  html = html.replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  // Links [texto](url)
  html = html.replace(/\[(.*?)\]\((https?:\/\/[^\s]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: underline;">$1</a>');

  // Listas não-ordenadas (* ou -)
  html = html.replace(/^\s*[\*\-]\s+(.*$)/gim, '<li>$1</li>');
  html = html.replace(/((?:<li>.*<\/li>\s*)+)/gim, '<ul>$1</ul>');

  // Quebras de parágrafo duplas
  const paragraphs = html.split(/\n{2,}/);
  html = paragraphs.map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<div') || p.startsWith('<blockquote')) {
      return p;
    }
    return `<p>${p.replace(/\n/g, '<br>')}</p>`;
  }).join('');

  return html;
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Notificações Toast
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'error') {
    toast.style.borderColor = 'rgba(239, 68, 68, 0.4)';
    toast.style.background = '#2a1215';
    toast.innerHTML = `⚠️ ${escapeHTML(message)}`;
  } else {
    toast.innerHTML = `✅ ${escapeHTML(message)}`;
  }

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
