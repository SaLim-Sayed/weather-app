import React from "react";
import './index.css'
import App from './App.tsx'
import '../globals.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
 import "./index.css";
 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 
 import { AppProviders } from "@weather-app/core/src/providers/QueryProvider";
 const queryClient = new QueryClient();
 
 ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
    <AppProviders>
     <BrowserRouter>
          <App />
     </BrowserRouter>
    </AppProviders>
   </React.StrictMode>
 );