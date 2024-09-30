
import { Customer, DeliveryPartner } from "../../models/user.js";
import Jwt from "jsonwebtoken";
import "dotenv/config";

const generateTokens = (user) => {
  const accessToken = Jwt.sign(
    { userId: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = Jwt.sign(
    { userId: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken }
}


export const loginCustomer = async (req, res) => {
  try {
    const { phone } = req.body;
    let customer = await Customer.findOne({ phone });
    if (!customer) {
      customer = new Customer({
        phone: phone,
        isActivated: true,
        role: "Customer"
      });
      await customer.save();
    }
    const { accessToken, refreshToken } = generateTokens(customer);
    return res.send({
      message: customer ? "Logged in successfully" : "Account created successfully",
      accessToken,
      refreshToken,
      customer,
    })
  } catch (error) {
    return res.status(500).send({ message: "An Error Occured", error: error.message })
  }
}
export const loginDeliveryPartner = async (req, res) => {
  try {
    const { email, password } = req.body;
    const deliveryPartner = await DeliveryPartner.findOne({ email });
    if (!deliveryPartner) {
      return res.status(404).send({ message: "Delivery partner not found", error: error.message })
    }
    const isMatch = password == deliveryPartner.password
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials", error: error.message })
    }
    const { accessToken, refreshToken } = generateTokens(deliveryPartner);
    return res.send({
      message: "Logged in successfully",
      accessToken,
      refreshToken,
      deliveryPartner,
    })
  } catch (error) {
    return res.status(500).send({ message: "An Error Occured", error: error.message })
  }
}


export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body
  if (!refreshToken) {
    return res.status(401).send({ message: "Refresh token required" })
  }
  try {
    const decoded = Jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    let user;
    if (decoded.role == "Customer") {
      user = await Customer.findById(decoded.userId)
    } else if (decoded.role == "DeliveryPartner") {
      user = await DeliveryPartner.findById(decoded.userId)
    } else {
      res.status(403).send({ message: "Invalid or role" })
    }
    if (!user) {
      return res.status(403).send({ message: "Invalid or expired refresh token" })
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user)

    return res.send({
      message: "Token refreshed successfully",
      accessToken,
      refreshToken: newRefreshToken
    })

  } catch (error) {
    return res.status(403).send({ message: "Invalid or expired refresh token" })
  }
}

export const fetchUser = async (req, res) => {
  try {
    const { userId, role } = req.user
    let user;
    if (role == "Customer") {
      user = await Customer.findById(userId)
    } else if (role == "DeliveryPartner") {
      user = await DeliveryPartner.findById(userId)
    } else {
      res.status(403).send({ message: "Invalid or role" })
    }

    if (!user) {
      return res.status(403).send({ message: "Invalid or expired refresh token" })
    }

    return res.send({
      message: "User fetched successfully",
      user,
    })
  } catch (error) {
    return res.status(500).send({ message: "An Error Occured", error: error.message })
  }

} 