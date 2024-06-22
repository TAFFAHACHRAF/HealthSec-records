FROM openjdk:17-oracle
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} Healthcare-service.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "Healthcare-service.jar"]
