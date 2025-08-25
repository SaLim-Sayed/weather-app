import React from "react";
import './index.css'
import App from './App.tsx'
import '../globals.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
 import "./index.css";
 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 
 const queryClient = new QueryClient();
 
 ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
     <BrowserRouter>
          <App />
     </BrowserRouter>
   </React.StrictMode>
 );