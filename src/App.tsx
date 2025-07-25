import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import WasteSegregationGame from "./components/WasteSegregationGame";
import EducationHub from "./pages/EducationHub";
import PickupScheduling from "./pages/PickupScheduling";
import ReportIssue from "./pages/ReportIssue";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import "./styles/global.css";
import Login from './pages/Login';
import Signup from './pages/Signup';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/segregation-game" element={<WasteSegregationGame />} />
        <Route path="/education" element={<EducationHub />} />
        <Route path="/pickup-scheduling" element={<PickupScheduling />} />
        <Route path="/report-issue" element={<ReportIssue />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
