const Order = require('../models/Order');
const axios = require('axios');
const crypto = require('crypto');

/**
 * Initiate a Vipps payment
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.initiateVippsPayment = async (req, res) => {
  try {
    const { customer, items, total, shippingCost, totalWithShipping } = req.body;
    
    // Create an order in the database
    const order = new Order({
      customer,
      items: items.map(item => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total,
      shippingCost,
      totalAmount: totalWithShipping,
      paymentMethod: 'vipps',
      status: 'pending'
    });
    
    await order.save();
    
    // Generate a unique order reference
    const orderReference = `VIPPS-${order._id}-${Date.now()}`;
    
    // In a real implementation, we would make a request to the Vipps API here
    // For demo purposes, we'll simulate a successful response
    
    // This is a simplified example. In a real application, you would:
    // 1. Create a proper Vipps API integration
    // 2. Follow the Vipps eCommerce API documentation
    // 3. Handle authentication, encryption, and other security measures
    
    // Mock Vipps API call
    // const vippsResponse = await axios.post('https://api.vipps.no/ecomm/v2/payments', {
    //   merchantInfo: {
    //     merchantSerialNumber: process.env.VIPPS_MERCHANT_SERIAL,
    //     callbackPrefix: `${process.env.API_BASE_URL}/api/payments/vipps/callback`,
    //     fallBack: `${process.env.FRONTEND_URL}/order/confirmation/${order._id}`,
    //     isApp: false
    //   },
    //   customerInfo: {
    //     mobileNumber: customer.phone.replace(/\D/g, '')
    //   },
    //   transaction: {
    //     orderId: orderReference,
    //     amount: Math.round(totalWithShipping * 100), // Amount in øre (cents)
    //     transactionText: `Bestilling hos Nordisk Butikk`
    //   }
    // }, {
    //   headers: {
    //     'Authorization': `Bearer ${vippsToken}`,
    //     'Merchant-Serial-Number': process.env.VIPPS_MERCHANT_SERIAL,
    //     'Vipps-System-Name': 'nordisk-butikk',
    //     'Vipps-System-Version': '1.0.0',
    //     'Ocp-Apim-Subscription-Key': process.env.VIPPS_SUBSCRIPTION_KEY
    //   }
    // });
    
    // For demo purposes, create a simulated Vipps response
    const mockVippsResponse = {
      orderId: orderReference,
      url: `https://api.vipps.no/payment-mock/${orderReference}`,
    };
    
    // Update the order with the payment reference
    order.paymentDetails = {
      provider: 'vipps',
      reference: orderReference,
      redirectUrl: mockVippsResponse.url
    };
    
    await order.save();
    
    // Return the redirect URL to the frontend
    res.json({
      success: true,
      orderId: order._id,
      redirectUrl: mockVippsResponse.url
    });
    
  } catch (error) {
    console.error('Vipps payment initiation error:', error);
    res.status(500).json({
      success: false,
      message: 'Det oppstod en feil ved initiering av Vipps-betaling'
    });
  }
};

/**
 * Initiate a Norwegian bank payment
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.initiateBankPayment = async (req, res) => {
  try {
    const { customer, items, total, shippingCost, totalWithShipping } = req.body;
    
    // Create an order in the database
    const order = new Order({
      customer,
      items: items.map(item => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total,
      shippingCost,
      totalAmount: totalWithShipping,
      paymentMethod: 'bank',
      status: 'pending'
    });
    
    await order.save();
    
    // Generate a unique order reference
    const orderReference = `BANK-${order._id}-${Date.now()}`;
    
    // In a real implementation, we would make a request to the bank payment API here
    // For demo purposes, we'll simulate a successful response
    
    // This is a simplified example. In a real application, you would:
    // 1. Create a proper integration with a Norwegian payment service provider
    //    (like Nets, ePay, etc.) that supports Norwegian banks
    // 2. Follow their API documentation
    // 3. Handle authentication, encryption, and other security measures
    
    // Mock bank payment API call
    // const bankResponse = await axios.post('https://api.norwegianpaymentprovider.no/payments', {
    //   merchantId: process.env.BANK_MERCHANT_ID,
    //   orderNumber: orderReference,
    //   amount: totalWithShipping,
    //   currency: 'NOK',
    //   returnUrl: `${process.env.FRONTEND_URL}/order/confirmation/${order._id}`,
    //   cancelUrl: `${process.env.FRONTEND_URL}/checkout`
    // }, {
    //   headers: {
    //     'Authorization': `Bearer ${bankToken}`,
    //     'Content-Type': 'application/json'
    //   }
    // });
    
    // For demo purposes, create a simulated bank response
    const mockBankResponse = {
      orderNumber: orderReference,
      paymentId: crypto.randomBytes(16).toString('hex'),
      redirectUrl: `https://api.norwegianbank.no/payment-mock/${orderReference}`,
    };
    
    // Update the order with the payment reference
    order.paymentDetails = {
      provider: 'bank',
      reference: orderReference,
      paymentId: mockBankResponse.paymentId,
      redirectUrl: mockBankResponse.redirectUrl
    };
    
    await order.save();
    
    // Return the redirect URL to the frontend
    res.json({
      success: true,
      orderId: order._id,
      redirectUrl: mockBankResponse.redirectUrl
    });
    
  } catch (error) {
    console.error('Bank payment initiation error:', error);
    res.status(500).json({
      success: false,
      message: 'Det oppstod en feil ved initiering av bankbetaling'
    });
  }
};

/**
 * Handle Vipps payment callback
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.handleVippsCallback = async (req, res) => {
  try {
    const { orderId, transaction } = req.body;
    
    // Extract the order ID from the Vipps order reference
    const orderIdMatch = orderId.match(/VIPPS-(.*?)-/);
    if (!orderIdMatch || !orderIdMatch[1]) {
      return res.status(400).json({
        success: false,
        message: 'Ugyldig ordre-referanse'
      });
    }
    
    const dbOrderId = orderIdMatch[1];
    
    // Find the order in the database
    const order = await Order.findById(dbOrderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Ordre ikke funnet'
      });
    }
    
    // Update order status based on transaction status
    if (transaction.status === 'CONFIRMED') {
      order.status = 'paid';
      order.paymentDetails.transactionId = transaction.id;
      order.paymentDetails.paidAt = new Date();
    } else if (transaction.status === 'CANCELLED') {
      order.status = 'cancelled';
    } else {
      order.status = 'failed';
    }
    
    await order.save();
    
    // Respond to Vipps
    res.json({ success: true });
    
  } catch (error) {
    console.error('Vipps callback error:', error);
    res.status(500).json({
      success: false,
      message: 'Det oppstod en feil ved behandling av Vipps-callback'
    });
  }
};

/**
 * Handle bank payment callback
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.handleBankCallback = async (req, res) => {
  try {
    const { orderNumber, paymentId, status } = req.body;
    
    // Extract the order ID from the bank order reference
    const orderIdMatch = orderNumber.match(/BANK-(.*?)-/);
    if (!orderIdMatch || !orderIdMatch[1]) {
      return res.status(400).json({
        success: false,
        message: 'Ugyldig ordre-referanse'
      });
    }
    
    const dbOrderId = orderIdMatch[1];
    
    // Find the order in the database
    const order = await Order.findById(dbOrderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Ordre ikke funnet'
      });
    }
    
    // Update order status based on payment status
    if (status === 'APPROVED') {
      order.status = 'paid';
      order.paymentDetails.transactionId = paymentId;
      order.paymentDetails.paidAt = new Date();
    } else if (status === 'CANCELLED') {
      order.status = 'cancelled';
    } else {
      order.status = 'failed';
    }
    
    await order.save();
    
    // Respond to bank
    res.json({ success: true });
    
  } catch (error) {
    console.error('Bank callback error:', error);
    res.status(500).json({
      success: false,
      message: 'Det oppstod en feil ved behandling av bank-callback'
    });
  }
};

/**
 * Verify a Vipps payment
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.verifyVippsPayment = async (req, res) => {
  try {
    const { orderId, paymentId } = req.params;
    
    // Find the order in the database
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Ordre ikke funnet'
      });
    }
    
    // In a real implementation, we would verify the payment with Vipps API
    // For demo purposes, we'll simulate a successful verification
    
    // Mock Vipps verification
    // const vippsVerification = await axios.get(
    //   `https://api.vipps.no/ecomm/v2/payments/${order.paymentDetails.reference}`,
    //   {
    //     headers: {
    //       'Authorization': `Bearer ${vippsToken}`,
    //       'Merchant-Serial-Number': process.env.VIPPS_MERCHANT_SERIAL,
    //       'Ocp-Apim-Subscription-Key': process.env.VIPPS_SUBSCRIPTION_KEY
    //     }
    //   }
    // );
    
    // Simulate payment verification
    const mockPaymentStatus = 'CONFIRMED';
    
    if (mockPaymentStatus === 'CONFIRMED') {
      // If the payment is not already marked as paid
      if (order.status !== 'paid') {
        order.status = 'paid';
        order.paymentDetails.transactionId = paymentId;
        order.paymentDetails.paidAt = new Date();
        await order.save();
      }
      
      res.json({
        success: true,
        status: 'paid',
        order: {
          _id: order._id,
          status: order.status,
          totalAmount: order.totalAmount,
          createdAt: order.createdAt
        }
      });
    } else if (mockPaymentStatus === 'CANCELLED') {
      order.status = 'cancelled';
      await order.save();
      
      res.json({
        success: true,
        status: 'cancelled',
        order: {
          _id: order._id,
          status: order.status,
          totalAmount: order.totalAmount,
          createdAt: order.createdAt
        }
      });
    } else {
      res.json({
        success: true,
        status: 'pending',
        order: {
          _id: order._id,
          status: order.status,
          totalAmount: order.totalAmount,
          createdAt: order.createdAt
        }
      });
    }
    
  } catch (error) {
    console.error('Vipps payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Det oppstod en feil ved verifisering av Vipps-betaling'
    });
  }
};

/**
 * Verify a bank payment
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.verifyBankPayment = async (req, res) => {
  try {
    const { orderId, paymentId } = req.params;
    
    // Find the order in the database
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Ordre ikke funnet'
      });
    }
    
    // In a real implementation, we would verify the payment with the bank's API
    // For demo purposes, we'll simulate a successful verification
    
    // Mock bank verification
    // const bankVerification = await axios.get(
    //   `https://api.norwegianpaymentprovider.no/payments/${paymentId}`,
    //   {
    //     headers: {
    //       'Authorization': `Bearer ${bankToken}`,
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // );
    
    // Simulate payment verification
    const mockPaymentStatus = 'APPROVED';
    
    if (mockPaymentStatus === 'APPROVED') {
      // If the payment is not already marked as paid
      if (order.status !== 'paid') {
        order.status = 'paid';
        order.paymentDetails.transactionId = paymentId;
        order.paymentDetails.paidAt = new Date();
        await order.save();
      }
      
      res.json({
        success: true,
        status: 'paid',
        order: {
          _id: order._id,
          status: order.status,
          totalAmount: order.totalAmount,
          createdAt: order.createdAt
        }
      });
    } else if (mockPaymentStatus === 'CANCELLED') {
      order.status = 'cancelled';
      await order.save();
      
      res.json({
        success: true,
        status: 'cancelled',
        order: {
          _id: order._id,
          status: order.status,
          totalAmount: order.totalAmount,
          createdAt: order.createdAt
        }
      });
    } else {
      res.json({
        success: true,
        status: 'pending',
        order: {
          _id: order._id,
          status: order.status,
          totalAmount: order.totalAmount,
          createdAt: order.createdAt
        }
      });
    }
    
  } catch (error) {
    console.error('Bank payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Det oppstod en feil ved verifisering av bankbetaling'
    });
  }
};

/**
 * Get payment status
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Find the order in the database
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Ordre ikke funnet'
      });
    }
    
    res.json({
      success: true,
      orderId: order._id,
      status: order.status,
      paymentMethod: order.paymentMethod,
      total: order.totalAmount,
      customer: {
        name: `${order.customer.firstName} ${order.customer.lastName}`,
        email: order.customer.email
      },
      createdAt: order.createdAt,
      paidAt: order.paymentDetails?.paidAt
    });
    
  } catch (error) {
    console.error('Payment status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Det oppstod en feil ved sjekking av betalingsstatus'
    });
  }
};