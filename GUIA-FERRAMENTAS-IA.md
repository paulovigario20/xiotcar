# Guia de Ferramentas de Desenvolvimento Assistido por IA

**Para:** Designer gráfico que quer manter e evoluir o site Xiotecar
**Contexto:** Tem experiência em design mas não em programação web

---

## O Que São Code Assistants?

São ferramentas de inteligência artificial que ajudam a escrever, modificar e entender código. Funcionam como um "programador assistente" — o utilizador descreve em português o que quer e a IA gera ou modifica o código necessário.

Para alguém com experiência em design gráfico mas sem conhecimento de programação, estas ferramentas permitem:

- Alterar cores, fontes, espaçamentos e layouts do site
- Adicionar novas secções ou páginas
- Corrigir problemas sem entender o código em detalhe
- Aprender progressivamente como o código funciona

---

## Comparação de Ferramentas

### 🏆 Tier 1 — Recomendadas para Não-Programadores

#### Bolt.new (https://bolt.new)
**A melhor opção para quem não programa.**

| Aspeto | Detalhe |
|---|---|
| Preço | Grátis (limitado) / $20/mês (Pro) |
| Dificuldade | ⭐ Muito fácil |
| Como funciona | Abre no browser, sem instalar nada. Escreve o que quer em português e vê o resultado em tempo real. |
| Ideal para | Criar páginas novas, alterar design, adicionar funcionalidades simples |

**Porquê esta em primeiro:** Não precisa de instalar nada. Funciona 100% no browser. Mostra uma pré-visualização ao vivo do site enquanto faz alterações. É o mais parecido com "dizer o que quer e ver acontecer".

**Exemplo de uso:**
> "Muda a cor dos botões de amarelo para laranja e aumenta o tamanho do texto do preço nas fichas dos carros"

O Bolt altera o código e mostra o resultado imediatamente.

---

#### Lovable (https://lovable.dev)
**Semelhante ao Bolt, focado em design.**

| Aspeto | Detalhe |
|---|---|
| Preço | Grátis (limitado) / $20/mês |
| Dificuldade | ⭐ Muito fácil |
| Como funciona | Interface visual no browser, descreve o que quer, vê o resultado |
| Ideal para | Redesenhar páginas, criar layouts novos, prototipar |

**Vantagem sobre o Bolt:** Mais orientado para design visual. Permite fazer alterações com uma abordagem mais parecida com ferramentas de design como Figma ou Canva.

---

#### v0 by Vercel (https://v0.dev)
**Gerador de interfaces por IA da Vercel.**

| Aspeto | Detalhe |
|---|---|
| Preço | Grátis (limitado) / $20/mês |
| Dificuldade | ⭐⭐ Fácil |
| Como funciona | Descreve a interface que quer em texto, a IA gera componentes React + Tailwind |
| Ideal para | Gerar secções individuais do site que depois se copiam para o projeto |

**Útil para o Xiotecar porque:** O site usa exatamente as mesmas tecnologias que o v0 gera (React + Tailwind CSS). Pode pedir "cria um card de viatura com foto, preço e botão de contacto" e o código gerado encaixa diretamente no projeto.

---

### 🥈 Tier 2 — Boas, Mas Requerem Alguma Configuração

#### Cursor (https://cursor.com)
**Editor de código com IA integrada. O mais popular entre programadores.**

| Aspeto | Detalhe |
|---|---|
| Preço | Grátis (limitado) / $20/mês (Pro) |
| Dificuldade | ⭐⭐⭐ Moderada |
| Como funciona | É um editor de código (como o Visual Studio Code) com chat IA. Abre o projeto, pergunta o que quer mudar, a IA edita os ficheiros. |
| Ideal para | Modificar o código existente do Xiotecar, corrigir bugs, adicionar funcionalidades |

**Vantagem:** É o que melhor entende o contexto do projeto completo. Pode abrir toda a pasta do Xiotecar e dizer "muda o layout da página de viaturas para mostrar 4 colunas em vez de 3" e ele sabe exatamente que ficheiros editar.

**Desvantagem:** Precisa de instalar no computador e de abrir o projeto localmente. Mais intimidante para quem nunca usou um editor de código.

**Como começar:**
1. Descarregar de https://cursor.com
2. Instalar e abrir
3. File → Open Folder → selecionar a pasta `app/` do Xiotecar
4. Usar o chat (Ctrl+L) para pedir alterações em português

---

#### Windsurf (https://windsurf.com)
**Alternativa ao Cursor, também baseada no VS Code.**

| Aspeto | Detalhe |
|---|---|
| Preço | Grátis (generoso) / $15/mês |
| Dificuldade | ⭐⭐⭐ Moderada |
| Como funciona | Igual ao Cursor — editor com chat IA |
| Ideal para | Mesmo caso de uso que o Cursor, com plano grátis mais generoso |

---

#### GitHub Copilot (https://github.com/features/copilot)
**O assistente de código da Microsoft/GitHub.**

| Aspeto | Detalhe |
|---|---|
| Preço | $10/mês |
| Dificuldade | ⭐⭐⭐ Moderada |
| Como funciona | Plugin para Visual Studio Code. Sugere código enquanto se escreve e responde a perguntas no chat. |
| Ideal para | Quem já usa VS Code e quer sugestões automáticas |

