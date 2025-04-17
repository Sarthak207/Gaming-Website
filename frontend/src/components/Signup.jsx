import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md bg-[#1A1A1D] border border-[#FFD700] rounded-lg shadow-lg p-8">
        <h2 className="text-[#FFD700] text-3xl font-extrabold text-center mb-6 uppercase">
          Create Your Account
        </h2>
        <p className="text-[#FF3131] text-center mb-4 font-medium">
          Join the GameVerse and start your journey!
        </p>
        <SignUp
          signUpUrl="/signup"
          appearance={{
            elements: {
              card: "bg-[#1A1A1D] border border-[#FFD700] shadow-md",
              headerTitle: "text-[#FFD700] font-bold text-xl",
              headerSubtitle: "text-[#FF3131] font-medium",
              formButtonPrimary: "bg-[#FF3131] hover:bg-red-700 text-white font-bold",
              formFieldInput: "bg-[#1A1A1D] border border-[#FFD700] text-white",
              formFieldLabel: "text-[#FFD700] font-medium",
            },
          }}
        />
      </div>
    </div>
  );
}