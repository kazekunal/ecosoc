import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-6 text-center">Last updated on 24-02-2025</p>
      
      <div className="prose prose-lg max-w-none">
        <p>
          Welcome to <strong>Iqtisadiyyat'25</strong>! We are committed to protecting your privacy and ensuring that your personal information 
          is handled securely. This Privacy Policy explains how we collect, use, and protect your data when you visit our website 
          (<strong>www.iqtisadiyyat.in</strong>) and use our services.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p>
          We may collect the following types of personal information when you visit our website or register for the event:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            <strong>Personal Details</strong>: Name, email address, phone number, and organization (if applicable).
          </li>
          <li className="mb-2">
            <strong>Payment Information</strong>: When you purchase tickets or merchandise, we collect billing details (processed securely via third-party payment gateways).
          </li>
          <li className="mb-2">
            <strong>Technical Data</strong>: IP address, browser type, device information, and cookies for website analytics.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p>
          We use the information collected for the following purposes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            To process event registrations and ticket purchases.
          </li>
          <li className="mb-2">
            To send event updates, confirmations, and important notifications.
          </li>
          <li className="mb-2">
            To improve website functionality and enhance user experience.
          </li>
          <li className="mb-2">
            To ensure the security of our website and prevent fraud.
          </li>
          <li className="mb-2">
            To comply with legal obligations, if required.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Protection and Security</h2>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            We implement appropriate security measures to protect your data from unauthorized access or disclosure.
          </li>
          <li className="mb-2">
            Payment transactions are encrypted and processed through secure third-party providers.
          </li>
          <li className="mb-2">
            We do not sell or share your personal data with third parties for marketing purposes.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies and Tracking Technologies</h2>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            We use <strong>cookies</strong> to improve website functionality and gather analytics on user behavior.
          </li>
          <li className="mb-2">
            You can choose to disable cookies through your browser settings, but this may affect website performance.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Third-Party Services</h2>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            Our website may contain links to third-party websites. We are not responsible for their privacy policies or content.
          </li>
          <li className="mb-2">
            We use third-party payment gateways and ticketing platforms that follow their own security and privacy protocols.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            Access, update, or request the deletion of your personal data.
          </li>
          <li className="mb-2">
            Opt-out of promotional communications by clicking the "unsubscribe" link in emails.
          </li>
          <li className="mb-2">
            Contact us for any concerns regarding data usage.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with the <strong>latest update date</strong> mentioned above.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
        <p>
          If you have any questions regarding this Privacy Policy or your data, please contact us at:
        </p>
        <p className="flex items-center my-2">
          <span className="mr-2">📧</span> <strong>Email:</strong> <span className="ml-2">economicssociety@snu.edu.in</span>
        </p>
        <p className="flex items-center my-2">
          <span className="mr-2">📍</span> <strong>Address:</strong> <span className="ml-2">Shiv Nadar University, Noida, Uttar Pradesh</span>
        </p>
        
        <p className="mt-8 font-medium">
          By using our website, you agree to the terms outlined in this <strong>Privacy Policy</strong>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;