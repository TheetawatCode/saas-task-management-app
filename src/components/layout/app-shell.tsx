import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[256px_1fr]">
        <AppSidebar />

        <div className="flex min-h-screen flex-col">
          <AppHeader />
          <main className="flex-1 bg-background">{children}</main>
        </div>
      </div>
    </div>
  );
}