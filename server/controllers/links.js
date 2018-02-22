const Link = require('../models').Link;
const pool = require('../db');

module.exports = {
    create(req, res) {
        pool.query(`INSERT INTO LINKS (url, listId) VALUES ($1, $2);`, [req.body.url, req.params.listId])
            .then(list => res.status(201).send(list))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        pool.query(`SELECT * FROM LINKS WHERE listid = ($1);`, [req.params.listId])
            .then(links => res.status(201).send(links.rows))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        pool.query(`UPDATE links SET url = ($1) WHERE listid = ($2) AND linkid = ($3);`, [req.body.url, req.params.listId, req.params.linkId])
            .then(list => res.status(201).send(list))
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        pool.query(`DELETE FROM links WHERE listid = ($1) AND linkid = ($2);`, [req.params.listId, req.params.linkId])
            .then(list => res.status(201).send(list))
            .catch(error => res.status(400).send(error));
    },
};
