# Portal de Autogestión Móvil - Microfrontends

## Descripción General

Este proyecto implementa un portal de autogestión para clientes de telefonía móvil, utilizando una arquitectura de microfrontends. El objetivo es permitir que diferentes equipos puedan desarrollar y desplegar módulos de manera independiente, orquestados por una Shell Application, y consumiendo servicios de un backend centralizado.

---

## Estructura del Proyecto

La estructura propuesta es la siguiente:

```
/portal-autogestion-movil/
│
├── docker-compose.yml
├── README.md
│
├── shell-frontend/           # Shell Application (Next.js, React, TS)
│
├── mfe-cupos/                # Microfrontend: Cupos disponibles (Next.js, React, TS)
│
├── mfe-billing/              # Microfrontend: Facturación (Next.js, React, TS)
│
├── backend/                  # Backend API (Spring Boot)
│   ├── src/
│   └── Dockerfile
│
└── db/                       # Base de datos (PostgreSQL, datos de prueba, scripts)
    └── init.sql
```

---

## Comandos Iniciales para Crear la Estructura

### 1. Clonar el repositorio y crear carpetas base

```bash
git clone https://github.com/tuusuario/portal-autogestion-movil.git
cd portal-autogestion-movil

# Crear carpetas base
mkdir shell-frontend mfe-cupos mfe-billing backend db
```

### 2. Inicializar Shell Application (Next.js + TS)

```bash
cd shell-frontend
npx create-next-app@latest . --typescript
# Instalar dependencias adicionales
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
cd ..
```

### 3. Inicializar Microfrontends (Next.js + TS)

```bash
cd mfe-cupos
npx create-next-app@latest . --typescript
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
cd ..

cd mfe-billing
npx create-next-app@latest . --typescript
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
cd ..
```

### 4. Inicializar Backend (Quarkus o Spring Boot)

#### Opción A: Quarkus

```bash
cd backend
mvn io.quarkus.platform:quarkus-maven-plugin:3.10.0:create \
    -DprojectGroupId=com.autogestion \
    -DprojectArtifactId=backend \
    -DclassName="com.autogestion.api.GreetingResource" \
    -Dpath="/hello"
# Agregar extensiones necesarias (RESTEasy, JPA, PostgreSQL, etc.)
mvn quarkus:add-extension -Dextensions="resteasy-reactive, hibernate-orm, jdbc-postgresql"
cd ..
```

#### Opción B: Spring Boot

```bash
cd backend
# Usar Spring Initializr o el siguiente comando si tienes Spring CLI
spring init --dependencies=web,data-jpa,postgresql --java-version=17 --build=maven backend
cd ..
```

### 5. Inicializar Base de Datos (PostgreSQL con Docker)

```bash
# Crear archivo db/init.sql con el modelo de datos sugerido
# (Agregar scripts de creación de tablas y datos de prueba)
```

### 6. Crear Dockerfile para cada servicio

- shell-frontend/Dockerfile
- mfe-cupos/Dockerfile
- mfe-billing/Dockerfile
- backend/Dockerfile
- db/init.sql (para inicialización de la base de datos)

### 7. Crear docker-compose.yml en la raíz

```yaml
# Ejemplo básico (completar según avance del proyecto)
version: '3.8'
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: autogestion
      POSTGRES_PASSWORD: autogestion
      POSTGRES_DB: autogestion
    ports:
      - "5432:5432"
    volumes:
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql
  # Agregar servicios para backend y microfrontends
```

---

## Estrategia de Microfrontends

- **Shell Application:** Orquesta la navegación global, el header común y el lazy loading de los microfrontends.
- **Microfrontends:** Cada módulo (Cupos, Facturación) es un proyecto Next.js independiente, integrado mediante Module Federation o Multi Zone (según la solución elegida).
- **Comunicación:** Los microfrontends se comunican con el backend centralizado a través de APIs RESTful.
- **Despliegue:** Cada microfrontend y el backend se ejecutan en contenedores Docker independientes, orquestados con Docker Compose.

---

## Tecnologías

- **Frontend:** React 18+, Next.js 14+, TypeScript 5.x, Tailwind CSS, Zustand/Redux Toolkit, Module Federation/Multi Zone
- **Backend:** Quarkus 3.x o Spring Boot 3.x, Java 17+, JPA/Hibernate/Panache
- **Base de Datos:** PostgreSQL (contenedorizado)
- **Infraestructura:** Docker, Docker Compose

---

## Comandos para Levantar la Aplicación

```bash
# Levantar toda la aplicación
# (Asegúrate de tener Docker y Docker Compose instalados)
docker-compose up --build
```

---

## Siguientes Pasos

- [ ] Inicializar cada proyecto con los comandos anteriores
- [ ] Configurar integración entre Shell y microfrontends (Module Federation/Multi Zone)
- [ ] Implementar endpoints RESTful en el backend
- [ ] Crear scripts de base de datos y datos de prueba
- [ ] Crear Dockerfile para cada servicio
- [ ] Completar docker-compose.yml para todos los servicios
- [ ] Documentar endpoints y comandos en este README

---

## Justificación de la Estrategia de Microfrontends

- Permite el desarrollo y despliegue independiente de cada módulo.
- Facilita la escalabilidad y el mantenimiento.
- Cada equipo puede trabajar con su propio stack y ciclo de vida.
- La Shell Application centraliza la navegación y la experiencia de usuario.

---

## Contacto

Para dudas o sugerencias, contacta a [tu correo].