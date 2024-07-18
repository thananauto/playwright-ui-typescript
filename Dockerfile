FROM mcr.microsoft.com/playwright:v1.43.1-jammy

#set the working directory
WORKDIR /app
# copy the whole directory makesure add .dockerignore in root to exclude build output folders
COPY . /app

# Install dependencies
RUN apt-get update && sudo apt-get install
RUN npm cache clean --force
RUN npm install -g playwright
RUN npm install