const Router = require('express')
const router = new Router()
const TypeController = require('../controllers/typeController')
const checkRole = require("../middleware/checkRoleMiddleware")


router.post('/create',checkRole('ADMIN'),TypeController.create)
router.get('/types',TypeController.get)
router.delete('/delete/:name',checkRole('ADMIN'),TypeController.delete)


module.exports = router