# ColaboSim - Chat Colaborativo en Tiempo Real

Aplicación de chat en tiempo real con autenticación Google OAuth y email/password, construida con NestJS, Next.js, Prisma y PostgreSQL.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Uso](#uso)
- [Solución de Problemas](#solución-de-problemas)

## ✨ Características

- 🔐 Autenticación dual: Google OAuth y Email/Password
- 💬 Chat en tiempo real con WebSockets
- 🏠 Creación y gestión de salas de chat
- 👥 Visualización de usuarios en línea
- 🗑️ Eliminación de salas y mensajes en tiempo real
- 🎨 Interfaz moderna y responsive con Tailwind CSS
- 🔔 Notificaciones cuando usuarios se unen/salen

## 🛠️ Tecnologías

### Backend
- **NestJS** - Framework de Node.js
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos
- **Socket.IO** - WebSockets para tiempo real
- **Passport** - Autenticación (Google OAuth + JWT)
- **bcrypt** - Encriptación de contraseñas

### Frontend
- **Next.js 16** - Framework de React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **shadcn/ui** - Componentes UI
- **Socket.IO Client** - Cliente WebSocket

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior) - [Descargar](https://nodejs.org/)
- **Docker Desktop** - [Descargar](https://www.docker.com/products/docker-desktop/)
- **Git** - [Descargar](https://git-scm.com/)

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/garcia-bj/chat-colaborativo.git
cd chat-colaborativo
```

### 2. Instalar Dependencias del Backend

```bash
cd backend
npm install
```

### 3. Instalar Dependencias del Frontend

```bash
cd ../frontend
npm install
```

## ⚙️ Configuración

### Backend

#### 1. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `backend/`:

```bash
cd backend
```

Crea el archivo `.env` con el siguiente contenido:

```env
# Database
DATABASE_URL="postgresql://myuser:mypassword@localhost:5433/chat_db?schema=public"

# JWT
JWT_SECRET="tu_clave_secreta_super_segura_aqui"

# Google OAuth (Opcional - solo si usarás Google Login)
GOOGLE_CLIENT_ID="tu_google_client_id"
GOOGLE_CLIENT_SECRET="tu_google_client_secret"
```

> **Nota**: Si no vas a usar Google OAuth, puedes dejar las variables de Google vacías. La autenticación con email/password funcionará sin problemas.

#### 2. Configurar Google OAuth (Opcional)

Si deseas usar Google Login:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google+ 
4. Ve a "Credenciales" → "Crear credenciales" → "ID de cliente de OAuth 2.0"
5. Configura:
   - **Tipo de aplicación**: Aplicación web
   - **Orígenes autorizados**: `http://localhost:3000`
   - **URIs de redirección autorizadas**: `http://localhost:3000/auth/google/redirect`
6. Copia el `Client ID` y `Client Secret` a tu archivo `.env`

#### 3. Iniciar PostgreSQL con Docker

En la carpeta `backend/`, ejecuta:

```bash
docker-compose up -d
```

Esto iniciará PostgreSQL en el puerto 5433.

#### 4. Aplicar Migraciones de Prisma

```bash
npx prisma db push
npx prisma generate
```

### Frontend

El frontend no requiere configuración adicional. Las URLs del backend están configuradas para `http://localhost:3000`.

## 🎯 Ejecución

### Iniciar el Backend

Desde la carpeta `backend/`:

```bash
npm run start:dev
```

El backend estará disponible en `http://localhost:3000`

### Iniciar el Frontend

Desde la carpeta `frontend/`:

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:3001`

## 📱 Uso

### Registro e Inicio de Sesión

1. Abre tu navegador en `http://localhost:3001`
2. Verás la página de login con dos opciones:
   - **Email/Password**: Ingresa tu email y contraseña (si ya tienes cuenta)
   - **Google**: Haz clic en "Google" para autenticarte con tu cuenta de Google

3. Si no tienes cuenta, haz clic en "Regístrate" para crear una nueva cuenta con email/password

### Usar el Chat

1. **Crear una sala**: Haz clic en el botón "+" en la barra lateral
2. **Unirse a una sala**: Haz clic en cualquier sala de la lista
3. **Enviar mensajes**: Escribe en el campo de texto y presiona Enter o haz clic en el botón de enviar
4. **Ver usuarios en línea**: Los usuarios conectados aparecen en la parte superior del chat
5. **Eliminar mensajes**: Pasa el mouse sobre un mensaje y haz clic en el ícono de basura
6. **Eliminar salas**: Pasa el mouse sobre una sala en la barra lateral y haz clic en el ícono de basura
7. **Cerrar sesión**: Haz clic en el ícono de salida en la parte inferior de la barra lateral

## 🔧 Solución de Problemas

### Error: "EADDRINUSE: address already in use :::3000"

El puerto 3000 ya está en uso. Solución:

```bash
# Windows
npx kill-port 3000

# Luego reinicia el backend
npm run start:dev
```

### Error: "Cannot connect to database"

Verifica que Docker esté corriendo:

```bash
docker ps
```

Deberías ver un contenedor de PostgreSQL. Si no:

```bash
cd backend
docker-compose up -d
```

### Error: "Prisma Client not generated"

Regenera el cliente de Prisma:

```bash
cd backend
npx prisma generate
```

### Error de compilación en Frontend

Limpia la caché y reinstala:

```bash
cd frontend
rm -rf .next node_modules
npm install
npm run dev
```

### Google OAuth no funciona

1. Verifica que las credenciales en `.env` sean correctas
2. Asegúrate de que la URI de redirección en Google Cloud Console sea exactamente:
   ```
   http://localhost:3000/auth/google/redirect
   ```
3. Verifica que la API de Google+ esté habilitada en tu proyecto de Google Cloud

### Base de datos no sincronizada

Si cambiaste el esquema de Prisma:

```bash
cd backend
npx prisma db push --accept-data-loss
npx prisma generate
```

> **Advertencia**: `--accept-data-loss` eliminará datos existentes si hay conflictos.

## 📝 Comandos Útiles

### Backend

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod

# Ver logs de Prisma
npx prisma studio

# Resetear base de datos
npx prisma db push --force-reset
```

### Frontend

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm run start

# Verificar tipos
npm run type-check
```

### Docker

```bash
# Iniciar PostgreSQL
docker-compose up -d

# Detener PostgreSQL
docker-compose down

# Ver logs
docker-compose logs -f

# Eliminar volúmenes (resetear DB)
docker-compose down -v
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autores

- Brandon Garcia - [GitHub](https://github.com/garcia-bj)

## 🙏 Agradecimientos

- NestJS por el excelente framework
- Next.js por la increíble experiencia de desarrollo
- shadcn/ui por los hermosos componentes
