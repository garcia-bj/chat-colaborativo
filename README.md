# Chat Colaborativo

Aplicación de chat en tiempo real construida con NestJS (Backend) y Next.js (Frontend).

## Requisitos Previos

*   Node.js (v18 o superior)
*   Docker y Docker Compose
*   Cuenta de Google Cloud Platform (para OAuth)

## Estructura del Proyecto

*   `backend/`: API REST y WebSocket server (NestJS).
*   `frontend/`: Interfaz de usuario (Next.js).

## Configuración

### 1. Base de Datos (PostgreSQL)

El proyecto usa Docker para la base de datos. Asegúrate de que el puerto `5433` esté libre.

```bash
cd backend
docker-compose up -d
```

### 2. Backend (NestJS)

1.  Navega a la carpeta `backend`:
    ```bash
    cd backend
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Configura las variables de entorno:
    Crea un archivo `.env` en `backend/` con el siguiente contenido:
    ```env
    DATABASE_URL="postgresql://myuser:mypassword@localhost:5433/chat_db?schema=public"
    GOOGLE_CLIENT_ID="TU_CLIENT_ID_DE_GOOGLE"
    GOOGLE_CLIENT_SECRET="TU_CLIENT_SECRET_DE_GOOGLE"
    JWT_SECRET="una_clave_secreta_segura"
    ```
    *Nota: Debes obtener el Client ID y Secret en la consola de Google Cloud. Configura la URI de redirección autorizada como `http://localhost:3000/auth/google/redirect`.*

4.  Ejecuta las migraciones de base de datos:
    ```bash
    npx prisma migrate dev --name init
    ```
5.  Inicia el servidor de desarrollo:
    ```bash
    npm run start:dev
    ```
    El backend correrá en `http://localhost:3000`.

### 3. Frontend (Next.js)

1.  Navega a la carpeta `frontend`:
    ```bash
    cd frontend
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
    El frontend correrá en `http://localhost:3001`.

## Uso

1.  Abre `http://localhost:3001` en tu navegador.
2.  Haz clic en "Iniciar sesión con Google".
3.  Una vez autenticado, podrás crear salas y chatear en tiempo real.

## Solución de Problemas Comunes

*   **Error de conexión a BD**: Asegúrate de que Docker esté corriendo (`docker ps`). Si falla, intenta `docker-compose down -v` y luego `up -d`.
*   **Error de Google OAuth**: Verifica que `GOOGLE_CLIENT_ID` y `SECRET` sean correctos y que la URL de callback (`http://localhost:3000/auth/google/redirect`) esté agregada en la consola de Google.
*   **Puerto ocupado**: Si el puerto 3000 o 3001 está ocupado, cierra los procesos que los usen o cambia la configuración en `package.json`.
