const Router = require('express')
const router = new Router()
const BrandController = require('../controllers/brandController')
const checkRole = require("../middleware/checkRoleMiddleware")


router.post('/create',checkRole('ADMIN'),BrandController.create)
router.get('/brands',BrandController.getAll)
router.get('/:id',BrandController.getOne)
router.delete('/delete/:name',checkRole('ADMIN'),BrandController.delete)


module.exports = router
