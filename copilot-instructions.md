# Royalty Families - Prevenção de Recaída: AI Coding Agent Instructions

## 🎯 Project Overview

This is a **Portuguese-language mental health intervention webapp** implementing an evidence-based relapse prevention program based on Acceptance and Commitment Therapy (ACT) and Mindfulness-Based Relapse Prevention (MBRP). It's a single self-contained HTML file (~3700 lines) with embedded CSS and JavaScript, designed for therapeutic use.

**Key Purpose:** Guide users through 8 sequential modules for relapse prevention, tracking progress with gamification (points, badges, modals).

---

## 📑 Navegação Rápida do Arquivo HTML

**Estrutura do arquivo de 3700 linhas:**

| Linhas | Conteúdo |
|--------|----------|
| 1-11 | DOCTYPE, head, meta tags, imports CDN |
| 12-800+ | CSS completo (variables, header, paginas, formulários, responsividade) |
| ~800-3500 | HTML + JavaScript inline |
| ~850-1150 | Sistema de gamificação (pontos, badges, progresso) |
| ~1150-1250 | Persistência localStorage (salvar/carregar/resetar) |
| ~1250-1400 | Navegação entre páginas (mostrarPagina, avancarPagina, voltarPagina) |
| ~1400-1600 | Validação (validarPagina, mostrarErroValidacao) |
| ~1600-1800 | Progresso visual (inicializarProgressoSteps, atualizarProgresso) |
| ~1800-2200 | Coleta de dados (coletarTodosDados - CRÍTICO, ~350 linhas) |
| ~2200-2600 | Geração PDF (gerarPDF - ~350 linhas HTML estruturado) |
| ~2600-3000 | Geração XLSX (gerarXLSX - ~350 linhas de dados) |
| ~3000-3300 | Envio de email (EmailJS setup + axios POST ao backend) |
| ~3300-3500 | Impressão, download, carregamento visual |
| 3500-3693 | Scripts finais, console logs |

**Buscar por seção:**
- `Ctrl+F` → `// ====` para achar comentários de seção
- Seções principais começam com `// ============================================`

---

## 🏗️ Architecture & Data Flow

