import React from 'react';

const CancellationAndRefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Cancellation and Refund Policy</h1>
      <p className="text-sm text-gray-500 mb-6 text-center">Last updated on 24-02-2025</p>
      
      <div className="prose prose-lg max-w-none">
        <p>
          At <strong>Iqtisadiyyat'25</strong>, we strive to provide a seamless experience for all attendees. 
          This Cancellation and Refund Policy outlines the terms related to ticket cancellations, refunds, and event modifications.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Ticket Cancellation Policy</h2>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            Once a ticket is purchased for Iqtisadiyyat'25, <strong>it is non-cancellable and non-transferable</strong>.
          </li>
          <li className="mb-2">
            If you are unable to attend the event for any reason, you may not claim a refund or transfer the ticket to another individual.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Refund Policy</h2>
        <p>
          Refunds will only be provided in the following circumstances:
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">A. Event Cancellation by Organizers</h3>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            If <strong>Iqtisadiyyat'25</strong> is canceled by the organizers due to unforeseen circumstances, all ticket holders will receive a <strong>full refund</strong>.
          </li>
          <li className="mb-2">
            Refunds will be processed within <strong>14 business days</strong> from the date of cancellation.
          </li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">B. Event Rescheduling</h3>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            If the event is <strong>rescheduled</strong>, your ticket will remain valid for the new date.
          </li>
          <li className="mb-2">
            If you are unable to attend on the rescheduled date, you may request a <strong>refund within 7 days</strong> of the announcement of the new date.
          </li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">C. Force Majeure</h3>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            No refunds will be provided if the event is canceled or disrupted due to circumstances beyond our control, such as natural disasters, pandemics, government regulations, or other force majeure events.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Refund Process</h2>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            If eligible for a refund, you must submit a refund request by <strong>emailing us at economicssociety@snu.edu.in</strong> with your <strong>ticket details and proof of purchase</strong>.
          </li>
          <li className="mb-2">
            Refunds will be processed through the <strong>original payment method</strong> used for booking.
          </li>
          <li className="mb-2">
            Any applicable transaction or service fees charged by third-party payment providers are <strong>non-refundable</strong>.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contact Information</h2>
        <p>
          For any refund-related queries, please reach out to us at:
        </p>
        <p className="flex items-center my-2">
          <span className="mr-2">📧</span> Email: <strong className="ml-2">economicssociety@snu.edu.in</strong>
        </p>
        <p className="flex items-center my-2">
          <span className="mr-2">📍</span> Address: <strong className="ml-2">Shiv Nadar University, Noida, Uttar Pradesh</strong>
        </p>
        
        <p className="mt-8 font-medium">
          By purchasing a ticket, you acknowledge that you have read and agreed to this <strong>Cancellation and Refund Policy</strong>.
        </p>
      </div>
    </div>
  );
};

export default CancellationAndRefundPolicy;