import AuthProvider from "@/context/AuthContext";
import type { Metadata } from "next";
import "../style/globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Home / X",
    template: "%s / X",
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="max-w-screen-[1390px] min-h-screen bg-black">
        <Toaster richColors className={"h-fit p-4 z-50"} />
        <AuthProvider>
          {modal}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
