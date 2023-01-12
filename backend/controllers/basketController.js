const ApiError = require("../error/ApiError")
const { BasketItem } = require("../models/models")
const { Basket,Item } = require("../models/models")
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
            await BasketItem.create({
                itemId: item_id,
                basketId: id
            })
            return res.json(`${item_id} item is added`)
        } catch (e) {
            return res.json(ApiError.badRequest(e.message))
        }
    }
    async deleteItem(req, res) {
        try {
            const { itemId } = req.params
            const candidate = await BasketItem.findOne({
                where: { id:itemId }
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
}

module.exports = new BasketController()