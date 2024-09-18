# playwright-ui-typescript
Sample set of UI test cases build for the website [saucedemo](https://saucedemo.com). This repo can showcase that how this repo can integrate or use with other tools

## Table of contents
* Local copy
* Mongo DB database integration
* Test Trend by Influx DB 2.0
* Dockerfile
* Github Actions Workflow
* Kubernetes


### Local copy
Just clone this repo and run these commands `npm install` for dowload all dependencies and run `npx playwright test`.
You can find the report in this path with timestamp `./playwright-report/<timestamp>`

### Test Trend - Influx DB 2.0
By using  the custom reporter of playwright, we can easily feed  the summary result to any time series database. Here it used the docker image to build and run the server, refer `docker-compose.yml` for setup. And also see the `./custom_report` folder for code configuration.

### Dockerfile
If you want to build and run the test case in `Docker` environment. Clone this repo and to build the image
`docker build -t <name>:<tag> .` and run these command for test execution `docker run -it -v $(pwd)/report:/app/playwright-report <name>:<tag> -c "npx playwright test"`

### Github Actions Workflow
For continious integration we can easily accomodate the playwright test execution in github action workflow

1. Execute playwright test directly in git hosted linux server. Refer this [flow](https://github.com/thananauto/playwright-ui-typescript/blob/main/.github/workflows/playwright-test.yml)
2. Build the image and push to docker hub, refer this [flow](https://github.com/thananauto/playwright-ui-typescript/blob/main/.github/workflows/docker-registry.yml)
3. Pull the image from docker hub and execute the test, refer this [flow](https://github.com/thananauto/playwright-ui-typescript/blob/main/.github/workflows/test-from-docker.yml)


### Kubernetes
If you would like to execute the test inside the kubernetes pod refer these manifest file
1. For Persistent Volume to save to test results, refer [this](https://github.com/thananauto/playwright-ui-typescript/blob/main/k8s-manifests/pv.yml).
2. Allow the pod to share the memory with host using persistent valume claim, refer [this](https://github.com/thananauto/playwright-ui-typescript/blob/main/k8s-manifests/pvc.yml).
3. Deploy the job to execute the test inside the image, refer [this](https://github.com/thananauto/playwright-ui-typescript/blob/main/k8s-manifests/job.yml).


For more details, refer these blogs
* [Live Visualization of Test Results Using Playwright and InfluxDB 2.0](https://medium.com/@thananjayan1988/live-visualization-of-test-results-using-playwright-and-influxdb-2-0-2a193656dda2)
* [Integrating Playwright in CI with GitHub Actions and Docker](https://medium.com/@thananjayan1988/integrating-playwright-in-ci-with-github-actions-and-docker-7baafe76de99)
* [Containerized Browser Testing with Playwright on Kubernetes](https://medium.com/@thananjayan1988/containerized-browser-testing-with-playwright-on-kubernetes-09743e5d2362)