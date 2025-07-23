import React from "react";
import { Sidebar } from "./ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center px-6 shadow-sm">
          <h1 className="text-xl font-bold">Portal de Autogestión</h1>
        </header>
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">{children}</main>
      </div>
    </div>
  );
} 