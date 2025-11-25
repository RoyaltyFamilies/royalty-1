# ⚙️ Configuração do Backend - Royalty Families

## 📋 Resumo Rápido

O HTML agora está configurado para enviar e-mails com PDF e XLSX via um backend Node.js. Você precisa:

1. **Fazer deploy do backend** (hospedagem)
2. **Configurar a URL** no HTML
3. **Gerar App Password do Gmail**
4. **Testar o envio**

---

## 🚀 Passo 1: Deploy do Backend (Replit - Recomendado)

### Opção A: Replit (MAIS FÁCIL - Recomendado) ✅

**O que é?** Hospedagem gratuita e simples para código Node.js.

### Passos:

1. **Acesse** [Replit.com](https://replit.com)
   - Clique em "Sign up" (se não tem conta)
   - Login com email

2. **Crie um novo projeto:**
   - Clique em "+ Create" 
   - Selecione "Node.js" como template
   - Nome: `royalty-backend`
   - Clique em "Create Repl"

3. **Copie os arquivos:**
   - No arquivo `backend-server.js` deste projeto
   - Copie TODO o conteúdo
   - Cole em `index.js` no Replit (substituir tudo)

4. **Copie o package.json:**
   - Crie um novo arquivo `package.json` no Replit
   - Cole:
   ```json
   {
     "name": "royalty-backend",
     "version": "1.0.0",
     "main": "index.js",
     "scripts": {
       "start": "node index.js"
     },
     "dependencies": {
       "express": "^4.18.2",
       "nodemailer": "^6.9.3",
       "cors": "^2.8.5"
     }
   }
   ```

5. **Configure as variáveis de ambiente:**
   - Na aba esquerda do Replit, clique em "Secrets" (ícone de chave 🔑)
   - Clique em "Add new secret"
   - **Nome:** `EMAIL_USER`
   - **Valor:** `psicologoluisbernardo@gmail.com` (seu Gmail)
   - Clique em "Add secret"
   
   - Clique em "Add new secret" novamente
   - **Nome:** `EMAIL_PASSWORD`
   - **Valor:** Sua App Password (veja Passo 2 abaixo)
   - Clique em "Add secret"

   - **Opcional:** Adicione `PORT` se quiser usar porta diferente
   - **Nome:** `PORT`
   - **Valor:** `3000`

6. **Instale as dependências:**
   - Clique em "Run" ou pressione CTRL+ENTER
   - O Replit faz `npm install` automaticamente
   - Espere terminar (pode levar 1-2 minutos)

7. **Pegue a URL do seu backend:**
   - Quando estiver rodando, aparecerá uma URL no topo direito
   - Exemplo: `https://royalty-backend.username.replit.dev`
   - **Copie esta URL**

---

### Opção B: Heroku (Alternativa)

1. Acesse [Heroku.com](https://heroku.com)
2. Crie uma conta e faça login
3. Clique em "Create new app"
4. Siga as instruções para conectar seu GitHub ou fazer upload dos arquivos
5. Adicione Config Vars (Settings):
   - `EMAIL_USER`: seu Gmail
   - `EMAIL_PASSWORD`: sua App Password

---

### Opção C: Seu próprio servidor

Se tem um servidor próprio (VPS, servidor local, etc):
1. Instale Node.js
2. Copie os arquivos para o servidor
3. Execute: `npm install && npm start`
4. Configure as variáveis de ambiente no `.env`

---

## 🔑 Passo 2: Gerar App Password do Gmail

**Por que?** Gmail bloqueia senhas simples por segurança. Precisamos de uma "App Password".

### Passos:

1. **Acesse sua conta Google:**
   - Vá para [myaccount.google.com](https://myaccount.google.com)
   - Clique em "Security" (Segurança) na esquerda

2. **Ative 2-Step Verification (se não tiver):**
   - Procure por "2-Step Verification"
   - Clique em "Get started" se não estiver ativado
   - Siga os passos

3. **Gere a App Password:**
   - Após 2FA ativado, procure por "App passwords"
   - Selecione: **Mail** (correio) + **Windows Computer** (ou seu SO)
   - Google vai gerar uma senha de **16 caracteres**
   - **COPIE ESTA SENHA** (exemplo: `abcd efgh ijkl mnop`)

4. **Use essa senha:**
   - Esta senha é o seu `EMAIL_PASSWORD` no Replit/Heroku
   - Use no campo "Secrets" do Replit

---

## 🔗 Passo 3: Atualizar a URL no HTML

Agora você tem a URL do backend. Precisa atualizar o HTML:

1. **Abra o arquivo HTML** (`Prevenção_Royalty_18_11_25.html`)

2. **Procure por:**
   ```javascript
   const backendUrl = 'https://seu-backend-aqui.replit.dev/api/enviar-relatorio';
   ```

3. **Substitua `seu-backend-aqui.replit.dev`** pela sua URL real:
   - Exemplo: `https://royalty-backend.joao123.replit.dev`
   - Ou se usar Heroku: `https://royalty-backend-abc123.herokuapp.com`

4. **Procure por 2 ocorrências:**
   - Linha ~2247: em `enviarParaBancoDados()`
   - Linha ~2275: em `enviarEmailComAnexos()`
   
   Atualize ambas com a mesma URL.

5. **Salve o arquivo**

---

## ✅ Passo 4: Testar o Backend

### Teste 1: Backend está rodando?

**Via cURL (PowerShell):**
```powershell
Invoke-WebRequest -Uri "https://seu-backend-aqui.replit.dev/api/enviar-relatorio" -Method POST -ContentType "application/json" -Body '{"teste": true}'
```

Se retornar um objeto JSON, o backend está funcionando ✅

### Teste 2: E-mail está sendo enviado?

1. **Abra o HTML** em seu navegador
2. **Preencha o formulário** com seus dados
3. **Clique em "Finalizar"** no último módulo
4. **Você deve ver:**
   - ✅ PDF e XLSX são baixados automaticamente
   - ✅ E-mail chega em `psicologoluisbernardo@gmail.com` com os anexos
   - ✅ E-mail também chega em seu endereço de e-mail (preenchido no formulário)

### Teste 3: Se o e-mail não chegar

**Verificar:**
1. **Pasta de Spam/Lixo** - procure pelos e-mails lá
2. **Logs do Replit** - clique em "Logs" para ver erros
3. **App Password correta?** - Confirme no Replit Secrets
4. **2FA do Gmail ativado?** - Necessário para App Passwords

---

## 🛠️ Troubleshooting

### Problema: "Backend não disponível"
- ✅ Verifique se a URL está correta
- ✅ Verifique se o backend está rodando (clique em "Run" no Replit)
- ✅ Espere 30 segundos após clicar em "Run"

### Problema: "E-mail retornou erro"
- ✅ Confirme `EMAIL_USER` é um Gmail válido
- ✅ Confirme `EMAIL_PASSWORD` é a App Password (16 caracteres)
- ✅ Confirme 2FA está ativado no Gmail
- ✅ Procure em Logs do Replit pelo erro

### Problema: "O backend retornou status 500"
- ✅ Vai aos "Logs" do Replit
- ✅ Procure pela mensagem de erro
- ✅ Copie o erro e pesquise na documentação do Nodemailer

### Problema: "Timeout - backend não responde"
- ✅ O Replit pode ter colocado seu app em sleep se não usar por 1 hora
- ✅ Clique em "Run" novamente para acordar
- ✅ (Solução: upgrade para Replit Pro)

---

## 📧 Verificar E-mails Recebidos

Após enviar pelo formulário, e-mails devem chegar em:

1. **Seu e-mail** (preenchido no formulário) - relatório completo com anexos
2. **psicologoluisbernardo@gmail.com** - notificação com dados do usuário

Se um dos dois não chegar, verifique:
- Pasta de Spam (marque como "não é spam")
- Configure regras de filtro no Gmail
- Verifique se o endereço de e-mail do usuário está correto

---

## 📚 Referências

- **Replit Docs:** https://docs.replit.com
- **Nodemailer Docs:** https://nodemailer.com
- **Gmail App Passwords:** https://support.google.com/accounts/answer/185833
- **Node.js:** https://nodejs.org

---

## ✨ Pronto!

Seus usuários agora:
1. ✅ Preenchem o formulário
2. ✅ Clicam "Finalizar"
3. ✅ PDF e XLSX são baixados automaticamente
4. ✅ E-mail é enviado com os arquivos anexados
5. ✅ Psicólogo recebe a notificação

**Sucesso!** 🎉

---

**Última atualização:** Novembro 2024
