import { Routes, Route, Navigate } from "react-router-dom";
import { useConvexAuth } from "convex/react";
import Landing from "@/pages/Landing";
import AuthPage from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Workspace from "@/pages/Workspace";
import RepoDoctor from "@/pages/RepoDoctor";
import Architecture from "@/pages/Architecture";
import PRReview from "@/pages/PRReview";
import DocsGenerator from "@/pages/DocsGenerator";
import Planning from "@/pages/Planning";
import Deployments from "@/pages/Deployments";
import Marketplace from "@/pages/Marketplace";
import LeadForge from "@/pages/LeadForge";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CommandPalette from "@/components/layout/CommandPalette";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading ForgeAI...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    const returnTo = window.location.pathname + window.location.search;
    return <Navigate to={`/auth?returnTo=${encodeURIComponent(returnTo)}`} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <>
      <CommandPalette />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/workspace/:projectId" element={<Workspace />} />
          <Route path="/repo-doctor" element={<RepoDoctor />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/pr-review" element={<PRReview />} />
          <Route path="/docs" element={<DocsGenerator />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/deployments" element={<Deployments />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/lead-forge" element={<LeadForge />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
