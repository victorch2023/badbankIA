# 🔧 Solución de Problemas Comunes con GitHub Pages

## Problema 1: La página no carga / Error 404

### Causas posibles:
1. **GitHub Pages no está habilitado**
   - Ve a: https://github.com/victorch2023/badbankIA/settings/pages
   - Verifica que esté configurado con branch `main` y folder `/ (root)`

2. **URL incorrecta**
   - ✅ Correcta: `https://victorch2023.github.io/badbankIA/`
   - ❌ Incorrecta: `https://victorch2023.github.io/BadBankCapstone/`
   - El nombre del repositorio es `badbankIA` (case-sensitive)

3. **Los cambios no se han subido**
   ```bash
   git push origin main
   ```

## Problema 2: La página carga pero está en blanco

### Verificar en la consola del navegador (F12):

1. **Errores de carga de scripts**
   - Verifica que todos los archivos `.js` se carguen (pestaña Network)
   - Si hay errores 404, los archivos no están en el repositorio

2. **Errores de Firebase**
   - Verifica que Firebase se inicialice correctamente
   - Revisa las reglas de seguridad en Firebase Console

3. **Errores de React**
   - Verifica que React y ReactDOM se carguen antes que tus scripts

## Problema 3: Errores de Firebase

### Solución:
1. Ve a: https://console.firebase.google.com/
2. Selecciona el proyecto: `badbank-e4a9d`
3. Ve a **Realtime Database** → **Reglas**
4. Temporalmente, usa estas reglas para desarrollo:
```json
{
  "rules": {
    "users": {
      ".read": true,
      ".write": true
    },
    "ops": {
      ".read": true,
      ".write": true
    }
  }
}
```

## Problema 4: Content Security Policy (CSP)

GitHub Pages puede tener restricciones. Si ves errores de CSP:
- Los scripts externos (CDN) deberían funcionar
- Si hay problemas, verifica que las URLs de los CDN sean correctas

## Problema 5: Los cambios no se reflejan

1. **Espera 2-5 minutos** después de hacer push
2. **Limpia la caché del navegador** (Ctrl+Shift+R o Cmd+Shift+R)
3. **Verifica que el commit esté en GitHub**:
   - Ve a: https://github.com/victorch2023/badbankIA/commits/main

## 🔍 Diagnóstico Rápido

1. Abre la consola del navegador (F12)
2. Ve a la pestaña **Console**
3. Busca errores en rojo
4. Ve a la pestaña **Network**
5. Verifica que todos los archivos `.js` tengan status 200

## 📝 Información para Reportar Problemas

Si nada funciona, proporciona:
- El error exacto de la consola
- La URL que estás usando
- Una captura de pantalla de la consola
- Si los archivos aparecen en el repositorio de GitHub

