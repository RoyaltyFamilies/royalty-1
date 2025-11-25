# 📊 GUIA DE PREVENÇÃO ROYALTY FAMILIES

Aplicação web interativa para automonitoramento e prevenção de recaída com gamificação, geração de relatórios e integração com e-mail.

**Versão:** 3.0 Premium Final  
**Data de Atualização:** 17 de Novembro de 2025

---

## 🎯 O QUE FOI FEITO

✅ **Sistema de Validação Robusto** - Todos os campos obrigatórios validados  
✅ **Backend Node.js Funcional** - Servidor Express com Nodemailer  
✅ **Envio de E-mails Automático** - Relatórios enviados para usuário e psicólogo  
✅ **Geração de Relatórios** - PDF e XLSX funcionando  
✅ **Fallback Offline** - Se servidor não responde, salva localmente  
✅ **Sistema de Logs** - Rastreamento completo de operações  
✅ **Persistência de Dados** - LocalStorage e banco de dados JSON  

---

## 📋 PASSO A PASSO PARA FUNCIONAR 100%

### **PASSO 1: Preparar o Ambiente**

1. **Instalar Node.js** (se ainda não tiver)
   - Baixe em: https://nodejs.org/
   - Recomendado: LTS (Long Term Support) v18 ou superior
   - Verificar instalação: Abra PowerShell/Terminal e digite:
     ```powershell
     node --version
     npm --version
     ```

### **PASSO 2: Configurar o Projeto**

1. **Abra o PowerShell** e navegue até a pasta do projeto:
   ```powershell
   cd "C:\Users\psico\Desktop\Trabalho e Estudos_2023\Nossos Sites\Royalty Families\Videos e Projetos\Projetos de Aulas ou cursos\App e Programas\Prevenção Royalty"
   ```

2. **Instale as dependências:**
   ```powershell
   npm install
   ```
   Isso vai instalar: Express, Multer, Nodemailer, CORS, Dotenv

### **PASSO 3: Configurar E-mail com Gmail**

⚠️ **IMPORTANTE:** Esta é a etapa crítica!

1. **Ative "Verificação em 2 etapas"** no Gmail:
   - Vá para: https://myaccount.google.com/
   - Clique em "Segurança" no menu esquerdo
   - Em "Verificação em 2 etapas", clique para ativar
   - Siga os passos

2. **Gere uma "Senha de App":**
   - Após ativar 2FA, volte a: https://myaccount.google.com/apppasswords
   - Selecione "Email" e "Windows"
   - Clique em "Gerar"
   - Você receberá uma senha de 16 caracteres

3. **Configure no arquivo `.env`:**
   - Abra o arquivo `.env` que foi criado na pasta
   - Localize a linha: `EMAIL_PASSWORD=sua_senha_de_aplicativo_aqui`
   - Substitua por: `EMAIL_PASSWORD=SenhaGerada` (sem espaços)
   - Exemplo: `EMAIL_PASSWORD=abcd efgh ijkl mnop` → `EMAIL_PASSWORD=abcdefghijklmnop`
   - Salve o arquivo

**ATENÇÃO:** 
- ⚠️ NUNCA compartilhe o arquivo `.env` com ninguém
- 🔒 Não faça commit do `.env` em repositórios Git
- 🔐 Está protegido no `.gitignore`

### **PASSO 4: Iniciar o Servidor**

```powershell
npm start
```

Você verá:
```
============================================================
📊 GUIA DE PREVENÇÃO ROYALTY FAMILIES
✅ Servidor rodando em: http://localhost:3000
============================================================
```

### **PASSO 5: Acessar a Aplicação**

1. **Abra seu navegador** (Chrome, Firefox, Edge, Safari)
2. **Visite:** http://localhost:3000
3. **Pronto!** O formulário está pronto para uso

### **PASSO 6: Testar Completo**

1. **Preencha o formulário** seguindo as 8 etapas
2. **Na última etapa**, clique em "💾 Salvar Dados"
3. **Você verá:**
   - Uma mensagem de progresso
   - Os arquivos sendo gerados
   - Um alert confirmando sucesso
   - E-mail enviado para o usuário
   - Cópia enviada para psicólogo

---

## 🔧 ESTRUTURA DE ARQUIVOS

```
Prevenção Royalty/
├── Prevencao-Royalty_publicar_17_11_25.html    ← Aplicação web
├── server.js                                    ← Backend Node.js
├── package.json                                 ← Dependências
├── .env                                         ← Configurações (gitignore)
├── .gitignore                                   ← Arquivos ignorados
├── README.md                                    ← Este arquivo
├── uploads/                                     ← Arquivos temporários
├── logs/                                        ← Registro de operações
└── data/                                        ← Banco de dados JSON
```

---

## 🚀 COMANDOS ÚTEIS

