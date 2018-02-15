const listsController = require('../controllers').lists;
const linksController = require('../controllers').links;

module.exports = app => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Lists API!',
    }));

    app.post('/api/lists', listsController.create);
    app.get('/api/lists', listsController.list);

    app.get('/api/lists/:id', listsController.retrieve);
    app.put('/api/lists/:id', listsController.update);
    app.delete('/api/lists/:id', listsController.destroy);

    app.post('/api/links', linksController.create);
    app.get('/api/links', linksController.list);

    app.put('/api/links/:id', linksController.update);
    app.delete('/api/links/:id', linksController.destroy);
};
