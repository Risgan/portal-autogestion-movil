# Portal de Autogestión - Microfrontends

Sistema de autogestión móvil desarrollado con arquitectura de microfrontends, backend Spring Boot y base de datos PostgreSQL.

## 🏗️ Arquitectura

- **Shell Frontend**: Aplicación host que orquesta los microfrontends
- **Microfrontend Facturación**: Gestión de facturas y pagos
- **Microfrontend Cupos**: Visualización de consumo y cupos disponibles
- **Backend**: API REST con Spring Boot
- **Base de Datos**: PostgreSQL con datos de prueba

## 🏛️ Infraestructura

### Containerización: Docker + Docker Compose

El proyecto utiliza Docker y Docker Compose para garantizar un entorno de desarrollo y despliegue consistente:

- **Contenedores independientes** para cada servicio
- **Red dedicada** para comunicación entre servicios
- **Volúmenes persistentes** para datos de PostgreSQL
- **Variables de entorno** configuradas para cada servicio
- **Dependencias automáticas** entre servicios

**Servicios contenerizados:**
- `autogestion_db` - Base de datos PostgreSQL
- `autogestion_backend` - API Spring Boot
- `autogestion_shell` - Shell Frontend (Next.js)
- `autogestion_mf_facturacion` - Microfrontend Facturación
- `autogestion_mf_cupos` - Microfrontend Cupos

### Base de Datos: Contenerizada con datos de prueba

- **PostgreSQL 16** ejecutándose en contenedor Docker
- **Datos de prueba pre-cargados** para 3 usuarios con diferentes planes
- **Script de inicialización automática** (`db/init.sql`)
- **Persistencia de datos** mediante volúmenes Docker
- **Configuración optimizada** para desarrollo y pruebas

**Datos incluidos:**
- Usuarios con diferentes planes (Básico, Premium, Empresarial)
- Facturas históricas (2024-2025)
- Registros de consumo y uso de servicios
- Información de planes y tarifas


## 🚀 Inicio Rápido

### Prerrequisitos

- Docker
- Docker Compose
- Node.js 18
- Java 17

### Ejecutar con Docker Compose

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Risgan/portal-autogestion-movil
   
   ```

2. **Ejecutar toda la infraestructura**
   ```bash
   docker-compose up -d
   ```

3. **Verificar que todos los servicios estén corriendo**
   ```bash
   docker-compose ps
   ```

4. **Acceder a la aplicación**
   - Shell Portal Autogestión: http://localhost:3001
   - Microfrontend Cupos: http://localhost:3002
   - Microfrontend Facturación: http://localhost:3003
   - Backend API: http://localhost:9080
   - Base de Datos: localhost:5454

### Servicios Disponibles

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| Shell Portal Autogestión | 3001 | Aplicación host principal |
| MF Facturación | 3002 | Microfrontend de facturas |
| MF Cupos | 3003 | Microfrontend de cupos |
| Backend API | 9080 | API REST Spring Boot |
| PostgreSQL | 5454 | Base de datos |

## 🛠️ Desarrollo Local

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend (Shell)

```bash
cd frontend/portal-autogestion
npm install
npm run dev
```

### Microfrontend Facturación

```bash
cd frontend/mf-facturacion
npm install
npm run dev
```

### Microfrontend Cupos

```bash
cd frontend/mf-cupos
npm install
npm run dev
```

## 📊 Datos de Prueba

La base de datos incluye datos de prueba para 3 usuarios:

- **Juan Pérez** (12345678) - Plan Básico
- **Ana Gómez** (87654321) - Plan Premium
- **Carlos Ruiz** (11223344) - Plan Empresarial

## 🔧 Configuración

### Variables de Entorno

- `POSTGRES_USER`: Usuario de la base de datos
- `POSTGRES_PASSWORD`: Contraseña de la base de datos
- `POSTGRES_DB`: Nombre de la base de datos
- `SPRING_DATASOURCE_URL`: URL de conexión a la base de datos
- `NEXT_PUBLIC_API_URL`: URL del backend para los frontends

### Puertos

Los puertos pueden ser modificados en el archivo `docker-compose.yml`:

```yaml
ports:
  - "PUERTO_LOCAL:PUERTO_CONTAINER"
