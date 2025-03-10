import { v4 as uuidv4 } from 'uuid';
import PaytmChecksum from 'paytmchecksum';

export const generateOrderId = () => {
  return `ORDER_${Date.now()}_${uuidv4().substring(0, 8)}`;
};

export const generateTransactionToken = async (orderId, amount, customerId, callbackUrl) => {
  try {
    const paytmParams = {
      body: {
        requestType: 'Payment',
        mid: process.env.PAYTM_MERCHANT_ID,
        websiteName: process.env.PAYTM_WEBSITE,
        orderId: orderId,
        callbackUrl: callbackUrl,
        txnAmount: {
          value: amount.toString(),
          currency: 'INR',
        },
        userInfo: {
          custId: customerId,
        },
      },
    };

    // Generate checksum
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MERCHANT_KEY
    );

    // Add checksum to parameters
    paytmParams.head = {
      signature: checksum,
    };

    // Make API call to Paytm
    const response = await fetch(
      `https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MERCHANT_ID}&orderId=${orderId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paytmParams),
      }
    );

    const data = await response.json();
    return data.body.txnToken;
  } catch (error) {
    console.error('Error generating transaction token:', error);
    throw error;
  }
};

export const verifyPayment = async (orderId, body) => {
  try {
    const paytmParams = {
      body: {
        mid: process.env.PAYTM_MERCHANT_ID,
        orderId: orderId,
      },
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MERCHANT_KEY
    );

    paytmParams.head = {
      signature: checksum,
    };

    const response = await fetch(
      `https://securegw-stage.paytm.in/v3/order/status`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paytmParams),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};