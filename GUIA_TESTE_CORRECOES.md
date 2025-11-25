# 🧪 GUIA DE TESTE - Verificar Correções

## ✅ Checklist Pré-Teste

Antes de começar, certifique-se de:
- [ ] Arquivo HTML atualizado: `Prevenção_Royalty_21_11_25.html`
- [ ] Acesso à internet (para envio de dados)
- [ ] Email pessoal disponível
- [ ] Paciência para preencher formulário completo (~10-15 min)

---

## 📝 TESTE 1: Consentimento no Email

### Passo a Passo

1. **Abra o formulário**
   - Arquivo: `Prevenção_Royalty_21_11_25.html`
   - Browser: Chrome, Firefox, Safari ou Edge

2. **Preencha a Página 1 (Consentimento)**
   - Selecione todos os 14 checkboxes de consentimento
   - Clique "Próximo"

3. **Preencha as próximas páginas** (rápido, dados dummy OK)
   - Página 2: Dados Pessoais
   - Página 3: Mindfulness
   - Página 4: Experiências
   - Página 5: Sinais
   - Página 6: Problemas
   - Página 7: SMART
   - Página 8: Valores

4. **Clique "Finalizar"**
   - Sistema gerará PDF e enviará dados

5. **Aguarde confirmação**
   - Deve aparecer alerta: "✅ DADOS SALVOS COM SUCESSO!"
   - Pode levar 5-15 segundos

6. **Verifique seu email**
   - Entrada: psicologoluisbernardo@gmail.com
   - Procure por: "Relatório Completo - Prevenção Royalty"

### O Que Procurar

✅ **SUCESSO:** Email contém:
```
0️⃣ CONSENTIMENTO E INFORMAÇÕES IMPORTANTES
─────────────────────────────────────────────────────────
   CONSENTIMENTOS GERAIS:
   ✅ Concordo que meus dados são protegidos conforme LGPD, GDPR e CCPA
   ✅ Autorizo o processamento de meus dados pessoais para fins terapêuticos
   ✅ Entendo que este é um complemento à psicoterapia, não substitui tratamento médico
   ✅ Concordo em utilizar esta ferramenta de forma ética e responsável
   ✅ Compartilhamento + Transferência Internacional de dados autorizado
   ✅ Cookies e LocalStorage para melhorar a experiência
   ✅ Confirmo que li a Política de Privacidade
   ✅ Entendi direitos de revogação de consentimento

   CONSENTIMENTOS DE SAÚDE MENTAL:
   ✅ Coleta de dados sensíveis
   ✅ Processamento automatizado/IA
   ✅ Gravação de sessões online
   ✅ Dados anonimizados para pesquisa
   ✅ Períodos de retenção entendidos
   ✅ Múltiplas bases legais

   Compliance: COMPLIANT - LGPD Art. 8, GDPR Art. 7, CCPA Sec. 1798.100

1️⃣ SEUS DADOS PESSOAIS
```

❌ **FALHA:** Se não houver seção "0️⃣ CONSENTIMENTO" ou se começar direto em "1️⃣ SEUS DADOS PESSOAIS"

---

## 📝 TESTE 2: Campos Longos (5.2 - Análise de Opções)

### Passo a Passo

1. **Preencha a Página 6 (Resolução de Problemas)**

2. **Na seção 5.2 "Análise de Opções":**
   - **Opção 1:** Digite TEXTO MUITO LONGO (100+ caracteres)
   - **Vantagens 1:** Digite TEXTO LONGO (100+ caracteres)
   - **Desvantagens 1:** Digite TEXTO LONGO (100+ caracteres)
   - **Opção 2:** Um pouco de texto
   - **Opção 3:** Digite TEXTO LONGO (100+ caracteres)
   - **Opção 4:** Um pouco de texto
   - **Opção 5:** Digite TEXTO LONGO (100+ caracteres)
   - **Vantagens 5:** Digite TEXTO LONGO (100+ caracteres)

   Exemplo de texto longo:
   ```
   "Esta é uma opção muito interessante que envolve múltiplos aspectos 
   da resolução de problemas, considerando fatores como custo, viabilidade,
   tempo necessário para implementação e eficácia geral..."
   ```

3. **Continue até "Finalizar"**

4. **Verifique email**
   - Procure por seção "5️⃣ RESOLUÇÃO DE PROBLEMAS"
   - Depois "5.2 Análise de Opções:"

### O Que Procurar

✅ **SUCESSO:** Email mostra:
```
   5.2 Análise de Opções:
      
      Opção 1: Esta é uma opção muito interessante que envolve múltiplos 
      aspectos da resolução de problemas, considerando fatores como custo, 
      viabilidade, tempo necessário para implementação e eficácia geral...
      Vantagens: [texto completo]
      Desvantagens: [texto completo]
      
      Opção 2: ...
      
      Opção 3: [texto completo sem corte]
      ...
```

❌ **FALHA:** Se textos aparecerem cortados/incompletos
- Exemplo de falha: "Opção 1: Esta é uma opção muito intere..." (cortado)

---

## 📝 TESTE 3: Campo "Para realizar meus sonhos" (7.3)

### Passo a Passo

1. **Preencha a Página 8 (Valores)**

