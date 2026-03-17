import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { CartItem, Product, MOCK_DEFICITS, Deficit } from '@/services/mockData';

type AppContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (cartId: string) => void;
  toggleCartItem: (cartId: string) => void;
  clearCart: () => void;
  activeDeficitId: string;
  setActiveDeficitId: (id: string) => void;
  getActiveDeficit: () => Deficit | undefined;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeDeficitId, setActiveDeficitId] = useState<string>('iron');

  const addToCart = useCallback((product: Product) => {
    setCart(prev => [
      ...prev,
      { ...product, cartId: `${product.id}-${Date.now()}`, checked: false }
    ]);
  }, []);

  const removeFromCart = useCallback((cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  }, []);

  const toggleCartItem = useCallback((cartId: string) => {
    setCart(prev => prev.map(item => 
      item.cartId === cartId ? { ...item, checked: !item.checked } : item
    ));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getActiveDeficit = useCallback(() => {
    return MOCK_DEFICITS.find(d => d.id === activeDeficitId);
  }, [activeDeficitId]);

  return (
    <AppContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      toggleCartItem,
      clearCart,
      activeDeficitId,
      setActiveDeficitId,
      getActiveDeficit
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
