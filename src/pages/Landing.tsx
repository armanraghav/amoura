import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Heart, Phone, Mail } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Landing = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handlePhoneAuth = () => {
    // Simulate phone auth - in real app would send OTP
    if (phoneNumber) {
      navigate("/age-verification");
    }
  };

  const handleGoogleAuth = () => {
    // Simulate Google auth
    navigate("/age-verification");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="relative flex-1 flex items-center justify-center px-4">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Heart className="h-8 w-8 text-primary fill-primary" />
              <h1 className="text-4xl font-bold text-foreground">Amoura</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Find your perfect match
            </p>
          </div>

          {/* Auth Card */}
          <Card className="bg-gradient-card border-border shadow-card backdrop-blur-sm">
            <div className="p-6">
              {/* Toggle */}
              <div className="flex mb-6 bg-secondary rounded-lg p-1">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-smooth ${
                    isLogin
                      ? "bg-primary text-primary-foreground shadow-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-smooth ${
                    !isLogin
                      ? "bg-primary text-primary-foreground shadow-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Phone Auth */}
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="pl-10 bg-input border-border text-foreground"
                    />
                  </div>
                </div>

                <Button
                  onClick={handlePhoneAuth}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-smooth font-medium"
                  disabled={!phoneNumber}
                >
                  {isLogin ? "Send Login Code" : "Send Verification Code"}
                </Button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              {/* Google Auth */}
              <Button
                onClick={handleGoogleAuth}
                variant="outline"
                className="w-full border-border hover:bg-secondary/50 transition-smooth"
              >
                <Mail className="h-4 w-4 mr-2" />
                Continue with Google
              </Button>

              {/* Terms */}
              <p className="text-xs text-muted-foreground text-center mt-4">
                By continuing, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Landing;