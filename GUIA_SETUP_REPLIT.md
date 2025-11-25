# 📧 GUIA COMPLETO: CONFIGURAR BACKEND REPLIT PARA ENVIO DE PDF

## 🎯 O que vamos fazer
Criar um backend no Replit que recebe o PDF gerado pela aplicação e o envia por email com Nodemailer.

---

## ✅ PASSO 1: CRIAR PROJETO NO REPLIT

### 1.1 Criar novo Replit
1. Acesse https://replit.com/
2. Clique em **"+ Create"**
3. Selecione **"Node.js"** como linguagem
4. Nome: `royalty-pdf-backend`
5. Clique em **"Create Replit"**

### 1.2 Copiar código do backend
Substitua TODO o conteúdo do arquivo `index.js` pelo código abaixo:

```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Configurar upload de arquivos
const upload = multer({ storage: multer.memoryStorage() });

// Rota de teste
app.get('/', (req, res) => {
  res.json({ status: '✅ Backend Royalty PDF está funcionando!', version: '1.0' });
});

// Rota para enviar PDF por email
app.post('/api/enviar-pdf', upload.single('pdf'), async (req, res) => {
  try {
    const { to_email, to_name, patient_name, patient_email, patient_phone, subject } = req.body;
    const pdfBuffer = req.file ? req.file.buffer : null;

    // Validar dados
    if (!to_email || !pdfBuffer) {
      return res.status(400).json({ 
        sucesso: false, 
        mensagem: 'Email ou PDF não fornecido' 
      });
    }

    // Configurar transportador Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Preparar email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to_email,
      subject: subject || 'Plano de Prevenção de Recaída',
      html: `
        <h2>📋 Plano de Prevenção de Recaída</h2>
        <p><strong>Paciente:</strong> ${patient_name}</p>
        <p><strong>Email:</strong> ${patient_email}</p>
        <p><strong>Telefone:</strong> ${patient_phone}</p>
        <p style="margin-top: 20px; color: #666;">
          Em anexo você encontra o relatório completo do plano de prevenção de recaída.
        </p>
        <p style="margin-top: 30px; font-size: 12px; color: #999;">
          Enviado por Royalty Families - Guia de Prevenção de Recaída
        </p>
      `,
      attachments: [
        {
          filename: `Relatorio_Prevencao_${patient_name.replace(/\s+/g, '_')}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    };

    // Enviar email
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email enviado para: ${to_email}`);
    console.log(`   ID: ${info.messageId}`);

    res.json({ 
      sucesso: true, 
      mensagem: 'Email enviado com sucesso!',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Erro ao enviar email:', error.message);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro ao enviar email: ' + error.message 
    });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📧 Email configurado como: ${process.env.EMAIL_USER}`);
});
```

### 1.3 Editar package.json
Substitua o conteúdo do arquivo `package.json` por:

```json
{
  "name": "royalty-pdf-backend",
  "version": "1.0.0",
  "description": "Backend para envio de PDF via email",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "nodemailer": "^6.9.4",
    "cors": "^2.8.5",
    "multer": "^1.4.5-lts.1"
  }
}
```

---

## 🔐 PASSO 2: CONFIGURAR GMAIL

### 2.1 Preparar sua conta Gmail

Você precisa de uma **Senha de App Google** (não é sua senha normal!).

**IMPORTANTE:** Se sua conta Gmail tem autenticação 2FA, siga estes passos:

1. Vá para: https://myaccount.google.com/
2. Clique em **"Segurança"** (no menu esquerdo)
3. Ative **"Verificação em 2 etapas"** (se não estiver)
4. Na mesma página, procure por **"Senhas de app"**
5. Selecione:
   - **App:** Gmail
   - **Dispositivo:** Windows (ou seu SO)
6. Google vai gerar uma senha como: `abcd efgh ijkl mnop`
7. **Copie essa senha** (sem espaços)

### 2.2 Adicionar Secrets no Replit

1. No Replit, clique no ícone de **"Secrets"** (🔐 cadeado) na barra esquerda
2. Clique em **"Add new secret"**
3. Adicione 2 secrets:

**Secret 1:**
```
Key: EMAIL_USER
Value: seu.email@gmail.com
```

**Secret 2:**
```
Key: EMAIL_PASSWORD
Value: abcd efgh ijkl mnop
```
(Aqui você cola a senha de app que Google gerou, SEM ESPAÇOS)

---

## 🚀 PASSO 3: TESTAR O BACKEND

1. Clique em **"Run"** no Replit
2. Você verá na console algo como:
```
🚀 Servidor rodando em https://royalty-pdf-backend.seu-usuario.replit.dev
📧 Email configurado como: seu.email@gmail.com
```

3. **Copie essa URL** (será usada no próximo passo)

---

## 🔗 PASSO 4: CONFIGURAR NO HTML

### 4.1 Abra o arquivo HTML da aplicação

Procure pela linha com:
```javascript
const BACKEND_URL = 'https://royalty-pdf-backend.seu-usuario.replit.dev/api/enviar-pdf';
```

Ela está dentro da função `gerarEEnviarPDFParaTerapeuta()`

### 4.2 Substitua a URL

Troque `seu-usuario` pela **URL real do seu Replit** que você copiou no Passo 3.

**Exemplo:**
```javascript
// ANTES:
const BACKEND_URL = 'https://royalty-pdf-backend.seu-usuario.replit.dev/api/enviar-pdf';

