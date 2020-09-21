const router = require('express').Router();
const { Game, User, Vote } = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    console.log('===========')
    Game.findAll({
        attributes: [
            'id', 
            'title', 
            'platform', 
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE game.id = vote.game_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes:['username']
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
            'platform', 
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
        platform: req.body.platform,
        user_id: req.body.user_id
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
            title: req.body.title
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