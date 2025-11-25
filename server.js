/**
 * GUIA DE PREVENÇÃO ROYALTY FAMILIES - BACKEND
 * Servidor Node.js com Express para receber relatórios e enviar e-mails
 * 
 * VERSÃO: 1.0
 * DATA: 17/11/2025
 */

const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ============================================
// CONFIGURAÇÃO DE MIDDLEWARE
// ============================================

// CORS configuração - ABERTO TEMPORARIAMENTE PARA DEBUG
const corsOptions = {
    origin: '*', // Aceitar todas as origens temporariamente
    credentials: false,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware adicional para CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));

// Configurar multer para upload de arquivos
const upload = multer({
    dest: path.join(__dirname, 'uploads'),
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB
    }
});

// Criar pastas se não existirem
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
    fs.mkdirSync(path.join(__dirname, 'uploads'), { recursive: true });
}

if (!fs.existsSync(path.join(__dirname, 'logs'))) {
    fs.mkdirSync(path.join(__dirname, 'logs'), { recursive: true });
}

// ============================================
// CONFIGURAÇÃO DE E-MAIL (NODEMAILER)
// ============================================

// Configurar com variáveis de ambiente
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Testar conexão ao iniciar
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ ERRO ao conectar ao Gmail:', error.message);
        console.error('Verifique se EMAIL_USER e EMAIL_PASSWORD estão corretos nos Secrets');
    } else {
        console.log('✅ Serviço de e-mail conectado com sucesso!');
        console.log(`📧 Email configurado como: ${process.env.EMAIL_USER}`);
    }
});

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

function registrarLog(tipo, mensagem, dados = {}) {
    const timestamp = new Date().toLocaleString('pt-BR');
    const logMessage = `[${timestamp}] [${tipo}] ${mensagem}\n`;
    const logFile = path.join(__dirname, 'logs', 'servidor.log');
    
    fs.appendFileSync(logFile, logMessage);
    console.log(logMessage);
}

function validarDados(dados) {
    const erros = [];
    
    if (!dados.nome || dados.nome.trim() === '') {
        erros.push('Nome é obrigatório');
    }
    if (!dados.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
        erros.push('Email inválido');
    }
    if (!dados.telefone || dados.telefone.trim() === '') {
        erros.push('Telefone é obrigatório');
    }
    
    return erros;
}

// ============================================
// ROTAS
// ============================================

// Rota de health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        mensagem: 'Servidor Royalty Prevention está funcionando',
        timestamp: new Date().toISOString()
    });
});

