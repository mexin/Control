Router.configure({
  controller: 'AppController',
  notFoundTemplate:'notFound',
  loadingTemplate: 'loading'
});

// Router.plugin('loading', {loadingTemplate: 'loading'});
// Router.plugin('dataNotFound', {dataNotFoundTemplate: 'notFound'});
