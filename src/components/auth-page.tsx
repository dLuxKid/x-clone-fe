"use client";

import { useState } from "react";
import Login from "./forms/login";
import Signup from "./forms/signup";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [formType, setFormType] = useState<"login" | "signup">("login");

  // const { user } = useAuthContext();

  // const router = useRouter();

  // if (!user) router.push("/");

  return (
    <div className="fixed z-10 top-0 left-0 bottom-0 right-0 bg-white flex items-center justify-center p-4">
      <div className="bg-black p-6 w-full max-w-lg shadow-xl rounded-2xl">
        {formType === "login" && <Login setFormType={setFormType} />}
        {formType === "signup" && <Signup setFormType={setFormType} />}
      </div>
    </div>
  );
}
