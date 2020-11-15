const router = require('express').Router();
const { Game, User, Vote } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
    console.log('yoooo')
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
                attributes:['id', 'username']
            }
        ]
    })
        .then(dbGameData => res.json(dbGameData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.get('/:id', (req, res) => {
    Game.findOne({
        where: {
            id: req.params.id
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
            if (!dbGameData) {
                res.status(404).json({ message: 'No game found with this id'})
                return
            }
            res.json(dbGameData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.post('/', (req, res) => {
    Game.create({
        title: req.body.title,
        genre: req.body.genre,
        score: req.body.score,
        description: req.body.description,
        user_id: req.session.user_id
    })
        .then(dbGameData => res.json(dbGameData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.put('/upvote', (req, res) => {
    Game.upvote(req.body, { Vote })
    .then(updatedGameData => res.json(updatedGameData))
    .catch(err => {
        console.log(err)
        res.status(400).json(err)
    })
})

router.put('/:id', (req, res) => {
    Game.update(
        {
            title: req.body.title,
            platform: req.body.platform
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbGameData => {
            if (!dbGameData) {
                res.status(404).json({ message: 'No game found with this id' })
                return
            }
            res.json(dbGameData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.delete('/:id', (req, res) => {
    Game.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbGameData => {
            if (!dbGameData) {
                res.status(404).json({ message: 'No game found with this id'})
                return
            }
            res.json(dbGameData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router