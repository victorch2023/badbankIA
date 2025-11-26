# Configuración de GitHub Pages para BadBank

## Pasos para Habilitar GitHub Pages

### 1. Verificar que todos los archivos estén en el repositorio

Asegúrate de que estos archivos estén presentes:
- ✅ `index.html` (archivo principal)
- ✅ `context.js`
- ✅ `init.js`
- ✅ `navbar.js`
- ✅ `createaccount.js`
- ✅ `login.js`
- ✅ `deposit.js`
- ✅ `withdraw.js`
- ✅ `balance.js`
- ✅ `alldata.js`
- ✅ `home.js`
- ✅ `index.js`
- ✅ `A4.jpg` (imagen de la página principal)
- ✅ `bank.png` y `bank2.png` (si se usan)

### 2. Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub: `https://github.com/victorch2023/badbankIA`
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, busca **Pages**
4. En **Source**, selecciona:
   - **Branch**: `main` (o `master` si es tu rama principal)
   - **Folder**: `/ (root)`
5. Haz clic en **Save**
6. Espera unos minutos para que GitHub Pages se active

### 3. Acceder a tu aplicación

Una vez activado, tu aplicación estará disponible en:
- **URL**: `https://victorch2023.github.io/badbankIA/`

### 4. Verificar que funcione

1. Abre la URL en tu navegador
2. Abre la consola del navegador (F12 o Cmd+Option+I)
3. Verifica que no haya errores en rojo
4. Prueba crear una cuenta y hacer operaciones

### 5. Actualizar el README (opcional)

Si quieres, puedes actualizar el README.md con el nuevo link de GitHub Pages.

## Solución de Problemas

### La página no carga
- Verifica que `index.html` esté en la raíz del repositorio
- Espera 5-10 minutos después de habilitar GitHub Pages

### Errores de Firebase
- Verifica las reglas de seguridad en Firebase Console
- Asegúrate de que la URL de la base de datos sea correcta

### Errores de CORS
- Firebase maneja CORS automáticamente, pero verifica las reglas de seguridad

### La aplicación carga pero no funciona
- Abre la consola del navegador y revisa los errores
- Verifica que todos los archivos `.js` se carguen correctamente

