import React from 'react';
import { SignedIn, SignedOut, SignIn, SignUp, RedirectToSignIn } from "@clerk/clerk-react";
import { Routes, Route } from "react-router-dom";
import HowItWorks from './pages/HowItWorks.jsx';
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx'; 
import Navbar from './components/Navbar.jsx';
import Results from './pages/Results.jsx'; 

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        
        <Route path="/login" element={
          <div className="flex justify-center items-center min-h-screen bg-slate-950 pt-20">
             <SignIn routing="path" path="/login" />
          </div>
        } />

        <Route path="/signup" element={
          <div className="flex justify-center items-center min-h-screen bg-slate-950 pt-32">
             <SignUp routing="path" path="/signup" />
          </div>
        } />

        <Route path="/dashboard" element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />

        <Route path="/results" element={
          <>
            <SignedIn>
              <Results />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />

      </Routes>
    </>
  );
}