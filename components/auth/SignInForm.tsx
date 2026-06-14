"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState("false");

  const onSignIn = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log({ email, password, isRemember });
  };

  return (
    <form
      onSubmit={onSignIn}
      className="flex flex-col w-full md:w-1/2 lg:w-1/4 p-5 bg-yellow-300 -translate-y-[4px] shadow-[10px_15px_0px_0px_#323232] border-2"
    >
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-2xl font-grotesk">Welcome Back!</h2>
        <p className="text-sm font-sans">Please sign in to your account</p>
      </div>
      <div className="flex flex-col mt-4 gap-3">
        <InputGroup>
          <InputGroupInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className={email ? "bg-white border-2 border-l-0 border-black" : ""}
          />
          <InputGroupAddon>
            <Mail strokeWidth={4} />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <InputGroupAddon>
            <Lock strokeWidth={4} />
          </InputGroupAddon>
        </InputGroup>
      </div>
      `{" "}
      <div className="flex gap-2 justify-between my-1 text-sm">
        <div className="flex gap-2 items-center">
          <Checkbox
            value={isRemember}
            onCheckedChange={(value) => setIsRemember(String(value))}
            id="terms-checkbox"
            name="terms-checkbox"
          />
          <span className="font-semibold">Remember me</span>
        </div>
        <Link href="" className="text-red-600 font-semibold">
          Forgot Password?
        </Link>
      </div>
      `
      <Button
        type="submit"
        variant="brutalism"
        size="lg"
        className="text-md font-bold capitalize bg-blue"
      >
        Sign In
      </Button>
      <div className="flex flex-col items-center mt-6 border-t gap-2 relative">
        <p className="font-grotesk font-bold absolute -top-3 z-10 bg-yellow-300">
          Or login with
        </p>
        <Button variant="brutalism" size="sm" className="py-3 px-2 mt-5">
          <Image
            src="https://thesvg.org/icons/google/default.svg"
            alt="Google"
            width={15}
            height={15}
          />
        </Button>
      </div>
      <div className="flex bg-white -m-5 mt-5 p-2 text-sm justify-center font-semibold border-t-2">
        <p>
          Doesn't have an account?{" "}
          <Link href="/signup" className="text-red-600">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};
