
# React Node Starter Kit

This is a Starter template for react and node application

# Initializing

Install both node and react dependencies with following npm command

```bash
  npm run install-all
```
#### npm i && cd client && npm i --force
* First it installs node modules for server
* change directory to client
* Installs node modules for client


# Run development server

To run a development version of this application run the following npm command (Both fronend and backend)

```bash
  npm run start-mon
```
#### concurrently --names \"Server,client\" -c \"bgGreen.bold,bgBlue.bold\" \"nodemon server/src/index.js\" \"cd client && npm start\"

* Uses concurently package to run server and client at the same time 
* --names \"Server,client\" names for our process
* -c \"bgGreen.bold,bgBlue.bold\" colors to differentiate 
* \"nodemon server/src/index.js\" \"cd client && npm start\" commands to run in concurently

## To run only server

To start the server without fronend
```bash
  npm run dev
```
#### nodemon server/src/index.js
* starts server with nodemon
## Only build generation 

To run a production version of this application first run the build command which will generate a publish folder in root

```bash
  npm run build
```
#### cd client && npm run build
* Changes to client directory
* Runs npm run build inside client to generate publish folder in parent (i.e same level as server)


## Build and deploy zip generation

The following command build the frontend applocation and creates a deploy folder and deploy.zip in parent folder (app level)

![Logo](https://i.ibb.co/bBX0DxQ/path.png)

```bash
  npm run build-deploy
```
#### cd client && npm run build && cd .. && npm run create-zip
* Changes to client directory
* Runs npm run build inside client to generate publish folder in parent (i.e same level as server)
* changes to parent directory (server)
* runs create-zip custom script to generate deploy folder and deploy.zip in parent filder ( same level as app)

## starting application

To start the application after build is done run the following command
```bash
  npm start
```
# Dependency commands and scripts

The folowing scripts and commands are not directly used by user but they are used by our main scripts

## create-zip
To run a task in gulpfile which will create a deploy folder and generates deploy.zip

```bash
  npm run create-zip
```
![Logo](https://i.ibb.co/cbD0V8Q/gulp.png)
* Executes gulp createDeploy command to run createDeploy task

* Gulpfile contains the above script to perform the operations 
