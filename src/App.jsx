
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import VaccinationCentersPage from "./pages/VaccinationCentersPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="book-appointment" element={<BookAppointmentPage />} />
              <Route path="vaccination-centers" element={<VaccinationCentersPage />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
