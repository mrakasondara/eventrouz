"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, User } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form
      onSubmit={onSignUp}
      className="flex flex-col w-full md:w-1/2 lg:w-1/4 p-5 bg-magenta -translate-y-[4px] shadow-[10px_15px_0px_0px_#323232] border-2"
    >
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-2xl font-grotesk">Create an account!</h2>
        <p className="text-sm font-sans">Join us and explore the events</p>
      </div>

      <div className="flex flex-col my-4 gap-3">
        <InputGroup>
          <InputGroupInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className={
              username ? "bg-white border-2 border-l-0 border-black" : ""
            }
          />
          <InputGroupAddon>
            <User strokeWidth={4} />
          </InputGroupAddon>
        </InputGroup>
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

      <Button
        type="submit"
        variant="brutalism"
        size="lg"
        className="text-md font-bold capitalize bg-lime"
      >
        Sign Up
      </Button>

      <div className="flex bg-white -m-5 mt-5 p-2 text-sm justify-center font-semibold border-t-2">
        <p>
          Already have an account?{" "}
          <Link href="/signin" className="text-blue">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};
