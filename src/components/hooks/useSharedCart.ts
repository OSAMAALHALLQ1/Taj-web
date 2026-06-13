import { useState, useEffect } from 'react';
import type { MenuItem } from '@/data/menu';

/**
 * Interface representing an item in the shopping cart.
 */
export interface CartItem {
  title: string;
  price: string;
  qty: number;
  notes: string;
  category: string;
}

/**
 * Custom hook that provides a shared cart persisted in `localStorage`.
 * It is used by both the restaurant and cafe routes, ensuring a single
 * basket instance across the application.
 */
export function useSharedCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem('taj_shared_cart');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[];
        setCart(parsed);
      } catch (e) {
        console.error('Failed to parse shared cart from localStorage', e);
      }
    }
  }, []);

  // Sync cart changes back to localStorage
  useEffect(() => {
    localStorage.setItem('taj_shared_cart', JSON.stringify(cart));
  }, [cart]);

  /** Add an item to the cart (or increase qty if it already exists). */
  const addItem = (item: MenuItem, qty: number, notes: string) => {
    const cleanNotes = notes.trim();
    setCart(prev => {
      const existingIdx = prev.findIndex(
        c => c.title === item.title && (c.notes || '') === cleanNotes
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].qty += qty;
        return updated;
      }
      return [...prev, {
        title: item.title,
        price: item.price,
        qty,
        notes: cleanNotes,
        category: item.category,
      }];
    });
  };

  /** Change the quantity of an existing cart item. */
  const changeItemQty = (idx: number, change: number) => {
    setCart(prev => {
      const updated = [...prev];
      updated[idx].qty += change;
      if (updated[idx].qty <= 0) {
        updated.splice(idx, 1);
      }
      return updated;
    });
  };

  /** Remove an item from the cart by index. */
  const deleteItem = (idx: number) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  };

  return { cart, setCart, addItem, changeItemQty, deleteItem };
}
