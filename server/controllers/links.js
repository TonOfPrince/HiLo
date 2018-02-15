const Link = require('../models').Link;

module.exports = {
    create(req, res) {
        return Link
            .create({
                url: req.body.url,
            })
            .then(link => res.status(201).send(link))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Link
            .all()
            .then(links => res.status(200).send(links))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Link
            .find({
                where: {
                    id: req.params.id,
                },
            })
            .then(link => {
                if (!link) {
                    return res.status(404).send({
                        message: 'Link Not Found',
                    });
                }

                return link
                    .update({
                        url: req.body.url || link.url,
                    })
                    .then(updatedLink => res.status(200).send(updatedLink))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    destroy(req, res) {
        return Link
            .find({
                where: {
                    id: req.params.id,
                },
            })
            .then(link => {
                if (!link) {
                    return res.status(404).send({
                        message: 'Link Not Found',
                    });
                }

                return link
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
