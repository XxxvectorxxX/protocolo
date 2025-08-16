"use client";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { ToastContainer } from "@/components/ui/toast";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Suspense fallback={null}>
          {children}
          <ToastContainer />
          <Analytics />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}