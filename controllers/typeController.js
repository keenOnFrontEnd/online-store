const {Type} = require('../models/models')



class TypeController {
    async create (req,res) {
        const {name} = req.body 
        const type = await Type.create({name})
        return res.json(type)
    }
    async get (req,res) {
        const types = await Type.findAll()
        return res.json(types)
    }
    async delete (req,res) {
        try {
            const { name } = req.body
            const candidate = await Type.findOne({
                where: {name}
            })
            if(!candidate) {
               return res.json(ApiError.badRequest("Not exists")) 
            }
            await Type.destroy({
                where: {name}
            })
            return res.json("OK")
        } catch (e) {
            return res.json(ApiError.internal(e.message))
        }
    }

}

module.exports = new TypeController()