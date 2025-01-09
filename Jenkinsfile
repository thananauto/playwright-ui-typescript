pipeline {
    agent {
        docker {
            image 'thanandock/playwright-ui-typescript:latest'
            args '--shm-size=1g  --rm -v ${env.WORKSPACE}/playwright-report:/app/playwright-report' // assign some memory and remove container for every execution
        }
    }
    stages {
        stage('Run Tests') {
            steps {
                sh '''
                    echo 'Starting Playwright tests...'
                    npx playwright test'
                '''
                 }
        }
        stage('Check Failures') {
            steps {
                script {
                    // Extract 'count' from the result file using shell command
                    def count = sh(script: "cat ./playwright-report/result.txt | grep Failed | cut -d ':' -f 2 | tr -d ' '", returnStdout: true).trim()
                    env.FAIL_COUNT = count
                }
            }
        }
    }
    post {
        always {
            script {
                // Convert env.COUNT to an integer
                int count = env.FAIL_COUNT as Integer

                // Check if count is greater than 0
                if (count > 0) {
                    echo "COUNT is greater than 0. Exiting pipeline."
                    currentBuild.result = 'FAILURE' // Mark the build as failed
                    error("Pipeline stopped because COUNT is greater than 0.")
                } else {
                    echo "COUNT is not greater than 0. Proceeding with pipeline."
                }
            }
        }
        failure{
             echo 'Archiving test report...'
             archiveArtifacts artifacts: "./playwright-report", allowEmptyArchive: false
        }
    }
}