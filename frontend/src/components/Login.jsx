import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-sm bg-[#1A1A1D] border border-[#FFD700] rounded-lg p-6">
        <h2 className="text-[#FFD700] text-2xl font-bold text-center mb-4">
          Welcome Back!
        </h2>
        <SignIn
          appearance={{
            elements: {
              card: "bg-[#1A1A1D] border-none shadow-none",
              headerTitle: "text-[#FFD700] font-bold text-lg",
              headerSubtitle: "text-[#FF3131] text-sm",
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