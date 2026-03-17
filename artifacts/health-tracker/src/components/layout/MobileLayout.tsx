import { ReactNode } from 'react';
import { useLocation, Link } from 'wouter';
import { LayoutDashboard, MessageCircle, Apple, ShoppingBasket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Дашборд' },
    { path: '/chat', icon: MessageCircle, label: 'Чат' },
    { path: '/products', icon: Apple, label: 'Продукты' },
    { path: '/shopping-list', icon: ShoppingBasket, label: 'Покупки' },
  ];

  return (
    <div className="flex flex-col h-[100dvh] w-full max-w-md mx-auto bg-background overflow-hidden relative shadow-2xl sm:border sm:border-border sm:rounded-[2rem] sm:my-4">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-background/80 backdrop-blur-xl border-t border-border/50 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-3xl z-50">
        <div className="flex justify-around items-center h-20 px-6">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.path} href={item.path} className="relative flex flex-col items-center justify-center w-16 h-full group">
                <div className={`relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${isActive ? 'bg-primary/10 text-primary scale-110' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}>
                  <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                  {isActive && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </div>
                <span className={`text-[10px] mt-1 font-medium transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
