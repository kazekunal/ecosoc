import React from 'react';

const ShippingAndDeliveryPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Shipping and Delivery Policy</h1>
      <p className="text-sm text-gray-500 mb-6 text-center">Last updated on 24-02-2025</p>
      
      <div className="prose prose-lg max-w-none">
        <p>
          At <strong>Iqtisadiyyat'25</strong>, we offer digital tickets and event-related merchandise. 
          This policy outlines the shipping and delivery terms for our tickets and any physical products 
          sold through our website.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Ticket Delivery</h2>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            All tickets for <strong>Iqtisadiyyat'25</strong> are <strong>delivered electronically</strong> via the email address provided at the time of booking.
          </li>
          <li className="mb-2">
            Once your payment is confirmed, you will receive a confirmation email with your <strong>e-ticket and QR code</strong> within <strong>24 hours</strong>.
          </li>
          <li className="mb-2">
            If you do not receive your ticket within this timeframe, please check your spam/junk folder or contact us at <strong>economicssociety@snu.edu.in</strong>.
          </li>
          <li className="mb-2">
            A <strong>valid government-issued ID</strong> may be required for ticket verification at the event venue.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Merchandise Shipping</h2>
        <p>
          If we offer event-related merchandise for sale, the following terms apply:
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">A. Shipping Methods & Timelines</h3>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            Orders are processed within <strong>3-5 business days</strong> after payment confirmation.
          </li>
          <li className="mb-2">
            Shipping times vary depending on the delivery location and courier service. Estimated delivery times:
            <ul className="list-circle pl-6 mt-2">
              <li className="mb-1"><strong>Within India:</strong> 7-10 business days</li>
              <li className="mb-1"><strong>International Shipping:</strong> Currently <strong>not available</strong></li>
            </ul>
          </li>
          <li className="mb-2">
            Once shipped, you will receive a <strong>tracking number</strong> via email.
          </li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">B. Shipping Charges</h3>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            Shipping charges will be calculated at checkout and depend on the delivery location.
          </li>
          <li className="mb-2">
            Any additional customs duties, taxes, or import fees (for international orders, if applicable) will be borne by the customer.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Non-Delivery & Order Issues</h2>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            If your merchandise order does not arrive within the estimated delivery time, please contact us at <strong>economicssociety@snu.edu.in</strong>.
          </li>
          <li className="mb-2">
            We are not responsible for delivery delays caused by <strong>courier issues, incorrect address details, or force majeure events</strong>.
          </li>
          <li className="mb-2">
            If the order is returned to us due to incorrect shipping details provided by the customer, re-shipping charges will apply.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contact Information</h2>
        <p>
          For any queries regarding ticket delivery or merchandise shipping, please reach out to:
        </p>
        <p className="flex items-center my-2">
          <span className="mr-2">📧</span> Email: <strong className="ml-2">economicssociety@snu.edu.in</strong>
        </p>
        <p className="flex items-center my-2">
          <span className="mr-2">📍</span> Address: <strong className="ml-2">Shiv Nadar University, Noida, Uttar Pradesh</strong>
        </p>
        
        <p className="mt-8 font-medium">
          By purchasing tickets or merchandise, you acknowledge that you have read and agreed to this <strong>Shipping and Delivery Policy</strong>.
        </p>
      </div>
    </div>
  );
};

export default ShippingAndDeliveryPolicy;