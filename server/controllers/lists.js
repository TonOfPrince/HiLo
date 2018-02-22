const List = require('../models').List;
const Link = require('../models').Link;
const pool = require('../db');

module.exports = {
    create(req, res) {
        pool.query(`INSERT INTO LISTS (title) VALUES ($1);`, [req.body.title])
            .then(list => res.status(201).send(list))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        pool.query(`SELECT * FROM LISTS;`)
            .then(lists => res.status(201).send(lists.rows))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        pool.query(`SELECT * FROM lists WHERE listid = ($1);`, [req.params.listId])
            .then(list => {
                let ret = list.rows;
                pool.query(`SELECT * FROM links WHERE listid = ($1);`, [req.params.listId])
                    .then(links => {
                        ret[0].links = links.rows;
                        res.status(201).send(ret);
                    })
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        pool.query(`UPDATE lists SET title = ($1) WHERE listid = ($2);`, [req.body.title, req.params.listId])
            .then(list => {
                pool.query(`SELECT * FROM lists WHERE listid = ($1);`, [req.params.listId])
                    .then(list => {
                        let ret = list.rows;
                        pool.query(`SELECT * FROM links WHERE listid = ($1);`, [req.params.listId])
                            .then(links => {
                                ret[0].links = links.rows;
                                res.status(201).send(ret);
                            })
                            .catch(error => res.status(400).send(error));
                    })
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        pool.query(`DELETE FROM lists WHERE listid = ($1);`, [req.params.listId])
            .then(list => res.status(201).send(list))
            .catch(error => res.status(400).send(error));
    },
};
