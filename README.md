# Playwright UI Test Automation with TypeScript  

A comprehensive suite of UI test cases built using Playwright for the [SauceDemo](https://saucedemo.com) website. This repository demonstrates how Playwright can seamlessly integrate with various tools and technologies for efficient test execution, reporting, and CI/CD automation.  

## Table of Contents  
- [Getting Started](#getting-started)  
- [Database Integration](#database-integration)  
- [Test Trend Analysis with InfluxDB 2.0](#test-trend-analysis-with-influxdb-20)  
- [Docker Integration](#docker-integration)  
- [Jenkins Pipeline](#jenkins-pipeline)  
- [GitHub Actions Workflow](#github-actions-workflow)  
- [Kubernetes Deployment](#kubernetes-deployment)  
- [Live Test Execution with ReportPortal](#live-test-execution-with-reportportal)  
- [Code Quality with Husky](#code-quality-with-husky)  
- [Related Blogs & Resources](#related-blogs--resources)  

## Getting Started  

### Clone and Run Locally  
Clone the repository and install dependencies:  
```sh  
git clone https://github.com/thananauto/playwright-ui-typescript.git  
cd playwright-ui-typescript  
npm install  
npx playwright test  
```  
Test reports will be generated with timestamps at:  
```sh  
./playwright-report/<timestamp>/  
```  

## Database Integration  

### Test Trend Analysis with InfluxDB 2.0  
Playwright's custom reporter allows test summary results to be stored in a time-series database like InfluxDB 2.0.  

- Set up InfluxDB using Docker by referring to `docker-compose.yml`.  
- Configure the integration using files in `./custom_report`.  

## Docker Integration  

To run tests inside a Docker container:  

1. Build the Docker image:  
   ```sh  
   docker build -t playwright-tests .  
   ```  
2. Run tests inside the container:  
   ```sh  
   docker run -it -v $(pwd)/report:/app/playwright-report playwright-tests -c "npx playwright test"  
   ```  

## Jenkins Pipeline  

Execute tests inside a Docker container through a Jenkins pipeline. The pipeline archives test results for each build.  

## GitHub Actions Workflow  

For continuous integration, GitHub Actions can execute Playwright tests seamlessly.  

1. **Run tests in a GitHub-hosted Linux server**:  [Workflow](https://github.com/thananauto/playwright-ui-typescript/blob/main/.github/workflows/playwright-test.yml)  
2. **Build and push Docker image to Docker Hub**:  [Workflow](https://github.com/thananauto/playwright-ui-typescript/blob/main/.github/workflows/docker-registry.yml)  
3. **Pull Docker image and execute tests**:  [Workflow](https://github.com/thananauto/playwright-ui-typescript/blob/main/.github/workflows/test-from-docker.yml)  

## Kubernetes Deployment  

Execute Playwright tests within a Kubernetes environment using the provided manifest files:  

1. **Persistent Volume for test results**:  [pv.yml](https://github.com/thananauto/playwright-ui-typescript/blob/main/k8s-manifests/pv.yml)  
2. **Persistent Volume Claim**:  [pvc.yml](https://github.com/thananauto/playwright-ui-typescript/blob/main/k8s-manifests/pvc.yml)  
3. **Deploy job for test execution**:  [job.yml](https://github.com/thananauto/playwright-ui-typescript/blob/main/k8s-manifests/job.yml)  

## Live Test Execution with ReportPortal  

To enable real-time test execution monitoring with ReportPortal:  

1. Start ReportPortal using Docker:  
   ```sh  
   docker compose -f docker-compose-reportportal.yml up  
   ```  
2. Configure `rpConfig.ts` and `.env.rp` with ReportPortal details.  
3. Add the reporter type in `playwright.config.ts`:  
   ```ts  
   reporters: [['@reportportal/agent-js-playwright', rpConfig]]  
   ```  

## Code Quality with Husky  

Husky enforces code quality by ensuring consistent commit messages and code formatting.  

- Prettier for code formatting  
- Lint-staged for staged file validation  
- Commit lint to enforce commit message conventions  

For structured commits, follow this format:  
```sh  
[QA][Smoke] - Fixed Smoke test  
```  
This indicates that the commit is related to the QA environment and includes a smoke test fix.  

**For more details, check this blog:**  
[Custom Git Commit Rules with Husky](https://medium.com/@thananjayan1988/apply-custom-rules-for-git-commit-messages-husky-6743680366be)  

## Related Blogs & Resources  

- [Executing Tests on Remote Browser and Browser in Servers](https://medium.com/@thananjayan1988/playwright-executing-tests-on-remote-browser-and-browser-in-servers-48c9979b5b4f)  
- [Reusing Browser Sessions for Debugging in Playwright](https://medium.com/@thananjayan1988/reusing-browser-sessions-for-debugging-in-playwright-bac94cd6d999)  
- [Optimizing Playwright Test Execution in Minimal Docker Images](https://medium.com/@thananjayan1988/optimize-the-docker-image-for-playwright-tests-3688c7d4be5f)  
- [Live Visualization of Test Results Using Playwright and InfluxDB 2.0](https://medium.com/@thananjayan1988/live-visualization-of-test-results-using-playwright-and-influxdb-2-0-2a193656dda2)  
- [CI/CD Pipeline: Running Playwright Tests in Jenkins with Docker](https://medium.com/@thananjayan1988/ci-cd-pipeline-running-playwright-tests-in-jenkins-with-docker-f9f08fda4bfc)  
- [Enhancing Playwright Test Reports with Decorators](https://medium.com/@thananjayan1988/how-to-enhance-the-playwright-html-report-using-test-step-with-typescript-decorator-4b45797a3031)  

For a complete list of related blogs, check out [Medium](https://medium.com/@thananjayan1988).  
