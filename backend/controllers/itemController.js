const uuid = require('uuid')
const path = require('path')
const { Item, ItemInfo, Type, Brand } = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize')
class ItemController {
    async create(req, res, next) {
        try {
            let { name, price, brandName, typeName, info } = req.body

            const brand = await Brand.findOrCreate({
                where: { name: brandName }
            })

            const type = await Type.findOrCreate({
                where: { name: typeName }
            })
            let typeId = type[0].id
            let brandId = brand[0].id
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const item = await Item.create({ name, price, brandId, typeId, info, img: fileName })
            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async get(req, res) {
        let { brandId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 10

        let offset = page * limit - limit

        let devices;
        if (!brandId && !typeId) {
            devices = await Item.findAndCountAll({ limit, offset })
        }
        if (brandId && !typeId) {
            devices = await Item.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId && typeId) {
            devices = await Item.findAndCountAll({ where: { typeId }, limit, offset })
        }
        if (brandId && typeId) {
            devices = await Item.findAndCountAll({ where: { typeId, brandId }, limit, offset })
        }
        return res.json(devices)
    }
    async getOne(req, res) {
        const { id } = req.params
        const selected_item = await Item.findOne(
            {
                where: { id },
                include: [{ model: ItemInfo, as: 'info' }]
            }
        )
        if (!selected_item) {
            return res.json(ApiError.internal("Not Exist"))
        }

        if (selected_item.typeId && selected_item.brandId) {
            const selected_item_with_type = await Type.findOne({
                where: { id: selected_item.typeId }
            })
            const selected_item_with_brand = await Brand.findOne({
                where: { id: selected_item.brandId }
            })
            selected_item.brandId = selected_item_with_brand.name
            selected_item.typeId = selected_item_with_type.name
            return res.json(selected_item)
        }
        if (selected_item.typeId) {
            const selected_item_with_type = await Type.findOne({
                where: { id: selected_item.typeId }
            })
            selected_item.typeId = selected_item_with_type.name
            return res.json(selected_item)
        }
        if (selected_item.brandId) {
            const selected_item_with_brand = await Brand.findOne({
                where: { id: selected_item.brandId }
            })
            selected_item.brandId = selected_item_with_brand.name
            return res.json(selected_item)
        }
        return res.json(selected_item)
    }

    async delete(req, res) {
        try {
            const { name } = req.params
            const candidate = await Item.findOne({
                where: { name }
            })
            if (!candidate) {
                return res.json(ApiError.badRequest("Not exists"))
            }
            await Item.destroy({
                where: { name }
            })
            return res.json("OK")
        } catch (e) {
            return res.json(ApiError.internal(e.message))
        }
    }

    async search(req, res) {
        try {
            let { name, brand, type } = req.query

            if (name && brand && type) {
                brand = brand.split(',')
                type = type.split(',')

                let candidateBrand = await Brand.findAll({
                    where: {
                        name: brand
                    }
                })
                for (let i = 0; i < candidateBrand.length; i++) {
                    candidateBrand[i] = candidateBrand[i].dataValues.id
                }
                let candidateType = await Type.findAll({
                    where: {
                        name: type
                    }
                })
                for (let i = 0; i < candidateType.length; i++) {
                    candidateType[i] = candidateType[i].dataValues.id
                }
                const candidateByName = await Item.findAndCountAll({
                    where: {
                        brandId: candidateBrand,
                        typeId: candidateType,
                        name: {
                            [Op.iLike]: "%" + name + "%"
                        }
                    }
                })
                if (!candidateByName) {
                    return res.json(ApiError.internal("Not Found"))
                }
                return res.json(candidateByName)
            }
            if (name && !brand && !type) {
                const candidateByName = await Item.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: '%' + name + '%'
                        }
                    }
                })
                if (!candidateByName) {
                    return res.json(ApiError.internal("Not Found"))
                }
                return res.json(candidateByName)
            }
            if (!name && brand && !type) {
                brand = brand.split(',')
                let candidateBrand = await Brand.findAll({
                    where: {
                        name: brand
                    }
                })
                for (let i = 0; i < candidateBrand.length; i++) {
                    candidateBrand[i] = candidateBrand[i].dataValues.id
                }
                const candidateByName = await Item.findAndCountAll({
                    where: {
                        brandId: candidateBrand
                    }
                })
                if (!candidateByName) {
                    return res.json(ApiError.internal("Not Found"))
                }
                return res.json(candidateByName)

            }
            if (!name && !brand && type) {
                type = type.split(',')
                let candidateType = await Type.findAll({
                    where: {
                        name: type
                    }
                })
                for (let i = 0; i < candidateType.length; i++) {
                    candidateType[i] = candidateType[i].dataValues.id
                }
                const candidateByName = await Item.findAndCountAll({
                    where: {
                        typeId: candidateType
                    }
                })
                if (!candidateByName) {
                    return res.json(ApiError.internal("Not Found"))
                }
                return res.json(candidateByName)
            }
            if (name && brand && !type) {
                brand = brand.split(',')
                let candidateBrand = await Brand.findAll({
                    where: {
                        name: brand
                    }
                })
                for (let i = 0; i < candidateBrand.length; i++) {
                    candidateBrand[i] = candidateBrand[i].dataValues.id
                }
                const candidateByName = await Item.findAndCountAll({
                    where: {
                        brandId: candidateBrand,
                        name: {
                            [Op.iLike]: "%" + name + "%"
                        }
                    }
                })
                if (!candidateByName) {
                    return res.json(ApiError.internal("Not Found"))
                }

                return res.json(candidateByName)
            }
            if (!name && brand && type) {
                brand = brand.split(',')
                type = type.split(',')

                let candidateBrand = await Brand.findAll({
                    where: {
                        name: brand
                    }
                })

                let candidateType = await Type.findAll({
                    where: {
                        name: type
                    }
                })

                for (let i = 0; i < candidateBrand.length; i++) {
                    candidateBrand[i] = candidateBrand[i].dataValues.id
                }
                for (let i = 0; i < candidateType.length; i++) {
                    candidateType[i] = candidateType[i].dataValues.id
                }
                const candidateByName = await Item.findAndCountAll({
                    where: {
                        brandId: candidateBrand,
                        typeId: candidateType
                    }
                })
                if (!candidateByName) {
                    return res.json(ApiError.internal("Not Found"))
                }

                return res.json(candidateByName)
            }
            if (name && !brand && type) {
                type.split(',')
                let candidateType = await Type.findAll({
                    where: {
                        name: type
                    }
                })
                for (let i = 0; i < candidateType.length; i++) {
                    candidateType[i] = candidateType[i].dataValues.id
                }
                const candidateByName = await Item.findAndCountAll({
                    where: {
                        typeId: candidateType.id,
                        name: {
                            [Op.iLike]: "%" + name + "%"
                        }
                    }
                })
                if (!candidateByName) {
                    return res.json(ApiError.internal("Not Found"))
                }
                return res.json(candidateByName)
            }
        } catch (e) {
            return res.json(ApiError.badRequest(e.message))
        }
    }


}

module.exports = new ItemController()