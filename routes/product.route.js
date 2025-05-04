const express = require("express")
const {check} = require("express-validator")
const {getAllProduct,getProductById,createProduct,deleteProduct,updateProduct} = require("../controllers/product.controller")
const isAdmin = require("../middleware/isdmin")
let productRouter = express.Router()

productRouter.get("/",getAllProduct)
productRouter.get("/:id",getProductById)
productRouter.post("/",[
    check("id").not().isEmpty(),
    check("name").isLength({min:5})
],createProduct)

productRouter.patch("/:id",isAdmin,updateProduct)
productRouter.delete("/:id",isAdmin,deleteProduct)

module.exports = productRouter