const ApiError = require("../error/ApiError")
const { Rating } = require("../models/models")

class RatingController {
    async rate (req,res) {
        try {
            const {item_id,user_id,rate} = req.body
            const candidate = await Rating.findOne({
                where:{
                    itemId: item_id,
                    userId: user_id
                }
            })
            if(candidate) {
                return res.json(ApiError.forbidden("Already exist"))
            }
            await Rating.create({
                userId: user_id,
                itemId: item_id,
                rate
            })
            return res.json("rated")
        } catch (e) {
            return res.json(ApiError.internal(e.message))
        }
    }
    async updateRate (req,res) {
        try {
            let {rate,rate_id} = req.body
            Rating.update({
                rate
            },{where:{
                id:rate_id
            }})
            return res.json("updated")
        } catch (e) {
            return res.json(ApiError.internal(e.message))
        }
    }
    async getRate (req,res) {
        try {
            let {itemId} = req.params
            const rating = await Rating.findAll({
                where:{
                    itemId
                }
            })
            return res.json(rating)
        } catch (e) {
            return res.json(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new RatingController()