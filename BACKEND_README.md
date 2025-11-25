# 🔧 Setup do Backend - Royalty Families

## 📋 Requisitos

- Node.js 18.x ou superior
- Uma conta Gmail (ou outro provedor SMTP)
- npm (vem com Node.js)

## 🚀 Instalação Rápida (Local ou Replit)

### 1. **Clone ou baixe os arquivos**
```bash
# Se usando Replit, faça upload dos arquivos
# Se local, navegue até a pasta do projeto
cd Prevenção\ Royalty/
```

### 2. **Instale as dependências**
```bash
npm install
```

### 3. **Configure o email (Gmail)**

#### Opção A: Gmail com App Password (RECOMENDADO)

1. Vá para: https://myaccount.google.com/apppasswords
2. Selecione "Mail" e "Windows Computer"
3. Google vai gerar uma senha de 16 caracteres
4. Copie essa senha

#### Opção B: Ativar "Apps menos seguros" (Menos seguro)

1. Vá para: https://myaccount.google.com/u/0/security-checkup
2. Ative "Apps menos seguros"
3. Use sua senha regular do Gmail

### 4. **Crie arquivo `.env`**

Copie o arquivo `.env.example` e renomeie para `.env`:

```bash
cp .env.example .env
```

Edite `.env` e preencha:
```
EMAIL_USER=psicologoluisbernardo@gmail.com
EMAIL_PASSWORD=sua_app_password_de_16_caracteres
PORT=3000
```

### 5. **Inicie o servidor**

```bash
# Modo produção
npm start

# Modo desenvolvimento (com auto-reload)
npm run dev
```

Você verá:
```
🚀 Servidor rodando em http://localhost:3000
📧 Email configurado: psicologoluisbernardo@gmail.com
```

## 🌐 Deployment no Replit

### 1. **Crie novo projeto no Replit**
- Vá para https://replit.com
- Clique "Create" → "Import from GitHub"
- Ou faça upload dos arquivos

### 2. **Configure variáveis de ambiente**
- Clique em "Secrets" (ícone de cadeado)
- Adicione:
  - `EMAIL_USER` = seu email
  - `EMAIL_PASSWORD` = sua app password
  - `PORT` = 3000

### 3. **Instale e rode**
```bash
npm install
npm start
```

### 4. **Copie a URL pública do Replit**
Será algo como: `https://royalty-backend.replit.dev`

### 5. **Atualize no HTML**
No arquivo `Prevenção_Royalty_18_11_25.html`, procure por:
```javascript
const BACKEND_URL = 'https://seu-backend-replit.replit.dev/api/enviar-relatorio';
```

E mude para sua URL do Replit.

## 🧪 Teste o Backend

### Teste Local
```bash
curl http://localhost:3000/api/status
# Resposta esperada: {"status":"Backend Royalty Families operacional ✅"}
```

### Teste de Email (POST)
```bash
curl -X POST http://localhost:3000/api/enviar-relatorio \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "João Silva",
    "userEmail": "joao@example.com",
    "pdfBase64": "JVBERi0x...",
    "xlsxBase64": "UEsDBAoA...",
    "formData": {"pontuacao": 80},
    "nomeArquivo": "Relatorio_Teste"
  }'
```

## 🐛 Troubleshooting

### Erro: "connect ECONNREFUSED"
- Backend não está rodando
- Solução: Execute `npm start`

### Erro: "Invalid login"
- Email ou senha incorretos
- Solução: Verifique `.env` e a App Password do Gmail

### Erro: "Less secure app access"
- Gmail bloqueou por segurança
- Solução: Use App Password em vez de senha regular

### Email não chega
- Verificar pasta de SPAM
- Verificar se email de "from" está correto
- Verificar logs do servidor: `node backend-server.js`

## 📊 Arquitetura

```
HTML Frontend
      ↓
gerarEEnviarPDF()
      ↓
Gera PDF + XLSX
      ↓
Envia para Backend (Node.js)
      ↓
Backend recebe dados
      ↓
Processa com Nodemailer
      ↓
Envia email com anexos para:
  - Usuário: seu email
  - Psicólogo: psicologoluisbernardo@gmail.com
      ↓
✅ Sucesso!
```

## 📧 Fluxo de Email

**Email para o usuário:**
- Assunto: "Seu Relatório de Prevenção - [data]"
- Anexos: PDF + XLSX
- Confirmação de sucesso

**Email para psicólogo:**
- Assunto: "[NOVO RELATÓRIO] [Nome] - [data]"
- Anexos: PDF + XLSX
- Resumo dos dados do cliente

## 🔐 Segurança

✅ Use variáveis de ambiente (nunca exponha senhas no código)
✅ Use App Passwords (não senha regular)
✅ HTTPS em produção
✅ CORS habilitado (restringir se necessário)
✅ Validação de dados no backend

## 📞 Suporte

Para problemas:
1. Verifique os logs: `console.log()` no backend-server.js
2. Teste a conexão de email separadamente
3. Verifique firewall/antivírus bloqueando porta 3000

---

**Última atualização:** 18 de Novembro de 2025
**Versão:** 1.0.0
