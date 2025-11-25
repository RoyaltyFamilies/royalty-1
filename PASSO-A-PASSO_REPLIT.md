# 📹 Passo-a-Passo Visual: Deploy no Replit

## Preparação Prévia

Tenha em mãos:
- [ ] Sua senha de 16 caracteres do Gmail (App Password)
- [ ] O conteúdo de `backend-server.js`
- [ ] O arquivo `CONFIGURAÇÃO.md` aberto para referência

---

## ✅ PASSO 1: Criar Conta Replit

1. Acesse https://replit.com
2. Clique em **"Sign up"**
3. Escolha uma opção (Google, GitHub, ou Email)
4. Confirme seu e-mail

**Status:** ✅ Conta criada

---

## ✅ PASSO 2: Criar um Novo Projeto

1. Clique em **"+ Create"** (canto superior esquerdo)
2. Procure por **"Node.js"** na lista
3. Clique em **"Node.js"**
4. Na caixa de diálogo:
   - **Title**: `royalty-backend`
   - Deixe outras opções padrão
5. Clique em **"Create Repl"**

**Status:** ✅ Projeto criado (você está em um novo "Repl")

---

## ✅ PASSO 3: Copiar Código do Backend

1. No seu computador, abra o arquivo **`backend-server.js`**
2. **Selecione todo o conteúdo** (CTRL+A)
3. **Copie** (CTRL+C)
4. No Replit, você verá `index.js` aberto à direita
5. **Selecione todo o conteúdo** de `index.js` (CTRL+A)
6. **Delete** (DEL)
7. **Cole** (CTRL+V) o conteúdo de `backend-server.js`
8. Clique em **"Save"** ou pressione CTRL+S

**Status:** ✅ Código do backend no Replit

---

## ✅ PASSO 4: Criar arquivo package.json

1. Na esquerda, veja a aba **"Files"** 
2. Clique no ícone **"+"** para novo arquivo
3. Digite: `package.json`
4. Pressione ENTER
5. Cole o seguinte conteúdo:

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

6. Clique em **"Save"**

**Status:** ✅ Arquivo package.json criado

---

## ✅ PASSO 5: Adicionar Variáveis de Ambiente (Secrets)

1. Na esquerda, procure pela aba **"Secrets"** (ícone de 🔑)
2. Clique em **"Add new secret"**
3. **Nome:** `EMAIL_USER`
4. **Valor:** `psicologoluisbernardo@gmail.com`
5. Clique em **"Add secret"**

6. Clique em **"Add new secret"** novamente
7. **Nome:** `EMAIL_PASSWORD`
8. **Valor:** Cole sua senha de 16 caracteres do Gmail (App Password)
   - Exemplo: `abcd efgh ijkl mnop`
9. Clique em **"Add secret"**

✅ **Opcional:** Adicione PORT se quiser
- **Nome:** `PORT`
- **Valor:** `3000`

**Status:** ✅ Variáveis de ambiente configuradas

---

## ✅ PASSO 6: Instalar Dependências e Rodar

1. Clique em **"Run"** (no topo)
   - Ou pressione CTRL+ENTER
2. Aguarde 1-2 minutos:
   - Você verá `npm install` rodando
   - Depois `npm start`
3. Quando terminar, aparecerá:
   ```
   Servidor rodando na porta 3000
   ```

4. **No topo direito**, você verá uma URL como:
   ```
   https://royalty-backend.seu-usuario.replit.dev
   ```

5. **COPIE ESTA URL** (clique no ícone de link ou selecione)

**Status:** ✅ Backend está rodando!

---

## ✅ PASSO 7: Testar o Backend (Opcional)

1. Abra uma nova aba do navegador
2. Cole a URL do seu backend
3. Você deveria ver:
   ```json
   {"erro":"Método GET não permitido"}
   ```

Se vir isso, significa que o backend está funcionando! ✅

---

## ✅ PASSO 8: Atualizar o HTML com a URL

1. Abra o arquivo **`Prevenção_Royalty_18_11_25.html`** em um editor
2. Use CTRL+F para procurar por: `const backendUrl = 'https://seu-backend-aqui`
3. Você encontrará 2 ocorrências (perto das linhas 2247 e 2275)
4. **Em ambas**, substitua `seu-backend-aqui.replit.dev` pela sua URL real
   - Exemplo:
     ```javascript
     const backendUrl = 'https://royalty-backend.joao123.replit.dev/api/enviar-relatorio';
     ```

5. **Salve o arquivo** (CTRL+S)

**Status:** ✅ HTML atualizado com a URL correta

---

## ✅ PASSO 9: Testar Envio Completo

1. **Abra o HTML** (`Prevenção_Royalty_18_11_25.html`) no navegador
2. **Preencha o formulário** com dados de teste:
   - Nome: (qualquer nome)
   - Email: (um email válido seu)
   - Todos os outros campos: (preencha com dados)
3. **Progida por todos os 8 módulos**
4. **No último módulo**, clique em **"Finalizar"**
5. **Você deveria ver:**
   - ✅ Pop-up: "SUCESSO!"
   - ✅ 2 arquivos baixando: `relatório_XXXXXX.pdf` e `relatório_XXXXXX.xlsx`
   - ✅ E-mail chegar em seu endereço em 1-5 segundos
   - ✅ E-mail chegar em `psicologoluisbernardo@gmail.com` em 1-5 segundos

**Status:** ✅ Sistema funcionando!

---

## ❌ Problemas Comuns

### "Backend não disponível"
- Verifique se a URL está correta no HTML
- Verifique se o Replit está rodando (clique em "Run" novamente)
- Aguarde 30 segundos após clicar em "Run"

### "E-mail retornou erro"
- Clique em "Logs" no Replit para ver o erro
- Confirme se `EMAIL_USER` e `EMAIL_PASSWORD` estão corretos
- Se App Password expirou, gere uma nova

### "Erro 500"
- Vá aos "Logs" no Replit
- Procure pela mensagem de erro
- Comum: App Password incorreta ou inválida

---

## 🎉 Sucesso!

Seu sistema agora está:
- ✅ Gerando PDF e XLSX automaticamente
- ✅ Enviando e-mails com anexos
- ✅ Notificando o psicólogo
- ✅ Salvando dados localmente

**Próximos passos:** Mantenha o Replit rodando. Se quiser evitar app em sleep, faça upgrade para Replit Pro.

---

**Pronto para usar!** 🚀
