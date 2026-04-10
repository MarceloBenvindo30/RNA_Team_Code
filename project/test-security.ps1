
$API = "http://localhost:5500"
Write-Host "[TEST] Iniciando testes da seguranca..." 
Write-Host ""

Write-Host "[TEST 1] Health Check (Publico - SEM token)" 
try {
    $response = Invoke-WebRequest -Uri "$API/" -Method GET
    Write-Host "OK - HTTP $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "ERRO: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# ========== TESTE 2: Acesso PROTEGIDO sem token ==========
Write-Host "[TEST 2] Acessar /logistica SEM token (deve return 401)" -ForegroundColor Green
try {
    $response = Invoke-WebRequest -Uri "$API/logistica" -Method GET
    Write-Host "ERRO - HTTP $($response.StatusCode) - DEVERIA ter sido bloqueado!" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "OK - HTTP 401 (Unauthorized) - Endpoint protegido!" -ForegroundColor Green
    } else {
        Write-Host "ERRO - HTTP $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    }
}
Write-Host ""

# ========== TESTE 3: Login ==========
Write-Host "[TEST 3] Fazer Login (obter JWT token)" -ForegroundColor Green
try {
    $loginBody = @{
        email = "admin@sistema-rna.com"
        password = "SenhaForte123!"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$API/auth/login" `
        -Method POST `
        -Headers @{"Content-Type" = "application/json"} `
        -Body $loginBody
    
    $loginData = $response.Content | ConvertFrom-Json
    $script:token = $loginData.access_token
    
    Write-Host "OK - Login bem-sucedido!" -ForegroundColor Green
    Write-Host "   Email: $($loginData.user.email)" -ForegroundColor Gray
    Write-Host "   Roles: $($loginData.user.roles -join ', ')" -ForegroundColor Gray
    Write-Host "   Token: $($script:token.Substring(0, 50))..." -ForegroundColor Gray
} catch {
    Write-Host "ERRO - Login falhou: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# ========== TESTE 4: Acesso PROTEGIDO com token valido ==========
Write-Host "[TEST 4] Acessar /logistica COM token valido (deve return 200)" -ForegroundColor Green
try {
    $response = Invoke-WebRequest -Uri "$API/logistica" `
        -Method GET `
        -Headers @{"Authorization" = "Bearer $script:token"}
    
    $responseData = $response.Content | ConvertFrom-Json
    Write-Host "OK - HTTP $($response.StatusCode): $($responseData.message)" -ForegroundColor Green
} catch {
    Write-Host "ERRO - HTTP $($_.Exception.Response.StatusCode)" -ForegroundColor Red
}
Write-Host ""

# ========== TESTE 5: Token invalido ==========
Write-Host "[TEST 5] Acessar /contabilidade com token INVALIDO (deve return 401)" -ForegroundColor Green
try {
    $response = Invoke-WebRequest -Uri "$API/contabilidade" `
        -Method GET `
        -Headers @{"Authorization" = "Bearer invalid_token_xyz123"}
    Write-Host "ERRO - HTTP $($response.StatusCode) - DEVERIA ter sido bloqueado!" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "OK - HTTP 401 (Unauthorized)" -ForegroundColor Green
    } else {
        Write-Host "ERRO - HTTP $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    }
}
Write-Host ""

# ========== TESTE 6: CORS Headers ==========
Write-Host "[TEST 6] Validar CORS header na resposta" -ForegroundColor Green
try {
    $response = Invoke-WebRequest -Uri "$API/" `
        -Method GET `
        -Headers @{"Origin" = "http://localhost:5173"}
    
    $corsHeader = $response.Headers['Access-Control-Allow-Origin']
    if ($corsHeader) {
        Write-Host "OK - CORS Header: $corsHeader" -ForegroundColor Green
    } else {
        Write-Host "WARNING - CORS Header nao encontrado" -ForegroundColor Yellow
    }
} catch {
    Write-Host "ERRO: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "[SUMMARY] Testes completos!" -ForegroundColor Green
