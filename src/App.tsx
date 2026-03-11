import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import HealthProfile from "./pages/dashboard/HealthProfile";
import MedicalRecords from "./pages/dashboard/MedicalRecords";
import UploadReports from "./pages/dashboard/UploadReports";
import EmergencyQR from "./pages/dashboard/EmergencyQR";
import MedicineReminders from "./pages/dashboard/MedicineReminders";
import FamilyProfiles from "./pages/dashboard/FamilyProfiles";
import ShareRecords from "./pages/dashboard/ShareRecords";
import SettingsPage from "./pages/dashboard/SettingsPage";
import DoctorNetwork from "./pages/dashboard/DoctorNetwork";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<HealthProfile />} />
            <Route path="records" element={<MedicalRecords />} />
            <Route path="upload" element={<UploadReports />} />
            <Route path="qr" element={<EmergencyQR />} />
            <Route path="reminders" element={<MedicineReminders />} />
            <Route path="family" element={<FamilyProfiles />} />
            <Route path="share" element={<ShareRecords />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
