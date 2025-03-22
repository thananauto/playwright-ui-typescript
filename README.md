# playwright-ui-typescript

Sample set of UI test cases build for the website [saucedemo](https://saucedemo.com). This repo can showcase that how this repo can
integrate or use with other tools

## Table of contents

- Local copy
- Mongo DB database integration
- Test Trend by Influx DB 2.0
- Dockerfile
- Jenkins pipeline
- Github Actions Workflow
- Kubernetes
- ReportPortal - Live execution
- Husky - Prettier, Linted-stage and Commit lint

### Local copy

Just clone this repo and run these commands `npm install` for dowload all dependencies and run `npx playwright test`. You can find the
report in this path with timestamp `./playwright-report/<timestamp>`

### Test Trend - Influx DB 2.0

By using the custom reporter of playwright, we can easily feed the summary result to any time series database. Here it used the docker image
to build and run the server, refer `docker-compose.yml` for setup. And also see the `./custom_report` folder for code configuration.

### Dockerfile

If you want to build and run the test case in `Docker` environment. Clone this repo and to build the image `docker build -t <name>:<tag> .`
and run these command for test execution `docker run -it -v $(pwd)/report:/app/playwright-report <name>:<tag> -c "npx playwright test"`

### Jenkins

Execute the test inside the docker container from Jenkins pipeline and test-results will be archived for each job build.

### Github Actions Workflow

For continious integration we can easily accomodate the playwright test execution in github action workflow

1. Execute playwright test directly in git hosted linux server. Refer this
   [flow](https://github.com/thananauto/playwright-ui-typescript/blob/main/.github/workflows/playwright-test.yml)
2. Build the image and push to docker hub, refer this
   [flow](https://github.com/thananauto/playwright-ui-typescript/blob/main/.github/workflows/docker-registry.yml)
3. Pull the image from docker hub and execute the test, refer this
   [flow](https://github.com/thananauto/playwright-ui-typescript/blob/main/.github/workflows/test-from-docker.yml)

### Kubernetes

If you would like to execute the test inside the kubernetes pod refer these manifest file

1. For Persistent Volume to save to test results, refer
   [this](https://github.com/thananauto/playwright-ui-typescript/blob/main/k8s-manifests/pv.yml).
2. Allow the pod to share the memory with host using persistent valume claim, refer
   [this](https://github.com/thananauto/playwright-ui-typescript/blob/main/k8s-manifests/pvc.yml).
3. Deploy the job to execute the test inside the image, refer
   [this](https://github.com/thananauto/playwright-ui-typescript/blob/main/k8s-manifests/job.yml).

### Report Portal - Live execution
To setup a report portal instance with docker refer this [yaml](https://github.com/thananauto/playwright-ui-typescript/blob/main/docker-compose-reportportal.yml), Just run docker compose `docker compose -f docker-compose-reportportal.yml up`
Add the configuration and environment details in `rpConfig.ts` and `.env.rp`
Add this reporter type `['@reportportal/agent-js-playwright', rpConfig]` in `playwright.config.ts`

### Husky code commit
If you are going to wotking as a team, this library helps and enforces the team to follow coding style, allow the user to write clean code. This is straight forward, please refer the [documentation](https://typicode.github.io/husky/)
Here I used some customised pattern like from every commit any one can understand ex: `[QA][Smoke] - Fixed Smoke test` it's clearly says these commit from QA environment with Smoke test fixes. I wrote a separate [blog](https://medium.com/@thananjayan1988/apply-custom-rules-for-git-commit-messages-husky-6743680366be) about this.

## For more details, refer these blogs
- [Executing Tests on Remote Browser and Browser in Servers](https://medium.com/@thananjayan1988/playwright-executing-tests-on-remote-browser-and-browser-in-servers-48c9979b5b4f)
- [Reusing Browser Sessions for Debugging in Playwright](https://medium.com/@thananjayan1988/reusing-browser-sessions-for-debugging-in-playwright-bac94cd6d999)
- [Efficient Playwright test execution in minimal docker images](https://medium.com/@thananjayan1988/optimize-the-docker-image-for-playwright-tests-3688c7d4be5f)
- [Live Visualization of Test Results Using Playwright and InfluxDB 2.0](https://medium.com/@thananjayan1988/live-visualization-of-test-results-using-playwright-and-influxdb-2-0-2a193656dda2)
- [Integrating Playwright in CI with GitHub Actions and Docker](https://medium.com/@thananjayan1988/integrating-playwright-in-ci-with-github-actions-and-docker-7baafe76de99)
- [Containerized Browser Testing with Playwright on Kubernetes](https://medium.com/@thananjayan1988/containerized-browser-testing-with-playwright-on-kubernetes-09743e5d2362)
- [Load Page Object class dynamically ](https://medium.com/@thananjayan1988/optimizing-playwright-tests-with-dynamic-page-object-loading-dfda67be81e4)
- [Running playwright tests from Jenkins](https://medium.com/@thananjayan1988/ci-cd-pipeline-running-playwright-tests-in-jenkins-with-docker-f9f08fda4bfc)
- [Add build details of CI to report](https://medium.com/@thananjayan1988/how-playwright-metadata-elevates-reporting-in-ci-cd-5f4460b7b795)
- [Execute playwright test in Aerokube moon](https://medium.com/devops-dev/deploying-aerokube-moon-for-browser-automation-with-playwright-using-helm-20ece0964048)
- [Enhance Playwright Test Report with decorators](https://medium.com/@thananjayan1988/how-to-enhance-the-playwright-html-report-using-test-step-with-typescript-decorator-4b45797a3031)
- [Running test in Jenkins pipeline with docker container](https://medium.com/@thananjayan1988/ci-cd-pipeline-running-playwright-tests-in-jenkins-with-docker-f9f08fda4bfc)



