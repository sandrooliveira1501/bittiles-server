var express = require('express')
var router = express.Router()

router.use('/usuario', require('./usuario'))
router.use('/musica', require('./musica'))

module.exports = router
