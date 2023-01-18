const { where } = require("sequelize")
const ApiError = require("../error/ApiError")
const { BasketItem } = require("../models/models")
const { Basket, Item } = require("../models/models")
const { getOne } = require("./itemController")

class BasketController {
    async getItems(req, res) {
        try {
            let { userId } = req.params
            const basket_items = await BasketItem.findAndCountAll({
                where: { basketId: userId }
            })
            return res.json(basket_items)
        } catch (e) {
            return ApiError.badRequest(e.message)
        }
    }
    async addItem(req, res) {
        try {
            const { item_id, user_id } = req.body
            const { id } = await Basket.findOne({
                where: { userId: user_id }
            })
            const candidate = await BasketItem.findOne({
                where: {
                    itemId: item_id,
                    basketId: id
                }
            })

            if (candidate) {
                candidate.update({ count: candidate.count + 1 })
                candidate.save()
                return res.json(`${candidate.id} count is increase ${candidate.count}`)
            }

            await BasketItem.create({
                itemId: item_id,
                basketId: id
            })
            return res.json(`${item_id} item is added`)
        } catch (e) {
            return res.json(ApiError.badRequest(e.message))
        }
    }
    async increaseItem(req, res) {
        try {
            const { id } = req.body

            const candidate = await BasketItem.findOne({
                where: { id }
            })
            if (!candidate) {
                return res.json(ApiError.badRequest("Not exists"))
            }
            candidate.update({ count: candidate.count + 1 })
            candidate.save()
            return res.json("increased")

        } catch (e) {
            return es.json(ApiError.badRequest(e.message))
        }
    }
    async decreaseItem(req, res) {
        try {
            const { id } = req.body
            const candidate = await BasketItem.findOne({
                where: { id }
            })
            if (!candidate) {
                return res.json(ApiError.badRequest("Not exists"))
            }
            candidate.update({ count: candidate.count - 1 })
            candidate.save()
            if (candidate.count === 0) {
                candidate.destroy()
                return res.json("destroyed")
            }
            return res.json("increased")

        } catch (e) {
            return es.json(ApiError.badRequest(e.message))
        }
    }
    async deleteItem(req, res) {
        try {
            const { itemId } = req.params
            const candidate = await BasketItem.findOne({
                where: { id: itemId }
            })
            if (!candidate) {
                return res.json(ApiError.badRequest("Not exists"))
            }
            BasketItem.destroy({
                where: { id: itemId }
            })
            return res.json("deleted")
        } catch (e) {
            return res.json(ApiError.badRequest(e.message))
        }
    }
    async totalCount(req, res) {
        try {
            const { basketId } = req.params
            let array = []
            let itemsArray = []
            let total = 0;
            await BasketItem.findAll({
                where: { basketId }
            })
                .then((res) => {
                    res.forEach((res) => array.push({ count: res.count, itemId: res.itemId }))
                })

            let count = async () => {
                for (const item of array) {
                    let { id, price } = await Item.findOne({ where: { id: item.itemId } })
                    itemsArray.push({ itemId: id, price })
                }
            }
            await count()

            array.forEach((item, index) => {
                if (item.itemId === itemsArray[index].itemId) {
                    total = total + (itemsArray[index].price * item.count)
                    console.log(total)
                }
            })

            return res.json(total)

        } catch (e) {
            return res.json(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketController()