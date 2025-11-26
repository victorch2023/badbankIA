# Configuración de Firebase para BadBank

## Verificación de Reglas de Seguridad

Para que la aplicación funcione correctamente en GitHub Pages, necesitas verificar las reglas de seguridad de Firebase Realtime Database.

### Pasos para verificar/actualizar las reglas:

1. Ve a la [Consola de Firebase](https://console.firebase.google.com/)
2. Selecciona tu proyecto: `badbank-e4a9d`
3. Ve a **Realtime Database** → **Reglas**
4. Verifica que las reglas permitan lectura y escritura (al menos temporalmente para desarrollo):

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

### ⚠️ IMPORTANTE - Seguridad en Producción

Las reglas anteriores permiten acceso público. Para producción, deberías implementar autenticación:

```json
{
  "rules": {
    "users": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$uid": {
        ".read": "auth != null && $uid === auth.uid",
        ".write": "auth != null && $uid === auth.uid"
      }
    },
    "ops": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

### URL de la Base de Datos

La aplicación está configurada para usar:
- **Database URL**: `https://badbank-e4a9d-default-rtdb.firebaseio.com`

Verifica que esta URL coincida con la de tu proyecto en Firebase Console.