2. **Na seção 7.3 "Pequenas coisas no cotidiano":**
   - **"Para realizar meus sonhos":** Digite TEXTO MUITO LONGO (200+ caracteres)

   Exemplo:
   ```
   "Gostaria de criar uma organização que ajuda pessoas em recuperação, 
   oferecendo programas educacionais e de mentoria personalizados. 
   Para isso, preciso desenvolver habilidades em liderança, gerenciamento 
   de projetos e comunicação efetiva com diferentes públicos..."
   ```

3. **Continue até "Finalizar"**

4. **Verifique email**
   - Procure por seção "7️⃣ CONEXÃO COM SEUS VALORES"
   - Depois "7.3 Pequenas coisas no cotidiano:"

### O Que Procurar

✅ **SUCESSO:** Email mostra o texto COMPLETO:
```
   7.3 Pequenas coisas no cotidiano:
      Para demonstrar minhas Forças: 
      [texto preenchido completamente]
      
      Para ser visto como quero: 
      [texto preenchido completamente]
      
      Para realizar meus sonhos: 
      Gostaria de criar uma organização que ajuda pessoas em recuperação, 
      oferecendo programas educacionais e de mentoria personalizados. 
      Para isso, preciso desenvolver habilidades em liderança, gerenciamento 
      de projetos e comunicação efetiva com diferentes públicos...
      [TODO O TEXTO COMPLETO SEM CORTE]
```

❌ **FALHA:** Se aparecer incompleto/cortado

---

## 📝 TESTE 4: Estratégias para Superá-los (6.2)

### Passo a Passo

1. **Preencha a Página 7 (SMART e Plano)**

2. **No campo "Estratégias para Superá-los:"**
   - Digite TEXTO LONGO (150+ caracteres)

   Exemplo:
   ```
   "Vou usar técnicas de mindfulness diárias, buscar apoio do grupo 
   de recuperação, manter contato regular com meu terapeuta, praticar 
   exercício físico e evitar situações de risco..."
   ```

3. **Continue até "Finalizar"**

4. **Verifique email**
   - Procure por seção "6️⃣ ESTRATÉGIA SMART"

### O Que Procurar

✅ **SUCESSO:** Email mostra:
```
   Obstáculos Previstos: [seu texto]
   Estratégias para Superá-los: Vou usar técnicas de mindfulness diárias, 
   buscar apoio do grupo de recuperação, manter contato regular com meu 
   terapeuta, praticar exercício físico e evitar situações de risco...
   [TEXTO COMPLETO]
```

❌ **FALHA:** Se não aparecer ou estiver cortado

---

## 📝 TESTE 5: Sem Duplicação (Geral)

### Passo a Passo

1. **Complete um envio normal**

2. **Aguarde 30 segundos**

3. **Verifique a caixa de entrada em psicologoluisbernardo@gmail.com**

### O Que Procurar

✅ **SUCESSO:** Você recebe:
- 1️⃣ **UM email** com todos os dados formatados
  - OU
- 2️⃣ **DOIS emails** apenas se Railway falhar (segundo é do FormSpree com dados)

❌ **FALHA:** Se receber:
- 3️⃣ OU MAIS emails
- OU emails "bagunçados" com dados desorganizados
- OU dados repetidos/duplicados no mesmo email

### Dica
Se Railway funcionar:
- ✅ Você recebe 1 email (do Railway)
- ✅ FormSpree NÃO envia nada (pois não é fallback)

Se Railway falhar:
- ❌ 1ª tentativa: timeout após 2s
- ❌ 2ª tentativa: timeout após 5s  
- ❌ 3ª tentativa: timeout após 10s
- ✅ 4ª tentativa: FormSpree envia dados (você recebe 1 email)

---

## 🎯 RESUMO ESPERADO APÓS TESTES

| Teste | Esperado | Realidade | Status |
|-------|----------|-----------|--------|
| 1 - Consentimento | ✅ Presente | | ☐ OK ☐ FALHA |
| 2 - Campos 5.2 | ✅ Completos | | ☐ OK ☐ FALHA |
| 3 - Campo 7.3 | ✅ Completos | | ☐ OK ☐ FALHA |
| 4 - Estratégias | ✅ Presentes | | ☐ OK ☐ FALHA |
| 5 - Sem dup | ✅ 1-2 emails | | ☐ OK ☐ FALHA |

---

## 🐛 Se Algo Falhar

### Cenário 1: Nenhum Email Recebido
- [ ] Verificar spam/lixo
- [ ] Verificar firewall/proxy
- [ ] Aguardar 5 minutos
- [ ] Tentar novamente

### Cenário 2: Consentimento Faltando
- [ ] Verificar se caixas foram marcadas na Página 1
- [ ] Reabrir arquivo HTML (pode estar em cache)
- [ ] Testar em outro navegador

### Cenário 3: Campos Cortados
- [ ] Verificar tamanho do texto digitado
- [ ] Se ainda cortado, pode ser limite do FormSpree
- [ ] Considerar dividir textos muito longos

### Cenário 4: Emails Duplicados (3+)
- [ ] Verificar console do navegador (F12)
- [ ] Ver se há erros de rede
- [ ] Contatar administrador

---

## 📞 Contato para Dúvidas

**Email:** psicologoluisbernardo@gmail.com  
**Arquivo atual:** `Prevenção_Royalty_21_11_25.html`  
**Versão:** 3.0 (corrigida)  
**Data:** 21/11/2025

---

## ✨ Bom Teste!

Se todos os itens passarem ✅, o sistema está funcionando corretamente!

