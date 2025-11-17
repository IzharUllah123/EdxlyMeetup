import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Practice from "./pages/Practice";
import LiveClasses from "./pages/LiveClasses";
import Resources from "./pages/Resources";
import Curriculum from "./pages/Curriculum";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import Perk from "./components/SubjectDetails/Prek";
import LearningPage from "./pages/LearningPage"; // <-- 1. IMPORT NEW PAGE

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="edxly-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ... (all your other routes) ... */}
            <Route path="/curriculum" element={<Curriculum />} />
            
            {/* Your main curriculum page */}
            <Route
              path="/grade/:gradeId/subject/:subjectId"
              element={<Perk />}
            />
            
            {/* --- 2. ADD THIS NEW ROUTE --- */}
            <Route
              path="/learn/:gradeId/:subjectId/:skillId"
              element={<LearningPage />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;