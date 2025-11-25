// ============================================
// BACKEND ROYALTY FAMILIES - NODE.JS/EXPRESS
// Para deploy no Replit ou qualquer servidor Node
// ============================================

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Configuração do Nodemailer (Gmail ou seu provedor)
const transporter = nodemailer.createTransport({
    service: 'gmail', // ou seu provedor de email
    auth: {
        user: process.env.EMAIL_USER || 'psicologoluisbernardo@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'sua_senha_ou_app_password' // Use variável de ambiente!
    }
});

// ============================================
// ROTA: Receber dados e enviar email
// ============================================

app.post('/api/enviar-relatorio', async (req, res) => {
    try {
        const { userName, userEmail, pdfBase64, xlsxBase64, formData, nomeArquivo } = req.body;

        // Validações
        if (!userName || !userEmail || !formData) {
            return res.status(400).json({ erro: 'Dados incompletos' });
        }

        console.log(`📨 Novo relatório recebido de: ${userName} (${userEmail})`);

        // Converter Base64 para Buffer para anexos
        const pdfBuffer = Buffer.from(pdfBase64 || '', 'base64');
        const xlsxBuffer = Buffer.from(xlsxBase64 || '', 'base64');

        // Email para o usuário
        const mailOptionsUser = {
            from: 'psicologoluisbernardo@gmail.com',
            to: userEmail,
            subject: `Seu Relatório de Prevenção - ${new Date().toLocaleDateString('pt-BR')}`,
            html: `
                <h2>Olá ${userName},</h2>
                
                <p>Seus arquivos de relatório foram gerados com sucesso!</p>
                
                <h3>📄 Arquivos anexados:</h3>
                <ul>
                    <li>${nomeArquivo || 'Relatorio'}.pdf</li>
                    <li>${nomeArquivo || 'Relatorio'}.xlsx</li>
                </ul>
                
                <h3>📋 Dados do Relatório:</h3>
                <ul>
                    <li><strong>Nome:</strong> ${userName}</li>
                    <li><strong>Email:</strong> ${userEmail}</li>
                    <li><strong>Pontuação:</strong> ${formData.pontuacao || 0} pontos</li>
                    <li><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</li>
                </ul>
                
                <p><strong>Confidencialidade garantida por LGPD/GDPR/CCPA.</strong></p>
                
                <p>Atenciosamente,<br>
                Psicólogo Luis Antonio Silva Bernardo<br>
                CRP 19/004142<br>
                Royalty Families</p>
            `,
            attachments: [
                {
                    filename: `${nomeArquivo || 'Relatorio'}.pdf`,
                    content: pdfBuffer,
                    encoding: 'base64'
                },
                {
                    filename: `${nomeArquivo || 'Relatorio'}.xlsx`,
                    content: xlsxBuffer,
                    encoding: 'base64'
                }
            ]
        };

        // Email para o psicólogo (cópia)
        const mailOptionsPsychologist = {
            from: 'psicologoluisbernardo@gmail.com',
            to: 'psicologoluisbernardo@gmail.com',
            subject: `[NOVO RELATÓRIO] ${userName} - ${new Date().toLocaleDateString('pt-BR')}`,
            html: `
                <h2>Novo Relatório Recebido</h2>
                
                <h3>👤 Informações do Cliente:</h3>
                <ul>
                    <li><strong>Nome:</strong> ${userName}</li>
                    <li><strong>Email:</strong> ${userEmail}</li>
                    <li><strong>Telefone:</strong> ${formData.telefone || 'N/A'}</li>
                    <li><strong>Diagnóstico:</strong> ${formData.diagnostico || 'N/A'}</li>
                </ul>
                
                <h3>📊 Resultado:</h3>
                <ul>
                    <li><strong>Pontuação:</strong> ${formData.pontuacao || 0} pontos</li>
                    <li><strong>Data de Finalização:</strong> ${formData.dataFinalizacao || new Date().toLocaleString('pt-BR')}</li>
                </ul>
                
                <h3>📋 Resumo dos Dados:</h3>
                <pre>${JSON.stringify(formData, null, 2).substring(0, 2000)}...</pre>
                
                <p><strong>Arquivos anexados ao relatório do cliente.</strong></p>
            `,
            attachments: [
                {
                    filename: `${nomeArquivo || 'Relatorio'}.pdf`,
                    content: pdfBuffer,
                    encoding: 'base64'
                },
                {
                    filename: `${nomeArquivo || 'Relatorio'}.xlsx`,
                    content: xlsxBuffer,
                    encoding: 'base64'
                }
            ]
        };

        // Enviar ambos os emails em paralelo
        const [resultUser, resultPsychologist] = await Promise.all([
            transporter.sendMail(mailOptionsUser),
            transporter.sendMail(mailOptionsPsychologist)
        ]);

        console.log(`✅ Email enviado para: ${userEmail}`);
        console.log(`✅ Cópia armazenada em: psicologoluisbernardo@gmail.com`);

        // Responder com sucesso
        return res.status(200).json({
            sucesso: true,
            mensagem: 'Relatório enviado com sucesso!',
            idUser: resultUser.messageId,
            idPsychologist: resultPsychologist.messageId
        });

    } catch (error) {
        console.error('❌ Erro ao enviar email:', error.message);
        return res.status(500).json({
            sucesso: false,
            erro: error.message,
            mensagem: 'Erro ao processar o relatório'
        });
    }
});

// ============================================
// ROTA DE TESTE
// ============================================

app.get('/api/status', (req, res) => {
    res.json({ status: 'Backend Royalty Families operacional ✅' });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📧 Email configurado: ${process.env.EMAIL_USER || 'psicologoluisbernardo@gmail.com'}`);
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promise rejection não tratada:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Exceção não tratada:', error);
});
