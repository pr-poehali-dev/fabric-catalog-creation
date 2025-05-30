import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import FabricDetail from "./pages/FabricDetail";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/Admin"; // Импортируем новую страницу админки

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="fabric/:id" element={<FabricDetail />} />
            <Route path="admin" element={<AdminPage />} />{" "}
            {/* Добавляем маршрут к админке */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
