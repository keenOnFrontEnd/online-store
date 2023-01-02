const Router = require('express')
const router = new Router()
const ItemController = require('../controllers/itemController')
const checkRole = require("../middleware/checkRoleMiddleware")



router.post('/create', checkRole(), ItemController.create)
router.get('/', ItemController.get)
router.get('/:id', ItemController.getOne)
router.delete('/delete/:name', checkRole(), ItemController.delete)

module.exports = router
