pipeline {
    agent any
    environment {
        USERNAME = 'Isabel Anabalon'
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
    }
}