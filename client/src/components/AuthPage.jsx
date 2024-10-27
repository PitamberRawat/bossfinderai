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
  createUserWithEmailAndPassword,
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
import Login from "./Login";
import Register from "./Register";

export default function AuthPage({ isLoginn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(isLoginn);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordSubmitted, setForgotPasswordSubmitted] = useState(false);

  // Function to handle registration
  const handleRegister = async () => {
    setError("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      toast.info("Verification email sent. Please check your inbox.");

      // Add the newly registered user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        credits: 0, // Default credits value
        plan: "free", // Default plan value
      });
      await signOut(auth);
      toast.success("Signup Successsfull ");
      // const userData = await fetchUserDetails(user.uid);
      // Await the user data

      // Navigate to UserDetails component and pass user data
      navigate("/login");
      setEmail(""); // Clear input after successful login
      setPassword("");
      setConfirmPassword("");
      setName("");
      // Handle post-registration actions here, e.g., save first name, redirect to dashboard
    } catch (err) {
      setError(err.message);
      toast.error("Registration error:", err);
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
  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
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
    <div></div>
    //   <Login />
    //   <Register />
    // </div>
  );
}

// OLD CODEEEEE

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { auth, db } from "./config/firebase";
// import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   sendPasswordResetEmail,
//   signOut,
// } from "firebase/auth";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog"; // Adjust import paths for Dialog components
// import { Eye, EyeOff, ArrowRight, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// // export const AuthContext = createContext();

// export default function AuthPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(location.state?.isLogin || false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [credits, setCredits] = useState(0);
//   const [plan, setPlan] = useState("normal");
//   const [userData, setUserData] = useState([]);
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
//   const [forgotPasswordSubmitted, setForgotPasswordSubmitted] = useState(false);

//   const db = getFirestore();
//   const collectionRef = collection(db, "users");

