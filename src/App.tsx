
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import POS from "@/pages/POS";
import FoodMenus from "@/pages/FoodMenus";
import Categories from "@/pages/Categories";
import Tables from "@/pages/Tables";
import Orders from "@/pages/Orders";
import NotFound from "./pages/NotFound";
import Kitchen from "./pages/Kitchen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Tables />} />
              <Route path="tables/:tableId" element={<POS />} />
              <Route path="food-menus" element={<FoodMenus />} />
              <Route path="categories" element={<Categories />} />
              <Route path="kitchen" element={<Kitchen />} />
              <Route path="orders" element={<Orders />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
