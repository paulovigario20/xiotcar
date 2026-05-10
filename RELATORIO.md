# Relatório Técnico — Projeto Xiotecar

**Data:** 10 de maio de 2026
**Preparado por:** PiBox (Agente de Engenharia)
**Para:** Dono do stand Xiotecar

---

## 1. Resumo Executivo

O código-fonte do site Xiotecar foi recebido via Google Drive (ficheiro `Xiotecar.zip`, 114 MB). O site foi analisado, corrigido, redesenhado visualmente, povoado com os dados reais do StandVirtual, e colocado online num ambiente funcional em **https://xiotecar.luisfelab.com**.

Este relatório documenta tudo o que foi feito, os problemas encontrados e corrigidos, e as opções de alojamento para produção.

---

## 2. Análise Inicial do Código

### 2.1 Stack Tecnológico

| Componente | Tecnologia |
|---|---|
| Backend | Laravel 12 (PHP 8.2+) |
| Frontend | React 18 com Inertia.js v2 |
| Estilos | Tailwind CSS + Bootstrap (misturado) |
| Build | Vite 6 |
| Base de dados | MySQL (original), SQLite (ambiente atual) |
| Autenticação | Laravel Breeze + Sanctum |
| Permissões | spatie/laravel-permission |

### 2.2 Modelo de Dados Original

| Tabela | Descrição |
|---|---|
| `brands` | Marcas de automóveis (nome, logo) |
| `cars` | Viaturas (marca, modelo, ano, preço, imagem, descrição, vendido) |
| `retomas` | Pedidos de retoma (nome, email, telefone, marca, modelo, etc.) |
| `testemunhos` | Testemunhos de clientes (nome, mensagem) |
| `users` | Utilizadores do backoffice |

### 2.3 Funcionalidades Existentes

**Páginas públicas:**
- Página inicial (Home)
- Listagem de viaturas (/carros)
- Detalhes de viatura (/carros/{id})
- Sobre nós (/sobre)
- Contacto (/contacto)
- Formulário de retoma
- Formulário de testemunhos

**Backoffice (autenticado):**
- Dashboard
- Gestão de carros (listar, criar)
- Gestão de marcas (listar, criar)
- Gestão de utilizadores (listar)

---

## 3. Problemas Encontrados e Correções

### 3.1 Incompatibilidade de Sistema de Ficheiros (macOS → Linux)

**Problema:** O código foi desenvolvido em macOS, que tem um sistema de ficheiros insensível a maiúsculas/minúsculas. A pasta `resources/js/components` estava em minúsculas, mas os imports no React usavam `@/Components/...` com maiúscula. Em Linux (servidor), isto causava erro de build.

**Correção:** Renomeada a pasta `components` → `Components`.

### 3.2 URLs de Assets a Apontar para localhost

**Problema:** Após o deploy, todos os ficheiros CSS e JavaScript eram servidos com URLs `http://localhost:8090/build/...` em vez do domínio real, causando uma página em branco no browser.

**Correções aplicadas:**
1. Configurado `ASSET_URL` e `TRUSTED_PROXIES` no `.env`
2. Adicionado `URL::forceScheme('https')` e `URL::forceRootUrl(...)` no `AppServiceProvider`
3. Configurado o Ziggy (gerador de rotas JavaScript) para usar HTTPS

### 3.3 Erro 500 no Dashboard

**Problema:** O `RetomaController` não tinha o método `index()`, mas a rota `/dashboard` chamava esse método.

**Correção:** Adicionado o método `index()` ao `RetomaController` que devolve a página Dashboard com a lista de retomas.

### 3.4 Criação de Carros Falhava Silenciosamente

**Problema:** O formulário de criação de carros só tinha 3 campos (marca, modelo, ano) mas a coluna `price` na base de dados era obrigatória (NOT NULL). A criação falhava com um erro SQL que era apenas registado no log, sem feedback ao utilizador.

**Correções:**
1. Formulário expandido com todos os campos: marca, modelo, ano, preço, quilómetros, combustível, transmissão, potência, descrição
2. Validação no controlador atualizada para incluir o preço como obrigatório
3. Mensagens de erro agora visíveis no formulário

### 3.5 Página de Contacto — Render Path Incorreto

**Problema:** O `ContactoController` tentava renderizar `Contacto.jsx` mas o ficheiro estava em `Site/Contacto.jsx`.

**Correção:** Atualizado o path de render para `Site/Contacto`.

### 3.6 Falta de Funcionalidades CRUD

**Problema:** Não era possível editar nem eliminar carros ou marcas. Não existiam rotas, controladores nem páginas para estas operações.

**Correções:**
- **Carros:** Adicionadas rotas e páginas para editar (`/cars/{id}/edit`), atualizar (PUT) e eliminar (DELETE)
- **Marcas:** Criado CRUD completo — listar com contagem de carros, criar, editar, eliminar (com proteção contra eliminação de marcas com carros associados)
- **Tabela de carros no backoffice:** Redesenhada com foto, marca, modelo, ano, preço, quilómetros, estado (disponível/vendido), e botões de ação

