import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "./config/firebase"; // Ensure this path is correct
import {
  getFirestore,
  addDoc,
  collection,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Adjust import paths for Dialog components
import { Eye, EyeOff, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify"; // Import toast and container
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState(location.state?.password || "");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordSubmitted, setForgotPasswordSubmitted] = useState(false);
  const fetchUserDetails = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        return userDoc.data(); // Store fetched data in state
      } else {
        toast.error("No such document!");
        return null;
      }
    } catch (error) {
      toast.error("Error fetching user details:", error);
    }
  };
  const handleLogin = async () => {
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user.emailVerified) {
        toast.success("Login Successful");
        const userData = await fetchUserDetails(user.uid);
        navigate("/signin", { state: { user: userData } });

        setEmail(""); // Clear input after successful login
        setPassword("");
      } else {
        // If email is not verified
        setError("Please verify your email before logging in.");
        toast.error("Please verify your email before logging in.");
        await sendEmailVerification(user); // Resend verification email if needed
        await signOut(auth); // Log out the user if email is not verified
      }

      // Handle post-login actions here, e.g., redirect to dashboard
    } catch (err) {
      setError(err.message);
      toast.error("Login error:", err);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin();
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserDetails(user.uid); // Fetch user details if already logged in
      }
    });
    return () => unsubscribe();
  }, []);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, forgotPasswordEmail);
      setForgotPasswordSubmitted(true);
      alert("Password reset link has been sent to your email.");
    } catch (error) {
      setError("Error sending password reset link. Please try again.");
    }
  };
  const resetForgotPassword = () => {
    setForgotPasswordEmail("");
    setForgotPasswordSubmitted(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <ToastContainer />
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 bg-gray-900 border-gray-700 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="bg-gray-900 border-gray-700 text-white pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200"
            >
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="text-sm text-gray-400 hover:text-white"
            onClick={() => {
              setError("");
              setEmail("");
              setPassword("");

              navigate("/register");
            }}
          >
            Need an account? Sign Up
          </button>

          <button
            type="button"
            className="text-sm text-gray-400 hover:text-white"
            onClick={() => {
              setShowForgotPassword(true);
              setError("");
              setEmail("");
            }}
          >
            Forgot password?
          </button>
        </div>

        {showForgotPassword && (
          <Dialog
            open={showForgotPassword}
            onOpenChange={setShowForgotPassword}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogDescription>
                  Enter your email address to receive a password reset link.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleForgotPassword}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                />
                <Button type="submit" className="mt-4">
                  Send Reset Link
                </Button>
              </form>
              {forgotPasswordSubmitted && (
                <p className="text-green-500 text-sm">
                  Check your email for the reset link.
                </p>
              )}
              <Button onClick={resetForgotPassword} className="mt-2">
                <X className="mr-2" /> Close
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Login;
