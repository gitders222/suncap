const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customer: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  shippingCost: {
    type: Number,
    required: true,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['vipps', 'bank']
  },
  paymentDetails: {
    provider: {
      type: String,
      enum: ['vipps', 'bank']
    },
    reference: {
      type: String
    },
    paymentId: {
      type: String
    },
    transactionId: {
      type: String
    },
    redirectUrl: {
      type: String
    },
    paidAt: {
      type: Date
    }
  },
  shippingDetails: {
    carrier: {
      type: String
    },
    trackingNumber: {
      type: String
    },
    shippedAt: {
      type: Date
    },
    estimatedDelivery: {
      type: Date
    },
    deliveredAt: {
      type: Date
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);