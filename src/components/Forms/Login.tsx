"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import Loader from "../loader/loader";
import { toast } from "sonner";
import { useAuthContext } from "@/context/AuthContext";
import axiosInstance from "@/functions/client-axios";
import { setCookie } from "cookies-next";

interface loginType {
  email: string;
  password: string;
}

interface Props {
  setFormType: React.Dispatch<React.SetStateAction<"signup" | "login">>;
}

export default function Login({ setFormType }: Props) {
  const router = useRouter();

  const [formValues, setFormValues] = useState<loginType>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { setUser } = useAuthContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValues.email || !formValues.password)
      return toast.error("Please fill in values");

    setLoading(true);

    try {
      const {
        data: {
          token,
          data: {
            user: { username, displayname, email, _id },
          },
        },
      } = await axiosInstance.post("/auth/login", {
        email: formValues.email,
        password: formValues.password,
      });

      setCookie("jwt", token);

      setUser({
        _id,
        email,
        username,
        displayname,
      });

      router.push("/");
      toast.success("Login successful");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="text-lg font-semibold mb-2">Please login to continue</h3>
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-stretch justify-center gap-4 md:gap-6"
      >
        <div>
          <p className="text-sm text-gray-200 mb-1">Email</p>
          <input
            type="text"
            placeholder="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="text-gray-700 w-full px-4 py-2 rounded-lg border-none outline-none"
          />
        </div>
        <div>
          <p className="text-sm text-gray-200 mb-1">Password</p>
          <input
            type="text"
            placeholder="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            className="text-gray-700 w-full px-4 py-2 rounded-lg border-none outline-none"
          />
        </div>
        <div className="flex justify-between gap-4 w-full items-center">
          <p
            className="text-sm text-gray-500 cursor-pointer font-semibold hover:underline"
            onClick={() => setFormType("signup")}
          >
            Create account
          </p>
          <Button
            className="bg-blue-pry min-w-[100px] w-fit text-white hover:bg-blue-pry px-6 py-2 disabled:cursor-not-allowed"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <Loader /> : "Login"}
          </Button>
        </div>
      </form>
    </>
  );
}
