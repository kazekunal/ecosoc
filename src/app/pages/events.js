import { useState } from 'react';
import { useCart } from '../context/CartContext';

const tickets = [
  { id: 'ticket-standard', name: 'Standard Ticket', price: 499, description: 'General admission' },
  { id: 'ticket-vip', name: 'VIP Ticket', price: 1499, description: 'VIP access with additional perks' },
  { id: 'ticket-premium', name: 'Premium Ticket', price: 999, description: 'Premium seating and early access' },
];

const extras = [
  { id: 'extra-tshirt', name: 'Event T-Shirt', price: 249, description: 'Commemorative event t-shirt' },
  { id: 'extra-poster', name: 'Event Poster', price: 149, description: 'Limited edition event poster' },
];

export default function EventsPage() {
  const { addItem } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (item) => {
    addItem(item);
    setAddedItems(prev => ({
      ...prev,
      [item.id]: true
    }));
    
    // Reset the "Added" text after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => ({
        ...prev,
        [item.id]: false
      }));
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Event Tickets</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="border rounded-lg overflow-hidden shadow-md">
            <div className="bg-gray-100 p-6">
              <h2 className="text-xl font-bold">{ticket.name}</h2>
              <p className="text-gray-600 mt-1">{ticket.description}</p>
              <p className="text-2xl font-bold mt-4">₹{ticket.price.toFixed(2)}</p>
            </div>
            <div className="p-4">
              <button 
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                onClick={() => handleAddToCart(ticket)}
              >
                {addedItems[ticket.id] ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Additional Items</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {extras.map((extra) => (
          <div key={extra.id} className="border rounded p-4">
            <h3 className="font-bold">{extra.name}</h3>
            <p className="text-gray-600 text-sm">{extra.description}</p>
            <p className="font-bold mt-2">₹{extra.price.toFixed(2)}</p>
            <button 
              className="mt-2 w-full bg-gray-200 py-1 rounded hover:bg-gray-300"
              onClick={() => handleAddToCart(extra)}
            >
              {addedItems[extra.id] ? 'Added!' : 'Add'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}