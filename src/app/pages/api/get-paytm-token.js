import { generateTransactionToken, generateOrderId } from '../../lib/paytm';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, customerId, items } = req.body;
    
    // Generate order ID
    const orderId = generateOrderId();
    
    // Generate callback URL
    const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/paytm-callback`;
    
    // Generate transaction token
    const txnToken = await generateTransactionToken(orderId, amount, customerId, callbackUrl);
    
    // Store order details in session/database for verification later
    // In a production app, you would store this in a database
    // For simplicity, we're just returning it to be stored client-side
    
    res.status(200).json({
      txnToken,
      orderId,
      amount,
      items
    });
  } catch (error) {
    console.error('Error generating Paytm token:', error);
    res.status(500).json({ error: 'Failed to create payment token' });
  }
}
