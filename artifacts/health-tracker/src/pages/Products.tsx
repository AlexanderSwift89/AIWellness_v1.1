import { useState } from 'react';
import { MOCK_DEFICITS, MOCK_PRODUCTS, MOCK_RECIPES } from '@/services/mockData';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Clock, Plus, Filter, Info, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Products() {
  const { activeDeficitId, setActiveDeficitId, addToCart, cart } = useApp();
  const [activeTab, setActiveTab] = useState<'products' | 'recipes'>('products');
  const { toast } = useToast();

  const currentDeficit = MOCK_DEFICITS.find(d => d.id === activeDeficitId) || MOCK_DEFICITS[0];
  const products = MOCK_PRODUCTS[currentDeficit.id] || [];
  const recipes = MOCK_RECIPES[currentDeficit.id] || [];

  const handleAddProduct = (product: any) => {
    addToCart(product);
    toast({
      title: "Добавлено в покупки",
      description: `${product.name} добавлено в ваш список покупок.`,
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col min-h-full bg-background pb-12">
      {/* Header & Deficit Selector */}
      <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-xl border-b border-border/50 px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground mb-4">Восполнение</h1>
        
        {/* Deficit selector pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {MOCK_DEFICITS.map(deficit => (
            <button
              key={deficit.id}
              onClick={() => setActiveDeficitId(deficit.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeDeficitId === deficit.id 
                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' 
                : 'bg-card border border-border text-foreground hover:bg-accent'
              }`}
            >
              {deficit.name}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="bg-accent/50 border border-accent rounded-2xl p-4 flex items-start gap-3 mb-6">
          <Info className="w-6 h-6 text-primary shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-foreground">
            Для восполнения дефицита <strong className="text-primary">{currentDeficit.name}</strong> ({currentDeficit.got}/{currentDeficit.needs}{currentDeficit.unit}) добавьте в рацион эти продукты.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex bg-muted/50 p-1 rounded-2xl mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
              activeTab === 'products' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Продукты
          </button>
          <button
            onClick={() => setActiveTab('recipes')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
              activeTab === 'recipes' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Рецепты
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-foreground">
            {activeTab === 'products' ? 'Список продуктов' : 'Подходящие блюда'}
          </h2>
          <button className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm font-medium bg-card px-3 py-1.5 rounded-lg border border-border">
            <Filter className="w-4 h-4" /> Фильтр
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'products' ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {products.map((product, idx) => {
              const inCart = cart.some(item => item.id === product.id);
              
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={product.id} 
                  className="bg-card border border-border/60 rounded-2xl overflow-hidden flex flex-col group hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <div className="h-32 bg-muted relative overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-foreground shadow-sm">
                      {product.nutrientAmount} {product.nutrientUnit}
                    </div>
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <h3 className="font-bold text-sm text-foreground line-clamp-2 leading-tight mb-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{product.category}</p>
                    
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span className="font-bold text-primary text-sm">₽{product.price}<span className="text-[10px] text-muted-foreground font-normal">/{product.priceUnit}</span></span>
                      
                      <button 
                        onClick={() => handleAddProduct(product)}
                        disabled={inCart}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          inCart 
                          ? 'bg-accent text-primary' 
                          : 'bg-primary text-primary-foreground hover:scale-110 active:scale-95 shadow-sm shadow-primary/30'
                        }`}
                      >
                        {inCart ? <Check className="w-4 h-4" /> : <Plus className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {recipes.map((recipe, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={recipe.id} 
                className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row hover:shadow-md transition-shadow"
              >
                <div className="h-40 sm:h-auto sm:w-1/3 bg-muted relative shrink-0">
                  <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-orange-500" /> {recipe.time} мин
                  </div>
                </div>
                <div className="p-4 sm:w-2/3 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-foreground leading-tight">{recipe.name}</h3>
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-bold whitespace-nowrap ml-2">
                      {recipe.nutrientAmount} {currentDeficit.unit}
                    </div>
                  </div>
                  
                  <div className="mt-2 mb-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Ингредиенты</p>
                    <ul className="grid grid-cols-2 gap-y-1 gap-x-2">
                      {recipe.ingredients.map((ing, i) => (
                        <li key={i} className="text-sm text-foreground flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-primary shrink-0"></span>
                          <span className="truncate">{ing.name} <span className="text-muted-foreground text-xs">{ing.amount}</span></span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => {
                      toast({ title: "В разработке", description: "Функция добавления всех ингредиентов рецепта скоро появится!" });
                    }}
                    className="mt-auto w-full py-2.5 bg-accent/50 hover:bg-accent text-primary font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> В список покупок
                  </button>
                </div>
              </motion.div>
            ))}
            
            {recipes.length === 0 && (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Apple className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-bold text-foreground">Нет рецептов</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-[250px]">Для данного дефицита рецепты пока не добавлены.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
