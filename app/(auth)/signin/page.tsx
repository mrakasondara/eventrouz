import { Metadata } from "next";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignIn() {
  return (
    <div className="flex flex-col h-screen justify-center p-5 items-center bg-[url('/images/pattern.avif')] relative">
      <div className="flex gap-1 items-center mb-5 md:mb-0 md:absolute top-5 left-5">
        <img src="/images/icon.png" className="h-[40px] scale-200" alt="icon" />
        <h1 className="text-2xl font-bold self-start">Eventrouz</h1>
      </div>
      <SignInForm />
    </div>
  );
}
