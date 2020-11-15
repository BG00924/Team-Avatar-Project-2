const router = require('express').Router();
const sequelize = require('../config/connection');
const { Game, User, Vote } = require('../models');
const withAuth = require('../utils/auth');

//renders home page
router.get('/', (req, res) => {
    res.render('homepage')
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  router.get('/mygames', (req, res) => {
    
    // console.log(req.session)  
    // if(req.session) {
    //   res.send(req.session.user_id)
    // }
    if (req.session.loggedIn) {
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
              // res.send(games)
              console.log(games)
              // return games
          })
          // .then(games => {
          //   res.json(games)
          // })
          .catch(err => {
              console.log(err)
              res.status(500).json(err)
          })
          return;
      }

    // res.render('login', { loggedIn: false })

    
  })

  

module.exports = router
