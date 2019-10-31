// const express = require('express');
// const router = express.Router();
const router = require('express').Router();
const Pie = require('../db').import('../models/pie');
const validateSession = require('../middleware/validate-session');

// router.get('/', (req, res) => res.send('I love pie!'));

// GET ALL
router.get('/', (req, res) => {
    Pie.findAll()
        .then(pie => res.status(200).json(pie))
        .catch(err => res.status(500).json({
            error: err
        }))
})

// POST
router.post('/', validateSession, (req, res) => {
    const pieFromRequest = {
        nameOfPie: req.body.nameOfPie,
        baseOfPie: req.body.baseOfPie,
        crust: req.body.crust,
        timeToBake: req.body.timeToBake,
        servings: req.body.servings,
        rating: req.body.rating
    }

    // console.log(req);

    Pie.create(pieFromRequest)
        .then(pie => res.status(200).json(pie))
        .catch(err => res.json(req.errors));
})


// GET ITEM BY NAME
router.get('/:name', (req, res) => {
    Pie.findOne({
        where: {
            nameOfPie: req.params.name
        }
    })
    .then(pie => res.status(200).json(pie))
    .catch(err => res.status(500).json({
        error: err
    }))
    console.log(req);
})

// UPDATE BY ID
router.put('/:id', validateSession, (req, res) => {
    Pie.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(pie => res.status(200).json(pie))
    .catch(err => res.json({
        error: err
    }))
})

// DELETE BY ID
router.delete('/:id', validateSession, (req, res) => {
    Pie.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(pie => res.status(200).json(pie))
    .catch(err => res.json({
        error: err
    }))
})

module.exports = router;