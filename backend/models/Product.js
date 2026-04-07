const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: {
    type: String,
    required: true,
    enum: ['Furniture', 'Appliances'] // Categorization requirement [cite: 47, 48, 49]
  },
  rentPrice: { type: Number, required: true }, // Monthly rental [cite: 51, 121]
  securityDeposit: { type: Number, required: true }, // Required field [cite: 52, 122]
  rentalTenureOptions: { 
    type: [Number], 
    default: [3, 6, 12] // Flexible tenure plans [cite: 16, 53, 123]
  },
  image: { type: String, required: true }, // URL for UI visibility
  isAvailable: { type: Boolean, default: true }, // For inventory tracking [cite: 62, 71]
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);