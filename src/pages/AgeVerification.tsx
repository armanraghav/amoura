import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Calendar, Heart } from "lucide-react";

const AgeVerification = () => {
  const [birthDate, setBirthDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleSubmit = () => {
    if (!birthDate) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const age = calculateAge(birthDate);
      
      if (age < 18) {
        navigate("/waiting-list");
      } else {
        navigate("/profile-creation");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            <h2 className="text-2xl font-bold text-foreground">Amoura</h2>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            When's your birthday?
          </h1>
          <p className="text-muted-foreground">
            We need to verify you're 18 or older to use Amoura
          </p>
        </div>

        {/* Birthday Card */}
        <Card className="bg-gradient-card border-border shadow-card">
          <div className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="pl-10 bg-input border-border text-foreground [&::-webkit-calendar-picker-indicator]:invert"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!birthDate || isLoading}
                className="w-full bg-gradient-primary hover:shadow-glow transition-smooth font-medium"
              >
                {isLoading ? "Verifying..." : "Continue"}
              </Button>
            </div>

            <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                🔒 Your birthday is used only for age verification and is kept secure and private
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AgeVerification;