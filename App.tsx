import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import SubmitExpensePage from "@/pages/SubmitExpensePage";
import ExpenseListPage from "@/pages/ExpenseListPage";
import ExpenseDetailPage from "@/pages/ExpenseDetailPage";
import ApprovalsPage from "@/pages/ApprovalsPage";
import WorkflowBuilderPage from "@/pages/WorkflowBuilderPage";
import UserManagementPage from "@/pages/UserManagementPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import AuditLogPage from "@/pages/AuditLogPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <DashboardLayout />;
};

const AuthRoute = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <LoginPage />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<AuthRoute />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/submit" element={<SubmitExpensePage />} />
                <Route path="/expenses" element={<ExpenseListPage />} />
                <Route path="/expenses/:id" element={<ExpenseDetailPage />} />
                <Route path="/approvals" element={<ApprovalsPage />} />
                <Route path="/workflows" element={<WorkflowBuilderPage />} />
                <Route path="/users" element={<UserManagementPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/audit" element={<AuditLogPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