```

## 📁 Estructura del Proyecto

```
PruebaTecnica/
├── backend/                
├── front4/
│   ├── portal-autogestion/ 
│   ├── mf-facturacion/     
│   └── mf-cupos/           
├── db/
│   └── init.sql           
├── docker-compose.yml     
└── README.md              
```

## 🐳 Comandos Docker Útiles

### Ver logs de un servicio específico
```bash
docker-compose logs -f backend
docker-compose logs -f shell-frontend
```

### Reiniciar un servicio
```bash
docker-compose restart backend
```

### Detener todos los servicios
```bash
docker-compose down
```

### Detener y eliminar volúmenes
```bash
docker-compose down -v
```

### Reconstruir imágenes
```bash
docker-compose build --no-cache
```


### Logs y Debugging

```bash
# Ver todos los logs
docker-compose logs

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
```

## 📝 API Endpoints

### Usuarios

#### Obtener usuario por número de identificación
- **GET** `/api/users/{numberId}`
- **Descripción**: Obtiene la información completa de un usuario por su número de identificación
- **Parámetros**:
  - `numberId` Número de identificación del usuario
- **Respuesta**: Objeto `User` con información completa del usuario y su plan

#### Obtener uso actual de un usuario
- **GET** `/api/users/{userId}/usage`
- **Descripción**: Obtiene el uso actual más reciente de un usuario
- **Parámetros**:
  - `userId` ID del usuario
- **Respuesta**: Objeto `Usage` con el consumo actual de datos, minutos y SMS

#### Obtener historial de uso de un usuario
- **GET** `/api/users/{userId}/usage/history`
- **Descripción**: Obtiene todo el historial de uso de un usuario
- **Parámetros**:
  - `userId` ID del usuario
- **Respuesta**: Array de objetos `Usage` ordenados por fecha de actualización

### Facturas

#### Obtener facturas de un usuario
- **GET** `/api/bills/users/{userId}`
- **Descripción**: Obtiene las facturas de un usuario, con filtros opcionales por fecha
- **Parámetros**:
  - `userId` ID del usuario
  - `startdate` Fecha de inicio para filtrar
  - `enddate` Fecha de fin para filtrar
- **Respuesta**: Array de objetos `Bill` con información de las facturas

#### Descargar factura
- **GET** `/api/bills/{billId}/download`
- **Descripción**: Descarga una factura en el formato especificado
- **Parámetros**:
  - `billId` ID de la factura
  - `format` Formato de descarga (default: "json")
- **Respuesta**: Archivo binario de la factura

## 📊 Esquemas de Datos

### User
```json
{
  "id": "integer",
  "accountNumber": "string",
  "numberId": "string", 
  "phoneNumber": "string",
  "name": "string",
  "email": "string",
  "plan": "Plan",
  "createdAt": "date-time"
}
```

### Plan
```json
{
  "id": "integer",
  "name": "string",
  "price": "number",
  "dataGb": "integer",
  "minutes": "integer", 
  "sms": "integer",
  "description": "string"
}
```

### Usage
```json
{
  "id": "integer",
  "user": "User",
  "dataGb": "integer",
  "minutes": "integer",
  "sms": "integer", 
  "lastUpdated": "date-time"
}
```

### Bill
```json
{
  "id": "integer",
  "user": "User",
  "plan": "Plan",
  "period": "string",
  "amount": "number",
  "dueDate": "date",
  "issueDate": "date",
  "createdAt": "date-time"
}
```

## 🔗 URL Base
- **Desarrollo**: http://localhost:9080
- **Swagger UI**: http://localhost:9080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:9080/v3/api-docs

