const router = require('express').Router()

const apiRoutes = require('./api')
//const homeRoutes = require('./home-routes.js')
const loginRoutes = require('./login-routes.js')

router.use('/api', apiRoutes)
//router.use('/', homeRoutes)
router.use('/login', loginRoutes)

router.use((req, res) => {
    res.status(404).end()
})

module.exports = router