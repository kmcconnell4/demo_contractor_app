import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { MobileApp } from "./components/MobileApp";
import { LanguageProvider } from "@/hooks/useLanguage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MobileApp />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

export default App;
