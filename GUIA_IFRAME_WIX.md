# 🎯 GUIA: Implementação do IFRAME no Wix

## ✅ O que você já tem pronto:
- ✔️ Arquivo HTML: `Prevenção_Royalty_24_11_25.html` (7.100 linhas)
- ✔️ Código completo com LGPD/GDPR, auto-logout, PDF, email
- ✔️ Workspace configurado em modo local (Git removido)

---

## 📋 Passo 1: Upload do arquivo para Wix Files

### Local:
1. Abra seu site no **Wix Editor** (editor.wix.com)
2. Na barra lateral esquerda, clique em **"Gerenciar"** → **"Arquivos do Site"** (ou "Files")

### Ação:
3. Clique em **"Upload"** ou **"+ Adicionar Arquivos"**
4. Selecione: `Prevenção_Royalty_24_11_25.html`
5. **Aguarde** o upload terminar (deve mostrar 100%)

### Resultado esperado:
- O arquivo aparecerá na lista com um ícone
- Copie a URL que aparece (algo como: `https://www.royaltyfamilies.com/files/Prevenção_Royalty_24_11_25.html`)
- **Cole esta URL em um bloco de notas** - você usará nos próximos passos

**⏱️ Tempo estimado: 2-3 minutos**

---

## 📋 Passo 2: Voltar para a página da "Prevenção Royalty"

### Local:
1. Clique em **"Páginas"** na barra lateral
2. Encontre e clique na página que contém seu programa (ex: "Prevenção")

### Verificação:
- A página deve estar aberta no editor
- Você deve ver a página com o título e conteúdo

**⏱️ Tempo estimado: 30 segundos**

---

## 📋 Passo 3: Adicionar o código do IFRAME

### Opção A - Se você ainda tem o código HTML inline na página:

1. **Encontre o código HTML atual** (deve estar em um "Code Element")
2. **Selecione e delete TODO o conteúdo** do elemento

### Opção B - Se você quer adicionar em um novo elemento:

1. Clique no elemento vazio onde quer o programa
2. OU adicione um novo "HTML Code" clicando em **Adicionar Elemento** → **HTML Code**

### Cole este código (SUBSTITUA A URL):

```html
<!-- 🎯 IFRAME - Prevenção Royalty Families v24.11.25 -->
<iframe 
    id="prevencaoRoyalty"
    src="COLE_AQUI_A_URL_DO_ARQUIVO_WIX"
    style="
        width: 100%;
        height: 100vh;
        border: none;
        display: block;
        margin: 0;
        padding: 0;
    ">
</iframe>

<script>
    // Ajusta altura do iframe para a janela
    function ajustarAlturaIframe() {
        const iframe = document.getElementById('prevencaoRoyalty');
        if (iframe) {
            iframe.style.height = window.innerHeight + 'px';
        }
    }
    
    // Executa ao carregar
    window.addEventListener('load', ajustarAlturaIframe);
    
    // Ajusta se a janela mudar de tamanho
    window.addEventListener('resize', ajustarAlturaIframe);
</script>
```

### ⚠️ IMPORTANTE:
Substitua `COLE_AQUI_A_URL_DO_ARQUIVO_WIX` pela URL que você copiou no Passo 1.

**Exemplo de URL correta:**
```
https://www.royaltyfamilies.com/files/Prevenção_Royalty_24_11_25.html
```

**⏱️ Tempo estimado: 2-3 minutos**

---

## 📋 Passo 4: Testar tudo funcionando

### Desktop (Computador):
- [ ] Header fica fixo no topo durante scroll
- [ ] Consegue navegar entre as 8 páginas
- [ ] Pontos aumentam conforme preenche
- [ ] Botão "Enviar & Gerar PDF" funciona
- [ ] PDF abre em nova janela para imprimir/salvar

### Mobile (Celular):
- [ ] Layout responsivo, sem conteúdo cortado no topo
- [ ] Header não desaparece
- [ ] Todos os botões funcionam
- [ ] Campos de texto aceitam input

### Email:
- [ ] Após enviar, dados chegam em: `psicologoluisbernardo@gmail.com`
- [ ] Dados mostram as respostas do formulário

### Segurança:
- [ ] Após enviar, botão "Deletar meus dados" fica disponível
- [ ] Ao clicar em "Deletar meus dados", aparece confirmação
- [ ] Após 30 minutos sem atividade, deve pedir para fazer login novamente

**⏱️ Tempo estimado: 5-10 minutos**

---

## 📊 Checklist Final

Antes de publicar, verifique:

- [ ] Arquivo foi para Wix Files com sucesso
- [ ] URL do arquivo está correta no iframe code
- [ ] Código do iframe foi colado na página Wix
- [ ] Página abre sem erros
- [ ] Header fica fixo (problema resolvido!)
- [ ] Todas as 8 páginas do formulário funcionam
- [ ] PDF abre corretamente
- [ ] Email de envio funciona
- [ ] Dados deletam após envio
- [ ] Auto-logout de 30 min funciona
- [ ] Mobile responsivo

---

## 🚀 Passo 5: Publicar (FINAL)

Quando tudo estiver funcionando:

1. Clique em **"Publicar"** (botão azul no topo)
2. Clique em **"Publicar agora"**
3. Aguarde (pode levar 1-2 minutos)

✅ Seu programa agora estará online em: `www.royaltyfamilies.com`

---

## ❓ Se algo não funcionar:

### Problema: Iframe aparece branco/vazio
**Solução 1:** Verifique se a URL está correta
**Solução 2:** Verifique se o arquivo tem o nome exato
**Solução 3:** Aguarde 5 minutos (cache do Wix)
**Solução 4:** Recarregue a página (Ctrl+Shift+R)

### Problema: Header não fica fixo
**Solução:** Isso não deve mais acontecer com o iframe! Se acontecer, avise.

### Problema: PDF não abre
**Solução 1:** Verifique browser (Chrome, Firefox, Safari funcionam bem)
**Solução 2:** Desabilite popup blockers
**Solução 3:** Tente em navegação anônima (Ctrl+Shift+N)

### Problema: Email não chega
**Solução 1:** Verifique se o email digitado está correto
**Solução 2:** Verifique spam/lixo do Gmail
**Solução 3:** Verifique se Formspree está funcionando em: https://formspree.io/

---

## 📞 Próximas ações:

1. **Já foi feito:** Implementação LGPD/GDPR ✅
2. **Já foi feito:** Código preparado ✅
3. **Você faz agora:** Upload + iframe + teste ⬅️ VOCÊ ESTÁ AQUI
4. **Depois:** Contatar Formspree para DPA (se necessário)
5. **Depois:** Lançar programa para usuários reais

---

## 📝 Notas Importantes:

- **Versão do arquivo:** 24.11.25 (data: 24 de novembro de 2025)
- **Compatibilidade:** Funciona em Chrome, Firefox, Safari, Edge (mobile e desktop)
- **Dados:** Seguem LGPD/GDPR - deletam automaticamente após envio
- **Segurança:** Usa sessionStorage (mais seguro que localStorage)
- **Suporte:** Entre em contato se tiver dúvidas

---

**Boa sorte! 🚀 O programa está pronto para o mundo!**
