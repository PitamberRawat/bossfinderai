import { useState } from "react";
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
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase";

const items = [
  {
    id: 1,
    plan: "normal",
    price: 3,
  },
  {
    id: 2,
    plan: "standard",
    price: 19,
  },
  {
    id: 3,
    plan: "premium",
    price: 49,
  },
];

export default function Signin() {
  const navigate = useNavigate();

  const [name, setName] = useState("John Doe");
  const [bossLink, setBossLink] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const location = useLocation();

  const userData = location.state?.userData || [];
  const setIsLogin = location.state?.setIsLogin || true;
  console.log(userData);

  const checkout = async () => {
    try {
      const response = await fetch("https://localhost:4000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: items }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.url) {
        window.location.assign(data.url);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Please try again."); // User feedback
    }
  };

  const handleResetPassword = () => {
    toast({
      title: "Password Reset Requested",
      description: "Check your email for further instructions.",
    });
  };

  const handleLogout = async () => {
    console.log("hello");

    try {
      await signOut(auth);
      // setIsLogin(false);
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

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-purple-900 to-indigo-800 text-white border border-purple-700 shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Credits Available
                </CardTitle>
                <CreditCard className="h-4 w-4 text-purple-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-purple-300">Next refill in 3 days</p>
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
                <p className="text-xs text-green-300">Renews on 30 Oct 2023</p>
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
      default:
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
    }
  };

  return (
    <>
      <div
        className="flex h-full  text-white font-inter"
        style={{ backgroundColor: "rgb(17,24,39" }}
      >
        {/* Navigation Sidebar */}
        <nav className="w-64 bg-gray-900 p-4 border-r border-gray-800">
          <div className="flex items-center justify-center mb-8">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              BossFindr
            </span>
          </div>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800 hover:text-purple-400 transition-colors"
              onClick={() => setActiveSection("dashboard")}
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800 hover:text-purple-400 transition-colors"
              onClick={() => setActiveSection("profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800 hover:text-purple-400 transition-colors"
              onClick={() => setActiveSection("findBoss")}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Find Your Next Boss
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800 hover:text-purple-400 transition-colors"
              onClick={() => setActiveSection("settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800 hover:text-purple-400 transition-colors"
              onClick={() => setActiveSection("help")}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </Button>
          </div>
        </nav>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(17,24,39)",
            width: "100%",
          }}
        >
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Top Bar */}
            <header className="bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Search..."
                  className="bg-gray-800 border-gray-700 text-white w-64 focus:border-purple-500 focus:ring-purple-500"
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
            <main className="flex-1 p-6 overflow-auto  from-gray-900 to-black">
              <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Welcome to Your BossFindr Dashboard
              </h1>
              {renderContent()}
            </main>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <div
              style={{
                height: "600px",
                backgroundColor: "green",
                width: "900px",
              }}
            >
              {userData.map((d) => {
                return (
                  <div
                    style={{
                      height: "200px",
                      width: "400px",
                      backgroundColor: "red",
                      color: "white",
                    }}
                  >
                    <h1 style={{ color: "white" }}>{d.name}</h1>
                    <h1 style={{ color: "white" }}>{d.email}</h1>
                    <h1 style={{ color: "white" }}>{d.credits}</h1>
                    <h1 style={{ color: "white" }}>{d.plan}</h1>
                  </div>
                );
              })}
            </div> */}
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
                        $5
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
                        Early bird pricing till 15th October!
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
                <a href="" className="btn-anchor" onClick={() => checkout()}>
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
                        Early bird pricing till 15th October!
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
                  onClick={() => checkout()}
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

            <div className="left-card pricing-card-div right-card-divvv">
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
                      Early bird pricing till 15th October!
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
              <a onClick={() => checkout()} href="" className="btn-anchor">
                <p className="btn-secure-para">Get Started </p>
                <span className="arrow-right">→</span>
              </a>
            </div>
          </div>
        </div>
        <TelegramChat />
      </div>
    </>
  );
}
