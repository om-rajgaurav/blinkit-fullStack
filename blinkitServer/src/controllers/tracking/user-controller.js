import { Customer, DeliveryPartner } from "../../models/index.js";



export const updateUser = async (req, res) => {
  try {
    const { userId } = req.user
    const updateData = req.body
    let user = await Customer.findById(userId) || DeliveryPartner.findById(userId)
    if (!user) {
      return res.status(404).send({ message: "User not found" })
    }
    let userModel;
    if (user.role == "Customer") {
      userModel = Customer
    } else if (user.role == "DeliveryPartner") {
      userModel = DeliveryPartner
    } else {
      return res.status(400).send({ message: "Invalid or role" })
    }
    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    )

    if (!updateUser) {
      return res.status(404).send({ message: "User not found" })
    }

    return res.send({
      message: "User updated successfully",
      updateUser
    })
  } catch (error) {
    return res.status(500).send({ message: "An Error Occured", error: error.message })
  }
}