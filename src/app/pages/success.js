import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext';

export default function SuccessPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const { orderId, amount, txnId } = router.query;
  
  // Clear the cart on successful payment
  useEffect(() => {
    clearCart();
    // Remove the order from localStorage
    localStorage.removeItem('currentOrder');
  }, [clearCart]);
  
  return (
    <div className="container mx-auto p-4 text-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto mt-12">
        <h1 className="text-3xl font-bold text-green-500 mb-4">Payment Successful!</h1>
        <p className="mb-6">Thank you for your purchase. Your order has been confirmed.</p>
        
        {orderId && (
          <div className="bg-gray-50 p-4 rounded mb-6 text-left">
            <p><strong>Order ID:</strong> {orderId}</p>
            {amount && <p><strong>Amount:</strong> ₹{amount}</p>}
            {txnId && <p><strong>Transaction ID:</strong> {txnId}</p>}
          </div>
        )}
        
        <button 
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          onClick={() => router.push('/')}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
