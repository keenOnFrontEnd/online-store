const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const ratingController = require('../controllers/ratingController')


router.get('/:itemId',authMiddleware,ratingController.getRate)
router.post('/',authMiddleware,ratingController.rate)
router.put('/',authMiddleware,ratingController.updateRate)


module.exports = router