// DEPOIS (com URL real):
const BACKEND_URL = 'https://royalty-pdf-backend.johndoe.replit.dev/api/enviar-pdf';
```

### 4.3 Salve e publique o HTML

---

## ✅ PASSO 5: TESTAR TUDO

1. **Abra o formulário** no navegador
2. **Preencha todas as informações** (Seus Dados, Mindfulness, etc)
3. **Clique em "Finalizar"** no final do formulário
4. **Aguarde** uns 5-10 segundos
5. **Verifique seu email** (inclua a pasta SPAM)

Se tudo der certo, você receberá:
- ✅ Email com assunto: "Paciente fez plano de prevenção"
- ✅ PDF anexado com todos os dados

---

## 🆘 RESOLUÇÃO DE PROBLEMAS

### P: "Error: Cannot find module 'express'"
**R:** Clique em "Run" de novo. O Replit vai instalar automaticamente.

### P: "Error: EAUTH - invalid login"
**R:** A senha de app do Gmail está errada. Verifique:
- Você gerou corretamente a senha de app?
- Copiou SEM ESPAÇOS?
- O EMAIL_USER é o mesmo email que gerou a senha?

### P: "Backend não está respondendo"
**R:** 
- O Replit precisa estar rodando (clique em "Run")
- A URL está correta no HTML?
- Verifique no console do navegador (F12) qual erro aparece

### P: "E-mail não chega"
**R:** Verifique:
- Pasta SPAM do Gmail
- Se o backend enviou com sucesso (veja console do Replit)
- Se o EMAIL_PASSWORD está correto

### P: "CORS error - blocked by browser"
**R:** Já está resolvido! O backend tem `cors` habilitado.

---

## 📧 O QUE O PACIENTE RECEBERÁ

Quando um paciente preencher o formulário e clicar em "Finalizar":

**Email recebido:**
- **De:** seu.email@gmail.com
- **Para:** psicologoluisbenardo@gmail.com (ou outro terapeuta selecionado)
- **Assunto:** "Paciente fez plano de prevenção"
- **Corpo:** Dados do paciente + mensagem
- **Anexo:** PDF com relatório completo

---

## 🔄 FLUXO COMPLETO

```
Usuário preenche form
        ↓
Clica "Finalizar"
        ↓
gerarEEnviarPDFParaTerapeuta() é chamado
        ↓
HTML gera PDF com html2pdf
        ↓
FormData com PDF é enviado para Replit
        ↓
Backend recebe PDF
        ↓
Nodemailer envia email com PDF anexado
        ↓
Email chega na caixa de entrada!
```

---

## 📝 NOTAS IMPORTANTES

- O backend fica **sempre rodando** no Replit (mantém URL ativa)
- Limite gratuito do Gmail: **500 emails/dia**
- Se mudar a senha do Gmail, atualizar também no Replit Secrets
- O PDF é gerado no NAVEGADOR (não no servidor), então funciona offline

---

## 🎯 PRÓXIMOS PASSOS (Opcional)

1. **Múltiplos terapeutas:** Já está pronto! Você pode adicionar na lista de terapeutas
2. **Dashboard:** Criar página para ver PDFs enviados
3. **Webhook:** Integrar com seu sistema de gestão

---

**Sucesso! 🚀 Qualquer dúvida, me avisa!**
