
import './App.css'
 
import { Routes, Route } from "react-router-dom";
 import DetailPage from "./pages/DetailPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/details/:city" element={<DetailPage />} />
    </Routes>
  );
}