**Nota:** É muito bom para programadores experientes. Para não-programadores, o Cursor ou Windsurf são mais acessíveis porque o chat é mais proeminente e orientado a conversação.

---

### 🥉 Tier 3 — Poderosas, Mas Para Utilizadores Mais Técnicos

#### Claude Code / Claude (https://claude.ai)
**O modelo de IA da Anthropic. Excelente para explicar e gerar código.**

| Aspeto | Detalhe |
|---|---|
| Preço | Grátis (limitado) / $20/mês (Pro) |
| Dificuldade | ⭐⭐ Fácil (chat) / ⭐⭐⭐⭐ (Claude Code CLI) |
| Como funciona | Chat no browser onde se pode colar código e pedir alterações. Claude Code é uma versão de terminal mais avançada. |
| Ideal para | Pedir explicações sobre o código, gerar ficheiros individuais, resolver problemas |

**Melhor uso para designer:** Copiar um ficheiro do projeto (ex: `Home.jsx`), colar no Claude, e pedir "muda as cores para tons de azul e adiciona uma secção de promoções". O Claude devolve o ficheiro modificado completo.

---

#### ChatGPT / Codex (https://chat.openai.com)
**O chatbot da OpenAI.**

| Aspeto | Detalhe |
|---|---|
| Preço | Grátis (GPT-4o limitado) / $20/mês (Plus) |
| Dificuldade | ⭐⭐ Fácil |
| Como funciona | Chat no browser, igual ao Claude |
| Ideal para | Perguntar "como faço X?" e obter código com explicação |

**Comparação com Claude:** Ambos são bons. O Claude tende a ser mais preciso com código React/Laravel. O ChatGPT tem uma interface mais familiar para a maioria das pessoas.

---

#### Replit (https://replit.com)
**Ambiente de desenvolvimento completo no browser com IA.**

| Aspeto | Detalhe |
|---|---|
| Preço | Grátis (limitado) / $25/mês |
| Dificuldade | ⭐⭐⭐ Moderada |
| Como funciona | Abre o projeto no browser, edita com ajuda de IA, e o site corre diretamente no Replit |
| Ideal para | Ter o projeto a correr sem instalar nada no computador |

---

## Recomendação Final

### Para Começar Hoje (Zero Instalação)

```
1º — Bolt.new (para alterações rápidas de design e funcionalidades)
2º — v0.dev (para gerar componentes novos)
3º — Claude.ai (para perguntar dúvidas e pedir código específico)
```

### Para Evoluir (Quando Se Sentir Confortável)

```
4º — Cursor (para trabalhar no projeto completo localmente)
```

### Fluxo de Trabalho Sugerido

```
Tenho uma ideia de alteração
        │
        ▼
Descrevo em português no Bolt.new ou Claude
        │
        ▼
A IA gera o código modificado
        │
        ▼
Vejo a pré-visualização e ajusto
        │
        ▼
Copio os ficheiros para o servidor
        │
        ▼
Site atualizado ✓
```

---

## Dicas Importantes

### Como Pedir Alterações à IA

**Mau pedido:**
> "Muda o site"

**Bom pedido:**
> "Na página inicial, muda a cor de fundo da secção de serviços de preto para azul escuro (#1a1a2e). Mantém o texto branco e os ícones amarelos."

**Excelente pedido:**
> "No ficheiro resources/js/Pages/Site/Home.jsx, na secção de serviços (que começa com `<section className="bg-black py-20">`), quero mudar o fundo para azul escuro (#1a1a2e), adicionar uma borda fina (#2a2a4e) a cada card de serviço, e aumentar o espaçamento entre os cards de gap-8 para gap-10."

**Regra geral:** Quanto mais específico for o pedido, melhor será o resultado.

### Coisas Que a IA Faz Bem

- ✅ Alterar cores, fontes, tamanhos, espaçamentos
- ✅ Adicionar novas secções a páginas existentes
- ✅ Criar formulários novos
- ✅ Reorganizar layouts
- ✅ Traduzir texto no código
- ✅ Explicar o que cada parte do código faz
- ✅ Corrigir erros quando se cola a mensagem de erro

### Coisas Que Requerem Mais Cuidado

- ⚠️ Alterar a estrutura da base de dados (adicionar campos, tabelas)
- ⚠️ Configurar emails, pagamentos ou integrações externas
- ⚠️ Problemas de segurança e autenticação
- ⚠️ Deploy e configuração de servidores

Para estas tarefas mais complexas, é recomendável consultar alguém com experiência técnica ou usar o Cursor com o projeto completo aberto, onde a IA tem mais contexto.

---

## Custo Mensal Estimado

| Item | Custo |
|---|---|
| Alojamento (Hetzner CX22) | €4,35/mês |
| Ferramenta IA (Bolt.new Pro) | ~€18/mês |
| Domínio (.pt) | ~€10/ano (~€0,83/mês) |
| **Total** | **~€23/mês** |

Ou com ferramentas gratuitas:

| Item | Custo |
|---|---|
| Alojamento (Oracle Free Tier) | €0 |
| Ferramenta IA (Bolt.new/Claude grátis) | €0 |
| Domínio (.pt) | ~€10/ano |
| **Total** | **~€10/ano** |

---

*Este guia foi preparado para acompanhar o projeto Xiotecar. As ferramentas e preços mencionados são referentes a maio de 2026 e podem sofrer alterações.*
