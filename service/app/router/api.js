'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/index', controller.api.home.index);
  router.get('/api/getArticleList', controller.api.home.getArticleList);
  router.get('/api/getArticleById/:id', controller.api.home.getArticleById);
  router.get('/api/getTypeInfo', controller.api.home.getTypeInfo);
  router.get('/api/getListById/:id', controller.api.home.getListById);
};
