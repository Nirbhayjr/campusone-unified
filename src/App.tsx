import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import StudyPlanner from "./pages/StudyPlanner";
import Attendance from "./pages/Attendance";
import Complaints from "./pages/Complaints";
import Safety from "./pages/Safety";
import Career from "./pages/Career";
import LostFound from "./pages/LostFound";
import Wellness from "./pages/Wellness";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/study-planner" element={<StudyPlanner />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/career" element={<Career />} />
            <Route path="/lost-found" element={<LostFound />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
