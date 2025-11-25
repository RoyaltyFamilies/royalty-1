# 📧 EMAILJS - Guia de Configuração para Envio de PDF com Anexo

## ✅ O que foi adicionado

Agora o sistema tem **3 camadas de fallback**:

```
1️⃣ Railway (principal) - Envia PDF + XLSX
   ↓ (se falhar 3x)
2️⃣ EmailJS (novo!) - Envia PDF em anexo ⭐
   ↓ (se falhar)
3️⃣ FormSpree (backup) - Envia dados apenas
```

---

## 🚀 Como Configurar EmailJS (5 minutos)

### PASSO 1: Criar Conta EmailJS

1. Acesse: **https://www.emailjs.com**
2. Clique em **"Sign Up Free"**
3. Escolha **"Sign up with Email"**
4. Preencha:
   - Email: `psicologoluisbernardo@gmail.com`
   - Senha: (escolha uma forte)
   - Nome: Luis Bernardo
5. Confirme seu email

### PASSO 2: Obter seu PUBLIC KEY

1. Acesse sua conta EmailJS
2. Clique em **"Account"** (no menu superior)
3. Vá para **"API Keys"**
4. Copie o **Public Key** (começa com "pub_")
5. Guarde para o Passo 4

### PASSO 3: Criar Email Service

1. Volte para dashboard
2. Clique em **"Email Services"** (menu à esquerda)
3. Clique em **"Add Service"**
4. Escolha **"Gmail"** (ou seu email provider)
5. Clique **"Connect Account"**
6. Authorize o EmailJS a usar sua conta
7. Copie o **Service ID** (ex: gmail_123456)
8. Guarde para o Passo 4

### PASSO 4: Criar Email Template

1. Vá para **"Email Templates"** (menu à esquerda)
2. Clique em **"Create New Template"**
3. Preencha:
   - **Template Name**: `royalty_relatorio_pdf`
   - **Subject**: `Relatório de Prevenção - {{subject}}`
   - **Body** (conteúdo do email):
   ```
   Olá {{to_name}},

   Segue em anexo seu relatório de prevenção de recaída.

   {{message}}

   Atenciosamente,
   Sistema Royalty Families
   ```
4. Clique em **"Create"**
5. Copie o **Template ID** (ex: template_abc123)
6. Guarde para o Passo 5

### PASSO 5: Inserir as Chaves no Arquivo HTML

1. Abra: `Prevenção_Royalty_21_11_25.html`
2. Procure (Ctrl+F): `SEU_PUBLIC_KEY_EMAILJS`
3. Encontrará 3 linhas:
   ```javascript
   const PUBLIC_KEY = 'SEU_PUBLIC_KEY_EMAILJS';
   const SERVICE_ID = 'SEU_SERVICE_ID';
   const TEMPLATE_ID = 'SEU_TEMPLATE_ID';
   ```
4. Substitua com seus valores:
   ```javascript
   const PUBLIC_KEY = 'pub_xxxxxxxxxxxxx';  // Seu Public Key
   const SERVICE_ID = 'gmail_123456';       // Seu Service ID
   const TEMPLATE_ID = 'royalty_relatorio_pdf';  // Seu Template ID
   ```
5. Salve o arquivo (Ctrl+S)

### PASSO 6: Upload e Teste

1. Faça upload do arquivo atualizado para Wix
2. Publique
3. Teste em www-royaltyfamilies-com.filesusr.com
4. Abra F12 → Console
5. Preencha formulário e envie
6. Veja os logs mostrarem EmailJS funcionando

---

## 📊 Nova Sequência de Funcionamento

```
Usuário clica "Enviar"
    ↓
PDF gerado ✅
    ↓
RETRY 1-3: Railway (2s → 5s → 10s)
    ↓
Se Railway falhar 3x:
    ↓
EmailJS com PDF anexado ✅ (NOVO!)
    ↓
Se EmailJS falhar:
    ↓
FormSpree dados apenas (fallback)
```

---

## ✅ O que Muda

| Serviço | Antes | Depois |
|---------|-------|--------|
| **Railway OK** | Email com PDF | Email com PDF (mais rápido) |
| **Railway Offline** | FormSpree (sem PDF) | EmailJS com PDF ⭐ |
| **Ambos Offline** | Dados salvos local | EmailJS tenta 2x, depois FormSpree |

---

## 🧪 Como Testar

### Teste 1: Verificar Configuração
```javascript
// Console (F12)
console.log('Public Key:', 'SEU_PUBLIC_KEY_EMAILJS');
// Deve mostrar sua chave real, não o placeholder
```

### Teste 2: Teste Real de Envio
1. Abra F12 → Console
2. Preencha formulário
3. Clique "Enviar Relatório"
4. Veja logs:
   ```
   🔄 Tentativa 1: Enviando para Railway...
   🔄 Tentativa 2: Retry para Railway...
   🔄 Tentativa 3: Retry final para Railway...
   📧 Tentando enviar email com PDF via EmailJS...
   ✅ EmailJS enviou com sucesso!
   ```
5. Verifique email de destino (`psicologoluisbernardo@gmail.com`)
6. **PDF deve estar anexado!** ✅

---

## ⚠️ Possíveis Erros

### Erro: "EmailJS não configurado com chaves reais"
**Causa**: Você não substituiu os placeholders
**Solução**: Copie e cole suas chaves reais (não esqueça de salvar!)

### Erro: "Erro ao enviar via EmailJS"
**Causa**: Suas chaves podem estar erradas
**Solução**: Verifique em https://www.emailjs.com/app/account/api-keys

### Erro: "PDF não está sendo anexado"
**Causa**: Pode ser tamanho muito grande
**Solução**: Reduza qualidade do PDF na linha de configuração html2pdf

### Email recebido mas sem anexo
**Causa**: Template não tem suporte para anexo
**Solução**: Verifique se usou corretamente o {{pdf_attachment}}

---

## 💡 Dicas

✅ **Bom saber**:
- EmailJS gratuito: até 200 emails/mês (mais que suficiente)
- Sem limite de tamanho de anexo (até 40MB)
- HTTPS criptografado automaticamente
- Suporte 24/7

⚠️ **Importante**:
- Mantenha suas chaves em segredo (não compartilhe)
- O Public Key é ok compartilhar, mas SERVICE_ID é sensível
- Não exponha suas chaves em repositórios públicos

---

## 🎯 Resultado Final

Agora quando alguém enviar o formulário:

**Se Railway está online:**
```
✅ Email enviado via Railway (com PDF + XLSX)
   Tempo: ~2-3s
```

**Se Railway está offline (agora):**
```
✅ Email enviado via EmailJS (com PDF)
   Tempo: ~17-20s (3 tentativas Railway + EmailJS)
   PDF anexado ao email! 📎
```

**Se ambos falham:**
```
✅ FormSpree recebe dados como backup
   Pelo menos os dados são salvos
```

---

## 📞 Suporte

**Problemas com EmailJS:**
- Documentação: https://www.emailjs.com/docs
- Suporte: https://www.emailjs.com/support

**Verificar Status:**
- Dashboard: https://www.emailjs.com/app

**Debug:**
- Abra Console (F12) e veja logs detalhados
- Procure por "EmailJS" para ver o que aconteceu

---

**Pronto!** Agora seu sistema envia emails COM PDF anexado! 🎉

Tempo total de configuração: ~5 minutos
