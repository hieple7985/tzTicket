# Tezos-Ticket Api (nts-api-v1)

## Table of contents

* [General Info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
Api Base Source Path: /api/**

## Technologies

### Api Tech-Stack

* PostgreSQL: v14
* Hasura Cloud: v2
* Heroku: 
* Docker: 4.10.1

## Setup

* Link: <https://hasura.io/docs/latest/graphql/core/index/>

### Prequisites

```sh
node v16
node-fetch: "2.6.0",
```

### Deployment

#### Heroku

```sh
* Step-1: git init
* Step-2: heroku git:remote -a ntsapiv1
* Step-3: git add .
* Step-4: git commit -am "init"
* Step-5: git push heroku master
```
* Note: Currently, nodejs is being deployed to Heroku v12
#### Hasura
``` sh
* Step-1: Initial setup​ Link GitHub account to a Hasura Cloud project​ (link github:https://github.com/hieple7985/pkd-nts-api)
* Step-2: Edit GitHub Integration​ Click on the Edit Deployment button in the GitHub Deployment section to edit the GitHub repository/branch/directory/deployment mode for the GitHub integration (ex: api/hasura)
* Step-3: Vieww deployment log
* Step-4: view project (launch console log )
```
  * Link setup: https://hasura.io/docs/latest/graphql/cloud/projects/github-integration/
  
#### Link

* App Heroku: <https://dashboard.heroku.com/apps/apintsv1/deploy/heroku-git>
* Host : <https://apintsv1.herokuapp.com/>
* Hasura Cloud: <https://cloud.hasura.io/project/116e5a99-c640-4a74-88a1-7450c506cf41/details>

### NodeJS
#### Build
```sh 
* Step-1:cd api
* Step-2:npm run build
```
* Note: The build file will be stored in the dist folder
#### Run-up
```sh
cd api
npm i 
ENV prod: npm start
ENV dev: npm test
ENV stage: npm stage
```
#### Express v4

This is a starter kit for `nodejs` with `express`. To get started:

Firstly, [download the starter-kit](https://github.com/hasura/codegen-assets/raw/master/nodejs-express/nodejs-express.zip) and `cd` into it.



#### Entry Point

- Open Access
```sh
http://localhost:3000/hello
```

- Terminate Process Api
```sh
Mac-OS: Ctrl+C
```

The entrypoint for the server lives in `src/server.js`.

If you wish to add a new route (say `/helo`) , you can add it directly in the `server.js` as:

```js
app.get('/hello', (req, res) => {
  return res.json({
    hello: "world",
  });
});
```

#### Error Handling

You can throw an error object or a list of error objects from your handler. The response must be 4xx and the error object must have a string field called `message`.

```js
retun res.status(400).json({
  message: 'invalid email'
});
```
### IPFS
#### Framework
```sh
ipfs-http-client: 56.0.3
infura
```
#### Data stream
* Client send file -> Server -> IPFS(infura )
* IPFS send cid -> Server send link -> client -> database
