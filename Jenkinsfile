pipeline{
    agent any

    stages {
        stage('init'){
            steps {
                script {
                    sh "mkdir -p report && cp data.json index.html main.js style.css report/"
                    publishHTML(
                            [allowMissing         : false,
                             alwaysLinkToLastBuild: true,
                             keepAll              : true,
                             reportDir            : 'report',
                             reportFiles          : 'index.html',
                             reportName           : 'D3-JSON-Demo',
                             reportTitles         : 'demo'])
                    deleteDir()
                }
            }
        }
    }
}