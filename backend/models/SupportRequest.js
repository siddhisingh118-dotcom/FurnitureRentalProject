const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema({

  userId: String,
  userName: String,

  productId: String,
  productName: String,
  productImage: String,

  message: String,

  adminReply: {
    type: String,
    default: ""
  },

  requestStatus: {
    type: String,
    default: "Pending"
  },

  requestDate: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("SupportRequest", supportSchema);