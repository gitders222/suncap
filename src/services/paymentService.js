import axios from 'axios';
import { API_URL } from './api';

/**
 * Initiate a payment using Vipps
 * 
 * @param {Object} orderData - The order data including customer info and items
 * @returns {Promise<Object>} - Response with redirect URL to Vipps payment page
 */
export const initiateVippsPayment = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/payments/vipps`, orderData);
    return response.data;
  } catch (error) {
    console.error('Vipps payment initiation error:', error);
    throw new Error(
      error.response?.data?.message || 
      'Det oppstod en feil ved initiering av Vipps-betaling'
    );
  }
};

/**
 * Initiate a payment using Norwegian bank payment
 * 
 * @param {Object} orderData - The order data including customer info and items
 * @returns {Promise<Object>} - Response with redirect URL to bank payment page
 */
export const initiateBankPayment = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/payments/bank`, orderData);
    return response.data;
  } catch (error) {
    console.error('Bank payment initiation error:', error);
    throw new Error(
      error.response?.data?.message || 
      'Det oppstod en feil ved initiering av bankbetaling'
    );
  }
};

/**
 * Verify a payment callback from Vipps
 * 
 * @param {string} orderId - The order ID
 * @param {string} paymentId - The payment ID from Vipps
 * @returns {Promise<Object>} - Payment verification result
 */
export const verifyVippsPayment = async (orderId, paymentId) => {
  try {
    const response = await axios.get(
      `${API_URL}/payments/vipps/verify/${orderId}/${paymentId}`
    );
    return response.data;
  } catch (error) {
    console.error('Vipps payment verification error:', error);
    throw new Error(
      error.response?.data?.message || 
      'Det oppstod en feil ved verifisering av Vipps-betaling'
    );
  }
};

/**
 * Verify a payment callback from bank
 * 
 * @param {string} orderId - The order ID
 * @param {string} paymentId - The payment ID from bank
 * @returns {Promise<Object>} - Payment verification result
 */
export const verifyBankPayment = async (orderId, paymentId) => {
  try {
    const response = await axios.get(
      `${API_URL}/payments/bank/verify/${orderId}/${paymentId}`
    );
    return response.data;
  } catch (error) {
    console.error('Bank payment verification error:', error);
    throw new Error(
      error.response?.data?.message || 
      'Det oppstod en feil ved verifisering av bankbetaling'
    );
  }
};

/**
 * Get payment status
 * 
 * @param {string} orderId - The order ID
 * @returns {Promise<Object>} - Payment status
 */
export const getPaymentStatus = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/payments/status/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Payment status check error:', error);
    throw new Error(
      error.response?.data?.message || 
      'Det oppstod en feil ved sjekking av betalingsstatus'
    );
  }
};