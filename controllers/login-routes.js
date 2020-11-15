const router = require('express').Router();
const sequelize = require('../config/connection');
const { Game, User, Vote } = require('../models');
const withAuth = require('../utils/auth');

router.get('/mygames', withAuth, (req, res) => {
    console.log(req.session)
    console.log('---------------')
    Game.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'genre',
            'score',
            'description',
            'user_id'
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE game.id = vote.game_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbGameData => {
            const games = dbGameData.map(game => game.get({ plain: true}))
            res.render('mygames', { games, loggedIn: true})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router
