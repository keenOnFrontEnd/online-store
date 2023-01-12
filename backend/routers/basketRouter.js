const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const basketController = require('../controllers/basketController')


router.get('/:userId',authMiddleware,basketController.getItems)
router.post('/',authMiddleware,basketController.addItem)
router.delete('/:itemId',authMiddleware,basketController.deleteItem)


module.exports = router
