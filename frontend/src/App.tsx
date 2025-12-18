import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Q1 from "./pages/q1";
import NotFound from "./pages/NotFound";
import Q2 from "./pages/q2";
import Q3 from "./pages/q3";
import Q4 from "./pages/q4";
import Outcome from "./pages/outcome";
import Summary from "./pages/Summary";
import Booking from "./pages/Inf";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/q1" element={<Q1 />} />
          <Route path="/q2" element={<Q2 />} />
          <Route path="/q3" element={<Q3 />} /> 
          <Route path="/q4" element={<Q4 />} />
          <Route path="/outcome" element={<Outcome />} />
          <Route path="/summary" element={<Summary/>} /> 
          <Route path="/booking" element={<Booking/>} /> 
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
