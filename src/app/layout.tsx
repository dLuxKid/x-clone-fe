import AuthProvider from "@/context/AuthContext";
import type { Metadata } from "next";
import "../style/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: {
    default: "Home / X",
    template: "%s / X",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="max-w-screen-[1390px] min-h-screen bg-black">
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className={"h-fit p-4 z-50"}
        />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
