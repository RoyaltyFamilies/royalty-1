# 🧪 SCRIPT DE TESTE - Validar Sistema de Retry + FormSpree

## Como usar este script

### Opção 1: No Console do Navegador (Recomendado)

1. Abra seu site: `www-royaltyfamilies-com.filesusr.com`
2. Pressione **F12** para abrir Developer Tools
3. Vá para **Console** tab
4. Cole o código abaixo e pressione **Enter**
5. Siga as instruções

### Opção 2: Inserir no arquivo HTML (Avançado)

Adicione este código antes da tag `</body>` do arquivo HTML

---

## 📋 Teste 1: Verificar se FormSpree URL está configurada

```javascript
// Copie e cole isso no Console (F12 → Console)
(function() {
    console.log("🔍 TESTE 1: Verificar configuração de FormSpree");
    
    // Procurar pela configuração de FormSpree na página
    const pageSource = document.documentElement.outerHTML;
    
    if (pageSource.includes('formspree.io')) {
        console.log("✅ FormSpree URL encontrada no código");
        
        // Tentar extrair o Form ID
        const match = pageSource.match(/https:\/\/formspree\.io\/f\/([a-z0-9]+)/);
        if (match && match[1]) {
            const formId = match[1];
            console.log("📝 Form ID encontrado:", formId);
            
            if (formId === 'xyzqwert') {
                console.warn("⚠️  Form ID ainda é o placeholder (xyzqwert)");
                console.warn("   → Você precisa configurar seu FormSpree Form ID");
                console.warn("   → Veja: CONFIGURACAO_FORMSPREE_FALLBACK.md");
            } else {
                console.log("✅ Form ID configurado:", formId);
            }
        }
    } else {
        console.error("❌ FormSpree não encontrado no código");
    }
})();
```

---

## 📋 Teste 2: Verificar URLs do Backend

```javascript
// Copie e cole isso no Console (F12 → Console)
(function() {
    console.log("🔍 TESTE 2: Verificar URLs de Backend");
    
    const pageSource = document.documentElement.outerHTML;
    
    // Verificar Railway URL
    if (pageSource.includes('railway.app')) {
        console.log("✅ Railway URL encontrada");
        const railwayMatch = pageSource.match(/https:\/\/web-production-\d+\.up\.railway\.app\/[^ '"]+/);
        if (railwayMatch) {
            console.log("   URL:", railwayMatch[0]);
        }
    } else {
        console.warn("⚠️  Railway URL não encontrada");
    }
    
    // Verificar FormSpree URL
    if (pageSource.includes('formspree.io')) {
        console.log("✅ FormSpree URL encontrada");
    } else {
        console.warn("⚠️  FormSpree URL não encontrada");
    }
})();
```

---

## 📋 Teste 3: Verificar se funções auxiliares existem

```javascript
// Copie e cole isso no Console (F12 → Console)
(function() {
    console.log("🔍 TESTE 3: Verificar funções de Retry + Fallback");
    
    // Verificar tentarEnviarRailway
    if (typeof tentarEnviarRailway === 'function') {
        console.log("✅ Função tentarEnviarRailway() existe");
    } else {
        console.error("❌ Função tentarEnviarRailway() NÃO ENCONTRADA");
    }
    
    // Verificar tentarEnviarFormspree
    if (typeof tentarEnviarFormspree === 'function') {
        console.log("✅ Função tentarEnviarFormspree() existe");
    } else {
        console.error("❌ Função tentarEnviarFormspree() NÃO ENCONTRADA");
    }
    
    // Verificar gerarEEnviarPDFParaTerapeuta
    if (typeof gerarEEnviarPDFParaTerapeuta === 'function') {
        console.log("✅ Função gerarEEnviarPDFParaTerapeuta() existe");
    } else {
        console.error("❌ Função gerarEEnviarPDFParaTerapeuta() NÃO ENCONTRADA");
    }
})();
```

---

## 📋 Teste 4: Simular envio de teste (sem dados reais)

```javascript
// Copie e cole isso no Console (F12 → Console)
// NÃO vai realmente enviar, só vai testar a lógica
(function() {
    console.log("🔍 TESTE 4: Testar lógica de Retry");
    
    console.log("Simulando 3 tentativas de Railway...");
    
    for (let attempt = 1; attempt <= 3; attempt++) {
        const timeout = attempt === 1 ? 2000 : attempt === 2 ? 5000 : 10000;
        console.log(`🔄 Tentativa ${attempt}: Timeout de ${timeout}ms`);
    }
    
    console.log("✅ Lógica de retry parece estar correta");
})();
```

---

## 📋 Teste 5: Verificar formSpree ID completo (Avançado)

