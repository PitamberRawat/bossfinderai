import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { toast } from "@/components/ui/use-toast";
import {
  Home,
  User,
  Briefcase,
  Settings,
  HelpCircle,
  Bell,
  Search,
  CreditCard,
  Mail,
  Calendar,
  Target,
  DollarSign,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Pointdiv } from "./Pricing";
import TelegramChat from "./TelegramChat";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./config/firebase";

import { ToastContainer, toast } from "react-toastify"; // Import toast and container
import "react-toastify/dist/ReactToastify.css";
import { doc, getDoc } from "firebase/firestore";
import bfalogo from "../assets/bfalogo.png";
import "./Signin.css";

export default function Signin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [detailsOfUser, setDetailsOfUser] = useState(null);
  const [name, setName] = useState("jhon doe");
  const [bossLink, setBossLink] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("pricing");
  const [date, setDate] = useState("");

  const handleResetPassword = () => {
    toast({
      title: "Password Reset Requested",
      description: "Check your email for further instructions.",
    });
  };
  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        // If user data is passed via state (first-time login), use that
        if (location.state && location.state.user) {
          setDetailsOfUser(location.state.user);
          setLoading(false);
        } else {
          // Fetch user data from Firestore
          const userRef = doc(db, "users", auth.currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setDetailsOfUser(userSnap.data());
          } else {
            console.log("No such user document!");
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // If the user is logged in, fetch the user data from Firestore
        fetchUserData(currentUser.uid);
      } else {
        // If no user is logged in, redirect to the login page or show a message
        setLoading(false);
        navigate("/"); // Redirect to home or login page
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [location.state, navigate]);

  useEffect(() => {
    setDate(
      new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-GB",
        { day: "numeric", month: "long" }
      )
    );
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // setIsLogin(false);
      toast.success("Logged Out");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleBossLinkSubmit = (e) => {
    e.preventDefault();
    setShowThankYou(true);
    toast({
      title: "Link Submitted",
      description: "You will receive the details of your boss shortly.",
    });
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  if (!detailsOfUser) {
    return <div>No user data available.</div>; // Handle case when no user data is found
  }
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Welcome to Your BossFindr Dashboard
            </h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-to-br from-purple-900 to-indigo-800 text-white border border-purple-700 shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Credits Available
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-purple-300" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {detailsOfUser.credits}
                  </div>
                  {/* <p className="text-xs text-purple-300">Next refill in 3 days</p> */}
                  <Progress
                    value={70}
                    className="mt-2 bg-purple-950"
                    indicatorClassName="bg-purple-400"
                  />
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-900 to-cyan-800 text-white border border-blue-700 shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    AI Emails Available
                  </CardTitle>
                  <Mail className="h-4 w-4 text-blue-300" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">500</div>
                  <p className="text-xs text-blue-300">Unlimited on Pro plan</p>
                  <Progress
                    value={50}
                    className="mt-2 bg-blue-950"
                    indicatorClassName="bg-blue-400"
                  />
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-900 to-emerald-800 text-white border border-green-700 shadow-lg hover:shadow-green-500/20 transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Plan Expiry
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-green-300" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23 Days</div>
                  <p className="text-xs text-green-300">
                    Renews on 30 Oct 2023
                  </p>
                  <Progress
                    value={30}
                    className="mt-2 bg-green-950"
                    indicatorClassName="bg-green-400"
                  />
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-900 to-red-800 text-white border border-orange-700 shadow-lg hover:shadow-orange-500/20 transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Bosses Found Till Now
                  </CardTitle>
                  <Target className="h-4 w-4 text-orange-300" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-orange-300">+3 this week</p>
                  <Progress
                    value={84}
                    className="mt-2 bg-orange-950"
                    indicatorClassName="bg-orange-400"
                  />
                </CardContent>
              </Card>
            </div>
          </>
        );
      case "profile":
        return (
          <Card className="bg-gray-900 text-white border-gray-800">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-800 text-white border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <Button
                onClick={handleResetPassword}
                variant="outline"
                className="text-white border-white hover:bg-gray-800"
              >
                Reset Password
              </Button>
            </CardContent>
          </Card>
        );
      case "findBoss":
        return (
          <Card className="bg-gray-900 text-white border-gray-800">
            <CardHeader>
              <CardTitle>Find Your Next Boss</CardTitle>
              <CardDescription className="text-gray-400">
                Enter a link to get details about your potential boss
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!showThankYou ? (
                <form onSubmit={handleBossLinkSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bossLink" className="text-white">
                      Enter Link
                    </Label>
                    <Input
                      id="bossLink"
                      value={bossLink}
                      onChange={(e) => setBossLink(e.target.value)}
                      placeholder="https://example.com/job-posting"
                      required
                      className="bg-gray-800 text-white border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Submit
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className="text-green-400">
                    Thank you! You will receive the details of your boss
                    shortly.
                  </p>
                  <Progress value={33} className="w-full" />
                  <p className="text-sm text-gray-400">
                    Processing your request... (33%)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      case "settings":
        return (
          <Card className="bg-gray-900 text-white border-gray-800">
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription className="text-gray-400">
                This feature is under development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We're working hard to bring you new exciting features. Stay
                tuned!
              </p>
            </CardContent>
          </Card>
        );
      case "help":
        return (
          <Card className="bg-gray-900 text-white border-gray-800">
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription className="text-gray-400">
                This feature is under development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We're working hard to bring you new exciting features. Stay
                tuned!
              </p>
            </CardContent>
          </Card>
        );
      default:
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* LEFT CARD */}
            <div className="flex-row-div">
              <div className="left-card pricing-card-div">
                <div className="top-section">
                  <div className="start-book-container">
                    <div className="para-start-div">
                      <p className="para-start">Try us!</p>
                    </div>
                  </div>

                  <div className="price-container">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        flexShrink: "0",
                      }}
                    >
                      <span className="price">$3</span>
                      <span
                        className="price"
                        style={{
                          marginLeft: "5px",
                          marginTop: "10px",
                          fontSize: "25px",
                          textDecoration: "line-through",
                        }}
                      >
                        $10
                      </span>
                    </div>
                    <div
                      className="para-start-div"
                      style={{ backgroundColor: "black" }}
                    >
                      <p
                        className="para-start"
                        style={{
                          fontSize: "14px",
                          color: "white",
                        }}
                      >
                        Early bird pricing till {date}!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="feature-section">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      flexShrink: "0",
                    }}
                  >
                    <p className="feature-text">Features:</p>
                  </div>

                  <div className="feature-points-div">
                    <Pointdiv point="5 Credits" />
                    <Pointdiv point="Get Top 2 Matches per search" />
                    <Pointdiv point="Look For Upto 5 Jobs" />
                    {/* <Pointdiv point="Delivery Time: 30 Mins" /> */}
                  </div>
                </div>
                <a
                  href=""
                  className="btn-anchor"
                  onClick={() => navigate("/checkoutpage", { state: 0 })}
                >
                  <p className="btn-secure-para">Get Started </p>
                  <span className="arrow-right">→</span>
                </a>
              </div>

              {/*  Middle card */}

              <div
                className="left-card pricing-card-div"
                style={{ backgroundColor: "black" }}
              >
                <div className="top-section">
                  <div className="start-book-container">
                    <div className="para-start-div">
                      <p className="para-start" style={{ color: "white" }}>
                        Enough credits to get your dream job!
                      </p>
                    </div>
                  </div>

                  <div className="price-container">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        flexShrink: "0",
                      }}
                    >
                      <p className="price" style={{ color: "white" }}>
                        $19
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: "normal",
                            letterSpacing: "normal",
                          }}
                        >
                          <span
                            className="price"
                            style={{
                              marginLeft: "5px",
                              marginTop: "10px",
                              fontSize: "25px",
                              marginRight: "10px",
                              color: "white",
                              textDecoration: "line-through",
                            }}
                          >
                            $49{" "}
                          </span>
                          per month
                        </span>
                      </p>
                    </div>
                    <div
                      className="para-start-div"
                      style={{ backgroundColor: "white" }}
                    >
                      <p
                        className="para-start"
                        style={{
                          fontSize: "14px",
                          color: "black",
                        }}
                      >
                        Early bird pricing till {date}!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="feature-section">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      flexShrink: "0",
                    }}
                  >
                    <p style={{ color: "white" }} className="feature-text">
                      Features:
                    </p>
                  </div>

                  <div className="feature-points-div">
                    <Pointdiv flag={true} point="50 Credits" />
                    <Pointdiv
                      flag={true}
                      point="Get Top 5 Matches per search"
                    />
                    <Pointdiv flag={true} point="Look For Upto 50 Jobs" />
                    {/* <Pointdiv flag={true} point="Delivery Time: 20 Mins" /> */}
                    <Pointdiv
                      flag={true}
                      point="Upto 10 AI Email Copy: Coming Soon"
                    />
                  </div>
                </div>
                <a
                  onClick={() => navigate("/checkoutpage", { state: 1 })}
                  href=""
                  className="btn-anchor"
                  style={{ backgroundColor: "white" }}
                >
                  <p className="btn-secure-para" style={{ color: "black" }}>
                    Get Started{" "}
                  </p>
                  <span className="arrow-right" style={{ color: "black" }}>
                    →
                  </span>
                </a>
              </div>
            </div>

            {/* RIGHT CARD  */}

            <div
              style={{ marginTop: "20px" }}
              className="left-card pricing-card-div right-card-divvv"
            >
              <div className="top-section">
                <div className="start-book-container">
                  <div className="para-start-div">
                    <p className="para-start">
                      Never worry about unread resumes again. Reach hiring
                      managers forever!
                    </p>
                  </div>
                </div>

                <div className="price-container">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      flexShrink: "0",
                    }}
                  >
                    <p className="price">
                      $49
                      <span
                        className="price"
                        style={{
                          marginLeft: "5px",
                          marginTop: "10px",
                          fontSize: "25px",
                          // color: "white",
                          textDecoration: "line-through",
                        }}
                      >
                        $299{" "}
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "normal",
                          letterSpacing: "normal",
                          marginLeft: "10px",
                        }}
                      >
                        lifetime access
                      </span>
                    </p>
                  </div>
                  <div
                    className="para-start-div"
                    style={{ backgroundColor: "black" }}
                  >
                    <p
                      className="para-start"
                      style={{
                        fontSize: "14px",
                        color: "white",
                      }}
                    >
                      Early bird pricing till {date}!
                    </p>
                  </div>
                </div>
              </div>

              <div className="feature-section">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    flexShrink: "0",
                  }}
                >
                  <p className="feature-text">Features:</p>
                </div>

                <div className="feature-points-div">
                  <Pointdiv point="50 Credits Every Day" />
                  <Pointdiv point="Get Top 7 Matches" />
                  <Pointdiv point="Look For Unlimited Jobs" />
                  {/* <Pointdiv point="Delivery Time: 15 Mins" /> */}
                  <Pointdiv point="LifeTime Support & Updates" />
                  <Pointdiv point="Unlimited AI Email Copy: Coming Soon" />
                </div>
              </div>
              <a
                onClick={() => navigate("/checkoutpage", { state: 2 })}
                href=""
                className="btn-anchor"
              >
                <p className="btn-secure-para">Get Started </p>
                <span className="arrow-right">→</span>
              </a>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="flex  text-white font-inter"
        style={{
          backgroundColor: "rgb(17,24,39)",
          minHeight: "100vh",
        }}
      >
        {/* Navigation Sidebar */}

        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            backgroundColor: "rgb(17,24,39)",
          }}
        >
          {/* Main Content Area */}
          <div className="flex    flex-col">
            {/* Top Bar */}
            <header className="header-content-area bg-gray-900 border-b border-gray-800 flex justify-between items-center">
              <div className="flex items-center justify-center mb-2">
                <span className="logotext text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  BossFindr
                </span>
                <div style={{ display: "flex", height: "100px" }}>
                  <img src={bfalogo} alt="" className="logoimgdashboard" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Search..."
                  className="inputsearch bg-gray-800 border-gray-700 text-white  focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>
                <button className="auth-btn" onClick={handleLogout}>
                  Log out
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <img
                        className="rounded-full"
                        src="/placeholder.svg?height=32&width=32"
                        alt="User"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          John Doe
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          john@example.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            {/* Content */}
            <main className="w-full main-content-area flex from-gray-900 to-black ">
              <nav className="nav-content-area bg-gray-900 p-1 border-r border-gray-800">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-gray-800 hover:text-purple-400 transition-colors"
                  onClick={() => setActiveSection("dashboard")}
                >
                  <Home className="mr-2 h-4 w-4" />
                  <span className="nav-span-text">Dashboard</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-gray-800 hover:text-purple-400 transition-colors"
                  onClick={() => setActiveSection("profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span className="nav-span-text">Profile</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-gray-800 hover:text-purple-400 transition-colors"
                  onClick={() => setActiveSection("pricing")}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span className="nav-span-text">Pricing</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-gray-800 hover:text-purple-400 transition-colors"
                  onClick={() => setActiveSection("findBoss")}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span className="nav-span-text">Find Your Next Boss</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-gray-800 hover:text-purple-400 transition-colors"
                  onClick={() => setActiveSection("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span className="nav-span-text">Settings</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-gray-800 hover:text-purple-400 transition-colors"
                  onClick={() => setActiveSection("help")}
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span className="nav-span-text">Help & Support</span>
                </Button>
              </nav>
              <div
                style={{
                  marginTop: "30px",
                  width: "100%",
                }}
              >
                {renderContent()}
              </div>
            </main>
          </div>

          {/* <TelegramChat /> */}
        </div>
      </div>
    </>
  );
}
