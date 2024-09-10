pipeline {
    agent any
    environment {
        USERNAME = 'isabel'
    }
    stages {
        stage('Build y Test Unitarios') {
            agent {                    
                docker {
                    image 'node:20.11.1-alpine3.19'
                    reuseNode true
                    }
                }
            stages{
                stage('Instalación de dependencias del proyecto') {
                    steps {
                        sh 'npm install'
                    }
                }
                stage('Ejecución de Test Unitarios') {
                    steps {
                        sh 'npm run test'
                    }
                }
                stage('Build de la aplicación') {
                    steps{
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('Code Quality'){
            stages {
                stage('analisis de sonarqube'){
                    agent {                    
                        docker {
                            image 'sonarsource/sonar-scanner-cli'
                            args '--network="devops-infra_default"'
                            reuseNode true
                        }
                    }
                    steps{
                        script {
                            withSonarQubeEnv('sonarqube') {
                                sh 'sonar-scanner -Dproject.settings=sonar-project.properties'
                            }
                        }
                    }
                }
            }
        }
        stage('Creacion de contenedor docker y push a nexus'){
            steps{
                script {
                    docker.withRegistry('http://localhost:8082', 'clave-nexus') {
                        sh 'docker build -t backend-base-devops:latest .'
                        sh 'docker tag backend-base-devops:latest localhost:8082/backend-base-devops:latest'
                        sh 'docker push localhost:8082/backend-base-devops:latest'
                    }
                }
            }
        }
        stage('Despliegue de la aplicación'){
            steps{
                script {
                   docker.withRegistry('http://localhost:8082', 'clave-nexus') {
                        sh 'docker compose pull'
                        sh 'docker compose up --force-recreate --build -d'
                    }
                }
            }
        }
    }
}