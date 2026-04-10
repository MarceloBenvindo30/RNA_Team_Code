# Plano de Implantação no Vercel

Este plano detalha os passos para subir o projeto "Sistema RNA" no Vercel utilizando a CLI (Interface de Linha de Comando).

## Pré-requisitos
- Ter uma conta no [Vercel](https://vercel.com).
- Ter o Node.js instalado.

## Comandos de Implantação

### 1. Instalar a CLI do Vercel
Caso ainda não tenha instalado globalmente:
```bash
npm install -g vercel
```

### 2. Login (se necessário)
```bash
vercel login
```

### 3. Iniciar a Implantação (Ambiente de Preview)
O frontend está em **`frontend/`**. Entre nessa pasta e execute:

```bash
cd frontend
vercel
```
*Siga as instruções no terminal (Link to existing project: No, Project Name: sistema-rna, etc.). O Vercel detectará automaticamente que é um projeto Vite.*

### 4. Implantação para Produção
Após verificar o link de preview, use:
```bash
vercel --prod
```

## Configurações Automáticas Detectadas
- **Framework Preset**: Vite
- **Build Command**: `npm run build` (que executa `tsc -b && vite build`)
- **Output Directory**: `dist`
- **Install Command**: `npm install`
