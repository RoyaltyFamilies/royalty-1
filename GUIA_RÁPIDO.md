# 🚀 Guia Rápido - Como Ativar E-mails (5 minutos)

## O que mudou?

✅ O HTML agora envia e-mails com PDF e XLSX automaticamente
✅ Os arquivos SEMPRE são baixados (você nunca perde dados)
✅ Se o backend não estiver configurado, tudo funciona normalmente

---

## ⚡ Ativação em 4 passos

### Passo 1: Gerar App Password (2 min)
1. Acesse: https://myaccount.google.com/security
2. Clique em "App passwords" (se não aparecer, ative 2FA primeiro)
3. Selecione: Mail + Windows Computer
4. Google gera uma senha de 16 caracteres
5. **COPIE ESSA SENHA**

### Passo 2: Deploy no Replit (2 min)
1. Acesse: https://replit.com
2. Clique em "+ Create" → Node.js
3. Nome: `royalty-backend`
4. Cole o conteúdo de `backend-server.js` em `index.js`
5. Crie arquivo `package.json` com as dependências (veja CONFIGURAÇÃO.md)
6. Em "Secrets" (🔑), adicione:
   - `EMAIL_USER`: psicologoluisbernardo@gmail.com
   - `EMAIL_PASSWORD`: (a senha de 16 caracteres)
7. Clique em "Run"
8. **Copie a URL que aparece** (exemplo: https://royalty-backend.seu-usuario.replit.dev)

### Passo 3: Atualizar URL no HTML (1 min)
1. Abra `Prevenção_Royalty_18_11_25.html` em um editor
2. Procure por: `const backendUrl = 'https://seu-backend-aqui.replit.dev`
3. Substitua `seu-backend-aqui.replit.dev` pela sua URL do Replit
4. Salve o arquivo

### Passo 4: Testar (teste rápido)
1. Abra o HTML no navegador
2. Preencha o formulário
3. Clique em "Finalizar"
4. **Você deve ver:**
   - ✅ PDF e XLSX são baixados
   - ✅ Pop-up de sucesso
   - ✅ E-mail chega em ambos os e-mails em 1-5 segundos

---

## ❌ Se algo der errado

| Erro | Solução |
|------|---------|
| "Backend não disponível" | Verifique se a URL está correta no HTML. Verifique se o Replit está rodando |
| E-mail não chega | Procure na pasta de Spam. Verifique App Password |
| Erro 500 no backend | Vá aos "Logs" no Replit para ver a mensagem de erro |

---

## 📊 Fluxo Completo

```
Usuário preenche formulário
         ↓
Clica "Finalizar"
         ↓
PDF é gerado ✅
XLSX é gerado ✅
         ↓
Arquivos são baixados automaticamente ✅
         ↓
Backend recebe os dados
         ↓
E-mail com anexos é enviado para usuário ✅
E-mail com anexos é enviado para psicólogo ✅
         ↓
FIM - Sucesso!
```

---

## 💡 Dicas

- **2FA necessário:** Se Gmail pedir 2FA, ative: https://support.google.com/accounts/answer/180744
- **Replit gratuito?** Sim, mas coloca app em sleep após 1 hora sem usar. Upgrade a Replit Pro para sempre ativo.
- **Mudou a senha do Gmail?** Gere uma nova App Password
- **Testando e-mail local?** Use https://mailtrap.io para testes (não envia real)

---

## 📞 Suporte

Veja `CONFIGURAÇÃO.md` para guia completo com imagens e soluções detalhadas.

---

**Você já pode testar!** 🎉
