'use strict';
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('kcors');
const fetch = require('node-fetch');
const koaBody = require('koa-body');
const firebase = require("firebase");

// Set Firebase configuration
var config = {
  apiKey: 'AIzaSyCUJN2qiD_xBAYrcX9TS7we_FXF53aouk4',
  authDomain: 'worksample-d3f70.firebaseapp.com',
  databaseURL: 'https://worksample-d3f70.firebaseio.com',
  storageBucket: 'simple-react-nodejs-fullstack.appspot.com'
};
firebase.initializeApp(config);
// https://worksample-d3f70.firebaseio.com/projects.json

const PORT = process.env.PORT || 8080;
const URI = config.databaseURL;
const app = new Koa();
const _ = new Router();

app.use(cors());

const getProjects = async () => {
  return fetch(`${URI}/projects.json`)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    return myJson;
  });
};

const getProject = async (id) => {
  const response = await fetch(`${URI}/projects/${id}.json`);
  return response ? response.json() : {};
};

const deleteProject = async (id) => {
  const response = await fetch(`${URI}/projects/${id}.json`, {
    method: 'DELETE'
  });
  return response ? response.json() : {};
};

const editProject = async (id, data) => {
  const response = await fetch(`${URI}/projects/${id}.json`, {
    body: data,
    headers: {
      'content-type': 'text/plain'
    },
    method: 'PUT'
  });
  return response ? response.json() : {};
};

const addProject = async (data) => {
  const response = await fetch(`${URI}/projects.json`, {
    body: data,
    headers: {
      'content-type': 'text/plain'
    },
    method: 'POST'
  });
  return response ? response.json() : {};
};

_.get('/', async ctx => {
  const response = await getProjects();
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = response;
});

_.get('/projects', async ctx => {
  const response = await getProjects();
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = response;
});

_.get('/projects/:id', async ctx => {
  const response = await getProject(ctx.params.id);
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = response;
});

_.put('/projects/:id', async ctx => {
  const response = await editProject(ctx.params.id, ctx.request.body);
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = response;
});

_.delete('/projects/:id', async ctx => {
  ctx.body = await deleteProject(ctx.params.id);
});

_.post('/projects', koaBody(), async ctx => {
  const response = await addProject(ctx.request.body);
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = response;
});

app.use(_.routes());
app.use(_.allowedMethods());

app.listen(PORT);

console.log(`App listening on port ${PORT}`);
