pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                // This step should not normally be used in your script. Consult the inline help for details.
                withDockerRegistry(credentialsId: 'docker-hub', url: 'https://index.docker.io/v1/') {
                sh 'docker build -t vitornhat108/cdcn-fe:v1 .'
                sh 'docker push vitornhat108/cdcn-fe:v1'
    // some block
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}