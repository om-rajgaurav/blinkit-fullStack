import { Product } from "../../models/index.js";



export const getProductsByCategoryId = async (req, res) => {
  const { categoryId } = req.params
  try {
    const products = await Product.find({ category: categoryId }).select("-category").exec();
    return res.send({
      message: "Products fetched successfully",
      products
    })
  } catch (error) {
    return res.status(500).send({ message: "An Error Occured", error: error.message })
  }
}