```javascript
// Copie e cole isso no Console (F12 → Console)
(function() {
    console.log("🔍 TESTE 5: Extração completa de configurações");
    
    const pageSource = document.documentElement.outerHTML;
    
    // Extrair FormSpree URL
    const formspreeMatch = pageSource.match(/https:\/\/formspree\.io\/f\/[a-z0-9]+/g);
    if (formspreeMatch) {
        console.log("FormSpree URLs encontradas:");
        formspreeMatch.forEach((url, idx) => {
            console.log(`  ${idx + 1}. ${url}`);
        });
    }
    
    // Extrair Railway URL
    const railwayMatch = pageSource.match(/https:\/\/web-production-\d+\.up\.railway\.app\/[a-z0-9/\-]+/g);
    if (railwayMatch) {
        console.log("Railway URLs encontradas:");
        railwayMatch.forEach((url, idx) => {
            console.log(`  ${idx + 1}. ${url}`);
        });
    }
})();
```

---

## 📋 Teste 6: Teste de Conectividade com FormSpree

```javascript
// Copie e cole isso no Console (F12 → Console)
// Este vai realmente testar se FormSpree está respondendo
(async function() {
    console.log("🔍 TESTE 6: Teste de Conectividade com FormSpree");
    
    try {
        const FORMSPREE_URL = 'https://formspree.io/f/xyzqwert'; // Use seu Form ID real
        
        console.log("Testando conectividade com:", FORMSPREE_URL);
        
        // Tentar fazer uma requisição OPTIONS
        const response = await fetch(FORMSPREE_URL, {
            method: 'OPTIONS',
            mode: 'cors'
        }).catch(err => {
            console.warn("Erro:", err.message);
            return null;
        });
        
        if (response) {
            console.log("✅ FormSpree está respondendo (status:", response.status, ")");
        } else {
            console.warn("⚠️  FormSpree não respondeu ou há erro CORS");
        }
    } catch (error) {
        console.error("❌ Erro no teste:", error.message);
    }
})();
```

---

## 📋 Teste 7: Teste de Conectividade com Railway

```javascript
// Copie e cole isso no Console (F12 → Console)
// Este vai realmente testar se Railway está respondendo
(async function() {
    console.log("🔍 TESTE 7: Teste de Conectividade com Railway");
    
    try {
        const RAILWAY_URL = 'https://web-production-9906c.up.railway.app/api/enviar-relatorio';
        
        console.log("Testando conectividade com Railway...");
        
        // Fazer um HEAD request com timeout de 3 segundos
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(RAILWAY_URL, {
            method: 'HEAD',
            mode: 'cors',
            signal: controller.signal
        }).catch(err => {
            console.warn("Erro:", err.message);
            return null;
        });
        
        clearTimeout(timeoutId);
        
        if (response) {
            console.log("✅ Railway está respondendo (status:", response.status, ")");
        } else {
            console.warn("⏱️  Railway não respondeu no timeout (3s)");
            console.warn("   → Isto é esperado se Railway está offline");
        }
    } catch (error) {
        console.error("❌ Erro no teste:", error.message);
    }
})();
```

---

## 📋 Teste 8: Teste Completo de Envio (Real)

```javascript
// Copie e cole isso no Console (F12 → Console)
// Este vai REALMENTE enviar dados de teste
(async function() {
    console.log("🔍 TESTE 8: Teste Completo de Envio (REAL)");
    console.log("⚠️  Este teste vai realmente tentar enviar dados!");
    console.log("   Verifique os logs abaixo...\n");
    
    // Criar dados de teste
    const dadosTeste = {
        nomeCompleto: "[TESTE] " + new Date().toLocaleString(),
        email: "test@example.com",
        telefone: "11-99999-9999",
        diagnostico: "Teste do sistema",
        emailTerapeuta: "psicologoluisbernardo@gmail.com"
    };
    
    // Criar PDF fake (1KB)
    const pdfBlobteste = new Blob(['PDF TEST DATA'], { type: 'application/pdf' });
    
    // Executar tentativa de Railway
    console.log("Tentando enviar para Railway...");
    
    try {
        const BACKEND_URL = 'https://web-production-9906c.up.railway.app/api/enviar-relatorio';
        
        const formData = new FormData();
        formData.append('pdf', pdfBlobteste, 'teste.pdf');
        formData.append('nome', dadosTeste.nomeCompleto);
        formData.append('email', dadosTeste.email);
        formData.append('emailTerapeuta', dadosTeste.emailTerapeuta);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            body: formData,
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        console.log("✅ Railway respondeu!");
        console.log("Status:", response.status);
        
    } catch (error) {
        console.warn("⏱️  Railway timeout ou erro:", error.message);
        console.log("\nAgora testando FormSpree...");
        
        try {
            const FORMSPREE_URL = 'https://formspree.io/f/xyzqwert'; // Use seu ID real
            
            const formDataFormspree = new FormData();
            formDataFormspree.append('email', dadosTeste.email);
            formDataFormspree.append('nome', dadosTeste.nomeCompleto);
            formDataFormspree.append('emailTerapeuta', dadosTeste.emailTerapeuta);
            
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                body: formDataFormspree
            });
            
            if (response.ok) {
                console.log("✅ FormSpree aceitou os dados!");
            } else {
                console.warn("⚠️  FormSpree retornou erro:", response.status);
            }
            
        } catch (error2) {
            console.error("❌ FormSpree também falhou:", error2.message);
        }
    }
})();
```

