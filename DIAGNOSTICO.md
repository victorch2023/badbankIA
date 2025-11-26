# 🔍 Diagnóstico de Problemas con GitHub Pages

## Problemas Comunes y Soluciones

### 1. ❌ El nombre del repositorio no coincide

**Problema**: El README menciona `BadBankCapstone` pero el repo es `badbankIA`

**Solución**: La URL correcta debería ser:
- ✅ `https://victorch2023.github.io/badbankIA/`
- ❌ NO `https://victorch2023.github.io/BadBankCapstone/`

### 2. ❌ Los commits no se han subido

**Verificar**: 
```bash
git status
git log --oneline -3
```

Si dice "Your branch is ahead of 'origin/main'", necesitas hacer push:
```bash
git push origin main
```

### 3. ❌ GitHub Pages no está habilitado

**Verificar en**: https://github.com/victorch2023/badbankIA/settings/pages

Debe estar configurado:
- Source: `main` branch
- Folder: `/ (root)`

### 4. ❌ Problema con Firebase.apps

La versión compat de Firebase 9.6.1 podría no tener `firebase.apps`. Necesitamos verificar esto.

### 5. ❌ Problemas de Content Security Policy

GitHub Pages puede bloquear algunos scripts. Verificar en la consola del navegador.

## 🔧 Pasos para Diagnosticar

1. **Abre la consola del navegador** (F12) en la página de GitHub Pages
2. **Revisa los errores** - ¿Qué dice exactamente?
3. **Verifica la Network tab** - ¿Se cargan todos los archivos .js?
4. **Verifica la URL** - ¿Es la correcta según el nombre del repo?

## 📋 Información Necesaria

Para diagnosticar mejor, necesito saber:
- ¿Qué error aparece exactamente en la consola del navegador?
- ¿La página carga pero está en blanco?
- ¿Aparece algún error 404?
- ¿Qué URL estás usando?

