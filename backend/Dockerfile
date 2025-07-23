FROM openjdk:17-jdk-slim

WORKDIR /app

# Copiar archivos de configuración de Maven
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn
COPY pom.xml .

# Dar permisos de ejecución al wrapper de Maven
RUN chmod +x ./mvnw

# Descargar dependencias
RUN ./mvnw dependency:go-offline -B

# Copiar código fuente
COPY src ./src

# Compilar la aplicación
RUN ./mvnw clean package -DskipTests

# Exponer puerto
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"] 