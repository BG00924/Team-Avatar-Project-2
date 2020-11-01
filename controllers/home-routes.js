const router = require('express').Router();
const sequelize = require('../config/connection');
const { Game, User, Vote } = require('../models');

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
    
    console.log(req.session)  
    if (req.session.loggedIn) {
          res.render('mygames', { loggedIn: true })
          return;
      }

    res.render('login', { loggedIn: false })
  })

module.exports = router
