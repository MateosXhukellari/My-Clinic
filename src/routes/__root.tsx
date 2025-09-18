import { queryClient } from "../services/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-[var(--brand-bg)] text-[var(--brand-text)]">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <Toaster position="top-right" richColors />
      </div>
    </QueryClientProvider>
  ),
});
