import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { NoteProvider } from "../_context/noteContext";
import ProtectedRoute from "../protectedRoute";
import { AuthProvider } from "../_context/authContext";

export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <div className="flex h-screen">
        <ProtectedRoute>
          <NoteProvider>
            <Sidebar />
            <section className="flex gap-4 flex-col w-full px-5 pl-72">
              <Header />
              <main className="">{children}</main>
            </section>
          </NoteProvider>
        </ProtectedRoute>
      </div>
    </AuthProvider>
  );
}