### **Modo Desenvolvimento (com auto-reload)**
```powershell
npm run dev
```
(Requer nodemon instalado globalmente: `npm install -g nodemon`)

### **Parar o Servidor**
- Pressione: `Ctrl + C` no PowerShell

### **Ver Logs de Operações**
```powershell
cat logs/servidor.log
```

### **Limpar Uploads**
```powershell
Remove-Item uploads/* -Force
```

---

## 🛡️ SEGURANÇA E CONFORMIDADE

✅ **LGPD (Lei Geral de Proteção de Dados)**  
✅ **GDPR (General Data Protection Regulation)**  
✅ **CCPA (California Consumer Privacy Act)**  

### Medidas Implementadas:

1. **Sigilo Profissional** - Dados não são compartilhados
2. **Criptografia** - Senhas armazenadas com hash (use .env)
3. **Validação de Dados** - Sanitização de entrada
4. **HTTPS em Produção** - Obrigatório para publicação
5. **Backup Automático** - Dados salvos em JSON

---

## 📦 PUBLICAÇÃO EM SERVIDOR REAL

Quando estiver pronto para publicar em produção:

### **Opção 1: Heroku (Grátis com limitações)**
```powershell
npm install -g heroku-cli
heroku login
heroku create seu-app-name
heroku config:set EMAIL_PASSWORD=SuaSenhaAqui
git push heroku main
```

### **Opção 2: DigitalOcean ($5/mês)**
- Crie um Droplet com Node.js
- Copie os arquivos
- Configure nginx como proxy reverso
- Use Let's Encrypt para HTTPS

### **Opção 3: Seu Próprio Servidor**
- Instale Node.js e npm
- Configure firewall
- Use PM2 para manter o servidor rodando
- Configure DNS apontando para seu IP

---

## ⚠️ PROBLEMAS COMUNS E SOLUÇÕES

### **Problema: "npm: command not found"**
**Solução:** Node.js não está instalado corretamente
```powershell
# Reinstale Node.js de https://nodejs.org/
# Depois reinicie o PowerShell
```

### **Problema: "EADDRINUSE: address already in use :::3000"**
**Solução:** Outra aplicação está usando porta 3000
```powershell
# Mude a porta no .env:
# PORT=3001
# Ou encerre o processo:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### **Problema: "Error: connect ECONNREFUSED"**
**Solução:** Servidor não está rodando
```powershell
# Verifique se npm start foi executado
npm start
```

### **Problema: E-mail não enviado**
**Solução:** Verifique o arquivo .env
1. Gmail requer "Senha de App" (não a senha normal)
2. Verifique 2FA está ativado: https://myaccount.google.com/
3. Veja os logs: `cat logs/servidor.log`

### **Problema: "Cannot find module 'express'"**
**Solução:** Dependências não instaladas
```powershell
npm install
```

---

## 📊 DADOS E RELATÓRIOS

### **Onde os dados são salvos?**

1. **LocalStorage (Navegador)** - Progresso da sessão
2. **JSON (Servidor)** - `data/relatorios.json`
3. **E-mail** - Cópia para usuário e psicólogo
4. **Uploads** - PDF e XLSX temporários

### **Como acessar relatórios salvos?**

```powershell
# Ver lista de relatórios no servidor
curl http://localhost:3000/api/relatorios

# Ver arquivo JSON direto
cat data/relatorios.json
```

---

## 🔐 CHECKLIST PRÉ-PUBLICAÇÃO

- [ ] Node.js v14+ instalado
- [ ] npm install executado com sucesso
- [ ] .env configurado com senha de app do Gmail
- [ ] Servidor testado localmente (npm start)
- [ ] Formulário preenchido completamente
- [ ] E-mail recebido com sucesso
- [ ] PDF gerado e aberto corretamente
- [ ] XLSX gerado e aberto corretamente
- [ ] Logs verificados para erros
- [ ] HTTPS configurado (se em produção)

---

## 📞 SUPORTE E CONTATO

**Psicólogo Responsável:** Luís Bernardo  
**Email:** psicologoluisbernardo@gmail.com  
**Versão:** 3.0 Premium Final  
**Última Atualização:** 17/11/2025

---

## 📝 CHANGELOG

### v3.0 - 17/11/2025
- ✅ Backend completo com Express
- ✅ Nodemailer integrado
- ✅ Validação robusta de campos
- ✅ Sistema de logs
- ✅ Documentação completa

### v2.0
- Geração de PDF e XLSX
- Gamificação com prêmios

### v1.0
- Versão inicial do formulário

---

## 📄 LICENÇA

Propriedade de Royalty Families - Todos os direitos reservados  
Uso exclusivo para fins terapêuticos e educacionais

---

**Desenvolvido com ❤️ para saúde mental e bem-estar**
