"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";
import { errorStyle, successStyle } from "@/lib/toaster-styles";
import { EventsAPI } from "@/lib/services/api/events-api";

export const SignUpForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignUp = async (
    e: React.SubmitEvent<HTMLFormElement>
  ): Promise<string | number | undefined> => {
    e.preventDefault();
    const user = { email, password };

    if (password !== confirmPassword) {
      return toast.error("Password doesn't match", { style: errorStyle });
    }

    try {
      setLoading(true);
      const response = await EventsAPI.signup(user);
      if (response.success) {
        toast.success(response.message, { style: successStyle });
        // setTimeout(() => {
        //   router.push("/signin");
        // }, 500);
      } else {
        return toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      return toast.error("something error", { style: errorStyle });
    } finally {
      setLoading(false);
    }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
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
            autoComplete="new-password"
            minLength={6}
            placeholder="Password"
            required
          />
          <InputGroupAddon>
            <Lock strokeWidth={4} />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            autoComplete="new-password"
            minLength={6}
            placeholder="Confirm Password"
            required
            className={
              confirmPassword ? "bg-white border-2 border-l-0 border-black" : ""
            }
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
        {loading ? <Spinner /> : ""}
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
