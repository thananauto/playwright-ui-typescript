pipeline {
    agent {
        docker {
            // assign some memory and remove container for every execution
        
            image 'thanandock/playwright-ui-typescript:latest'
            args '--shm-size=1g  --rm -v ${env.WORKSPACE}/playwright-report:/app/playwright-report' 
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
                    sh '''
                      echo "Failed test count: ${count}"
                     '''
                    env.FAIL_COUNT = count
                }
            }
        }
    }
    post {
        always {
            echo ' Fail the pipeline if FAIL_COUNT > 0'
            sh '''
                if [ ${env.FAIL_COUNT} -gt 0 ]; then
                    echo "Test failures detected. Failing the pipeline."
                    exit 1
                fi
                echo 'Pipeline Successfully executed.'
                '''
            cleanWs() // Cleans up the workspace after execution

        }
        failure{
             echo 'Archiving test report...'
             archiveArtifacts artifacts: "./playwright-report", allowEmptyArchive: false
        }
    }
}