### 3.7 Dashboard Sem Contadores

**Problema:** O Dashboard mostrava sempre 0 carros, 0 marcas e 0 utilizadores.

**Correção:** O `RetomaController@index` agora passa `Car::count()`, `Brand::count()` e `User::count()` para a página.

---

## 4. Redesign Visual

### 4.1 Problema Original

O site tinha um aspeto básico com fundo branco/cinzento claro e estilo genérico do Laravel Breeze. O dono considerava o site WordPress (https://paulovigario20-havjb.wordpress.com/) visualmente superior.

### 4.2 Novo Design

O site foi completamente redesenhado para corresponder ao estilo do site WordPress, com as seguintes alterações:

**Esquema de cores:**
- Fundo: preto (`bg-black`) e cinzento escuro (`bg-zinc-900`)
- Texto: branco
- Acentos: amarelo (`yellow-400`) para botões, ícones e destaques
- Bordas: cinzento escuro (`zinc-800`)

**Layout (todas as páginas públicas):**
- Barra superior com telefone, email e redes sociais
- Header fixo (sticky) com logo do WordPress e navegação em maiúsculas
- Footer com 3 colunas: sobre, contacto, horários

**Página inicial redesenhada com:**
1. Hero com carrossel de imagens (5 fotos do WordPress) e overlay escuro
2. Secção "Experiência Xiotecar" com estatísticas (7+ anos, 500+ viaturas, etc.)
3. Secção de serviços (Compra e Venda, Financiamento, Retomas) com imagens
4. Grelha de logótipos de marcas (22 marcas)
5. Testemunho do Bruno Dias com foto e estrelas
6. Simulador de crédito
7. Formulário de retoma
8. Secção de contacto com botões WhatsApp e telefone

**Página de viaturas:** Grelha de cards escuros com foto, detalhes (ano, km, combustível, transmissão) e preço em amarelo.

**Página de detalhes da viatura:** Galeria de fotos com miniaturas clicáveis, grelha de especificações, botões WhatsApp/telefone/contacto.

**Página sobre:** Texto estilizado com destaque amarelo nos termos-chave.

**Página de contacto:** Layout dividido — formulário à esquerda, informações e mapa à direita.

### 4.3 Imagens Migradas do WordPress

Todas as imagens do site WordPress foram descarregadas e integradas:
- Logo do header
- 5 fotos de carros para o hero
- 2 fotos de serviços
- Foto do testemunho (Bruno Dias)

---

## 5. Migração de Dados do StandVirtual

### 5.1 Processo

Os dados foram extraídos automaticamente de https://xiotecar.standvirtual.com/inventory através da análise dos dados JSON embutidos na página (estrutura `__NEXT_DATA__` do Next.js).

### 5.2 Alterações à Base de Dados

Foram adicionados novos campos à tabela `cars`:

| Campo | Tipo | Descrição |
|---|---|---|
| `version` | string | Versão/variante (ex: "4Matic AMG Line") |
| `color` | string | Cor |
| `doors` | integer | Número de portas |
| `engine_capacity` | string | Cilindrada |
| `extra_photos` | JSON | Fotos adicionais além da principal |

### 5.3 Viaturas Migradas

| # | Marca | Modelo | Versão | Preço | Km | Combustível | Fotos |
|---|---|---|---|---|---|---|---|
| 1 | Mercedes-Benz | EQC 400 | 4Matic AMG Line | €34.750 | 100.000 | Elétrico | 5 |
| 2 | Polestar | 2 | Dual Motor 78kWh | €24.750 | 112.000 | Elétrico | 5 |
| 3 | Cupra | Formentor | 1.4 e-Hybrid Sport DSG | €25.250 | 40.000 | Híbrido Plug-in | 5 |
| 4 | Audi | Q4 e-tron | 40 82 kWH | €28.250 | 96.500 | Elétrico | 5 |
| 5 | Polestar | 2 | Dual Motor 78kWh | €24.750 | 113.000 | Elétrico | 5 |
| 6 | Mercedes-Benz | EQA 250 | — | €29.750 | 87.500 | Elétrico | 5 |
| 7 | BMW | 330e | xDrive Aut. Luxury Line | €23.250 | 140.000 | Híbrido Plug-in | 5 |
| 8 | BMW | 225xe | Active Tourer Pack Desportivo M | €30.250 | 86.000 | Híbrido Plug-in | 5 |

Todas as 40 fotografias foram descarregadas do CDN do StandVirtual e armazenadas localmente.

### 5.4 Marcas Criadas Automaticamente

Foram criadas as marcas: Mercedes-Benz, Polestar, Cupra, Audi, BMW (além das que já existiam na base de dados original).

---

## 6. Funcionalidades de Upload de Fotos

Foi implementado o upload de fotografias de viaturas:

- **Múltiplas fotos** por viatura (selecionar vários ficheiros de uma vez)
- **Primeira foto** é a imagem principal do anúncio
- **Fotos adicionais** armazenadas em campo JSON separado
- **Pré-visualização** das fotos antes do upload com indicação de qual é a principal
- **Barra de progresso** durante o upload
- **Máximo 5 MB** por fotografia
- **Galeria interativa** na página de detalhes com miniaturas clicáveis

---

## 7. Infraestrutura Atual

### 7.1 Como Está Alojado Agora

O site está a correr num contentor Docker no servidor PiBox (Azure, Espanha Central):

| Componente | Detalhe |
|---|---|
| URL | https://xiotecar.luisfelab.com |
| Contentor | `xiotecar` (imagem Docker personalizada) |
| Runtime | PHP 8.4 + Node.js 20 |
| Base de dados | SQLite (ficheiro local) |
| Reverse proxy | Nginx com certificado SSL wildcard |
| Porto | 8090 (interno) → 443 (HTTPS público) |

### 7.2 Credenciais de Acesso ao Backoffice

| Campo | Valor |
|---|---|
| URL | https://xiotecar.luisfelab.com/login |
| Email | admin@xiotecar.com |
| Password | Xiotecar2026! |

---

## 8. Opções de Alojamento para Produção

### 8.1 Comparação de Provedores

| Provedor | Plano | Preço | Vantagens | Desvantagens |
|---|---|---|---|---|
| **Hetzner Cloud** | CX22 | **€4,35/mês** | Melhor preço/desempenho, servidores na Europa, muito rápido | Requer configuração inicial (Docker) |
| **Railway.app** | Hobby | **~€4,50/mês** | Deploy automático via Git, zero manutenção, SSL grátis | Servidor nos EUA (mais lento de PT) |
| **Render.com** | Starter | **~€6,50/mês** | Deploy automático, interface simples, SSL grátis | Mais caro que Hetzner |
| **DigitalOcean** | Basic | **~€5,50/mês** | Simples, boa documentação, datacenter em Londres | 1GB RAM (justo) |
| **Oracle Cloud** | Free Tier | **€0/mês** | Totalmente grátis, 4 vCPU, 24GB RAM | Interface complexa, disponibilidade limitada |
| **Webdock** | — | **~€3-5/mês** | O provedor original do site, familiar ao dono | — |

### 8.2 Recomendação

**Para o dono do stand (sem conhecimentos técnicos):**
→ **Railway.app** — faz push do código para o GitHub e o site atualiza-se automaticamente. Não precisa de saber usar SSH, Docker ou servidores.

**Para alguém com conhecimentos básicos de servidor:**
→ **Hetzner Cloud CX22 a €4,35/mês** — o melhor preço na Europa. A configuração inicial demora ~30 minutos e depois o site corre sem manutenção.

**Para custo zero:**
→ **Oracle Cloud Free Tier** — gratuito para sempre, mas a configuração é mais complexa.

### 8.3 Requisitos Mínimos do Servidor

- PHP 8.2+ (ou Docker)
- ~512 MB RAM
- ~2 GB de disco (código + fotos, cresce com o tempo)
- Certificado SSL (grátis via Let's Encrypt)
- Domínio a apontar para o servidor

---

## 9. Próximos Passos Sugeridos

### 9.1 Prioritário

1. **Migrar para MySQL/PostgreSQL** — SQLite funciona bem para poucos utilizadores, mas para produção seria mais robusto usar uma base de dados dedicada
2. **Configurar backups automáticos** — atualmente a base de dados é um ficheiro SQLite sem backup
3. **Configurar envio de emails real** — os formulários de retoma e contacto registam no log mas não enviam email (precisa de configurar SMTP com Gmail, Mailgun ou similar)
4. **Domínio próprio** — configurar o domínio xiotecar.pt ou xiotecar.com a apontar para o servidor de produção

### 9.2 Melhorias Futuras

5. **Pesquisa e filtros** — na página de viaturas, permitir filtrar por marca, preço, combustível, ano
6. **Painel de analytics** — ver quantas visitas cada viatura recebe
7. **SEO** — meta tags, sitemap.xml, Open Graph para partilha em redes sociais
8. **Página de retomas melhorada** — mostrar estado do pedido (pendente, em análise, respondido)
9. **Integração com WhatsApp Business API** — enviar notificações automáticas quando há um novo pedido
10. **Versão mobile** — o site é responsive mas pode ser otimizado para mobile com menu hamburger

---

## 10. Ficheiros do Projeto

O código-fonte completo está em `/workspace/projects/xiotecar/` com a seguinte estrutura:

```
xiotecar/
├── START_HERE.md          ← Documentação do projeto
├── Dockerfile             ← Imagem Docker para deploy
├── env.production         ← Variáveis de ambiente para produção
└── src/Xiotecar/          ← Código-fonte Laravel + React
    ├── app/               ← Controllers, Models, Mail
    ├── database/          ← Migrations, SQLite
    ├── resources/js/      ← Páginas React, componentes
    ├── public/            ← Assets, imagens, build Vite
    ├── routes/            ← Rotas web
    └── storage/           ← Uploads, logs, cache
```

---

*Relatório gerado automaticamente por PiBox — agente de engenharia e infraestrutura.*
