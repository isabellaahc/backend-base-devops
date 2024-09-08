pipeline {
    agent any
    options {
        timeout(time: 3, unit: 'SECONDS')
    }
    stages {
        stages {
            stage('Instalacion de dependencias') {
                agent {
                    docker {
                        image 'node:20.11.1-alpine3.19'
                    }
                }
                steps {
                    sh 'npm install'
                }
            }
            stage('Ejecución de Test Unitarios') {
                steps {
                    sh 'npm run test'
                }
            }
            stage('Build de la app') {
                steps {
                    echo 'Deploying....'
                }
            }
        }
    }
}