const ApiError = require("../error/ApiError")
const { Brand } = require("../models/models")

class BrandController {
    async create(req, res) {
        try {
            const { name } = req.body
            console.log(name)
            const type = await Brand.create({ name })
            return res.json(type)
        } catch (e) {
            return res.json(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
    async getOne(req, res) {
        try {
            const { id } = req.params
            const brand = await Brand.findOne({
                where: { id }
            })
            return res.json(brand)
        } catch (e) {
            return ApiError.badRequest(e.message)
        }
    }
    async delete(req, res) {
        try {
            const { name } = req.params
            const candidate = await Brand.findOne({
                where: { name }
            })
            if (!candidate) {
                return res.json(ApiError.badRequest("Not exists"))
            }
            await Brand.destroy({
                where: { name }
            })
            return res.json("OK")
        } catch (e) {
            return res.json(ApiError.internal(e.message))
        }
    }
}

module.exports = new BrandController()