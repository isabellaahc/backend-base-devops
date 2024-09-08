pipeline {
    agent any
    options {
        timeout(time: 3, unit: 'SECONDS')
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
        stage('Creacion de contenedor docker'){
            steps{
                sh 'docker build -t backend-base-devops:latest .'
            }
        }
    }
}