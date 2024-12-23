const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: String,
    }
})

const ProductModel = mongoose.model("products", ProductSchema)

module.exports = ProductModel;