import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ClerkProvider } from "@clerk/clerk-react";

import "./index.css";
import App from "./App.tsx";
import { ToasterProvider } from "./provider/toast-provider.tsx";

// Import your Publishable Key
const PUBLISHABLE_KEY = "pk_test_c21hc2hpbmctbXV0dC02MS5jbGVyay5hY2NvdW50cy5kZXYk";



if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
      <ToasterProvider />
    </ClerkProvider>
  </StrictMode>
);
