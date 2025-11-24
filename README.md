# Siscolmenlab - Chat Colaborativo en Tiempo Real

Una aplicación de chat en tiempo real moderna y completa, construida con tecnologías de última generación. Permite a los usuarios comunicarse instantáneamente en salas de chat, con soporte para autenticación mediante Google OAuth y email/password.

---

## 📋 Tabla de Contenidos

1. [¿Qué es esta aplicación?](#qué-es-esta-aplicación)
2. [Características principales](#características-principales)
3. [Tecnologías utilizadas](#tecnologías-utilizadas)
4. [Requisitos previos](#requisitos-previos)
5. [Instalación paso a paso](#instalación-paso-a-paso)
6. [Configuración detallada](#configuración-detallada)
7. [Ejecución de la aplicación](#ejecución-de-la-aplicación)
8. [Uso de la aplicación](#uso-de-la-aplicación)
9. [Arquitectura del proyecto](#arquitectura-del-proyecto)
10. [Solución de problemas](#solución-de-problemas)
11. [Comandos útiles](#comandos-útiles)
12. [Preguntas frecuentes](#preguntas-frecuentes)

---

## 🎯 ¿Qué es esta aplicación?

**Siscolmenlab** es una aplicación de chat colaborativo que permite a múltiples usuarios comunicarse en tiempo real. Piensa en ella como una versión simplificada de Slack o Discord, donde puedes:

- Crear salas de chat temáticas
- Enviar y recibir mensajes instantáneamente
- Ver quién está conectado en cada momento
- Autenticarte de forma segura con Google o email/password

**¿Para qué sirve?**
- Comunicación en equipo
- Colaboración en proyectos
- Chats grupales organizados por temas
- Aprendizaje de desarrollo web moderno

---

## ✨ Características principales

### 🔐 Autenticación Dual
- **Google OAuth**: Inicia sesión con tu cuenta de Google en un clic
- **Email/Password**: Crea una cuenta tradicional con email y contraseña

### 💬 Chat en Tiempo Real
- Mensajes instantáneos sin necesidad de recargar la página
- Notificaciones cuando usuarios se unen o salen de salas
- Scroll automático a los mensajes más recientes

### 🏠 Gestión de Salas
- Crea salas de chat con nombres personalizados
- Únete a diferentes salas con un clic
- Elimina salas que ya no necesites

### 👥 Presencia de Usuarios
- Ve quién está en línea en tiempo real
- Lista de usuarios conectados en cada sala
- Indicadores visuales de estado

### 🗑️ Gestión de Mensajes
- Elimina tus propios mensajes
- Confirmación antes de eliminar para evitar errores
- Actualización en tiempo real para todos los usuarios

### 🎨 Interfaz Moderna
- Diseño responsive (se adapta a móviles, tablets y escritorio)
- Tema personalizado con colores profesionales
- Animaciones suaves y transiciones fluidas
- Componentes UI de alta calidad con shadcn/ui

---

## 🛠️ Tecnologías utilizadas

### Backend (Servidor)
- **NestJS**: Framework de Node.js para construir aplicaciones del lado del servidor
- **PostgreSQL**: Base de datos relacional para almacenar usuarios, salas y mensajes
- **Prisma**: ORM (Object-Relational Mapping) para interactuar con la base de datos
- **Socket.IO**: Biblioteca para comunicación en tiempo real mediante WebSockets
- **Passport**: Middleware de autenticación para Node.js
- **JWT**: Tokens seguros para mantener sesiones de usuario
- **bcrypt**: Librería para encriptar contraseñas de forma segura

### Frontend (Cliente)
- **Next.js 16**: Framework de React con renderizado del lado del servidor
- **React**: Biblioteca de JavaScript para construir interfaces de usuario
- **TypeScript**: Superset de JavaScript que añade tipado estático
- **Tailwind CSS**: Framework de CSS para estilos rápidos y consistentes
- **shadcn/ui**: Colección de componentes UI reutilizables y accesibles
- **Socket.IO Client**: Cliente para comunicación en tiempo real
- **Lucide React**: Iconos modernos y personalizables

### Infraestructura
- **Docker**: Contenedores para ejecutar PostgreSQL de forma aislada
- **Git**: Control de versiones para el código

---

## 📦 Requisitos previos

Antes de comenzar, necesitas tener instalado lo siguiente en tu computadora:

### 1. Node.js (v18 o superior)

**¿Qué es?** Node.js es un entorno de ejecución para JavaScript que permite ejecutar código JavaScript fuera del navegador.

**¿Cómo instalarlo?**
1. Ve a [https://nodejs.org/](https://nodejs.org/)
2. Descarga la versión LTS (Long Term Support) - recomendada
3. Ejecuta el instalador y sigue las instrucciones
4. Verifica la instalación abriendo una terminal y ejecutando:
   ```bash
   node --version
   npm --version
   ```
   Deberías ver los números de versión de ambos.

### 2. Docker Desktop

**¿Qué es?** Docker permite ejecutar aplicaciones en contenedores aislados. Lo usamos para ejecutar PostgreSQL sin tener que instalarlo directamente.

**¿Cómo instalarlo?**
1. Ve a [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
2. Descarga la versión para tu sistema operativo (Windows, Mac o Linux)
3. Ejecuta el instalador y sigue las instrucciones
4. Inicia Docker Desktop
5. Verifica la instalación ejecutando:
   ```bash
   docker --version
   ```

### 3. Git

**¿Qué es?** Git es un sistema de control de versiones que permite rastrear cambios en el código.

**¿Cómo instalarlo?**
1. Ve a [https://git-scm.com/](https://git-scm.com/)
2. Descarga la versión para tu sistema operativo
3. Ejecuta el instalador con las opciones predeterminadas
4. Verifica la instalación ejecutando:
   ```bash
   git --version
   ```

### 4. Un editor de código (Opcional pero recomendado)

**Recomendación:** Visual Studio Code
1. Ve a [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Descarga e instala
3. Es gratuito y muy popular entre desarrolladores

---

## 🚀 Instalación paso a paso

### Paso 1: Obtener el código

**Opción A: Clonar desde GitHub**
```bash
# Abre una terminal y navega a donde quieres guardar el proyecto
cd C:\Users\TuUsuario\Proyectos  # En Windows
# o
cd ~/Proyectos  # En Mac/Linux

# Clona el repositorio
git clone https://github.com/garcia-bj/chat-colaborativo.git

# Entra a la carpeta del proyecto
cd chat-colaborativo
```

**Opción B: Si ya tienes el código descargado**
```bash
# Navega a la carpeta del proyecto
cd ruta/a/chat-colaborativo
```

### Paso 2: Instalar dependencias del Backend

El backend es la parte del servidor que maneja la lógica de negocio, la base de datos y las conexiones en tiempo real.

```bash
# Entra a la carpeta del backend
cd backend

# Instala todas las dependencias necesarias
npm install
```

**¿Qué hace `npm install`?**
Lee el archivo `package.json` y descarga todas las bibliotecas y herramientas que el backend necesita para funcionar.

**Tiempo estimado:** 2-5 minutos dependiendo de tu conexión a internet.

### Paso 3: Instalar dependencias del Frontend

El frontend es la interfaz visual que los usuarios ven y con la que interactúan.

```bash
# Vuelve a la carpeta raíz
cd ..

# Entra a la carpeta del frontend
cd frontend

# Instala todas las dependencias necesarias
npm install
```

**Tiempo estimado:** 2-5 minutos.

---

## ⚙️ Configuración detallada

### Configuración del Backend

#### 1. Crear el archivo de variables de entorno

Las variables de entorno son configuraciones sensibles que no se deben compartir públicamente (como contraseñas y claves secretas).

```bash
# Asegúrate de estar en la carpeta backend
cd backend

# Crea el archivo .env (puedes usar cualquier editor de texto)
```

**En Windows:**
```bash
notepad .env
```

**En Mac/Linux:**
```bash
nano .env
# o
code .env  # Si tienes VS Code instalado
```

#### 2. Configurar las variables de entorno

Copia y pega el siguiente contenido en el archivo `.env`:

```env
# ============================================
# CONFIGURACIÓN DE LA BASE DE DATOS
# ============================================
# Esta URL le dice a la aplicación cómo conectarse a PostgreSQL
# Formato: postgresql://usuario:contraseña@servidor:puerto/nombre_base_datos
DATABASE_URL="postgresql://myuser:mypassword@localhost:5433/chat_db?schema=public"

# ============================================
# CONFIGURACIÓN DE SEGURIDAD (JWT)
# ============================================
# Esta clave secreta se usa para firmar los tokens de autenticación
# IMPORTANTE: Cambia esto por una clave única y segura en producción
# Puedes generar una aquí: https://randomkeygen.com/
JWT_SECRET="tu_clave_secreta_super_segura_cambiame_en_produccion_123456789"

# ============================================
# CONFIGURACIÓN DE GOOGLE OAUTH (OPCIONAL)
# ============================================
# Solo necesitas esto si quieres usar el login con Google
# Si no, puedes dejar estos valores vacíos y usar solo email/password

# ID de cliente de Google OAuth
GOOGLE_CLIENT_ID=""

# Secreto de cliente de Google OAuth
GOOGLE_CLIENT_SECRET=""
```

**Explicación de cada variable:**

- **DATABASE_URL**: 
  - `myuser`: Usuario de PostgreSQL (definido en docker-compose.yml)
  - `mypassword`: Contraseña de PostgreSQL (definida en docker-compose.yml)
  - `localhost:5433`: Servidor y puerto donde corre PostgreSQL
  - `chat_db`: Nombre de la base de datos

- **JWT_SECRET**: 
  - Una cadena secreta para firmar tokens de autenticación
  - Debe ser única y difícil de adivinar
  - Nunca la compartas públicamente

- **GOOGLE_CLIENT_ID** y **GOOGLE_CLIENT_SECRET**: 
  - Solo necesarios si quieres usar Google Login
  - Ver sección "Configurar Google OAuth" más abajo

#### 3. Configurar Google OAuth (Opcional)

Si quieres permitir que los usuarios inicien sesión con su cuenta de Google:

**Paso 3.1: Crear un proyecto en Google Cloud**
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Haz clic en "Crear proyecto"
3. Dale un nombre (ej: "Siscolmenlab Chat")
4. Haz clic en "Crear"

**Paso 3.2: Habilitar la API de Google+**
1. En el menú lateral, ve a "APIs y servicios" → "Biblioteca"
2. Busca "Google+ API"
3. Haz clic en "Habilitar"

**Paso 3.3: Crear credenciales OAuth**
1. Ve a "APIs y servicios" → "Credenciales"
2. Haz clic en "Crear credenciales" → "ID de cliente de OAuth 2.0"
3. Si te pide configurar la pantalla de consentimiento:
   - Tipo de usuario: Externo
   - Nombre de la aplicación: "Siscolmenlab"
   - Correo de asistencia: tu email
   - Guarda y continúa
4. En "Tipo de aplicación", selecciona "Aplicación web"
5. Nombre: "Siscolmenlab Web"
6. En "Orígenes autorizados de JavaScript", agrega:
   ```
   http://localhost:3000
   ```
7. En "URIs de redirección autorizadas", agrega:
   ```
   http://localhost:3000/auth/google/redirect
   ```
8. Haz clic en "Crear"
9. Copia el "ID de cliente" y el "Secreto del cliente"
10. Pégalos en tu archivo `.env`:
    ```env
    GOOGLE_CLIENT_ID="tu-id-de-cliente-aqui.apps.googleusercontent.com"
    GOOGLE_CLIENT_SECRET="tu-secreto-de-cliente-aqui"
    ```

#### 4. Iniciar la base de datos PostgreSQL

PostgreSQL es la base de datos donde se guardan todos los usuarios, salas y mensajes.

```bash
# Asegúrate de estar en la carpeta backend
cd backend

# Inicia PostgreSQL usando Docker
docker-compose up -d
```

**¿Qué hace este comando?**
- `docker-compose`: Herramienta para gestionar aplicaciones multi-contenedor
- `up`: Inicia los servicios definidos en docker-compose.yml
- `-d`: Modo "detached" (se ejecuta en segundo plano)

**Verificar que PostgreSQL está corriendo:**
```bash
docker ps
```
Deberías ver un contenedor llamado `chat_db` en la lista.

**Si algo sale mal:**
```bash
# Ver los logs del contenedor
docker-compose logs

# Detener PostgreSQL
docker-compose down

# Reiniciar PostgreSQL
docker-compose down
docker-compose up -d
```

#### 5. Configurar la base de datos con Prisma

Prisma es un ORM que facilita trabajar con la base de datos.

```bash
# Aplicar el esquema de la base de datos
npx prisma db push

# Generar el cliente de Prisma
npx prisma generate
```

**¿Qué hacen estos comandos?**
- `prisma db push`: Crea las tablas en la base de datos según el esquema definido
- `prisma generate`: Genera código TypeScript para interactuar con la base de datos

**Verificar la base de datos (opcional):**
```bash
# Abre Prisma Studio (interfaz visual para ver la base de datos)
npx prisma studio
```
Se abrirá en tu navegador en `http://localhost:5555`

### Configuración del Frontend

#### 1. Crear el archivo de variables de entorno (Opcional)

El frontend usa variables de entorno para configurar la URL del backend.

```bash
# Asegúrate de estar en la carpeta frontend
cd frontend

# Crea el archivo .env.local
```

**En Windows:**
```bash
notepad .env.local
```

**En Mac/Linux:**
```bash
nano .env.local
# o
code .env.local  # Si tienes VS Code instalado
```

#### 2. Configurar la URL del backend

Copia y pega el siguiente contenido en el archivo `.env.local`:

```env
# ============================================
# CONFIGURACIÓN DEL BACKEND
# ============================================
# URL base del servidor backend
# En desarrollo: http://localhost:3000
# En producción: cambiar por tu dominio (ej: https://api.tudominio.com)
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

**Nota:** Si no creas este archivo, la aplicación usará `http://localhost:3000` por defecto.

**¿Por qué `NEXT_PUBLIC_`?**
En Next.js, las variables de entorno que comienzan con `NEXT_PUBLIC_` están disponibles en el navegador. Esto es necesario para que el frontend pueda hacer peticiones al backend.

**Cambiar la URL del backend:**
1. Si tu backend está en otro puerto o dominio, simplemente cambia el valor de `NEXT_PUBLIC_BACKEND_URL`
2. Reinicia el servidor de desarrollo del frontend (`npm run dev`)

---

## 🎯 Ejecución de la aplicación

### Opción 1: Ejecución manual (Recomendada para desarrollo)

**Terminal 1 - Backend:**
```bash
# Navega a la carpeta backend
cd backend

# Inicia el servidor de desarrollo
npm run start:dev
```

**¿Qué verás?**
```
[Nest] 12345  - LOG [NestFactory] Starting Nest application...
[Nest] 12345  - LOG [InstanceLoader] AppModule dependencies initialized
...
[Nest] 12345  - LOG [NestApplication] Nest application successfully started
```

El backend estará disponible en `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
# Abre una nueva terminal
# Navega a la carpeta frontend
cd frontend

# Inicia el servidor de desarrollo
npm run dev
```

**¿Qué verás?**
```
▲ Next.js 16.0.3
- Local:        http://localhost:3001
- Network:      http://192.168.1.x:3001

✓ Ready in 2.3s
```

El frontend estará disponible en `http://localhost:3001`

### Opción 2: Ejecución con un solo comando (Avanzado)

Puedes usar herramientas como `concurrently` para ejecutar ambos servidores con un solo comando, pero esto requiere configuración adicional.

### Verificar que todo funciona

1. **Backend**: Abre `http://localhost:3000` en tu navegador
   - Deberías ver un mensaje o error (es normal, el backend no tiene interfaz web)

2. **Frontend**: Abre `http://localhost:3001` en tu navegador
   - Deberías ver la página de login de Siscolmenlab

3. **Base de datos**: Ejecuta `docker ps`
   - Deberías ver el contenedor de PostgreSQL corriendo

---

## 📱 Uso de la aplicación

### 1. Registro e Inicio de Sesión

#### Opción A: Registro con Email/Password

1. Abre `http://localhost:3001` en tu navegador
2. Haz clic en "Regístrate" (abajo del formulario de login)
3. Completa el formulario:
   - **Nombre completo**: Tu nombre
   - **Correo electrónico**: Un email válido
   - **Contraseña**: Mínimo 6 caracteres
4. Haz clic en "Crear Cuenta"
5. Serás redirigido automáticamente al chat

#### Opción B: Login con Google

1. Abre `http://localhost:3001` en tu navegador
2. Haz clic en el botón "Google"
3. Selecciona tu cuenta de Google
4. Autoriza la aplicación
5. Serás redirigido automáticamente al chat

#### Opción C: Login con Email/Password (si ya tienes cuenta)

1. Abre `http://localhost:3001` en tu navegador
2. Ingresa tu email y contraseña
3. Haz clic en "Iniciar Sesión"

### 2. Crear una Sala de Chat

1. Una vez en el chat, busca el botón "+" en la sección "SALAS" (barra lateral izquierda)
2. Haz clic en el botón "+"
3. Ingresa un nombre para la sala (ej: "General", "Proyecto X", "Random")
4. Presiona Enter o haz clic en OK
5. La sala aparecerá en la lista y todos los usuarios conectados la verán

### 3. Unirse a una Sala

1. En la barra lateral izquierda, verás la lista de salas disponibles
2. Haz clic en cualquier sala para unirte
3. Verás:
   - El nombre de la sala en la parte superior
   - Los usuarios conectados en esa sala
   - El historial de mensajes

### 4. Enviar Mensajes

1. Asegúrate de estar en una sala (haz clic en una sala de la lista)
2. En la parte inferior, verás un campo de texto que dice "Enviar mensaje a # [nombre-sala]..."
3. Escribe tu mensaje
4. Presiona Enter o haz clic en el botón de enviar (ícono de avión de papel)
5. Tu mensaje aparecerá instantáneamente para todos los usuarios en esa sala

### 5. Ver Usuarios en Línea

- En la parte superior del chat, verás una lista de usuarios conectados en la sala actual
- Cada usuario tiene un indicador verde que muestra que está en línea
- Cuando alguien se une o sale, verás una notificación en el chat

### 6. Eliminar Mensajes

1. Pasa el mouse sobre cualquiera de tus mensajes
2. Aparecerá un ícono de basura
3. Haz clic en el ícono
4. Confirma la eliminación
5. El mensaje desaparecerá para todos los usuarios

### 7. Eliminar Salas

1. En la barra lateral, pasa el mouse sobre una sala
2. Aparecerá un ícono de basura
3. Haz clic en el ícono
4. Confirma la eliminación
5. La sala desaparecerá para todos los usuarios
6. Todos los mensajes de esa sala también se eliminarán

### 8. Cerrar Sesión

1. En la parte inferior de la barra lateral, busca el ícono de salida
2. Haz clic en el ícono
3. Serás redirigido a la página de login

---

## 🏗️ Arquitectura del proyecto

### Estructura de carpetas

```
chat-colaborativo/
├── backend/                    # Servidor (NestJS)
│   ├── prisma/                # Configuración de base de datos
│   │   └── schema.prisma      # Esquema de la base de datos
│   ├── src/
│   │   ├── auth/              # Módulo de autenticación
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── google.strategy.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   └── dto/           # Data Transfer Objects
│   │   ├── chat/              # Módulo de chat
│   │   │   ├── chat.controller.ts
│   │   │   ├── chat.service.ts
│   │   │   └── chat.gateway.ts  # WebSocket
│   │   ├── prisma/            # Servicio de Prisma
│   │   │   └── prisma.service.ts
│   │   ├── app.module.ts      # Módulo principal
│   │   └── main.ts            # Punto de entrada
│   ├── docker-compose.yml     # Configuración de Docker
│   ├── package.json           # Dependencias del backend
│   └── .env                   # Variables de entorno
│
├── frontend/                   # Cliente (Next.js)
│   ├── src/
│   │   ├── app/               # Rutas de la aplicación
│   │   │   ├── chat/          # Página del chat
│   │   │   ├── login/         # Página de login
│   │   │   ├── register/      # Página de registro
│   │   │   ├── auth/callback/ # Callback de OAuth
│   │   │   ├── layout.tsx     # Layout principal
│   │   │   └── globals.css    # Estilos globales
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── chat/          # Componentes del chat
│   │   │   │   ├── ChatSidebar.tsx
│   │   │   │   ├── ChatMessageList.tsx
│   │   │   │   └── ChatInput.tsx
│   │   │   └── ui/            # Componentes UI (shadcn)
│   │   ├── types/             # Tipos de TypeScript
│   │   │   └── chat.ts
│   │   └── lib/               # Utilidades
│   ├── public/                # Archivos estáticos
│   │   └── logo.jpg           # Logo de la aplicación
│   └── package.json           # Dependencias del frontend
│
└── README.md                   # Este archivo
```

### Flujo de datos

```
Usuario → Frontend (Next.js) → Backend (NestJS) → Base de datos (PostgreSQL)
                    ↓                    ↓
              WebSocket (Socket.IO) ← Tiempo Real
```

1. **Usuario interactúa** con la interfaz (frontend)
2. **Frontend envía** una petición HTTP o WebSocket al backend
3. **Backend procesa** la petición (autenticación, validación, lógica)
4. **Backend consulta/modifica** la base de datos si es necesario
5. **Backend responde** al frontend
6. **Frontend actualiza** la interfaz para el usuario
7. **WebSocket notifica** a otros usuarios conectados en tiempo real

### Tecnologías clave y su propósito

| Tecnología | Propósito | Ubicación |
|------------|-----------|-----------|
| **NestJS** | Framework del servidor, organiza el código backend | Backend |
| **Next.js** | Framework del cliente, renderiza la interfaz | Frontend |
| **PostgreSQL** | Base de datos relacional, almacena datos | Docker |
| **Prisma** | ORM, facilita consultas a la base de datos | Backend |
| **Socket.IO** | WebSockets, comunicación en tiempo real | Backend + Frontend |
| **Passport** | Autenticación, maneja login y registro | Backend |
| **JWT** | Tokens de sesión, mantiene usuarios autenticados | Backend |
| **Tailwind CSS** | Estilos, diseño visual de la aplicación | Frontend |
| **shadcn/ui** | Componentes UI, botones, inputs, etc. | Frontend |

---

## 🔧 Solución de problemas

### Problema 1: "Error: EADDRINUSE: address already in use :::3000"

**Causa:** El puerto 3000 ya está siendo usado por otro proceso.

**Solución:**

**Windows:**
```bash
# Encuentra el proceso usando el puerto 3000
netstat -ano | findstr :3000

# Mata el proceso (reemplaza PID con el número que viste)
taskkill /PID <PID> /F

# O usa kill-port
npx kill-port 3000
```

**Mac/Linux:**
```bash
# Encuentra y mata el proceso
lsof -ti:3000 | xargs kill -9

# O usa kill-port
npx kill-port 3000
```

### Problema 2: "Cannot connect to database"

**Causa:** PostgreSQL no está corriendo o la configuración es incorrecta.

**Solución:**

1. Verifica que Docker Desktop esté corriendo
2. Verifica que PostgreSQL esté corriendo:
   ```bash
   docker ps
   ```
3. Si no ves el contenedor, inícialo:
   ```bash
   cd backend
   docker-compose up -d
   ```
4. Verifica el archivo `.env`:
   - La URL de la base de datos debe coincidir con docker-compose.yml
   - Usuario: `myuser`
   - Contraseña: `mypassword`
   - Puerto: `5433`
   - Base de datos: `chat_db`

### Problema 3: "Prisma Client not generated"

**Causa:** El cliente de Prisma no se ha generado después de cambios en el esquema.

**Solución:**
```bash
cd backend
npx prisma generate
```

### Problema 4: Frontend no se conecta al backend

**Causa:** URLs incorrectas o backend no está corriendo.

**Solución:**

1. Verifica que el backend esté corriendo en `http://localhost:3000`
2. Verifica que el frontend esté corriendo en `http://localhost:3001`
3. Abre la consola del navegador (F12) y busca errores
4. Verifica que no haya errores de CORS

### Problema 5: Google OAuth no funciona

**Causa:** Credenciales incorrectas o URIs de redirección mal configuradas.

**Solución:**

1. Verifica que `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` estén en `.env`
2. En Google Cloud Console, verifica que las URIs de redirección sean:
   - `http://localhost:3000/auth/google/redirect`
3. Verifica que la API de Google+ esté habilitada
4. Intenta regenerar las credenciales si el problema persiste

### Problema 6: "Module not found" o errores de importación

**Causa:** Dependencias no instaladas o caché corrupta.

**Solución:**
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json .next
npm install
```

### Problema 7: La base de datos no se sincroniza

**Causa:** Cambios en el esquema de Prisma no aplicados.

**Solución:**
```bash
cd backend

# Opción 1: Push (desarrollo)
npx prisma db push

# Opción 2: Migración (producción)
npx prisma migrate dev --name nombre_de_la_migracion

# Regenerar cliente
npx prisma generate
```

### Problema 8: Mensajes no aparecen en tiempo real

**Causa:** WebSocket no conectado correctamente.

**Solución:**

1. Abre la consola del navegador (F12)
2. Busca mensajes de Socket.IO
3. Verifica que veas "Connected to WebSocket"
4. Si no, verifica que el backend esté corriendo
5. Recarga la página

### Problema 9: Error de compilación en TypeScript

**Causa:** Tipos incorrectos o incompatibilidades.

**Solución:**
```bash
# Frontend
cd frontend
npm run type-check

# Backend
cd backend
npm run build
```

Revisa los errores y corrígelos según las indicaciones.

---

## 📝 Comandos útiles

### Backend

```bash
# Desarrollo
npm run start:dev          # Inicia el servidor en modo desarrollo (auto-reload)
npm run start              # Inicia el servidor en modo normal
npm run build              # Compila el proyecto
npm run start:prod         # Inicia el servidor en modo producción

# Base de datos
npx prisma studio          # Abre interfaz visual de la base de datos
npx prisma db push         # Aplica cambios del esquema a la base de datos
npx prisma generate        # Genera el cliente de Prisma
npx prisma migrate dev     # Crea una nueva migración
npx prisma db seed         # Ejecuta el seed (datos iniciales)

# Docker
docker-compose up -d       # Inicia PostgreSQL en segundo plano
docker-compose down        # Detiene PostgreSQL
docker-compose logs        # Ver logs de PostgreSQL
docker-compose down -v     # Detiene y elimina volúmenes (resetea DB)
docker ps                  # Lista contenedores corriendo
docker logs chat_db        # Ver logs del contenedor de PostgreSQL

# Limpieza
rm -rf node_modules        # Elimina dependencias
npm install                # Reinstala dependencias
```

### Frontend

```bash
# Desarrollo
npm run dev                # Inicia el servidor de desarrollo
npm run build              # Compila para producción
npm run start              # Inicia el servidor de producción
npm run lint               # Verifica errores de código

# Limpieza
rm -rf node_modules .next  # Elimina dependencias y caché
npm install                # Reinstala dependencias
```

### Git

```bash
git status                 # Ver estado de cambios
git add .                  # Agregar todos los cambios
git commit -m "mensaje"    # Crear commit con mensaje
git push origin main       # Subir cambios a GitHub
git pull origin main       # Descargar cambios de GitHub
git log                    # Ver historial de commits
```

---

## ❓ Preguntas frecuentes

### ¿Puedo usar esta aplicación en producción?

Sí, pero necesitas hacer algunos cambios:

1. **Cambiar JWT_SECRET** por una clave más segura
2. **Configurar un dominio** real (no localhost)
3. **Usar HTTPS** para conexiones seguras
4. **Configurar variables de entorno** en el servidor de producción
5. **Usar una base de datos** en la nube (no Docker local)
6. **Configurar CORS** correctamente
7. **Agregar rate limiting** para prevenir abuso

### ¿Cómo agrego más funcionalidades?

1. **Backend**: Crea nuevos endpoints en `chat.controller.ts` y lógica en `chat.service.ts`
2. **Frontend**: Crea nuevos componentes en `src/components/`
3. **Base de datos**: Modifica `prisma/schema.prisma` y ejecuta `npx prisma db push`
4. **WebSocket**: Agrega nuevos eventos en `chat.gateway.ts`


### ¿Cómo agrego más métodos de autenticación?

1. Instala la estrategia de Passport correspondiente (ej: `passport-facebook`)
2. Crea un nuevo archivo de estrategia en `backend/src/auth/`
3. Agrega las rutas en `auth.controller.ts`
4. Configura las credenciales en `.env`
5. Agrega el botón en el frontend

### ¿Puedo usar otra base de datos?

Sí, Prisma soporta:
- PostgreSQL (actual)
- MySQL
- SQLite
- SQL Server
- MongoDB
- CockroachDB

Solo necesitas cambiar el `provider` en `prisma/schema.prisma` y la `DATABASE_URL` en `.env`.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.

---

## 👥 Autor

**Brandon Garcia**
- GitHub: [@garcia-bj](https://github.com/garcia-bj)
- Proyecto: [Chat Colaborativo](https://github.com/garcia-bj/chat-colaborativo)


**¡Disfruta construyendo con Siscolmenlab!** 🚀
