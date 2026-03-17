import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { AppProvider } from "@/context/AppContext";
import { MobileLayout } from "@/components/layout/MobileLayout";

import Dashboard from "@/pages/Dashboard";
import Chat from "@/pages/Chat";
import Products from "@/pages/Products";
import ShoppingList from "@/pages/ShoppingList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <MobileLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/chat" component={Chat} />
        <Route path="/products" component={Products} />
        <Route path="/shopping-list" component={ShoppingList} />
        <Route component={NotFound} />
      </Switch>
    </MobileLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <div className="bg-zinc-100 min-h-[100dvh] flex items-center justify-center">
            {/* Desktop wrapper constraint */}
            <div className="w-full sm:w-[414px] sm:h-[896px] bg-background sm:shadow-2xl sm:rounded-[2rem] sm:overflow-hidden relative">
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
              <Toaster />
            </div>
          </div>
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
