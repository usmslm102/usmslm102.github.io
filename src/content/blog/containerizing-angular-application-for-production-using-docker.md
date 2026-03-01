---
title: "Containerizing Angular application for production using Docker"
description: "In this post, we will containerize angular application using Docker. Table Of Contents P..."
pubDate: "2020-03-30"
updatedDate: "2020-04-01"
---

In this post, we will containerize angular application using Docker.

## Table Of Contents
   * [Pre-requisites](#pre-requisites)
   * [Creating Sample Application](#sampleapp)
   * [Creating Docker file](#dockerfile)
   * [Creating docker ignore file](#dockerignore)
   * [Building a docker image](#buildimage)
   * [Running a container](#runcontainer)
   * [Publish image to docker hub](#dockerhub)

# Pre-requisites: <a name="pre-requisites"></a>

1. [Install Docker for Desktop](https://www.docker.com/products/docker-desktop)
1. Install [Node js](https://nodejs.org/en/download/)
1. [Install Angular CLI](https://angular.io/cli) Make sure you have the latest version of Angular CLI installed.


# Creating Sample Application <a name="sampleapp"></a>

> If you already have Angular application you can skip this step

1. Open Terminal / Command Prompt
1. Create new folder `mkdir AngularDocker`
1. `cd AngularDocker`
1. Initialize Angular application `ng new SampleApp`
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/qoyr0blvufkc8rgug0ij.png)
1. Navigate to created project `cd SampleApp`
1. Make sure app is running `ng serve -o`
1. Navigate to https://locahost:4200 in your browser.
1. Feel free to make any changes.

# Creating Docker file <a name="dockerfile"></a>
To create a docker image we must create the docker file and specify the required steps to build the image.

1. Open the Project in Code Editor I'm using [VS Code](https://code.visualstudio.com/) feel free to use your favorite code editor.
1. Create the Dockerfile without any extension in the root of your project.
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/ehr53ziqk4yy117y6p3f.png)
1. We will use docker multistage build to create an optimized image. In this process, we will start with the node image to build our angular application and then copy the required file in the nginx server image. You can learn more about Docker multistage build [here](https://docs.docker.com/develop/develop-images/multistage-build/)
1. Let's create our docker file
1. `FROM node:12.16.1-alpine As builder`

    This line will tell the docker to pull the node image with tag 12.6.1-alpine if the images don't exist. We are also giving a friendly name **builder** to this image so we can refer it later.
1. `WORKDIR /usr/src/app`

    This WORKDIR command will create the working directory in our docker image. going forward any command will be run in the context of this directory.
1. `COPY package.json package-lock.json ./`

    This COPY command will copy package.json and package-lock.json from our current directory to the root of our working directory inside a container which is /usr/src/app.
1. `RUN npm install`

    This RUN command will restore node_modules define in our package.json
1. `COPY . .`

    This COPY command copies all the files from our current directory to the container working directory. this will copy all our source files.
1. `RUN npm run build --prod`

    This command will build our angular project in production mode and create production ready files in dist/SampleApp folder.

1. `FROM nginx:1.15.8-alpine`

    This line will create a second stage nginx container where we will copy the compiled output from our build stage.

1. `COPY --from=builder /usr/src/app/dist/SampleApp/ /usr/share/nginx/html`

    This is the final command of our docker file. This will copy the compiled angular app from builder stage path */usr/src/app/dist/SampleApp/* to nginx container.

    Complete Dockerfile

    [Embedded gist](https://gist.github.com/usmslm102/e067c194115d1f404980a2890120a2da)

# Creating docker ignore file <a name="dockerignore"></a>
When `COPY . .` command execute it will copy all the files in the host directory to the container working directory. if we want to ignore some folder like .git or node_modules we can define these folders in .dockerignore file.

1. Create .dockerignore file in the root folder of your project.
1. Copy below content in it.

    [Embedded gist](https://gist.github.com/usmslm102/e067c194115d1f404980a2890120a2da)

# Building a docker image <a name="buildimage"></a>
Navigate the project folder in command prompt and run the below command to build the image.

   `docker build . -t usmslm102/sampleapp`

This command will look for a docker file in the current directory and create the image with tag usmslm102/sampleapp. with -t command you can specify the tag for the image the default convention is `<DockerHubUsername>/<ImageName>` e.g. `usmslm102/sampleapp`. usmslm102 is my docker hub username and sampleapp is the image name

run `docker images` command to list all the docker images in your machine

# Running a container <a name="runcontainer"></a>
You can run the docker image using the below command.
1. docker run -p 3000:80 usmslm102/sampleapp

    -p flag publishes all exposed ports to the host interfaces. we are publishing container port 80 to host 3000 port.
1. Navigate to your browser with http://localhost:3000

# Publish image to docker hub <a name="dockerhub"></a>
Docker hub is a container registry maintained by docker. Make sure you have a [docker hub](https://hub.docker.com/) account. 

1. `docker login`

    Provide valid username and password. once the login is succeed run below command to publish.
2. `docker push <UserName>/<ImageName>`

   Replace UserName and ImageName with your username and image name. e.g. `docker push usmslm102/sampleapp`
My image url: https://hub.docker.com/r/usmslm102/sampleapp

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/g9kcbaxw2mgww4wnwaxk.png)

Note: By default, the image will be public. Navigate to docker hub image setting to make it private.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/7kj56isxysbuiyg1g4n6.png)
