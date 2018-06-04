'use strict';
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('kcors');
const fetch = require('node-fetch');
const koaBody = require('koa-body');

const PORT = process.env.PORT || 9000;
const URI = 'http://192.168.1.6:3000';
const app = new Koa();
const _ = new Router();

app.use(cors());

const getProjects = async () => {
  const response = await fetch(`${URI}/projects`);
  return response ? response.json() : {};
};

const getProject = async (id) => {
  const response = await fetch(`${URI}/projects/${id}`);
  return response ? response.json() : {};
};

const deleteProject = async (id) => {
  return await fetch(`${URI}/projects/${id}`, {
    method: 'delete'
  });
};

const addProject = async (data) => {
  const response = await fetch(`${URI}/projects`, {
    body: data,
    headers: {
      'content-type': 'application/json'
    },
    method: 'post'
  });
  return response ? response.json() : {};
};

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
