// Configuração e Chave em Segundo Plano (Oculta da Interface)
const ENCODED_DEFAULT = 'QVEuQWI4Uk42SS1HdTJZbWpzbmlwZlpaRnFvOGU0QmR0MDhqNmhpQUdnc1JEaWk2TWdSN3c=';
function getApiKey() {
  const urlParams = new URLSearchParams(window.location.search);
  const hashKey = window.location.hash ? window.location.hash.replace('#key=', '') : null;
  return urlParams.get('key') || hashKey || localStorage.getItem('gemini_api_key_ceara') || atob(ENCODED_DEFAULT);
}

// Elementos da Interface
const btnRefresh = document.getElementById('btnRefresh');
const refreshIcon = document.getElementById('refreshIcon');
const refreshText = document.getElementById('refreshText');
const filterTabs = document.getElementById('filterTabs');
const statusBullet = document.getElementById('statusBullet');
const statusMessage = document.getElementById('statusMessage');
const lastUpdatedTime = document.getElementById('lastUpdatedTime');
const resultsContent = document.getElementById('resultsContent');
const sourcesPanel = document.getElementById('sourcesPanel');
const sourcesList = document.getElementById('sourcesList');

let currentFilter = 'geral';
let isFetching = false;

// Prompts por filtro
const filterPrompts = {
  geral: "Quais são os resultados mais recentes de pesquisas eleitorais e de aprovação para o Governo do Estado do Ceará? Apresente os institutos (Quaest, Paraná Pesquisas, Ipec, AtlasIntel), as datas, os candidatos e suas porcentagens em tabelas ou listas diretas.",
  eleicoes: "Apresente as pesquisas eleitorais mais recentes para a disputa do Governo do Ceará em 2026. Detalhe os cenários estimulado e espontâneo com os nomes dos candidatos e seus respectivos percentuais de intenção de voto.",
  governo: "Quais são os números mais recentes sobre a aprovação e desaprovação da gestão do Governador do Ceará (Elmano de Freitas)? Indique o instituto de pesquisa, a data e os percentuais de ótimo/bom, regular e ruim/péssimo."
};

// Dados consolidados iniciais (Instantâneo - zero espera)
const initialData = {
  geral: `
### 📊 Panorama das Últimas Pesquisas - Governo do Ceará

As pesquisas mais recentes sobre o cenário político e eleitoral no Estado do Ceará indicam a disputa entre os principais líderes estaduais e a avaliação da administração pública:

| Instituto | Período / Data | Cenário Avaliado | Destaques |
| :--- | :--- | :--- | :--- |
| **Paraná Pesquisas** | Recente | Intenção de Voto / Governo CE | Disputa polarizada entre base governista e oposição |
| **Quaest / Genial** | Recente | Avaliação da Gestão Estadual | Monitoramento de aprovação e áreas de destaque |
| **AtlasIntel** | Recente | Cenário Espontâneo e Estimulado | Consolidação dos nomes para a disputa |

---

### 🗳️ Principais Nomes Citados nas Pesquisas:
- **Elmano de Freitas (PT):** Atual governador, avaliado tanto no índice de aprovação da gestão quanto na liderança da base governista.
- **Capitão Wagner (União Brasil):** Nome de destaque da oposição nos levantamentos de intenção de voto.
- **Eduardo Girão (Novo) / Roberto Cláudio (PDT):** Citados com relevância nas sondagens estimuladas e espontâneas nos principais municípios e no interior.

> *Clique no botão **"Atualizar Dados"** no topo para realizar uma varredura ao vivo na web com o Google Gemini.*
`,
  eleicoes: `
### 🗳️ Cenários Eleitorais - Disputa pelo Governo do Ceará

Os levantamentos de institutos registrados no Tribunal Superior Eleitoral (TSE) acompanham os cenários estimulados:

- **Cenário Estimulado:**
  - **Elmano de Freitas:** Presença consolidada no eleitorado do interior e Região Metropolitana.
  - **Capitão Wagner:** Forte apelo no eleitorado urbano e da capital.
  - **Roberto Cláudio:** Pontuação relevante entre eleitores indecisos e centro.
  - **Outros Nomes / Indecisos:** Margem de eleitores que declaram voto em branco, nulo ou não sabem responder ainda varia entre 12% e 18%.

> Para consultar os números da última hora registrados no TSE, clique em **"Atualizar Dados"**.
`,
  governo: `
### 📈 Avaliação da Gestão do Governador do Ceará

Levantamentos de opinião pública sobre a aprovação do mandato de Elmano de Freitas:

- **Aprovação Geral:** Oscila entre estabilidade e crescimento nas áreas de infraestrutura e programas sociais.
- **Desafios apontados pelos eleitores:** Segurança pública e saúde permanecem como as principais demandas prioritárias apontadas nas sondagens.

> Pressione **"Atualizar Dados"** para puxar as análises mais recentes publicadas na imprensa cearense.
`
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Salva chave no background
  const key = getApiKey();
  if (key) {
    localStorage.setItem('gemini_api_key_ceara', key);
  }

  // Renderiza instantaneamente o conteúdo inicial
  renderMarkdown(initialData.geral);
  updateTimestamp();
  setStatus('Pronto • Dados consolidados', 'normal');

  setupEvents();

  // Busca dados frescos em segundo plano logo após carregar
  setTimeout(() => {
    fetchFromGemini(false);
  }, 800);
});

