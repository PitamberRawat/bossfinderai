import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "./config/firebase"; // Ensure this path is correct
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
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

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(location.state?.isLogin || false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [credits, setCredits] = useState(0);
  const [plan, setPlan] = useState("normal");
  const [userData, setUserData] = useState([]); // Initial state for userData
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordSubmitted, setForgotPasswordSubmitted] = useState(false);

  const db = getFirestore();
  const collectionRef = collection(db, "users");

  // const saveDataToFirebase = async () => {
  //   try {
  //     // Check if the user is authenticated
  //     const user = auth.currentUser;
  //     if (!user) {
  //       console.error("User is not authenticated. Cannot save data.");
  //       return;
  //     }

  //     // Add data to the Firestore collection
  //     const docRef = await addDoc(collectionRef, {
  //       credits: credits,
  //       email: email,
  //       name: name,
  //       plan: plan,
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (err) {
  //     console.error("Error adding document: ", err);
  //   }
  // };
  const saveDataToFirebase = async () => {
    try {
      // Check if the user is authenticated
      const user = auth.currentUser;
      if (!user) {
        console.error("User is not authenticated. Cannot save data.");
        return;
      }

      // Use the user's UID as the document ID
      const userDocRef = doc(collectionRef, user.uid);

      // Add data to the Firestore document
      await setDoc(userDocRef, {
        credits: credits,
        email: email,
        name: name,
        plan: plan,
      });
      console.log(
        "Document successfully written with the user's UID as the document ID."
      );
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };
  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getDocs(collectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserData(filteredData);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        navigate("/signin", { state: { userData: userData } });
      } catch (error) {
        setError("Incorrect email or password. Please try again.");
      }
    } else {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        // Call saveDataToFirebase function after signup is successful
        await saveDataToFirebase();
        alert(
          "Signup successful! Please check your email to verify your account."
        );
        setIsLogin(true);
      } catch (error) {
        console.error("Error during signup:", error);
        setError("Error during signup. Please try again.");
      }
    }
  };

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      setIsLogin(false);
      navigate("/"); // Redirect to the homepage or login page after logout
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error logging out. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {isLogin
              ? "Sign in to access your account"
              : "Sign up to get started"}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 bg-gray-900 border-gray-700 text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
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
          {!isLogin && (
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 bg-gray-900 border-gray-700 text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <Button
              type="submit"
              onClick={!isLogin && saveDataToFirebase}
              className="w-full bg-white text-black hover:bg-gray-200"
            >
              {isLogin ? "Sign In" : "Sign Up"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="text-sm text-gray-400 hover:text-white"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setEmail("");
              setPassword("");
              setName("");
              setConfirmPassword("");
            }}
          >
            {isLogin
              ? "Need an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
          {isLogin && (
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
          )}
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
