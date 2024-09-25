import { Branch, Customer, DeliveryPartner, Order } from "../../models/index.js";

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.user
    const { items, branch, totalPrice } = req.body
    const customerData = await Customer.findById(userId)
    const branchData = await Branch.findById(branch)
    console.log('customerData', branchData)
    if (!customerData) {
      return res.status(404).send({ message: "Customer not found" })
    }
    const newOrder = new Order({
      customer: userId,
      items: items.map(item => (
        {
          id: item.id,
          item: item.item,
          count: item.count
        }
      )),
      branch,
      totalPrice,
      deliveryLocation: {
        latitude: customerData.liveLocation.latitude,
        longitude: customerData.liveLocation.longitude,
        address: customerData.address || "no address available"
      },
      pickupLocation: {
        latitude: branchData.location.latitude,
        longitude: branchData.location.longitude,
        address: branchData.address || "no address available"
      },

    })
    const saveOrder = await newOrder.save()
    return res.status(201).send({ message: "Order created successfully", saveOrder })

  } catch (error) {
    return res.status(500).send({ message: "Failed to create order", error: error.message })
  }
}

export const confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.params
    const { userId } = req.user
    const { deliveryPersonLocation } = req.body

    const deliveryPerson = await DeliveryPartner.findById(userId)
    if (!deliveryPerson) {
      return res.status(404).send({ message: "Delivery person not found" })
    }
    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).send({ message: "Order not found" })
    }
    if (order.status !== "available") {
      return res.status(404).send({ message: "Order not available" })
    }

    order.status = "confirmed"
    order.deliveryPartner = userId
    order.deliveryPersonLocation = {
      latitude: deliveryPersonLocation?.latitude,
      longitude: deliveryPersonLocation?.longitude,
      address: deliveryPersonLocation?.address
    }

    const saveOrder = await order.save()
    return res.send({
      message: "Order confirmed successfully",
      saveOrder
    })
  } catch (error) {
    return res.status(500).send({ message: "failed to confirm order", error: error.message })
  }
}

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params
    const { status, deliveryPersonLocation } = req.body

    const { userId } = req.user

    const deliveryPerson = await DeliveryPartner.findById(userId)
    if (!deliveryPerson) {
      return res.status(404).send({ message: "Delivery person not found" })
    }

    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).send({ message: "Order not found" })
    }
    if (["cancelled", "delivered"].includes(order.status)) {
      return res.status(404).send({ message: "Order cannot be updated" })
    }
    if (order.deliveryPartner.toString() !== userId) {
      return res.status(403).send({ message: "unauthorized" })
    }

    order.status = status
    order.deliveryPersonLocation = deliveryPersonLocation
    const updateOrder = await order.save()
    return res.send({
      message: "Order status updated successfully",
      updateOrder
    })

  } catch (error) {
    return res.status(500).send({ message: "Failed to update order status", error: error.message })
  }
}


export const getOrders = async (req, res) => {
  try {
    const { status, customerId, deliveryPartnerId, branchId } = req.query
    let query = {}
    if (status) {
      query.status = status
    }
    if (customerId) {
      query.customer = customerId
    }
    if (deliveryPartnerId) {
      query.deliveryPartner = deliveryPartnerId
      query.branch = branchId
    }
    const orders = await Order.find(query).populate(
      "customer deliveryPartner branch items.item"
    )
    return res.send({
      message: "Orders fetched successfully",
      orders
    })
  } catch (error) {
    return res.status(500).send({ message: "Failed to retrive order", error: error.message })
  }
}

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params
    const order = await Order.findById(orderId).populate(
      "customer deliveryPartner branch items.item"
    )
    if (!order) {
      return res.status(404).send({ message: "Order not found" })
    }
    return res.send({
      message: "Order fetched successfully",
      order
    })
  } catch (error) {
    return res.status(500).send({ message: "Failed to retrive order", error: error.message })
  }
}