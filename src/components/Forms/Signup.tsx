"use client";

import Loader from "../loader/loader";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import axiosInstance from "@/functions/client-axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface signupType {
  username: string;
  displayname: string;
  email: string;
  password: string;
}

interface Props {
  setFormType: React.Dispatch<React.SetStateAction<"signup" | "login">>;
}

export default function Signup({ setFormType }: Props) {
  const router = useRouter();

  const [formValues, setFormValues] = useState<signupType>({
    username: "",
    displayname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const { setUser } = useAuthContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formValues.email || !formValues.password || !formValues.username) {
      setLoading(false);
      return toast.error("Please fill in values");
    }

    try {
      const {
        data: {
          token,
          data: {
            user: { username, displayname, email, _id },
          },
        },
      } = await axiosInstance.post("/auth/signup", {
        email: formValues.email,
        password: formValues.password,
        displayname: formValues.displayname,
        username: formValues.username,
      });

      setCookie("jwt", token);

      setUser({
        _id,
        email,
        username,
        displayname,
      });

      router.push("/");
      toast.success("signup successful");

      //   toast("verify email address to login");
      //   setMessage("Head over to your email and verify account");
    } catch (error: any) {
      console.log(error.message);
      return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {message ? (
        <h3 className="text-bold text-lg text-pry-blue mb-2">{message}</h3>
      ) : (
        <h3 className="text-lg font-semibold mb-2">
          Please sign up to continue
        </h3>
      )}
      <form
        onSubmit={handleSignup}
        className="flex flex-col items-stretch justify-center gap-4 md:gap-6"
      >
        <div>
          <p className="text-sm text-gray-200 mb-1">Username</p>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            className="text-gray-700 w-full px-4 py-2 rounded-lg border-none outline-none"
          />
        </div>
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
            onClick={() => setFormType("login")}
          >
            Login to your account
          </p>
          <Button
            className="bg-blue-pry w-fit min-w-[100px] text-white hover:bg-blue-pry px-6 py-2 disabled:cursor-not-allowed"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? <Loader /> : "Signup"}
          </Button>
        </div>
      </form>
    </>
  );
}
