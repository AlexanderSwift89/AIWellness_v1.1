import { useApp } from '@/context/AppContext';
import { Trash2, Share, CheckCircle2, Circle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShoppingList() {
  const { cart, toggleCartItem, removeFromCart, clearCart } = useApp();
  const { toast } = useToast();

  // Group by category
  const groupedCart = cart.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof cart>);

  const categories = Object.keys(groupedCart).sort();
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const checkedCount = cart.filter(i => i.checked).length;
  const progress = cart.length > 0 ? (checkedCount / cart.length) * 100 : 0;

  const handleShare = () => {
    toast({
      title: "Список скопирован",
      description: "Список покупок скопирован в буфер обмена.",
    });
  };

  return (
    <div className="flex flex-col min-h-full bg-background pb-12">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/90 backdrop-blur-xl border-b border-border/50 px-6 pt-8 pb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-foreground">Покупки</h1>
          <div className="flex gap-2">
            <button 
              onClick={handleShare}
              className="w-10 h-10 flex items-center justify-center bg-card border border-border rounded-full text-foreground hover:bg-accent transition-colors"
            >
              <Share className="w-4 h-4" />
            </button>
            {cart.length > 0 && (
              <button 
                onClick={clearCart}
                className="w-10 h-10 flex items-center justify-center bg-destructive/10 text-destructive border border-destructive/20 rounded-full hover:bg-destructive/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Progress and Total */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-5 shadow-lg shadow-primary/20 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="flex justify-between items-end mb-4 relative z-10">
            <div>
              <p className="text-primary-foreground/80 text-sm font-medium mb-1">Итого к оплате</p>
              <h2 className="text-3xl font-display font-bold">₽ {totalPrice.toLocaleString('ru-RU')}</h2>
            </div>
            <div className="text-right">
              <p className="text-primary-foreground/80 text-sm font-medium mb-1">Собрано</p>
              <p className="text-xl font-bold">{checkedCount} / {cart.length}</p>
            </div>
          </div>
          
          <div className="h-2 bg-black/20 rounded-full overflow-hidden relative z-10">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* List Content */}
      <div className="px-4 py-6">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <img 
              src={`${import.meta.env.BASE_URL}images/empty-cart.png`} 
              alt="Empty Cart" 
              className="w-48 h-48 object-contain mb-6 drop-shadow-xl"
            />
            <h3 className="text-xl font-bold text-foreground mb-2">Корзина пуста</h3>
            <p className="text-muted-foreground text-sm max-w-[250px]">
              Перейдите в раздел "Продукты", чтобы добавить ингредиенты для восполнения дефицитов.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {categories.map((category) => (
              <div key={category} className="flex flex-col gap-3">
                <h3 className="font-bold text-foreground flex items-center gap-2 ml-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  {category}
                </h3>
                
                <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm">
                  <AnimatePresence>
                    {groupedCart[category].map((item, idx) => (
                      <motion.div 
                        key={item.cartId}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`flex items-center gap-4 p-4 border-b border-border/50 last:border-none transition-colors ${
                          item.checked ? 'bg-muted/30' : 'bg-transparent'
                        }`}
                      >
                        <button 
                          onClick={() => toggleCartItem(item.cartId)}
                          className={`shrink-0 transition-colors ${item.checked ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                          {item.checked ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                        </button>
                        
                        <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden shrink-0">
                          <img src={item.imageUrl} alt={item.name} className={`w-full h-full object-cover transition-all ${item.checked ? 'grayscale opacity-60' : ''}`} />
                        </div>
                        
                        <div className={`flex-1 transition-all ${item.checked ? 'opacity-60' : ''}`}>
                          <h4 className={`font-bold text-[15px] leading-tight mb-1 ${item.checked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                            {item.name}
                          </h4>
                          <p className="text-xs font-semibold text-primary">₽{item.price} <span className="text-muted-foreground font-normal">/{item.priceUnit}</span></p>
                        </div>

                        <button 
                          onClick={() => removeFromCart(item.cartId)}
                          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
