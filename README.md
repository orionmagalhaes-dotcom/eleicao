# 📊 Radar de Pesquisas - Governo do Estado do Ceará

Site simples, objetivo, leve e moderno com foco exclusivo em consultar em tempo real a existência e os resultados de pesquisas eleitorais e de avaliação para o Governo do Estado do Ceará, utilizando a **API do Google Gemini** com **Google Search Grounding** (busca ativa na web).

---

## 🚀 Como Executar

Por ser uma aplicação pura (HTML, CSS e JavaScript sem necessidade de build complexo ou dependências externas pesadas):

1. Basta abrir o arquivo [`index.html`](file:///c:/Users/Orion%20Magalh%C3%A3es/Documents/Pesquisa/index.html) diretamente no seu navegador de preferência (Google Chrome, Edge, Firefox, Brave, etc.), ou
2. Se preferir rodar com um servidor local simples:
   ```bash
   npx serve .
   ```
   ou
   ```bash
   python -m http.server 8000
   ```

---

## 🔑 Como Obter a Chave da API do Gemini (Grátis)

1. Acesse o [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Clique em **"Create API key"**.
3. Cole a chave no campo do site e clique em **"Salvar Chave"**.
   > *Sua chave é armazenada de forma segura apenas no `localStorage` do seu próprio navegador e nunca é enviada a servidores intermediários.*

---

## ✨ Recursos

- **Busca Ativa na Web (Google Search Grounding):** O Gemini busca diretamente nos portais de notícias (O Povo, Diário do Nordeste, G1 CE, CNN Brasil, Poder360) e institutos de pesquisa (Quaest, Paraná Pesquisas, Ipec, Datafolha, etc.).
- **Filtros Rápidos:** Botões de um clique para:
  - Últimas Pesquisas (Geral)
  - Cenários Eleitorais 2026
  - Avaliação do Governo Atual
  - Registros no TSE (PesqEle)
- **Links e Fontes Transparentes:** Lista os sites e as matérias de onde os dados foram coletados.
- **Leve e Rápido:** Carregamento instantâneo, sem bibliotecas pesadas e responsivo para celulares e computadores.
