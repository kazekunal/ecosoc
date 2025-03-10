import { verifyPayment } from '../../lib/paytm';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { ORDERID, STATUS, TXNAMOUNT, TXNID } = req.body;
    
    // Verify the payment
    const response = await verifyPayment(ORDERID, req.body);
    
    if (response && response.body.resultInfo.resultStatus === 'TXN_SUCCESS') {
      // Payment was successful
      // In a real app, update your database here
      
      // Redirect to success page
      res.writeHead(302, {
        Location: `/success?orderId=${ORDERID}&amount=${TXNAMOUNT}&txnId=${TXNID}`
      });
      res.end();
    } else {
      // Payment failed
      res.writeHead(302, {
        Location: `/failed?orderId=${ORDERID}&reason=${response.body.resultInfo.resultMsg || 'Unknown error'}`
      });
      res.end();
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.writeHead(302, {
      Location: '/failed?reason=Server_Error'
    });
    res.end();
  }
}