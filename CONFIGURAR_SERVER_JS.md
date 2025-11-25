# ⚠️ CONFIGURAÇÃO DO SERVER.JS - IMPORTANTE!

## 🎯 O Problema

O `server.js` que você tem **não tem a senha de e-mail configurada**!

Na linha 54, vê:
```javascript
pass: process.env.EMAIL_PASSWORD || 'sua_senha_de_aplicativo_aqui'
```

Isso precisa ser configurado!

---

## ✅ SOLUÇÕES (escolha UMA):

### **OPÇÃO 1: Usar Variáveis de Ambiente (RECOMENDADO)**

1. **No Replit**, clique em **"Secrets"** (🔐 cadeado)
2. Adicione:
   ```
   EMAIL_SERVICE = gmail
   EMAIL_USER = psicologoluisbernardo@gmail.com
   EMAIL_PASSWORD = sua_senha_de_app_google
   ```

3. O `server.js` vai ler automaticamente!

---

### **OPÇÃO 2: Hardcodear a Senha (NÃO recomendado, mas funciona)**

1. Abra o `server.js` no Replit
2. Procure pela linha 54 (mais ou menos)
3. Substitua:
   ```javascript
   pass: process.env.EMAIL_PASSWORD || 'sua_senha_de_aplicativo_aqui'
   ```
   
   Por:
   ```javascript
   pass: 'sua_senha_de_app_google_aqui'
   ```

4. Salve e clique em "Run"

---

## 📧 COMO GERAR SENHA DE APP GOOGLE

1. Vá para: https://myaccount.google.com/
2. Clique em **"Segurança"**
3. Ative **"Verificação em 2 etapas"**
4. Procure por **"Senhas de app"**
5. Selecione: Gmail + Windows
6. Google gera uma senha tipo: `abcd efgh ijkl mnop`
7. **Copie (SEM ESPAÇOS)**: `abcdefghijklmnop`

---

## 🧪 TESTAR DEPOIS

Quando o Replit estiver rodando com a senha configurada:

1. Preencha o formulário completo
2. Clique em "Finalizar"
3. Você deve receber um email em `psicologoluisbernardo@gmail.com` com o PDF anexado

---

## 💡 QUAL OPÇÃO ESCOLHER?

- **OPÇÃO 1 (Secrets)**: Mais seguro ✅ (senha não fica visível no código)
- **OPÇÃO 2 (Hardcoded)**: Mais rápido, mas menos seguro

**Recomendo a OPÇÃO 1!**

---

Depois que configurar, me avisa para teste novamente! 🚀
