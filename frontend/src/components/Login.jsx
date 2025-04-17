import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md bg-[#1A1A1D] border border-[#FFD700] rounded-lg shadow-lg p-8">
        <h2 className="text-[#FFD700] text-3xl font-extrabold text-center mb-6 uppercase">
          Welcome Back!
        </h2>
        <p className="text-[#FF3131] text-center mb-4 font-medium">
          Sign in to continue your journey.
        </p>
        <SignIn
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