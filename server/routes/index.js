const listsController = require('../controllers').lists;
const linksController = require('../controllers').links;

module.exports = app => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Lists API!',
    }));

    app.post('/api/lists', listsController.create);
    app.get('/api/lists', listsController.list);
    app.get('/api/lists/:listId', listsController.retrieve);
    app.put('/api/lists/:listId', listsController.update);
    app.delete('/api/lists/:listId', listsController.destroy);

    app.get('/api/lists/:listId/links', linksController.list);
    app.post('/api/lists/:listId/links', linksController.create);
    app.put('/api/lists/:listId/links/:linkId', linksController.update);
    app.delete('/api/lists/:listId/links/:linkId', linksController.destroy);

    app.all('/api/lists/:listId/links', (req, res) =>
        res.status(405).send({
            message: 'Method Not Allowed',
        })
    );
};
