import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Terms & Conditions</h1>
      <p className="text-sm text-gray-500 mb-6 text-center">Last updated on 24-02-2025</p>
      
      <div className="prose prose-lg max-w-none">
        <p>
          These Terms and Conditions, along with our Privacy Policy and any other applicable terms ("Terms"), 
          constitute a binding agreement between <strong>Mehar Kumar Verma</strong> ("Website Owner," "we," "us," or "our") 
          and you ("you" or "your") regarding your use of our website and participation in <strong>Iqtisadiyyat'25</strong> ("the Conclave"). 
          By accessing <strong>Iqtisadiyyat.in</strong> or purchasing tickets to the Conclave, you agree that you have read, 
          understood, and accepted these Terms.
        </p>
        <p>
          We reserve the right to modify these Terms at any time without prior notice. It is your responsibility to review them periodically.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Offerings of the Conclave</h2>
        <p>
          Iqtisadiyyat'25 is an economics conclave featuring:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            <strong>Speaker Sessions</strong>: Keynote speeches, panel discussions, and interactive sessions with industry leaders, economists, and policymakers.
          </li>
          <li className="mb-2">
            <strong>Competitions</strong>: Academic and policy-related contests for students and professionals.
          </li>
          <li className="mb-2">
            <strong>Workshops and Networking Events</strong>: Opportunities for learning and engagement with experts.
          </li>
        </ul>
        <p>
          Your participation in any of these events is subject to the specific rules and eligibility criteria outlined by the organizers.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of Website and Services</h2>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            You agree to provide true, accurate, and complete information during registration or ticket purchase.
          </li>
          <li className="mb-2">
            We do not guarantee the accuracy, completeness, or suitability of the information on this website. You acknowledge that such information may contain inaccuracies, and we exclude liability to the fullest extent permitted by law.
          </li>
          <li className="mb-2">
            The website and its content are proprietary, and you may not claim any intellectual property rights over them.
          </li>
          <li className="mb-2">
            Unauthorized use of the website or services may lead to legal action.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Ticketing and Refund Policy</h2>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            By purchasing a ticket, you enter into a legally binding agreement with us.
          </li>
          <li className="mb-2">
            All ticket sales are <strong>final</strong>. Refunds will only be issued if the event is canceled by the organizers. No refunds will be provided for no-shows or inability to attend.
          </li>
          <li className="mb-2">
            In case of rescheduling, your ticket will be valid for the new date.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Code of Conduct</h2>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            Participants are expected to maintain decorum during the Conclave. Disruptive behavior, harassment, or violation of any applicable laws will lead to immediate removal from the event without a refund.
          </li>
          <li className="mb-2">
            We reserve the right to refuse entry or remove any participant violating these Terms.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not responsible for their content, privacy policies, or practices. Accessing them is at your own risk.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Liability and Force Majeure</h2>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            We are not liable for any indirect or incidental damages arising from your use of the website or participation in the Conclave.
          </li>
          <li className="mb-2">
            If the Conclave is canceled or delayed due to circumstances beyond our control (force majeure), we are not liable for any losses incurred by participants.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Governing Law and Jurisdiction</h2>
        <p>
          These Terms are governed by Indian law. Any disputes shall be subject to the exclusive jurisdiction of the courts in <strong>Noida, Uttar Pradesh</strong>.
        </p>
        
        <p className="mt-8">
          For any queries or concerns regarding these Terms, please contact us via the information provided on <strong>Iqtisadiyyat.in</strong>.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;