//   const saveDataToFirebase = async () => {
//     try {
//       const docRef = await addDoc(collectionRef, {
//         credits: credits,
//         email: email,
//         name: name,
//         plan: plan,
//       });
//       console.log(email, name, plan, credits);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const data = await getDocs(collectionRef);
//         const filteredData = data.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id,
//         }));
//         setUserData(filteredData);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getUserData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (isLogin) {
//       // Firebase login logic
//       try {
//         await signInWithEmailAndPassword(auth, email, password);
//         alert("Login successful!");
//         navigate("/signin", {
//           state: { userData: userData },
//         });
//       } catch (error) {
//         setError("Incorrect email or password. Please try again.");
//       }
//     } else {
//       // Firebase signup logic
//       if (password !== confirmPassword) {
//         setError("Passwords do not match.");
//         return;
//       }
//       if (password.length < 8) {
//         setError("Password must be at least 8 characters long.");
//         return;
//       }
//       try {
//         await createUserWithEmailAndPassword(auth, email, password);
//         const user = auth.currentUser;
//         // if (user) {
//         //   await setDoc(doc(db, "Users", user.uid), {
//         //     email: user.email,
//         //     name: name,
//         //   });
//         // }
//         alert(
//           "Signup successful! Please check your email to verify your account."
//         );
//         setIsLogin(true);
//       } catch (error) {
//         setError("Error during signup. Please try again.");
//       }
//     }
//   };

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     try {
//       await sendPasswordResetEmail(auth, forgotPasswordEmail);
//       setForgotPasswordSubmitted(true);
//       alert("Password reset link has been sent to your email.");
//     } catch (error) {
//       setError("Error sending password reset link. Please try again.");
//     }
//   };

//   const resetForgotPassword = () => {
//     setForgotPasswordEmail("");
//     setForgotPasswordSubmitted(false);
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       alert("Logged out successfully!");
//       setIsLogin(false);
//       navigate("/"); // Redirect to the homepage or login page after logout
//     } catch (error) {
//       console.error("Logout error:", error);
//       alert("Error logging out. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
//       <div className="w-full max-w-md space-y-8">
//         <div className="text-center">
//           <h2 className="mt-6 text-3xl font-bold">
//             {isLogin ? "Welcome Back" : "Create an Account"}
//           </h2>
//           <p className="mt-2 text-sm text-gray-400">
//             {isLogin
//               ? "Sign in to access your account"
//               : "Sign up to get started"}
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {!isLogin && (
//             <div>
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 className="mt-1 bg-gray-900 border-gray-700 text-white"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//           )}
//           <div>
//             <Label htmlFor="email">Email address</Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               required
//               className="mt-1 bg-gray-900 border-gray-700 text-white"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div>
//             <Label htmlFor="password">Password</Label>
//             <div className="relative mt-1">
//               <Input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 required
//                 className="bg-gray-900 border-gray-700 text-white pr-10"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5" />
//                 ) : (
//                   <Eye className="h-5 w-5" />
//                 )}
//               </button>
//             </div>
//           </div>
//           {!isLogin && (
//             <div>
//               <Label htmlFor="confirmPassword">Confirm Password</Label>
//               <Input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 required
//                 className="mt-1 bg-gray-900 border-gray-700 text-white"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </div>
//           )}
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <div>
//             <Button
//               type="submit"
//               onClick={!isLogin && saveDataToFirebase}
//               className="w-full bg-white text-black hover:bg-gray-200"
//             >
//               {isLogin ? "Sign In" : "Sign Up"}
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </div>
//         </form>

//         <div className="flex items-center justify-between">
//           <button
//             type="button"
//             className="text-sm text-gray-400 hover:text-white"
//             onClick={() => {
//               setIsLogin(!isLogin);
//               setError("");
//               setEmail("");
//               setPassword("");
//               setName("");
//               setConfirmPassword("");
//             }}
//           >
//             {isLogin
//               ? "Need an account? Sign Up"
//               : "Already have an account? Sign In"}
//           </button>
//           {isLogin && (
//             <button
//               type="button"
//               className="text-sm text-gray-400 hover:text-white"
//               onClick={() => {
//                 setShowForgotPassword(true);
//                 resetForgotPassword();
//               }}
//             >
//               Forgot password?
//             </button>
//           )}
//         </div>
//       </div>

//       <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
//         <DialogContent className="bg-gray-900 text-white border-gray-700">
//           <DialogHeader>
//             <DialogTitle>Reset Password</DialogTitle>
//             <DialogDescription className="text-gray-400">
//               Enter your email address to receive a password reset link.
//             </DialogDescription>
//           </DialogHeader>
//           <button
//             onClick={() => setShowForgotPassword(false)}
//             className="absolute right-4 top-4"
//           >
//             <X className="h-4 w-4" />
//             <span className="sr-only">Close</span>
//           </button>
//           {!forgotPasswordSubmitted ? (
//             <form onSubmit={handleForgotPassword} className="space-y-4">
//               <div>
//                 <Label htmlFor="forgotPasswordEmail">Email</Label>
//                 <Input
//                   id="forgotPasswordEmail"
//                   type="email"
//                   required
//                   className="mt-1 bg-gray-800 border-gray-700 text-white"
//                   value={forgotPasswordEmail}
//                   onChange={(e) => setForgotPasswordEmail(e.target.value)}
//                 />
//               </div>
//               <Button
//                 type="submit"
//                 className="w-full bg-white text-black hover:bg-gray-200"
//               >
//                 Send Reset Link
//               </Button>
//             </form>
//           ) : (
//             <div className="text-center py-4">
//               <p className="text-green-400">Password reset link sent!</p>
//               <p className="mt-2 text-sm text-gray-400">
//                 Please check your email for instructions to reset your password.
//               </p>
//               <Button
//                 onClick={() => {
//                   setShowForgotPassword(false);
//                   setForgotPasswordSubmitted(false);
//                 }}
//                 className="mt-4 bg-white text-black hover:bg-gray-200"
//               >
//                 Close
//               </Button>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
