# 📋 Como Adicionar Novos Terapeutas

## 🎯 Objetivo
Adicionar novos terapeutas à lista suspensa de seleção na Seção "Seus Dados Pessoais" do formulário.

## 📍 Localização no Código
Abra o arquivo `Prevenção_Royalty_18_11_25.html` e procure pela seção:

```
// ============================================
// BASE DE DADOS DE TERAPEUTAS
```

Esta se encontra por volta da **linha 4110** (procure por `const terapeutas = [`).

## ✏️ Como Editar

### Exemplo Atual (linhas 4110-4113):
```javascript
const terapeutas = [
    { nome: "Psicólogo Luis Bernardo", email: "psicologoluisbenardo@gmail.com", especialidade: "Prevenção de Recaída" },
    { nome: "Adicionar novo terapeuta", email: "", especialidade: "" }
];
```

### Como Adicionar um Novo Terapeuta:

**Passo 1:** Localize a seção `const terapeutas = [`

**Passo 2:** Copie e cole o modelo abaixo ANTES da vírgula (,) do último terapeuta:

```javascript
{ nome: "NOME DO TERAPEUTA AQUI", email: "email@exemplo.com", especialidade: "ESPECIALIDADE" },
```

### Exemplo Completo (adicionando 2 novos terapeutas):

```javascript
const terapeutas = [
    { nome: "Psicólogo Luis Bernardo", email: "psicologoluisbenardo@gmail.com", especialidade: "Prevenção de Recaída" },
    { nome: "Dra. Maria Silva", email: "maria.silva@exemplo.com", especialidade: "Psicologia Clínica" },
    { nome: "Dr. João Santos", email: "joao.santos@exemplo.com", especialidade: "Terapia Cognitiva" }
];
```

## ⚙️ Campos Obrigatórios

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| **nome** | Nome completo do terapeuta | "Psicólogo Luis Bernardo" |
| **email** | Email para receber os PDFs | "psicologoluisbenardo@gmail.com" |
| **especialidade** | Especialidade/área de atuação | "Prevenção de Recaída" |

## 🔍 O Que Acontece Quando um Paciente Seleciona um Terapeuta?

1. ✅ O nome aparece no dropdown da Seção "Seus Dados Pessoais"
2. ✅ Quando o paciente clica em "Finalizar", o PDF é gerado
3. ✅ O PDF é enviado por email para o endereço do terapeuta selecionado
4. ✅ Assunto do email: "Paciente fez plano de prevenção"

## ⚠️ Importante

- **Não remova** a linha do "Psicólogo Luis Bernardo" (ele é o padrão)
- **Certifique-se** que o email está **correto e válido**
- **Não coloque** caracteres especiais (ç, ã, etc) nos emails
- **Salve o arquivo** após fazer mudanças
- **Atualize o navegador** (F5) para ver as mudanças

## 🧪 Teste

Para testar se funcionou:

1. Abra o formulário no navegador
2. Vá para "Seus Dados Pessoais"
3. Clique no dropdown de "Terapeuta Responsável"
4. Você deve ver todos os terapeutas que adicionou
5. Selecione um e continue preenchendo
6. Clique em "Finalizar"
7. Verifique se o email foi recebido no endereço correto

## 🆘 Resolução de Problemas

**P: Adicionei um terapeuta mas não aparece no dropdown**
R: 
- Verifique se salvou o arquivo
- Atualize a página (F5) no navegador
- Verifique se não há erros de sintaxe (vírgulas faltando, parênteses)

**P: O email não foi enviado**
R:
- Verifique se o email está correto (sem espaços, caracteres especiais)
- Verifique a pasta SPAM
- Procure pelos logs no Console do navegador (F12)

**P: Quero remover um terapeuta**
R: Delete a linha inteira do terapeuta, inclusive a vírgula final

## 📧 Exemplo de Email Recebido

```
De: paciente@email.com (Nome do Paciente)
Para: terapeuta@email.com
Assunto: Paciente fez plano de prevenção
Anexo: Relatorio_Prevencao_Nome_Do_Paciente_2025-11-20.pdf
```

---

**Dúvidas?** Consulte o código comentado na seção "GERAR E ENVIAR PDF PARA O TERAPEUTA" no arquivo HTML.
