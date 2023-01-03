const uuid = require('uuid')
const path = require('path')
const { Item, ItemInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class ItemController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const item = await Item.create({ name, price, brandId, typeId, info, img: fileName })

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        itemid: item.id
                    })
                });
            }


            return res.json(device)
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
        const { name } = req.params
        const selected_item = await Item.findOne(
            {
                where: { name },
                include: [{ model: ItemInfo, as: 'info' }]
            }
        )
        return res.json(selected_item)
    }

    async delete(req, res) {
        try {
            const { name } = req.body
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

}

module.exports = new ItemController()