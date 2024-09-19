# use any base node image
FROM node:22.9

# copy the current working directories, please add .dockerignore to ommit unnecessay files
WORKDIR /app
COPY . /app

RUN npm cache clean --force
# install only the chromium based browser and dependencies
RUN npm install
RUN npx -y playwright install --with-deps msedge
ENTRYPOINT ["/bin/sh"]