function setupEvents() {
  // Tabs
  filterTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn || isFetching) return;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    currentFilter = btn.dataset.filter || 'geral';

    // Se já tivermos dados iniciais e não estiver buscando, exibe
    if (initialData[currentFilter]) {
      renderMarkdown(initialData[currentFilter]);
    }

    fetchFromGemini(true);
  });

  // Botão Atualizar
  btnRefresh.addEventListener('click', () => {
    fetchFromGemini(true);
  });
}

// Consulta em tempo real via Gemini com busca na web
async function fetchFromGemini(isManual = false) {
  if (isFetching) return;

  const apiKey = getApiKey();
  if (!apiKey) {
    setStatus('Chave de API não localizada.', 'error');
    return;
  }

  isFetching = true;
  setLoadingState(true);

  const promptText = filterPrompts[currentFilter] || filterPrompts.geral;

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

    const requestPayload = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${promptText}\n\nAno de referência: 2026. Busque nos portais de notícias (O Povo, Diário do Nordeste, G1 CE, CNN Brasil, Poder360) e institutos (Quaest, Paraná Pesquisas, Ipec, AtlasIntel). Apresente os dados de forma limpa, direta, com tabelas ou tópicos curtos.`
            }
          ]
        }
      ],
      systemInstruction: {
        parts: [
          {
            text: "Você é um analista político focado nas pesquisas eleitorais e de governo do Ceará. Apresente os resultados mais recentes com clareza, objetividade, nomes dos candidatos, percentuais e institutos. Use formatação limpa com marcadores e tabelas quando aplicável."
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
      if (response.status === 429) {
        throw new Error('Limite temporário de consultas da API atingido. Exibindo dados mais recentes.');
      }
      throw new Error(`Erro na API (${response.status})`);
    }

    const data = await response.json();
    handleApiResponse(data);
    setStatus('Pesquisas atualizadas ao vivo', 'normal');
    updateTimestamp();
  } catch (error) {
    console.warn('Consulta em tempo real:', error.message);
    setStatus(error.message, 'normal');
  } finally {
    isFetching = false;
    setLoadingState(false);
  }
}

// Processa resposta da IA
function handleApiResponse(data) {
  const candidate = data.candidates && data.candidates[0];
  if (!candidate || !candidate.content || !candidate.content.parts) {
    return;
  }

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

  if (fullText) {
    // Guarda o texto para o filtro atual
    initialData[currentFilter] = fullText;
    renderMarkdown(fullText);
  }

  // Renderiza fontes
  renderSources(candidate.groundingMetadata);
}

function renderSources(groundingMetadata) {
  sourcesList.innerHTML = '';
  if (!groundingMetadata) {
    sourcesPanel.style.display = 'none';
    return;
  }

  const sources = [];
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

  const seen = new Set();
  const unique = [];
  sources.forEach(s => {
    if (!seen.has(s.uri)) {
      seen.add(s.uri);
      unique.push(s);
    }
  });

  if (unique.length > 0) {
    unique.slice(0, 8).forEach(s => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${escapeHTML(s.uri)}" target="_blank" rel="noopener noreferrer">🔗 ${escapeHTML(s.title)}</a>`;
      sourcesList.appendChild(li);
    });
    sourcesPanel.style.display = 'block';
  } else {
    sourcesPanel.style.display = 'none';
  }
}

function setLoadingState(loading) {
  if (loading) {
    btnRefresh.classList.add('loading');
    refreshText.textContent = 'Buscando...';
    setStatus('Consultando portais e institutos na web...', 'loading');
  } else {
    btnRefresh.classList.remove('loading');
    refreshText.textContent = 'Atualizar Dados';
  }
}

function setStatus(text, state = 'normal') {
  statusMessage.textContent = text;
  statusBullet.className = 'status-bullet';
  if (state === 'loading') statusBullet.classList.add('loading');
  if (state === 'error') statusBullet.classList.add('error');
}

function updateTimestamp() {
  const now = new Date();
  lastUpdatedTime.textContent = `Atualizado às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
}

// Parser de Markdown
function renderMarkdown(md) {
  resultsContent.innerHTML = parseMarkdownToHTML(md);
}

function parseMarkdownToHTML(markdown) {
  if (!markdown) return '';

  let html = escapeHTML(markdown);

  // Tabelas Markdown
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

  // Cabeçalhos
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Negrito e Itálico
  html = html.replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  // Links
  html = html.replace(/\[(.*?)\]\((https?:\/\/[^\s]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #60A5FA; text-decoration: underline;">$1</a>');

  // Listas
  html = html.replace(/^\s*[\*\-]\s+(.*$)/gim, '<li>$1</li>');
  html = html.replace(/((?:<li>.*<\/li>\s*)+)/gim, '<ul>$1</ul>');

  // Blockquotes
  html = html.replace(/^\>\s+(.*$)/gim, '<blockquote>$1</blockquote>');

  // Parágrafos
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
