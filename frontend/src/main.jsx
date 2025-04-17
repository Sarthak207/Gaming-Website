import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

const clerk_key= import.meta.env.VITE_CLERK_KEY;
console.log(clerk_key);

if(!clerk_key){
  throw new Error("Key was not found");
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerk_key}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
