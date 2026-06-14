import { Metadata } from "next";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUp() {
  return (
    <div className="flex flex-col h-screen justify-center p-5 items-center bg-[url('/images/pattern.avif')] relative">
      <h1 className="text-4xl font-bold self-start mb-5 md:mb-0 md:absolute top-5 left-5">
        Eventrouz
      </h1>
      <SignUpForm />
    </div>
  );
}
