#!/bin/bash
# 📋 SCRIPT DE TESTE - Backend Segurança

API="http://localhost:5500"
echo "🧪 Iniciando testes da segurança..."
echo ""

# ========== TESTE 1: Health Check (Público) ==========
echo "✓ TESTE 1: Health Check (Público - SEM token)"
curl -v $API/ 2>&1 | grep -E "(HTTP|🚀)"
echo ""

# ========== TESTE 2: Tenant erro de autenticação ==========
echo "✓ TESTE 2: Acessar endpoint PROTEGIDO sem token (deve retornar 401)"
curl -v $API/logistica 2>&1 | grep -E "(HTTP|statusCode|message)"
echo ""

# ========== TESTE 3: Login para obter token ==========
echo "✓ TESTE 3: fazer Login (obter JWT)"
LOGIN_RESPONSE=$(curl -s -X POST $API/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@sistema-rna.com",
    "password": "SenhaForte123!"
  }')

echo $LOGIN_RESPONSE | jq '.' 2>/dev/null || echo $LOGIN_RESPONSE
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.access_token' 2>/dev/null)
echo ""
echo "Token obtido: ${TOKEN:0:50}..."
echo ""

# ========== TESTE 4: Acessar endpoint PROTEGIDO com token ==========
echo "✓ TESTE 4: Acessar endpoint PROTEGIDO com token (deve retornar 200)"
curl -v -H "Authorization: Bearer $TOKEN" $API/logistica 2>&1 | grep -E "(HTTP|message)"
echo ""

# ========== TESTE 5: Com token expirado/inválido ==========
echo "✓ TESTE 5: Acessar com token INVÁLIDO (deve retornar 401)"
curl -v -H "Authorization: Bearer invalid_token" $API/logistica 2>&1 | grep -E "(HTTP|statusCode)"
echo ""

# ========== TESTE 6: Rate Limit (15 requests em rápida sequência) ==========
echo "✓ TESTE 6: Rate Limit (15 requests rápido - limite é 10/60s)"
for i in {1..15}; do
  RESPONSE=$(curl -s -w "\n%{http_code}" $API/)
  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  echo "Request $i: HTTP $HTTP_CODE"
done
echo ""

echo "✅ Testes completos!"
