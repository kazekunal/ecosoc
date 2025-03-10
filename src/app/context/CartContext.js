"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  // Initialize with empty values first
  const [items, setItems] = useState([])
  const [customerId, setCustomerId] = useState('')
  const [isClient, setIsClient] = useState(false)

  // Use useEffect to access localStorage after component mounts (client-side only)
  useEffect(() => {
    // Set a flag indicating we're now client-side
    setIsClient(true)
    
    // Now we can safely access localStorage
    const storedItems = localStorage.getItem('cartItems')
    if (storedItems) {
      setItems(JSON.parse(storedItems))
    }
    
    // Get or generate a new customer ID
    const storedCustomerId = localStorage.getItem('customerId')
    if (storedCustomerId) {
      setCustomerId(storedCustomerId)
    } else {
      const newCustomerId = 'CUST_' + Math.random().toString(36).substring(2, 10)
      setCustomerId(newCustomerId)
      localStorage.setItem('customerId', newCustomerId)
    }
  }, [])

  // Calculate total
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Add item to cart
  const addItem = (item) => {
    if (!isClient) return // Don't proceed if not client-side yet
    
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      let newItems

      if (existingItem) {
        newItems = prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      } else {
        newItems = [...prevItems, { ...item, quantity: 1 }]
      }

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(newItems))
      return newItems
    })
  }

  // Update quantity
  const updateQuantity = (id, quantity) => {
    if (!isClient) return // Don't proceed if not client-side yet
    
    setItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
      
      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(newItems))
      return newItems
    })
  }

  // Remove item from cart
  const removeItem = (id) => {
    if (!isClient) return // Don't proceed if not client-side yet
    
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== id)
      
      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(newItems))
      return newItems
    })
  }

  // Clear cart
  const clearCart = () => {
    if (!isClient) return // Don't proceed if not client-side yet
    
    setItems([])
    localStorage.setItem('cartItems', JSON.stringify([]))
  }

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        customerId,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        isClient
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}