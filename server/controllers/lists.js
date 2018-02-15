const List = require('../models').List;
const Link = require('../models').Link;

module.exports = {
    create(req, res) {
        return List
            .create({
                title: req.body.title,
            })
            .then(list => res.status(201).send(list))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return List
            .findAll({
                include: [{
                    model: Link,
                    as: 'links',
                }],
            })
            .then(lists => res.status(200).send(lists))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return List
            .findById(req.params.id, {
                include: [{
                    model: Link,
                    as: 'links',
                }],
            })
            .then(list => {
                if (!list) {
                    return res.status(404).send({
                        message: 'List Not Found',
                    });
                }
                return res.status(200).send(list);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return List
            .findById(req.params.id, {
                include: [{
                    model: Link,
                    as: 'links',
                }],
            })
            .then(list => {
                if (!list) {
                    return res.status(404).send({
                        message: 'List Not Found',
                    });
                }
                return list
                    .update({
                        title: req.body.title || list.title,
                    })
                    .then(() => res.status(200).send(list))  // Send back the updated list.
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
        return List
            .findById(req.params.id)
            .then(list => {
                if (!list) {
                    return res.status(400).send({
                        message: 'List Not Found',
                    });
                }
                return list
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