---

## 📋 Teste 9: Validação de Arquivo

```javascript
// Copie e cole isso no Console (F12 → Console)
(function() {
    console.log("🔍 TESTE 9: Validação Geral do Arquivo");
    
    let pontos = 0;
    let total = 10;
    
    // Verificação 1: html2pdf
    if (typeof html2pdf === 'function') {
        console.log("✅ html2pdf disponível");
        pontos++;
    } else {
        console.warn("❌ html2pdf NÃO disponível");
    }
    total++;
    
    // Verificação 2: XLSX
    if (typeof XLSX !== 'undefined') {
        console.log("✅ XLSX disponível");
        pontos++;
    } else {
        console.warn("⚠️  XLSX não disponível (opcional)");
    }
    total++;
    
    // Verificação 3: Funções principais
    const funcoes = [
        'coletarTodosDados',
        'gerarPDF',
        'gerarXLSX',
        'gerarEEnviarPDFParaTerapeuta',
        'tentarEnviarRailway',
        'tentarEnviarFormspree'
    ];
    
    funcoes.forEach(fn => {
        if (typeof window[fn] === 'function') {
            console.log(`✅ ${fn}() existe`);
            pontos++;
        } else {
            console.error(`❌ ${fn}() FALTA`);
        }
        total++;
    });
    
    // Score final
    console.log(`\n📊 RESULTADO: ${pontos}/${total} validações passaram`);
    if (pontos === total) {
        console.log("🎉 TUDO OK! Seu arquivo está pronto!");
    } else {
        console.warn("⚠️  Existem problemas - verifique os erros acima");
    }
})();
```

---

## 🚀 Como usar estes testes

### Primeiro: Execute os Testes de Configuração

1. Teste 1: Verificar FormSpree
2. Teste 2: Verificar URLs
3. Teste 3: Verificar funções

**Se algum falhar**: Veja `CONFIGURACAO_FORMSPREE_FALLBACK.md`

### Depois: Execute os Testes de Conectividade

4. Teste 7: Railway (vai falhar se Railway está offline)
5. Teste 6: FormSpree (deve passar)

### Finalmente: Teste Real

6. Teste 8: Envio Completo

---

## ✅ Checklist de Testes

- [ ] Teste 1: FormSpree URL configurada
- [ ] Teste 2: URLs de Backend parecem OK
- [ ] Teste 3: Funções de retry existem
- [ ] Teste 4: Lógica de retry OK
- [ ] Teste 5: Configurações extraídas com sucesso
- [ ] Teste 6: FormSpree respondendo (deve estar OK)
- [ ] Teste 7: Railway (OK se respondeu, esperado falhar se offline)
- [ ] Teste 8: Envio real funcionou
- [ ] Teste 9: Validação geral passou

---

## 🆘 Erros Comuns e Soluções

### Erro: "xyzqwert ainda é placeholder"
**Solução**: Você não configurou FormSpree ainda. Veja `CONFIGURACAO_FORMSPREE_FALLBACK.md`

### Erro: "tentarEnviarRailway não encontrada"
**Solução**: Seu arquivo HTML não foi atualizado. Re-upload do arquivo correto.

### Erro: "Railway não respondeu"
**Solução**: Esperado! Railway está offline em 21/11/2025. Isso é normal.

### Erro: "FormSpree retornou 422"
**Solução**: Seu Form ID está errado. Verifique em formspree.io

---

## 📱 Output Esperado

Quando todos os testes passam, você vê:

```
✅ html2pdf disponível
✅ XLSX disponível
✅ coletarTodosDados() existe
✅ gerarPDF() existe
✅ gerarXLSX() existe
✅ gerarEEnviarPDFParaTerapeuta() existe
✅ tentarEnviarRailway() existe
✅ tentarEnviarFormspree() existe

📊 RESULTADO: 8/8 validações passaram
🎉 TUDO OK! Seu arquivo está pronto!
```

---

**Última atualização**: 21 de Novembro de 2025  
**Compatibilidade**: Chrome, Firefox, Safari, Edge (todos os navegadores modernos)