### Single-Page Application (SPA) Model
- **No backend dependency** - all data stored in browser `localStorage`
- **8-module sequential workflow** with forced progression (can't skip ahead)
- **Auto-calculation fields:** Age from birth date, progress bar from completed stages
- **Client-side validation** before advancing pages

### Module Structure (Pages 1-8)
1. **Consent & Legal** → Checkboxes must ALL be checked to proceed
2. **Personal Data** → Name, email, phone, diagnosis, therapist info (required fields)
3. **Mindfulness** → Weekly practice tracking table (7 days)
4. **Positive Experiences** → 3 "Savoring" moments + 5-row gratitude table with character strengths
5. **Alert Signals** → 10 warning sign checkboxes + emergency action plan
6. **Problem-Solving** → Problem analysis + 5-option comparison table
7. **SMART Goals** → Goal definition (S.M.A.R.T.) + 5-step action plan
8. **Values & Support** → Character strengths, identity, dreams + emergency contacts

### Data Persistence Layer
```javascript
// Key storage objects in localStorage:
localStorage['royaltyPreventionProgress'] → {pontuacao, etapasCompletadas[], paginaAtual}
localStorage['royaltyPreventionData']      → form field values
localStorage['royaltyPreventionPremios']   → completed badge state
```

---

## 🎮 Gamification System

**Scoring:** 10 points per completed module (80 total max)

**Visual Feedback:**
- Progress bar with percentage (header)
- Step indicators (click-able, stages become gold when completed)
- Modal popups (`premio-container`) celebrate stage completion with icons & animations
- Awards grid at final summary shows all earned badges

**Key Function:** `avancarPagina(numero)` 
- Validates page, awards points, marks stage complete, triggers animation, advances after 1.5s
- Call this instead of manually advancing pages

---

## 🔐 Validation & Business Logic

### Required Fields by Page
- **Page 1:** All 4 consent checkboxes must be `checked`
- **Page 2:** Name, Email (with regex), Phone, Diagnosis, Alta Date, Therapist (all required)
- **Other pages:** Optional except as noted

### Helper Functions
```javascript
validarPagina(numero)        // Returns true if page fields valid
validarEmail(email)          // Regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
calcularIdade()              // Auto-sets age field from birth date
coletarTodosDados()          // Returns flat object of ALL form values
```

### Common Patterns
- **Textareas for reflection:** `id="reflexao"`, `id="conclusao"` → Justification fields
- **Tables with dynamic rows:** Usually 5 rows, collect via loop `for(let i=1; i<=5; i++)`
- **Checkboxes in groups:** Collect status via `.checked` property

---

## 📱 UI/UX Conventions

### Color Scheme (CSS Variables)
```css
--primario-forte: #14214D         /* Main dark blue */
--primario-claro: #7D86A6         /* Light blue for text */
--ouro: #B8860B                   /* Gold accents */
--branco: #FFFFFF                 /* White */
--fundo-pagina: #F8F9FB           /* Page background */
--cinza-claro: #E9E9E9            /* Light gray borders */
```

### Responsive Grid Patterns
- **Mobile-first:** Flex layouts use `flex-direction: column` on ≤768px
- **Form rows:** Use `.form-row-flex` with `.flex-1`, `.flex-fixed` classes
- **Tables:** Automatically wrap on mobile; reduce font-size to 0.85rem

### Typography
- **Titles:** `Cinzel` serif (bold, #14214D)
- **Body:** `Montserrat` sans-serif (regular, #333)
- **Required indicator:** Red asterisk `<span class="obrigatorio">*</span>`

---

## 📊 Critical Data Collection Functions

### `coletarTodosDados()`
**Returns object with ALL form fields** - called before PDF/XLSX generation and email send.

**Key fields in return object:**
- `nomeCompleto`, `email`, `telefone` (validation critical here)
- `pontuacao`, `dataFinalizacao`, `versao`
- Nested data from tables: `exp1`, `contrib1`, `forca1`, etc.

**When adding new fields:**
1. Add to HTML with unique `id="fieldName"`
2. Add to `coletarTodosDados()` return object: `fieldName: document.getElementById('fieldName')?.value || 'Não informado'`
3. Update `gerarPDF()` and `gerarXLSX()` to display in reports

### File Export Functions
```javascript
gerarPDF()           // Returns HTML string for html2pdf library
gerarXLSX()          // Returns XLSX workbook object
baixarArquivos()     // Downloads both files locally
enviarEmailComArquivos()  // Sends to backend server
```

---

## 🚨 Email & Submission Flow

### Current Implementation
1. **EmailJS integration** (`emailjs.init("U8IJNVrOBvN8OQxUU")`) - NOT ACTIVE in current version
2. **Backend fallback:** `axios.post('https://royalty-backend-royaltyf.replit.app/api/enviar-relatorio')`
3. **PDF generation:** `html2pdf().set(opt).from(element).output('blob')`
4. **Fallback:** `baixarArquivos()` saves locally if server fails

### Email Validation
- Always validate: `if (!dados.email || !dados.email.includes('@'))`
- Show user-friendly error: `mostrarErroValidacao(mensagem)`

---

## 🛠️ Common Development Tasks

### Adding a New Form Field
1. **HTML:** Add input/textarea with unique `id`
2. **JavaScript:** Add to `coletarTodosDados()` return object
3. **PDF:** Add new `<div class="field">` section in `gerarPDF()`
4. **XLSX:** Add new row in `ws_data` array in `gerarXLSX()`

**Example:**
```html
<!-- HTML -->
<div class="form-group">
    <label for="novosCampo">My Field:</label>
    <input type="text" id="novosCampo" placeholder="Enter value">
</div>

// JavaScript - in coletarTodosDados()
novosCampo: document.getElementById('novosCampo')?.value || 'Não informado',
```

### Modifying Validation Rules
- Edit `validarPagina(numero)` switch statement
- Always show friendly error via `mostrarErroValidacao("message")`
- Block progression until all required fields valid

### Changing Point System
- Points per stage: `const pontosPorEtapa = 10;` (line ~900)
- Total possible: 8 stages × 10 = 80 points
- Change multiplier in `avancarPagina()` where `pontuacao += pontosPorEtapa`

---

## 💻 API Interna: Funções Principais

### Sistema de Navegação
```javascript
mostrarPagina(numero)     // Exibe página específica, atualiza progresso (USAR SEMPRE)
avancarPagina(numeroAtual)  // Valida → incrementa pontos → mostra badge → avança (CHAVE)
voltarPagina(numeroAtual)   // Volta uma página (sem perder dados)
voltarParaEtapa(numero)     // Volta para etapa anterior (sem poder pular à frente)
```

### Gamificação & Progresso
```javascript
inicializarProgressoSteps()    // Cria botões de step numerados 1-8
atualizarProgresso()           // Atualiza barra % e status visual dos steps
restaurarPremios()             // Marca steps como "completados" ao recarregar
```

### Persistência de Dados
```javascript
carregarProgresso()      // Restaura pontuação + página atual ao iniciar
salvarProgresso()        // Guarda estado atual em localStorage (chamado auto)
resetarProgresso()       // Limpa TUDO após confirmação do usuário
```

### Coleta & Transformação
```javascript
coletarTodosDados()      // ⭐ Retorna OBJETO com todos os 80+ campos
coletarTodosDados().email  // Acessa campo específico
```

### Validação
```javascript
validarPagina(numero)          // Returns true/false baseado em regras por página
validarEmail(email)            // Regex check simples: `@` + domínio
mostrarErroValidacao(msg)      // Toast vermelho no topo (desaparece em 5s)
```

### Export & Envio
```javascript
gerarPDF()                      // Retorna HTML formatado para PDF
gerarXLSX()                     // Retorna workbook XLSX pronto
baixarArquivos()                // PDF + XLSX para downloads locais
enviarEmailComArquivos()        // POST ao backend com Base64
mostrarCarregamento(msg)        // Overlay com spinner + mensagem
fecharCarregamento()            // Remove overlay
```

### Utilitários
```javascript
calcularIdade()                 // Calcula automaticamente de dataNascimento
imprimirGuia()                  // Abre janela de impressão do PDF
```

---

## 🔄 LocalStorage Management

### Save Workflow
```javascript
// Auto-saves on page advance and on window.beforeunload
salvarProgresso()   // Saves: pontuacao, etapasCompletadas[], paginaAtual + basic user data
// Called in: avancarPagina(), mostrarResumo(), beforeunload event
```

### Loading Workflow
```javascript
carregarProgresso()  // On page load via DOMContentLoaded
// Restores user to last viewed page with accumulated points
```

### Reset Feature
```javascript
resetarProgresso()   // Clears localStorage completely after confirmation
// Accessible via header "Reiniciar" button
```

---

## 📝 Important Notes for Modifications

### DO:
✅ Use `document.getElementById('id')?.value` with optional chaining  
✅ Wrap new sections in `<div class="section">` for consistent styling  
✅ Update **both** PDF and XLSX export if adding data fields  
✅ Test responsive breakpoints: 768px (mobile), 1024px (tablet)  
✅ Use Portuguese language for user messages (this is a Brazilian Portuguese app)

### DON'T:
❌ Modify `totalPaginas = 8` without restructuring all arrays  
❌ Change CSS variable values without testing dark mode (`@media prefers-color-scheme: dark`)  
❌ Add client-side data encryption (use HTTPS + backend encryption instead)  
❌ Hardcode points/badge values (use constants at top of script block)

---

## 🌐 External Dependencies

**CDN Libraries:**
- `axios` - HTTP requests for backend
- `html2pdf.js` - PDF generation
- `xlsx` - Excel file creation
- `emailjs` - Email service (configured but unused in current version)
- Google Fonts: `Cinzel`, `Montserrat`

**Backend Integration:**
- **Server endpoint:** `https://royalty-backend-royaltyf.replit.app/api/enviar-relatorio`
- **Expects:** POST with `{userName, userEmail, pdfBase64, formData}`
- **Returns:** 200/201 on success
- **Timeout:** 120 segundos (2 minutos) configurado em `axios.post()`
- **Fallback:** Se servidor falhar, força download local via `baixarArquivos()`

---

## 🔧 Troubleshooting & Debugging

### Problema: Email não está sendo validado corretamente

**Sintomas:** Usuário vê erro "❌ ERRO: Por favor, preencha um email válido"

**Solução:**
1. Verificar se campo `email` contém `@`: `dados.email.includes('@')`
2. Abrir DevTools → Console: `console.log(document.getElementById('email').value)`
3. Regex alternativa se necessário: `/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`

### Problema: Progresso desapareceu após recarregar página

**Sintomas:** Usuário volta para página 1, pontos resetam

**Solução:**
1. Verificar localStorage: DevTools → Application → Local Storage
2. Procurar por: `royaltyPreventionProgress`, `royaltyPreventionData`
3. Se vazio: `localStorage.clear()` foi chamado acidentalmente
4. Adicionar console.log em `carregarProgresso()` para debug

### Problema: PDF não está gerando corretamente

**Sintomas:** PDF fica em branco ou com formatação quebrada

**Solução:**
1. Verificar se `html2pdf` está carregado: `console.log(html2pdf)`
2. Testar função isoladamente: `console.log(gerarPDF())` (retorna HTML string)
3. Verificar espaço em disco (PDFs podem ser grandes com imagens)
4. Aumentar timeout: mudar `html2canvas: { scale: 1 }` se houver lag

### Problema: Validação não está bloqueando avanço

**Sintomas:** Usuário consegue pular página sem preencher obrigatórios

**Solução:**
1. Verificar se `validarPagina(numero)` está sendo chamado em `avancarPagina()`
2. Linha crítica: `if (!validarPagina(numeroAtual)) { alert(...); return; }`
3. Verificar console para erros JavaScript que impedem execução
4. Testar cada condição manualmente no console

### Problema: Pontos não estão sendo contabilizados

**Sintomas:** Pontuação fica em 0 ou não avança

**Solução:**
1. Verificar se etapa foi marcada: `etapasCompletadas.has(numero)`
2. Resetar localStorage: `localStorage.removeItem('royaltyPreventionProgress')`
3. Verificar se `salvarProgresso()` está sendo chamado após `avancarPagina()`
4. Debug: `console.log('Pontuação:', pontuacao, 'Etapas:', Array.from(etapasCompletadas))`

### Problema: Backend não está recebendo dados

**Sintomas:** Erro "Erro ao enviar para servidor" na finalização

**Solução:**
1. Verificar se servidor está online: `curl https://royalty-backend-royaltyf.replit.app/api/enviar-relatorio`
2. Verificar tamanho PDF: Base64 pode exceder limite (deve estar < 25MB)
3. Abrir Network tab (DevTools) → ver resposta exata do servidor
4. Verificar CORS: server deve permitir POST do domínio
5. Log de erro completo: `console.error('Erro:', error.message, error.response?.data)`

### Problema: Campos de tabela não estão sendo coletados

**Sintomas:** Dados das linhas da tabela (5 opções, dias mindfulness) aparecem vazios no PDF

**Solução:**
1. Verificar IDs dos inputs: `id="opcao1"`, `id="vant1"`, `id="desv1"` (não typos)
2. Loop correto em `coletarTodosDados()`: `for (let i=1; i<=5; i++)`
3. Adicionar testes: `console.log(document.getElementById('opcao1').value)`
4. Usar optional chaining: `document.getElementById('opcao1')?.value || 'Não preenchido'`

---

## 🔐 Segurança & Conformidade

### Proteção de Dados (LGPD/GDPR/CCPA)

**Implementado:**
- ✅ Termos de consentimento explícitos (Página 1)
- ✅ Validação de email antes de armazenar
- ✅ localStorage (dados permanecem localmente, não em servidor sem consentimento)
- ✅ Sigilo profissional mencionado em múltiplos pontos

**Recomendações Adicionais:**
- 🔒 Adicionar HTTPS enforcement (redirecionar HTTP → HTTPS)
- 🔒 Implementar token CSRF se adicionar forms POST diretos
- 🔒 Considerar criptografia localStorage para dados sensíveis
- 🔒 Adicionar rate limiting em backend para prevent abuse
- 🔒 Log de acesso: quem fez download, quando, quais dados

### Auditoria de Segurança

**Checklist para novos recursos:**
- [ ] Email é validado antes de qualquer ação?
- [ ] Dados sensíveis (diagnóstico, telefone) estão protegidos?
- [ ] Nenhum dado confidencial é logado em console em produção?
- [ ] Backend valida TODOS os dados recebidos (não confiar em cliente)?
- [ ] Backup automático de dados importantes existe?

---

## 📊 Padrões de Dados por Módulo

### Módulo 3 (Mindfulness)
```javascript
// Coleta padrão de tabela 7 dias
const dias = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
dias.forEach(dia => {
  const praticou = document.getElementById(`mind${dia}`)?.checked;
  const duracao = document.getElementById(`mind${dia}Dur`)?.value;
  const qualidade = document.getElementById(`mind${dia}Qual`)?.value;
});
```

### Módulo 4 (Experiências Positivas)
```javascript
// Padrão 1: Savoring (3 momentos × 3 campos)
momento1: { descricao, pensamento, sentimento }
// Padrão 2: Gratidão (5 linhas × 3 colunas)
exp1: { acontecimento, contribuicao, forca }
```

### Módulo 5 (Sinais de Alerta)
```javascript
// Checklist binária (10 sinais)
// Se 3+ marcados → alerta vermelho, recomenda escalas de rastreio
const sinaisMarcados = Array.from({length: 10}, (_, i) => 
  document.getElementById(`sinal${i+1}`)?.checked
).filter(Boolean).length;
```

### Módulo 6-7 (Resolução & SMART)
```javascript
// Padrão tabela análise: Opção → Vantagens ↔ Desvantagens
// Padrão tabela ação: Passo → Ação + Data
```

---

## 🎨 Customização Avançada

### Alterar Cronograma de Pontos

**Opção 1: Modificar pontos por etapa**
```javascript
// Linha ~900
const pontosPorEtapa = 10;  // Mudar para 15, 20, etc.
// Ajusta automaticamente pontuação final
```

**Opção 2: Pontos dinâmicos por qualidade**
```javascript
function calcularPontos(numeroEtapa) {
    // Exemplo: bonus por preencher completamente
    const campos = coletarTodosDados();
    const preenchimento = Object.values(campos).filter(v => v !== 'Não informado').length;
    return 10 + Math.floor(preenchimento * 0.1);
}
```

### Adicionar Novo Módulo (Página 9)

**Passos:**
1. Incrementar `totalPaginas = 9`
2. Adicionar HTML: `<div class="pagina" id="pagina9">...</div>`
3. Criar badge: `<div class="premio-container" id="premio9">...</div>`
4. Adicionar ao `premiosConfig`: `{ id: 9, nome: '...', icone: '...' }`
5. Adicionar campos a `coletarTodosDados()`, `gerarPDF()`, `gerarXLSX()`
6. Testar navegação com botões "Anterior" e "Próximo"

### Tema Dark Mode (Já Suportado)

CSS já tem: `@media (prefers-color-scheme: dark)`

Para customizar:
```css
@media (prefers-color-scheme: dark) {
    body {
        background: #1a1a1a;  /* Mudar escuro base */
        color: #e0e0e0;       /* Mudar texto claro */
    }
}
```

---

## 📞 Contato & Suporte

**Responsável:** Psicólogo Luis Antonio Silva Bernardo (CRP 19/004142)  
**Email:** psicologoluisbernardo@gmail.com  
**Emergência 24h:**
- CVV: **188** (Brasil, humanizado)
- SAMU: **192** (Brasil)
- Lifeline: **988** (EUA)

---

## 👥 Fluxo Visual de Uso do Usuário

```
┌─────────────────────────────────────────────────────────────┐
│                   PÁGINA DE CARREGAMENTO                      │
│  - Carrega localStorage (progresso anterior se existe)       │
│  - Mostra header com logo, progresso, pontuação              │
│  - Inicializa steps 1-8 (cinza por padrão)                   │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│            PÁGINA 1: CONSENTIMENTO & INFORMAÇÕES             │
│  - 4 checkboxes obrigatórios (TODOS devem estar marcados)    │
│  - Botão "Começar" desabilitado até validação passar         │
│  - Clique → valida → mostra badge 🎗️ → avança em 1.5s       │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         PÁGINA 2: DADOS PESSOAIS (Obrigatórios)              │
│  - Nome, Email, Telefone, Diagnóstico, etc.                 │
│  - Email validado com regex antes de prosseguir              │
│  - Idade auto-calcula de data nascimento                     │
│  - Step 1 muda para "concluído" (cor ouro)                  │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  PÁGINAS 3-8: Módulos Temáticos (Maioria opcional)           │
│  - Mindfulness, Experiências, Sinais, Problemas, Metas,     │
│    Valores, Suporte                                           │
│  - Dados salvos em tempo real (antes de avançar)             │
│  - Cada módulo = +10 pontos + badge visual                   │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│             RESUMO FINAL & DOWNLOADS                         │
│  - Mostra pontuação total (80 pontos max)                    │
│  - Grid com badges conquistados                              │
│  - Botões: Imprimir | Salvar Dados                           │
│  - Ao clicar "Salvar": gera PDF + XLSX                       │
│  - Tenta enviar para backend (fallback: download local)      │
│  - Email com cópias enviado para usuário                     │
└─────────────────────────────────────────────────────────────┘
```

**Caminhos Alternativos:**

1. **Usuário volta no meio (recarrega página):**
   - localStorage restaura a página onde estava + pontos acumulados
   - Pode retomar do ponto exato onde parou

2. **Usuário clica "Reiniciar":**
   - Confirmação de diálogo
   - localStorage limpo
   - Volta para página 1 com pontos = 0

3. **Erro ao enviar email:**
   - Backend timeout ou offline
   - Sistema oferece download local como alternativa
   - Dados não são perdidos

---

## 🧪 Teste Recomendado (QA Checklist)

Antes de deploy, testar:

- [ ] **Página 1:** Marcar apenas 3 checkboxes → clique "Começar" → deve bloquear com erro
- [ ] **Página 2:** Deixar email vazio → deve bloquear com erro específico
- [ ] **Validação Email:** Testar `teste@`, `@teste.com`, `teste@teste` → deve falhar
- [ ] **Idade:** Data nascimento 01/01/2000 → deve calcular corretamente em 2025
- [ ] **Progresso:** Avançar de página 1 → página 8, pontuação deve chegar a 80
- [ ] **localStorage:** DevTools → Application → limpar dados → recarregar → deve resetar para página 1
- [ ] **PDF:** Gerar com todos campos preenchidos → deve conter todos dados
- [ ] **XLSX:** Abrir no Excel/LibreOffice → deve ter 2+ abas, dados formatados
- [ ] **Responsividade:** Reduzir para 375px → formulários em uma coluna, legível
- [ ] **Email:** Usar email válido → ao finalizar, deve receber email com arquivos (ou falhar graciosamente)

---

---

## 📚 Scientific References (Embedded in HTML)

These superscript citations `[1,2,18]` reference studies. Don't remove them—they support medical credibility:
- MBRP effectiveness: 54% relapse reduction over 12 months
- Savoring: 0.5-0.7 effect size on wellbeing
- SMART goals: 95% success rate vs vague goals

---

## 🎯 Guia Prático para Agentes IA

### Cenário 1: Adicionar Um Campo Novo à Página 2

**Tarefa:** Adicionar campo "Medicações Atuais"

**Passos:**

1. **Encontre a seção de campos na Página 2** (buscar `id="diagnostico"`)
2. **Adicione HTML após o campo de diagnóstico:**
```html
<div class="form-group form-full-width">
    <label for="medicacoes">Medicações Atuais</label>
    <textarea id="medicacoes" name="medicacoes" placeholder="Liste medicações e dosagens..."></textarea>
</div>
```
3. **Em `coletarTodosDados()`, procure a seção "Página 2" e adicione:**
```javascript
medicacoes: document.getElementById('medicacoes')?.value || 'Não informado',
```
4. **Em `gerarPDF()`, adicione uma nova div dentro da seção Dados Pessoais:**
```html
<div class="field">
    <div class="label">Medicações Atuais:</div>
    <div class="value">${dados.medicacoes}</div>
</div>
```
5. **Em `gerarXLSX()`, adicione linha ao `ws_data`:**
```javascript
['Medicações Atuais', dados.medicacoes],
```

### Cenário 2: Aumentar Pontos por Módulo de 10 para 15

**Tarefa:** Cada módulo completo = 15 pontos (120 total)

**Mudanças Necessárias:**

1. **Linha ~900, localize:**
```javascript
const pontosPorEtapa = 10;
```
2. **Mude para:**
```javascript
const pontosPorEtapa = 15;
```
3. **Verificar no final se pontuação reflete: 8 módulos × 15 = 120 pontos**

### Cenário 3: Tornar Campo Obrigatório na Página 3

**Tarefa:** "Reflexão sobre Mindfulness" deve ser preenchida

**Passos:**

1. **Em `validarPagina(3)`, adicione bloco:**
```javascript
case 3:
    const reflexao = document.getElementById('reflexao').value.trim();
    if (!reflexao) {
        mostrarErroValidacao('❌ Por favor, preencha a reflexão pessoal sobre mindfulness.');
        return false;
    }
    return true;
```
2. **Teste: ir para página 3, não preencher reflexão, clicar "Próximo" → deve mostrar erro e não avançar**

### Cenário 4: Debug de Dados Não Sendo Salvos

**Sintoma:** Preencheu campos mas dados não aparecem no PDF

**Procedimento:**

1. **Abrir DevTools (F12) → Console**
2. **Cola na console:**
```javascript
const dados = coletarTodosDados();
console.table(dados);
```
3. **Procure por campos com valor 'Não informado' → significa o `id` está errado ou campo não existe**
4. **Comparar campo HTML `id` com nome em `coletarTodosDados()`**
5. **Exemplos de typos comuns:**
   - HTML: `id="reflexao_mindfulness"` vs JS: `reflexao` ❌
   - HTML: `id="momento1Desc"` vs JS: `momento1Descricao` ❌

### Cenário 5: Personalizar Mensagem de Erro

**Tarefa:** Mudar mensagem quando email inválido

**Localizar e alterar:**
```javascript
// Atual (em validarPagina, case 2)
if (!validarEmail(email)) {
    mostrarErroValidacao('❌ Email inválido. Use formato: seu@email.com');
    return false;
}

// Para novo texto:
if (!validarEmail(email)) {
    mostrarErroValidacao('⚠️ O email deve conter @ e um domínio válido (ex: usuario@empresa.com)');
    return false;
}
```

---

## 📋 Checklist para Modificações Seguras

Antes de fazer qualquer mudança no código:

- [ ] Fiz backup do arquivo HTML original?
- [ ] Estou usando Find & Replace com cuidado (incluindo 3-5 linhas de contexto)?
- [ ] Se adicionar campo: atualizei HTML + `coletarTodosDados()` + `gerarPDF()` + `gerarXLSX()`?
- [ ] Se modificar validação: testei cenários onde deve passar E onde deve falhar?
- [ ] Se alterar pontos: verifiquei se pontuação final faz sentido?
- [ ] Testei localStorage: `localStorage.clear()` depois recarreguei página?
- [ ] Responsividade: abri DevTools, testei em 768px (mobile)?

---

## 🔗 Referências Rápidas

**Encontrar por função:**
- Validação → buscar `validarPagina(`
- Coleta de dados → buscar `coletarTodosDados(`
- Geração PDF → buscar `gerarPDF(`
- Geração XLSX → buscar `gerarXLSX(`
- Navegação → buscar `avancarPagina(`
- LocalStorage → buscar `localStorage.set` ou `localStorage.get`

**Encontrar por campo:**
- Nome completo → `id="nomeCompleto"`
- Email → `id="email"`
- Mindfulness dias → `id="mind[DayName]"` (ex: `mindMonday`)
- Sinais de alerta → `id="sinal1"` até `sinal10`
- Metas SMART → `id="meta_descricao"`, `meta_mensuravel`, etc.

---

**Última Atualização:** 18 de Novembro de 2025  
**Versão:** 3.0-Premium-Final com Troubleshooting  
**Linguagem:** Português (PT-BR)  
**Framework:** HTML/CSS/JavaScript Vanilla (sem build)
