const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Initiate payments
router.post('/vipps', paymentController.initiateVippsPayment);
router.post('/bank', paymentController.initiateBankPayment);

// Payment callbacks
router.post('/vipps/callback', paymentController.handleVippsCallback);
router.post('/bank/callback', paymentController.handleBankCallback);

// Verify payments
router.get('/vipps/verify/:orderId/:paymentId', paymentController.verifyVippsPayment);
router.get('/bank/verify/:orderId/:paymentId', paymentController.verifyBankPayment);

// Get payment status
router.get('/status/:orderId', paymentController.getPaymentStatus);

module.exports = router;