// Rota principal para receber relatórios
app.post('/api/enviar-relatorio', upload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'xlsx', maxCount: 1 }
]), async (req, res) => {
    try {
        console.log('\n📨 Recebida nova solicitação de envio de relatório');
        
        const { nome, email, telefone, pontuacao, dataFinalizacao } = req.body;
        
        // Validar dados
        const erros = validarDados({ nome, email, telefone });
        if (erros.length > 0) {
            registrarLog('ERRO', `Validação falhou: ${erros.join(', ')}`);
            return res.status(400).json({
                sucesso: false,
                erro: 'Dados inválidos',
                detalhes: erros
            });
        }
        
        // Verificar se os arquivos foram recebidos
        if (!req.files || !req.files.pdf || !req.files.xlsx) {
            registrarLog('ERRO', 'Arquivos não recebidos');
            return res.status(400).json({
                sucesso: false,
                erro: 'Arquivos PDF e XLSX são obrigatórios'
            });
        }
        
        const pdfFile = req.files.pdf[0];
        const xlsxFile = req.files.xlsx[0];
        
        registrarLog('INFO', `Processando relatório para: ${nome} (${email})`);
        
        // Preparar attachments
        const attachments = [
            {
                filename: pdfFile.originalname || 'Relatorio.pdf',
                path: pdfFile.path
            },
            {
                filename: xlsxFile.originalname || 'Relatorio.xlsx',
                path: xlsxFile.path
            }
        ];
        
        // Preparar e-mail para o usuário
        const mailOpcoesUsuario = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: '📊 Seu Relatório de Prevenção Royalty Families',
            html: `
                <h2>Olá, ${nome}!</h2>
                <p>Seus relatórios de automonitoramento foram gerados com sucesso!</p>
                
                <h3>Informações do Relatório:</h3>
                <ul>
                    <li><strong>Data de Finalização:</strong> ${dataFinalizacao}</li>
                    <li><strong>Pontuação Total:</strong> ${pontuacao} pontos</li>
                    <li><strong>Arquivos Anexados:</strong> PDF e Planilha Excel</li>
                </ul>
                
                <h3>Próximos Passos:</h3>
                <ol>
                    <li>Salve seus arquivos em local seguro</li>
                    <li>Compartilhe o PDF com seu psicólogo para análise personalizada</li>
                    <li>Use a planilha Excel para acompanhar sua evolução ao longo do tempo</li>
                </ol>
                
                <h3>Informações de Contato:</h3>
                <p>
                    <strong>Psicólogo Responsável:</strong> Luís Bernardo<br>
                    <strong>Email:</strong> ${process.env.EMAIL_USER}<br>
                    <strong>Confidencialidade:</strong> Seus dados são protegidos por sigilo profissional e conformidade LGPD/GDPR/CCPA
                </p>
                
                <hr>
                <p style="color: #666; font-size: 12px;">
                    Este é um e-mail automático. Por favor, não responda diretamente. 
                    Para suporte, entre em contato através do email acima.
                </p>
            `,
            attachments: attachments
        };
        
        // Preparar e-mail para o psicólogo (cópia)
        const mailOpcoesPsicologo = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `📊 Novo Relatório Recebido - ${nome}`,
            html: `
                <h2>Novo Relatório Recebido</h2>
                <p>Um novo relatório de prevenção foi completado e enviado.</p>
                
                <h3>Informações do Paciente:</h3>
                <ul>
                    <li><strong>Nome:</strong> ${nome}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Telefone:</strong> ${telefone}</li>
                    <li><strong>Pontuação:</strong> ${pontuacao} pontos</li>
                    <li><strong>Data de Finalização:</strong> ${dataFinalizacao}</li>
                </ul>
                
                <h3>Arquivos Anexados:</h3>
                <ul>
                    <li>Relatório em PDF (formatado para impressão)</li>
                    <li>Planilha em Excel (para análise de dados)</li>
                </ul>
                
                <p>Revise os dados e entre em contato com o paciente para discussão personalizada.</p>
            `,
            attachments: attachments
        };
        
        // Enviar e-mails
        try {
            await transporter.sendMail(mailOpcoesUsuario);
            registrarLog('SUCESSO', `E-mail enviado para usuário: ${email}`);
            
            await transporter.sendMail(mailOpcoesPsicologo);
            registrarLog('SUCESSO', `Cópia enviada para psicólogo`);
        } catch (emailError) {
            registrarLog('AVISO', `Erro ao enviar e-mail: ${emailError.message}. Arquivos ainda foram salvos.`);
        }
        
        // Salvar dados em banco de dados (JSON por enquanto)
        try {
            const dbFile = path.join(__dirname, 'data', 'relatorios.json');
            if (!fs.existsSync(path.join(__dirname, 'data'))) {
                fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
            }
            
            let relatorios = [];
            if (fs.existsSync(dbFile)) {
                relatorios = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
            }
            
            relatorios.push({
                id: Date.now(),
                nome,
                email,
                telefone,
                pontuacao,
                dataFinalizacao,
                dataRecebimento: new Date().toISOString(),
                pdfFile: pdfFile.filename,
                xlsxFile: xlsxFile.filename
            });
            
            fs.writeFileSync(dbFile, JSON.stringify(relatorios, null, 2));
            registrarLog('INFO', 'Dados salvos no banco de dados JSON');
        } catch (dbError) {
            registrarLog('AVISO', `Erro ao salvar no banco de dados: ${dbError.message}`);
        }
        
        // Responder com sucesso
        return res.json({
            sucesso: true,
            mensagem: 'Relatório recebido e processado com sucesso',
            dados: {
                nome,
                email,
                pontuacao,
                dataFinalizacao
            }
        });
        
    } catch (erro) {
        registrarLog('ERRO', `Erro não tratado: ${erro.message}`);
        console.error(erro);
        
        return res.status(500).json({
            sucesso: false,
            erro: 'Erro interno do servidor',
            mensagem: erro.message
        });
    }
});

// Rota para listar relatórios (apenas local)
app.get('/api/relatorios', (req, res) => {
    try {
        const dbFile = path.join(__dirname, 'data', 'relatorios.json');
        
        if (!fs.existsSync(dbFile)) {
            return res.json({ relatorios: [] });
        }
        
        const relatorios = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
        res.json({ relatorios });
    } catch (erro) {
        registrarLog('ERRO', `Erro ao ler relatórios: ${erro.message}`);
        res.status(500).json({ erro: 'Erro ao listar relatórios' });
    }
});

// Servir arquivos estáticos da pasta atual
app.use(express.static(__dirname));

// Rota para servir a página HTML
app.get('/', (req, res) => {
    const htmlFile = path.join(__dirname, 'Prevencao-Royalty_publicar_17_11_25.html');
    if (fs.existsSync(htmlFile)) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.sendFile(htmlFile);
    } else {
        res.send('<h1>Servidor Royalty Prevention está funcionando</h1><p>Verifique se o arquivo HTML está na mesma pasta.</p>');
    }
});

// Tratamento de erros 404
app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada',
        url: req.url,
        metodo: req.method
    });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    registrarLog('SUCESSO', `🚀 Servidor Royalty Prevention iniciado`);
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📊 GUIA DE PREVENÇÃO ROYALTY FAMILIES`);
    console.log(`✅ Servidor rodando em: http://localhost:${PORT}`);
    console.log(`${'='.repeat(60)}\n`);
});

// Tratamento de erro não capturado
process.on('uncaughtException', (erro) => {
    registrarLog('ERRO_CRITICO', `Exceção não tratada: ${erro.message}`);
    console.error(erro);
});

module.exports = app;
