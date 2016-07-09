var express = require('express')
var router = express.Router()
var auth= require('../auth')

router.use('/usuario', auth, require('./usuario'))
router.use('/musica', auth, require('./musica'))

module.exports = router
