import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, X, MapPin, Ruler, ShieldCheck, Camera } from "lucide-react";

// Mock profile data
const mockProfiles = [
  {
    id: 1,
    name: "Emma",
    age: 25,
    photos: ["photo1", "photo2", "photo3"],
    distance: "2 miles away",
    height: "5'6\"",
    location: "San Francisco",
    verified: true,
    bio: "Love hiking and coffee ☕ Looking for genuine connections"
  },
  {
    id: 2,
    name: "Alex",
    age: 28,
    photos: ["photo1", "photo2"],
    distance: "5 miles away",
    height: "5'10\"",
    location: "San Francisco",
    verified: false,
    bio: "Photographer and dog lover 📸🐕"
  },
  {
    id: 3,
    name: "Sarah",
    age: 24,
    photos: ["photo1", "photo2", "photo3", "photo4"],
    distance: "1 mile away",
    height: "5'4\"",
    location: "San Francisco",
    verified: true,
    bio: "Yoga instructor seeking mindful connections 🧘‍♀️"
  }
];

const Matching = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profiles] = useState(mockProfiles);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const currentProfile = profiles[currentProfileIndex];

  const handleLike = () => {
    // Simulate match logic
    console.log("Liked profile:", currentProfile?.name);
    nextProfile();
  };

  const handlePass = () => {
    console.log("Passed profile:", currentProfile?.name);
    nextProfile();
  };

  const nextProfile = () => {
    setCurrentPhotoIndex(0);
    setCurrentProfileIndex((prev) => (prev + 1) % profiles.length);
  };

  const nextPhoto = () => {
    if (currentProfile && currentPhotoIndex < currentProfile.photos.length - 1) {
      setCurrentPhotoIndex(prev => prev + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(prev => prev - 1);
    }
  };

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="bg-gradient-card border-border shadow-card p-8 text-center">
          <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">No more profiles</h2>
          <p className="text-muted-foreground">Check back later for new matches!</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary fill-primary" />
          <h1 className="text-xl font-bold text-foreground">Amoura</h1>
        </div>
      </div>

      {/* Profile Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <Card className="bg-gradient-card border-border shadow-card overflow-hidden">
            {/* Photo Section */}
            <div className="relative aspect-[3/4] bg-secondary">
              {/* Photo indicators */}
              <div className="absolute top-3 left-3 right-3 flex gap-1 z-10">
                {currentProfile.photos.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full transition-smooth ${
                      index <= currentPhotoIndex ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>

              {/* Verification Badge */}
              {currentProfile.verified && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-primary text-primary-foreground">
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              )}

              {/* Photo placeholder */}
              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <Camera className="h-16 w-16 text-primary/50" />
              </div>

              {/* Photo navigation */}
              <div className="absolute inset-0 flex">
                <button
                  onClick={prevPhoto}
                  className="flex-1 cursor-pointer"
                  disabled={currentPhotoIndex === 0}
                />
                <button
                  onClick={nextPhoto}
                  className="flex-1 cursor-pointer"
                  disabled={currentPhotoIndex === currentProfile.photos.length - 1}
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-4 space-y-3">
              {/* Name and Age */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  {currentProfile.name}, {currentProfile.age}
                </h2>
              </div>

              {/* Bio */}
              <p className="text-foreground text-sm leading-relaxed">
                {currentProfile.bio}
              </p>

              {/* Details */}
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {currentProfile.distance}
                </div>
                <div className="flex items-center gap-1">
                  <Ruler className="h-4 w-4" />
                  {currentProfile.height}
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 mt-6">
            <Button
              onClick={handlePass}
              size="lg"
              variant="outline"
              className="h-14 w-14 rounded-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-smooth"
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              onClick={handleLike}
              size="lg"
              className="h-14 w-14 rounded-full bg-gradient-primary hover:shadow-glow transition-smooth"
            >
              <Heart className="h-6 w-6 fill-current" />
            </Button>
          </div>

          {/* Match Counter */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            Profile {currentProfileIndex + 1} of {profiles.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Matching;