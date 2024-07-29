# playwright-ui-typescript
Sample set of UI test cases build for the website [saucedemo](https://saucedemo.com). This repo can showcase that how this repo can integrate or use with other tools

## Table of contents
* Local copy
* Dockerfile
* Github Actions Workflow
* Kubernetes

### Local copy
Just clone this repo and run these commands `npm install` for dowload all dependencies and run `npx playwright test`.
You can find the report in this path with timestamp `./playwright-report/<timestamp>`

### Dockerfile
If you want to build and run the test case in `Docker` environment. Clone this repo and to build the image
`docker build -t <name>:<tag> .` and run these command for test execution `docker run -it -v $pwd/report:/app/playwright-report <name>:<tag> -c "npx playwright test"`

### Github Actions Workflow
For continious integration we can easily accomodate the playwright test execution in github action workflow

1. Execute playwright test directly in git hosted linux server. Refer this [flow](https://github.com/thananauto/playwright-ui-typescript/blob/main/.github/workflows/playwright-test.yml)
2. Build the image and push to docker hub, refer this [flow](https://github.com/thananauto/playwright-ui-typescript/blob/main/.github/workflows/docker-registry.yml)
3. Pull the image from docker hub and execute the test, refer this (flow)[https://github.com/thananauto/playwright-ui-typescript/blob/main/.github/workflows/test-from-docker.yml]


### Kubernetes
If you would like to execute the test inside the kubernetes pod refer these manifest file
1. For Persistent Volume to save to test results, refer (this)