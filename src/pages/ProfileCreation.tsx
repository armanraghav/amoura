import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Camera, MapPin, User, Ruler, Church, Home, Target, Upload, X, Sparkles } from "lucide-react";

const ProfileCreation = () => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: "",
    photos: [] as File[],
    gender: "",
    preferredGender: "",
    height: "",
    religion: "",
    hometown: "",
    currentLocation: "",
    relationshipType: "",
    relationshipDuration: "",
    searchRadius: [25],
    interests: [] as string[]
  });
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const religiousBeliefs = [
    "Agnostic", "Atheist", "Buddhist", "Catholic", "Christian", "Hindu", 
    "Jewish", "Muslim", "Spiritual", "Other", "Prefer not to say"
  ];

  const interestOptions = [
    "Art & Museums", "Cooking", "Dancing", "Fitness & Gym", "Gaming", "Hiking", 
    "Music", "Photography", "Reading", "Sports", "Travel", "Wine Tasting",
    "Yoga", "Netflix", "Coffee", "Dogs", "Cats", "Festivals", "Comedy",
    "Beach", "Mountains", "Concerts", "Theater", "Volunteering", "Gardening",
    "Fashion", "Technology", "Science", "History", "Languages", "Writing",
    "Meditation", "Cycling", "Running", "Swimming", "Rock Climbing", "Skiing"
  ];

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && profile.photos.length < 6) {
      const newFiles = Array.from(files).slice(0, 6 - profile.photos.length);
      setProfile(prev => ({
        ...prev,
        photos: [...prev.photos, ...newFiles]
      }));
    }
  };

  const removePhoto = (index: number) => {
    setProfile(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const openFileUpload = () => {
    fileInputRef.current?.click();
  };

  const toggleInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      navigate("/matching");
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return profile.photos.length >= 2 && profile.name.trim();
      case 2:
        return profile.gender && profile.preferredGender && profile.height;
      case 3:
        return profile.relationshipType && profile.relationshipDuration;
      case 4:
        return profile.interests.length >= 3;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <Heart className="h-8 w-8 text-primary fill-primary" />
            <h1 className="text-3xl font-bold text-foreground">Amoura</h1>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div className="flex items-center gap-2 mb-4 max-w-lg mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-smooth ${
                  i <= step ? "bg-gradient-primary" : "bg-secondary/50"
                }`}
              />
            ))}
          </div>
          <p className="text-muted-foreground">Step {step} of 4 • Let's build your perfect profile</p>
        </div>

        <Card className="bg-gradient-card border-border shadow-card max-w-3xl mx-auto">
          <div className="p-8">
            {/* Step 1: Photos & Name */}
            {step === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    Let's start with the basics
                  </h2>
                  <p className="text-muted-foreground">
                    Your name and photos help others recognize you
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Your Name
                    </label>
                    <Input
                      placeholder="Enter your first name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-input border-border text-lg py-3"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Add Photos (minimum 2, up to 6)
                    </label>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />

                    <div className="grid grid-cols-3 gap-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="aspect-[3/4] bg-secondary/30 border-2 border-dashed border-border rounded-xl flex items-center justify-center cursor-pointer hover:bg-secondary/50 transition-smooth relative overflow-hidden"
                          onClick={i >= profile.photos.length ? openFileUpload : undefined}
                        >
                          {profile.photos[i] ? (
                            <>
                              <img
                                src={URL.createObjectURL(profile.photos[i])}
                                alt={`Photo ${i + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="absolute top-2 right-2 h-6 w-6 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removePhoto(i);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                              {i === 0 && (
                                <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                                  Main
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <Upload className="h-8 w-8 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground text-center">
                                {i === 0 ? "Main Photo" : `Photo ${i + 1}`}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-muted-foreground text-center mt-3">
                      {profile.photos.length}/6 photos • Your first photo will be your main profile picture
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Basic Info */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    About you
                  </h2>
                  <p className="text-muted-foreground">
                    Help us understand what you're looking for
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Gender
                    </label>
                    <Select value={profile.gender} onValueChange={(value) => 
                      setProfile(prev => ({ ...prev, gender: value }))
                    }>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="woman">Woman</SelectItem>
                        <SelectItem value="man">Man</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Interested in
                    </label>
                    <Select value={profile.preferredGender} onValueChange={(value) => 
                      setProfile(prev => ({ ...prev, preferredGender: value }))
                    }>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Who are you interested in?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="women">Women</SelectItem>
                        <SelectItem value="men">Men</SelectItem>
                        <SelectItem value="everyone">Everyone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <Ruler className="h-4 w-4" />
                      Height
                    </label>
                    <Input
                      placeholder="e.g., 5'8&quot; or 173 cm"
                      value={profile.height}
                      onChange={(e) => setProfile(prev => ({ ...prev, height: e.target.value }))}
                      className="bg-input border-border"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <Church className="h-4 w-4" />
                      Religious Beliefs
                    </label>
                    <Select value={profile.religion} onValueChange={(value) => 
                      setProfile(prev => ({ ...prev, religion: value }))
                    }>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Select your beliefs" />
                      </SelectTrigger>
                      <SelectContent>
                        {religiousBeliefs.map((belief) => (
                          <SelectItem key={belief} value={belief.toLowerCase()}>
                            {belief}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Hometown
                    </label>
                    <Input
                      placeholder="Where are you from?"
                      value={profile.hometown}
                      onChange={(e) => setProfile(prev => ({ ...prev, hometown: e.target.value }))}
                      className="bg-input border-border"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Current Location
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Where do you live now?"
                        value={profile.currentLocation}
                        onChange={(e) => setProfile(prev => ({ ...prev, currentLocation: e.target.value }))}
                        className="bg-input border-border flex-1"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="border-border"
                        onClick={() => {
                          alert("Map feature requires Supabase integration for location services. Please connect Supabase to enable this feature.");
                        }}
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Relationship Preferences */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    What are you looking for?
                  </h2>
                  <p className="text-muted-foreground">
                    Help us find your perfect match
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">
                      Relationship Type
                    </label>
                    <Select value={profile.relationshipType} onValueChange={(value) => 
                      setProfile(prev => ({ ...prev, relationshipType: value }))
                    }>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Select relationship type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monogamy">Monogamy</SelectItem>
                        <SelectItem value="non-monogamy">Non-monogamy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">
                      Relationship Duration
                    </label>
                    <Select value={profile.relationshipDuration} onValueChange={(value) => 
                      setProfile(prev => ({ ...prev, relationshipDuration: value }))
                    }>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="What are you looking for?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short-term">Short term</SelectItem>
                        <SelectItem value="long-term">Long term</SelectItem>
                        <SelectItem value="figuring-out">Figuring it out</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-4 block">
                      Search Radius: {profile.searchRadius[0]} km
                    </label>
                    <Slider
                      value={profile.searchRadius}
                      onValueChange={(value) => setProfile(prev => ({ ...prev, searchRadius: value }))}
                      max={100}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>1 km</span>
                      <span>100 km</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Interests */}
            {step === 4 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    What are you passionate about?
                  </h2>
                  <p className="text-muted-foreground">
                    Select at least 3 interests to help us find compatible matches
                  </p>
                </div>

                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {interestOptions.map((interest) => (
                      <div
                        key={interest}
                        className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-smooth ${
                          profile.interests.includes(interest)
                            ? "bg-primary/20 border-primary text-primary"
                            : "bg-secondary/20 border-border hover:bg-secondary/40"
                        }`}
                        onClick={() => toggleInterest(interest)}
                      >
                        <Checkbox
                          checked={profile.interests.includes(interest)}
                          onChange={() => toggleInterest(interest)}
                          className="pointer-events-none"
                        />
                        <span className="text-sm font-medium">{interest}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Selected: {profile.interests.length} interests
                      {profile.interests.length < 3 && " (need at least 3)"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-4 mt-10">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="border-border px-8"
                >
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 bg-gradient-primary hover:shadow-glow transition-smooth font-medium py-3 text-lg"
              >
                {step === 4 ? "Complete Profile" : "Continue"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileCreation;