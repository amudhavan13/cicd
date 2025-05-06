pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/amudhavan13/cicd.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    docker.build('react-frontend', 'frontend')
                    docker.build('react-backend', 'backend')
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                        docker.image('react-frontend').push('latest')
                        docker.image('react-backend').push('latest')
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d --build'
            }
        }
    }
}

