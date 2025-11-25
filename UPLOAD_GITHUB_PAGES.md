# 🚀 INSTRUÇÕES FINAIS - Upload para GitHub + Ativar Pages

## ✅ Seu arquivo está pronto:
- **Nome:** `Prevenção_Royalty_24_11_25.html`
- **Tamanho:** 287 KB
- **Localização:** `C:\Users\psico\Desktop\Trabalho e Estudos_2023\Nossos Sites\Royalty Families\Videos e Projetos\Projetos de Aulas ou cursos\App e Programas\Prevenção Royalty\`

---

## 📋 Passo 1: Fazer upload para GitHub (VIA WEB)

1. Abra: **https://github.com/RoyaltyFamilies/royalty-1**
2. Clique em **"Add file"** → **"Upload files"**
3. Arraste ou selecione: `Prevenção_Royalty_24_11_25.html`
4. Clique em **"Commit changes"**

**Pronto!** Arquivo agora está no GitHub.

---

## 📋 Passo 2: Ativar GitHub Pages

1. Ainda no repositório, vá para **Settings** (Engrenagem)
2. Role para baixo até **"Pages"** (ou procure por "Pages" na barra de busca)
3. Em **"Source"**, selecione:
   - **Branch:** `master`
   - **Folder:** `/ (root)`
4. Clique em **"Save"**

GitHub vai processar por alguns segundos. Você verá uma mensagem verde:
```
✅ Your site is live at: https://RoyaltyFamilies.github.io/royalty-1/
```

---

## 📋 Passo 3: Copiar a URL do seu arquivo

A URL pública do seu arquivo será:

```
https://RoyaltyFamilies.github.io/royalty-1/Prevenção_Royalty_24_11_25.html
```

**⚠️ IMPORTANTE:** Se o nome do arquivo tiver caracteres especiais, GitHub pode converter automaticamente. A URL real pode ser:

```
https://RoyaltyFamilies.github.io/royalty-1/Preven%C3%A7%C3%A3o_Royalty_24_11_25.html
```

Depois que você fizer upload, **volte aqui e me avisa a URL exata** que apareceu. Vou colocar no iframe.

---

## 📋 Passo 4: Adicionar iframe no Wix

Quando estiver pronto com a URL do GitHub, vou preparar o código para colar no Wix:

```html
<iframe 
    id="prevencaoRoyalty"
    src="[URL_AQUI]"
    style="width: 100%; height: 100vh; border: none; display: block; margin: 0; padding: 0;">
</iframe>

<script>
    function ajustarAlturaIframe() {
        const iframe = document.getElementById('prevencaoRoyalty');
        if (iframe) {
            iframe.style.height = window.innerHeight + 'px';
        }
    }
    window.addEventListener('load', ajustarAlturaIframe);
    window.addEventListener('resize', ajustarAlturaIframe);
</script>
```

---

## ⏱️ Tempo estimado:
- Upload GitHub: 2 minutos
- Ativar Pages: 1 minuto
- Teste no Wix: 5 minutos
- **Total: ~8 minutos**

---

## 🎯 Próximas ações:

1. ✅ Faça upload do arquivo para GitHub
2. ✅ Ative GitHub Pages
3. ✅ Me mostre a URL exata
4. ⬜ Eu vou preparar o iframe final
5. ⬜ Você cola no Wix em "Incorporar código"
6. ⬜ Testamos tudo funcionando
7. ⬜ Publicar!

**Vá em frente! Depois me avisa quando estiver pronto!** 🚀
