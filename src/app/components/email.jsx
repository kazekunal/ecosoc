import React from "react";

const EmailTemplate = ({
  orderId,
  items,
  participants,
  needsAccommodation,
  totalAmount,
}) => {
  // Filter out duplicate accommodation entries from items
  const filteredItems = items.filter(item => {
    const itemNameLower = item.name.toLowerCase();
    // Only include items that are not accommodation-related
    return !itemNameLower.includes("accommodation");
  });
  
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", padding: "20px", color: "#333" }}>
      <div style={{ backgroundColor: "#2563eb", padding: "20px", borderRadius: "8px 8px 0 0", marginBottom: "20px" }}>
        <h1 style={{ color: "white", margin: "0", textAlign: "center" }}>IQTISADIYYAT Ticket Confirmation</h1>
      </div>
      
      <div style={{ padding: "0 20px" }}>
        <p style={{ fontSize: "16px" }}>Dear {participants[0].name},</p>
        
        <p style={{ fontSize: "16px" }}>Thank you for your purchase! Your payment has been successfully processed.</p>
        
        <div style={{ backgroundColor: "#f0f7ff", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
          <h2 style={{ color: "#2563eb", marginTop: "0" }}>Order Details</h2>
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</p>
        </div>
        
        <h2 style={{ color: "#2563eb" }}>Purchased Tickets</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
          <thead>
            <tr style={{ backgroundColor: "#2563eb", color: "white" }}>
              <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Ticket Type</th>
              <th style={{ padding: "10px", textAlign: "center", border: "1px solid #ddd" }}>Quantity</th>
              <th style={{ padding: "10px", textAlign: "right", border: "1px solid #ddd" }}>Price</th>
              <th style={{ padding: "10px", textAlign: "right", border: "1px solid #ddd" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}>
                <td style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>{item.name}</td>
                <td style={{ padding: "10px", textAlign: "center", border: "1px solid #ddd" }}>{item.quantity}</td>
                <td style={{ padding: "10px", textAlign: "right", border: "1px solid #ddd" }}>₹{item.price.toFixed(2)}</td>
                <td style={{ padding: "10px", textAlign: "right", border: "1px solid #ddd" }}>₹{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
            {/* Add accommodation entry only once if needed */}
            {needsAccommodation && (
              <tr style={{ backgroundColor: "#f0f7ff" }}>
                <td style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Accommodation</td>
                <td style={{ padding: "10px", textAlign: "center", border: "1px solid #ddd" }}>{participants.length}</td>
                <td style={{ padding: "10px", textAlign: "right", border: "1px solid #ddd" }}>₹500.00</td>
                <td style={{ padding: "10px", textAlign: "right", border: "1px solid #ddd" }}>₹{(500 * participants.length).toFixed(2)}</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr style={{ backgroundColor: "#2563eb", color: "white" }}>
              <td colSpan={3} style={{ padding: "10px", textAlign: "right", border: "1px solid #ddd" }}><strong>Grand Total</strong></td>
              <td style={{ padding: "10px", textAlign: "right", border: "1px solid #ddd" }}><strong>₹{totalAmount.toFixed(2)}</strong></td>
            </tr>
          </tfoot>
        </table>
        
        <h2 style={{ color: "#2563eb" }}>Participant Information</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
          <thead>
            <tr style={{ backgroundColor: "#2563eb", color: "white" }}>
              <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Name</th>
              <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Email</th>
              <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}>
                <td style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>{participant.name}</td>
                <td style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>{participant.email}</td>
                <td style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>{participant.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {needsAccommodation && (
          <div style={{ backgroundColor: "#f0f7ff", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
            <h3 style={{ color: "#2563eb", marginTop: "0" }}>Accommodation Details</h3>
            <p>You have opted for accommodation. Further details will be shared closer to the event date.</p>
          </div>
        )}
        
        <div style={{ marginTop: "30px", padding: "15px", borderTop: "1px solid #ddd" }}>
          <p style={{ fontSize: "14px", color: "#666" }}>If you have any questions about your tickets or the event, please contact us at https://www.iqtisadiyyat.in/contact</p>
          <p style={{ fontSize: "14px", color: "#666" }}>We look forward to seeing you at the event!</p>
        </div>
      </div>
      
      <div style={{ backgroundColor: "#2563eb", padding: "20px", borderRadius: "0 0 8px 8px", marginTop: "20px", textAlign: "center", color: "white" }}>
        <p style={{ margin: "0" }}>© {new Date().getFullYear()} SNU Events. All rights reserved.</p>
      </div>
    </div>
  );
};

export default EmailTemplate;