const Router = require('express')
const router = new Router()
const itemRouter = require('./itemRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const basketRouter = require('./basketRouter')
const ratingRouter = require('./ratingRouter')


router.use('/user',userRouter)
router.use('/type',typeRouter)
router.use('/brand',brandRouter)
router.use('/item',itemRouter)
router.use('/basket',basketRouter)
router.use('/rating',ratingRouter)


module.exports = router