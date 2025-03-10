"use client"
import { useRouter } from 'next/router';

export default function FailedPage() {
  const router = useRouter();
  const { orderId, reason } = router.query;
  
  return (
    <div className="container mx-auto p-4 text-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto mt-12">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Payment Failed</h1>
        <p className="mb-6">We're sorry, but your payment could not be processed.</p>
        
        {reason && (
          <div className="bg-red-50 p-4 rounded mb-6 text-left">
            <p><strong>Reason:</strong> {reason}</p>
            {orderId && <p><strong>Order ID:</strong> {orderId}</p>}
          </div>
        )}
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
          <button 
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            onClick={() => router.push('/cart')}
          >
            Return to Cart
          </button>
          <button 
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            onClick={() => router.push('/')}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}