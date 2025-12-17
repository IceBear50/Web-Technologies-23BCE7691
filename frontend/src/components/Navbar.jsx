import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link to="/" className="text-xl font-semibold tracking-tight">
          <span className="text-slate-900">Nuevo</span>
          <span className="text-orange-500">RFP</span>
        </Link>

        <div className="flex items-center gap-8 text-sm">
          <Link
            to="/how-it-works"
            className="text-slate-600 hover:text-blue-600 transition"
          >
            How it works
          </Link>

          <SignedOut>
            <Link
              to="/login"
              className="text-slate-600 hover:text-blue-600 transition"
            >
              Sign in
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              Get started
            </Link>
          </SignedOut>

          <SignedIn>
            <Link
              to="/dashboard"
              className="text-slate-600 hover:text-blue-600 transition"
            >
              Dashboard
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
