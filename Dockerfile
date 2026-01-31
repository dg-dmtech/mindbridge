############################
# 1) Build
############################
FROM maven:3.9.9-amazoncorretto-21 AS build

WORKDIR /app

# Cache de dependências
COPY pom.xml .
RUN mvn -B dependency:go-offline

# Código-fonte
COPY src ./src

# Build do jar
RUN mvn -B clean package -DskipTests


############################
# 2) Runtime
############################
FROM amazoncorretto:21

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENV SPRING_PROFILES_ACTIVE=prod
ENV JAVA_OPTS="-Xms256m -Xmx512m"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
