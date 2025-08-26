import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import '../globals.css';
import App from './App.tsx'; 
import { AppProviders } from "@weather-app/core/src/providers/QueryProvider";
  
 ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
    <AppProviders>
     <BrowserRouter>
          <App />
     </BrowserRouter>
    </AppProviders>
   </React.StrictMode>
 );