"use client"

import { Toaster } from "@/components/ui/sonner";
// import { Provider } from "react-redux";
import "./globals.css";
import { AuthProvider } from "./_context/authContext";
import Header from "./Header";
// import { store } from "@/store/store";





export default function RootLayout({ children }) {
  return (
    <html lang="en">
  
      <body className="bg-gray-100">
<AuthProvider>
        {/* <Provider store={store}> */}
        <main>{children}</main>
        <Toaster richColors position="top-center" />
        {/* </Provider> */}
      </AuthProvider>
      </body>
    </html>
  );
}
