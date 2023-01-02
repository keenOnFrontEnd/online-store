const ApiError = require("../error/ApiError")
const { BasketItem } = require("../models/models")
const { Basket } = require("../models/models")

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
            const { basket_item_id } = req.body
            const candidate = await BasketItem.findOne({
                where: { id: basket_item_id }
            })
            if (!candidate) {
                return res.json(ApiError.badRequest("Not exists"))
            }
            BasketItem.destroy({
                where: { id: basket_item_id }
            })
            return res.json("deleted")
        } catch (e) {
            return res.json(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketController()