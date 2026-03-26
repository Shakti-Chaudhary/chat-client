import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./app/useAuthStore";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import { useTheme } from "./app/theme.context";
import PageNotFound from "./pages/PageNotFound";
import { Loader } from "lucide-react";
import { useEffect } from "react";

function App() {
  const { theme } = useTheme();

  const { validUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !validUser) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen w-full transition-colors duration-500 ${
          theme === "dark" ? "bg-slate-950" : "bg-slate-50"
        }`}
      >
        <div className="relative flex flex-col items-center gap-4">
          {/* Subtle Outer Glow */}
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full s-24 animate-pulse" />

          {/* Main Loader Container */}
          <div className="relative p-6 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/5 shadow-2xl">
            <Loader className="size-12 animate-spin text-blue-600 dark:text-blue-400" />
          </div>

          {/* Loading Text */}
          <p className="text-sm font-medium tracking-widest uppercase animate-pulse text-slate-500 dark:text-slate-400">
            Authenticating
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme} -z-10 bg-gray-100 `}>
      <div className="theme-wrapper dark:bg-gray-800 overflow-hidden ">
        <div className="mx-auto max-w-screen-2xl">
          <div className=" w-full  top-0 z-40 px-1 sm:px-4 my-2 sm:my-4 ">
            <Navbar />
          </div>

          <div className="px-1 sm:px-4 ">
            <Routes>
              <Route
                path="/"
                element={validUser ? <HomePage /> : <Navigate to="/login" />}
              />
              <Route
                path="/signup"
                element={!validUser ? <SignUpPage /> : <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={!validUser ? <LogInPage /> : <Navigate to="/" />}
              />
              <Route
                path="/profile"
                element={validUser ? <ProfilePage /> : <Navigate to="/login" />}
              />
              <Route path="/*" element={<PageNotFound />}></Route>
            </Routes>
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
