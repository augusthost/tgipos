import { lazy, Suspense, useMemo } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import LoadingSpinner from "./components/ui/loader";

// Lazy load pages
const POS = lazy(() => import("@/pages/POS"));
const FoodMenus = lazy(() => import("@/pages/FoodMenus"));
const Categories = lazy(() => import("@/pages/Categories"));
const Tables = lazy(() => import("@/pages/Tables"));
const Orders = lazy(() => import("@/pages/Orders"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Kitchen = lazy(() => import("@/pages/Kitchen"));
const Login = lazy(() => import("@/pages/Login"));

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useMemo(() => !!localStorage.getItem("user"), []);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Tables />} />
                <Route path="tables/:tableId" element={<POS />} />
                <Route path="menus" element={<FoodMenus />} />
                <Route path="categories" element={<Categories />} />
                <Route path="kitchen" element={<Kitchen />} />
                <Route path="orders" element={<Orders />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
