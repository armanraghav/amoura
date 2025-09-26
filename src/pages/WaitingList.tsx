import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Clock, Mail } from "lucide-react";

const WaitingList = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            <h2 className="text-2xl font-bold text-foreground">Amoura</h2>
          </div>
        </div>

        {/* Waiting List Card */}
        <Card className="bg-gradient-card border-border shadow-card">
          <div className="p-8">
            {/* Icon */}
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="h-10 w-10 text-primary" />
            </div>

            {/* Message */}
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Almost there!
            </h1>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              You need to be 18 or older to join Amoura. We'll notify you as soon as you're eligible to create your profile and start connecting with amazing people.
            </p>

            {/* Email notification option */}
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full border-border hover:bg-secondary/50 transition-smooth"
              >
                <Mail className="h-4 w-4 mr-2" />
                Get notified when you're eligible
              </Button>

              <Button
                variant="secondary"
                className="w-full bg-secondary hover:bg-secondary/80 transition-smooth"
                onClick={() => window.location.href = "/"}
              >
                Return to Home
              </Button>
            </div>

            {/* Footer message */}
            <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
              <p className="text-xs text-muted-foreground">
                🎉 We can't wait to welcome you to the Amoura community!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WaitingList;