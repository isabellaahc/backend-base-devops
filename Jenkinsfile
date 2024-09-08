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
                        script {
                            sh 'npm run build'
                        }
                    }
                }
            }
    }
}