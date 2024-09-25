import { Category } from "../../models/index.js";


export const getAllCategories = async (req, res) => {
  console.log("helosdjhgjhfgdsjh")
  try {
    const categories = await Category.find();
    return res.send({
      message: "Categories fetched successfully",
      categories
    })
  } catch (error) {
    return res.status(500).send({ message: "An Error Occured", error: error.message })
  }
}