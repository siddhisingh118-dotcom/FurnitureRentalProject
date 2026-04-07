const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  userName: {
    type: String,
    required: true
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },

  productName: String,
  productImage: String,
  rentPrice: Number,

  securityDeposit: {
    type: Number,
    default: 0
  },

  rentalDuration: {
    type: Number,
    default: 1
  },

  totalPrice: Number,
  deliveryAddress: String,
  deliveryDate: Date,
  pickupDate: Date,
  returnDate: Date,

  returnRequested: {
  type: Boolean,
  default: false
},
returnApproved: {
  type: Boolean,
  default: false
},

  bookingStatus: {
    type: String,
    default: "Confirmed"
  },

  bookingDate: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Booking", bookingSchema);