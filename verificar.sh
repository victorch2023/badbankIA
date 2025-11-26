#!/bin/bash
# Script de verificación para GitHub Pages

echo "🔍 Verificando archivos necesarios..."
echo ""

# Verificar archivos principales
files=("index.html" "context.js" "init.js" "navbar.js" "createaccount.js" "login.js" "deposit.js" "withdraw.js" "balance.js" "alldata.js" "home.js" "index.js" "A4.jpg")

missing=0
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ FALTA: $file"
        missing=$((missing + 1))
    fi
done

echo ""
if [ $missing -eq 0 ]; then
    echo "✅ Todos los archivos necesarios están presentes"
else
    echo "❌ Faltan $missing archivos"
fi

echo ""
echo "📊 Estado de Git:"
git status --short

echo ""
echo "📦 Commits pendientes de subir:"
git log --oneline origin/main..HEAD 2>/dev/null | wc -l | xargs echo "Total:"

echo ""
echo "🔗 URL esperada de GitHub Pages:"
echo "https://victorch2023.github.io/badbankIA/"

