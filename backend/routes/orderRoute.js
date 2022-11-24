const express = require("express");
const {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

//getUserOrders
router.route("/myorders").get(protect, getMyOrders);
//create new order
router.route("/").post(protect, addOrderItem);
//get Order by Id
router.route("/:id").get(protect, getOrderById);
//update Order
router.route("/:id/pay").put(protect, updateOrderToPaid);

module.exports = router;
